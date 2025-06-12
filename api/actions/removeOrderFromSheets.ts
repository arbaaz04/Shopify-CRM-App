import { ActionOptions, ActionRun } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  try {
    console.log("removeOrderFromSheets action called!");
    console.log("Params received:", params);
    logger.info("removeOrderFromSheets called with params:", params);

    const orderName = params.orderName;
    const shopId = params.shopId;

    console.log("Extracted orderName:", orderName);
    console.log("Extracted shopId:", shopId);

    if (!orderName) {
      console.log("Error: Order name is required");
      throw new Error("Order name is required");
    }

    if (!shopId) {
      console.log("Error: Shop ID is required");
      throw new Error("Shop ID is required");
    }

    logger.info("Starting order removal from Google Sheets", {
      orderName: orderName,
      shopId: shopId
    });

    // Parse multiple order names - support comma-separated values
    const orderNamesInput = String(orderName).trim();
    const orderNamesList = orderNamesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (orderNamesList.length === 0) {
      throw new Error("No valid order names provided");
    }

    // Normalize all order names - handle both #1234 and 1234 formats
    const normalizedOrderNames = orderNamesList.map(name => {
      const normalized = name.replace(/^#/, '');
      return {
        original: name,
        normalized: normalized,
        searchPatterns: [normalized, `#${normalized}`]
      };
    });

    logger.info("Processing multiple orders", {
      originalInput: orderName,
      orderCount: normalizedOrderNames.length,
      orders: normalizedOrderNames.map(o => o.original)
    });

    // Initialize Google Sheets client using environment variables (same as writeBatchOrdersToSheets)
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
    
    // First, get the sheet ID for the Orders sheet
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

    // Get all data from column Z (order names) to find matching rows
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Orders!Z:Z',
    });

    const columnZValues = response.data.values || [];
    logger.info(`Retrieved ${columnZValues.length} rows from column Z`);

    // Find all rows that contain any of our target order names
    const rowsToDelete: number[] = [];
    const foundOrders: string[] = [];

    for (let i = 0; i < columnZValues.length; i++) {
      const cellValue = columnZValues[i]?.[0];
      if (cellValue) {
        const cellValueStr = String(cellValue).trim();
        const normalizedCellValue = cellValueStr.replace(/^#/, '');

        // Check if this row matches any of our target order names (case-insensitive)
        for (const orderInfo of normalizedOrderNames) {
          if (normalizedCellValue.toLowerCase() === orderInfo.normalized.toLowerCase()) {
            rowsToDelete.push(i + 1); // +1 because sheets are 1-indexed
            if (!foundOrders.includes(orderInfo.original)) {
              foundOrders.push(orderInfo.original);
            }
            break; // Found a match, no need to check other orders for this row
          }
        }
      }
    }

    logger.info(`Found ${rowsToDelete.length} rows to delete for ${foundOrders.length} orders`, {
      rowsToDelete: rowsToDelete,
      foundOrders: foundOrders
    });

    if (rowsToDelete.length === 0) {
      const ordersList = normalizedOrderNames.map(o => o.original).join(', ');
      return {
        success: true,
        message: `No entries found for order(s): ${ordersList}`,
        deletedCount: 0,
        foundEntries: false,
        searchedOrders: normalizedOrderNames.length,
        foundOrders: []
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
    const ordersList = foundOrders.join(', ');
    let message = `Successfully deleted ${deletedCount} entries for ${foundOrders.length} order(s): ${ordersList}`;

    if (failedDeletions > 0) {
      message += ` (${failedDeletions} deletions failed)`;
    }

    return {
      success: true,
      message: message,
      deletedCount: deletedCount,
      foundEntries: true,
      searchedOrders: normalizedOrderNames.length,
      foundOrders: foundOrders,
      failedDeletions: failedDeletions
    };
    
  } catch (error) {
    logger.error("Error removing order from sheets", { 
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
  orderName: {
    type: "string",
    required: true
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
