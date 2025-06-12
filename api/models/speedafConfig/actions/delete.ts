import { deleteRecord, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Deletes an existing Speedaf configuration
 */
export const run: ActionRun = async ({ params, record, logger, api }) => {
  try {
    logger.info('Deleting Speedaf config', { id: record.id });
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Store a copy of the record before deletion for return value
    const recordToReturn = { ...record };
    
    // Delete the record
    await deleteRecord(record);
    
    logger.info('Successfully deleted Speedaf config', { id: recordToReturn.id });
    
    // Return the deleted record instead of a success object
    return recordToReturn;
  } catch (error) {
    logger.error("Error deleting Speedaf config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "delete",
}; 