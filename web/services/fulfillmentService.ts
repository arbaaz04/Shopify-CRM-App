import { api } from "../api";
import { getSenditTrackingUrl, getSpeedafTrackingUrl, formatShopifyOrderId } from "../utils";

// Define proper return type interfaces
interface FulfillmentBaseResult {
  success: boolean;
  message?: string;
}

interface FulfillmentSuccessResult extends FulfillmentBaseResult {
  success: true;
  fulfillmentId: string;
  message: string;
  fulfillment?: any;
  background?: undefined;
}

interface FulfillmentErrorResult extends FulfillmentBaseResult {
  success: false;
  error: string;
  background?: undefined;
  fulfillmentId?: undefined;
}

interface FulfillmentBackgroundResult extends FulfillmentBaseResult {
  success: true;
  message: string;
  background: true;
  fulfillmentId?: undefined;
}

type FulfillmentResult = FulfillmentSuccessResult | FulfillmentErrorResult | FulfillmentBackgroundResult;

/**
 * Creates a fulfillment for a Shopify order using GraphQL
 * @param {Object} params - Fulfillment parameters
 * @param {string} params.shopId - The Shopify shop ID
 * @param {string} params.orderId - The Shopify order ID (numeric or with #)
 * @param {string} params.trackingNumber - The tracking number
 * @param {string} params.trackingCompany - The tracking company name
 * @param {boolean} params.notifyCustomer - Whether to notify the customer
 * @returns {Promise<FulfillmentResult>} The fulfillment result
 */
export const createOrderFulfillment = async ({
  shopId,
  orderId,
  trackingNumber,
  trackingCompany,
  notifyCustomer = false
}: {
  shopId: string;
  orderId: string;
  trackingNumber: string;
  trackingCompany: string;
  notifyCustomer?: boolean;
}): Promise<FulfillmentResult> => {
  try {
    // Clean order ID
    const cleanOrderId = formatShopifyOrderId(orderId);
    
    // Get fulfillment order ID using our newer function
    const fulfillmentOrderResponse = await getShopifyFulfillmentOrderId(cleanOrderId);
    
    if (!fulfillmentOrderResponse.success || !fulfillmentOrderResponse.fulfillmentOrderId) {
      throw new Error(fulfillmentOrderResponse.error || `Failed to get fulfillment order ID for order ${cleanOrderId}`);
    }
    
    // Get the raw numeric fulfillment order ID
    const fulfillmentOrderId = fulfillmentOrderResponse.fulfillmentOrderId;
    console.log(`Using fulfillment order ID: ${fulfillmentOrderId} for order ${cleanOrderId}`);
    
    // Format the fulfillment order ID as a Shopify global ID
    const formattedFulfillmentOrderId = `gid://shopify/FulfillmentOrder/${fulfillmentOrderId}`;
    console.log(`Formatted fulfillment order ID: ${formattedFulfillmentOrderId}`);
    
    // Create tracking URL based on carrier
    const trackingUrl = trackingCompany === "Sendit" ? 
      getSenditTrackingUrl(trackingNumber) : 
      trackingCompany === "Speedaf" ?
      getSpeedafTrackingUrl(trackingNumber) :
      "";
    
    // Properly formatted GraphQL mutation for creating a fulfillment
    const fulfillmentMutation = `
      mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
        fulfillmentCreateV2(fulfillment: $fulfillment) {
          fulfillment {
            id
            trackingInfo {
              number
              company
              url
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Prepare input variables for the mutation
    const variables = {
      fulfillment: {
        lineItemsByFulfillmentOrder: [
          {
            fulfillmentOrderId: formattedFulfillmentOrderId  // Use the formatted global ID
          }
        ],
        notifyCustomer: notifyCustomer,
        trackingInfo: {
          company: trackingCompany,
          number: trackingNumber,
          url: trackingUrl
        }
      }
    };

    console.log(`Creating fulfillment with variables:`, JSON.stringify(variables, null, 2));

    // Execute the GraphQL mutation
    const result = await api.writeToShopify({
      shopId: shopId,
      mutation: fulfillmentMutation,
      variables: variables
    });

    console.log(`Fulfillment creation result:`, result);

    // Check for GraphQL errors
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    // Check for user errors in the response
    if (result.data?.fulfillmentCreateV2?.userErrors?.length > 0) {
      const errors = result.data.fulfillmentCreateV2.userErrors;
      throw new Error(`Shopify fulfillment creation failed: ${errors.map((e: { message: string }) => e.message).join(', ')}`);
    }

    // Get the fulfillment ID - but don't throw an error if it's not found
    const fulfillmentId = result.data?.fulfillmentCreateV2?.fulfillment?.id || 'unknown';
    
    // If no ID was returned but there were no errors, still treat as success
    if (!result.data?.fulfillmentCreateV2?.fulfillment?.id) {
      console.log("Warning: Fulfillment was likely created but no ID was returned. Treating as success.");
    }

    // Return success result
    return {
      success: true,
      message: `Successfully created fulfillment for order #${cleanOrderId}`,
      fulfillmentId: fulfillmentId,
      fulfillment: result.data?.fulfillmentCreateV2?.fulfillment
    } as FulfillmentSuccessResult;
  } catch (error) {
    console.error("Error creating Shopify fulfillment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    } as FulfillmentErrorResult;
  }
};

/**
 * Retrieves the fulfillment order ID for a given Shopify order
 * @param orderNumber - The order number to look up
 * @returns Promise with fulfillment order ID and status
 */
export const getShopifyFulfillmentOrderId = async (orderNumber: string) => {
  try {
    // Ensure order ID is string and contains only digits
    const orderId = String(orderNumber).replace(/\D/g, '');
    
    if (!orderId) {
      throw new Error("Invalid order number format");
    }
    
    // Get shop to get shop ID
    const shop = await api.shopifyShop.findFirst();
    if (!shop) {
      throw new Error("Shop not found");
    }
    
    // GraphQL query to get fulfillment orders
    const graphqlQuery = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          name
          fulfillmentOrders(first: 5) {
            edges {
              node {
                id
                status
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      id: `gid://shopify/Order/${orderId}`
    };
    
    // Execute the GraphQL query
    const result = await api.writeToShopify({
      shopId: shop.id,
      mutation: graphqlQuery,
      variables: variables
    });
    
    // Handle different possible response formats
    const orderData = 
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure
    
    if (!orderData) {
      // Check for errors
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
      }
      
      throw new Error(`Order #${orderId} not found`);
    }
    
    // Transform fulfillment orders to a simpler format
    let fulfillmentOrders = [];
    if (orderData?.fulfillmentOrders?.edges && Array.isArray(orderData.fulfillmentOrders.edges)) {
      fulfillmentOrders = orderData.fulfillmentOrders.edges.map((edge: any) => {
        const node = edge?.node || {};
        return {
          id: node.id || '',
          status: node.status || 'UNKNOWN'
        };
      });
    }
    
    // Check if no fulfillment orders were found
    if (fulfillmentOrders.length === 0) {
      return { 
        success: false, 
        error: `No fulfillment orders found for Shopify order #${orderId}` 
      };
    }
    
    // Prefer OPEN status fulfillment orders if available
    const openFulfillmentOrders = fulfillmentOrders.filter((fo: any) => fo.status === "OPEN");
    
    // Select the appropriate fulfillment order
    let selectedFulfillmentOrder;
    if (openFulfillmentOrders.length > 0) {
      selectedFulfillmentOrder = openFulfillmentOrders[0];
    } else {
      selectedFulfillmentOrder = fulfillmentOrders[0];
    }
    
    // Extract the numeric ID from the GID format
    const rawId = selectedFulfillmentOrder.id;
    const fulfillmentOrderId = rawId.split('/').pop() || rawId;
    
    // Return just the essential information
    return {
      success: true,
      fulfillmentOrderId: fulfillmentOrderId,
      status: selectedFulfillmentOrder.status
    };
  } catch (error) {
    // Simplified error handling
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
