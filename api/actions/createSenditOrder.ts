/**
 * Manually creates a Sendit order with provided information
 * 
 * Parameters:
 * - districtId: The district ID for delivery
 * - name: Customer name
 * - phone: Customer phone number
 * - address: Delivery address
 * - amount: Order amount
 * - products: Product description
 * - reference: Order reference (optional)
 * - packageSettings: Optional settings for the package
 */
export const run = async ({
  params,
  api,
  logger
}: {
  params: { 
    districtId: string;
    name: string;
    phone: string;
    address: string;
    amount: string;
    products: string;
    reference?: string;
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
}) => {
  logger.info("Creating manual Sendit order", { 
    params: {
      districtId: params.districtId,
      name: params.name,
      phone: params.phone,
      reference: params.reference
    }
  });

  // Extract the parameters, handling nested params
  const rawDistrictId = params.districtId || (params.params && params.params.districtId);
  const name = params.name || (params.params && params.params.name);
  const phone = params.phone || (params.params && params.params.phone);
  const address = params.address || (params.params && params.params.address);
  const amount = params.amount || (params.params && params.params.amount);
  const products = params.products || (params.params && params.params.products);
  const reference = params.reference || (params.params && params.params.reference) || `Manual-${Date.now()}`;
  const packageSettings = params.packageSettings || (params.params && params.params.packageSettings);
  
  // Validate required parameters
  if (!rawDistrictId) return { success: false, error: "District ID is required" };
  if (!name) return { success: false, error: "Customer name is required" };
  if (!phone) return { success: false, error: "Phone number is required" };
  if (!address) return { success: false, error: "Address is required" };
  if (!amount) return { success: false, error: "Amount is required" };
  if (!products) return { success: false, error: "Products are required" };

  try {
    // First, authenticate with Sendit API
    const authResult = await api.testSenditAuth();
    
    if (!authResult.success || !authResult.token) {
      return {
        success: false,
        error: authResult.error || "Authentication failed",
        authResponse: authResult
      };
    }
    
    const authToken = authResult.token;
    
    // Prepare the request data
    const requestData = {
      pickup_district_id: "52", // Fixed value as specified in docs
      district_id: rawDistrictId,
      name: name,
      amount: amount,
      address: address,
      phone: phone,
      comment: packageSettings?.comment || "",
      reference: reference,
      allow_open: packageSettings?.allow_open ? 1 : 0,
      allow_try: packageSettings?.allow_try ? 1 : 0,
      products_from_stock: packageSettings?.products_from_stock ?? 0,
      products: products,
      packaging_id: packageSettings?.packaging_id ?? 1,
      option_exchange: packageSettings?.option_exchange ?? 0,
      delivery_exchange_id: ""
    };

    // Send request to Sendit API
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
        responseText: errorText
      });
      return {
        success: false,
        error: `Sendit API create delivery failed: ${response.status} ${response.statusText}`
      };
    }
    
    // Process the response
    const senditResponse = await response.json();
    logger.info("Received response from Sendit API", senditResponse);

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

      // Return success with tracking code
      return {
        success: true,
        message: "Order successfully submitted to Sendit",
        trackingCode: trackingCode,
        apiResponse: senditResponse.data
      };
    } else {
      // Handle API error
      logger.error("Sendit API returned an error", senditResponse);
      return {
        success: false,
        error: senditResponse.message || "Failed to create order in Sendit",
        apiResponse: senditResponse,
      };
    }
  } catch (error) {
    logger.error("Error creating Sendit order", error);
    
    let errorMessage = "An error occurred while creating the order";
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