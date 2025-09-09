/**
 * Calculate refund amounts for selected line items
 */

import { ActionOptions } from "gadget-server";

interface RefundLineItem {
  lineItemId: string;
  quantity: number;
  reason?: string;
}

interface ActionParams {
  orderId: string;
  shopId: string;
  lineItems: RefundLineItem[];
  refundShipping?: boolean;
  reason?: string;
}

interface ActionContext {
  params: ActionParams;
  api: any;
  logger: any;
  connections: any;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    const { orderId, shopId, lineItems, refundShipping = false, reason = "Customer return" } = params;

    logger.info('Calculating refund for order', { orderId, lineItems: lineItems.length });

    // Validate required parameters
    if (!orderId || !shopId || !lineItems || lineItems.length === 0) {
      return {
        success: false,
        error: "Missing required parameters: orderId, shopId, and lineItems are required"
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

    // Get the order details
    // Note: Shop filtering is handled automatically by access control filters
    const order = await api.shopifyOrder.findFirst({
      filter: {
        id: { equals: orderId }
      }
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found"
      };
    }

    // Use Shopify GraphQL API to get detailed order information
    const shopifyApi = await connections.shopify.forShopId(shopId);
    
    const orderQuery = `
      query getOrder($id: ID!) {
        order(id: $id) {
          id
          name
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          shippingLines(first: 1) {
            edges {
              node {
                originalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                discountedPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          lineItems(first: 250) {
            edges {
              node {
                id
                name
                quantity
                variant {
                  id
                  sku
                  price
                }
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
                totalDiscountSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          refunds {
            id
            totalRefundedSet {
              shopMoney {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;

    // Use cache-busting options like the working searchOrderForReturn action
    const cacheOptions = {
      disableCache: true,
      cacheTTL: 0,
      forceRefresh: true
    };

    logger.info('Attempting to fetch order for refund calculation', {
      orderId,
      shopId,
      graphqlId: `gid://shopify/Order/${orderId}`
    });

    const result = await shopifyApi.graphql(orderQuery, {
      id: `gid://shopify/Order/${orderId}`
    }, cacheOptions);

    logger.info('GraphQL response received for refund calculation', {
      hasResult: !!result,
      hasData: !!result?.data,
      hasOrder: !!result?.data?.order,
      resultKeys: result ? Object.keys(result) : []
    });

    if (!result) {
      return {
        success: false,
        error: "No GraphQL response received"
      };
    }

    // Handle different possible response formats like the working searchOrderForReturn action
    const orderData =
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure

    if (!orderData) {
      // Check for errors in various locations
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
        logger.error('GraphQL errors in refund calculation', { errors, orderId });
        return {
          success: false,
          error: `GraphQL errors: ${JSON.stringify(errors)}`
        };
      }

      return {
        success: false,
        error: "Order data not found in response"
      };
    }
    const orderLineItems = orderData.lineItems.edges.map((edge: any) => edge.node);

    // Calculate refund amounts for each selected line item
    const refundCalculations = [];
    let totalRefundAmount = 0;

    for (const refundItem of lineItems) {
      const orderLineItem = orderLineItems.find((item: any) => 
        item.id === `gid://shopify/LineItem/${refundItem.lineItemId}` ||
        item.id === refundItem.lineItemId
      );

      if (!orderLineItem) {
        logger.warn('Line item not found in order', { lineItemId: refundItem.lineItemId });
        continue;
      }

      // Validate quantity
      if (refundItem.quantity > orderLineItem.quantity) {
        return {
          success: false,
          error: `Cannot refund ${refundItem.quantity} items for "${orderLineItem.name}" - only ${orderLineItem.quantity} available`
        };
      }

      // Calculate refund amount for this line item
      const unitPrice = parseFloat(orderLineItem.discountedUnitPriceSet.shopMoney.amount);
      const lineItemRefundAmount = unitPrice * refundItem.quantity;
      
      totalRefundAmount += lineItemRefundAmount;

      refundCalculations.push({
        lineItemId: refundItem.lineItemId,
        name: orderLineItem.name,
        sku: orderLineItem.variant?.sku || '',
        quantity: refundItem.quantity,
        unitPrice: unitPrice,
        totalAmount: lineItemRefundAmount,
        reason: refundItem.reason || reason
      });
    }

    // Add shipping refund if requested
    let shippingRefundAmount = 0;
    if (refundShipping && orderData.shippingLines?.edges && orderData.shippingLines.edges.length > 0) {
      // Use the discounted price if available, otherwise use original price
      const shippingLineNode = orderData.shippingLines.edges[0]?.node;
      if (shippingLineNode) {
        const shippingPrice = shippingLineNode.discountedPriceSet?.shopMoney?.amount ||
                             shippingLineNode.originalPriceSet?.shopMoney?.amount;

        if (shippingPrice) {
          shippingRefundAmount = parseFloat(shippingPrice);
          totalRefundAmount += shippingRefundAmount;
        }
      }
    }

    // Check if there are existing refunds
    const existingRefunds = orderData.refunds || [];
    const totalExistingRefunds = existingRefunds.reduce((sum: number, refund: any) => {
      return sum + parseFloat(refund.totalRefundedSet.shopMoney.amount);
    }, 0);

    const orderTotal = parseFloat(orderData.totalPriceSet.shopMoney.amount);
    const remainingRefundable = orderTotal - totalExistingRefunds;

    if (totalRefundAmount > remainingRefundable) {
      return {
        success: false,
        error: `Refund amount (${totalRefundAmount.toFixed(2)}) exceeds remaining refundable amount (${remainingRefundable.toFixed(2)})`,
        calculation: {
          orderId,
          orderName: orderData.name,
          currency: orderData.totalPriceSet.shopMoney.currencyCode,
          totalRefundAmount,
          orderTotal,
          existingRefunds: totalExistingRefunds,
          remainingRefundable
        }
      };
    }

    return {
      success: true,
      calculation: {
        orderId,
        orderName: orderData.name,
        currency: orderData.totalPriceSet.shopMoney.currencyCode,
        lineItems: refundCalculations,
        shippingRefund: refundShipping ? {
          amount: shippingRefundAmount,
          description: "Shipping refund"
        } : null,
        totalRefundAmount,
        orderTotal,
        existingRefunds: totalExistingRefunds,
        remainingRefundable
      }
    };

  } catch (error) {
    logger.error('Error calculating refund', { 
      error: error instanceof Error ? error.message : String(error),
      orderId: params.orderId 
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export const params = {
  orderId: {
    type: "string",
    required: true
  },
  shopId: {
    type: "string",
    required: true
  },
  lineItems: {
    type: "array",
    required: true,
    items: {
      type: "object",
      properties: {
        lineItemId: { type: "string" },
        quantity: { type: "number" },
        reason: { type: "string" }
      }
    }
  },
  refundShipping: {
    type: "boolean",
    required: false
  },
  reason: {
    type: "string",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
