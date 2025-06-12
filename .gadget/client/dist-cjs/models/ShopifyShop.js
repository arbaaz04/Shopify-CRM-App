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
var ShopifyShop_exports = {};
__export(ShopifyShop_exports, {
  DefaultShopifyShopSelection: () => DefaultShopifyShopSelection,
  ShopifyShopManager: () => ShopifyShopManager
});
module.exports = __toCommonJS(ShopifyShop_exports);
var import_builder = require("../builder.js");
const DefaultShopifyShopSelection = {
  __typename: true,
  id: true,
  state: true,
  address1: true,
  address2: true,
  city: true,
  country: true,
  countryCode: true,
  countryName: true,
  countyTaxes: true,
  createdAt: true,
  currency: true,
  customerEmail: true,
  disabledWebhooks: true,
  domain: true,
  eligibleForPayments: true,
  email: true,
  enabledPresentmentCurrencies: true,
  finances: true,
  googleAppsDomain: true,
  googleAppsLoginEnabled: true,
  grantedScopes: true,
  hasDiscounts: true,
  hasGiftCards: true,
  hasStorefront: true,
  ianaTimezone: true,
  installedViaApiKey: true,
  latitude: true,
  longitude: true,
  marketingSmsContentEnabledAtCheckout: true,
  moneyFormat: true,
  moneyInEmailsFormat: true,
  moneyWithCurrencyFormat: true,
  moneyWithCurrencyInEmailsFormat: true,
  multiLocationEnabled: true,
  myshopifyDomain: true,
  name: true,
  passwordEnabled: true,
  phone: true,
  plan: true,
  planDisplayName: true,
  planName: true,
  preLaunchEnabled: true,
  primaryLocale: true,
  province: true,
  provinceCode: true,
  registeredWebhooks: true,
  requiresExtraPaymentsAgreement: true,
  setupRequired: true,
  shopOwner: true,
  shopifyCreatedAt: true,
  shopifyUpdatedAt: true,
  source: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifyShop";
const pluralModelApiIdentifier = "shopifyShops";
;
;
;
;
;
;
;
;
;
const ShopifyShopManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyShopSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyShop",
      functionName: "update",
      errorMessage: "The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyShops",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "installShopifyShop",
      functionName: "install",
      errorMessage: "The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "install",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.install"
    },
    {
      type: "stubbedAction",
      operationName: "bulkInstallShopifyShops",
      functionName: "bulkInstall",
      errorMessage: "The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "install",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.bulkInstall"
    },
    {
      type: "stubbedAction",
      operationName: "reinstallShopifyShop",
      functionName: "reinstall",
      errorMessage: "The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "reinstall",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.reinstall"
    },
    {
      type: "stubbedAction",
      operationName: "bulkReinstallShopifyShops",
      functionName: "bulkReinstall",
      errorMessage: "The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "reinstall",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.bulkReinstall"
    },
    {
      type: "stubbedAction",
      operationName: "uninstallShopifyShop",
      functionName: "uninstall",
      errorMessage: "The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "uninstall",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.uninstall"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUninstallShopifyShops",
      functionName: "bulkUninstall",
      errorMessage: "The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "uninstall",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyShop.bulkUninstall"
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyShopSelection,
  ShopifyShopManager
});
//# sourceMappingURL=ShopifyShop.js.map
