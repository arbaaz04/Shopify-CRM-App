/**
 * Hooks for the shopifyShop model
 * 
 * This file contains hooks that run on shopifyShop model events.
 */

import type { ActionOptions, AnyActionContext } from "gadget-server";
import { registerShopifyWebhooks } from "../../utils/registerShopifyWebhooks";

/**
 * After a shop is created (installed), register webhooks
 */
export const afterShopifyShopCreate = async (context: AnyActionContext, options: ActionOptions) => {
  const { api, params, logger, record } = context;
  
  try {
    if (record?.id) {
      logger.info(`Shop created/installed with ID: ${record.id}, registering webhooks`);
      await registerShopifyWebhooks(api, record.id, logger);
      logger.info(`Successfully registered webhooks for new shop: ${record.domain || record.id}`);
    }
  } catch (error) {
    // Log error but don't throw (don't fail the shop creation)
    logger.error(`Failed to register webhooks for new shop`, { 
      error: error instanceof Error ? error.message : String(error),
      shopId: record?.id,
      shopDomain: record?.domain
    });
  }
}; 