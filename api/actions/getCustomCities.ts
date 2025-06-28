import { ActionOptions } from "gadget-server";

/**
 * Get all custom cities for a shop, optionally filtered by courier type
 */
export const run: ActionOptions = async ({ params, logger, api, connections }) => {
  try {
    const shopId = params?.shopId || connections?.shopify?.currentShopId;
    const courierType = params?.courierType; // Optional filter
    
    if (!shopId) {
      throw new Error("Shop ID is required");
    }

    logger.info("Getting custom cities", { shopId, courierType });

    // Build the filter
    const filter: any = {
      shop: { id: { equals: shopId } },
      isActive: { equals: true }
    };

    // Add courier type filter if specified
    if (courierType) {
      filter.courierType = { equals: courierType };
    }

    // Fetch custom cities
    const customCities = await api.customCity.findMany({
      filter,
      sort: { name: "Ascending" },
      select: {
        id: true,
        name: true,
        courierType: true,
        isActive: true,
        addedAt: true
      }
    });

    logger.info("Retrieved custom cities", { 
      count: customCities.length,
      shopId,
      courierType 
    });

    return {
      success: true,
      cities: customCities,
      count: customCities.length
    };

  } catch (error) {
    logger.error("Error getting custom cities", { error });
    return {
      success: false,
      error: error.message,
      cities: [],
      count: 0
    };
  }
};

export const options = {
  actionType: "custom"
};
