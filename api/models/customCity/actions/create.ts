import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

// Define the expected structure of customCity params
interface CustomCityParams {
  name?: string;
  courierType?: "sendit" | "speedaf" | "general";
  isActive?: boolean;
  shop?: { _link: string };
}

export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Creating custom city', { params });
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Set the addedAt timestamp
    record.addedAt = new Date();
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Save the record
    await save(record);
    
    logger.info('Successfully created custom city', { 
      id: record.id, 
      name: record.name,
      courierType: record.courierType 
    });
    
    return { success: true, id: record.id, name: record.name };
  } catch (error) {
    logger.error("Error creating custom city", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "create",
};
