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
var ShopifyProductVariant_exports = {};
__export(ShopifyProductVariant_exports, {
  DefaultShopifyProductVariantSelection: () => DefaultShopifyProductVariantSelection,
  ShopifyProductVariantManager: () => ShopifyProductVariantManager
});
module.exports = __toCommonJS(ShopifyProductVariant_exports);
var import_builder = require("../builder.js");
const DefaultShopifyProductVariantSelection = {
  __typename: true,
  id: true,
  barcode: true,
  compareAtPrice: true,
  createdAt: true,
  inventoryPolicy: true,
  inventoryQuantity: true,
  option1: true,
  option2: true,
  option3: true,
  position: true,
  price: true,
  productId: true,
  shopId: true,
  sku: true,
  taxable: true,
  title: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyProductVariant";
const pluralModelApiIdentifier = "shopifyProductVariants";
;
;
;
;
;
;
;
;
const ShopifyProductVariantManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyProductVariantSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductVariantSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyProductVariant",
      functionName: "create",
      errorMessage: "The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyProductVariants",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyProductVariant",
      functionName: "update",
      errorMessage: "The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyProductVariants",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyProductVariant",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyProductVariants",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProductVariant.bulkDelete"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyProductVariantSelection,
  ShopifyProductVariantManager
});
//# sourceMappingURL=ShopifyProductVariant.js.map
