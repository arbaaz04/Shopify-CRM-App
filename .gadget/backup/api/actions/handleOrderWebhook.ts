/**
 * Webhook handler specifically for Shopify Order events
 * This action processes order webhooks and routes them to the appropriate processors
 */

import { ActionOptions } from "gadget-server";

// Define the run function signature
interface ActionContext {
  params: {
    [key: string]: any
  };
  logger: any;
  api: any;
  connections: any;
}

export const run = async ({ params, logger, api, connections }: ActionContext) => {
  try {
    logger.info("Received Shopify order webhook", { 
      params: Object.keys(params), 
      webhook_topic: params.webhook_topic,
      order_id: params.id || (params.order_id ?? "unknown")
    });

    // Extract order data from webhook payload
    let orderData = params;
    let finalOrderId = null;
    
    // Extract order ID from different possible formats
    if (orderData.id) {
      finalOrderId = String(orderData.id).replace(/\D/g, '');
    } else if (orderData.order_id) {
      finalOrderId = String(orderData.order_id).replace(/\D/g, '');
    } else if (orderData.admin_graphql_api_id || orderData.admin_graphql_api_order_id) {
      const gidString = orderData.admin_graphql_api_id || orderData.admin_graphql_api_order_id;
      finalOrderId = String(gidString).split('/').pop()?.replace(/\D/g, '') || null;
    }
    
    if (!finalOrderId) {
      logger.error("Could not extract order ID from webhook payload", { orderData });
      return {
        success: false,
        error: "Could not extract order ID from webhook payload"
      };
    }
    
    logger.info(`Processing order webhook for order ID: ${finalOrderId}`);
    
    // Get shop ID
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      throw new Error("Shop not found");
    }
    
    // Clean shop ID
    const shopId = String(shop.id).replace(/\D/g, '');

    // Process the order with directOrderTest
    logger.info(`Calling directOrderTest for order ${finalOrderId}`);
    
    let result = null;
    let success = false;
    let error = null;
    
    // Try multiple ways to call the action
    try {
      // Method 1: Using api.actions
      if (api.actions && api.actions.directOrderTest && typeof api.actions.directOrderTest.run === 'function') {
        result = await api.actions.directOrderTest.run({
          orderId: finalOrderId,
          shopId: shopId
        });
        
        if (result && result.success) {
          success = true;
          logger.info(`Successfully processed order with directOrderTest via api.actions: ${finalOrderId}`);
        }
      }
    } catch (err) {
      logger.warn(`Error calling directOrderTest via api.actions: ${err instanceof Error ? err.message : String(err)}`);
    }
    
    // Method 2: Using direct api namespace
    if (!success) {
      try {
        if (api.directOrderTest) {
          if (typeof api.directOrderTest.run === 'function') {
            result = await api.directOrderTest.run({
              orderId: finalOrderId,
              shopId: shopId
            });
          } else if (typeof api.directOrderTest === 'function') {
            result = await api.directOrderTest({
              orderId: finalOrderId,
              shopId: shopId
            });
          }
          
          if (result && result.success) {
            success = true;
            logger.info(`Successfully processed order with directOrderTest via direct API: ${finalOrderId}`);
          }
        }
      } catch (err) {
        logger.warn(`Error calling directOrderTest via direct API: ${err instanceof Error ? err.message : String(err)}`);
        error = err instanceof Error ? err.message : String(err);
      }
    }
    
    // Return the result
    if (success) {
      return {
        success: true,
        message: `Order ${finalOrderId} processed successfully`,
        result
      };
    } else {
      return {
        success: false,
        error: error || "Failed to process order with directOrderTest",
        orderId: finalOrderId
      };
    }
  } catch (error) {
    logger.error("Error processing order webhook", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {};

export const options: ActionOptions = {
  triggers: {
    api: true,
    webhook: {
      topics: ["ORDERS_CREATE", "ORDERS_UPDATED", "ORDERS_FULFILLED"],
      source: "shopify",
    }
  }
}; 