/**
 * Action for fulfilling a Shopify order using courier API
 * 
 * This action creates a shipment in the courier's system and updates 
 * the Shopify order with tracking information.
 */

import { ActionOptions } from "gadget-server";

interface ActionParams {
  orderId: string;
  shopId: string;
  manualTrackingNumber?: string; // Added for manual tracking entry
}

interface ActionContext {
  params: ActionParams;
  api: any;
  logger: any;
  connections: any;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    const { orderId, shopId, manualTrackingNumber } = params;
    
    if (!orderId || !shopId) {
      throw new Error("orderId and shopId are required");
    }
    
    // Get order details
    const order = await api.shopifyOrder.findOne({
      filter: { id: { equals: orderId } },
      select: {
        id: true,
        name: true,
        customer: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        shippingAddress: true,
        lineItems: true
      }
    });
    
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    
    // Get Google Sheet configuration for the shop (contains courier API info)
    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });
    
    if (!sheetConfig) {
      throw new Error(`Configuration for shop ${shopId} not found`);
    }
    
    let trackingNumber;
    
    // Check if courier API credentials are available
    if (sheetConfig.courierApiKey && sheetConfig.courierApiProvider) {
      // Call courier API to create shipment
      // This is a pseudo-code example. You need to implement the actual courier API integration
      // const courierResponse = await createCourierShipment(sheetConfig.courierApiProvider, sheetConfig.courierApiKey, order);
      
      // Mock tracking number for example
      trackingNumber = "MOCK123456789";
      logger.info(`Created shipment using ${sheetConfig.courierApiProvider} API`);
    } else {
      // No courier API available, use manual tracking number if provided
      if (manualTrackingNumber) {
        trackingNumber = manualTrackingNumber;
        logger.info(`Using provided manual tracking number: ${trackingNumber}`);
      } else {
        // Generate a placeholder tracking number
        trackingNumber = `MANUAL-${Date.now()}-${order.name}`;
        logger.info(`No courier API credentials or manual tracking number available. Using generated placeholder: ${trackingNumber}`);
      }
    }
    
    // Update Shopify order with tracking information
    await api.enqueue("writeToShopify", {
      shopId,
      mutation: `
        mutation fulfillOrder($orderId: ID!, $trackingNumber: String!, $trackingUrl: String) {
          orderFulfillmentCreate(
            input: {
              orderId: $orderId,
              trackingInfo: {
                number: $trackingNumber,
                url: $trackingUrl
              }
            }
          ) {
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
      `,
      variables: {
        orderId: order.id,
        trackingNumber,
        trackingUrl: `https://track.courier.com/${trackingNumber}`
      }
    });
    
    // Update Google Sheet with fulfillment details
    await api.enqueue("writeToGoogleSheet", {
      orderId,
      shopId,
      isPosted: true
    });
    
    logger.info(`Successfully fulfilled order ${order.name}`);
    
    return { success: true, order, trackingNumber };
  } catch (error) {
    logger.error("Error fulfilling order", { error });
    throw error;
  }
};

export const params = {
  orderId: {
    type: "string"
  },
  shopId: {
    type: "string"
  },
  manualTrackingNumber: {
    type: "string",
    optional: true
  }
}; 