import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "customCity" model, go to https://bambe-crm-app.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "CustomCityKey",
  comment:
    "The Custom City model stores user-defined cities for Sendit courier service, allowing users to manage and update city lists as Sendit updates their coverage areas.",
  fields: {
    addedAt: {
      type: "dateTime",
      includeTime: true,
      storageKey: "CustomCityAddedAt",
    },
    courierType: {
      type: "enum",
      default: "sendit",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["sendit", "speedaf", "general"],
      validations: { required: true },
      storageKey: "CustomCityCourierType",
    },
    isActive: {
      type: "boolean",
      default: true,
      storageKey: "CustomCityActive",
    },
    name: {
      type: "string",
      validations: { required: true, unique: true },
      storageKey: "CustomCityName",
    },
    shop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "CustomCityShopRef",
    },
  },
};
