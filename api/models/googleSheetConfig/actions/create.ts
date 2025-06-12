import { applyParams, save, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

/**
 * Extract spreadsheet ID from a Google Sheets URL
 * @param input A Google Sheets URL or ID
 * @returns The extracted spreadsheet ID
 */
function extractSpreadsheetId(input: string): string {
  if (!input) return input;
  
  // Remove @ symbol if present at the beginning
  if (input.startsWith('@')) {
    input = input.substring(1);
  }
  
  // If it's already just an ID (no slashes or spaces), return as is
  if (!input.includes('/') && !input.includes(' ')) {
    return input;
  }
  
  // Extract from various Google Sheets URL formats
  const patterns = [
    /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?/,
    /https:\/\/drive\.google\.com\/(?:file\/d|open\?id=)\/([a-zA-Z0-9_-]+)(?:\/.*)?/
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // If no match, return the original
  return input;
}

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  try {
    // Preprocess spreadsheetId if it's a URL
    if (params.googleSheetConfig?.spreadsheetId) {
      const originalId = params.googleSheetConfig.spreadsheetId;
      params.googleSheetConfig.spreadsheetId = extractSpreadsheetId(params.googleSheetConfig.spreadsheetId);
      
      if (originalId !== params.googleSheetConfig.spreadsheetId) {
        logger.info(`Extracted spreadsheet ID: ${params.googleSheetConfig.spreadsheetId} from ${originalId}`);
      }
    }
    
    // Set default empty values for courier API fields if not provided
    if (params.googleSheetConfig) {
      if (!params.googleSheetConfig.courierApiKey) {
        params.googleSheetConfig.courierApiKey = "";
        logger.info("No courier API key provided, using empty value");
      }
      
      if (!params.googleSheetConfig.courierApiProvider) {
        params.googleSheetConfig.courierApiProvider = "";
        logger.info("No courier API provider provided, using empty value");
      }
    }
    
    applyParams(params, record);
    await preventCrossShopDataAccess(params, record);
    await save(record);
    
    return { success: true };
  } catch (error) {
    logger.error("Error creating Google Sheet config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "create",
};
