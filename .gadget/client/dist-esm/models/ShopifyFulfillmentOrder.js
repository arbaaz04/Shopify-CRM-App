import { buildModelManager } from "../builder.js";
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
const ShopifyFulfillmentOrderManager = buildModelManager(
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
export {
  DefaultShopifyFulfillmentOrderSelection,
  ShopifyFulfillmentOrderManager
};
//# sourceMappingURL=ShopifyFulfillmentOrder.js.map
