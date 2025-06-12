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
 * Creates a new Speedaf configuration
 */
export const run: ActionRun = async ({ params, record, logger, api }) => {
  try {
    // Cast params to our expected type
    const typedParams = params as ActionParams;
    
    logger.info('Creating Speedaf config', { 
      hasAppCode: !!typedParams.speedafConfig?.appCode,
      hasSecretKey: !!typedParams.speedafConfig?.secretKey,
      hasCustomerCode: !!typedParams.speedafConfig?.customerCode,
      hasShop: !!typedParams.speedafConfig?.shop
    });
    
    // Validate required fields
    if (!typedParams.speedafConfig?.appCode) {
      throw new Error("App Code is required");
    }
    
    if (!typedParams.speedafConfig?.secretKey) {
      throw new Error("Secret Key is required");
    }
    
    if (!typedParams.speedafConfig?.customerCode) {
      throw new Error("Customer Code is required");
    }
    
    if (!typedParams.speedafConfig?.shop) {
      throw new Error("Shop reference is required");
    }
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Set optional fields defaults
    if (!record.platformSource) {
      record.platformSource = "";
    }
    
    if (!record.apiEndpoint) {
      record.apiEndpoint = "";
    }
    
    // Set name and timestamp fields
    record.name = record.name || "Speedaf User";
    record.lastAuthenticated = new Date().toISOString();
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Save the record
    await save(record);
    
    logger.info('Successfully created Speedaf config', { id: record.id });
    
    return { 
      success: true, 
      id: record.id,
      name: record.name
    };
  } catch (error) {
    logger.error("Error creating Speedaf config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "create",
}; 