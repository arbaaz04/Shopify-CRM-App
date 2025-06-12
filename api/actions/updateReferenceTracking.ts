/**
 * Update tracking code in Google Sheets for exchange reference orders
 * This action finds an order by ID in the sheet and updates its tracking code
 * The update is performed in the background to avoid blocking the UI
 */

import { ActionOptions } from "gadget-server";
import { google } from "googleapis";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    orderId: string; 
    shopId: string;
    referenceTrackingCode: string;
  },
  api: any, 
  logger: any
}) => Promise<any>;

/**
 * Initialize Google Sheets API client
 */
async function initGoogleSheetsClient() {
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
    throw error;
  }
}

/**
 * Find rows that contain the specified order ID in column AF
 * This uses a faster approach by limiting search to first 1000 rows
 */
async function findRowsByOrderId(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  orderId: string
): Promise<number[]> {
  try {
    // Define column AF (index 31) - this is where we store the order ID
    const orderIdColumn = "AF";
    
    // Get just the first 1000 rows of column AF instead of the entire column
    // This significantly improves performance
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${orderIdColumn}1:${orderIdColumn}1000`
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
    
    return rowIndices;
  } catch (error) {
    return [];
  }
}

/**
 * Update the tracking code in column Y and check checkbox in column AA for the specified rows
 */
async function updateTrackingCode(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  rowIndices: number[],
  trackingCode: string
): Promise<boolean> {
  if (!rowIndices.length || !trackingCode) {
    return false;
  }
  
  try {
    // Column Y (index 24) is where we'll write the tracking code
    const trackingColumn = "Y";
    
    // Create tracking code update requests - ONLY update column Y now
    const trackingUpdateRequests = rowIndices.map(rowIndex => ({
      range: `${sheetName}!${trackingColumn}${rowIndex}`,
      values: [[trackingCode]]
    }));
    
    // Execute updates for tracking column only
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: trackingUpdateRequests
      }
    });
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Process the tracking update in the background
 * This function is called after the response has been sent to the user
 */
async function processTrackingUpdateInBackground(
  api: any,
  orderId: string,
  shopId: string,
  trackingCode: string
) {
  try {
    // 1. Verify the shop exists
    const shop = await api.shopifyShop.findById(shopId);
    if (!shop) {
      console.error(`Background job: Shop with ID ${shopId} not found`);
      return;
    }
    
    // 2. Get Google Sheet configuration
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });
    
    if (!sheetConfig) {
      console.error(`Background job: Google Sheet configuration not found for shop ${shopId}`);
      return;
    }
    
    // 3. Validate spreadsheet ID
    if (!/^[a-zA-Z0-9_-]+$/.test(sheetConfig.spreadsheetId)) {
      console.error(`Background job: Invalid Google Sheet ID: ${sheetConfig.spreadsheetId}`);
      return;
    }
    
    // 4. Initialize Google Sheets client
    const sheets = await initGoogleSheetsClient();
    
    // 5. Define sheet name
    const sheetName = "Orders";
    
    // 6. Find rows with this order ID
    const rowIndices = await findRowsByOrderId(
      sheets, 
      sheetConfig.spreadsheetId, 
      sheetName, 
      orderId
    );
    
    if (rowIndices.length === 0) {
      console.error(`Background job: No rows found for order ID ${orderId} in sheet ${sheetName}`);
      return;
    }
    
    // 7. Update tracking code in the found rows
    const updated = await updateTrackingCode(
      sheets,
      sheetConfig.spreadsheetId,
      sheetName,
      rowIndices,
      trackingCode
    );
    
    if (!updated) {
      console.error(`Background job: Failed to update tracking code and checkbox for order ${orderId}`);
      return;
    }
    
    console.log(`Background job: Successfully updated tracking code for order ${orderId} in ${rowIndices.length} rows`);
  } catch (error) {
    console.error(`Background job error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// ========== MAIN ACTION FUNCTION ==========

export const run: ActionRun = async ({ params, api }) => {
  try {
    // Validate and sanitize parameters
    if (!params.orderId) {
      throw new Error("orderId parameter is required");
    }
    
    if (!params.shopId) {
      throw new Error("shopId parameter is required");
    }
    
    if (!params.referenceTrackingCode) {
      throw new Error("referenceTrackingCode parameter is required");
    }
    
    // Ensure IDs are strings and contain only digits
    const orderId = String(params.orderId).replace(/\D/g, '');
    const shopId = String(params.shopId).replace(/\D/g, '');
    const trackingCode = params.referenceTrackingCode.trim();
    
    if (!orderId) {
      throw new Error("Invalid orderId format: must contain digits");
    }
    
    if (!shopId) {
      throw new Error("Invalid shopId format: must contain digits");
    }
    
    if (!trackingCode) {
      throw new Error("Tracking code cannot be empty");
    }
    
    // Start background processing without waiting for it to complete
    // This ensures we return to the user immediately
    setImmediate(() => {
      processTrackingUpdateInBackground(api, orderId, shopId, trackingCode);
    });
    
    // Return success immediately
    return {
      success: true,
      message: `Tracking code update initiated for order ${orderId}`,
      backgroundProcessing: true
    };
  } catch (error) {
    // Centralized error handling
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
  },
  referenceTrackingCode: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
}; 