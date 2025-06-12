import { buildModelManager } from "../builder.js";
const DefaultSenditConfigSelection = {
  __typename: true,
  id: true,
  accountType: true,
  createdAt: true,
  lastAuthenticated: true,
  name: true,
  publicKey: true,
  secretKey: true,
  shopId: true,
  token: true,
  updatedAt: true
};
const modelApiIdentifier = "senditConfig";
const pluralModelApiIdentifier = "senditConfigs";
;
;
;
;
;
;
;
;
;
const SenditConfigManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultSenditConfigSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createSenditConfig",
      operationReturnType: "CreateSenditConfig",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        senditConfig: { required: false, type: "CreateSenditConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: "action",
      operationName: "bulkCreateSenditConfigs",
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
        inputs: { required: true, type: "[BulkCreateSenditConfigsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: "action",
      operationName: "updateSenditConfig",
      operationReturnType: "UpdateSenditConfig",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        senditConfig: { required: false, type: "UpdateSenditConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: "action",
      operationName: "bulkUpdateSenditConfigs",
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
        inputs: { required: true, type: "[BulkUpdateSenditConfigsInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: "action",
      operationName: "deleteSenditConfig",
      operationReturnType: "DeleteSenditConfig",
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
      operationName: "bulkDeleteSenditConfigs",
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
      operationName: "upsertSenditConfig",
      operationReturnType: "UpsertSenditConfig",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        senditConfig: { required: false, type: "UpsertSenditConfigInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateSenditConfigResult": { hasReturnType: false },
        "... on UpdateSenditConfigResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: "action",
      operationName: "bulkUpsertSenditConfigs",
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
        inputs: { required: true, type: "[BulkUpsertSenditConfigsInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultSenditConfigSelection
    }
  ]
);
export {
  DefaultSenditConfigSelection,
  SenditConfigManager
};
//# sourceMappingURL=SenditConfig.js.map
