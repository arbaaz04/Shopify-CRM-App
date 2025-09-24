import type { ActionOptions } from "gadget-server";
import { authenticateSendit } from "../utils/senditAuth";

export const run: ActionFunction = async ({ params, logger, api, connections }) => {
  try {
    logger.info("Starting Sendit record deletion", { orderId: params.orderId, directTrackingCode: params.directTrackingCode });

    const { orderId, shopId, directTrackingCode } = params;

    if (!orderId && !directTrackingCode) {
      return {
        success: false,
        error: "Either orderId or directTrackingCode parameter is required"
      };
    }

    if (!shopId) {
      return {
        success: false,
        error: "shopId parameter is required"
      };
    }

    // Get shop
    const shop = await api.shopifyShop.findFirst({
      filter: { id: { equals: shopId } }
    });

    if (!shop) {
      return {
        success: false,
        error: `Shop with ID ${shopId} not found`
      };
    }

    // Get Sendit configuration
    const senditConfig = await api.senditConfig.findFirst({
      filter: { shop: { id: { equals: shop.id } } }
    });

    if (!senditConfig) {
      return {
        success: false,
        error: "Sendit configuration not found for this shop"
      };
    }

    let trackingNumbers = [];

    // If directTrackingCode is provided, use it directly
    if (directTrackingCode) {
      trackingNumbers = [directTrackingCode];
      logger.info("Using direct tracking code", { directTrackingCode });
    } else {
      // Get order details with tracking numbers
      logger.info("Extracting order details and tracking numbers", { orderId });
      const orderResult = await api.extractOrderSKUs.run({
        orderId: String(orderId).replace(/\D/g, ''),
        shopId: String(shop.id)
      });

      if (!orderResult?.success || !orderResult?.order) {
        return {
          success: false,
          error: `Failed to extract order details: ${orderResult?.error || 'Unknown error'}`
        };
      }

      const order = orderResult.order;

      // Check if fulfillment is cancelled
      if (!order.isFulfillmentCancelled) {
        return {
          success: false,
          error: "Order fulfillment is not cancelled"
        };
      }

      // Get tracking numbers from cancelled fulfillments
      if (order.cancelledFulfillments && Array.isArray(order.cancelledFulfillments)) {
        for (const fulfillment of order.cancelledFulfillments) {
          // Check if tracking company is Sendit
          const trackingCompany = fulfillment.tracking_company || fulfillment.trackingCompany || '';
          if (trackingCompany.toLowerCase() === 'sendit') {
            const trackingNumber = fulfillment.tracking_number || fulfillment.trackingNumber;
            if (trackingNumber) {
              trackingNumbers.push(trackingNumber);
            }
          }
        }
      }

      // Also check order.trackingNumbers if available
      if (order.trackingNumbers && Array.isArray(order.trackingNumbers)) {
        trackingNumbers.push(...order.trackingNumbers);
      }

      // Also check order.trackingNumber (singular)
      if (order.trackingNumber) {
        trackingNumbers.push(order.trackingNumber);
      }

      if (trackingNumbers.length === 0) {
        return {
          success: false,
          error: "No Sendit tracking numbers found for this cancelled order"
        };
      }
    }

    logger.info("Found tracking numbers to delete", { trackingNumbers });

    // Authenticate with Sendit API
    const authResult = await authenticateSendit(
      {
        publicKey: senditConfig.publicKey,
        secretKey: senditConfig.secretKey
      },
      logger
    );

    if (!authResult.success || !authResult.token) {
      return {
        success: false,
        error: `Sendit authentication failed: ${authResult.message}`
      };
    }

    const token = authResult.token;
    const deletedCodes = [];
    const failedDeletions = [];

    // Delete each tracking number from Sendit
    for (const trackingCode of trackingNumbers) {
      try {
        logger.info("Deleting Sendit record", { trackingCode });

        const apiUrl = process.env.SENDIT_API_URL || 'https://app.sendit.ma/api/v1';
        const deleteUrl = `${apiUrl}/deliveries/${encodeURIComponent(trackingCode)}`;

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-CSRF-TOKEN': ''
          }
        });

        const responseData = await response.json();

        if (response.ok && responseData.success) {
          deletedCodes.push(trackingCode);
          logger.info("Successfully deleted Sendit record", { 
            trackingCode, 
            message: responseData.message 
          });
        } else {
          const errorMsg = responseData.message || `HTTP ${response.status}`;
          failedDeletions.push({ code: trackingCode, error: errorMsg });
          logger.warn("Failed to delete Sendit record", { 
            trackingCode, 
            error: errorMsg,
            status: response.status
          });
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        failedDeletions.push({ code: trackingCode, error: errorMsg });
        logger.error("Error deleting Sendit record", { 
          trackingCode, 
          error: errorMsg 
        });
      }
    }

    logger.info("Sendit deletion process completed", {
      deletedCount: deletedCodes.length,
      failedCount: failedDeletions.length,
      deletedCodes,
      failedDeletions
    });

    return {
      success: true,
      deletedCodes,
      failedDeletions,
      totalProcessed: trackingNumbers.length,
      message: `Processed ${trackingNumbers.length} tracking codes. Successfully deleted: ${deletedCodes.length}, Failed: ${failedDeletions.length}`
    };

  } catch (error) {
    logger.error("Error in deleteSenditRecord action", {
      error: error instanceof Error ? error.message : String(error)
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

export const options: ActionOptions = {
  actionType: "custom"
};

interface ActionFunction {
  (context: {
    params: any;
    logger: any;
    api: any;
    connections: any;
  }): Promise<any>;
}