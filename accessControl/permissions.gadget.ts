import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://bambe-crm-app.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "shopify-app-users": {
      storageKey: "Role-Shopify-App",
      models: {
        googleSheetConfig: {
          read: {
            filter:
              "accessControl/filters/shopify/googleSheetConfig.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        senditConfig: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyCustomer: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyCustomer.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillment: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentOrder: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillmentOrder.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyFulfillmentService: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyFulfillmentService.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyGdprRequest: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyGdprRequest.gelly",
          },
          actions: {
            create: true,
            update: true,
          },
        },
        shopifyOrder: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyOrder.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shopifyProduct: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProduct.gelly",
          },
          actions: {
            update: true,
          },
        },
        shopifyProductVariant: {
          read: {
            filter:
              "accessControl/filters/shopify/shopifyProductVariant.gelly",
          },
        },
        shopifyShop: {
          read: {
            filter: "accessControl/filters/shopify/shopifyShop.gelly",
          },
          actions: {
            install: true,
            reinstall: true,
            uninstall: true,
            update: true,
          },
        },
        shopifySync: {
          read: {
            filter: "accessControl/filters/shopify/shopifySync.gelly",
          },
          actions: {
            abort: true,
            complete: true,
            error: true,
            run: true,
          },
        },
        speedafConfig: {
          read: true,
          actions: {
            create: true,
            delete: true,
            findFirst: true,
            update: true,
          },
        },
      },
      actions: {
        calculateRefund: true,
        createSenditOrder: true,
        directOrderTest: true,
        extractOrderSKUs: true,
        fulfillOrder: true,
        getSenditDistrictId: true,
        processBulkReturns: true,
        processOrderReturn: true,
        processSpeedafAPI: true,
        removeOrderFromSheets: true,
        searchBulkOrdersForReturn: true,
        searchOrderForReturn: true,
        senditFulfillOrder: true,
        standardizeMoroccanAddress: true,
        standardizeMoroccanCity: true,
        syncOrders: true,
        testGoogleAuth: true,
        testSenditConnection: true,
        testWriteToSheet: true,
        trackSpeedafOrders: true,
        updateReferenceTracking: true,
        writeBatchOrdersToSheets: true,
        writeSpeedafDataToSheets: true,
        writeToShopify: true,
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
    },
  },
};
