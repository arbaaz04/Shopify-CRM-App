export const run = async ({ params, connections, logger }) => {
  const { orderId, shopId } = params;
  
  const shopifyApi = await connections.shopify.forShopId(shopId);
  
  const query = `
    query GetOrderFulfillmentLocations($id: ID!) {
      order(id: $id) {
        fulfillments(first: 5) {
          id
          location {
            id
            name
          }
        }
      }
    }
  `;
  
  const result = await shopifyApi.graphql(query, {
    id: `gid://shopify/Order/${orderId}`
  });
  
  // Extract the location ID from the response
  const fulfillments = result?.order?.fulfillments;
  if (fulfillments && fulfillments.length > 0) {
    const firstFulfillment = fulfillments[0];
    if (firstFulfillment?.location?.id) {
      const locationGid = firstFulfillment.location.id;
      logger.info('Found location GID', { locationGid });
      return locationGid; // Returns the full GID format
    }
  }

  logger.info('No location found');
  return null;
};

export const params = {
  orderId: { type: "string", required: true },
  shopId: { type: "string", required: true }
};