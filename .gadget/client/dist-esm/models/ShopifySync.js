import { buildModelManager } from "../builder.js";
const DefaultShopifySyncSelection = {
  __typename: true,
  id: true,
  state: true,
  createdAt: true,
  domain: true,
  errorDetails: true,
  errorMessage: true,
  force: true,
  models: true,
  shopId: true,
  syncSince: true,
  updatedAt: true
};
const modelApiIdentifier = "shopifySync";
const pluralModelApiIdentifier = "shopifySyncs";
;
;
;
;
;
;
;
;
;
;
const ShopifySyncManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifySyncSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifySyncSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "abortShopifySync",
      operationReturnType: "AbortShopifySync",
      functionName: "abort",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        shopifySync: { required: false, type: "AbortShopifySyncInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "bulkAbortShopifySyncs",
      functionName: "bulkAbort",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "abort",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkAbortShopifySyncsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "completeShopifySync",
      operationReturnType: "CompleteShopifySync",
      functionName: "complete",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        shopifySync: { required: false, type: "CompleteShopifySyncInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "bulkCompleteShopifySyncs",
      functionName: "bulkComplete",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "complete",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCompleteShopifySyncsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "errorShopifySync",
      operationReturnType: "ErrorShopifySync",
      functionName: "error",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        shopifySync: { required: false, type: "ErrorShopifySyncInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "bulkErrorShopifySyncs",
      functionName: "bulkError",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "error",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkErrorShopifySyncsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "runShopifySync",
      operationReturnType: "RunShopifySync",
      functionName: "run",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        shopifySync: { required: false, type: "RunShopifySyncInput" },
        startReason: { required: false, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "bulkRunShopifySyncs",
      functionName: "bulkRun",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "run",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { inputs: { required: true, type: "[BulkRunShopifySyncsInput!]" } },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "upsertShopifySync",
      operationReturnType: "UpsertShopifySync",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        shopifySync: { required: false, type: "UpsertShopifySyncInput" },
        startReason: { required: false, type: "String" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on RunShopifySyncResult": { hasReturnType: false },
        "... on AbortShopifySyncResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifySyncSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertShopifySyncs",
      functionName: "bulkUpsert",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "upsert",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkUpsertShopifySyncsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultShopifySyncSelection
    }
  ]
);
export {
  DefaultShopifySyncSelection,
  ShopifySyncManager
};
//# sourceMappingURL=ShopifySync.js.map
