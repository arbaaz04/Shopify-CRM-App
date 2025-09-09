/**
 * Apply Shipping Cost Absorption
 * 
 * This action processes orders to apply shipping cost absorption logic:
 * - If order has shipping fees > 0: No changes
 * - If order has shipping fees = 0: Get delivery charges and subtract proportionally from item prices
 * 
 * Uses getShippingCost action for accurate shipping cost calculation:
 * Formula: totalPrice - totalLineItemsPrice - totalTax + totalDiscounts
 * (Accounts for rounding errors with 0.01 tolerance)
 * 
 * Courier detection is based on tracking number prefixes:
 * - DH prefix = Sendit delivery
 * - MA prefix = Speedaf delivery
 * 
 * This is used when writing orders to sheets to reflect absorbed shipping costs.
 */

import { ActionOptions } from "gadget-server";

interface LineItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  originalPrice?: string; // Store original price before adjustment
}

interface ProcessedOrder {
  id: string;
  name: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  rawCity: string;
  lineItems: LineItem[];
  totalPrice: string;
  originalTotalPrice?: string; // Store original total before adjustment
  displayFulfillmentStatus: string;
  createdAt: string;
  tags: string[];
  trackingNumber: string;
  referenceTrackingNumber?: string;
  isExchangeOrder?: boolean;
  isCancelled: boolean;
  isDeleted: boolean;
  isFulfillmentCancelled: boolean;
  shippingCostAbsorbed?: boolean; // Flag to indicate if shipping was absorbed
  courierService?: string; // Which courier service was used
  appliedShippingCharge?: number; // How much shipping was absorbed
}

export const run = async ({ params, api, logger, connections }: { 
  params: { 
    order: any;
    shopId: string;
  };
  api: any;
  logger: any;
  connections: any;
}) => {
  try {
    const { order, shopId } = params;
    
    if (!order || !shopId) {
      throw new Error("Order data and shopId are required");
    }

    logger.info('Starting shipping cost absorption analysis', { 
      orderId: order.id, 
      orderName: order.name 
    });

    // STEP 1: Check if order has existing shipping fees using getShippingCost action
    const shippingCost = await api.getShippingCost({ orderId: order.id });
    
    // Use a small tolerance to account for rounding errors (getShippingCost handles this too)
    const FREE_SHIPPING_THRESHOLD = 0.01;
    
    if (shippingCost > FREE_SHIPPING_THRESHOLD) {
      logger.info(`Order ${order.name} has shipping cost of ${shippingCost}, no absorption needed`);
      return {
        success: true,
        order: order, // Return original order unchanged
        shippingCostAbsorbed: false,
        courierService: null,
        appliedShippingCharge: 0,
        message: `Order has existing shipping cost of ${shippingCost}, no changes applied`
      };
    }

    logger.info(`Order ${order.name} has zero shipping cost, proceeding with absorption logic`);

    // STEP 2: Get Shopify client and fetch detailed order data (like in test action)
    let shopifyClient;
    try {
      shopifyClient = await connections.shopify.forShopId(shopId);
    } catch (error: any) {
      logger.error('Failed to get Shopify client', { shopId, error: error.message });
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: null,
        appliedShippingCharge: 0,
        message: `Cannot connect to Shopify for shop ${shopId}`
      };
    }

    // STEP 3: Fetch detailed order data from Shopify API (same as test action)
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
      id: `gid://shopify/Order/${order.id}`
    };
    
    let orderData;
    try {
      const shopifyResult = await shopifyClient.graphql(graphqlQuery, variables);
      orderData = shopifyResult.data?.order;
      
      if (!orderData) {
        orderData = shopifyResult.body?.data?.order || shopifyResult.order;
      }
    } catch (error: any) {
      logger.error('Failed to fetch order from Shopify', { orderId: order.id, error: error.message });
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: null,
        appliedShippingCharge: 0,
        message: `Failed to fetch order details from Shopify: ${error.message}`
      };
    }
    
    if (!orderData) {
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: null,
        appliedShippingCharge: 0,
        message: `Order ${order.id} not found in Shopify`
      };
    }

    // STEP 4: Extract actual order total and line items (same logic as test action)
    let actualOrderTotal = 0;
    if (orderData.currentTotalPriceSet?.shopMoney?.amount) {
      actualOrderTotal = parseFloat(orderData.currentTotalPriceSet.shopMoney.amount);
    } else if (orderData.totalPriceSet?.shopMoney?.amount) {
      actualOrderTotal = parseFloat(orderData.totalPriceSet.shopMoney.amount);
    }

    const lineItems = [];
    if (orderData.lineItems?.edges) {
      for (const edge of orderData.lineItems.edges) {
        const node = edge.node;
        const currentQuantity = Number(node.currentQuantity) || Number(node.quantity) || 0;
        
        // Skip items that have been fully refunded
        if (currentQuantity <= 0) {
          continue;
        }
        
        // Get price from various possible sources
        let itemPrice = 0;
        if (node.originalUnitPriceSet?.shopMoney?.amount) {
          itemPrice = parseFloat(node.originalUnitPriceSet.shopMoney.amount);
        } else if (node.variant?.price) {
          itemPrice = parseFloat(node.variant.price);
        }
        
        lineItems.push({
          id: node.id,
          name: node.name,
          quantity: currentQuantity,
          sku: node.sku || node.variant?.sku || '',
          price: itemPrice.toFixed(2) // Keep as string for consistency
        });
      }
    }

    // STEP 5: Get tracking number from shopifyFulfillment
    const fulfillment = await api.shopifyFulfillment.findFirst({
      filter: { orderId: { equals: order.id } },
      select: {
        id: true,
        trackingNumbers: true,
        orderId: true
      }
    });

    let trackingNumber = null;
    let courierDetected = 'Unknown';

    if (fulfillment?.trackingNumbers && fulfillment.trackingNumbers.length > 0) {
      trackingNumber = fulfillment.trackingNumbers[0];
      
      // Detect courier based on tracking prefix
      if (trackingNumber.startsWith('DH')) {
        courierDetected = 'Sendit';
      } else if (trackingNumber.startsWith('MA')) {
        courierDetected = 'Speedaf';
      }
    }

    if (!trackingNumber) {
      logger.info(`No tracking number found for order ${order.name}`);
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: null,
        appliedShippingCharge: 0,
        message: "No tracking number found - cannot detect courier"
      };
    }

    // STEP 6: Get delivery charges for the shop
    const deliveryCharges = await api.deliveryCharges.findFirst({
      filter: { shopId: { equals: shopId } },
      select: {
        id: true,
        senditCharge: true,
        speedafCharge: true,
        currency: true
      }
    });

    if (!deliveryCharges) {
      logger.info(`No delivery charges configuration found for shop ${shopId}`);
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: courierDetected,
        appliedShippingCharge: 0,
        message: "No delivery charges configuration found"
      };
    }

    // Get the appropriate charge based on detected courier
    let shippingCharge = 0;
    if (courierDetected === 'Sendit' && deliveryCharges.senditCharge) {
      shippingCharge = deliveryCharges.senditCharge;
    } else if (courierDetected === 'Speedaf' && deliveryCharges.speedafCharge) {
      shippingCharge = deliveryCharges.speedafCharge;
    }

    if (!shippingCharge || shippingCharge <= 0) {
      logger.info(`No shipping charge set for ${courierDetected} service`);
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: courierDetected,
        appliedShippingCharge: 0,
        message: `No shipping charge configured for ${courierDetected} service`
      };
    }

    logger.info(`Found shipping charge of ${shippingCharge} for ${courierDetected} service`);

    // STEP 7: Apply shipping cost absorption (same logic as test action)
    const totalQuantity = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalQuantity === 0) {
      logger.warn('Total quantity is zero', { orderId: order.id });
      return {
        success: true,
        order: order,
        shippingCostAbsorbed: false,
        courierService: courierDetected,
        appliedShippingCharge: 0,
        message: "No items to process"
      };
    }

    const shippingCostPerItem = shippingCharge / totalQuantity;
    
    // Process each line item - subtract shipping cost per item from unit price
    const processedLineItems = lineItems.map((item) => {
      const originalPrice = parseFloat(item.price);
      const newPrice = Math.max(0, originalPrice - shippingCostPerItem);
      
      return {
        ...item,
        originalPrice: item.price, // Store original price
        price: newPrice.toFixed(2) // Update price with shipping absorbed
      };
    });

    // Calculate new order total by subtracting the full shipping charge from original total
    const newOrderTotal = Math.max(0, actualOrderTotal - shippingCharge);

    logger.info(`Successfully applied shipping cost absorption to order ${order.name}`, {
      originalTotal: actualOrderTotal,
      newTotal: newOrderTotal,
      shippingAbsorbed: shippingCharge,
      courierService: courierDetected,
      totalQuantity: totalQuantity,
      shippingPerItem: shippingCostPerItem
    });

    return {
      success: true,
      order: {
        ...order,
        lineItems: processedLineItems,
        originalTotalPrice: actualOrderTotal.toFixed(2), // Store original total
        totalPrice: newOrderTotal.toFixed(2), // Update total price with shipping absorbed
        trackingNumber: trackingNumber // Ensure tracking number is available
      },
      shippingCostAbsorbed: true,
      courierService: courierDetected,
      appliedShippingCharge: shippingCharge,
      message: `Applied ${shippingCharge} ${deliveryCharges.currency || 'MAD'} shipping cost absorption for ${courierDetected} delivery`
    };

  } catch (error: any) {
    logger.error('Error in shipping cost absorption', { 
      error: error.message,
      orderId: params.order?.id 
    });
    
    return {
      success: false,
      order: params.order,
      shippingCostAbsorbed: false,
      courierService: null,
      appliedShippingCharge: 0,
      message: `Error: ${error.message}`
    };
  }
};

/**
 * Determine courier service from tracking number prefix
 */
function determineCourierService(trackingNumber: string, logger: any): string | null {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    logger.info('No tracking number provided or invalid format');
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

  logger.info(`No recognized courier service found for tracking number: ${trackingNumber}`);
  return null;
}

/**
 * Get delivery charges configuration for the shop
 */
async function getDeliveryCharges(shopId: string, api: any, logger: any): Promise<any> {
  try {
    const charges = await api.deliveryCharges.findFirst({
      filter: { shop: { id: { equals: shopId } } }
    });

    return charges;
  } catch (error) {
    logger.error('Error getting delivery charges', { error, shopId });
    return null;
  }
}

/**
 * Apply shipping cost absorption to order line items
 */
async function applyShippingAbsorption(
  order: any, 
  shippingCharge: number, 
  courierService: string, 
  logger: any
): Promise<ProcessedOrder> {
  try {
    const lineItems = order.lineItems || [];
    
    if (lineItems.length === 0) {
      logger.warn('No line items found in order', { orderId: order.id });
      return {
        ...order,
        shippingCostAbsorbed: false,
        courierService: courierService,
        appliedShippingCharge: 0
      };
    }

    // Calculate total quantity across all line items
    const totalQuantity = lineItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
    
    if (totalQuantity === 0) {
      logger.warn('Total quantity is zero', { orderId: order.id });
      return {
        ...order,
        shippingCostAbsorbed: false,
        courierService: courierService,
        appliedShippingCharge: 0
      };
    }

    // Calculate shipping cost per item (distributed evenly across quantities)
    const shippingPerItem = shippingCharge / totalQuantity;
    
    logger.info('Calculating shipping absorption', {
      orderId: order.id,
      totalQuantity: totalQuantity,
      shippingCharge: shippingCharge,
      shippingPerItem: shippingPerItem
    });

    // Process each line item - subtract shipping cost from item price
    const processedLineItems = lineItems.map((item: any) => {
      const originalPrice = parseFloat(item.price || "0");
      const newPrice = Math.max(0, originalPrice - shippingPerItem);
      
      logger.debug('Processing line item', {
        itemSku: item.sku,
        originalPrice: originalPrice,
        quantity: item.quantity,
        shippingPerItem: shippingPerItem,
        newPrice: newPrice
      });

      return {
        ...item,
        originalPrice: item.price, // Store original price
        price: newPrice.toFixed(2) // Update price with shipping absorbed
      };
    });

    // Calculate new order total by subtracting the full shipping charge from original total
    const originalTotal = parseFloat(order.totalPrice || "0");
    const newOrderTotal = Math.max(0, originalTotal - shippingCharge);

    logger.info('Order total calculation', {
      orderId: order.id,
      originalTotal: originalTotal,
      shippingCharge: shippingCharge,
      newOrderTotal: newOrderTotal
    });

    return {
      ...order,
      lineItems: processedLineItems,
      originalTotalPrice: order.totalPrice, // Store original total
      totalPrice: newOrderTotal.toFixed(2), // Update total price with shipping absorbed
      shippingCostAbsorbed: true,
      courierService: courierService,
      appliedShippingCharge: shippingCharge
    };

  } catch (error) {
    logger.error('Error applying shipping absorption', { 
      error: error instanceof Error ? error.message : String(error),
      orderId: order.id 
    });
    
    return {
      ...order,
      shippingCostAbsorbed: false,
      courierService: courierService,
      appliedShippingCharge: 0
    };
  }
}

export const params = {
  order: {
    type: "object",
    required: true
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
