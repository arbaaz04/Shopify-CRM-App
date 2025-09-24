import { applyParams, save, ActionOptions, AnyActionContext } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

// Define the action run type
type ActionRun = (context: AnyActionContext) => Promise<any>;

// Define the expected structure of blacklistedPhone params
interface BlacklistedPhoneParams {
  phone?: string;
  shop?: { _link: string };
}

export const run: ActionRun = async ({ params, record, logger }) => {
  try {
    logger.info('Creating blacklisted phone', { params });
    
    // Apply parameters to record
    applyParams(params, record);
    
    // Set the addedAt timestamp
    record.addedAt = new Date();
    
    // Prevent cross-shop data access
    await preventCrossShopDataAccess(params, record);
    
    // Save the record
    await save(record);
    
    logger.info('Successfully created blacklisted phone', { phoneId: record.id, phone: record.phone });
  } catch (error) {
    logger.error('Error creating blacklisted phone', { error, params });
    throw error;
  }
};

export const onSuccess: ActionRun = async ({ params, record, logger }) => {
  // Any follow-up logic
};

export const options: ActionOptions = {
  actionType: "create",
};
