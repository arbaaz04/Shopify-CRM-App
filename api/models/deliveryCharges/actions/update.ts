import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Updates an existing delivery charges configuration
 */
export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Updating delivery charges config', { recordId: record.id });
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Update lastUpdated timestamp
    record.lastUpdated = new Date();
    
    // Save the record
    await save(record);
    
    logger.info('Delivery charges config updated successfully', { 
      recordId: record.id
    });
    
    return {
      success: true,
      record
    };
  } catch (error) {
    logger.error('Error updating delivery charges config', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "update"
};
