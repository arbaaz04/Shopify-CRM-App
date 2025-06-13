import { ActionOptions } from "gadget-server";

/**
 * Interface for order data input
 */
interface WriteOrderInput {
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
  referenceTrackingNumber?: string; // Optional reference tracking for exchange orders
  isCancelled: boolean;
  isDeleted: boolean;
  isFulfillmentCancelled: boolean;
}

/**
 * Extract numeric ID from various formats
 */
function extractNumericId(id: any): string {
  if (!id) return '';
  
  // If id is already a string that's just numbers, return it directly
  if (typeof id === 'string' && /^\d+$/.test(id)) {
    return id;
  }
  
  // Convert to string and handle Shopify gid format
  const idStr = String(id);
  if (idStr.includes('gid://')) {
    const parts = idStr.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && /^\d+$/.test(lastPart)) {
      return lastPart;
    }
  }
  
  // Extract only numeric characters
  return idStr.replace(/[^0-9]/g, '');
}

/**
 * Rate limited request with retry logic
 */
async function rateLimitedRequest<T>(requestFn: () => Promise<T>, retries: number = 3): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (error instanceof Error && error.message.includes('rate limit')) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

/**
 * Initialize Google Sheets client (using same method as working writeOrderToSheets action)
 */
async function initGoogleSheetsClient(): Promise<any> {
  try {
    const { google } = await import('googleapis');

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    const credentials = JSON.parse(serviceAccountKey);

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    throw new Error(`Failed to initialize Google Sheets client: ${error}`);
  }
}

/**
 * Get sheet configuration
 */
async function getSheetConfig(shopId: string, api: any): Promise<any> {
  try {
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });

    if (!sheetConfig) {
      throw new Error("Sheet configuration not found");
    }

    return sheetConfig;
  } catch (error) {
    throw new Error(`Failed to get sheet configuration: ${error}`);
  }
}

/**
 * Find the first empty row in the sheet by checking column E
 */
async function findFirstEmptyRow(sheets: any, spreadsheetId: string, sheetName: string): Promise<number> {
  try {
    // Check column E to find the first empty row
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!E:E`
    });
    
    const values = result.data.values || [];
    
    // Start from row 6 (after headers) and find the first empty row in column E
    for (let i = 6; i < Math.max(values.length, 10000); i++) { // Check up to row 10000 or actual data length
      // Check if this row index exists and has data in column E
      if (!values[i] || !values[i][0] || values[i][0].toString().trim() === '') {
        return i + 1; // Convert to 1-based row number (i+1 because i is 0-based)
      }
    }
    
    // If no empty row found in the checked range, append at the end
    return Math.max(values.length + 1, 6);
  } catch (error) {
    // If there's an error, start from row 6
    return 6;
  }
}

/**
 * Write all orders data to Google Sheets in a single batch operation
 */
async function writeBatchOrdersData(
  sheets: any,
  spreadsheetId: string,
  orders: WriteOrderInput[]
): Promise<void> {
  try {
    // Separate orders by sheet (fulfilled vs pending)
    const fulfilledOrders = orders.filter(order => order.displayFulfillmentStatus === "FULFILLED");
    const pendingOrders = orders.filter(order => order.displayFulfillmentStatus !== "FULFILLED");
    
    // Process fulfilled orders
    if (fulfilledOrders.length > 0) {
      await writeBatchToSheet(sheets, spreadsheetId, "Orders", fulfilledOrders);
    }
    
    // Process pending orders
    if (pendingOrders.length > 0) {
      await writeBatchToSheet(sheets, spreadsheetId, "Pending Orders", pendingOrders);
    }
  } catch (error) {
    throw new Error(`Failed to write batch orders data: ${error}`);
  }
}

/**
 * Write batch of orders to a specific sheet
 */
async function writeBatchToSheet(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  orders: WriteOrderInput[]
): Promise<void> {
  try {
    // Find the first empty row
    const startRow = await findFirstEmptyRow(sheets, spreadsheetId, sheetName);
    
    // Collect all batch updates for all orders
    const allBatchUpdates = [];
    let currentRow = startRow;
    
    for (const order of orders) {
      // Process each line item for this order
      for (let i = 0; i < order.lineItems.length; i++) {
        const item = order.lineItems[i];
        const isFirstLineItem = i === 0;
        
        // Only add updates for columns that have data
        
        // Tracking number - Column C
        if (order.trackingNumber) {
          allBatchUpdates.push({
            range: `${sheetName}!C${currentRow}`,
            values: [[order.trackingNumber]]
          });
        }
        
        // SKU - Column E
        if (item.sku) {
          allBatchUpdates.push({
            range: `${sheetName}!E${currentRow}`,
            values: [[item.sku]]
          });
        }
        
        // Customer name - Column F
        if (order.customerName) {
          allBatchUpdates.push({
            range: `${sheetName}!F${currentRow}`,
            values: [[order.customerName]]
          });
        }
        
        // Address - Column G
        if (order.address) {
          allBatchUpdates.push({
            range: `${sheetName}!G${currentRow}`,
            values: [[order.address]]
          });
        }
        
        // Phone - Column H
        if (order.phone) {
          allBatchUpdates.push({
            range: `${sheetName}!H${currentRow}`,
            values: [[order.phone]]
          });
        }
        
        // City - Column I
        if (order.city) {
          allBatchUpdates.push({
            range: `${sheetName}!I${currentRow}`,
            values: [[order.city]]
          });
        }
        
        // NET amount - Column J
        if (item.price) {
          allBatchUpdates.push({
            range: `${sheetName}!J${currentRow}`,
            values: [[item.price]]
          });
        }
        
        // Brut amount - Column K (total price for first item, 0.00 for others)
        if (isFirstLineItem && order.totalPrice) {
          allBatchUpdates.push({
            range: `${sheetName}!K${currentRow}`,
            values: [[order.totalPrice]]
          });
        } else if (!isFirstLineItem) {
          // For second+ line items, explicitly write "0.00"
          allBatchUpdates.push({
            range: `${sheetName}!K${currentRow}`,
            values: [["0.00"]]
          });
        }
        
        // Order name - Column Z
        if (order.name) {
          allBatchUpdates.push({
            range: `${sheetName}!Z${currentRow}`,
            values: [[order.name]]
          });
        }

        // Reference tracking number - Column Y (for exchange orders)
        if (order.referenceTrackingNumber) {
          allBatchUpdates.push({
            range: `${sheetName}!Y${currentRow}`,
            values: [[order.referenceTrackingNumber]]
          });
        }

        currentRow++;
      }
    }
    
    // Execute all updates in a single massive batch request
    if (allBatchUpdates.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data: allBatchUpdates
        }
      });
    }
  } catch (error) {
    throw new Error(`Failed to write batch to sheet ${sheetName}: ${error}`);
  }
}

/**
 * Main action to write multiple orders to Google Sheets in a single batch
 */
export const run = async ({ params, logger, api }: any) => {
  try {
    logger.info("writeBatchOrdersToSheets action called");
    logger.info("Params received:", JSON.stringify(params, null, 2));
    
    const ordersDataString = params?.ordersData;
    const shopId = params?.shopId;
    
    if (!ordersDataString || !shopId) {
      const errorMsg = `Missing required parameters: ordersData=${!!ordersDataString}, shopId=${!!shopId}`;
      logger.error(errorMsg, { params });
      throw new Error(errorMsg);
    }
    
    // Parse the orders data from JSON string
    let orders: WriteOrderInput[];
    try {
      orders = JSON.parse(ordersDataString);
      logger.info("Successfully parsed orders data:", { orderCount: orders.length });
    } catch (parseError) {
      const errorMsg = `Failed to parse orders data: ${parseError}`;
      logger.error(errorMsg, { ordersDataString });
      throw new Error(errorMsg);
    }
    
    if (!Array.isArray(orders) || orders.length === 0) {
      throw new Error("No orders provided or invalid orders data");
    }
    
    logger.info(`Processing ${orders.length} orders for batch write to Google Sheets`);
    
    // Initialize Google Sheets client
    const sheets = await rateLimitedRequest(() => initGoogleSheetsClient());
    
    // Get sheet configuration
    const sheetConfig = await rateLimitedRequest(() => getSheetConfig(shopId, api));
    
    // Write all orders in a single batch operation
    await rateLimitedRequest(() => 
      writeBatchOrdersData(sheets, sheetConfig.spreadsheetId, orders)
    );
    
    logger.info(`Successfully wrote ${orders.length} orders to Google Sheets in batch operation`);
    
    // Update all orders' writeOrder and autoWrite fields to false
    const updatePromises = orders.map(async (order) => {
      try {
        const numericOrderId = extractNumericId(order.id);
        logger.info(`Updating order ${order.id} (numeric: ${numericOrderId}) fields: writeOrder=false, autoWrite=false`);
        
        await api.shopifyOrder.update(numericOrderId, {
          writeOrder: false,
          autoWrite: false
        });
        
        logger.info(`Successfully updated order ${numericOrderId} fields`);
        return { orderId: order.id, success: true };
      } catch (updateError) {
        logger.error(`Failed to update order ${order.id} fields:`, {
          error: updateError,
          errorMessage: updateError instanceof Error ? updateError.message : String(updateError),
          orderId: order.id,
          numericOrderId: extractNumericId(order.id)
        });
        return { orderId: order.id, success: false, error: updateError };
      }
    });
    
    const updateResults = await Promise.all(updatePromises);
    const successfulUpdates = updateResults.filter(result => result.success).length;
    const failedUpdates = updateResults.filter(result => !result.success).length;
    
    logger.info(`Order field updates completed: ${successfulUpdates} successful, ${failedUpdates} failed`);
    
    return { 
      success: true, 
      ordersWritten: orders.length,
      fieldsUpdated: successfulUpdates,
      fieldsUpdateFailed: failedUpdates
    };
    
  } catch (error) {
    logger.error("Error in writeBatchOrdersToSheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
};

export const params = {
  ordersData: {
    type: "string", // JSON string of the orders data array
    required: true
  },
  shopId: {
    type: "string", 
    required: true
  }
};

export const options: ActionOptions = {
  actionType: "custom",
  triggers: { api: true },
  returnType: true
};
