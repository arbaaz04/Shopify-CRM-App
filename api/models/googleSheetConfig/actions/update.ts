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
    
    // Set default empty values for courier API fields if provided as empty
    if (params.googleSheetConfig) {
      // Only set defaults if the fields are explicitly set to null/undefined
      // as we don't want to overwrite existing values if they're not being updated
      if (params.googleSheetConfig.courierApiKey === null || params.googleSheetConfig.courierApiKey === undefined) {
        params.googleSheetConfig.courierApiKey = "";
        logger.info("Courier API key reset to empty value");
      }
      
      if (params.googleSheetConfig.courierApiProvider === null || params.googleSheetConfig.courierApiProvider === undefined) {
        params.googleSheetConfig.courierApiProvider = "";
        logger.info("Courier API provider reset to empty value");
      }
    }
    
    applyParams(params, record);
    await preventCrossShopDataAccess(params, record);
    await save(record);
    
    return { success: true };
  } catch (error) {
    logger.error("Error updating Google Sheet config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "update",
};
