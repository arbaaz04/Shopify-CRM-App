import { buildModelManager } from "../builder.js";
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
const ShopifyShopManager = buildModelManager(
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
export {
  DefaultShopifyShopSelection,
  ShopifyShopManager
};
//# sourceMappingURL=ShopifyShop.js.map
