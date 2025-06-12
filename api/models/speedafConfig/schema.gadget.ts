import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "speedafConfig" model, go to https://bambe-crm-app.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "SpeedafConfigKey",
  comment:
    "The Speedaf Configuration model stores API credentials and connection settings for integrating with the Speedaf courier service.",
  fields: {
    apiEndpoint: { type: "string", storageKey: "SpeedafApiUrl" },
    appCode: {
      type: "string",
      validations: { required: true },
      storageKey: "SpeedafAppCode",
    },
    customerCode: {
      type: "string",
      validations: { required: true },
      storageKey: "SpeedafCustCode",
    },
    lastAuthenticated: {
      type: "dateTime",
      includeTime: true,
      storageKey: "SpeedafLastAuth",
    },
    name: { type: "string", storageKey: "SpeedafName" },
    platformSource: { type: "string", storageKey: "SpeedafPlatSrc" },
    secretKey: {
      type: "string",
      validations: { required: true },
      storageKey: "SpeedafSecKey",
    },
    shop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "SpeedafShopRef",
    },
  },
};
 