/**
 * Test Shipping Cost Calculation
 * 
 * This action tests the new shipping cost calculation formula:
 * Shipping Cost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts
 */

export const run = async ({ params, api, logger }: { 
  params: { 
    shopId?: string;
    orderId?: string;
  };
  api: any;
  logger: any;
}) => {
  try {
    const { shopId, orderId } = params;

    if (!shopId) {
      throw new Error("shopId is required");
    }

    let orders = [];

    if (orderId) {
      // Test specific order
      const order = await api.shopifyOrder.findFirst({
        filter: {
          id: { equals: orderId },
          shop: { id: { equals: shopId } }
        }
      });
      
      if (order) {
        orders = [order];
      }
    } else {
      // Test first 5 orders
      orders = await api.shopifyOrder.findMany({
        filter: {
          shop: { id: { equals: shopId } }
        },
        first: 5
      });
    }

    if (orders.length === 0) {
      return {
        success: false,
        message: "No orders found to test"
      };
    }

    logger.info(`Testing shipping cost calculation for ${orders.length} orders`);

    const results = orders.map((order: any) => {
      const totalPrice = parseFloat(order.totalPrice || '0');
      const totalLineItemsPrice = parseFloat(order.totalLineItemsPrice || '0');
      const totalTax = parseFloat(order.totalTax || '0');
      const totalDiscounts = parseFloat(order.totalDiscounts || '0');
      const currentTotalDiscounts = parseFloat(order.currentTotalDiscounts || '0');
      
      // Use the larger discount value (sometimes currentTotalDiscounts is more accurate)
      const discountAmount = Math.max(totalDiscounts, currentTotalDiscounts);
      
      const calculatedShippingCost = totalPrice - totalLineItemsPrice - totalTax + discountAmount;
      const finalShippingCost = Math.max(0, calculatedShippingCost);

      return {
        orderId: order.id,
        orderName: order.name,
        currency: order.currencyCode || order.currency || 'USD',
        orderData: {
          totalPrice,
          totalLineItemsPrice,
          totalTax,
          totalDiscounts,
          currentTotalDiscounts,
          usedDiscountAmount: discountAmount
        },
        calculatedShippingCost,
        finalShippingCost,
        hasShipping: finalShippingCost > 0,
        trackingNumber: order.trackingNumber,
        courierService: determineCourierService(order.trackingNumber || '', logger)
      };
    });

    const summary = {
      totalOrders: results.length,
      ordersWithShipping: results.filter((r: any) => r.hasShipping).length,
      ordersWithoutShipping: results.filter((r: any) => !r.hasShipping).length,
      senditOrders: results.filter((r: any) => r.courierService === 'sendit').length,
      speedafOrders: results.filter((r: any) => r.courierService === 'speedaf').length,
      unrecognizedCourier: results.filter((r: any) => !r.hasShipping && !r.courierService).length
    };

    logger.info('Shipping cost calculation test results', { summary, results });

    return {
      success: true,
      results,
      summary,
      formula: "Shipping Cost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts"
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Error in shipping cost calculation test', { error: errorMessage });
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Determine courier service from tracking number prefix
 */
function determineCourierService(trackingNumber: string, logger: any): string | null {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return null;
  }

  const trimmedTracking = trackingNumber.trim().toUpperCase();
  
  // Check for Sendit indicators (tracking starts with "DH")
  if (trimmedTracking.startsWith('DH')) {
    logger.info(`Detected Sendit delivery from tracking number: ${trackingNumber}`);
    return 'sendit';
  }

  // Check for Speedaf indicators (tracking starts with "MA")
  if (trimmedTracking.startsWith('MA')) {
    logger.info(`Detected Speedaf delivery from tracking number: ${trackingNumber}`);
    return 'speedaf';
  }

  return null;
}
