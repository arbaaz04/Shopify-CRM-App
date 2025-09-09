import { ActionOptions } from "gadget-server";

interface ActionContext {
  params: {};
  api: any;
  logger: any;
  connections: any;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    logger.info('Fetching recent orders to find valid order IDs');

    // Get shop ID first
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      throw new Error("Shop not found");
    }

    // Get recent orders from the database first
    const dbOrders = await api.shopifyOrder.findMany({
      select: {
        id: true,
        name: true,
        totalPriceSet: true,
        fulfillmentStatus: true,
        tags: true
      },
      sort: { createdAt: "Descending" },
      first: 10
    });

    logger.info('Found orders in database', { 
      count: dbOrders.length,
      orders: dbOrders.map((o: any) => ({ id: o.id, name: o.name, fulfillmentStatus: o.fulfillmentStatus }))
    });

    // Also try to get orders from Shopify API directly
    const shopifyApi = await connections.shopify.forShopId(shop.id);
    
    const ordersQuery = `
      query getOrders {
        orders(first: 10, reverse: true) {
          edges {
            node {
              id
              name
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              fulfillmentStatus
              tags
              fulfillments(first: 5) {
                trackingInfo {
                  number
                }
              }
            }
          }
        }
      }
    `;

    const shopifyResult = await shopifyApi.graphql(ordersQuery);
    
    const shopifyOrders = shopifyResult?.data?.orders?.edges?.map((edge: any) => {
      const order = edge.node;
      // Extract numeric ID from GID
      const numericId = order.id.replace('gid://shopify/Order/', '');
      
      // Get tracking number if available
      let trackingNumber = null;
      if (order.fulfillments && order.fulfillments.length > 0) {
        for (const fulfillment of order.fulfillments) {
          if (fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0) {
            trackingNumber = fulfillment.trackingInfo[0].number;
            break;
          }
        }
      }
      
      return {
        shopifyGid: order.id,
        numericId: numericId,
        name: order.name,
        totalPrice: order.totalPriceSet?.shopMoney?.amount || "0",
        fulfillmentStatus: order.fulfillmentStatus,
        tags: order.tags || [],
        trackingNumber: trackingNumber
      };
    }) || [];

    return {
      success: true,
      data: {
        dbOrders: dbOrders,
        shopifyOrders: shopifyOrders,
        message: "Here are the recent orders. Use the 'numericId' field from shopifyOrders for testing the shipping absorption."
      }
    };

  } catch (error: any) {
    logger.error('Error listing orders', { error: error.message });
    return {
      success: false,
      error: error.message
    };
  }
};
