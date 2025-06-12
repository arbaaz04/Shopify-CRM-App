import { applyParams, save, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record, { shopBelongsToField: "shop" });
  await save(record);
};

export const onSuccess: ActionOnSuccess = async ({ params, record, logger, api, connections }) => {
  try {
    logger.info("Fulfillment created successfully", {
      fulfillmentId: record.id,
      orderId: record.orderId
    });

    // Check if this fulfillment has an associated order
    if (!record.orderId) {
      logger.info("No order ID associated with this fulfillment, skipping writeOrder check");
      return;
    }

    // Wait 1 second for tracking number to be populated
    logger.info("Waiting 1 second for tracking number to be populated...", {
      fulfillmentId: record.id,
      orderId: record.orderId
    });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get tracking number using the same approach as extractOrderSKUs
    // Fetch order data via GraphQL to get fulfillments with tracking info
    const numericOrderId = String(record.orderId).replace(/\D/g, '');
    let trackingNumber = '';

    try {
      const orderData = await connections.shopify.current.graphql(`
        query getOrder($id: ID!) {
          order(id: $id) {
            id
            name
            fulfillments {
              trackingInfo {
                number
                company
              }
            }
          }
        }
      `, {
        id: `gid://shopify/Order/${numericOrderId}`
      });

      if (!orderData?.order) {
        logger.warn("Could not fetch order data via GraphQL", {
          fulfillmentId: record.id,
          orderId: record.orderId,
          numericOrderId: numericOrderId
        });
        return;
      }

      // Extract tracking number using the same logic as extractOrderSKUs
      if (orderData.order.fulfillments && orderData.order.fulfillments.length > 0) {
        const trackingInfo = orderData.order.fulfillments[0]?.trackingInfo;
        trackingNumber = trackingInfo && trackingInfo.length > 0
          ? trackingInfo[0].number
          : '';
      }

      logger.info("Extracted tracking number from GraphQL", {
        fulfillmentId: record.id,
        orderId: record.orderId,
        trackingNumber: trackingNumber,
        fulfillmentsCount: orderData.order.fulfillments?.length || 0
      });

    } catch (graphqlError) {
      logger.error("Error fetching order data via GraphQL", {
        error: graphqlError,
        fulfillmentId: record.id,
        orderId: record.orderId,
        numericOrderId: numericOrderId
      });
      return;
    }

    if (!trackingNumber) {
      logger.info("No tracking number found for fulfillment after GraphQL fetch, skipping writeOrder check", {
        fulfillmentId: record.id,
        orderId: record.orderId
      });
      return;
    }

    logger.info("Checking tracking number for writeOrder update", {
      fulfillmentId: record.id,
      orderId: record.orderId,
      trackingNumber: trackingNumber
    });

    // Check if tracking number does NOT start with "MA" or "DH" (case sensitive)
    const startsWithMA = trackingNumber.startsWith("MA");
    const startsWithDH = trackingNumber.startsWith("DH");

    if (!startsWithMA && !startsWithDH) {
      logger.info("Tracking number does not start with MA or DH, updating writeOrder to true", {
        fulfillmentId: record.id,
        orderId: record.orderId,
        trackingNumber: trackingNumber,
        startsWithMA: startsWithMA,
        startsWithDH: startsWithDH
      });

      try {
        // Extract numeric order ID for the update
        const numericOrderId = String(record.orderId).replace(/\D/g, '');

        // Update the order's writeOrder field to true
        await api.shopifyOrder.update(numericOrderId, {
          writeOrder: true
        });

        logger.info("Successfully updated writeOrder to true for order", {
          orderId: record.orderId,
          numericOrderId: numericOrderId,
          trackingNumber: trackingNumber
        });

      } catch (updateError) {
        logger.error("Failed to update writeOrder field for order", {
          error: updateError,
          errorMessage: updateError instanceof Error ? updateError.message : String(updateError),
          orderId: record.orderId,
          trackingNumber: trackingNumber
        });
        // Don't throw the error to avoid breaking the fulfillment creation
      }

    } else {
      logger.info("Tracking number starts with MA or DH, skipping writeOrder update", {
        fulfillmentId: record.id,
        orderId: record.orderId,
        trackingNumber: trackingNumber,
        startsWithMA: startsWithMA,
        startsWithDH: startsWithDH
      });
    }

  } catch (error) {
    logger.error("Error in fulfillment onSuccess writeOrder logic", {
      error: error,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      fulfillmentId: record.id,
      orderId: record.orderId
    });
    // Don't throw the error to avoid breaking the fulfillment creation
  }
};

export const options: ActionOptions = { actionType: "create" };