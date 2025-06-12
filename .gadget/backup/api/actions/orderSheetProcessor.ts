/**
 * Order Sheet Processor
 * 
 * Handles processing orders and writing them to Google Sheets.
 * Uses optimized batch operations for improved performance.
 */

import {
  ensureSheetExists,
  findRowByColumnValue,
  batchUpdateSheet,
  updateCell,
  validateSpreadsheetId,
  formatMoroccanPhoneNumber,
  standardizeMoroccanCity
} from '../services/googleSheets';
import { ActionOptions } from "gadget-server";
import { google } from 'googleapis';

// Define the order processing parameters
interface OrderProcessParams {
  orderId: string;
  shopId: string;
  isPosted?: boolean;
}

// Define types for Shopify order data
interface ShopifyOrderLineItem {
  id: string;
  name: string;
  quantity: number;
  sku: string;
  price: string | number;
}

interface ShopifyCustomer {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface ShopifyAddress {
  address1?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

interface ShopifyOrder {
  id: string;
  name: string;
  createdAt: string;
  financialStatus?: string;
  fulfillmentStatus?: string;
  totalPrice: string | number;
  tags?: string | string[];
  customer?: ShopifyCustomer;
  shippingAddress?: ShopifyAddress;
  billingAddress?: ShopifyAddress;
  lineItems: ShopifyOrderLineItem[];
  trackingId?: string;
}

// Define headers type
interface SheetHeaders {
  [key: string]: string[];
}

// Define type for formatted order data
interface FormattedOrderData {
  id: string;
  name: string;
  date: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: string;
  total: string | number;
  status: string;
  trackingId?: string;
        }

/**
 * Process a single order - main entry point
 */
export const run = async ({ params, api, logger, connections }: { 
  params: OrderProcessParams, 
  api: any, 
  logger: any, 
  connections: any 
}) => {
  try {
    const { orderId, shopId, isPosted = false } = params;
    
    if (!orderId || !shopId) {
      logger.error("Missing required parameters", { orderId, shopId });
      throw new Error("orderId and shopId are required");
    }
    
    // Simple ID cleaning - just ensure we have string IDs without non-digits
    const orderIdStr = String(orderId).replace(/\D/g, '');
    const shopIdStr = String(shopId).replace(/\D/g, '');
    
    logger.info(`📝 Processing order ${orderIdStr} for shop ${shopIdStr}, isPosted=${isPosted}`);
    
    // Get basic order details
    const order = await api.shopifyOrder.findOne({
      filter: { id: { equals: orderIdStr } }
    });
    
    if (!order) {
      throw new Error(`Order ${orderIdStr} not found`);
    }
    
    // Get shop details for GraphQL API access
    const shop = await api.shopifyShop.findOne(shopIdStr);

    if (!shop) {
      throw new Error(`Shop with ID ${shopIdStr} not found`);
    }

    logger.info(`Found shop: ${shop.domain || shop.id}`);

    // Fetch complete order details with line items using GraphQL
    let orderDetails;
    try {
      // Extract just the numeric part from the Shopify ID (removing "gid://shopify/Order/")
      const shopifyOrderId = order.id.split('/').pop();
      logger.info(`Fetching detailed order data for ${shopifyOrderId}`);
      orderDetails = await fetchOrderDetails(api, shop, shopifyOrderId, logger);
      logger.info(`Successfully fetched detailed order data for ${order.name || order.id}`);
    } catch (error) {
      logger.error(`Failed to fetch detailed order data, falling back to basic order data`, { error });
      orderDetails = order;
    }
    
    // Get Google Sheet configuration for the shop
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopIdStr } }
    });
    
    if (!sheetConfig) {
      throw new Error(`Google Sheet configuration for shop ${shopIdStr} not found`);
    }
    
    logger.info(`Found Google Sheet configuration: ${sheetConfig.spreadsheetId}`);
    
    // Validate spreadsheet ID
    if (!validateSpreadsheetId(sheetConfig.spreadsheetId)) {
      throw new Error(`Invalid Google Sheet ID: ${sheetConfig.spreadsheetId}. Please check your configuration.`);
    }
    
    // Get service account credentials
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    const credentials = JSON.parse(serviceAccountKey);
    
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Google service account credentials not found");
    }
    
    // Create JWT auth directly
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    logger.info(`Created Google API authentication with email: ${credentials.client_email}`);
    
    // Ensure sheets exist
    const headers: SheetHeaders = {
      "Pending Orders": ["Order ID", "Order Number", "Date", "Customer", "Email", "Phone", "Address", "Items", "Total", "Status"],
      "Orders": ["Order ID", "Order Number", "Date", "Customer", "Email", "Phone", "Address", "Items", "Total", "Status", "Delivery Date", "Notes", "Tracking ID"],
      "Inventory": ["Product ID", "Product Name", "SKU", "Category", "Price", "Cost", "Stock", "Reserved", "Available", "Delivered", "Low Stock Alert"]
    };
    
    logger.info(`Ensuring Google Sheets exist`);
    
    // Create sheets in parallel if needed
    await Promise.all(Object.keys(headers).map(title => 
      ensureSheetExists(sheetConfig.spreadsheetId, title, auth, headers[title], logger)
    ));
    
    // Format order data for sheets
    const orderFormattedData = formatOrderData(orderDetails as ShopifyOrder);
    
    try {
      // Check if the order is confirmed via tags
      const tags = order.tags || "";
      const tagArray = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim())
        : Array.isArray(tags) ? tags : [];
      
      const isConfirmed = tagArray.includes("confirmed");
      
      // Check if line items exist and are properly formatted
      if (orderDetails.lineItems && !Array.isArray(orderDetails.lineItems)) {
        logger.warn(`Order ${order.name || orderIdStr} has non-array lineItems, attempting to format`, {
          lineItemsType: typeof orderDetails.lineItems
        });
        
        // Try to convert line items to array format
        try {
          if (typeof orderDetails.lineItems === 'object' && orderDetails.lineItems.edges) {
            // This is likely a GraphQL result structure
            const edges = orderDetails.lineItems.edges;
            if (Array.isArray(edges)) {
              orderDetails.lineItems = edges.map((edge: any) => {
                const node = edge?.node || {};
                return {
                  id: node.id || `item-${Math.random().toString(36).substring(2, 11)}`,
                  name: node.name || 'Unknown Item',
                  quantity: Number(node.quantity) || 1,
                  sku: node.sku || node.variant?.sku || '',
                  price: node.variant?.price || '0.00'
                };
              });
              logger.info(`Successfully converted line items from edges format for order ${order.name || orderIdStr}`);
            }
          }
        } catch (lineItemError) {
          logger.error(`Error formatting line items for order ${order.name || orderIdStr}`, { error: lineItemError });
          // Create an empty array as fallback
          orderDetails.lineItems = [];
        }
      }
      
      if (isPosted || order.fulfillmentStatus === "fulfilled" || isConfirmed) {
        // If the order is being posted, fulfilled, or confirmed, add it to Orders sheet
        logger.info(`Order ${order.name || orderIdStr} is ${isPosted ? 'posted' : order.fulfillmentStatus === "fulfilled" ? 'fulfilled' : 'confirmed'}, adding to Orders sheet`);
        await addToOrdersSheet(sheetConfig.spreadsheetId, orderFormattedData, auth, logger);
        await removeFromPendingOrdersSheet(sheetConfig.spreadsheetId, order.id, auth, logger);
        
        // Update inventory for fulfilled orders if line items are available
        if (orderDetails.lineItems && Array.isArray(orderDetails.lineItems)) {
          logger.info(`Updating inventory for ${orderDetails.lineItems.length} line items`);
          for (const item of orderDetails.lineItems) {
            if (item.sku) {
              await updateInventoryForSku(sheetConfig.spreadsheetId, item.sku, item.quantity, auth, logger);
            }
          }
        }
      } else {
        // If the order is not yet fulfilled or confirmed, add it to Pending Orders
        logger.info(`Order ${order.name || orderIdStr} is not confirmed/fulfilled, adding to Pending Orders sheet`);
        await addToPendingOrdersSheet(sheetConfig.spreadsheetId, orderFormattedData, auth, logger);
      }
      
      logger.info(`✅ Successfully processed order ${order.name || orderIdStr}`);
    } catch (error) {
      logger.error(`Error syncing order to sheet: ${order.name || orderIdStr}`, { error });
      throw error;
    }
    
    return { success: true, orderId: orderIdStr, shopId: shopIdStr };
  } catch (error) {
    logger.error("Error processing order", { error });
    throw error;
  }
};

/**
 * Helper function to fetch complete order details using GraphQL
 */
async function fetchOrderDetails(api: any, shop: any, orderId: string, logger: any) {
  try {
    // Simple ID cleaning to ensure we have just the numeric portion
    const numericOrderId = String(orderId).replace(/\D/g, '');
    
    logger.info(`Fetching order details for ID: ${numericOrderId}`);
    
  const graphqlQuery = `
    {
        order(id: "gid://shopify/Order/${numericOrderId}") {
        id
        name
        createdAt
        financialStatus
        fulfillmentStatus
        totalPrice
        tags
        customer {
          firstName
          lastName
          email
          phone
        }
        shippingAddress {
          address1
          city
          province
          country
            zip
        }
          lineItems(first: 20) {
          edges {
            node {
              name
              quantity
              sku
              variant {
                sku
                price
              }
            }
          }
        }
      }
    }
  `;

    const result = await api.connections.shopify.shop.graphql(shop.id, graphqlQuery);
    
    if (!result?.body?.data?.order) {
      throw new Error(`Order data not found in GraphQL response for order ${numericOrderId}`);
    }
    
    const orderData = result.body.data.order;
    
    // Transform line items to match expected format
    if (orderData?.lineItems?.edges && Array.isArray(orderData.lineItems.edges)) {
      orderData.lineItems = orderData.lineItems.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          name: node.name || 'Unknown Item',
          quantity: Number(node.quantity) || 1,
          sku: node.sku || node.variant?.sku || '',
          price: node.variant?.price || '0.00'
        };
      });
    } else {
      // Fallback if no line items
      orderData.lineItems = [];
    }
    
    return orderData;
  } catch (error) {
    logger.error(`Error fetching order details for ${orderId}`, { 
      error: error instanceof Error ? error.message : String(error)
    });
    throw new Error(`Error fetching order details: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Format order data for Google Sheets
 */
function formatOrderData(order: ShopifyOrder): FormattedOrderData {
  // Handle customer name
  const customerName = order.customer 
    ? `${order.customer.firstName || ''} ${order.customer.lastName || ''}`.trim() || 'Guest Customer'
    : 'Guest Customer';
  
  // Format address
  const address = order.shippingAddress 
    ? `${order.shippingAddress.address1 || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.province || ''}`
    : 'No address';
  
  // Format date
  const date = order.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : '';
  
  // Format items in a simple way
  const items = Array.isArray(order.lineItems) 
    ? order.lineItems.map(item => `${item.name} (${item.quantity}x)`).join(", ")
    : "No items";
  
  // Get total price as string
  const total = typeof order.totalPrice === 'number' 
    ? order.totalPrice.toFixed(2) 
    : String(order.totalPrice || '0.00');
  
  // Get order status
  const status = order.fulfillmentStatus || 'unfulfilled';
  
  return {
    id: String(order.id || '').replace(/\D/g, ''),
    name: order.name || `Order ${order.id}`,
    date: date,
    customer: customerName,
    email: order.customer?.email || '',
    phone: order.customer?.phone || '',
    address: address,
    items: items,
    total: total,
    status: status,
    trackingId: order.trackingId || ''
  };
}

/**
 * Add order to Pending Orders sheet
 */
async function addToPendingOrdersSheet(
  spreadsheetId: string,
  orderData: FormattedOrderData,
  auth: any,
  logger: any
): Promise<void> {
  logger.debug(`Adding order ${orderData.name} to Pending Orders sheet`);
  
  try {
    // First, get all data in the Order ID column (column A)
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Pending Orders!A:A' // Get all values in column A (Order ID)
    });
    
    const values = response.data.values || [];
    
    // Find the next empty row after the header row (row 1)
    // Start from row 2 (index 1) to skip header
    let nextRow = 2;
    
    for (let i = 1; i < values.length; i++) {
      // If the cell is empty or has no data
      if (!values[i] || !values[i][0] || values[i][0].trim() === '') {
        nextRow = i + 1; // Convert to 1-based row number
        break;
      }
    }
    
    // If no empty row found, use the next row after the last one
    if (nextRow === 2 && values.length > 1) {
      nextRow = values.length + 1;
    }
    
    logger.info(`Found empty row at ${nextRow} for order ${orderData.name}`);
    
    // Prepare the row data
    const row = [
      orderData.id,                 // Order ID
      orderData.name,               // Order Number
      orderData.date,               // Date
      orderData.customer,           // Customer
      orderData.email,              // Email
      orderData.phone,              // Phone
      orderData.address,            // Address
      orderData.items,              // Items
      orderData.total,              // Total
      orderData.status              // Status
    ];
    
    // Update the specific row instead of appending
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Pending Orders!A${nextRow}:J${nextRow}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row]
      }
    });
    
    logger.info(`✅ Successfully added order ${orderData.name} to Pending Orders sheet at row ${nextRow}`);
  } catch (error) {
    logger.error(`Error adding order to Pending Orders sheet: ${orderData.name}`, { error });
    throw error;
  }
}

/**
 * Add order to Orders sheet
 */
async function addToOrdersSheet(
  spreadsheetId: string,
  orderData: FormattedOrderData,
  auth: any,
  logger: any
): Promise<void> {
  logger.debug(`Adding order ${orderData.name} to Orders sheet`);
  
  try {
    // First, get all data in the Order ID column (column A)
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Orders!A:A' // Get all values in column A (Order ID)
    });
    
    const values = response.data.values || [];
    
    // Find the next empty row after the header row (row 1)
    // Start from row 2 (index 1) to skip header
    let nextRow = 2;
    
    for (let i = 1; i < values.length; i++) {
      // If the cell is empty or has no data
      if (!values[i] || !values[i][0] || values[i][0].trim() === '') {
        nextRow = i + 1; // Convert to 1-based row number
        break;
      }
    }
    
    // If no empty row found, use the next row after the last one
    if (nextRow === 2 && values.length > 1) {
      nextRow = values.length + 1;
    }
    
    logger.info(`Found empty row at ${nextRow} for order ${orderData.name}`);
    
    // Prepare the row data
    const row = [
      orderData.id,                 // Order ID
      orderData.name,               // Order Number
      orderData.date,               // Date
      orderData.customer,           // Customer
      orderData.email,              // Email
      orderData.phone,              // Phone
      orderData.address,            // Address
      orderData.items,              // Items
      orderData.total,              // Total
      orderData.status,             // Status
      '',                           // Delivery Date (left blank for now)
      '',                           // Notes (left blank for now)
      orderData.trackingId || ''    // Tracking ID (added)
    ];
    
    // Update the specific row instead of appending
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Orders!A${nextRow}:M${nextRow}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row]
      }
    });
    
    logger.info(`✅ Successfully added order ${orderData.name} to Orders sheet at row ${nextRow}`);
  } catch (error) {
    logger.error(`Error adding order to Orders sheet: ${orderData.name}`, { error });
    throw error;
  }
}

/**
 * Remove order from Pending Orders sheet
 */
async function removeFromPendingOrdersSheet(
  spreadsheetId: string,
  orderId: string,
  auth: any,
  logger: any
): Promise<void> {
  try {
    logger.debug(`Removing order ${orderId} from Pending Orders sheet`);
    
    // Find the row with the order ID
    const rowIndex = await findRowByColumnValue(spreadsheetId, "Pending Orders", 0, orderId, auth, logger);
    
    if (rowIndex === -1) {
      logger.debug(`Order ${orderId} not found in Pending Orders sheet`);
      return;
    }
    
    // Create a batch update to clear the row
    // Note: Google Sheets API doesn't support deleting rows directly,
    // so we'll clear the content instead
    await batchUpdateSheet(
      spreadsheetId,
      [
        {
          range: `Pending Orders!A${rowIndex}:J${rowIndex}`,
          values: [['', '', '', '', '', '', '', '', '', '']]
        }
      ],
      auth,
      logger
    );
    
    logger.info(`✅ Successfully removed order ${orderId} from Pending Orders sheet`);
  } catch (error) {
    logger.error(`Error removing order from Pending Orders sheet: ${orderId}`, { error });
    throw error;
  }
}

/**
 * Update inventory for a SKU
 */
async function updateInventoryForSku(
  spreadsheetId: string,
  sku: string,
  quantity: number,
  auth: any,
  logger: any
): Promise<void> {
  try {
    logger.debug(`Updating inventory for SKU ${sku}`);
    
    // Find the row with the SKU
    const rowIndex = await findRowByColumnValue(spreadsheetId, "Inventory", 2, sku, auth, logger);
    
    if (rowIndex === -1) {
      logger.warn(`SKU ${sku} not found in Inventory sheet`);
      return;
    }
    
    // Update the "Delivered" column (column J)
    await updateCell(
      spreadsheetId,
      `Inventory!J${rowIndex}`,
      quantity,
      auth,
      logger
    );
    
    logger.info(`✅ Successfully updated inventory for SKU ${sku}`);
  } catch (error) {
    logger.error(`Error updating inventory for SKU: ${sku}`, { error });
    throw error;
  }
}

// Add the updateOrderTracking function
export const updateOrderTracking = async ({ params, api, logger }: { 
  params: { orderId: string, trackingId: string, shopId: string },
  api: any,
  logger: any
}) => {
  try {
    const { orderId, trackingId, shopId } = params;
    
    if (!orderId || !trackingId || !shopId) {
      logger.error("Missing required parameters", { orderId, trackingId, shopId });
      throw new Error("orderId, trackingId, and shopId are required");
    }
    
    // Add validation for parameter types
    const orderIdStr = String(orderId);
    const trackingIdStr = String(trackingId);
    const shopIdStr = String(shopId);
    
    logger.info(`Updating tracking for order ${orderIdStr} to ${trackingIdStr}`);
    
    // Get the order
    const order = await api.shopifyOrder.findOne({
      filter: { id: { equals: orderIdStr } }
    });
    
    if (!order) {
      throw new Error(`Order ${orderIdStr} not found`);
    }
    
    // Get the sheet configuration
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopIdStr } }
    });
    
    if (!sheetConfig) {
      throw new Error(`Sheet configuration not found for shop ${shopIdStr}`);
    }
    
    // Get credentials and auth
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    const credentials = JSON.parse(serviceAccountKey);
    
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Google service account credentials not found");
    }
    
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    // Find the order in the Orders sheet
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetConfig.spreadsheetId,
      range: 'Orders!A:A' // Get all values in column A (Order ID)
    });
    
    const values = response.data.values || [];
    let rowIndex = -1;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i] && values[i][0] === orderId) {
        rowIndex = i + 1; // 1-based row index
        break;
      }
    }
    
    if (rowIndex === -1) {
      // If not found in Orders sheet, process the order to add it
      await run({ 
        params: { orderId: orderIdStr, shopId: shopIdStr, isPosted: true }, 
        api, 
        logger, 
        connections: {} 
      });
      
      // Check again for the row
      const updatedResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetConfig.spreadsheetId,
        range: 'Orders!A:A'
      });
      
      const updatedValues = updatedResponse.data.values || [];
      
      for (let i = 1; i < updatedValues.length; i++) {
        if (updatedValues[i] && updatedValues[i][0] === orderId) {
          rowIndex = i + 1;
          break;
        }
      }
    }
    
    // If found, update the tracking ID in column M
    if (rowIndex !== -1) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetConfig.spreadsheetId,
        range: `Orders!M${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[trackingIdStr]]
        }
      });
      
      logger.info(`✅ Updated tracking ID for order ${order.name || orderIdStr} to ${trackingIdStr}`);
      
      return { 
        success: true, 
        message: `Updated tracking ID for order ${order.name || orderIdStr}` 
      };
    } else {
      throw new Error(`Order ${orderIdStr} not found in Orders sheet`);
    }
  } catch (error) {
    logger.error("Error updating order tracking", { error });
    throw error;
  }
};

// Configure the action options
export const options: ActionOptions = {
  triggers: {
    api: true,
    shopify: {
      webhooks: [
        { topic: "orders/create", apiVersion: "2023-10" },
        { topic: "orders/updated", apiVersion: "2023-10" },
        { topic: "orders/fulfilled", apiVersion: "2023-10" }
      ]
    }
  },
  returnType: true
};