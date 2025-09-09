/**
 * Get Delivery Charges Action
 * Retrieves current delivery charges for a shop
 */

import { ActionOptions } from "gadget-server";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    shopId?: string;
  },
  api: any, 
  logger: any
}) => Promise<any>;

// Main action function
export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    logger.info('Getting delivery charges', {
      shopId: params.shopId
    });

    // Get the current shop if shopId not provided
    let shopId = params.shopId;
    if (!shopId) {
      const shop = await api.shopifyShop.findFirst();
      if (!shop) {
        throw new Error("Could not find shop");
      }
      shopId = shop.id;
    }

    // Find delivery charges for this shop
    const charges = await api.deliveryCharges.findFirst({
      filter: { shop: { id: { equals: shopId } } }
    });

    if (charges) {
      logger.info('Found existing delivery charges', { 
        recordId: charges.id,
        senditCharge: charges.senditCharge,
        speedafCharge: charges.speedafCharge
      });
      
      return {
        success: true,
        charges: {
          id: charges.id,
          senditCharge: charges.senditCharge || 0,
          speedafCharge: charges.speedafCharge || 0,
          currency: charges.currency || "MAD",
          lastUpdated: charges.lastUpdated
        }
      };
    } else {
      logger.info('No delivery charges found for shop', { shopId });
      
      return {
        success: true,
        charges: {
          senditCharge: 0,
          speedafCharge: 0,
          currency: "MAD"
        }
      };
    }
  } catch (error: unknown) {
    logger.error("Error getting delivery charges", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  shopId: {
    type: "string",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
