import { buildModelManager } from "../builder.js";
const DefaultBlacklistedPhoneSelection = {
  __typename: true,
  id: true,
  addedAt: true,
  createdAt: true,
  phone: true,
  shopId: true,
  updatedAt: true
};
const modelApiIdentifier = "blacklistedPhone";
const pluralModelApiIdentifier = "blacklistedPhones";
;
;
;
;
;
;
;
const BlacklistedPhoneManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultBlacklistedPhoneSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createBlacklistedPhone",
      operationReturnType: "CreateBlacklistedPhone",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        blacklistedPhone: { required: false, type: "CreateBlacklistedPhoneInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultBlacklistedPhoneSelection
    },
    {
      type: "action",
      operationName: "bulkCreateBlacklistedPhones",
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
        inputs: { required: true, type: "[BulkCreateBlacklistedPhonesInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultBlacklistedPhoneSelection
    },
    {
      type: "action",
      operationName: "deleteBlacklistedPhone",
      operationReturnType: "DeleteBlacklistedPhone",
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
      operationName: "bulkDeleteBlacklistedPhones",
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
    }
  ]
);
export {
  BlacklistedPhoneManager,
  DefaultBlacklistedPhoneSelection
};
//# sourceMappingURL=BlacklistedPhone.js.map
