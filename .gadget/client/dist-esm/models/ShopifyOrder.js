import { buildModelManager } from "../builder.js";
const DefaultShopifyOrderSelection = {
  __typename: true,
  id: true,
  additionalFees: true,
  autoWrite: true,
  billingAddress: true,
  browserIp: true,
  buyerAcceptsMarketing: true,
  cancelReason: true,
  cancellation: true,
  cancelledAt: true,
  cartToken: true,
  checkoutToken: true,
  clientDetails: true,
  closedAt: true,
  createdAt: true,
  currency: true,
  customerId: true,
  customerLocale: true,
  discountApplications: true,
  discountCodes: true,
  email: true,
  estimatedTaxes: true,
  financialStatus: true,
  fulfillmentStatus: true,
  landingSite: true,
  name: true,
  note: true,
  noteAttributes: true,
  orderStatusUrl: true,
  paymentGatewayNames: true,
  presentmentCurrency: true,
  processedAt: true,
  processingMethod: true,
  shippingAddress: true,
  shopId: true,
  shopifyShopId: true,
  sourceName: true,
  subtotalPrice: true,
  subtotalPriceSet: true,
  tags: true,
  taxLines: true,
  taxesIncluded: true,
  test: true,
  totalDiscounts: true,
  totalDiscountsSet: true,
  totalLineItemsPrice: true,
  totalLineItemsPriceSet: true,
  totalOutstanding: true,
  totalPrice: true,
  totalPriceSet: true,
  totalTax: true,
  totalTaxSet: true,
  totalTipReceived: true,
  totalWeight: true,
  updatedAt: true,
  writeOrder: true
};
const modelApiIdentifier = "shopifyOrder";
const pluralModelApiIdentifier = "shopifyOrders";
;
;
;
;
;
;
;
;
const ShopifyOrderManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyOrderSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyOrder",
      functionName: "create",
      errorMessage: "The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyOrder.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyOrders",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyOrder.bulkCreate"
    },
    {
      type: "action",
      operationName: "updateShopifyOrder",
      operationReturnType: "UpdateShopifyOrder",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        shopifyOrder: { required: false, type: "UpdateShopifyOrderInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifyOrderSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateShopifyOrders",
      functionName: "bulkUpdate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "update",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpdateShopifyOrdersInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifyOrderSelection
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyOrder",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyOrder.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyOrders",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyOrder.bulkDelete"
    }
  ]
);
export {
  DefaultShopifyOrderSelection,
  ShopifyOrderManager
};
//# sourceMappingURL=ShopifyOrder.js.map
