import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "googleSheetConfig" model, go to https://bambe-crm-app.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "-aqYKUZT8xF4",
  comment:
    "The Google Sheet Configuration model stores connection settings for integrating with Google Sheets and courier services, allowing for seamless data exchange between Shopify shops and external services.",
  fields: {
    courierApiKey: {
      type: "encryptedString",
      storageKey: "u6KkpCCHTiJQ",
    },
    courierApiProvider: {
      type: "string",
      storageKey: "by_Z64l3alIc",
    },
    customerSheetName: {
      type: "string",
      validations: { required: true },
      storageKey: "_nMz7Q50Tm-R",
    },
    orderSheetName: {
      type: "string",
      validations: { required: true },
      storageKey: "6A6f68zlz7rw",
    },
    shop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "ETysa3qT2o3v",
    },
    spreadsheetId: {
      type: "string",
      validations: { required: true },
      storageKey: "oR_i3VOD8zfq",
    },
  },
};
