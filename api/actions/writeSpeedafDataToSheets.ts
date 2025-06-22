import { ActionOptions } from "gadget-server";

/**
 * Map Speedaf action codes to descriptions (same as trackSpeedafOrders)
 */
const SPEEDAF_ACTION_CODES: Record<string, string> = {
  '10': 'Ordered',
  '-10': 'Canceled',
  '150': 'Inbound',
  '181': 'Packaged',
  '190': 'Outbound',
  '402': 'Customs declaration',
  '220': 'Flight departed',
  '230': 'Flight landed',
  '360': 'In clearance',
  '401': 'Clearance exception',
  '370': 'Clearance completed',
  '1': 'Picked',
  '2': 'Departed',
  '3': 'Arrived',
  '4': 'In delivery',
  '5': 'Collected',
  '-710': 'Returning',
  '730': 'Returned',
  '18': 'Self collect',
  '16': 'Delivered by franchisee',
  // Additional codes that might be missing
  '-2': 'Delivery Exception',
  '-1': 'Failed Delivery',
  '0': 'Unknown Status',
  '6': 'Delivered',
  '7': 'Delivery Attempted',
  '8': 'Out for Delivery',
  '9': 'Delivery Failed',
  '11': 'Processing',
  '12': 'Shipped',
  '13': 'In Transit',
  '14': 'Delivery Scheduled',
  '15': 'Delivery Rescheduled'
};

/**
 * Write Speedaf tracking data to Google Sheets
 */
export const run = async ({ params, logger, api }: any) => {
  try {
    logger.info("writeSpeedafDataToSheets action called");
    logger.info("Params received:", JSON.stringify(params, null, 2));

    const { shopId, trackingData } = params;

    if (!shopId) {
      throw new Error("shopId parameter is required");
    }

    if (!trackingData || !Array.isArray(trackingData) || trackingData.length === 0) {
      throw new Error("trackingData parameter is required and must be a non-empty array");
    }

    // Get Google Sheets configuration
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });

    if (!sheetConfig) {
      throw new Error("Google Sheets configuration not found for this shop");
    }

    if (!sheetConfig.spreadsheetId) {
      throw new Error("Spreadsheet ID not configured");
    }

    // Initialize Google Sheets client
    const { google } = await import('googleapis');
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    const credentials = JSON.parse(serviceAccountKey);

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = sheetConfig.spreadsheetId;
    const sheetName = "Speedaf";

    // Check if Speedaf sheet exists, create if not
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title'
    });

    const sheetExists = spreadsheet.data.sheets?.some((sheet: any) => 
      sheet.properties?.title === sheetName
    );

    if (!sheetExists) {
      logger.info(`Creating new sheet: ${sheetName}`);

      // Create the sheet (without headers - data starts from row 6)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      });

      logger.info(`Successfully created sheet "${sheetName}" (data will start from row 5)`);
    }

    // Get existing data from the sheet (starting from row 5)
    const existingDataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A5:B`
    });

    const existingData = existingDataResponse.data.values || [];
    const existingTrackingNumbers = new Map<string, { row: number, status: string }>();

    // Build map of existing tracking numbers (data starts from row 5)
    for (let i = 0; i < existingData.length; i++) {
      const row = existingData[i];
      if (row && row[0]) {
        existingTrackingNumbers.set(row[0], {
          row: i + 5, // Convert to 1-based row number starting from row 5
          status: row[1] || ''
        });
      }
    }

    logger.info(`Found ${existingTrackingNumbers.size} existing tracking numbers in sheet`);

    // SORTING APPROACH: Merge existing and new data, sort, then rewrite
    logger.info("Using sorting approach to maintain ascending order");

    // Create a map of all tracking data (existing + new)
    const allTrackingData = new Map<string, string>();
    let updatedCount = 0;
    let addedCount = 0;
    let skippedCount = 0;

    // Add existing data to the map
    for (let i = 0; i < existingData.length; i++) {
      const row = existingData[i];
      if (row && row[0]) {
        allTrackingData.set(row[0], row[1] || '');
      }
    }

    // Process new tracking data
    for (const item of trackingData) {
      const trackingNumber = item.trackingNumber;
      const statusCode = item.latestStatus || '';

      // Convert status code to description
      const statusDescription = SPEEDAF_ACTION_CODES[statusCode] || (statusCode ? `Unknown (${statusCode})` : '');

      if (!trackingNumber) {
        logger.warn("Skipping item with missing tracking number:", item);
        continue;
      }

      const existingStatus = allTrackingData.get(trackingNumber);

      if (existingStatus !== undefined) {
        // Tracking number exists - check if status needs updating
        if (existingStatus !== statusDescription) {
          allTrackingData.set(trackingNumber, statusDescription);
          updatedCount++;
          logger.info(`Updating status for ${trackingNumber}: "${existingStatus}" → "${statusDescription}" (code: ${statusCode})`);
        } else {
          // Status is the same - skip
          skippedCount++;
          logger.info(`Skipping ${trackingNumber} - status unchanged: "${statusDescription}"`);
        }
      } else {
        // New tracking number - add it
        allTrackingData.set(trackingNumber, statusDescription);
        addedCount++;
        logger.info(`Adding new tracking number: ${trackingNumber} with status: "${statusDescription}" (code: ${statusCode})`);
      }
    }

    // Sort all tracking numbers in ascending order
    const sortedTrackingNumbers = Array.from(allTrackingData.keys()).sort((a, b) => {
      // Extract numeric parts for proper sorting (e.g., MA123 vs MA124)
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;

      if (numA !== numB) {
        return numA - numB;
      }

      // If numeric parts are the same, sort alphabetically
      return a.localeCompare(b);
    });

    logger.info(`Sorted ${sortedTrackingNumbers.length} tracking numbers in ascending order`);

    // Prepare sorted data for writing
    const sortedRows = sortedTrackingNumbers.map(trackingNumber => [
      trackingNumber,
      allTrackingData.get(trackingNumber) || ''
    ]);

    // Clear existing data and write sorted data (if there are any changes)
    if (updatedCount > 0 || addedCount > 0) {
      // Clear the existing data range first (from row 5 onwards)
      if (existingData.length > 0) {
        const clearRange = `${sheetName}!A5:B${4 + existingData.length}`;
        await sheets.spreadsheets.values.clear({
          spreadsheetId,
          range: clearRange
        });
        logger.info(`Cleared existing data range: ${clearRange}`);
      }

      // Write sorted data with chunking for large datasets
      if (sortedRows.length > 0) {
        const CHUNK_SIZE = 1000; // Process in chunks of 1000 rows for very large datasets

        if (sortedRows.length <= CHUNK_SIZE) {
          // Small dataset - single write operation
          const writeRange = `${sheetName}!A5:B${4 + sortedRows.length}`;
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: writeRange,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: sortedRows
            }
          });
          logger.info(`Wrote ${sortedRows.length} sorted rows to range: ${writeRange}`);
        } else {
          // Large dataset - chunked write operations
          logger.info(`Large dataset detected (${sortedRows.length} rows). Using chunked writes...`);

          for (let i = 0; i < sortedRows.length; i += CHUNK_SIZE) {
            const chunk = sortedRows.slice(i, i + CHUNK_SIZE);
            const startRow = 5 + i;
            const endRow = startRow + chunk.length - 1;
            const chunkRange = `${sheetName}!A${startRow}:B${endRow}`;

            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range: chunkRange,
              valueInputOption: 'USER_ENTERED',
              requestBody: {
                values: chunk
              }
            });

            logger.info(`Wrote chunk ${Math.floor(i / CHUNK_SIZE) + 1}: ${chunk.length} rows to range ${chunkRange}`);

            // Small delay between chunks to avoid rate limiting
            if (i + CHUNK_SIZE < sortedRows.length) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }

          logger.info(`Completed chunked write: ${sortedRows.length} total rows in ${Math.ceil(sortedRows.length / CHUNK_SIZE)} chunks`);
        }
      }
    } else {
      logger.info("No changes detected - skipping sheet update");
    }

    const summary = {
      total: trackingData.length,
      added: addedCount,
      updated: updatedCount,
      skipped: skippedCount
    };

    logger.info("Speedaf data write completed:", summary);

    return {
      success: true,
      message: `Successfully processed ${summary.total} tracking records: ${summary.added} added, ${summary.updated} updated, ${summary.skipped} skipped`,
      summary
    };

  } catch (error) {
    logger.error("Error in writeSpeedafDataToSheets action:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  shopId: {
    type: "string",
    required: true
  },
  trackingData: {
    type: "array",
    required: true,
    items: {
      type: "object",
      properties: {
        trackingNumber: { type: "string" },
        latestStatus: { type: "string" }
      }
    }
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
