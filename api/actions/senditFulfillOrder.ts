/**
 * Fulfills an order using the Sendit API
 *
 * Parameters:
 * - orderId: The Shopify order ID to fulfill
 * - packageSettings: Optional settings for the package
 */
export const run = async ({
  params,
  api,
  logger,
  connections
}: {
  params: { 
    orderId: string;
    packageSettings?: {
      comment?: string;
      allow_open?: boolean;
      allow_try?: boolean;
      products_from_stock?: number;
      packaging_id?: number;
      option_exchange?: number;
    };
    [key: string]: any;
  };
  api: any;
  logger: { 
    info: (message: string, data?: any) => void;
    error: (message: string, error?: any) => void;
  }; 
  connections: any 
}) => {
  // STEP 1: Extract and validate input parameters
  logger.info("Starting Sendit order fulfillment process", { rawParams: params });
  
  // Handle nested or direct params - sometimes frameworks wrap params in another params object
  const rawOrderId = params.orderId || (params.params && params.params.orderId);
  const packageSettings = params.packageSettings || (params.params && params.params.packageSettings);
  
  // Ensure orderId is a string and remove any non-numeric characters if needed
  const orderId = rawOrderId ? String(rawOrderId).trim() : '';
  
  logger.info("Extracted parameters", { 
    rawOrderId,
    processedOrderId: orderId,
    hasPackageSettings: !!packageSettings
  });
  
  if (!orderId) {
    logger.error("Order ID is missing or invalid", { receivedValue: rawOrderId });
    return {
      success: false,
      error: "Order ID is required",
    };
  }

  try {
    // STEP 2: Get all required data upfront
    logger.info(`Gathering data for order ${orderId}`);
    
    // 2.1: Get shop data
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      logger.error("Shop not found");
      return { success: false, error: "Shop not found" };
    }
    
    // 2.2: Get Sendit configuration
    const senditConfig = await api.senditConfig.findFirst({
      filter: { shopId: { equals: shop.id } },
    });

    if (!senditConfig) {
      logger.error("Sendit configuration not found");
      return { 
        success: false, 
        error: "Sendit configuration not found. Please configure Sendit first." 
      };
    }
    
    // 2.3: Get order details using extractOrderSKUs
    logger.info(`Fetching order details for order ${orderId}`);
    const orderExtractResult = await api.extractOrderSKUs({
      orderId: orderId,
      shopId: shop.id
    });

    if (!orderExtractResult?.success || !orderExtractResult?.order) {
      logger.error("Failed to extract order details", orderExtractResult);
      return {
        success: false,
        error: orderExtractResult?.error || "Failed to extract order details",
      };
    }

    const orderData = orderExtractResult.order;
    
    // 2.4: Validate shipping address
    if (!orderData.shippingAddress) {
      logger.error("Shipping address not found in order");
      return {
        success: false,
        error: "Shipping address not found in order",
      };
    }

    // STEP 3: Authenticate with Sendit API
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
    
    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      logger.error("Sendit API login request failed", { 
        status: loginResponse.status, 
        statusText: loginResponse.statusText,
        responseText: errorText
      });
      return {
        success: false,
        error: `Sendit API authentication failed: ${loginResponse.status} ${loginResponse.statusText}`
      };
    }
    
    const loginData = await loginResponse.json();
    
    if (!loginData.success || !loginData.data?.token) {
      logger.error("Sendit API login response did not contain a token", loginData);
      return {
        success: false,
        error: "Failed to authenticate with Sendit API: No token received",
        apiResponse: loginData
      };
    }
    
    const authToken = loginData.data.token;
    logger.info("Successfully authenticated with Sendit API");
    
    // STEP 4: Get district ID for delivery city
    const cityName = orderData.city || orderData.shippingAddress.city;
    if (!cityName) {
      logger.error("City name not found in shipping address", orderData);
      return {
        success: false,
        error: "City name not found in shipping address",
      };
    }
    
    logger.info(`Searching for district ID for city: ${cityName}`);
    
    const districtResponse = await fetch(`https://app.sendit.ma/api/v1/districts?querystring=${encodeURIComponent(cityName)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-CSRF-TOKEN': ''
      }
    });
    
    if (!districtResponse.ok) {
      const errorText = await districtResponse.text();
      logger.error("Sendit API district search request failed", { 
        status: districtResponse.status, 
        statusText: districtResponse.statusText,
        responseText: errorText
      });
      return {
        success: false,
        error: `Sendit API district search failed: ${districtResponse.status} ${districtResponse.statusText}`
      };
    }
    
    const districtData = await districtResponse.json();
    
    if (!districtData.success || !districtData.data || districtData.data.length === 0) {
      logger.error(`No districts found for city: ${cityName}`, districtData);
      return {
        success: false,
        error: `No districts found for city: ${cityName}`,
        apiResponse: districtData
      };
    }
    
    // Find best matching district ID
    let districtId;
    
    // If there's only one result, use it
    if (districtData.data.length === 1) {
      districtId = districtData.data[0].id;
      logger.info(`Found single district ID ${districtId} for city ${cityName}`);
    } else {
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
      
      districtId = bestMatch.id;
      logger.info(`Selected best matching district ID ${districtId} for "${bestMatch.name || bestMatch.ville}" (requested: "${cityName}")`);
    }

    // STEP 5: Prepare order data for Sendit API
    // Format the address
    const address = orderData.address || formatAddress(orderData.shippingAddress);

    // Format products - join SKUs into a comma-separated string
    const productsText = orderData.skus ? orderData.skus.join(", ") : 
                         (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");

    // Customer name
    const customerName = orderData.customerName || 
                        `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim();
    
    // Phone number
    const phoneNumber = orderData.phone || orderData.shippingAddress.phone || "";
    
    // Order reference/ID
    const orderReference = orderData.name || orderData.id?.toString() || "";
    
    // Log all extracted values for debugging
    logger.info("Extracted order data for Sendit", {
      rawOrderData: {
        address: orderData.address,
        shippingAddress: orderData.shippingAddress,
        skus: orderData.skus,
        orderSkus: orderData.orderSkus,
        customerName: orderData.customerName,
        phone: orderData.phone,
        name: orderData.name,
        id: orderData.id,
        totalPrice: orderData.totalPrice
      },
      processedData: {
        address,
        productsText,
        customerName,
        phoneNumber,
        orderReference,
        districtId
      }
    });
    
    // STEP 6: Create Sendit order request payload
    const requestData = {
      pickup_district_id: "52", // Fixed value as specified in docs
      district_id: String(districtId), // Ensure it's a string
      name: customerName,
      amount: String(orderData.totalPrice || "0"), // Ensure it's a string
      address: address,
      phone: phoneNumber,
      comment: packageSettings?.comment || "",
      reference: orderReference,
      allow_open: packageSettings?.allow_open ? 1 : 0,
      allow_try: packageSettings?.allow_try ? 1 : 0,
      products_from_stock: packageSettings?.products_from_stock ?? 0,
      products: productsText,
      packaging_id: packageSettings?.packaging_id ?? 1,
      option_exchange: packageSettings?.option_exchange ?? 0,
      delivery_exchange_id: ""
    };

    // STEP 6.5: Validate all required fields before sending
    logger.info("Validating request data before sending to Sendit API");
    
    const validationErrors = [];
    
    // Required fields validation
    if (!requestData.district_id) validationErrors.push("district_id is missing");
    if (!requestData.name || requestData.name.trim() === '') validationErrors.push("name is empty");
    if (!requestData.phone || requestData.phone.trim() === '') validationErrors.push("phone is empty");
    if (!requestData.address || requestData.address.trim() === '') validationErrors.push("address is empty");
    if (!requestData.reference || requestData.reference.trim() === '') validationErrors.push("reference is empty");
    if (!requestData.products || requestData.products.trim() === '') validationErrors.push("products is empty");
    
    // Phone number format validation for Morocco
    if (requestData.phone) {
      const phoneDigits = requestData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 9) {
        validationErrors.push(`phone number too short: ${requestData.phone} (${phoneDigits.length} digits)`);
      } else if (phoneDigits.length > 13) {
        validationErrors.push(`phone number too long: ${requestData.phone} (${phoneDigits.length} digits)`);
      }
      // Check if it's a valid Moroccan format
      if (!phoneDigits.startsWith('0') && !phoneDigits.startsWith('212') && !phoneDigits.startsWith('+212')) {
        logger.info("Phone number may not be in Moroccan format", { phone: requestData.phone, digits: phoneDigits });
      }
    }
    
    // Type validation
    if (typeof requestData.district_id !== 'string' && typeof requestData.district_id !== 'number') {
      validationErrors.push(`district_id must be string or number, got ${typeof requestData.district_id}`);
    }
    if (isNaN(Number(requestData.amount))) validationErrors.push(`amount must be numeric, got ${requestData.amount}`);
    
    logger.info("Detailed field analysis", {
      orderData: {
        id: orderData.id,
        name: orderData.name,
        totalPrice: orderData.totalPrice,
        skus: orderData.skus,
        orderSkus: orderData.orderSkus,
        city: orderData.city,
        customerName: orderData.customerName,
        phone: orderData.phone,
        address: orderData.address,
        shippingAddress: orderData.shippingAddress
      },
      requestData,
      validationErrors
    });
    
    if (validationErrors.length > 0) {
      logger.error("Request data validation failed", { validationErrors, requestData });
      return {
        success: false,
        error: `Request data validation failed: ${validationErrors.join(', ')}`,
        validationErrors
      };
    }

    // STEP 7: Send request to Sendit API
    logger.info("Sending order to Sendit API", { requestData });

    const SENDIT_API_URL = "https://app.sendit.ma/api/v1/deliveries";

    const response = await fetch(SENDIT_API_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${authToken}`,
        "X-CSRF-TOKEN": ""
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("Sendit API create delivery request failed", { 
        status: response.status, 
        statusText: response.statusText,
        responseText: errorText,
        requestPayload: requestData,
        headers: response.headers
      });
      
      // Try to parse the error response for more details
      let errorDetails = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorDetails = errorJson;
        logger.error("Parsed error response from Sendit API", errorJson);
      } catch (parseError) {
        logger.info("Error response is not JSON, keeping as text", { errorText });
      }
      
      return {
        success: false,
        error: `Sendit API create delivery failed: ${response.status} ${response.statusText}`,
        requestData,
        errorDetails
      };
    }
    
    // STEP 8: Process the response
    const senditResponse = await response.json();
    logger.info("Received response from Sendit API", { 
      fullResponse: senditResponse,
      success: senditResponse.success,
      hasData: !!senditResponse.data,
      message: senditResponse.message,
      errors: senditResponse.errors
    });

    if (senditResponse.success && senditResponse.data) {
      // Extract tracking code from the response
      const trackingCode = senditResponse.data?.code;
      
      if (!trackingCode) {
        logger.error("Tracking code not found in Sendit response", senditResponse);
        return {
          success: false,
          error: "Tracking code not found in Sendit response",
        };
      }
      
      logger.info(`Order successfully submitted to Sendit. Tracking code: ${trackingCode}`);

      // Return success with just the tracking code
      return {
        success: true,
        message: "Order successfully submitted to Sendit",
        trackingCode: trackingCode
      };
    } else {
      // Handle API error - log all details for debugging
      logger.error("Sendit API returned an error", { 
        fullResponse: senditResponse,
        requestData,
        errorMessage: senditResponse.message,
        errors: senditResponse.errors,
        data: senditResponse.data
      });
      
      // Extract more specific error information
      let errorMessage = "Failed to create order in Sendit";
      if (senditResponse.message) {
        errorMessage = senditResponse.message;
      }
      if (senditResponse.errors && Array.isArray(senditResponse.errors)) {
        errorMessage += ` - Errors: ${senditResponse.errors.join(', ')}`;
      } else if (senditResponse.errors && typeof senditResponse.errors === 'object') {
        const errorKeys = Object.keys(senditResponse.errors);
        if (errorKeys.length > 0) {
          const errorDetails = errorKeys.map(key => `${key}: ${senditResponse.errors[key]}`).join(', ');
          errorMessage += ` - Field errors: ${errorDetails}`;
        }
      }
      
      return {
        success: false,
        error: errorMessage,
        apiResponse: senditResponse,
        requestData
      };
    }
  } catch (error) {
    logger.error("Error fulfilling order with Sendit", error);
    
    // Format error message
    let errorMessage = "An error occurred while fulfilling the order";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Format address if needed
 */
function formatAddress(address: {
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  name?: string;
  company?: string;
  phone?: string;
}) {
  if (!address) return "";
  
  return [
    address.address1,
    address.address2,
    address.city,
    address.province,
    address.zip,
    address.country,
    address.name,
    address.company,
    address.phone,
  ]
    .filter(Boolean)
    .join(", ");
}

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

export default run; 