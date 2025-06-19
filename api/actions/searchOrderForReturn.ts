/**
 * Search for an order by name for return processing
 */

import { ActionOptions } from "gadget-server";

interface ActionParams {
  orderName: string;
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
    const { orderName, shopId } = params;

    logger.info('Searching for order for return', { orderName, shopId });

    // Validate required parameters
    if (!orderName || !shopId) {
      return {
        success: false,
        error: "Missing required parameters: orderName and shopId are required"
      };
    }

    // Clean the order name - remove # if present, or add it if not
    let cleanOrderName = orderName.trim();
    let searchOrderName = cleanOrderName;
    
    // If the order name doesn't start with #, add it
    if (!cleanOrderName.startsWith('#')) {
      searchOrderName = `#${cleanOrderName}`;
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

    // Search for the order by name
    // Note: Shop filtering is handled automatically by access control filters
    const order = await api.shopifyOrder.findFirst({
      filter: {
        name: { equals: searchOrderName }
      }
    });

    if (!order) {
      return {
        success: false,
        error: `Order ${searchOrderName} not found`
      };
    }

    logger.info('Found order in database', {
      orderId: order.id,
      orderName: order.name || searchOrderName
    });

    // Extract the numeric order ID - ensure it's properly formatted
    const numericOrderId = String(order.id).replace(/\D/g, '');

    if (!numericOrderId) {
      return {
        success: false,
        error: `Invalid order ID format: ${order.id}`
      };
    }

    // Get detailed order information directly from Shopify GraphQL API
    // Use the same connection method as the working extractOrderSKUs action
    const shopifyApi = await connections.shopify.forShopId(shopId);

    const orderQuery = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          createdAt
          cancelledAt
          displayFinancialStatus
          displayFulfillmentStatus
          cancelReason
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
          customer {
            id
            firstName
            lastName
            email
            phone
          }
          shippingAddress {
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          fulfillments {
            id
            status
            trackingInfo {
              number
              company
              url
            }
            createdAt
            updatedAt
          }
          lineItems(first: 50) {
            edges {
              node {
                id
                name
                quantity
                currentQuantity
                refundableQuantity
                sku
                variant {
                  id
                  sku
                  price
                  product {
                    id
                    title
                    handle
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

    // Use cache-busting options like the working action
    const cacheOptions = {
      disableCache: true,
      cacheTTL: 0,
      forceRefresh: true
    };

    logger.info('Attempting to fetch order from Shopify', {
      orderId: numericOrderId,
      shopId,
      graphqlId: `gid://shopify/Order/${numericOrderId}`
    });

    const result = await shopifyApi.graphql(orderQuery, {
      id: `gid://shopify/Order/${numericOrderId}`
    }, cacheOptions);

    logger.info('GraphQL response received', {
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

    // Handle different possible response formats like the working action
    const orderData =
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure

    if (!orderData) {
      // Check for errors in various locations
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
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

    // Use current price totals if available (like the working action)
    if (orderData.currentTotalPriceSet?.shopMoney?.amount) {
      orderData.totalPriceSet = {
        shopMoney: {
          amount: orderData.currentTotalPriceSet.shopMoney.amount,
          currencyCode: orderData.currentTotalPriceSet.shopMoney.currencyCode
        }
      };
    }

    // Check if the order can be returned (not cancelled, not fully refunded, etc.)
    if (orderData.cancelledAt) {
      return {
        success: false,
        error: `Order ${searchOrderName} is cancelled and cannot be returned`
      };
    }

    // Transform line items to a more usable format, filtering out refunded items (like the working action)
    let returnableItems = [];
    if (orderData?.lineItems?.edges && Array.isArray(orderData.lineItems.edges)) {
      returnableItems = orderData.lineItems.edges
        .map((edge: any) => {
          const node = edge?.node || {};
          // Get both original and current quantities
          const originalQuantity = Number(node.quantity) || 0;
          const currentQuantity = Number(node.currentQuantity) || 0;

          // Skip items that have been fully refunded
          if (currentQuantity <= 0) {
            return null;
          }

          return {
            id: node.id || '',
            name: node.name || 'Unknown Item',
            quantity: currentQuantity,
            originalQuantity,
            sku: node.sku || node.variant?.sku || '',
            price: node.variant?.price || '0.00',
            variant: node.variant,
            refundableQuantity: Number(node.refundableQuantity) || 0
          };
        })
        .filter((item: any) => item !== null); // Remove null items (fully refunded)
    }

    if (returnableItems.length === 0) {
      return {
        success: false,
        error: `Order ${searchOrderName} has no returnable items`
      };
    }

    // Format line items for the return interface
    const formattedLineItems = returnableItems.map((item: any) => {
      const quantity = Number(item.quantity) || 0;
      const originalQuantity = Number(item.originalQuantity) || quantity;
      const unitPrice = item.price ? parseFloat(item.price) : 0;

      return {
        id: item.id, // This should be the full GraphQL ID like gid://shopify/LineItem/123456
        name: item.name,
        sku: item.sku,
        quantity: quantity,
        originalQuantity: originalQuantity,
        unitPrice: unitPrice,
        totalPrice: unitPrice * quantity,
        variant: item.variant,
        image: item.variant?.product?.image?.url || null,
        returnable: true,
        maxReturnQuantity: Math.min(quantity, item.refundableQuantity || quantity)
      };
    });

    // Calculate totals
    const subtotal = formattedLineItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const orderTotal = parseFloat(orderData.totalPriceSet.shopMoney.amount);

    // Calculate total refunded amount
    const totalRefunded = orderData.refunds?.reduce((sum: number, refund: any) => {
      return sum + parseFloat(refund.totalRefundedSet.shopMoney.amount);
    }, 0) || 0;

    // Format customer name
    const customerName = orderData.customer ?
      `${orderData.customer.firstName || ''} ${orderData.customer.lastName || ''}`.trim() : '';

    // Format address
    const address = orderData.shippingAddress ?
      [
        orderData.shippingAddress.address1,
        orderData.shippingAddress.address2
      ].filter(Boolean).join(', ') : '';

    // Get tracking number
    const trackingNumber = orderData.fulfillments?.[0]?.trackingInfo?.[0]?.number || '';

    return {
      success: true,
      order: {
        id: numericOrderId,
        name: orderData.name,
        customerName: customerName,
        customer: orderData.customer,
        phone: orderData.customer?.phone || orderData.shippingAddress?.phone || '',
        email: orderData.customer?.email || '',
        address: address,
        city: orderData.shippingAddress?.city || '',
        shippingAddress: orderData.shippingAddress,
        totalPrice: orderTotal,
        subtotal: subtotal,
        financialStatus: orderData.displayFinancialStatus,
        fulfillmentStatus: orderData.displayFulfillmentStatus,
        createdAt: orderData.createdAt,
        trackingNumber: trackingNumber,
        lineItems: formattedLineItems,
        refundInfo: {
          hasRefunds: totalRefunded > 0,
          totalRefunded: totalRefunded,
          remainingRefundable: orderTotal - totalRefunded
        },
        canReturn: true,
        returnableItemsCount: formattedLineItems.length
      }
    };

  } catch (error) {
    logger.error('Error searching for order', { 
      error: error instanceof Error ? error.message : String(error),
      orderName: params.orderName 
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while searching for the order"
    };
  }
};

export const params = {
  orderName: {
    type: "string",
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
