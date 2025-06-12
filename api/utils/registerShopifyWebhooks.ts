/**
 * Utility to register Shopify webhooks programmatically
 * 
 * This ensures that order webhooks are properly registered for each shop
 */

export const registerShopifyWebhooks = async (api: any, shopId: string, logger: any): Promise<void> => {
  try {
    logger.info(`Registering webhooks for shop ${shopId}`);
    
    // Get the shop
    const shop = await api.shopifyShop.findOne(shopId);
    
    if (!shop) {
      throw new Error(`Shop with ID ${shopId} not found`);
    }
    
    // Define the webhooks to register
    const webhooks = [
      { topic: "orders/create", address: `https://${process.env.GADGET_PUBLIC_APP_URL}/api/webhook-handler` },
      { topic: "orders/updated", address: `https://${process.env.GADGET_PUBLIC_APP_URL}/api/webhook-handler` },
      { topic: "orders/fulfilled", address: `https://${process.env.GADGET_PUBLIC_APP_URL}/api/webhook-handler` }
    ];
    
    // Get Shopify API credentials
    const shopifyApiKey = process.env.SHOPIFY_API_KEY;
    const shopifyApiSecret = process.env.SHOPIFY_API_SECRET;
    
    if (!shopifyApiKey || !shopifyApiSecret) {
      throw new Error("Shopify API credentials not found in environment variables");
    }
    
    // Register each webhook using Shopify Admin API
    logger.info(`Registering ${webhooks.length} webhooks for shop: ${shop.domain}`);
    
    // Use the shopify connection to register webhooks
    try {
      for (const webhook of webhooks) {
        logger.info(`Creating webhook for topic: ${webhook.topic}`);
        
        await api.connections.shopify.registerWebhook({
          shopId: shopId,
          topic: webhook.topic,
          address: webhook.address
        });
        
        logger.info(`✅ Successfully registered webhook for topic: ${webhook.topic}`);
      }
      
      logger.info(`✅ All webhooks registered successfully for shop: ${shop.domain}`);
    } catch (error) {
      logger.error(`❌ Error registering webhooks for shop: ${shop.domain}`, { 
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  } catch (error) {
    logger.error("Failed to register webhooks", { 
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}; 