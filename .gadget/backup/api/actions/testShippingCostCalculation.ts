/**
 * Test Shipping Cost Calculation
 * 
 * This action tests the new shipping cost calculation formula to ensure accuracy
 */

export const run = async ({ params, api, logger }: { 
  params: { 
    orderId?: string;
    testOrderData?: any;
  };
  api: any;
  logger: any;
}) => {
  try {
    let testResults = [];

    if (params.orderId) {
      // Test with a real order
      const order = await api.shopifyOrder.findOne(params.orderId, {
        select: {
          id: true,
          name: true,
          totalPrice: true,
          totalLineItemsPrice: true,
          totalTax: true,
          totalDiscounts: true,
          shippingLines: {
            price: true,
            discountedPriceSet: {
              shopMoney: {
                amount: true
              }
            }
          }
        }
      });

      const newShippingCost = calculateShippingCost(order, logger);
      const oldShippingCost = calculateOldShippingCost(order, logger);

      testResults.push({
        orderId: order.id,
        orderName: order.name,
        orderData: {
          totalPrice: order.totalPrice,
          totalLineItemsPrice: order.totalLineItemsPrice,
          totalTax: order.totalTax,
          totalDiscounts: order.totalDiscounts
        },
        newShippingCost,
        oldShippingCost,
        difference: Math.abs(newShippingCost - oldShippingCost),
        isSignificantDifference: Math.abs(newShippingCost - oldShippingCost) > 0.01
      });
    }

    // Test with sample data
    const testCases = [
      {
        name: "Order with shipping",
        totalPrice: "100.00",
        totalLineItemsPrice: "85.00",
        totalTax: "10.00",
        totalDiscounts: "0.00",
        expectedShipping: 5.00
      },
      {
        name: "Order with free shipping",
        totalPrice: "95.00",
        totalLineItemsPrice: "85.00",
        totalTax: "10.00",
        totalDiscounts: "0.00",
        expectedShipping: 0.00
      },
      {
        name: "Order with discount",
        totalPrice: "90.00",
        totalLineItemsPrice: "85.00",
        totalTax: "10.00",
        totalDiscounts: "10.00",
        expectedShipping: 5.00
      },
      {
        name: "Rounding error test",
        totalPrice: "95.001",
        totalLineItemsPrice: "85.00",
        totalTax: "10.00",
        totalDiscounts: "0.00",
        expectedShipping: 0.00 // Should be treated as 0 due to rounding tolerance
      }
    ];

    for (const testCase of testCases) {
      const calculatedShipping = calculateShippingCost(testCase, logger);
      testResults.push({
        testCase: testCase.name,
        orderData: testCase,
        calculatedShipping,
        expectedShipping: testCase.expectedShipping,
        isCorrect: Math.abs(calculatedShipping - testCase.expectedShipping) < 0.01
      });
    }

    logger.info('Shipping cost calculation test results', { testResults });

    return {
      success: true,
      testResults,
      summary: {
        totalTests: testResults.length,
        passedTests: testResults.filter(r => r.isCorrect !== false).length,
        significantDifferences: testResults.filter(r => r.isSignificantDifference === true).length
      }
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
 * Calculate shipping cost using new formula
 */
function calculateShippingCost(order: any, logger: any): number {
  try {
    const totalPrice = parseFloat(order.totalPrice || '0');
    const totalLineItemsPrice = parseFloat(order.totalLineItemsPrice || '0');
    const totalTax = parseFloat(order.totalTax || '0');
    const totalDiscounts = parseFloat(order.totalDiscounts || '0');

    const shippingCost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts;

    // Account for rounding errors
    const ROUNDING_TOLERANCE = 0.01;
    if (Math.abs(shippingCost) < ROUNDING_TOLERANCE) {
      return 0;
    }

    return Math.max(0, shippingCost);
  } catch (error) {
    logger.error('Error calculating shipping cost', { error });
    return 0;
  }
}

/**
 * Calculate shipping cost using old method (for comparison)
 */
function calculateOldShippingCost(order: any, logger: any): number {
  try {
    if (!order.shippingLines || !Array.isArray(order.shippingLines) || order.shippingLines.length === 0) {
      return 0;
    }

    let totalShippingCost = 0;

    for (const shippingLine of order.shippingLines) {
      const shippingPrice = shippingLine.discountedPriceSet?.shopMoney?.amount || 
                           shippingLine.originalPriceSet?.shopMoney?.amount ||
                           shippingLine.price;

      if (shippingPrice) {
        totalShippingCost += parseFloat(shippingPrice);
      }
    }

    return totalShippingCost;
  } catch (error) {
    logger.error('Error calculating old shipping cost', { error });
    return 0;
  }
}

export const params = {
  orderId: { type: "string", required: false },
  testOrderData: { type: "object", required: false }
};
