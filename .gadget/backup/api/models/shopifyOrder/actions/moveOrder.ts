import { google } from "googleapis";
import { standardizeMoroccanCity, standardizeMoroccanCitySync } from "../../../utils/cityStandardization";

// List of confirmation tags to check for
const CONFIRMATION_TAGS = [
  "confirmed",
  "✅ WhatF Confirmed",
  "Confirmed By Wtp 💬",
  "Confirmed By Call 📞",
  "Confirmed IG 📷",
  "Confirmed ✅"
];

// Helper function to check if any tag is a confirmation tag
function hasConfirmationTag(tags: string[]): boolean {
  const normalizedTags = tags.map(tag => tag.toLowerCase().trim());
  return normalizedTags.some(tag => 
    CONFIRMATION_TAGS.some(confirmTag => 
      tag.includes(confirmTag.toLowerCase()) || tag.includes('confirm')
    )
  );
}

/**
 * Initialize Google Sheets API client
 */
async function initGoogleSheetsClient(logger: any) {
  try {
    // Get service account credentials
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
    
    // Create JWT client
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    logger.error("Failed to initialize Google Sheets client", { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
}

/**
 * Ensure sheet exists
 */
async function ensureSheetExists(
  sheets: any,
  spreadsheetId: string, 
  sheetName: string,
  headers: string[],
  logger: any
): Promise<void> {
  try {
    // Get the list of sheets in the spreadsheet
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties.title'
    });
    
    // Check if the sheet exists
    const sheetExists = response.data.sheets?.some(
      (sheet: any) => sheet.properties?.title === sheetName
    );
    
    if (!sheetExists) {
      logger.info(`Sheet "${sheetName}" does not exist, creating it`);
      
      // Add the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: { title: sheetName }
            }
          }]
        }
      });
      
      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
    }
  } catch (error) {
    logger.error(`Error ensuring sheet exists: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Find rows by order ID in a specific column
 */
async function findRowsByOrderId(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  columnLetter: string, // e.g., "AF" for column AF
  orderId: string,
  logger: any
): Promise<number[]> {
  try {
    logger.info(`Finding rows for order ${orderId} in ${sheetName} sheet, column ${columnLetter}`);
    
    // Get the entire column
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${columnLetter}:${columnLetter}`
    });
    
    const values = result.data.values || [];
    const rowIndices: number[] = [];
    
    // Find all rows with matching order ID (1-indexed rows)
    for (let i = 0; i < values.length; i++) {
      if (values[i] && values[i][0] === orderId) {
        // Add 1 to convert to 1-indexed rows, as i is 0-indexed
        rowIndices.push(i + 1);
      }
    }
    
    logger.info(`Found ${rowIndices.length} rows with order ID ${orderId} in ${sheetName}`);
    return rowIndices;
  } catch (error) {
    logger.error(`Error finding rows by order ID: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

/**
 * Delete specific rows from a sheet
 */
async function deleteRows(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  rowsToDelete: number[],
  logger: any
): Promise<boolean> {
  if (!rowsToDelete.length) {
    logger.info(`No rows to delete in sheet ${sheetName}`);
    return true;
  }
  
  try {
    logger.info(`Deleting ${rowsToDelete.length} rows from ${sheetName}: ${rowsToDelete.join(', ')}`);
    
    // Get sheet ID first
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties'
    });
    
    const sheet = spreadsheet.data.sheets.find(
      (s: any) => s.properties.title === sheetName
    );
    
    if (!sheet) {
      throw new Error(`Sheet ${sheetName} not found`);
    }
    
    const sheetId = sheet.properties.sheetId;
    
    // Sort rows in descending order to avoid shifting issues
    const sortedRows = [...rowsToDelete].sort((a, b) => b - a);
    
    // Create delete requests for each row
    const requests = sortedRows.map(rowIndex => ({
      deleteDimension: {
        range: {
          sheetId,
          dimension: 'ROWS',
          startIndex: rowIndex - 1, // Convert 1-indexed to 0-indexed
          endIndex: rowIndex // Range is exclusive of end index
        }
      }
    }));
    
    // Execute all deletions in a single batch request
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests }
    });
    
    logger.info(`Successfully deleted rows from ${sheetName}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting rows: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Fetch order data from Shopify using GraphQL
 */
async function fetchOrderData(
  orderId: string,
  connections: any,
  logger: any
): Promise<any> {
  try {
    logger.info(`Fetching order data via GraphQL for order ID: ${orderId}`);
    
    // Optimized GraphQL query - fetching only what we need
    const graphqlQuery = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          createdAt
          displayFinancialStatus
          displayFulfillmentStatus
          tags
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          customer {
            firstName
            lastName
            phone
          }
          shippingAddress {
            address1
            address2
            city
            province
            zip
            phone
          }
          fulfillments {
            trackingInfo {
              number
            }
          }
          lineItems(first: 50) {
            edges {
              node {
                name
                quantity
                sku
                originalUnitPriceSet {
                  shopMoney {
                    amount
                  }
                }
                variant {
                  sku
                }
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      id: `gid://shopify/Order/${orderId}`
    };
    
    const result = await connections.shopify.current.graphql(graphqlQuery, variables);
    
    // Extract order data efficiently
    const orderData = result.data?.order || result.body?.data?.order || result.order;
    
    if (!orderData) {
      throw new Error("Order data not found in GraphQL response");
    }
    
    // Transform line items to a more usable format
    if (orderData?.lineItems?.edges) {
      orderData.lineItems = orderData.lineItems.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          name: node.name || 'Unknown Item',
          quantity: Number(node.quantity) || 1,
          sku: node.sku || node.variant?.sku || '',
          price: node.originalUnitPriceSet?.shopMoney?.amount || '0.00',
        };
      });
    } else {
      orderData.lineItems = [];
    }
    
    // Extract tracking number
    if (orderData.fulfillments && orderData.fulfillments.length > 0) {
      const trackingInfo = orderData.fulfillments[0]?.trackingInfo;
      orderData.trackingNumber = trackingInfo && trackingInfo.length > 0 
        ? trackingInfo[0].number 
        : '';
    } else {
      orderData.trackingNumber = '';
    }
    
    logger.info(`Successfully fetched order data: ${orderData.name}`);
    return orderData;
  } catch (error) {
    logger.error("Error fetching order data via GraphQL", { 
      error: error instanceof Error ? error.message : String(error),
      orderId
    });
    
    // Throw error instead of returning a placeholder
    throw new Error(`Failed to fetch order data: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Update tracking number in column C
 */
async function updateTrackingNumber(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  rowIndices: number[],
  trackingNumber: string,
  logger: any
): Promise<boolean> {
  if (!rowIndices.length || !trackingNumber) {
    return true;
  }
  
  try {
    logger.info(`Updating tracking number to ${trackingNumber} in ${rowIndices.length} rows`);
    
    // Create one update request for each row
    const updateRequests = rowIndices.map(rowIndex => ({
      range: `${sheetName}!C${rowIndex}`,
      values: [[trackingNumber]]
    }));
    
    // Execute all updates in a single batch request
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: updateRequests
      }
    });
    
    logger.info(`Successfully updated tracking numbers`);
    return true;
  } catch (error) {
    logger.error(`Error updating tracking numbers: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Copy tracking ID from column C to column Y and set column AA to true
 */
async function handleExchangeTag(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  rowIndices: number[],
  logger: any
): Promise<boolean> {
  if (!rowIndices.length) {
    return true;
  }
  
  try {
    logger.info(`Processing Exchange tag for ${rowIndices.length} rows`);
    
    // First, get the tracking numbers from column C
    const trackingRanges = rowIndices.map(rowIndex => `${sheetName}!C${rowIndex}`);
    
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: trackingRanges
    });
    
    const valueRanges = response.data.valueRanges || [];
    const updateRequests = [];
    
    // Create update requests for both column Y (tracking) and AA (checkbox)
    for (let i = 0; i < valueRanges.length; i++) {
      const trackingValue = valueRanges[i].values?.[0]?.[0] || '';
      const rowIndex = rowIndices[i];
      
      // Only update if we have a tracking value
      if (trackingValue) {
        // Update column Y (tracking)
        updateRequests.push({
          range: `${sheetName}!Y${rowIndex}`,
          values: [[trackingValue]]
        });
        
        // Set column AA to TRUE (checkbox)
        updateRequests.push({
          range: `${sheetName}!AA${rowIndex}`,
          values: [[true]]
        });
      }
    }
    
    if (updateRequests.length > 0) {
      // Execute all updates in a single batch request
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: updateRequests
        }
      });
    }
    
    logger.info(`Successfully processed Exchange tag updates`);
    return true;
  } catch (error) {
    logger.error(`Error processing Exchange tag: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Format phone number to a standardized format
 */
function formatMoroccanPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "");
  
  // If number starts with 212 (country code), remove it
  if (digits.startsWith("212")) {
    // If it's +212 followed by 0, remove the 0 (to avoid 00...)
    if (digits.length > 3 && digits[3] === '0') {
      digits = '0' + digits.substring(4);
    } else {
      digits = '0' + digits.substring(3);
    }
  }
  
  // If number starts with 0, keep it
  if (digits.startsWith("0")) {
    return digits;
  }
  
  // If number starts with 6 or 5 (mobile) or 2 (landline), add 0
  if (digits.startsWith("6") || digits.startsWith("5") || digits.startsWith("2")) {
    return "0" + digits;
  }
  
  // If we get here, return the cleaned number
  return digits;
}

/**
 * Extract phone number from order data
 */
function extractPhoneNumber(orderData: any): string {
  const phone = orderData.customer?.phone || orderData.shippingAddress?.phone || '';
  return formatMoroccanPhoneNumber(phone);
}

/**
 * Format address into a single line
 */
function formatAddress(shippingAddress: any): string {
  if (!shippingAddress) return "";
  
  return [
    shippingAddress.address1,
    shippingAddress.address2,
    shippingAddress.zip,
    shippingAddress.province
  ].filter(Boolean).join(", ");
}

/**
 * Get the customer name as a formatted string
 */
function formatCustomerName(customer: any): string {
  if (!customer) return "Unknown Customer";
  
  return [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ") || "Unknown Customer";
}

/**
 * Update specific columns in a row without affecting others
 */
async function updateSpecificColumns(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  rowIndex: number,
  columnValues: { [key: string]: string },
  logger: any
): Promise<boolean> {
  try {
    const batchRequests = Object.entries(columnValues).map(([column, value]) => ({
      range: `${sheetName}!${column}${rowIndex}`,
      values: [[value]]
    }));
    
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: batchRequests
      }
    });
    
    return true;
  } catch (error) {
    logger.error(`Error updating specific columns: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Update specific columns in multiple rows without affecting others
 */
async function updateBatchSpecificColumns(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  batchUpdates: Array<{ row: number, columns: { [key: string]: string } }>,
  logger: any
): Promise<boolean> {
  try {
    if (batchUpdates.length === 0) return true;
    
    const batchRequests = [];
    
    for (const update of batchUpdates) {
      for (const [column, value] of Object.entries(update.columns)) {
        batchRequests.push({
          range: `${sheetName}!${column}${update.row}`,
          values: [[value]]
        });
      }
    }
    
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: batchRequests
      }
    });
    
    return true;
  } catch (error) {
    logger.error(`Error updating batch specific columns: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Write order data to Google Sheets
 */
async function writeOrderToSheet(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  orderId: string,
  orderData: any,
  logger: any
): Promise<boolean> {
  try {
    logger.info(`Writing order ${orderId} to ${sheetName} sheet`);
    
    // Extract order information once
    const customerName = formatCustomerName(orderData.customer);
    const phone = extractPhoneNumber(orderData);
    const address = formatAddress(orderData.shippingAddress);
    const city = standardizeMoroccanCitySync(orderData.shippingAddress?.city || '');
    // Note: Date formatting removed - date column will remain empty
    const netAmount = orderData.totalPriceSet?.shopMoney?.amount || "0.00";
    const brutAmount = netAmount;
    const trackingNumber = orderData.trackingNumber || '';
    
    // Find the first empty row in column H (not A, since A uses a formula)
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!H6:H`
    });
    
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
    
    // Calculate position for order ID and order name columns
    const orderIdColumnIndex = 31; // For column AF (0-indexed)
    const orderNameColumnIndex = 25; // For column Z (0-indexed)
    
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
      
      // Additional update for column Z (order name) and AF (order ID)
      allRows.push(row);
      
      // Separate update for columns Z and AF
      await updateSpecificColumns(
        sheets,
        spreadsheetId,
        sheetName,
        startRow,
        {
          'Z': orderData.name || `#${orderId}`,
          'AF': orderId
        },
        logger
      );
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
      
      // Update order ID and name in columns Z and AF
      const batchUpdates = [];
      for (let i = 0; i < allRows.length; i++) {
        const currentRow = startRow + i;
        batchUpdates.push({
          row: currentRow,
          columns: {
            'Z': orderData.name || `#${orderId}`,
            'AF': orderId
          }
        });
      }
      
      // Process batch updates for Z and AF columns
      await updateBatchSpecificColumns(
        sheets,
        spreadsheetId,
        sheetName,
        batchUpdates,
        logger
      );
    }
    
    // Insert data at the identified first empty row, starting from column B to L only
    if (allRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!B${startRow}:L${startRow + allRows.length - 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: allRows
        }
      });
    }
    
    logger.info(`Successfully added ${allRows.length} rows for order ${orderData.name || orderId} at row ${startRow}`);
    return true;
  } catch (error) {
    logger.error(`Error writing order to sheet: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Move an order from Pending Orders to Orders sheet
 */
export async function moveOrderToOrdersSheet(
  orderId: string,
  shopId: string,
  connections: any,
  api: any,
  logger: any,
  trigger: string = 'manual',
  preloadedOrderData?: any
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
    
    // Use preloaded order data if provided, otherwise fetch it
    const orderData = preloadedOrderData || await fetchOrderData(orderId, connections, logger);
    
    if (!orderData) {
      logger.error(`Failed to fetch order data for order ${orderId}`);
      return false; // Exit without writing to sheet
    }
    
    logger.info(`Successfully fetched order data: ${orderData.name}`);
    
    // Check for confirmation tags
    const hasConfirmation = hasConfirmationTag(
      Array.isArray(orderData.tags) ? orderData.tags : 
      typeof orderData.tags === 'string' ? orderData.tags.split(/,\s*/) : []
    );
    
    if (hasConfirmation) {
      logger.info(`Order ${orderId} has confirmation tags, writing directly to Orders sheet`);
      
      // Find rows in Pending Orders
      const pendingRowIndices = await findRowsByOrderId(
        sheets,
        sheetConfig.spreadsheetId,
        "Pending Orders",
        "AF",
        orderId,
        logger
      );
      
      logger.info(`Found ${pendingRowIndices.length} rows with order ID ${orderId} in Pending Orders`);
      
      // Remove from Pending Orders sheet (if it exists there)
      if (pendingRowIndices.length > 0) {
        await deleteRows(
          sheets,
          sheetConfig.spreadsheetId,
          "Pending Orders",
          pendingRowIndices,
          logger
        );
      }
      
      // Write to Orders sheet
      await writeOrderToSheet(
        sheets,
        sheetConfig.spreadsheetId,
        "Orders",
        orderId,
        orderData,
        logger
      );
      
      return true;
    } else {
      logger.info(`Order ${orderId} doesn't have confirmation tags, no sheet change needed for ${trigger} update`);
      return false;
    }
  } catch (error: any) {
    logger.error(`Error moving order to Orders sheet: ${error.message}`);
    return false;
  }
} 
