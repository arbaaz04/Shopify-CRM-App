import { deleteRecord, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Deleting blacklisted phone', { phoneId: record.id });
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Delete the record
    await deleteRecord(record);
    
    logger.info('Successfully deleted blacklisted phone', { phoneId: record.id });
  } catch (error) {
    logger.error('Error deleting blacklisted phone', { error, phoneId: record.id });
    throw error;
  }
};

export const onSuccess: ActionRun = async ({ params, record, logger }) => {
  // Any follow-up logic
};

export const options: ActionOptions = {
  actionType: "delete",
};
