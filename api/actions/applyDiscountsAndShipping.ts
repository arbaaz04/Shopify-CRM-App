/**
 * Test Simplified Shipping Cost Absorption with Line Item Distribution
 * 
 * This action tests the shipping absorption logic by:
 * 1. Getting order from database
 * 2. Using getShippingCost to determine if absorption should be applied
 * 3. Fetching detailed line items from Shopify API
 * 4. Getting tracking number and detecting courier
 * 5. Looking up charges in deliveryCharges model
 * 6. Distributing shipping and discount absorption evenly across line items
 */

import { ActionOptions } from "gadget-server";

// Define the expected input parameters
export const params = {
  orderId: { type: "string" },
  testMode: { type: "boolean" }
};

export const run = async ({ params, api, logger, connections }) => {
  try {
    const { orderId, testMode = false } = params;
    
    if (!orderId) {
      throw new Error("orderId is required");
    }

    logger.info('Starting shipping absorption test with line item distribution', { orderId, testMode });

    // STEP 1: Get the order from database
    const order = await api.shopifyOrder.findFirst({
      filter: { id: { equals: orderId } },
      select: {
        id: true,
        name: true,
        totalPriceSet: true,
        shopId: true,
        shop: {
          id: true,
          myshopifyDomain: true
        }
      }
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found in database`);
    }

    if (!order.shopId) {
      throw new Error(`Order ${orderId} does not have a shop associated`);
    }

    // STEP 2: Use getShippingCost to determine if absorption should be applied
    let shouldApplyShippingAbsorption = false;
    let calculatedShippingCost = 0;
    
    try {
      const shippingCostResult = await api.getShippingCost({
        orderId: orderId
      });
      
      // The result is the shipping cost directly (not wrapped in an object)
      calculatedShippingCost = typeof shippingCostResult === 'number' ? shippingCostResult : 0;
      
      // If calculated shipping cost is 0, we should apply absorption
      shouldApplyShippingAbsorption = calculatedShippingCost === 0;
      
      logger.info('Shipping cost calculation', { 
        calculatedShippingCost, 
        shouldApplyShippingAbsorption 
      });
    } catch (error) {
      logger.warn('Failed to get shipping cost from getShippingCost method', { error: error.message });
      // Continue without shipping absorption if method fails
      shouldApplyShippingAbsorption = false;
    }

    // STEP 3: Get Shopify client for the specific shop
    let shopifyClient;
    try {
      shopifyClient = await connections.shopify.forShopId(order.shopId);
    } catch (error) {
      logger.error('Failed to get Shopify client', { shopId: order.shopId, error: error.message });
      throw new Error(`Cannot connect to Shopify for shop ${order.shopId}`);
    }

    // STEP 4: Fetch detailed order data from Shopify API (including line items and discounts)
    const graphqlQuery = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          currentTotalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          subtotalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          totalDiscountsSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          lineItems(first: 50) {
            edges {
              node {
                id
                name
                quantity
                currentQuantity
                originalUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                discountedUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                sku
                variant {
                  id
                  sku
                  price
                  product {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      id: `gid://shopify/Order/${orderId}`
    };
    
    let orderData;
    try {
      const shopifyResult = await shopifyClient.graphql(graphqlQuery, variables);
      orderData = shopifyResult.data?.order;
      
      if (!orderData) {
        orderData = shopifyResult.body?.data?.order || shopifyResult.order;
      }
    } catch (error) {
      logger.error('Failed to fetch order from Shopify', { orderId, error: error.message });
      throw new Error(`Failed to fetch order details from Shopify: ${error.message}`);
    }
    
    if (!orderData) {
      throw new Error(`Order ${orderId} not found in Shopify`);
    }

    // Extract the actual order total and discount information
    let actualOrderTotal = 0;
    if (orderData.currentTotalPriceSet?.shopMoney?.amount) {
      actualOrderTotal = parseFloat(orderData.currentTotalPriceSet.shopMoney.amount);
    } else if (orderData.totalPriceSet?.shopMoney?.amount) {
      actualOrderTotal = parseFloat(orderData.totalPriceSet.shopMoney.amount);
    }

    // Extract total discounts applied
    const totalDiscounts = parseFloat(orderData.totalDiscountsSet?.shopMoney?.amount || '0');

    // Extract line items from Shopify response
    const lineItems = [];
    let lineItemSubtotal = 0;
    if (orderData.lineItems?.edges) {
      for (const edge of orderData.lineItems.edges) {
        const node = edge.node;
        const currentQuantity = Number(node.currentQuantity) || Number(node.quantity) || 0;
        
        if (currentQuantity <= 0) {
          continue;
        }
        
        let originalItemPrice = 0;
        let discountedItemPrice = 0;
        
        if (node.originalUnitPriceSet?.shopMoney?.amount) {
          originalItemPrice = parseFloat(node.originalUnitPriceSet.shopMoney.amount);
        } else if (node.variant?.price) {
          originalItemPrice = parseFloat(node.variant.price);
        }

        if (node.discountedUnitPriceSet?.shopMoney?.amount) {
          discountedItemPrice = parseFloat(node.discountedUnitPriceSet.shopMoney.amount);
        } else {
          discountedItemPrice = originalItemPrice;
        }
        
        lineItemSubtotal += originalItemPrice * currentQuantity;
        
        lineItems.push({
          id: node.id,
          name: node.name,
          quantity: currentQuantity,
          originalQuantity: Number(node.quantity) || 0,
          sku: node.sku || node.variant?.sku || '',
          originalPrice: originalItemPrice,
          discountedPrice: discountedItemPrice,
          itemDiscount: (originalItemPrice - discountedItemPrice) * currentQuantity,
          product: node.variant?.product || null
        });
      }
    }

    // STEP 5: Get tracking and shipping cost info (only if we should apply shipping absorption)
    let trackingNumber = null;
    let courierDetected = 'Unknown';
    let shippingCostToAbsorb = 0;

    if (shouldApplyShippingAbsorption) {
      // Get tracking number
      const fulfillment = await api.shopifyFulfillment.findFirst({
        filter: { orderId: { equals: orderId } },
        select: {
          id: true,
          trackingNumbers: true,
          orderId: true
        }
      });

      if (fulfillment?.trackingNumbers && fulfillment.trackingNumbers.length > 0) {
        trackingNumber = fulfillment.trackingNumbers[0];
        
        // Detect courier based on tracking prefix
        if (trackingNumber.startsWith('DH')) {
          courierDetected = 'Sendit';
        } else if (trackingNumber.startsWith('MA')) {
          courierDetected = 'Speedaf';
        }
      }

      // Get delivery charges for the shop
      const deliveryCharges = await api.deliveryCharges.findFirst({
        filter: { shopId: { equals: order.shopId } },
        select: {
          id: true,
          senditCharge: true,
          speedafCharge: true,
          currency: true
        }
      });

      // Get the appropriate charge based on detected courier
      if (deliveryCharges) {
        if (courierDetected === 'Sendit' && deliveryCharges.senditCharge) {
          shippingCostToAbsorb = deliveryCharges.senditCharge;
        } else if (courierDetected === 'Speedaf' && deliveryCharges.speedafCharge) {
          shippingCostToAbsorb = deliveryCharges.speedafCharge;
        }
      }
    }

    // STEP 6: Calculate absorption distribution
    const totalQuantity = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Shipping absorption: only if getShippingCost returned 0 AND tracking exists AND delivery charges exist
    const willAbsorbShipping = shouldApplyShippingAbsorption && trackingNumber && shippingCostToAbsorb > 0;
    const shippingCostPerItem = willAbsorbShipping && totalQuantity > 0 ? shippingCostToAbsorb / totalQuantity : 0;
    
    // Discount absorption: always if discounts exist
    const willAbsorbDiscounts = totalDiscounts > 0;
    const discountPerItem = willAbsorbDiscounts && totalQuantity > 0 ? totalDiscounts / totalQuantity : 0;

    // Process each line item with absorption
    const processedLineItems = lineItems.map((item) => {
      const originalItemTotal = item.originalPrice * item.quantity;
      const discountedItemTotal = item.discountedPrice * item.quantity;
      
      // Calculate absorptions
      const shippingAbsorptionForItem = shippingCostPerItem * item.quantity;
      const discountAbsorptionForItem = discountPerItem * item.quantity;
      const totalAbsorptionForItem = shippingAbsorptionForItem + discountAbsorptionForItem;
      
      // Calculate new prices after absorption
      const newItemPrice = item.discountedPrice - shippingCostPerItem - discountPerItem;
      const newItemTotal = newItemPrice * item.quantity;

      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        originalPrice: item.originalPrice,
        discountedPrice: item.discountedPrice,
        originalItemTotal: originalItemTotal,
        discountedItemTotal: discountedItemTotal,
        shippingAbsorptionPerUnit: shippingCostPerItem,
        discountAbsorptionPerUnit: discountPerItem,
        totalAbsorptionPerUnit: shippingCostPerItem + discountPerItem,
        shippingAbsorptionForItem: shippingAbsorptionForItem,
        discountAbsorptionForItem: discountAbsorptionForItem,
        totalAbsorptionForItem: totalAbsorptionForItem,
        newPrice: newItemPrice,
        newItemTotal: newItemTotal
      };
    });

    // STEP 7: Calculate final totals
    const totalShippingAbsorbed = willAbsorbShipping ? shippingCostToAbsorb : 0;
    const totalDiscountAbsorbed = willAbsorbDiscounts ? totalDiscounts : 0;
    const totalAbsorbed = totalShippingAbsorbed + totalDiscountAbsorbed;
    
    // Only subtract shipping absorption from order total (discounts already reflected in total)
    const newOrderTotal = actualOrderTotal - totalShippingAbsorbed;

    const wouldAbsorb = willAbsorbShipping || willAbsorbDiscounts;

    logger.info('Final absorption calculation', {
      calculatedShippingCost,
      shouldApplyShippingAbsorption,
      willAbsorbShipping,
      willAbsorbDiscounts,
      actualOrderTotal,
      totalShippingAbsorbed,
      totalDiscountAbsorbed,
      newOrderTotal
    });

    return {
      success: true,
      testResults: {
        orderInfo: {
          id: order.id,
          name: order.name,
          shopId: order.shopId,
          trackingNumber,
          courierDetected,
          originalOrderTotal: parseFloat(actualOrderTotal.toFixed(2)),
          lineItemSubtotal: parseFloat(lineItemSubtotal.toFixed(2)),
          totalDiscounts: parseFloat(totalDiscounts.toFixed(2))
        },
        shippingCostAnalysis: {
          calculatedShippingCost: parseFloat(calculatedShippingCost.toFixed(2)),
          shouldApplyShippingAbsorption,
          shippingCostToAbsorb: parseFloat(shippingCostToAbsorb.toFixed(2)),
          willAbsorbShipping,
          reason: shouldApplyShippingAbsorption ? 
            (willAbsorbShipping ? 
              `getShippingCost returned ${calculatedShippingCost} - applying ${shippingCostToAbsorb} MAD absorption for ${courierDetected}` :
              `getShippingCost returned ${calculatedShippingCost} but no tracking/courier found`
            ) :
            `getShippingCost returned ${calculatedShippingCost} - customer was charged shipping, no absorption needed`
        },
        absorption: {
          wouldAbsorb,
          totalItemsCount: lineItems.length,
          totalQuantity,
          willAbsorbShipping,
          willAbsorbDiscounts,
          shippingCostPerItem: parseFloat(shippingCostPerItem.toFixed(2)),
          discountPerItem: parseFloat(discountPerItem.toFixed(2)),
          totalShippingAbsorbed: parseFloat(totalShippingAbsorbed.toFixed(2)),
          totalDiscountAbsorbed: parseFloat(totalDiscountAbsorbed.toFixed(2)),
          totalAbsorbed: parseFloat(totalAbsorbed.toFixed(2)),
          newOrderTotal: parseFloat(newOrderTotal.toFixed(2))
        },
        lineItems: processedLineItems.map(item => ({
          ...item,
          originalPrice: parseFloat(item.originalPrice.toFixed(2)),
          discountedPrice: parseFloat(item.discountedPrice.toFixed(2)),
          originalItemTotal: parseFloat(item.originalItemTotal.toFixed(2)),
          discountedItemTotal: parseFloat(item.discountedItemTotal.toFixed(2)),
          shippingAbsorptionPerUnit: parseFloat(item.shippingAbsorptionPerUnit.toFixed(2)),
          discountAbsorptionPerUnit: parseFloat(item.discountAbsorptionPerUnit.toFixed(2)),
          totalAbsorptionPerUnit: parseFloat(item.totalAbsorptionPerUnit.toFixed(2)),
          shippingAbsorptionForItem: parseFloat(item.shippingAbsorptionForItem.toFixed(2)),
          discountAbsorptionForItem: parseFloat(item.discountAbsorptionForItem.toFixed(2)),
          totalAbsorptionForItem: parseFloat(item.totalAbsorptionForItem.toFixed(2)),
          newPrice: parseFloat(item.newPrice.toFixed(2)),
          newItemTotal: parseFloat(item.newItemTotal.toFixed(2))
        })),
        summary: {
          message: wouldAbsorb ? 
            `Would absorb: ${willAbsorbShipping ? `${totalShippingAbsorbed.toFixed(2)} MAD shipping cost` : ''}${willAbsorbShipping && willAbsorbDiscounts ? ' and ' : ''}${willAbsorbDiscounts ? `${totalDiscountAbsorbed.toFixed(2)} MAD in discounts` : ''} distributed across ${totalQuantity} items. New order total: ${newOrderTotal.toFixed(2)} MAD` :
            `No absorption applied - getShippingCost returned ${calculatedShippingCost.toFixed(2)} (customer was charged shipping)`
        }
      }
    };

  } catch (error) {
    logger.error('Test failed', { error: error.message, stack: error.stack });
    return {
      success: false,
      error: error.message
    };
  }
};

export const options: ActionOptions = {
  actionType: "global"
};