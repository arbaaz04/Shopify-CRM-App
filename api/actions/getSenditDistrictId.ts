/**
 * Looks up a district ID for a city name using the Sendit API
 * 
 * Parameters:
 * - cityName: The name of the city to look up
 */
export const run = async ({
  params,
  api,
  logger
}: {
  params: any;
  api: any;
  logger: {
    info: (message: string, data?: any) => void;
    error: (message: string, error?: any) => void;
  };
}) => {
  // Improved extraction method - log raw inputs first
  logger.info("getSenditDistrictId called with raw params", { 
    params: params,
    keys: Object.keys(params || {}),
    hasParams: !!params,
    paramsType: typeof params
  });
  
  // Extract city name from all possible parameter locations
  const cityName = params?.city || 
                  params?.name ||
                  params?.cityName || 
                  params?.querystring || 
                  (params?.params?.city) || 
                  (params?.params?.name) || 
                  (params?.params?.cityName) || 
                  (params?.params?.querystring);
  
  logger.info("Extracted city name", { cityName });
  
  if (!cityName) {
    return {
      success: false,
      error: "City name is required",
      debug: { rawInput: params }
    };
  }
  
  try {
    // Get shop and config
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      return { success: false, error: "Shop not found" };
    }
    
    const senditConfig = await api.senditConfig.findFirst({
      filter: { shopId: { equals: shop.id } }
    });
    
    if (!senditConfig) {
      return {
        success: false,
        error: "Sendit configuration not found. Please configure Sendit first."
      };
    }
    
    // Authenticate with Sendit API
    logger.info("Authenticating with Sendit API");
    
    const loginResponse = await fetch('https://app.sendit.ma/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        public_key: senditConfig.publicKey,
        secret_key: senditConfig.secretKey
      })
    });
    
    const loginData = await loginResponse.json();
    if (!loginData.success || !loginData.data?.token) {
      logger.error("Authentication failed", loginData);
      return {
        success: false,
        error: "Failed to authenticate with Sendit API: No token received",
        apiResponse: loginData
      };
    }
    
    const token = loginData.data.token;
    
    // Make district lookup request with exact format from documentation
    const cityQuery = encodeURIComponent(cityName);
    const url = `https://app.sendit.ma/api/v1/districts?querystring=${cityQuery}`;
    
    logger.info("Making district lookup request", { url });
    
    const districtResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-TOKEN': ''
      }
    });
    
    const districtData = await districtResponse.json();
    logger.info("District lookup response", districtData);
    
    if (!districtData.success || !districtData.data || districtData.data.length === 0) {
      logger.error(`No districts found for city: ${cityName}`, districtData);
      return {
        success: false,
        error: `No districts found for city: ${cityName}`,
        apiResponse: districtData
      };
    }
    
    // If there's only one result, use it
    if (districtData.data.length === 1) {
      const district = districtData.data[0];
      logger.info(`Found single district ID ${district.id} for city ${cityName}`);
      return {
        success: true,
        districtId: district.id,
        districtName: district.name || district.ville,
        city: cityName,
        allDistricts: districtData.data,
        message: `Found district ID ${district.id} for ${cityName}`
      };
    }
    
    // If there are multiple results, find the closest match
    logger.info(`Found ${districtData.data.length} districts for city ${cityName}, finding best match`);
    
    // Calculate similarity score for each result (lower score is better)
    let bestMatch = districtData.data[0];
    let bestMatchScore = Infinity;
    
    districtData.data.forEach((district: {id: number|string, name?: string, ville?: string}) => {
      const districtName = district.name || district.ville || '';
      // Simple case-insensitive similarity check - exact match gets priority
      if (districtName.toLowerCase() === cityName.toLowerCase()) {
        bestMatch = district;
        bestMatchScore = 0; // Perfect match
        logger.info(`Perfect match found: ${districtName}`);
      } else if (bestMatchScore > 0) {
        // Calculate Levenshtein distance as a similarity metric
        const score = levenshteinDistance(districtName.toLowerCase(), cityName.toLowerCase());
        logger.info(`District "${districtName}" has similarity score ${score}`);
        
        if (score < bestMatchScore) {
          bestMatch = district;
          bestMatchScore = score;
        }
      }
    });
    
    logger.info(`Selected best matching district ID ${bestMatch.id} for "${bestMatch.name || bestMatch.ville}" (requested: "${cityName}")`);
    
    return {
      success: true,
      districtId: bestMatch.id,
      districtName: bestMatch.name || bestMatch.ville,
      city: cityName,
      allDistricts: districtData.data,
      message: `Found district ID ${bestMatch.id} for ${cityName} (best match: ${bestMatch.name || bestMatch.ville})`
    };
  } catch (error) {
    logger.error("Error looking up district ID", error);
    
    let errorMessage = "An error occurred while looking up district ID";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export default run; 

// Helper function to calculate Levenshtein distance between two strings
// This measures how different two strings are (lower is more similar)
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}; 