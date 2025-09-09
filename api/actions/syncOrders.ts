/**
 * Syncs recent Shopify orders to Google Sheets
 * Checks for missing orders in both "Orders" and "Pending Orders" sheets
 */

import { ActionOptions } from "gadget-server";
import { google } from "googleapis";
import { standardizeMoroccanCitySync } from "../utils/cityStandardization";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    limit?: number,
    orders?: Array<{
      id: string;
      name: string;
      customerName: string;
      phone: string;
      address: string;
      city: string;
      rawCity: string;
      lineItems: Array<{
        name: string;
        quantity: number;
        sku: string;
        price: string;
      }>;
      totalPrice: string;
      displayFulfillmentStatus: string;
      createdAt: string;
      tags: string[];
      trackingNumber: string;
      isCancelled: boolean;
      isDeleted: boolean;
      isFulfillmentCancelled: boolean;
    }>
  },
  api: any, 
  logger: any
}) => Promise<any>;

/**
 * Initialize Google Sheets client with service account credentials
 */
async function initGoogleSheetsClient(logger: any) {
  try {
    // Get the service account credentials from environment variables
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
    
    // Create JWT client using service account
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    // Create the Google Sheets API client
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    logger.error(`Error initializing Google Sheets client: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Get the next ID to use in the Pending Orders sheet
 */
async function getNextId(sheets: any, spreadsheetId: string, sheetName: string, logger: any): Promise<number> {
  try {
    // Get the current maximum ID in column A
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    
    const values = response.data.values || [];
    let maxId = 0;
    
    // Skip the header row and find the highest numeric ID
    for (let i = 1; i < values.length; i++) {
      if (values[i] && values[i][0] && !isNaN(Number(values[i][0]))) {
        const id = Number(values[i][0]);
        if (id > maxId) {
          maxId = id;
        }
      }
    }
    
    logger.info(`Found maximum ID ${maxId} in ${sheetName}`);
    return maxId + 1;
  } catch (error) {
    logger.error(`Error getting next ID: ${error instanceof Error ? error.message : String(error)}`);
    return 1; // Default to 1 if we can't determine the next ID
  }
}

/**
 * Update specific cells in a row for a given spreadsheet
 */
async function updateBatchSpecificColumns(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  updates: Array<{
    row: number,
    columns: Record<string, string>
  }>,
  logger: any
): Promise<void> {
  try {
    // Get the sheet ID first
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId
    });
    
    const sheet = spreadsheet.data.sheets.find((s: any) => s.properties.title === sheetName);
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }
    
    const sheetId = sheet.properties.sheetId;
    
    // Convert column letters to indices (0-based)
    const columnToIndex = (col: string): number => {
      col = col.toUpperCase();
      let val = 0;
      for (let i = 0; i < col.length; i++) {
        val = val * 26 + (col.charCodeAt(i) - 64);
      }
      return val - 1; // Convert to 0-based index
    };
    
    // Prepare the batch update requests
    const requests = updates.map(update => {
      const rowIndex = update.row - 1; // Convert to 0-based index
      
      return Object.entries(update.columns).map(([col, value]) => {
        const colIndex = columnToIndex(col);
        
        return {
          updateCells: {
            rows: [
              {
                values: [
                  {
                    userEnteredValue: {
                      stringValue: String(value)
                    }
                  }
                ]
              }
            ],
            fields: "userEnteredValue",
            start: {
              sheetId: sheetId, // Use the actual sheet ID
              rowIndex: rowIndex,
              columnIndex: colIndex
            }
          }
        };
      });
    }).flat();
    
    // Execute the batch update if there are requests
    if (requests.length > 0) {
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests
        }
      });
      
      logger.info(`Updated ${requests.length} cells in ${sheetName}`);
    }
  } catch (error) {
    logger.error(`Error updating specific columns: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

// Enhanced rate limiting helper with better error handling
async function rateLimitedRequest<T>(
  requestFn: () => Promise<T>,
  logger: any,
  retryCount: number = 5,
  delayMs: number = 1000
): Promise<T> {
  for (let i = 0; i < retryCount; i++) {
    try {
      return await requestFn();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isRateLimit = errorMessage.includes('Quota exceeded') ||
                         errorMessage.includes('Rate limit') ||
                         errorMessage.includes('Too many requests') ||
                         errorMessage.includes('429');

      if (isRateLimit && i < retryCount - 1) {
        const backoffDelay = delayMs * Math.pow(2, i); // Exponential backoff
        logger.warn(`Rate limit hit, waiting ${backoffDelay}ms before retry ${i + 1}/${retryCount}`, { error: errorMessage });
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        continue;
      }

      // For non-rate-limit errors, still retry but with shorter delay
      if (i < retryCount - 1) {
        logger.warn(`Request failed, retrying in ${delayMs}ms (${i + 1}/${retryCount})`, { error: errorMessage });
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }

      throw error;
    }
  }
  throw new Error(`Failed after ${retryCount} retries`);
}

// Removed checkIfOrderExistsInSheet function since we no longer store order IDs in sheets

/**
 * Write an order to Google Sheets
 */
async function writeOrderToSheet(
  orderData: {
    id: string;
    name: string;
    customerName: string;
    phone: string;
    address: string;
    city: string;
    rawCity: string;
    lineItems: Array<{
      name: string;
      quantity: number;
      sku: string;
      price: string;
    }>;
    totalPrice: string;
    displayFulfillmentStatus: string;
    createdAt: string;
    tags: string[];
    trackingNumber: string;
    isCancelled: boolean;
    isDeleted: boolean;
    isFulfillmentCancelled: boolean;
  },
  shopId: string,
  api: any,
  logger: any,
  sheetName: string
): Promise<boolean> {
  try {
    // Get Google Sheet configuration
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });
    
    if (!sheetConfig) {
      throw new Error(`Google Sheet configuration not found for shop ${shopId}`);
    }
    
    // Initialize Sheets client
    const sheets = await initGoogleSheetsClient(logger);
    
    // Note: Removed duplicate check since we no longer store order IDs in sheets
    // This allows orders to be written multiple times if needed

    // Skip cancelled, deleted orders or those with cancelled fulfillment
    if (orderData.isCancelled || orderData.isDeleted || orderData.isFulfillmentCancelled) {
      logger.info(`Skipping order ${orderData.id} as it is cancelled, deleted, or has cancelled fulfillment`);
      return true;
    }
    
    // Note: Date formatting removed - date column will remain empty
    
    // Get customer name, address, phone and city
    const customerName = orderData.customerName;
    const address = orderData.address;
    const phone = orderData.phone;
    const city = orderData.city;
    
    // Get order amounts
    const netAmount = orderData.totalPrice;
    const brutAmount = orderData.totalPrice;
    const trackingNumber = orderData.trackingNumber;

    // Get the order name column index (Z)
    const orderNameColumnIndex = 25; // 0-based index of column Z

    if (sheetName === "Orders") {
      // For Orders sheet: find first empty row starting from row 6 in column H
      const result = await rateLimitedRequest(
        () => sheets.spreadsheets.values.get({
          spreadsheetId: sheetConfig.spreadsheetId,
          range: `${sheetName}!H6:H`
        }),
        logger
      );
      
      // Find the first empty cell in column H
      const values = result.data.values || [];
      let startRow = 6; // Starting from row 6
      
      for (let i = 0; i < values.length; i++) {
        if (!values[i] || !values[i][0] || values[i][0] === "") {
          startRow = i + 6; // Add 6 because we started from row 6
          break;
        }
        
        // If we reach the end without finding an empty cell, append after the last row
        if (i === values.length - 1) {
          startRow = 6 + values.length;
        }
      }
      
      logger.info(`Found first empty row at position ${startRow} in ${sheetName} sheet`);
      
      // Prepare row data for each line item
      const allRows = [];
      const lineItems = orderData.lineItems || [];
      
      if (lineItems.length === 0) {
        // No line items, create a single row with empty SKU
        // Only include columns B through L (indices 0-10 after slicing)
        const row = Array(11).fill(""); // B through L (11 columns)
        
        // Fill in the known values - Starting from B (index 0 after slicing)
        row[0] = "";                                   // Date - B (left empty)
        row[1] = trackingNumber;                       // Tracking - C
        row[2] = "";                                   // Post (left blank) - D
        row[3] = "";                                   // SKU (empty) - E
        row[4] = customerName;                         // Full name - F
        row[5] = address;                              // Address - G
        row[6] = phone;                                // Phone - H
        row[7] = city;                                 // City - I
        row[8] = netAmount;                            // NET Amount - J
        row[9] = brutAmount;                           // Brut Amount - K
        row[10] = "";                                  // Return Status - L
        
        allRows.push(row);
      } else {
        // Create a row for each quantity of each line item
        let isFirstLineItem = true;
        
        for (const item of lineItems) {
          const itemSku = item.sku || '';
          const quantity = item.quantity || 1;
          
          // Create one row per quantity value
          for (let i = 0; i < quantity; i++) {
            // Only include columns B through L (indices 0-10 after slicing)
            const row = Array(11).fill(""); // B through L (11 columns)
            
            // Fill in the known values - Starting from B (index 0 after slicing)
            row[0] = "";                                   // Date - B (left empty)
            row[1] = trackingNumber;                       // Tracking - C
            row[2] = "";                                   // Post (left blank) - D
            row[3] = itemSku;                              // SKU - E
            row[4] = customerName;                         // Full name - F
            row[5] = address;                              // Address - G
            row[6] = phone;                                // Phone - H
            row[7] = city;                                 // City - I
            row[8] = item.price || "0.00";                 // NET Amount - J
            // Only the first line item gets the brut amount (total order price)
            row[9] = isFirstLineItem ? brutAmount : "0.00"; // Brut Amount - K
            row[10] = "";                                  // Return Status - L
            
            allRows.push(row);
            
            if (isFirstLineItem) {
              isFirstLineItem = false;
            }
          }
        }
        
        // Update only order name in column Z (removed order ID from column AF)
        const batchUpdates = [];
        for (let i = 0; i < allRows.length; i++) {
          const currentRow = startRow + i;
          batchUpdates.push({
            row: currentRow,
            columns: {
              'Z': orderData.name
            }
          });
        }

        // Process batch updates for Z column only
        await updateBatchSpecificColumns(
          sheets,
          sheetConfig.spreadsheetId,
          sheetName,
          batchUpdates,
          logger
        );
      }
      
      // Insert data at the identified first empty row, starting from column B to L only
      if (allRows.length > 0) {
        await rateLimitedRequest(
          () => sheets.spreadsheets.values.update({
            spreadsheetId: sheetConfig.spreadsheetId,
            range: `${sheetName}!B${startRow}:L${startRow + allRows.length - 1}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: allRows
            }
          }),
          logger
        );
        
        logger.info(`Successfully added ${allRows.length} rows for order ${orderData.name} at row ${startRow}`);
      } else {
        logger.warn(`No line items to write for order ${orderData.id}`);
      }
    } else {
      // For Pending Orders sheet - use the original approach
      // Get next ID
      const nextId = await getNextId(sheets, sheetConfig.spreadsheetId, sheetName, logger);
      
      // Prepare row data for each line item
      const allRows = [];
      const lineItems = orderData.lineItems || [];
      let rowIdCounter = nextId;
      
      if (lineItems.length === 0) {
        // No line items, create a single row with empty SKU
        const singleRow = Array(50).fill(""); // Create a large enough array to reach column AF
        
        // Fill in the known values
        singleRow[0] = rowIdCounter;                              // ID - A
        singleRow[1] = "";                                        // Date - B (left empty)
        singleRow[2] = "";                                        // C - Leave empty
        singleRow[3] = "";                                        // Post (left blank) - D
        singleRow[4] = "";                                        // SKU (empty) - E
        singleRow[5] = customerName;                              // Full name - F
        singleRow[6] = address;                                   // Address - G
        singleRow[7] = phone;                                     // Phone - H
        singleRow[8] = city;                                      // City - I
        singleRow[9] = netAmount;                                 // NET Amount - J
        singleRow[10] = brutAmount;                               // Brut Amount - K
        singleRow[11] = "";                                       // Return Status - L
        singleRow[12] = orderData.displayFulfillmentStatus || "";   // Shipping Status - M

        // Add order name to column Z (removed order ID from column AF)
        singleRow[orderNameColumnIndex] = orderData.name;
        
        allRows.push(singleRow);
      } else {
        // Create a row for each quantity of each line item
        for (const item of lineItems) {
          const itemSku = item.sku || '';
          const quantity = item.quantity || 1;
          
          // Create one row per quantity value
          for (let i = 0; i < quantity; i++) {
            const row = Array(50).fill(""); // Create a large enough array to reach column AF
            
            // Fill in the known values
            row[0] = rowIdCounter++;                              // ID - A
            row[1] = "";                                          // Date - B (left empty)
            row[2] = "";                                          // C - Leave empty
            row[3] = "";                                          // Post (left blank) - D
            row[4] = itemSku;                                     // SKU (specific to this line item) - E
            row[5] = customerName;                                // Full name - F
            row[6] = address;                                     // Address - G
            row[7] = phone;                                       // Phone - H
            row[8] = city;                                        // City - I
            row[9] = item.price || "0.00";                        // NET Amount - J (individual line item price)
            row[10] = i === 0 ? brutAmount : "0.00";              // Brut Amount - K (total only for first item)
            row[11] = "";                                         // Return Status - L
            row[12] = orderData.displayFulfillmentStatus || "";   // Shipping Status - M

            // Add order name to column Z (removed order ID from column AF)
            row[orderNameColumnIndex] = orderData.name;
            
            allRows.push(row);
          }
        }
      }
      
      // Batch append data to Google Sheets
      await rateLimitedRequest(
        () => sheets.spreadsheets.values.append({
          spreadsheetId: sheetConfig.spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            values: allRows
          }
        }),
        logger
      );
    }
    
    return true;
  } catch (error) {
    logger.error(`Error writing order ${orderData.id} to sheet ${sheetName}: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Process the sync in the background
 * This function does the actual work after we've already returned to the user
 */
async function processSyncInBackground(api: any, orders: any[], logger: any) {
  try {
    logger.info(`Background job: Starting to sync ${orders.length} orders to Google Sheets`);

    // Get the current shop - use API method instead of connections
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      throw new Error("Shop not found");
    }

    const shopId = String(shop.id);
    
    // Counter for tracking sync results
    const results = {
      totalOrders: orders.length,
      processedOrders: 0,
      confirmedOrders: 0,
      pendingOrders: 0,
      skippedOrders: 0,
      errors: 0
    };

    // Process each order
    for (const order of orders) {
      try {
        // Determine which sheet to write to based on tags and fulfillment status
        const orderTags = order.tags;
        const tags = Array.isArray(orderTags) ? orderTags : 
                     typeof orderTags === 'string' ? orderTags.split(',').map(t => t.trim()) : [];

        const confirmationTags = [
          "✅ WhatF Confirmed",
          "Confirmed By Wtp 💬",
          "Confirmed By Call 📞",
          "Confirmed IG 📷",
          "Confirmed ✅"
        ];

        // Check if order has any confirmation tags
        const isConfirmed = tags.some(tag => 
          confirmationTags.some(confirmTag => tag.includes(confirmTag))
        );

        // Check if order is fulfilled
        const isFulfilled = order.displayFulfillmentStatus === 'FULFILLED';

        // Determine the target sheet
        const targetSheet = (isConfirmed || isFulfilled) ? "Orders" : "Pending Orders";

        // Apply discounts and shipping absorption before writing to sheet
        let processedOrder = order;
        try {
          const absorptionResult = await api.applyDiscountsAndShipping({
            orderId: order.id,
            testMode: false
          });
          
          if (absorptionResult.success && absorptionResult.testResults) {
            const { lineItems, absorption, orderInfo } = absorptionResult.testResults;
            
            // Check if any absorption was applied
            const hasAbsorption = absorption.totalAbsorbed > 0;
            
            if (hasAbsorption) {
              logger.info(`Applied absorption to order ${order.name}`, {
                shippingAbsorbed: absorption.totalShippingAbsorbed,
                discountAbsorbed: absorption.totalDiscountAbsorbed,
                totalAbsorbed: absorption.totalAbsorbed,
                originalTotal: orderInfo.originalOrderTotal,
                newTotal: absorption.newOrderTotal
              });
              
              // Create processed order with updated values
              processedOrder = {
                ...order,
                lineItems: lineItems.map((item: any) => ({
                  ...order.lineItems?.find((origItem: any) => origItem.id === item.id) || {},
                  id: item.id,
                  name: item.name,
                  sku: item.sku,
                  quantity: item.quantity,
                  price: item.newPrice.toFixed(2), // Use absorbed price
                  originalPrice: item.originalPrice.toFixed(2)
                })),
                totalPrice: absorption.newOrderTotal.toFixed(2), // Use absorbed total
                originalTotalPrice: orderInfo.originalOrderTotal.toFixed(2),
                absorptionApplied: true,
                shippingAbsorbed: absorption.totalShippingAbsorbed,
                discountAbsorbed: absorption.totalDiscountAbsorbed
              };
            } else {
              logger.debug(`No absorption applied to order ${order.name}: ${absorptionResult.testResults.summary.message}`);
            }
          } else {
            logger.debug(`Absorption calculation failed for order ${order.name}`);
          }
        } catch (absorptionError) {
          logger.error(`Error applying absorption to order ${order.name}`, { 
            error: absorptionError instanceof Error ? absorptionError.message : String(absorptionError)
          });
          // Continue with original order if absorption fails
        }

        // Write the processed order to the appropriate sheet
        const writeResult = await writeOrderToSheet(
          processedOrder,
          shopId,
          api,
          logger,
          targetSheet
        );

        // Update counters
        results.processedOrders++;
        if (targetSheet === "Orders") {
          results.confirmedOrders++;
        } else {
          results.pendingOrders++;
        }

        logger.info(`Processed order ${order.id} for sheet ${targetSheet}: ${writeResult ? 'success' : 'failed'}`);
      } catch (orderError) {
        logger.error(`Error processing order ${order.id}: ${orderError instanceof Error ? orderError.message : String(orderError)}`);
        results.errors++;
      }
    }

    logger.info(`Background job completed: ${results.processedOrders} orders processed`);
    return results;
  } catch (error) {
    logger.error(`Background job error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    const orders = params.orders || [];
    
    if (orders.length === 0) {
      return {
        success: false,
        error: "No orders provided to sync"
      };
    }
    
    logger.info(`Starting to sync ${orders.length} orders to Google Sheets`);

    // Start background processing without waiting for it to complete
    // This ensures we return to the user immediately
    setImmediate(() => {
      processSyncInBackground(api, orders, logger)
        .then(results => {
          logger.info(`Background sync completed with results: ${JSON.stringify(results)}`);
        })
        .catch(error => {
          logger.error(`Background sync failed: ${error}`);
        });
    });

    // Return success immediately
    return {
      success: true,
      message: `Order sync process initiated for ${orders.length} orders`,
      backgroundProcessing: true
    };
  } catch (error) {
    logger.error(`Error initiating order sync: ${error instanceof Error ? error.message : String(error)}`);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  limit: {
    type: "number",
    required: false
  },
  orders: {
    type: "array",
    required: false,
    items: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        customerName: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        city: { type: "string" },
        rawCity: { type: "string" },
        lineItems: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              quantity: { type: "number" },
              sku: { type: "string" },
              price: { type: "string" }
            }
          }
        },
        totalPrice: { type: "string" },
        displayFulfillmentStatus: { type: "string" },
        createdAt: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        trackingNumber: { type: "string" },
        isCancelled: { type: "boolean" },
        isDeleted: { type: "boolean" },
        isFulfillmentCancelled: { type: "boolean" }
      }
    }
  }
};

export const options: ActionOptions = {
  triggers: { 
    api: true,
    scheduler: [
      {
        cron: "0 */6 * * *" // Run every 6 hours (at minute 0 of hours 0, 6, 12, and 18)
      }
    ]
  },
  returnType: true
}; 