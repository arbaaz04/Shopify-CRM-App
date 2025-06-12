import { buildModelManager } from "../builder.js";
const DefaultShopifyProductSelection = {
  __typename: true,
  id: true,
  body: true,
  category: true,
  compareAtPriceRange: true,
  createdAt: true,
  handle: true,
  hasVariantsThatRequiresComponents: true,
  productCategory: true,
  productType: true,
  publishedAt: true,
  shopId: true,
  shopifyCreatedAt: true,
  shopifyUpdatedAt: true,
  status: true,
  tags: true,
  templateSuffix: true,
  title: true,
  updatedAt: true,
  vendor: true
};
const modelApiIdentifier = "shopifyProduct";
const pluralModelApiIdentifier = "shopifyProducts";
;
;
;
;
;
;
;
;
const ShopifyProductManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyProductSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyProduct",
      functionName: "create",
      errorMessage: "The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyProducts",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyProduct",
      functionName: "update",
      errorMessage: "The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyProducts",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyProduct",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyProducts",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyProduct.bulkDelete"
    }
  ]
);
export {
  DefaultShopifyProductSelection,
  ShopifyProductManager
};
//# sourceMappingURL=ShopifyProduct.js.map
