/**
 * Fulfill Order with Sendit Action
 * Creates a shipment in Sendit and fulfills the order in Shopify
 */

import { ActionOptions } from "gadget-server";
import { createSenditClient, SenditShipmentRequest } from "../utils/senditApi";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    orderIds: string[]; // Can be single or multiple order IDs
    shopId: string 
  },
  api: any, 
  logger: any, 
  connections: any 
}) => Promise<any>;

/**
 * Calculate package weight from line items
 * This is a simple estimation, adjust as needed based on your products
 */
function calculatePackageWeight(lineItems: any[]): number {
  // Default minimum weight in kg
  const DEFAULT_MIN_WEIGHT = 0.5;
  
  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return DEFAULT_MIN_WEIGHT;
  }
  
  // Sum up weights or use default per item weight
  const totalWeight = lineItems.reduce((sum, item) => {
    // Parse weight from variant if available, otherwise use default
    const itemWeight = item.variant?.weight || 0.1; // Default 100g per item if not specified
    const quantity = Number(item.quantity) || 1;
    return sum + (itemWeight * quantity);
  }, 0);
  
  // Ensure minimum weight
  return Math.max(totalWeight, DEFAULT_MIN_WEIGHT);
}

/**
 * Format order data for Sendit API
 */
function formatOrderForSendit(order: any): SenditShipmentRequest {
  // Extract shipping address
  const shippingAddress = order.shippingAddress || {};
  
  // Build recipient name from shipping address
  const recipientName = [
    shippingAddress.firstName,
    shippingAddress.lastName
  ].filter(Boolean).join(' ') || order.customerName || 'Unknown Recipient';
  
  // Format complete address
  const addressParts = [
    shippingAddress.address1,
    shippingAddress.address2
  ].filter(Boolean);
  
  return {
    recipient: {
      name: recipientName,
      phone: order.phone || '', // Using the standardized phone from our extractor
      address: addressParts.join(', '),
      city: order.city || shippingAddress.city || '', // Using our standardized city
      postal_code: shippingAddress.zip || ''
    },
    package: {
      weight: calculatePackageWeight(order.lineItems),
      description: `Order ${order.name} - ${order.lineItems?.length || 0} items`,
      value: parseFloat(order.totalPrice) || 0
    },
    reference_id: order.id
  };
}

/**
 * Create a fulfillment in Shopify with tracking information
 */
async function createShopifyFulfillment(
  orderId: string, 
  trackingInfo: { 
    number: string, 
    company: string,
    url?: string
  },
  connections: any,
  logger: any
): Promise<any> {
  try {
    const graphqlQuery = `
      mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
        fulfillmentCreateV2(fulfillment: $fulfillment) {
          fulfillment {
            id
            trackingInfo {
              number
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
    
    // Construct the variables for the GraphQL mutation
    const variables = {
      fulfillment: {
        lineItemsByFulfillmentOrder: {
          fulfillmentOrderId: `gid://shopify/Order/${orderId}`,
          fulfillmentLineItems: []  // Empty array means fulfill all items
        },
        trackingInfo: {
          number: trackingInfo.number,
          company: trackingInfo.company,
          url: trackingInfo.url
        },
        notifyCustomer: true
      }
    };
    
    logger.info('Creating Shopify fulfillment', { orderId, trackingInfo });
    
    const result = await connections.shopify.current.graphql(graphqlQuery, variables);
    
    // Check for errors
    if (result.data?.fulfillmentCreateV2?.userErrors?.length > 0) {
      const errors = result.data.fulfillmentCreateV2.userErrors;
      logger.error('Error creating Shopify fulfillment', { errors });
      throw new Error(`Failed to create fulfillment: ${errors[0].message}`);
    }
    
    return result.data?.fulfillmentCreateV2?.fulfillment;
  } catch (error) {
    logger.error('Error creating Shopify fulfillment', { 
      error: error instanceof Error ? error.message : String(error),
      orderId 
    });
    throw error;
  }
}

// Main action function
export const run: ActionRun = async ({ params, api, logger, connections }) => {
  try {
    // Validate parameters
    if (!params.orderIds || params.orderIds.length === 0) {
      throw new Error("At least one order ID is required");
    }
    
    if (!params.shopId) {
      throw new Error("Shop ID is required");
    }
    
    logger.info(`Fulfilling ${params.orderIds.length} orders with Sendit`);
    
    // Initialize Sendit client
    const senditClient = createSenditClient(logger);
    
    // Process each order
    const results = await Promise.all(
      params.orderIds.map(async (orderId) => {
        try {
          logger.info(`Processing order ${orderId}`);
          
          // 1. Extract full order details using our existing action
          const orderResponse = await api.extractOrderSKUs({
            orderId: String(orderId).replace(/\D/g, ''),
            shopId: params.shopId
          });
          
          if (!orderResponse.success || !orderResponse.order) {
            throw new Error(`Failed to extract order data: ${orderResponse.error || 'Unknown error'}`);
          }
          
          const order = orderResponse.order;
          
          // 2. Format order data for Sendit
          const shipmentData = formatOrderForSendit(order);
          
          // 3. Create shipment in Sendit
          const shipmentResponse = await senditClient.createShipment(shipmentData);
          
          if (!shipmentResponse.success || !shipmentResponse.tracking_number) {
            throw new Error(`Failed to create Sendit shipment: ${
              shipmentResponse.message || shipmentResponse.errors?.join(', ') || 'Unknown error'
            }`);
          }
          
          // 4. Create fulfillment in Shopify with tracking information
          const fulfillment = await createShopifyFulfillment(
            orderId,
            {
              number: shipmentResponse.tracking_number,
              company: 'Sendit',
              url: `https://app.sendit.ma/tracking/${shipmentResponse.tracking_number}`
            },
            connections,
            logger
          );
          
          // 5. Return success result
          return {
            orderId,
            success: true,
            trackingNumber: shipmentResponse.tracking_number,
            shipmentId: shipmentResponse.shipment_id,
            fulfillmentId: fulfillment?.id,
            message: `Order ${order.name} fulfilled with Sendit tracking ${shipmentResponse.tracking_number}`
          };
        } catch (error) {
          // Return error for this specific order but continue processing others
          logger.error(`Error fulfilling order ${orderId}`, {
            error: error instanceof Error ? error.message : String(error)
          });
          
          return {
            orderId,
            success: false,
            error: error instanceof Error ? error.message : String(error)
          };
        }
      })
    );
    
    // Count successes and failures
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    return {
      success: failed === 0,
      message: `${successful} orders fulfilled successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      results
    };
  } catch (error) {
    // Central error handling
    logger.error("Error fulfilling orders with Sendit", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  orderIds: {
    type: "array",
    required: true,
    items: {
      type: "string"
    }
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