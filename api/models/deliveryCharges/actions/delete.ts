import { deleteRecord, ActionOptions, AnyActionContext } from "gadget-server";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Deletes a delivery charges configuration
 */
export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Deleting delivery charges config', { recordId: record.id });
    
    // Delete the record
    await deleteRecord(record);
    
    logger.info('Delivery charges config deleted successfully', { 
      recordId: record.id
    });
    
    return {
      success: true
    };
  } catch (error) {
    logger.error('Error deleting delivery charges config', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "delete"
};
