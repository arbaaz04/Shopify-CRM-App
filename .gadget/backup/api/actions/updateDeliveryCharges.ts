/**
 * Update Delivery Charges Action
 * Updates or creates delivery charges for a shop
 */

import { ActionOptions } from "gadget-server";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    senditCharge?: number;
    speedafCharge?: number;
    shopId?: string;
  },
  api: any, 
  logger: any
}) => Promise<any>;

// Main action function
export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    logger.info('Updating delivery charges', {
      senditCharge: params.senditCharge,
      speedafCharge: params.speedafCharge,
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

    // Try to find existing delivery charges for this shop
    const existingCharges = await api.deliveryCharges.findFirst({
      filter: { shop: { equals: shopId } }
    });

    let result;
    
    if (existingCharges) {
      // Update existing charges
      const updateData: any = {};
      
      if (params.senditCharge !== undefined) {
        updateData.senditCharge = params.senditCharge;
      }
      
      if (params.speedafCharge !== undefined) {
        updateData.speedafCharge = params.speedafCharge;
      }
      
      result = await api.deliveryCharges.update(existingCharges.id, updateData);
      
      logger.info('Updated existing delivery charges', { 
        recordId: existingCharges.id,
        updateData
      });
      
      return {
        success: true,
        message: "Delivery charges updated successfully",
        charges: result,
        isNew: false
      };
    } else {
      // Create new charges record
      result = await api.deliveryCharges.create({
        senditCharge: params.senditCharge || 0,
        speedafCharge: params.speedafCharge || 0,
        currency: "MAD",
        shop: { _link: shopId }
      });
      
      logger.info('Created new delivery charges record', { 
        recordId: result.id
      });
      
      return {
        success: true,
        message: "Delivery charges created successfully",
        charges: result,
        isNew: true
      };
    }
  } catch (error: unknown) {
    logger.error("Error updating delivery charges", { 
      error: error instanceof Error ? error.message : String(error)
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  senditCharge: {
    type: "number",
    required: false
  },
  speedafCharge: {
    type: "number", 
    required: false
  },
  shopId: {
    type: "string",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
