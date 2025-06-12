/**
 * Action for testing Google Sheets API connection
 * 
 * This action tests the Google service account credentials
 * and verifies access to the configured Google Sheet.
 */

import { google } from "googleapis";
import { ActionOptions } from "gadget-server";

interface Params {
  shopId?: string; 
  spreadsheetId?: string;
}

// Define the action run function type
type ActionRun = (context: { params: Params; logger: any; api: any; connections: any }) => Promise<any>;

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  try {
    logger.info("Testing Google Sheets authentication", { params });
    
    let { shopId, spreadsheetId } = params;
    
    // If no shopId provided, get the first shop
    if (!shopId) {
      const shop = await api.shopifyShop.findFirst();
      if (!shop) {
        return { success: false, error: "No shop found" };
      }
      shopId = shop.id;
      logger.info(`No shopId provided, using first shop: ${shopId}`);
    }
    
    // Get Google Sheet configuration for the shop
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });
    
    if (!sheetConfig) {
      return { 
        success: false, 
        error: `Google Sheet configuration for shop ${shopId} not found`,
        shopId
      };
    }
    
    // Use provided spreadsheetId or fall back to config
    spreadsheetId = spreadsheetId || sheetConfig.spreadsheetId;
    
    if (!spreadsheetId || !/^[a-zA-Z0-9_-]+$/.test(spreadsheetId)) {
      return { 
        success: false, 
        error: `Invalid Google Sheet ID: ${spreadsheetId}`,
        configuredId: sheetConfig.spreadsheetId
      };
    }
    
    // Get service account credentials
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    let credentials;
    
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (e) {
      return { 
        success: false, 
        error: "Unable to parse Google service account credentials JSON",
        exception: String(e)
      };
    }
    
    if (!credentials.client_email || !credentials.private_key) {
      return { 
        success: false, 
        error: "Missing required fields in Google service account credentials",
        hasClientEmail: !!credentials.client_email,
        hasPrivateKey: !!credentials.private_key
      };
    }
    
    // Create JWT auth
    let auth;
    try {
      auth = new google.auth.JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });
      
      logger.info(`Created Google API auth with email: ${credentials.client_email}`);
    } catch (authError) {
      return { 
        success: false, 
        error: `Error creating Google auth: ${String(authError)}`,
        credentialFields: Object.keys(credentials)
      };
    }
    
    // Test actual access to the sheet
    try {
      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.get({
        spreadsheetId
      });
      
      // Test read access to a specific range
      const valuesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:B5' // A simple range
      });
      
      return {
        success: true,
        message: "Successfully authenticated with Google Sheets",
        sheetInfo: {
          title: response.data.properties?.title,
          sheets: response.data.sheets?.map(sheet => sheet.properties?.title),
          url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
        },
        sampleValues: valuesResponse.data.values,
        auth: {
          clientEmail: credentials.client_email,
          projectId: credentials.project_id
        }
      };
    } catch (apiError) {
      return { 
        success: false, 
        error: `Error accessing Google Sheet: ${String(apiError)}`,
        spreadsheetId
      };
    }
  } catch (error) {
    logger.error("Error testing Google Sheets auth", { error });
    return { success: false, error: String(error) };
  }
};

export const params = {
  shopId: {
    type: "string"
  },
  spreadsheetId: {
    type: "string"
  }
};

export const options: ActionOptions = {
  triggers: {
    api: true
  }
}; 