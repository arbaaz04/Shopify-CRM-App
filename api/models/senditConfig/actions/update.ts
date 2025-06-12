import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

// Define the expected structure of senditConfig params
interface SenditConfigParams {
  publicKey?: string;
  secretKey?: string;
  token?: string;
  name?: string;
  accountType?: string;
  lastAuthenticated?: string;
  shop?: any;
  [key: string]: any;
}

// Define the structure of the params object
interface ActionParams {
  senditConfig?: SenditConfigParams;
  [key: string]: any;
}

/**
 * Updates an existing Sendit configuration
 */
export const run: ActionRun = async ({ params, record, logger, api }) => {
  try {
    // Cast params to our expected type
    const typedParams = params as ActionParams;
    
    logger.info('Updating Sendit config', { 
      id: record.id,
      hasPublicKey: !!typedParams.senditConfig?.publicKey,
      hasSecretKey: !!typedParams.senditConfig?.secretKey
    });
    
    // Process and validate input
    if (typedParams.senditConfig) {
      const senditConfig = typedParams.senditConfig;
      
      // Only modify fields that are explicitly provided
      logger.info('Processing Sendit config fields', {
        providedFields: Object.keys(senditConfig)
      });
      
      // Trim string values if present
      if (senditConfig.publicKey !== undefined) {
        senditConfig.publicKey = senditConfig.publicKey.trim();
        logger.info('Processed publicKey field', { 
          length: senditConfig.publicKey.length
        });
      }
      
      if (senditConfig.secretKey !== undefined) {
        senditConfig.secretKey = senditConfig.secretKey.trim();
        logger.info('Processed secretKey field', { 
          length: senditConfig.secretKey.length
        });
      }
      
      // Set default values for fields that might be null/undefined
      if (senditConfig.name === null || senditConfig.name === undefined) {
        senditConfig.name = record.name || '';
        logger.info('Using default value for name field');
      }
      
      if (senditConfig.token === null || senditConfig.token === undefined) {
        senditConfig.token = record.token || '';
        logger.info('Using default value for token field');
      }
      
      if (senditConfig.accountType === null || senditConfig.accountType === undefined) {
        senditConfig.accountType = record.accountType || '';
        logger.info('Using default value for accountType field');
      }
      
      // Update lastAuthenticated timestamp when credentials are changed
      if (senditConfig.publicKey || senditConfig.secretKey) {
        senditConfig.lastAuthenticated = new Date().toISOString();
        logger.info('Updated lastAuthenticated timestamp');
      }
    }
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Log the record state before saving
    logger.info('Sendit config state before save', {
      id: record.id,
      hasPublicKey: !!record.publicKey,
      hasSecretKey: !!record.secretKey,
      hasToken: !!record.token,
      hasName: !!record.name,
      lastAuthenticated: record.lastAuthenticated
    });
    
    // Save the record
    await save(record);
    
    logger.info('Successfully updated Sendit config', { id: record.id });
    
    return { 
      success: true, 
      id: record.id,
      message: "Sendit configuration updated successfully"
    };
  } catch (error) {
    logger.error("Error updating Sendit config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "update",
}; 