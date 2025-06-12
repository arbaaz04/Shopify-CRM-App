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
var ShopifyFulfillmentOrder_exports = {};
__export(ShopifyFulfillmentOrder_exports, {
  DefaultShopifyFulfillmentOrderSelection: () => DefaultShopifyFulfillmentOrderSelection,
  ShopifyFulfillmentOrderManager: () => ShopifyFulfillmentOrderManager
});
module.exports = __toCommonJS(ShopifyFulfillmentOrder_exports);
var import_builder = require("../builder.js");
const DefaultShopifyFulfillmentOrderSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  fulfillAt: true,
  fulfillBy: true,
  internationalDuties: true,
  orderId: true,
  requestStatus: true,
  shopId: true,
  shopifyCreatedAt: true,
  shopifyUpdatedAt: true,
  status: true,
  supportedActions: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyFulfillmentOrder";
const pluralModelApiIdentifier = "shopifyFulfillmentOrders";
;
;
;
;
;
;
;
;
const ShopifyFulfillmentOrderManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyFulfillmentOrderSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyFulfillmentOrder",
      functionName: "create",
      errorMessage: "The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyFulfillmentOrders",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyFulfillmentOrder",
      functionName: "update",
      errorMessage: "The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyFulfillmentOrders",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyFulfillmentOrder",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyFulfillmentOrders",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyFulfillmentOrder.bulkDelete"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyFulfillmentOrderSelection,
  ShopifyFulfillmentOrderManager
});
//# sourceMappingURL=ShopifyFulfillmentOrder.js.map
