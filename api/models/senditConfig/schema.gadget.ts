import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "senditConfig" model
export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "SenditConfigKey",
  comment:
    "The Sendit Configuration model stores API credentials and connection settings for integrating with the Sendit courier service.",
  fields: {
    publicKey: {
      type: "encryptedString", // Use encrypted storage for security
      validations: { required: true },
      storageKey: "SenditPubKey",
      comment: "Public API key for Sendit authentication"
    },
    secretKey: {
      type: "encryptedString", // Use encrypted storage for security
      validations: { required: true },
      storageKey: "SenditSecKey",
      comment: "Secret API key for Sendit authentication"
    },
    token: {
      type: "encryptedString", // Use encrypted storage for security
      storageKey: "SenditToken",
      comment: "Auth token received from Sendit API after successful authentication"
    },
    name: {
      type: "string",
      storageKey: "SenditName",
      comment: "Account name or identifier returned by Sendit API"
    },
    accountType: {
      type: "string",
      storageKey: "SenditAccType",
      comment: "Type of Sendit account (e.g. business, personal, enterprise)"
    },
    lastAuthenticated: {
      type: "dateTime",
      storageKey: "SenditLastAuth",
      comment: "Timestamp of last successful authentication"
    },
    shop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "SenditShopRef",
      comment: "The Shopify shop this configuration belongs to"
    }
  }
}; 