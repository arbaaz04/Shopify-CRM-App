import type { ActionOptions } from "gadget-server";

export const run: ActionFunction = async ({ params, logger, api, connections }) => {
  try {
    logger.info("deleteSheetRowsByTrackingNumber called with params:", params);

    const trackingNumbers = params.trackingNumbers;
    const shopId = params.shopId;

    if (!trackingNumbers || (!Array.isArray(trackingNumbers) && !trackingNumbers)) {
      throw new Error("Tracking numbers are required");
    }

    if (!shopId) {
      throw new Error("Shop ID is required");
    }

    // Normalize tracking numbers to array
    const trackingNumbersArray = Array.isArray(trackingNumbers) ? trackingNumbers : [trackingNumbers];
    const validTrackingNumbers = trackingNumbersArray.filter(tn => tn && typeof tn === 'string').map(tn => tn.trim());

    if (validTrackingNumbers.length === 0) {
      throw new Error("No valid tracking numbers provided");
    }

    logger.info("Processing tracking numbers for deletion", {
      trackingCount: validTrackingNumbers.length,
      trackingNumbers: validTrackingNumbers
    });

    // Initialize Google Sheets client
    const { google } = require('googleapis');

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    let credentials;

    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (e) {
      throw new Error("Invalid Google service account key format");
    }

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Google service account credentials missing required fields");
    }

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Get the Google Sheets configuration for spreadsheet ID
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });

    if (!sheetConfig) {
      throw new Error("Google Sheets configuration not found for this shop");
    }

    const spreadsheetId = sheetConfig.spreadsheetId;
    
    // Get the sheet ID for the Orders sheet
    const spreadsheetInfo = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties'
    });

    const ordersSheet = spreadsheetInfo.data.sheets?.find(
      (sheet: any) => sheet.properties?.title === 'Orders'
    );

    if (!ordersSheet) {
      throw new Error("Orders sheet not found in the spreadsheet");
    }

    const ordersSheetId = ordersSheet.properties.sheetId;
    logger.info(`Found Orders sheet with ID: ${ordersSheetId}`);

    // Get all data from the tracking number column (column C)
    const trackingColumnRange = 'Orders!C:C'; // Column C for tracking numbers

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: trackingColumnRange,
    });

    const trackingColumnValues = response.data.values || [];
    logger.info(`Retrieved ${trackingColumnValues.length} rows from tracking number column (C)`);

    // Find all rows that contain any of our target tracking numbers
    const rowsToDelete: number[] = [];
    const foundTrackingNumbers: string[] = [];

    for (let i = 0; i < trackingColumnValues.length; i++) {
      const cellValue = trackingColumnValues[i]?.[0];
      if (cellValue) {
        const cellValueStr = String(cellValue).trim();

        // Check if this row matches any of our target tracking numbers (exact match)
        for (const targetTracking of validTrackingNumbers) {
          if (cellValueStr === targetTracking) {
            rowsToDelete.push(i + 1); // +1 because sheets are 1-indexed
            if (!foundTrackingNumbers.includes(targetTracking)) {
              foundTrackingNumbers.push(targetTracking);
            }
            break; // Found a match, no need to check other tracking numbers for this row
          }
        }
      }
    }

    logger.info(`Found ${rowsToDelete.length} rows to delete for ${foundTrackingNumbers.length} tracking numbers`, {
      rowsToDelete: rowsToDelete,
      foundTrackingNumbers: foundTrackingNumbers
    });

    if (rowsToDelete.length === 0) {
      return {
        success: true,
        message: `No entries found for tracking numbers: ${validTrackingNumbers.join(', ')}`,
        deletedCount: 0,
        foundEntries: false,
        searchedTrackingNumbers: validTrackingNumbers.length,
        foundTrackingNumbers: []
      };
    }

    // Delete all rows in a single batch API call for maximum speed
    // Sort rows in descending order to prevent index shifting issues
    rowsToDelete.sort((a, b) => b - a);

    logger.info(`Preparing to delete ${rowsToDelete.length} rows in a single batch operation`);

    // Create batch delete requests for all rows at once
    const deleteRequests = rowsToDelete.map(rowIndex => ({
      deleteDimension: {
        range: {
          sheetId: ordersSheetId,
          dimension: 'ROWS',
          startIndex: rowIndex - 1, // Convert to 0-indexed
          endIndex: rowIndex // End index is exclusive
        }
      }
    }));

    let deletedCount = 0;
    let failedDeletions = 0;

    try {
      // Execute all deletions in a single API call
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: deleteRequests
        }
      });

      deletedCount = rowsToDelete.length;
      logger.info(`Successfully deleted all ${deletedCount} rows in single batch operation`);

    } catch (batchError) {
      logger.error(`Batch deletion failed, falling back to individual deletions`, { error: batchError });

      // Fallback: delete rows one by one if batch fails
      for (const rowIndex of rowsToDelete) {
        try {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [{
                deleteDimension: {
                  range: {
                    sheetId: ordersSheetId,
                    dimension: 'ROWS',
                    startIndex: rowIndex - 1,
                    endIndex: rowIndex
                  }
                }
              }]
            }
          });

          deletedCount++;
          logger.info(`Successfully deleted row ${rowIndex} (fallback)`);
        } catch (deleteError) {
          logger.error(`Failed to delete row ${rowIndex} (fallback)`, { error: deleteError });
          failedDeletions++;
        }
      }
    }

    // Create summary message
    const trackingList = foundTrackingNumbers.join(', ');
    let message = `Successfully deleted ${deletedCount} entries for ${foundTrackingNumbers.length} tracking number(s): ${trackingList}`;

    if (failedDeletions > 0) {
      message += ` (${failedDeletions} deletions failed)`;
    }

    return {
      success: true,
      message: message,
      deletedCount: deletedCount,
      foundEntries: true,
      searchedTrackingNumbers: validTrackingNumbers.length,
      foundTrackingNumbers: foundTrackingNumbers,
      failedDeletions: failedDeletions
    };
    
  } catch (error) {
    logger.error("Error deleting sheet rows by tracking number", { 
      error: error,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined 
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  trackingNumbers: {
    type: "string" // Can be single string or array
  },
  shopId: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};

interface ActionFunction {
  (context: {
    params: any;
    logger: any;
    api: any;
    connections: any;
  }): Promise<any>;
}