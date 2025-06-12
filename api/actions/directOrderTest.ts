/**
 * Direct test for processing a specific order to Google Sheets
 * Uses the exact structure requested for order data recording
 */

import { ActionOptions } from "gadget-server";
import { google } from "googleapis";
import { standardizeMoroccanCitySync } from "../utils/cityStandardization";

// Define the action run function type
type ActionRun = (context: { 
  params: { orderId: string; shopId: string },
  api: any, 
  logger: any, 
  connections: any 
}) => Promise<any>;

// ========== UTILITY FUNCTIONS ==========

/**
 * Format Moroccan phone number to a standardized format
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
 * Format phone number to a standardized format for non-Moroccan numbers
 */
function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Return empty string if no digits
  if (!digitsOnly) return "";
  
  // Format based on length
  if (digitsOnly.length === 10) {
    return `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
  } else if (digitsOnly.length > 10) {
    // For international numbers, keep the format simple
    return `+${digitsOnly}`;
  } else {
    // If less than 10 digits, return as is
    return digitsOnly;
  }
}

/**
 * Extract phone number from multiple possible locations
 */
function extractPhoneNumber(orderData: any): string {
  // Try multiple possible locations for phone number
  let phone = '';
  
  if (orderData.customer?.phone) {
    phone = orderData.customer.phone;
  } else if (typeof orderData.phone === 'string' && orderData.phone.trim() !== '') {
    phone = orderData.phone;
  } else if (orderData.shippingAddress && typeof orderData.shippingAddress === 'object') {
    // Sometimes phone is nested in the shipping address
    if (typeof orderData.shippingAddress.phone === 'string' && orderData.shippingAddress.phone.trim() !== '') {
      phone = orderData.shippingAddress.phone;
    }
  }
  
  // Use the Moroccan phone number formatter
  return formatMoroccanPhoneNumber(phone);
}

/**
 * Format financial status for consistent display
 */
function formatFinancialStatus(status: string | null | undefined): {
  status: string,
  tone: 'success' | 'attention' | 'warning' | 'info'
} {
  if (!status) {
    return { status: 'PENDING', tone: 'attention' };
  }
  
  // Convert to uppercase for consistent display
  const financialStatus = String(status).toUpperCase();
  
  // Set appropriate badge tone based on status
  let tone: 'success' | 'attention' | 'warning' | 'info' = 'attention';
  
  if (financialStatus.includes('PAID') || financialStatus === 'AUTHORIZED') {
    tone = 'success';
  } else if (financialStatus.includes('REFUND') || financialStatus.includes('DECLINED')) {
    tone = 'warning';
  } else if (financialStatus === 'VOIDED' || financialStatus === 'CANCELED') {
    tone = 'info';
  }
  
  return { status: financialStatus, tone };
}

/**
 * Extract confirmation tag from order tags
 */
function extractConfirmationTag(orderData: any, confirmationTags: string[]): string {
  if (!orderData.tags) return '';
  
  // If tags is a string, split it
  const tagArray = typeof orderData.tags === 'string' 
    ? orderData.tags.split(/,\s*/) 
    : Array.isArray(orderData.tags) ? orderData.tags : [];
  
  // Find the first matching tag
  for (const tag of tagArray) {
    const strTag = String(tag);
    for (const confirmTag of confirmationTags) {
      if (strTag.includes(confirmTag)) {
        return strTag;
      }
    }
  }
  
  return '';
}

/**
 * Helper function to calculate Levenshtein distance between two strings
 */
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Extract city from a shipping address
 */
function extractCity(shippingAddress: any): string {
  if (!shippingAddress) return "";
  
  // Directly return city if available
  if (shippingAddress.city) return shippingAddress.city;
  
  // Try to extract from address (simple heuristic)
  const address = shippingAddress.address1 || "";
  const cityMatch = address.match(/,\s*([^,]+),\s*[A-Z]{2}/i);
  
  return cityMatch && cityMatch[1] ? cityMatch[1].trim() : "";
}

/**
 * Extract SKU from line items
 */
function extractSku(lineItems: any[]): string {
  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return "";
  }
  
  // Get the first line item's SKU
  const firstItem = lineItems[0];
  
  // Try to get the SKU from various possible locations
  return (
    firstItem.sku || 
    (firstItem.variant && firstItem.variant.sku) || 
    ""
  );
}

/**
 * Extract all SKUs from line items
 */
function extractAllSkus(lineItems: any[]): string[] {
  if (!lineItems || !Array.isArray(lineItems)) {
    return [];
  }
  
  return lineItems
    .map((item: any) => item.sku || (item.variant && item.variant.sku) || '')
    .filter((sku: string) => sku && sku !== '');
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
 * Get the last ID from the sheet and increment it
 */
async function getNextId(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  logger: any
): Promise<number> {
  try {
    // Read the first column (ID column) to find the last ID
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`
    });
    
    const values = result.data.values || [];
    let lastId = 0;
    
    // Skip the header row and find the last numeric ID
    for (let i = 1; i < values.length; i++) {
      if (values[i] && values[i][0] && !isNaN(parseInt(values[i][0]))) {
        const currentId = parseInt(values[i][0]);
        lastId = Math.max(lastId, currentId);
      }
    }
    
    logger.info(`Last ID found in sheet: ${lastId}, next ID will be: ${lastId + 1}`);
    return lastId + 1;
  } catch (error) {
    logger.error(`Error getting next ID, starting with ID 1`, { error });
    return 1; // Default to 1 if we can't read the sheet
  }
}

/**
 * Ensure the spreadsheet and sheet exist, creating them if needed
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
      
      logger.info(`Created sheet "${sheetName}" with headers`);
    }
  } catch (error) {
    logger.error(`Error ensuring sheet exists: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

/**
 * Fetches order data from Shopify using GraphQL API
 */
async function fetchOrderData(
  orderId: string,
  connections: any,
  logger: any
): Promise<any> {
  // Format GraphQL query with proper field selection
  const graphqlQuery = `
    query GetOrder($id: ID!) {
      order(id: $id) {
        id
        name
        createdAt
        displayFinancialStatus
        displayFulfillmentStatus
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        tags
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        shippingAddress {
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        fulfillmentOrders(first: 5) {
          edges {
            node {
              id
              status
            }
          }
        }
        lineItems(first: 50) {
          edges {
            node {
              id
              name
              quantity
              sku
              variant {
                id
                sku
                price
                product {
                  id
                  title
                  handle
                }
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
  
  // Execute the GraphQL query
  logger.info("Executing GraphQL query", { variables });
  
  try {
    const result = await connections.shopify.current.graphql(graphqlQuery, variables);
    
    // Log the complete response structure for debugging
    logger.info("GraphQL response structure", {
      resultType: typeof result,
      keys: result ? Object.keys(result) : [],
      hasData: result?.data !== undefined,
      dataKeys: result?.data ? Object.keys(result.data) : [],
      hasNestedData: result?.data?.data !== undefined,
      hasBody: result?.body !== undefined,
      hasOrder: result?.order !== undefined,
      fullResponse: JSON.stringify(result)  // Log the full response for detailed debugging
    });
    
    if (!result) {
      throw new Error("No GraphQL response received");
    }
    
    // Handle different possible response formats
    const orderData = 
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure
    
    if (!orderData) {
      // Check for errors in various locations
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
      }
      
      // Check for HTTP error status
      if (result?.statusCode && result.statusCode >= 400) {
        throw new Error(`HTTP ${result.statusCode} Error: ${result.statusMessage || "Unknown HTTP error"}`);
      }
      
      throw new Error(`Order data not found in response: ${JSON.stringify(result).substring(0, 200)}...`);
    }
    
    // Transform line items to a more usable format
    if (orderData?.lineItems?.edges && Array.isArray(orderData.lineItems.edges)) {
      orderData.lineItems = orderData.lineItems.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          id: node.id || '',
          name: node.name || 'Unknown Item',
          quantity: Number(node.quantity) || 1,
          sku: node.sku || node.variant?.sku || '',
          price: node.variant?.price || '0.00',
          product: node.variant?.product ? {
            id: node.variant.product.id,
            title: node.variant.product.title,
            handle: node.variant.product.handle
          } : null
        };
      });
    } else {
      orderData.lineItems = [];
      logger.warn("No line items found in order data");
    }
    
    // Transform fulfillment orders to a more usable format
    if (orderData?.fulfillmentOrders?.edges && Array.isArray(orderData.fulfillmentOrders.edges)) {
      orderData.fulfillmentOrders = orderData.fulfillmentOrders.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          id: node.id || '',
          status: node.status || 'UNKNOWN'
        };
      });
    } else {
      orderData.fulfillmentOrders = [];
      logger.warn("No fulfillment orders found for order");
    }
    
    logger.info(`Successfully fetched order data: ${orderData.name}`);
    return orderData;
  } catch (error) {
    logger.error("Error fetching order data from Shopify", { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
}

/**
 * Extract fulfillment order ID from order data
 * Prefers OPEN status fulfillment orders if available
 */
function extractFulfillmentOrderId(orderData: any): string {
  if (!orderData?.fulfillmentOrders || !Array.isArray(orderData.fulfillmentOrders) || orderData.fulfillmentOrders.length === 0) {
    return "";
  }
  
  // Prefer OPEN status fulfillment orders if available
  const openFulfillmentOrders = orderData.fulfillmentOrders.filter((fo: any) => fo.status === "OPEN");
  
  if (openFulfillmentOrders.length > 0) {
    // Extract the numeric ID from the GID format (gid://shopify/FulfillmentOrder/12345678)
    const rawId = openFulfillmentOrders[0].id;
    return rawId.split('/').pop() || rawId;
  }
  
  // If no OPEN status fulfillment orders, return the first one's ID
  const rawId = orderData.fulfillmentOrders[0].id;
  return rawId.split('/').pop() || rawId;
}

/**
 * Initialize Google Sheets API client
 */
async function initGoogleSheetsClient(logger: any) {
  try {
    // Get service account credentials and create JWT client
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
    
    // Create and return the Google Sheets API client
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    logger.error("Failed to initialize Google Sheets client", { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
}

// ========== MAIN ACTION FUNCTION ==========

export const run: ActionRun = async ({ params, api, logger, connections }) => {
  try {
    // Validate and sanitize parameters
    if (!params.orderId) {
      throw new Error("orderId parameter is required");
    }
    
    if (!params.shopId) {
      throw new Error("shopId parameter is required");
    }
    
    // Ensure IDs are strings and contain only digits
    const orderId = String(params.orderId).replace(/\D/g, '');
    const shopId = String(params.shopId).replace(/\D/g, '');
    
    if (!orderId) {
      throw new Error("Invalid orderId format: must contain digits");
    }
    
    if (!shopId) {
      throw new Error("Invalid shopId format: must contain digits");
    }
    
    logger.info(`Processing order ${orderId} for shop ${shopId}`);
    
    // 1. Verify the shop exists
    const shop = await api.shopifyShop.findById(shopId);
    if (!shop) {
      throw new Error(`Shop with ID ${shopId} not found`);
    }
    
    // 2. Verify the order exists (basic check)
    const orderBasic = await api.shopifyOrder.findById(orderId);
    if (!orderBasic) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    // 3. Ensure we have a valid Shopify connection
    if (!connections?.shopify?.current?.graphql) {
      throw new Error("Shopify connection not properly initialized");
    }
    
    // 4. Get Google Sheet configuration
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });
    
    if (!sheetConfig) {
      throw new Error(`Google Sheet configuration not found for shop ${shopId}`);
    }
    
    // 5. Validate spreadsheet ID
    if (!/^[a-zA-Z0-9_-]+$/.test(sheetConfig.spreadsheetId)) {
      throw new Error(`Invalid Google Sheet ID: ${sheetConfig.spreadsheetId}`);
    }
    
    // 6. Fetch detailed order data from Shopify
    const orderData = await fetchOrderData(orderId, connections, logger);
    
    // Extract the fulfillment order ID
    const fulfillmentOrderId = extractFulfillmentOrderId(orderData);
    logger.info(`Extracted fulfillment order ID: ${fulfillmentOrderId || 'None found'}`);
    
    // 7. Initialize Google Sheets client
    const sheets = await initGoogleSheetsClient(logger);
    
    // 8. Define sheet name and headers
    const sheetName = "Pending Orders";
    const headers = [
      "ID", "Date", "Order Code", "Post", "SKU", "Full name", 
      "Address", "Phone", "City", "NET Amount", "Brut Amount",
      "Return Status", "Shipping Status", "Payment status"
    ];
    
    // 9. Ensure sheet exists
    await ensureSheetExists(sheets, sheetConfig.spreadsheetId, sheetName, headers, logger);
    
    // 10. Get next ID for the order
    const nextId = await getNextId(sheets, sheetConfig.spreadsheetId, sheetName, logger);
    
    // 11. Extract customer information with enhanced formatting
    const customerName = formatCustomerName(orderData.customer);
    const phone = extractPhoneNumber(orderData);
    const email = orderData.customer?.email || '';
    
    // Format address
    const address = formatAddress(orderData.shippingAddress);
    
    // Standardize city name
    const rawCity = orderData.shippingAddress?.city || '';
    const city = standardizeMoroccanCitySync(rawCity);
    
    // Log city standardization for debugging
    if (rawCity && city !== rawCity) {
      logger.info(`Standardized city name: "${rawCity}" -> "${city}"`);
    }
    
    // Extract SKU from line items
    const sku = extractSku(orderData.lineItems);
    const skus = extractAllSkus(orderData.lineItems);
    
    // Format financial status with tone
    const { status: financialStatus, tone: statusTone } = 
      formatFinancialStatus(orderData.displayFinancialStatus);
    
    // Extract confirmation tag
    const confirmationTag = extractConfirmationTag(orderData, [
      "✅ WhatF Confirmed",
      "Confirmed By Wtp 💬",
      "Confirmed By Call 📞",
      "Confirmed IG 📷",
      "Confirmed ✅"
    ]);
    
    const formattedDate = new Date(orderData.createdAt).toLocaleDateString('en-US');
    const netAmount = orderData.totalPriceSet?.shopMoney?.amount || "0.00";
    const brutAmount = netAmount; // Same as net amount unless there's a specific calculation
    
    // 12. Format row data for each line item
    const allRows = [];
    const lineItems = orderData.lineItems || [];
    
    // Define column indices
    const fulfillmentOrderIdColumnIndex = 25; // Column Z (zero-based index 25)
    const orderIdColumnIndex = 31; // Column AF
    
    if (lineItems.length === 0) {
      // No line items, create a single row with empty SKU
      const singleRow = [
        nextId,                                   // ID - A
        formattedDate,                            // Date - B
        "",                                       // C - Leave empty (was Order Code)
        "",                                       // Post (left blank) - D
        "",                                       // SKU (empty) - E
        customerName,                             // Full name - F
        address,                                  // Address - G
        phone,                                    // Phone - H
        city,                                     // City - I
        netAmount,                                // NET Amount - J
        brutAmount,                               // Brut Amount - K
        "",                                       // Return Status (left blank) - L
        orderData.displayFulfillmentStatus || "", // Shipping Status - M
        financialStatus                           // Payment status - N
      ];
      
      // Extend array to include column Z for fulfillment order ID
      while (singleRow.length <= fulfillmentOrderIdColumnIndex) {
        singleRow.push("");
      }
      
      // Add the Fulfillment Order ID at column Z
      singleRow[fulfillmentOrderIdColumnIndex] = fulfillmentOrderId;
      
      // Extend further to include column AF for order ID
      while (singleRow.length <= orderIdColumnIndex) {
        singleRow.push("");
      }
      
      // Add the Shopify order ID at position for column AF
      singleRow[orderIdColumnIndex] = orderId;
      
      allRows.push(singleRow);
    } else {
      // Create a row for each line item
      lineItems.forEach((item: any, index: number) => {
        const itemSku = item.sku || '';
        const rowId = nextId + index; // Each row gets a unique ID
        
        const row = [
          rowId,                                    // ID - A
          formattedDate,                            // Date - B
          "",                                       // C - Leave empty (was Order Code)
          "",                                       // Post (left blank) - D
          itemSku,                                  // SKU (specific to this line item) - E
          customerName,                             // Full name - F
          address,                                  // Address - G
          phone,                                    // Phone - H
          city,                                     // City - I
          netAmount,                                // NET Amount - J
          brutAmount,                               // Brut Amount - K
          "",                                       // Return Status (left blank) - L
          orderData.displayFulfillmentStatus || "", // Shipping Status - M
          financialStatus                           // Payment status - N
        ];
        
        // Extend array to include column Z for fulfillment order ID
        while (row.length <= fulfillmentOrderIdColumnIndex) {
          row.push("");
        }
        
        // Add the Fulfillment Order ID at column Z
        row[fulfillmentOrderIdColumnIndex] = fulfillmentOrderId;
        
        // Extend further to include column AF for order ID
        while (row.length <= orderIdColumnIndex) {
          row.push("");
        }
        
        // Add the Shopify order ID at position for column AF
        row[orderIdColumnIndex] = orderId;
        
        allRows.push(row);
      });
    }
    
    logger.info(`Created ${allRows.length} rows for order ${orderData.name}`);
    
    // 13. Write all rows to the sheet - update to use A:AJ range which includes column AF
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetConfig.spreadsheetId,
      range: `${sheetName}!A:AJ`,  // Range includes column AF (column 32)
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS', // Explicitly set to insert rows
      requestBody: {
        values: allRows
      }
    });
    
    logger.info(`Successfully added ${allRows.length} entries for order ${orderData.name} to sheet ${sheetName}`);
    
    // 14. Return success response with enhanced order details
    return {
      success: true,
      message: `Successfully processed order ${orderData.name} with ${allRows.length} line items`,
      spreadsheetId: sheetConfig.spreadsheetId,
      sheetName: sheetName,
      entriesCreated: allRows.length,
      order: {
        id: orderId,
        name: orderData.name,
        customerName,
        customer: orderData.customer,
        phone,
        email,
        address,
        city,
        rawCity, // Include the original city name for reference
        shippingAddress: orderData.shippingAddress,
        lineItems: orderData.lineItems || [],
        skus: skus,
        totalPrice: netAmount,
        financialStatus,
        statusTone,
        fulfillmentStatus: orderData.displayFulfillmentStatus || "",
        createdAt: orderData.createdAt,
        tags: orderData.tags,
        confirmationTag
      }
    };
  } catch (error) {
    // Centralized error handling
    logger.error("Error in direct order test", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  orderId: {
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