"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Client_exports = {};
__export(Client_exports, {
  BambeCrmAppClient: () => BambeCrmAppClient,
  Client: () => Client,
  DefaultBlacklistedPhoneSelection: () => import_BlacklistedPhone2.DefaultBlacklistedPhoneSelection,
  DefaultCustomCitySelection: () => import_CustomCity2.DefaultCustomCitySelection,
  DefaultDeliveryChargesSelection: () => import_DeliveryCharges2.DefaultDeliveryChargesSelection,
  DefaultGoogleSheetConfigSelection: () => import_GoogleSheetConfig2.DefaultGoogleSheetConfigSelection,
  DefaultSenditConfigSelection: () => import_SenditConfig2.DefaultSenditConfigSelection,
  DefaultSessionSelection: () => import_Session2.DefaultSessionSelection,
  DefaultShopifyCustomerSelection: () => import_ShopifyCustomer2.DefaultShopifyCustomerSelection,
  DefaultShopifyFulfillmentOrderSelection: () => import_ShopifyFulfillmentOrder2.DefaultShopifyFulfillmentOrderSelection,
  DefaultShopifyFulfillmentSelection: () => import_ShopifyFulfillment2.DefaultShopifyFulfillmentSelection,
  DefaultShopifyFulfillmentServiceSelection: () => import_ShopifyFulfillmentService2.DefaultShopifyFulfillmentServiceSelection,
  DefaultShopifyGdprRequestSelection: () => import_ShopifyGdprRequest2.DefaultShopifyGdprRequestSelection,
  DefaultShopifyOrderSelection: () => import_ShopifyOrder2.DefaultShopifyOrderSelection,
  DefaultShopifyProductSelection: () => import_ShopifyProduct2.DefaultShopifyProductSelection,
  DefaultShopifyProductVariantSelection: () => import_ShopifyProductVariant2.DefaultShopifyProductVariantSelection,
  DefaultShopifyShopSelection: () => import_ShopifyShop2.DefaultShopifyShopSelection,
  DefaultShopifySyncSelection: () => import_ShopifySync2.DefaultShopifySyncSelection,
  DefaultSpeedafConfigSelection: () => import_SpeedafConfig2.DefaultSpeedafConfigSelection,
  maybeGetAuthenticationModeOptionsFromClientOptions: () => maybeGetAuthenticationModeOptionsFromClientOptions
});
module.exports = __toCommonJS(Client_exports);
var import_wonka = require("wonka");
var import_api_client_core = require("@gadgetinc/api-client-core");
var import_builder = require("./builder.js");
var import_ShopifyCustomer = require("./models/ShopifyCustomer.js");
var import_ShopifyGdprRequest = require("./models/ShopifyGdprRequest.js");
var import_ShopifyOrder = require("./models/ShopifyOrder.js");
var import_ShopifyShop = require("./models/ShopifyShop.js");
var import_ShopifySync = require("./models/ShopifySync.js");
var import_GoogleSheetConfig = require("./models/GoogleSheetConfig.js");
var import_Session = require("./models/Session.js");
var import_CurrentSession = require("./models/CurrentSession.js");
var import_ShopifyFulfillment = require("./models/ShopifyFulfillment.js");
var import_ShopifyFulfillmentOrder = require("./models/ShopifyFulfillmentOrder.js");
var import_ShopifyFulfillmentService = require("./models/ShopifyFulfillmentService.js");
var import_ShopifyProduct = require("./models/ShopifyProduct.js");
var import_ShopifyProductVariant = require("./models/ShopifyProductVariant.js");
var import_SenditConfig = require("./models/SenditConfig.js");
var import_SpeedafConfig = require("./models/SpeedafConfig.js");
var import_CustomCity = require("./models/CustomCity.js");
var import_DeliveryCharges = require("./models/DeliveryCharges.js");
var import_BlacklistedPhone = require("./models/BlacklistedPhone.js");
var import_ShopifyCustomer2 = require("./models/ShopifyCustomer.js");
var import_ShopifyGdprRequest2 = require("./models/ShopifyGdprRequest.js");
var import_ShopifyOrder2 = require("./models/ShopifyOrder.js");
var import_ShopifyShop2 = require("./models/ShopifyShop.js");
var import_ShopifySync2 = require("./models/ShopifySync.js");
var import_GoogleSheetConfig2 = require("./models/GoogleSheetConfig.js");
var import_Session2 = require("./models/Session.js");
var import_ShopifyFulfillment2 = require("./models/ShopifyFulfillment.js");
var import_ShopifyFulfillmentOrder2 = require("./models/ShopifyFulfillmentOrder.js");
var import_ShopifyFulfillmentService2 = require("./models/ShopifyFulfillmentService.js");
var import_ShopifyProduct2 = require("./models/ShopifyProduct.js");
var import_ShopifyProductVariant2 = require("./models/ShopifyProductVariant.js");
var import_SenditConfig2 = require("./models/SenditConfig.js");
var import_SpeedafConfig2 = require("./models/SpeedafConfig.js");
var import_CustomCity2 = require("./models/CustomCity.js");
var import_DeliveryCharges2 = require("./models/DeliveryCharges.js");
var import_BlacklistedPhone2 = require("./models/BlacklistedPhone.js");
const import_meta = {};
const productionEnv = "production";
const fallbackEnv = "development";
const availableAuthenticationModes = [
  "apiKey",
  "browserSession",
  "anonymous",
  "internalAuthToken",
  "internal",
  "custom"
];
const maybeGetAuthenticationModeOptionsFromClientOptions = (options) => {
  const topLevelAuthModes = {};
  for (const key of availableAuthenticationModes) {
    if (key in options) {
      topLevelAuthModes[key] = options[key];
    }
  }
  if ("authenticationMode" in options && Object.keys(topLevelAuthModes).length > 0) {
    throw new import_api_client_core.GadgetClientError(
      "Declaring authentication modes at the top level and under the `authenticationMode` key at the same time is not allowed."
    );
  }
  if ("authenticationMode" in options) {
    return options.authenticationMode;
  }
  if (Object.keys(topLevelAuthModes).length === 0) {
    return void 0;
  }
  return topLevelAuthModes;
};
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return void 0;
  }
};
class BambeCrmAppClient {
  constructor(options) {
    /** Executes the applyDiscountsAndShipping global action. */
    this.applyDiscountsAndShipping = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "applyDiscountsAndShipping",
      operationName: "applyDiscountsAndShipping",
      operationReturnType: "ApplyDiscountsAndShipping",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        testMode: { required: false, type: "Boolean" }
      }
    });
    /** Executes the applyShippingCostAbsorption global action. */
    this.applyShippingCostAbsorption = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "applyShippingCostAbsorption",
      operationName: "applyShippingCostAbsorption",
      operationReturnType: "ApplyShippingCostAbsorption",
      namespace: null,
      variables: {}
    });
    /** Executes the calculateRefund global action. */
    this.calculateRefund = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "calculateRefund",
      operationName: "calculateRefund",
      operationReturnType: "CalculateRefund",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        lineItems: {
          required: false,
          type: "[CalculateRefundLineItemsElementTypeInput!]"
        },
        refundShipping: { required: false, type: "Boolean" },
        reason: { required: false, type: "String" }
      }
    });
    /** Executes the createSenditOrder global action. */
    this.createSenditOrder = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "createSenditOrder",
      operationName: "createSenditOrder",
      operationReturnType: "CreateSenditOrder",
      namespace: null,
      variables: {}
    });
    /** Executes the debugOrderShipping global action. */
    this.debugOrderShipping = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "debugOrderShipping",
      operationName: "debugOrderShipping",
      operationReturnType: "DebugOrderShipping",
      namespace: null,
      variables: {}
    });
    /** Executes the deleteSenditRecord global action. */
    this.deleteSenditRecord = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "deleteSenditRecord",
      operationName: "deleteSenditRecord",
      operationReturnType: "DeleteSenditRecord",
      namespace: null,
      variables: {}
    });
    /** Executes the deleteSheetRowsByTrackingNumber global action. */
    this.deleteSheetRowsByTrackingNumber = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "deleteSheetRowsByTrackingNumber",
      operationName: "deleteSheetRowsByTrackingNumber",
      operationReturnType: "DeleteSheetRowsByTrackingNumber",
      namespace: null,
      variables: {
        trackingNumbers: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the directOrderTest global action. */
    this.directOrderTest = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "directOrderTest",
      operationName: "directOrderTest",
      operationReturnType: "DirectOrderTest",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the extractOrderSKUs global action. */
    this.extractOrderSKUs = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "extractOrderSKUs",
      operationName: "extractOrderSKUs",
      operationReturnType: "ExtractOrderSKUs",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the getCustomCities global action. */
    this.getCustomCities = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "getCustomCities",
      operationName: "getCustomCities",
      operationReturnType: "GetCustomCities",
      namespace: null,
      variables: {}
    });
    /** Executes the getDeliveryCharges global action. */
    this.getDeliveryCharges = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "getDeliveryCharges",
      operationName: "getDeliveryCharges",
      operationReturnType: "GetDeliveryCharges",
      namespace: null,
      variables: { shopId: { required: false, type: "String" } }
    });
    /** Executes the getSenditDistrictId global action. */
    this.getSenditDistrictId = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "getSenditDistrictId",
      operationName: "getSenditDistrictId",
      operationReturnType: "GetSenditDistrictId",
      namespace: null,
      variables: {}
    });
    /** Executes the getShippingCost global action. */
    this.getShippingCost = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "getShippingCost",
      operationName: "getShippingCost",
      operationReturnType: "GetShippingCost",
      namespace: null,
      variables: { orderId: { required: false, type: "String" } }
    });
    /** Executes the listRecentOrders global action. */
    this.listRecentOrders = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "listRecentOrders",
      operationName: "listRecentOrders",
      operationReturnType: "ListRecentOrders",
      namespace: null,
      variables: {}
    });
    /** Executes the processBulkReturns global action. */
    this.processBulkReturns = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "processBulkReturns",
      operationName: "processBulkReturns",
      operationReturnType: "ProcessBulkReturns",
      namespace: null,
      variables: {
        orderSelections: {
          required: false,
          type: "[ProcessBulkReturnsOrderSelectionsElementTypeInput!]"
        },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the processOrderReturn global action. */
    this.processOrderReturn = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "processOrderReturn",
      operationName: "processOrderReturn",
      operationReturnType: "ProcessOrderReturn",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        lineItems: {
          required: false,
          type: "[ProcessOrderReturnLineItemsElementTypeInput!]"
        },
        refundShipping: { required: false, type: "Boolean" },
        reason: { required: false, type: "String" },
        notify: { required: false, type: "Boolean" },
        skipRefund: { required: false, type: "Boolean" },
        inventoryOnlyReturn: { required: false, type: "Boolean" }
      }
    });
    /** Executes the processSpeedafAPI global action. */
    this.processSpeedafAPI = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "processSpeedafAPI",
      operationName: "processSpeedafAPI",
      operationReturnType: "ProcessSpeedafAPI",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        requestData: { required: false, type: "JSONObject" },
        testMode: { required: false, type: "Boolean" }
      }
    });
    /** Executes the removeOrderFromSheets global action. */
    this.removeOrderFromSheets = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "removeOrderFromSheets",
      operationName: "removeOrderFromSheets",
      operationReturnType: "RemoveOrderFromSheets",
      namespace: null,
      variables: {
        orderName: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the searchBulkOrdersForReturn global action. */
    this.searchBulkOrdersForReturn = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "searchBulkOrdersForReturn",
      operationName: "searchBulkOrdersForReturn",
      operationReturnType: "SearchBulkOrdersForReturn",
      namespace: null,
      variables: {
        orderNumbers: { required: false, type: "[String!]" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the searchOrderForReturn global action. */
    this.searchOrderForReturn = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "searchOrderForReturn",
      operationName: "searchOrderForReturn",
      operationReturnType: "SearchOrderForReturn",
      namespace: null,
      variables: {
        orderName: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the standardizeMoroccanCity global action. */
    this.standardizeMoroccanCity = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "standardizeMoroccanCity",
      operationName: "standardizeMoroccanCity",
      operationReturnType: "StandardizeMoroccanCity",
      namespace: null,
      variables: {}
    });
    /** Executes the syncOrders global action. */
    this.syncOrders = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "syncOrders",
      operationName: "syncOrders",
      operationReturnType: "SyncOrders",
      namespace: null,
      variables: {
        limit: { required: false, type: "Float" },
        orders: { required: false, type: "[SyncOrdersOrdersElementTypeInput!]" }
      }
    });
    /** Executes the testGoogleAuth global action. */
    this.testGoogleAuth = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testGoogleAuth",
      operationName: "testGoogleAuth",
      operationReturnType: "TestGoogleAuth",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        spreadsheetId: { required: false, type: "String" }
      }
    });
    /** Executes the testLocationQuery global action. */
    this.testLocationQuery = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testLocationQuery",
      operationName: "testLocationQuery",
      operationReturnType: "TestLocationQuery",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the testSenditConnection global action. */
    this.testSenditConnection = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testSenditConnection",
      operationName: "testSenditConnection",
      operationReturnType: "TestSenditConnection",
      namespace: null,
      variables: {
        publicKey: { required: false, type: "String" },
        secretKey: { required: false, type: "String" },
        saveToPersistent: { required: false, type: "Boolean" }
      }
    });
    /** Executes the testSenditDeletion global action. */
    this.testSenditDeletion = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testSenditDeletion",
      operationName: "testSenditDeletion",
      operationReturnType: "TestSenditDeletion",
      namespace: null,
      variables: {}
    });
    /** Executes the testTrackingDetection global action. */
    this.testTrackingDetection = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testTrackingDetection",
      operationName: "testTrackingDetection",
      operationReturnType: "TestTrackingDetection",
      namespace: null,
      variables: {}
    });
    /** Executes the testWriteToSheet global action. */
    this.testWriteToSheet = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "testWriteToSheet",
      operationName: "testWriteToSheet",
      operationReturnType: "TestWriteToSheet",
      namespace: null,
      variables: {
        spreadsheetId: { required: false, type: "String" },
        sheetName: { required: false, type: "String" }
      }
    });
    /** Executes the trackSpeedafOrders global action. */
    this.trackSpeedafOrders = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "trackSpeedafOrders",
      operationName: "trackSpeedafOrders",
      operationReturnType: "TrackSpeedafOrders",
      namespace: null,
      variables: {
        latestOrderName: { required: false, type: "String" },
        orderCount: { required: false, type: "Float" },
        mode: { required: false, type: "String" }
      }
    });
    /** Executes the updateDeliveryCharge global action. */
    this.updateDeliveryCharge = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "updateDeliveryCharge",
      operationName: "updateDeliveryCharge",
      operationReturnType: "UpdateDeliveryCharge",
      namespace: null,
      variables: {
        senditCharge: { required: false, type: "Float" },
        speedafCharge: { required: false, type: "Float" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the updateReferenceTracking global action. */
    this.updateReferenceTracking = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "updateReferenceTracking",
      operationName: "updateReferenceTracking",
      operationReturnType: "UpdateReferenceTracking",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        referenceTrackingCode: { required: false, type: "String" }
      }
    });
    /** Executes the writeBatchOrdersToSheets global action. */
    this.writeBatchOrdersToSheets = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "writeBatchOrdersToSheets",
      operationName: "writeBatchOrdersToSheets",
      operationReturnType: "WriteBatchOrdersToSheets",
      namespace: null,
      variables: {
        ordersData: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the writeSpeedafDataToSheets global action. */
    this.writeSpeedafDataToSheets = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "writeSpeedafDataToSheets",
      operationName: "writeSpeedafDataToSheets",
      operationReturnType: "WriteSpeedafDataToSheets",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        trackingData: {
          required: false,
          type: "[WriteSpeedafDataToSheetsTrackingDataElementTypeInput!]"
        }
      }
    });
    /** Executes the writeToShopify global action. */
    this.writeToShopify = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "writeToShopify",
      operationName: "writeToShopify",
      operationReturnType: "WriteToShopify",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        mutation: { required: false, type: "String" },
        variables: { required: false, type: "JSONObject" }
      }
    });
    /** Executes the processBulkReturns_old global action. */
    this.processBulkReturns_old = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "processBulkReturns_old",
      operationName: "processBulkReturns_old",
      operationReturnType: "ProcessBulkReturnsOld",
      namespace: null,
      variables: {
        orderSelections: {
          required: false,
          type: "[ProcessBulkReturnsOldOrderSelectionsElementTypeInput!]"
        },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the processOrderReturn_old global action. */
    this.processOrderReturn_old = (0, import_builder.buildGlobalAction)(this, {
      type: "globalAction",
      functionName: "processOrderReturn_old",
      operationName: "processOrderReturn_old",
      operationReturnType: "ProcessOrderReturnOld",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        lineItems: {
          required: false,
          type: "[ProcessOrderReturnOldLineItemsElementTypeInput!]"
        },
        refundShipping: { required: false, type: "Boolean" },
        reason: { required: false, type: "String" },
        notify: { required: false, type: "Boolean" },
        skipRefund: { required: false, type: "Boolean" }
      }
    });
    /**
     * The list of environments with a customized API root endpoint
     */
    this.apiRoots = { "production": "https://bambe-crm-app.gadget.app/", "development": "https://bambe-crm-app--development.gadget.app/" };
    this.applicationId = "222569";
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    this.transaction = async (callback) => {
      return await this.connection.transaction(callback);
    };
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    this.getDirectUploadToken = async () => {
      const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", { nonce: Math.random().toString(36).slice(2, 7) }, {
        requestPolicy: "network-only"
      });
      return result.gadgetMeta.directUploadToken;
    };
    var _a, _b, _c;
    let inSSRContext = false;
    this.options = options;
    try {
      inSSRContext = !!(import_meta.env && import_meta.env.SSR);
    } catch (error) {
    }
    if (inSSRContext) {
      const api = (_a = globalThis.GadgetGlobals) == null ? void 0 : _a.api;
      if (api) {
        return api.actAsSession;
      }
    }
    this.environment = ((options == null ? void 0 : options.environment) ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://bambe-crm-app${envPart}.gadget.app`;
    }
    const exchanges = { ...options == null ? void 0 : options.exchanges };
    if (this.environment !== productionEnv) {
      const devHarnessExchange = ({ forward }) => {
        return (operations$) => {
          const operationResult$ = forward(operations$);
          return (0, import_wonka.pipe)(
            operationResult$,
            (0, import_wonka.map)((result) => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error) {
                console.warn("[gadget] error dispatching gadget dev harness event", error);
              }
              return result;
            })
          );
        };
      };
      exchanges.beforeAll = [
        devHarnessExchange,
        ...exchanges.beforeAll ?? []
      ];
    }
    const connectionOptions = {
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options == null ? void 0 : options.authenticationMode,
      ...options,
      exchanges,
      environment: this.environment
    };
    const authenticationMode = maybeGetAuthenticationModeOptionsFromClientOptions(options ?? {});
    connectionOptions.authenticationMode = authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true });
    this.connection = new import_api_client_core.GadgetConnection(connectionOptions);
    if (typeof window != "undefined" && this.connection.authenticationMode == import_api_client_core.AuthenticationMode.APIKey && !((_b = options == null ? void 0 : options.authenticationMode) == null ? void 0 : _b.dangerouslyAllowBrowserApiKey)) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
    }
    if (typeof (options == null ? void 0 : options.authenticationMode) === "undefined" && typeof window !== "undefined" && ((_c = window.shopify) == null ? void 0 : _c.idToken)) {
      this.connection.setAuthenticationMode({
        custom: {
          async processFetch(_input, init) {
            const headers = new Headers(init.headers);
            const idToken = await window.shopify.idToken();
            headers.append("Authorization", "ShopifySessionToken " + idToken);
            init.headers ?? (init.headers = {});
            headers.forEach(function(value, key) {
              init.headers[key] = value;
            });
          },
          async processTransactionConnectionParams(params) {
            const idToken = await window.shopify.idToken();
            params.auth.shopifySessionToken = idToken;
          }
        }
      });
    }
    this.shopifyCustomer = new import_ShopifyCustomer.ShopifyCustomerManager(this.connection);
    this.shopifyGdprRequest = new import_ShopifyGdprRequest.ShopifyGdprRequestManager(this.connection);
    this.shopifyOrder = new import_ShopifyOrder.ShopifyOrderManager(this.connection);
    this.shopifyShop = new import_ShopifyShop.ShopifyShopManager(this.connection);
    this.shopifySync = new import_ShopifySync.ShopifySyncManager(this.connection);
    this.googleSheetConfig = new import_GoogleSheetConfig.GoogleSheetConfigManager(this.connection);
    this.session = new import_Session.SessionManager(this.connection);
    this.currentSession = new import_CurrentSession.CurrentSessionManager(this.connection);
    this.shopifyFulfillment = new import_ShopifyFulfillment.ShopifyFulfillmentManager(this.connection);
    this.shopifyFulfillmentOrder = new import_ShopifyFulfillmentOrder.ShopifyFulfillmentOrderManager(this.connection);
    this.shopifyFulfillmentService = new import_ShopifyFulfillmentService.ShopifyFulfillmentServiceManager(this.connection);
    this.shopifyProduct = new import_ShopifyProduct.ShopifyProductManager(this.connection);
    this.shopifyProductVariant = new import_ShopifyProductVariant.ShopifyProductVariantManager(this.connection);
    this.senditConfig = new import_SenditConfig.SenditConfigManager(this.connection);
    this.speedafConfig = new import_SpeedafConfig.SpeedafConfigManager(this.connection);
    this.customCity = new import_CustomCity.CustomCityManager(this.connection);
    this.deliveryCharges = new import_DeliveryCharges.DeliveryChargesManager(this.connection);
    this.blacklistedPhone = new import_BlacklistedPhone.BlacklistedPhoneManager(this.connection);
    this.internal = {
      shopifyCustomer: new import_api_client_core.InternalModelManager("shopifyCustomer", this.connection, { "pluralApiIdentifier": "shopifyCustomers", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyGdprRequest: new import_api_client_core.InternalModelManager("shopifyGdprRequest", this.connection, { "pluralApiIdentifier": "shopifyGdprRequests", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyOrder: new import_api_client_core.InternalModelManager("shopifyOrder", this.connection, { "pluralApiIdentifier": "shopifyOrders", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyShop: new import_api_client_core.InternalModelManager("shopifyShop", this.connection, { "pluralApiIdentifier": "shopifyShops", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifySync: new import_api_client_core.InternalModelManager("shopifySync", this.connection, { "pluralApiIdentifier": "shopifySyncs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      googleSheetConfig: new import_api_client_core.InternalModelManager("googleSheetConfig", this.connection, { "pluralApiIdentifier": "googleSheetConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      session: new import_api_client_core.InternalModelManager("session", this.connection, { "pluralApiIdentifier": "sessions", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillment: new import_api_client_core.InternalModelManager("shopifyFulfillment", this.connection, { "pluralApiIdentifier": "shopifyFulfillments", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillmentOrder: new import_api_client_core.InternalModelManager("shopifyFulfillmentOrder", this.connection, { "pluralApiIdentifier": "shopifyFulfillmentOrders", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillmentService: new import_api_client_core.InternalModelManager("shopifyFulfillmentService", this.connection, { "pluralApiIdentifier": "shopifyFulfillmentServices", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyProduct: new import_api_client_core.InternalModelManager("shopifyProduct", this.connection, { "pluralApiIdentifier": "shopifyProducts", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyProductVariant: new import_api_client_core.InternalModelManager("shopifyProductVariant", this.connection, { "pluralApiIdentifier": "shopifyProductVariants", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      senditConfig: new import_api_client_core.InternalModelManager("senditConfig", this.connection, { "pluralApiIdentifier": "senditConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      speedafConfig: new import_api_client_core.InternalModelManager("speedafConfig", this.connection, { "pluralApiIdentifier": "speedafConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      customCity: new import_api_client_core.InternalModelManager("customCity", this.connection, { "pluralApiIdentifier": "customCities", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      deliveryCharges: new import_api_client_core.InternalModelManager("deliveryCharges", this.connection, { "pluralApiIdentifier": "deliveryChargess", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      blacklistedPhone: new import_api_client_core.InternalModelManager("blacklistedPhone", this.connection, { "pluralApiIdentifier": "blacklistedPhones", "hasAmbiguousIdentifiers": false, "namespace": [] })
    };
  }
  /**
   * Returns a new Client instance that will call the Gadget API as the application's admin user.
   * This can only be used for API clients using internal authentication.
   * @returns {BambeCrmAppClient} A new BambeCrmAppClient instance with admin authentication
   */
  get actAsAdmin() {
    var _a, _b, _c;
    (0, import_api_client_core.assert)((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, `actAsAdmin can only be used for API clients using internal authentication, this client is using ${JSON.stringify((_c = this.options) == null ? void 0 : _c.authenticationMode)}`);
    return new BambeCrmAppClient({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: false
        }
      }
    });
  }
  /**
   * Returns a new BambeCrmAppClient instance that will call the Gadget API as with the permission of the current session.
   * This can only be used for API clients using internal authentication.
   * @returns {BambeCrmAppClient} A new BambeCrmAppClient instance with session authentication
   */
  get actAsSession() {
    var _a, _b;
    (0, import_api_client_core.assert)((_b = (_a = this.options) == null ? void 0 : _a.authenticationMode) == null ? void 0 : _b.internal, "actAsSession can only be used for API clients using internal authentication");
    return new BambeCrmAppClient({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: true
        }
      }
    });
  }
  /** Run an arbitrary GraphQL query. */
  async query(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /** Run an arbitrary GraphQL mutation. */
  async mutate(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /**
   * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
   *
   * @example
   * await api.fetch("https://myapp--development.gadget.app/foo/bar");
   *
   * @example
   * // fetch a relative URL from the endpoint this API client is configured to fetch from
   * await api.fetch("/foo/bar");
   **/
  async fetch(input, init = {}) {
    return await this.connection.fetch(input, init);
  }
  async enqueue(action, inputOrOptions, maybeOptions) {
    (0, import_api_client_core.assert)(action, ".enqueue must be passed an action as the first argument but was passed undefined");
    let input;
    let options;
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
        input = { id: inputOrOptions };
      } else {
        input = inputOrOptions;
      }
      options = {};
    }
    return await (0, import_api_client_core.enqueueActionRunner)(this.connection, action, input, options);
  }
  /**
   * Returns a handle for a given background action id
   *
   * @param action The action that was enqueued
   * @param id The id of the background action
   *
   * @example
   * const handle = api.handle(api.widget.update, "app-job-12346");
   *
   * @example
   * const handle = api.handle(api.someGlobalAction, "app-job-56789");
   **/
  handle(action, id) {
    return new import_api_client_core.BackgroundActionHandle(this.connection, action, id);
  }
  toString() {
    return `BambeCrmAppClient<${this.environment}>`;
  }
  toJSON() {
    return this.toString();
  }
}
BambeCrmAppClient.prototype[Symbol.for("gadget/modelRelationships")] = { "shopifyCustomer": { "orders": { "type": "HasMany", "model": "shopifyOrder" }, "lastOrder": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyGdprRequest": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyOrder": { "customer": { "type": "BelongsTo", "model": "shopifyCustomer" }, "fulfillments": { "type": "HasMany", "model": "shopifyFulfillment" }, "shopifyShop": { "type": "BelongsTo", "model": "shopifyShop" }, "fulfillmentOrders": { "type": "HasMany", "model": "shopifyFulfillmentOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyShop": { "syncs": { "type": "HasMany", "model": "shopifySync" }, "gdprRequests": { "type": "HasMany", "model": "shopifyGdprRequest" }, "fulfillmentOrders": { "type": "HasMany", "model": "shopifyFulfillmentOrder" }, "fulfillmentServices": { "type": "HasMany", "model": "shopifyFulfillmentService" }, "fulfillments": { "type": "HasMany", "model": "shopifyFulfillment" }, "customers": { "type": "HasMany", "model": "shopifyCustomer" }, "orders": { "type": "HasMany", "model": "shopifyOrder" }, "productVariants": { "type": "HasMany", "model": "shopifyProductVariant" }, "products": { "type": "HasMany", "model": "shopifyProduct" } }, "shopifySync": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "googleSheetConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "session": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillment": { "order": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillmentOrder": { "order": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillmentService": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProduct": { "variants": { "type": "HasMany", "model": "shopifyProductVariant" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProductVariant": { "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "senditConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "speedafConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "customCity": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "deliveryCharges": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "blacklistedPhone": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } } };
const Client = BambeCrmAppClient;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BambeCrmAppClient,
  Client,
  DefaultBlacklistedPhoneSelection,
  DefaultCustomCitySelection,
  DefaultDeliveryChargesSelection,
  DefaultGoogleSheetConfigSelection,
  DefaultSenditConfigSelection,
  DefaultSessionSelection,
  DefaultShopifyCustomerSelection,
  DefaultShopifyFulfillmentOrderSelection,
  DefaultShopifyFulfillmentSelection,
  DefaultShopifyFulfillmentServiceSelection,
  DefaultShopifyGdprRequestSelection,
  DefaultShopifyOrderSelection,
  DefaultShopifyProductSelection,
  DefaultShopifyProductVariantSelection,
  DefaultShopifyShopSelection,
  DefaultShopifySyncSelection,
  DefaultSpeedafConfigSelection,
  maybeGetAuthenticationModeOptionsFromClientOptions
});
//# sourceMappingURL=Client.js.map
