/**
 * Search for multiple orders by names for return processing
 */

import { ActionOptions } from "gadget-server";

interface ActionParams {
  orderNumbers: string[];
  shopId: string;
}

interface ActionContext {
  params: ActionParams;
  api: any;
  logger: any;
  connections: any;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    const { orderNumbers, shopId } = params;

    logger.info('Searching for bulk orders for return', { 
      orderCount: orderNumbers.length, 
      orderNumbers: orderNumbers.slice(0, 5), // Log first 5 for debugging
      shopId 
    });

    // Validate required parameters
    if (!orderNumbers || !Array.isArray(orderNumbers) || orderNumbers.length === 0) {
      return {
        success: false,
        error: "Missing required parameters: orderNumbers array is required"
      };
    }

    if (!shopId) {
      return {
        success: false,
        error: "Missing required parameter: shopId is required"
      };
    }

    if (orderNumbers.length > 50) {
      return {
        success: false,
        error: "Too many orders requested. Maximum 50 orders per batch."
      };
    }

    // Get the shop to ensure we have access
    const shop = await api.shopifyShop.findFirst({
      filter: { id: { equals: shopId } }
    });

    if (!shop) {
      return {
        success: false,
        error: "Shop not found or access denied"
      };
    }

    const results = [];

    // Process each order number
    for (const orderNumber of orderNumbers) {
      try {
        logger.info('Processing order number', { orderNumber, shopId });

        // Clean the order name - remove # if present, or add it if not
        let cleanOrderName = orderNumber.trim();
        let searchOrderName = cleanOrderName;
        
        // If the order name doesn't start with #, add it
        if (!cleanOrderName.startsWith('#')) {
          searchOrderName = `#${cleanOrderName}`;
        }

        // Use the existing searchOrderForReturn action for each order
        const orderResult = await api.searchOrderForReturn({
          orderName: searchOrderName,
          shopId: shopId
        });

        if (orderResult.success) {
          results.push({
            orderNumber: cleanOrderName,
            success: true,
            message: "Order found successfully",
            orderData: orderResult.order
          });
          
          logger.info('Order found successfully', { 
            orderNumber: cleanOrderName,
            orderName: orderResult.order.name,
            customerName: orderResult.order.customerName
          });
        } else {
          results.push({
            orderNumber: cleanOrderName,
            success: false,
            message: orderResult.error || "Order not found",
            error: orderResult.error
          });
          
          logger.warn('Order not found', { 
            orderNumber: cleanOrderName,
            searchOrderName,
            error: orderResult.error
          });
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        results.push({
          orderNumber: orderNumber.trim(),
          success: false,
          message: "Error processing order",
          error: errorMessage
        });
        
        logger.error('Error processing individual order', { 
          orderNumber: orderNumber.trim(),
          error: errorMessage
        });
      }
    }

    // Calculate summary statistics
    const successfulOrders = results.filter(r => r.success);
    const failedOrders = results.filter(r => !r.success);

    logger.info('Bulk order search completed', {
      totalOrders: orderNumbers.length,
      successful: successfulOrders.length,
      failed: failedOrders.length
    });

    return {
      success: true,
      message: `Processed ${orderNumbers.length} orders: ${successfulOrders.length} found, ${failedOrders.length} not found`,
      results: results,
      summary: {
        totalOrders: orderNumbers.length,
        foundOrders: successfulOrders.length,
        notFoundOrders: failedOrders.length,
        successRate: Math.round((successfulOrders.length / orderNumbers.length) * 100)
      }
    };

  } catch (error) {
    logger.error('Error in bulk order search', { 
      error: error instanceof Error ? error.message : String(error),
      orderNumbers: params.orderNumbers?.slice(0, 5) // Log first 5 for debugging
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while searching for orders"
    };
  }
};

export const params = {
  orderNumbers: {
    type: "array",
    required: true,
    items: {
      type: "string"
    }
  },
  shopId: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
