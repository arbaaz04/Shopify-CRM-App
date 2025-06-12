/**
 * Special route for debugging Shopify order webhook payloads
 * This provides more detailed logging of incoming webhook data
 */

export default async function route(context: any) {
  const { request, reply, logger, api } = context;
  
  try {
    // Log the raw incoming webhook payload headers
    logger.info("Received Shopify order webhook for debugging:", {
      headers: request.headers,
      bodySize: request.body ? JSON.stringify(request.body).length : 0
    });
    
    // Log specific details about the order ID
    const body = request.body as any;
    if (body && body.id) {
      logger.info("Order ID details from webhook:", {
        id: body.id,
        idType: typeof body.id,
        idJson: JSON.stringify(body.id),
        bodyKeys: Object.keys(body)
      });
      
      // Log extra details about the structure if it's an object
      if (typeof body.id === 'object') {
        logger.info("Order ID object structure:", {
          keys: Object.keys(body.id),
          hasMarkdown: !!body.id.markdown,
          hasText: !!body.id.text,
          hasContent: !!body.id.content,
          hasToString: typeof body.id.toString === 'function',
          stringified: JSON.stringify(body.id)
        });
      }
    }
    
    // Return success immediately to Shopify
    return reply.status(200).send({ 
      success: true, 
      message: "Debug route - webhook logged for analysis"
    });
  } catch (error) {
    logger.error("Error in Shopify order webhook debug handler:", { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Still return success to prevent Shopify from retrying
    return reply.status(200).send({ success: true });
  }
} 