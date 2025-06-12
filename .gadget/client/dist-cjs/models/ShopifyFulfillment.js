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
var ShopifyFulfillment_exports = {};
__export(ShopifyFulfillment_exports, {
  DefaultShopifyFulfillmentSelection: () => DefaultShopifyFulfillmentSelection,
  ShopifyFulfillmentManager: () => ShopifyFulfillmentManager
});
module.exports = __toCommonJS(ShopifyFulfillment_exports);
var import_builder = require("../builder.js");
const DefaultShopifyFulfillmentSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  name: true,
  orderId: true,
  originAddress: true,
  receipt: true,
  service: true,
  shipmentStatus: true,
  shopId: true,
  shopifyCreatedAt: true,
  shopifyUpdatedAt: true,
  status: true,
  trackingCompany: true,
  trackingNumbers: true,
  trackingUrls: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyFulfillment";
const pluralModelApiIdentifier = "shopifyFulfillments";
;
;
;
;
;
;
;
;
const ShopifyFulfillmentManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyFulfillmentSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyFulfillment",
      functionName: "create",
      errorMessage: "The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyFulfillments",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyFulfillment",
      functionName: "update",
      errorMessage: "The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyFulfillments",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyFulfillment",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyFulfillments",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillment.bulkDelete"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyFulfillmentSelection,
  ShopifyFulfillmentManager
});
//# sourceMappingURL=ShopifyFulfillment.js.map
