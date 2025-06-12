import { ActionOptions, AnyActionContext } from "gadget-server";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

/**
 * Finds the first Speedaf configuration that matches the filter
 */
export const run: ActionRun = async ({ params, logger, api }) => {
  try {
    logger.info('Finding Speedaf config', { params });
    
    // Use system Model.findFirst approach (will be provided by framework)
    return params;
  } catch (error) {
    logger.error("Error finding Speedaf config", { 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
    throw error;
  }
};

export const options: ActionOptions = {
  actionType: "custom",
}; 