import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Creates a new delivery charges configuration
 */
export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Creating delivery charges config');
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Set lastUpdated timestamp
    record.lastUpdated = new Date();
    
    // Save the record
    await save(record);
    
    logger.info('Delivery charges config created successfully', { 
      recordId: record.id
    });
    
    return {
      success: true,
      record
    };
  } catch (error) {
    logger.error('Error creating delivery charges config', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "create"
};
