import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

// Define the expected structure of speedafConfig params
interface SpeedafConfigParams {
  appCode?: string;
  secretKey?: string;
  customerCode?: string;
  platformSource?: string;
  apiEndpoint?: string;
  name?: string;
  shop?: any;
  [key: string]: any;
}

// Define the structure of the params object
interface ActionParams {
  speedafConfig?: SpeedafConfigParams;
  [key: string]: any;
}

/**
 * Updates an existing Speedaf configuration
 */
export const run: ActionRun = async ({ params, record, logger, api }) => {
  try {
    // Cast params to our expected type
    const typedParams = params as ActionParams;
    
    logger.info('Updating Speedaf config', { 
      id: record.id,
      hasAppCode: !!typedParams.speedafConfig?.appCode,
      hasSecretKey: !!typedParams.speedafConfig?.secretKey,
      hasCustomerCode: !!typedParams.speedafConfig?.customerCode
    });
    
    // Process and validate input
    if (typedParams.speedafConfig) {
      const speedafConfig = typedParams.speedafConfig;
      
      // Only modify fields that are explicitly provided
      logger.info('Processing Speedaf config fields', {
        providedFields: Object.keys(speedafConfig)
      });
      
      // Trim string values if present
      if (speedafConfig.appCode !== undefined) {
        speedafConfig.appCode = speedafConfig.appCode.trim();
        logger.info('Processed appCode field', { 
          length: speedafConfig.appCode.length
        });
      }
      
      if (speedafConfig.secretKey !== undefined) {
        speedafConfig.secretKey = speedafConfig.secretKey.trim();
        logger.info('Processed secretKey field', { 
          length: speedafConfig.secretKey.length
        });
      }
      
      if (speedafConfig.customerCode !== undefined) {
        speedafConfig.customerCode = speedafConfig.customerCode.trim();
        logger.info('Processed customerCode field', { 
          length: speedafConfig.customerCode.length
        });
      }
      
      if (speedafConfig.platformSource !== undefined) {
        speedafConfig.platformSource = speedafConfig.platformSource.trim();
        logger.info('Processed platformSource field', { 
          length: speedafConfig.platformSource.length
        });
      }
      
      if (speedafConfig.apiEndpoint !== undefined) {
        speedafConfig.apiEndpoint = speedafConfig.apiEndpoint.trim();
        logger.info('Processed apiEndpoint field', { 
          length: speedafConfig.apiEndpoint.length
        });
      }
      
      // Set default values for fields that might be null/undefined
      if (speedafConfig.name === null || speedafConfig.name === undefined) {
        speedafConfig.name = record.name || 'Speedaf User';
        logger.info('Using default value for name field');
      }
      
      // Update lastAuthenticated timestamp when credentials are changed
      if (speedafConfig.appCode || speedafConfig.secretKey || speedafConfig.customerCode) {
        speedafConfig.lastAuthenticated = new Date().toISOString();
        logger.info('Updated lastAuthenticated timestamp');
      }
    }
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Log the record state before saving
    logger.info('Speedaf config state before save', {
      id: record.id,
      hasAppCode: !!record.appCode,
      hasSecretKey: !!record.secretKey,
      hasCustomerCode: !!record.customerCode,
      hasName: !!record.name,
      lastAuthenticated: record.lastAuthenticated
    });
    
    // Save the record
    await save(record);
    
    logger.info('Successfully updated Speedaf config', { id: record.id });
    
    return { 
      success: true, 
      id: record.id,
      name: record.name,
      message: "Speedaf configuration updated successfully"
    };
  } catch (error) {
    logger.error("Error updating Speedaf config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "update",
}; 