import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.3.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2025-04",
        enabledModels: [
          "shopifyCustomer",
          "shopifyFulfillment",
          "shopifyFulfillmentOrder",
          "shopifyFulfillmentService",
          "shopifyOrder",
          "shopifyProduct",
          "shopifyProductVariant",
        ],
        type: "partner",
        scopes: [
          "read_orders",
          "write_orders",
          "read_products",
          "read_customers",
          "write_customers",
          "write_fulfillments",
          "write_assigned_fulfillment_orders",
          "read_fulfillments",
          "read_assigned_fulfillment_orders",
          "read_merchant_managed_fulfillment_orders",
          "write_merchant_managed_fulfillment_orders",
          "read_locations",
        ],
      },
    },
  },
};
