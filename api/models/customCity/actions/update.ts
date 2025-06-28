import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Updating custom city', { id: record.id, params });
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Save the record
    await save(record);
    
    logger.info('Successfully updated custom city', { 
      id: record.id, 
      name: record.name,
      courierType: record.courierType,
      isActive: record.isActive
    });
    
    return { success: true, id: record.id, name: record.name };
  } catch (error) {
    logger.error("Error updating custom city", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "update",
};
