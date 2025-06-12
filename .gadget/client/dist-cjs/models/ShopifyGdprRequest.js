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
var ShopifyGdprRequest_exports = {};
__export(ShopifyGdprRequest_exports, {
  DefaultShopifyGdprRequestSelection: () => DefaultShopifyGdprRequestSelection,
  ShopifyGdprRequestManager: () => ShopifyGdprRequestManager
});
module.exports = __toCommonJS(ShopifyGdprRequest_exports);
var import_builder = require("../builder.js");
const DefaultShopifyGdprRequestSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  payload: true,
  shopId: true,
  topic: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyGdprRequest";
const pluralModelApiIdentifier = "shopifyGdprRequests";
;
;
;
;
;
;
;
const ShopifyGdprRequestManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyGdprRequestSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyGdprRequestSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyGdprRequest",
      functionName: "create",
      errorMessage: "The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyGdprRequest.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyGdprRequests",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyGdprRequest.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyGdprRequest",
      functionName: "update",
      errorMessage: "The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyGdprRequest.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyGdprRequests",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyGdprRequest.bulkUpdate"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyGdprRequestSelection,
  ShopifyGdprRequestManager
});
//# sourceMappingURL=ShopifyGdprRequest.js.map
