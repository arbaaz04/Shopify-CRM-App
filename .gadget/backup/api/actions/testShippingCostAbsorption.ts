/**
 * Test Shipping Cost Absorption
 * 
 * This action tests the shipping cost absorption functionality with sample data
 */

import { ActionOptions } from "gadget-server";

export const run = async ({ params, api, logger }: { 
  params: { 
    shopId: string;
  };
  api: any;
  logger: any;
}) => {
  try {
    const { shopId } = params;
    
    if (!shopId) {
      throw new Error("shopId is required");
    }

    logger.info('Testing shipping cost absorption functionality');

    // Test case 1: Order with zero shipping (Sendit service)
    const testOrderSendit = {
      id: "test123",
      name: "#TEST123",
      customerName: "Test Customer",
      phone: "+212612345678",
      address: "123 Test Street, Test City",
      city: "Casablanca",
      rawCity: "Casablanca",
      lineItems: [
        {
          name: "Test Product 1",
          quantity: 2,
          sku: "TEST-SKU-1",
          price: "40.00"
        },
        {
          name: "Test Product 2", 
          quantity: 1,
          sku: "TEST-SKU-2",
          price: "60.00"
        }
      ],
      totalPrice: "100.00",
      displayFulfillmentStatus: "FULFILLED",
      createdAt: "2024-01-01T10:00:00Z",
      tags: ["sendit", "confirmed"],
      trackingNumber: "TEST123456",
      isCancelled: false,
      isDeleted: false,
      isFulfillmentCancelled: false,
      shippingLines: [] // Empty shipping lines = 0 MAD shipping
    };

    // Test case 2: Order with existing shipping (should not be modified)
    const testOrderWithShipping = {
      ...testOrderSendit,
      id: "test456",
      name: "#TEST456",
      shippingLines: [
        {
          discountedPriceSet: {
            shopMoney: {
              amount: "15.00"
            }
          }
        }
      ]
    };

    // Test case 3: Order with Speedaf service
    const testOrderSpeedaf = {
      ...testOrderSendit,
      id: "test789",
      name: "#TEST789", 
      tags: ["speedaf", "confirmed"],
      shippingLines: [] // Zero shipping
    };

    logger.info('Running test case 1: Sendit order with zero shipping');
    const result1 = await api.applyShippingCostAbsorption({
      order: testOrderSendit,
      shopId: shopId
    });

    logger.info('Test 1 result:', result1);

    logger.info('Running test case 2: Order with existing shipping');
    const result2 = await api.applyShippingCostAbsorption({
      order: testOrderWithShipping,
      shopId: shopId
    });

    logger.info('Test 2 result:', result2);

    logger.info('Running test case 3: Speedaf order with zero shipping');
    const result3 = await api.applyShippingCostAbsorption({
      order: testOrderSpeedaf,
      shopId: shopId
    });

    logger.info('Test 3 result:', result3);

    // Summary
    const summary = {
      test1_sendit_zero_shipping: {
        shippingCostAbsorbed: result1.shippingCostAbsorbed,
        courierService: result1.courierService,
        appliedShippingCharge: result1.appliedShippingCharge,
        originalTotal: testOrderSendit.totalPrice,
        newTotal: result1.order?.totalPrice,
        message: result1.message
      },
      test2_existing_shipping: {
        shippingCostAbsorbed: result2.shippingCostAbsorbed,
        message: result2.message
      },
      test3_speedaf_zero_shipping: {
        shippingCostAbsorbed: result3.shippingCostAbsorbed,
        courierService: result3.courierService,
        appliedShippingCharge: result3.appliedShippingCharge,
        originalTotal: testOrderSpeedaf.totalPrice,
        newTotal: result3.order?.totalPrice,
        message: result3.message
      }
    };

    return {
      success: true,
      message: "Shipping cost absorption tests completed",
      summary: summary
    };

  } catch (error) {
    logger.error("Error in shipping cost absorption test", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  shopId: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
