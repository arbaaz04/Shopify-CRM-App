import { deleteRecord, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Deleting custom city', { id: record.id, name: record.name });
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Delete the record
    await deleteRecord(record);
    
    logger.info('Successfully deleted custom city', { 
      id: record.id, 
      name: record.name 
    });
    
    return { success: true, id: record.id };
  } catch (error) {
    logger.error("Error deleting custom city", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "delete",
};
