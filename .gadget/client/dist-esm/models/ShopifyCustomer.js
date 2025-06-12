import { buildModelManager } from "../builder.js";
const DefaultShopifyCustomerSelection = {
  __typename: true,
  id: true,
  acceptsMarketing: true,
  acceptsMarketingUpdatedAt: true,
  createdAt: true,
  currency: true,
  email: true,
  emailMarketingConsent: true,
  firstName: true,
  lastName: true,
  lastOrderId: true,
  locale: true,
  marketingOptInLevel: true,
  multipassIdentifier: true,
  note: true,
  phone: true,
  shopId: true,
  shopifyCreatedAt: true,
  shopifyState: true,
  shopifyUpdatedAt: true,
  smsMarketingConsent: true,
  statistics: true,
  tags: true,
  taxExempt: true,
  taxExemptions: true,
  updatedAt: true,
  verifiedEmail: true
};
const modelApiIdentifier = "shopifyCustomer";
const pluralModelApiIdentifier = "shopifyCustomers";
;
;
;
;
;
;
;
;
const ShopifyCustomerManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCustomerSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyCustomer",
      functionName: "create",
      errorMessage: "The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyCustomers",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyCustomer",
      functionName: "update",
      errorMessage: "The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyCustomers",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyCustomer",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyCustomers",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCustomer.bulkDelete"
    }
  ]
);
export {
  DefaultShopifyCustomerSelection,
  ShopifyCustomerManager
};
//# sourceMappingURL=ShopifyCustomer.js.map
