import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "blacklistedPhone" model
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "BlacklistedPhoneKey", 
  comment:
    "The Blacklisted Phone model stores phone numbers that should be blocked from placing orders or receiving deliveries, providing fraud prevention and business protection capabilities.",
  fields: {
    addedAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "BlacklistedPhoneAddedAt",
    },
    phone: {
      type: "string",
      storageKey: "BlacklistedPhoneNumber",
      validations: {
        required: true,
      },
    },
    shop: {
      type: "belongsTo",
      parent: { model: "shopifyShop" },
      storageKey: "BlacklistedPhoneShopId",
    },
  },
};
