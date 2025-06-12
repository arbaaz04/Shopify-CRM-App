import { buildModelManager } from "../builder.js";
const DefaultGoogleSheetConfigSelection = {
  __typename: true,
  id: true,
  courierApiKey: true,
  courierApiProvider: true,
  createdAt: true,
  customerSheetName: true,
  orderSheetName: true,
  shopId: true,
  spreadsheetId: true,
  updatedAt: true
};
const modelApiIdentifier = "googleSheetConfig";
const pluralModelApiIdentifier = "googleSheetConfigs";
;
;
;
;
;
;
;
;
;
const GoogleSheetConfigManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultGoogleSheetConfigSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultGoogleSheetConfigSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createGoogleSheetConfig",
      operationReturnType: "CreateGoogleSheetConfig",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        googleSheetConfig: { required: false, type: "CreateGoogleSheetConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultGoogleSheetConfigSelection
    },
    {
      type: "action",
      operationName: "bulkCreateGoogleSheetConfigs",
      functionName: "bulkCreate",
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: "create",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: "[BulkCreateGoogleSheetConfigsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultGoogleSheetConfigSelection
    },
    {
      type: "action",
      operationName: "updateGoogleSheetConfig",
      operationReturnType: "UpdateGoogleSheetConfig",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        googleSheetConfig: { required: false, type: "UpdateGoogleSheetConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultGoogleSheetConfigSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateGoogleSheetConfigs",
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
        inputs: { required: true, type: "[BulkUpdateGoogleSheetConfigsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultGoogleSheetConfigSelection
    },
    {
      type: "action",
      operationName: "deleteGoogleSheetConfig",
      operationReturnType: "DeleteGoogleSheetConfig",
      functionName: "delete",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: "GadgetID" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "bulkDeleteGoogleSheetConfigs",
      functionName: "bulkDelete",
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: "delete",
      modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { ids: { required: true, type: "[GadgetID!]" } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: "action",
      operationName: "upsertGoogleSheetConfig",
      operationReturnType: "UpsertGoogleSheetConfig",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        googleSheetConfig: { required: false, type: "UpsertGoogleSheetConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateGoogleSheetConfigResult": { hasReturnType: false },
        "... on UpdateGoogleSheetConfigResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultGoogleSheetConfigSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertGoogleSheetConfigs",
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
        inputs: { required: true, type: "[BulkUpsertGoogleSheetConfigsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultGoogleSheetConfigSelection
    }
  ]
);
export {
  DefaultGoogleSheetConfigSelection,
  GoogleSheetConfigManager
};
//# sourceMappingURL=GoogleSheetConfig.js.map
