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
var ShopifyFulfillmentService_exports = {};
__export(ShopifyFulfillmentService_exports, {
  DefaultShopifyFulfillmentServiceSelection: () => DefaultShopifyFulfillmentServiceSelection,
  ShopifyFulfillmentServiceManager: () => ShopifyFulfillmentServiceManager
});
module.exports = __toCommonJS(ShopifyFulfillmentService_exports);
var import_builder = require("../builder.js");
const DefaultShopifyFulfillmentServiceSelection = {
  __typename: true,
  id: true,
  adminGraphqlApiId: true,
  callbackUrl: true,
  createdAt: true,
  format: true,
  fulfillmentOrdersOptIn: true,
  handle: true,
  inventoryManagement: true,
  name: true,
  permitsSkuSharing: true,
  requiresShippingMethod: true,
  serviceName: true,
  shopId: true,
  trackingSupport: true,
  type: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyFulfillmentService";
const pluralModelApiIdentifier = "shopifyFulfillmentServices";
;
;
;
;
;
;
;
;
const ShopifyFulfillmentServiceManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyFulfillmentServiceSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyFulfillmentService",
      functionName: "create",
      errorMessage: "The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyFulfillmentServices",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyFulfillmentService",
      functionName: "update",
      errorMessage: "The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyFulfillmentServices",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyFulfillmentService",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyFulfillmentServices",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentService.bulkDelete"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyFulfillmentServiceSelection,
  ShopifyFulfillmentServiceManager
});
//# sourceMappingURL=ShopifyFulfillmentService.js.map
