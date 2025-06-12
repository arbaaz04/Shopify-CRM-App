import { buildModelManager } from "../builder.js";
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
const ShopifyGdprRequestManager = buildModelManager(
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
export {
  DefaultShopifyGdprRequestSelection,
  ShopifyGdprRequestManager
};
//# sourceMappingURL=ShopifyGdprRequest.js.map
