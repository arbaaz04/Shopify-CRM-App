import { ActionOptions } from "gadget-server";

// Default Sendit cities (from the frontend)
const DEFAULT_SENDIT_CITIES = [
  "SEMARA, essemara, MAA04356, MAC00099",
  "RAHMA, Nouaceur, MAA04355, MAC00059",
  "ROCHE NOIR, casablanca, MAA04354, MAC00070",
  "Rue Choukri Mostapha Pitchou, casablanca, MAA04353, MAC00070",
  "Benslimane, temara, MAA04352, MAC00092",
  "Rue Al Bassatine, casablanca, MAA04351, MAC00070",
  "Hay Raha, casablanca, MAA04350, MAC00070",
  "Roudani, casablanca, MAA04349, MAC00070",
  "rue avesnes angle rue albert, casablanca, MAA04348, MAC00070",
  "Siege royal air maroc, casablanca, MAA04347, MAC00070",
  "Rue al mansour al abidi, casablanca, MAA04346, MAC00070",
  "Rue Zineb Ishak, casablanca, MAA04345, MAC00070",
  "allée des Perses, casablanca, MAA04344, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04343, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04342, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04341, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04340, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04339, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04338, MAC00070",
  "Rue Abou Bakr Seddik, casablanca, MAA04337, MAC00070"
];

/**
 * Get combined city list (default cities + custom cities) for a specific courier type
 */
export const run: ActionOptions = async ({ params, logger, api, connections }) => {
  try {
    const shopId = params?.shopId || connections?.shopify?.currentShopId;
    const courierType = params?.courierType || "sendit";
    
    if (!shopId) {
      throw new Error("Shop ID is required");
    }

    logger.info("Getting combined city list", { shopId, courierType });

    // Get custom cities for this shop and courier type
    const customCities = await api.customCity.findMany({
      filter: {
        shop: { id: { equals: shopId } },
        courierType: { equals: courierType },
        isActive: { equals: true }
      },
      sort: { name: "Ascending" },
      select: {
        id: true,
        name: true,
        courierType: true
      }
    });

    // Get default cities based on courier type
    let defaultCities: string[] = [];
    if (courierType === "sendit") {
      defaultCities = DEFAULT_SENDIT_CITIES;
    }
    // Add other courier types as needed

    // Combine custom city names with default cities
    const customCityNames = customCities.map(city => city.name);
    const combinedCities = [...defaultCities, ...customCityNames];

    // Remove duplicates and sort
    const uniqueCities = Array.from(new Set(combinedCities)).sort();

    logger.info("Combined city list created", { 
      defaultCount: defaultCities.length,
      customCount: customCityNames.length,
      totalCount: uniqueCities.length,
      courierType 
    });

    return {
      success: true,
      cities: uniqueCities,
      defaultCities: defaultCities,
      customCities: customCityNames,
      courierType: courierType,
      totalCount: uniqueCities.length
    };

  } catch (error) {
    logger.error("Error getting combined city list", { error });
    return {
      success: false,
      error: error.message,
      cities: [],
      defaultCities: [],
      customCities: [],
      totalCount: 0
    };
  }
};

export const options = {
  actionType: "custom"
};
