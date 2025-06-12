import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Creates a new Sendit configuration
 */
export const run: ActionRun = async ({ params, record, logger, api }) => {
  try {
    logger.info('Creating Sendit config', { 
      hasPublicKey: !!params.senditConfig?.publicKey,
      hasSecretKey: !!params.senditConfig?.secretKey,
      hasShop: !!params.senditConfig?.shop
    });
    
    // Validate required fields
    if (!params.senditConfig?.publicKey) {
      throw new Error("Public key is required");
    }
    
    if (!params.senditConfig?.secretKey) {
      throw new Error("Secret key is required");
    }
    
    if (!params.senditConfig?.shop) {
      throw new Error("Shop reference is required");
    }
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Save the record
    await save(record);
    
    logger.info('Successfully created Sendit config', { id: record.id });
    
    return { success: true, id: record.id };
  } catch (error) {
    logger.error("Error creating Sendit config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "create",
}; 