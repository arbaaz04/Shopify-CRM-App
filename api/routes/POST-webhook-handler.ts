/**
 * Handles incoming Shopify webhooks for orders
 * Simple implementation that directly processes orders
 */
export default async function route(context: any) {
  const { request, reply, logger, api } = context;
  
  try {
    logger.info("🔔 Shopify webhook received");
    
    // Get headers
    const topic = request.headers['x-shopify-topic'];
    const shopDomain = request.headers['x-shopify-shop-domain'];
    
    logger.info(`Processing webhook: ${topic} from ${shopDomain}`);
    
    // Verify this is an order-related webhook
    if (!topic || !topic.startsWith('orders/')) {
      logger.warn(`Received non-order webhook: ${topic}`);
      return reply.status(200).send({ success: true, message: "Non-order webhook acknowledged" });
    }
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      logger.error("Failed to parse webhook body", { error });
      return reply.status(400).send({ success: false, error: "Invalid JSON body" });
    }
    
    // Get a simple numeric ID from the order
    let orderId;
    try {
      // Try to extract a numeric ID
      if (typeof body.id === 'object') {
        // Just stringify and extract digits
        const str = JSON.stringify(body.id);
        const matches = str.match(/\d+/);
        orderId = matches ? matches[0] : null;
      } else {
        // Direct ID
        orderId = String(body.id).replace(/\D/g, '');
      }
      
      if (!orderId) {
        throw new Error("Could not extract numeric ID");
      }
      
      logger.info(`Extracted order ID: ${orderId}`);
    } catch (error) {
      logger.error("Failed to extract order ID", { error, bodyId: body.id });
      return reply.status(200).send({ success: false, error: "Invalid order ID format" });
    }
    
    // Find the shop
    try {
      const shop = await api.shopifyShop.findFirst({
        filter: { domain: { equals: shopDomain } }
      });
      
      if (!shop) {
        logger.error(`Shop not found: ${shopDomain}`);
        return reply.status(200).send({ success: false, error: "Shop not found" });
      }
      
      // Convert shop.id to string if it's an object
      const shopId = typeof shop.id === 'object' ? 
        JSON.stringify(shop.id).replace(/\D/g, '') : 
        String(shop.id);
      
      logger.info(`Processing order ${orderId} for shop ${shopId}`);
      
      // Process the order with directOrderTest
      try {
        // First try the direct order test which writes to Google Sheets
        const result = await api.directOrderTest.run({
          orderId,
          shopId
        });
        
        logger.info(`✅ Successfully processed order with directOrderTest: ${orderId}`, { result });
        
        // Also try the order sheet processor for backward compatibility
        if (api.orderSheetProcessor && typeof api.orderSheetProcessor.run === 'function') {
          try {
            // Determine if we should move to Orders sheet
            let isPosted = false;
            
            if (topic === 'orders/fulfilled') {
              isPosted = true;
            } else if (topic === 'orders/updated') {
              // Check if order has confirmed tag
              const tags = typeof body.tags === 'string' ? 
                body.tags.split(',').map((t: string) => t.trim()) : 
                Array.isArray(body.tags) ? body.tags : [];
                
              isPosted = tags.includes('confirmed') || body.fulfillment_status === 'fulfilled';
            }
            
            await api.orderSheetProcessor.run({
              orderId,
              shopId,
              isPosted
            });
            
            logger.info(`✅ Also processed with orderSheetProcessor: ${orderId}`);
          } catch (orderProcessorError) {
            logger.warn(`⚠️ orderSheetProcessor failed but directOrderTest succeeded: ${orderProcessorError instanceof Error ? orderProcessorError.message : String(orderProcessorError)}`);
          }
        }
        
        return reply.status(200).send({ success: true });
      } catch (directOrderError) {
        logger.error(`❌ directOrderTest failed: ${directOrderError instanceof Error ? directOrderError.message : String(directOrderError)}`);
        
        // Fallback to original order sheet processor
        try {
          // Determine if we should move to Orders sheet
          let isPosted = false;
          
          if (topic === 'orders/fulfilled') {
            isPosted = true;
          } else if (topic === 'orders/updated') {
            // Check if order has confirmed tag
            const tags = typeof body.tags === 'string' ? 
              body.tags.split(',').map((t: string) => t.trim()) : 
              Array.isArray(body.tags) ? body.tags : [];
              
            isPosted = tags.includes('confirmed') || body.fulfillment_status === 'fulfilled';
          }
          
          // Process the order with the sheet processor
          await api.orderSheetProcessor.run({
            orderId,
            shopId,
            isPosted
          });
          
          logger.info(`✅ Successfully processed order with orderSheetProcessor (fallback): ${orderId}`);
          return reply.status(200).send({ success: true });
        } catch (fallbackError) {
          logger.error(`❌ Both directOrderTest and orderSheetProcessor failed: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`);
          
          // Always return 200 to prevent retries
          return reply.status(200).send({ 
            success: false, 
            error: "All processing methods failed",
            note: "Error occurred but returning 200 to prevent Shopify from retrying"
          });
        }
      }
    } catch (error) {
      logger.error("❌ Error processing webhook", { 
        error: error instanceof Error ? error.message : String(error),
        topic,
        orderId: orderId
      });
      
      // Always return 200 to prevent retries
      return reply.status(200).send({ 
        success: false, 
        error: error instanceof Error ? error.message : String(error),
        note: "Error occurred but returning 200 to prevent Shopify from retrying"
      });
    }
  } catch (error) {
    logger.error("❌ Unhandled error in webhook handler", { error });
    // Return 200 even for unhandled errors to prevent Shopify from retrying
    return reply.status(200).send({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    });
  }
} 