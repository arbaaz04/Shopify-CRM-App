import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "deliveryCharges" model, go to https://bambe-crm-app.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DeliveryChargesKey",
  comment:
    "The Delivery Charges model stores default delivery charges for different courier services per shop.",
  fields: {
    currency: {
      type: "string",
      default: "MAD",
      storageKey: "DeliveryChargeCurrency",
    },
    lastUpdated: {
      type: "dateTime",
      includeTime: true,
      storageKey: "DeliveryChargesLastUpdated",
    },
    senditCharge: {
      type: "number",
      validations: { numberRange: { min: 0, max: null } },
      storageKey: "SenditDeliveryCharge",
    },
    shop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "DeliveryChargesShopRef",
    },
    speedafCharge: {
      type: "number",
      validations: { numberRange: { min: 0, max: null } },
      storageKey: "SpeedafDeliveryCharge",
    },
  },
};
