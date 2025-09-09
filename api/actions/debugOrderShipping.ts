/**
 * Debug Order Shipping Calculation
 * 
 * This action helps debug shipping cost calculation by showing all relevant order fields
 */

export const run = async ({ params, api, logger }: { 
  params: { 
    shopId: string;
    orderId?: string;
    orderName?: string;
  };
  api: any;
  logger: any;
}) => {
  try {
    const { shopId, orderId, orderName } = params;

    if (!shopId) {
      throw new Error("shopId is required");
    }

    let order = null;

    if (orderId) {
      order = await api.shopifyOrder.findFirst({
        filter: {
          id: { equals: orderId },
          shop: { id: { equals: shopId } }
        }
      });
    } else if (orderName) {
      order = await api.shopifyOrder.findFirst({
        filter: {
          name: { equals: orderName },
          shop: { id: { equals: shopId } }
        }
      });
    } else {
      // Get the most recent order
      order = await api.shopifyOrder.findFirst({
        filter: {
          shop: { id: { equals: shopId } }
        },
        sort: {
          createdAt: "Descending"
        }
      });
    }

    if (!order) {
      return {
        success: false,
        message: "No order found"
      };
    }

    // Extract all relevant fields
    const orderData = {
      id: order.id,
      name: order.name,
      totalPrice: order.totalPrice,
      totalLineItemsPrice: order.totalLineItemsPrice,
      totalTax: order.totalTax,
      totalDiscounts: order.totalDiscounts,
      currentTotalPrice: order.currentTotalPrice,
      currentSubtotalPrice: order.currentSubtotalPrice,
      currentTotalTax: order.currentTotalTax,
      currentTotalDiscounts: order.currentTotalDiscounts,
      subtotalPrice: order.subtotalPrice,
      totalLineItemsPriceSet: order.totalLineItemsPriceSet,
      totalPriceSet: order.totalPriceSet,
      totalTaxSet: order.totalTaxSet,
      totalDiscountsSet: order.totalDiscountsSet,
      shippingLines: order.shippingLines,
      currency: order.currencyCode || order.currency
    };

    // Parse values for calculation
    const totalPrice = parseFloat(order.totalPrice || '0');
    const totalLineItemsPrice = parseFloat(order.totalLineItemsPrice || '0');
    const totalTax = parseFloat(order.totalTax || '0');
    const totalDiscounts = parseFloat(order.totalDiscounts || '0');
    const currentTotalDiscounts = parseFloat(order.currentTotalDiscounts || '0');
    
    // Use the larger discount value (sometimes currentTotalDiscounts is more accurate)
    const discountAmount = Math.max(totalDiscounts, currentTotalDiscounts);

    // Try different fields for comparison
    const currentTotalPrice = parseFloat(order.currentTotalPrice || '0');
    const currentSubtotalPrice = parseFloat(order.currentSubtotalPrice || '0');
    const currentTotalTax = parseFloat(order.currentTotalTax || '0');
    const subtotalPrice = parseFloat(order.subtotalPrice || '0');

    // Calculate shipping using different combinations
    const calculations = {
      originalFormula: totalPrice - totalLineItemsPrice - totalTax + totalDiscounts,
      improvedFormula: totalPrice - totalLineItemsPrice - totalTax + discountAmount,
      usingCurrent: currentTotalPrice - currentSubtotalPrice - currentTotalTax + currentTotalDiscounts,
      usingSubtotal: totalPrice - subtotalPrice - totalTax + discountAmount,
      simpleCalculation: totalPrice - totalLineItemsPrice - totalTax,
      withoutDiscountAdjustment: totalPrice - totalLineItemsPrice - totalTax - discountAmount
    };

    // Expected values based on user's breakdown for order #1574
    const expectedBreakdown1574 = {
      subtotal: 249.00,
      discount: 10.00,
      shipping: 0.00, // Should be 0 according to calculation
      tax: 47.80,
      total: 286.80,
      currency: 'MAD'
    };

    // Expected values based on user's breakdown for order #1573
    const expectedBreakdown1573 = {
      subtotal: 249.00,
      discount: 24.90,
      shipping: 29.00,
      tax: 44.82,
      total: 297.92,
      currency: 'MAD'
    };

    // Check if this matches order #1574
    const isOrder1574 = order.name === '#1574' || order.name === '1574';
    const isOrder1573 = order.name === '#1573' || order.name === '1573';
    
    if (isOrder1574) {
      logger.info('Found order #1574 - comparing with expected values', {
        expected: expectedBreakdown1574,
        actual: {
          totalPrice,
          totalLineItemsPrice,
          totalTax,
          totalDiscounts,
          currentTotalDiscounts,
          discountAmount
        },
        calculations,
        discrepancy: {
          message: 'Order should show Free Shipping but shows Shipping costs included',
          expectedShipping: 0,
          calculatedShipping: calculations.improvedFormula
        }
      });
    }
    
    if (isOrder1573) {
      logger.info('Found order #1573 - comparing with expected values', {
        expected: expectedBreakdown1573,
        actual: {
          totalPrice,
          totalLineItemsPrice,
          totalTax,
          totalDiscounts,
          currentTotalDiscounts,
          discountAmount
        },
        calculations
      });
    }

    // Check shipping lines data
    let shippingLinesData = null;
    if (order.shippingLines && Array.isArray(order.shippingLines) && order.shippingLines.length > 0) {
      shippingLinesData = order.shippingLines.map((line: any) => ({
        title: line.title,
        price: line.price,
        discountedPrice: line.discountedPrice,
        priceSet: line.priceSet,
        discountedPriceSet: line.discountedPriceSet
      }));
    }

    logger.info('Order debug data', {
      orderData,
      parsedValues: {
        totalPrice,
        totalLineItemsPrice,
        totalTax,
        totalDiscounts,
        currentTotalDiscounts,
        discountAmount,
        currentTotalPrice,
        currentSubtotalPrice,
        currentTotalTax,
        subtotalPrice
      },
      calculations,
      shippingLinesData
    });

    return {
      success: true,
      order: {
        id: order.id,
        name: order.name,
        currency: order.currencyCode || order.currency
      },
      rawOrderData: orderData,
      parsedValues: {
        totalPrice,
        totalLineItemsPrice,
        totalTax,
        totalDiscounts,
        currentTotalDiscounts,
        discountAmount,
        currentTotalPrice,
        currentSubtotalPrice,
        currentTotalTax,
        subtotalPrice
      },
      shippingCalculations: calculations,
      shippingLinesData,
      recommendedShippingCost: Math.max(0, calculations.improvedFormula),
      isOrder1573: order.name === '#1573' || order.name === '1573',
      isOrder1574: order.name === '#1574' || order.name === '1574',
      expectedForOrder1573: {
        subtotal: 249.00,
        discount: 24.90,
        shipping: 29.00,
        tax: 44.82,
        total: 297.92,
        currency: 'MAD'
      },
      expectedForOrder1574: {
        subtotal: 249.00,
        discount: 10.00,
        shipping: 0.00,
        tax: 47.80,
        total: 286.80,
        currency: 'MAD'
      }
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Error in order debug', { error: errorMessage });
    return {
      success: false,
      error: errorMessage
    };
  }
};
