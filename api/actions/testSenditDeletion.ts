import type { ActionOptions } from "gadget-server";

export const run: ActionFunction = async ({ params, logger, api, connections }) => {
  try {
    logger.info("Testing Sendit record deletion", { params });

    const { orderId, shopId, trackingCode } = params;

    if (!orderId && !trackingCode) {
      return {
        success: false,
        error: "Either orderId or trackingCode parameter is required"
      };
    }

    if (!shopId) {
      return {
        success: false,
        error: "shopId parameter is required"
      };
    }

    logger.info("Testing Sendit deletion with params", { orderId, shopId, trackingCode });

    // If we have a trackingCode, test deletion directly
    if (trackingCode) {
      const result = await api.deleteSenditRecord.run({
        orderId: "test",
        shopId,
        directTrackingCode: trackingCode
      });

      return {
        success: true,
        message: "Direct tracking code deletion test completed",
        result
      };
    }

    // If we have an orderId, use the standard flow
    if (orderId) {
      const result = await api.deleteSenditRecord.run({
        orderId: String(orderId).replace(/\D/g, ''),
        shopId
      });

      return {
        success: true,
        message: "Order-based deletion test completed",
        result
      };
    }

    return {
      success: false,
      error: "No valid parameters provided"
    };

  } catch (error) {
    logger.error("Error in testSenditDeletion action", {
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