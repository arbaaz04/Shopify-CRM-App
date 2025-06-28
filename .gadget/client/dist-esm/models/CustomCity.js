import { buildModelManager } from "../builder.js";
const DefaultCustomCitySelection = {
  __typename: true,
  id: true,
  addedAt: true,
  courierType: true,
  createdAt: true,
  isActive: true,
  name: true,
  shopId: true,
  updatedAt: true
};
const modelApiIdentifier = "customCity";
const pluralModelApiIdentifier = "customCities";
;
;
;
;
;
;
;
;
;
const CustomCityManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultCustomCitySelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findByName",
      findByField: "name",
      findByVariableName: "name",
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindByName",
      findByField: "name",
      findByVariableName: "name",
      modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: "action",
      operationName: "createCustomCity",
      operationReturnType: "CreateCustomCity",
      functionName: "create",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: { customCity: { required: false, type: "CreateCustomCityInput" } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: "action",
      operationName: "bulkCreateCustomCities",
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
        inputs: { required: true, type: "[BulkCreateCustomCitiesInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: "action",
      operationName: "updateCustomCity",
      operationReturnType: "UpdateCustomCity",
      functionName: "update",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: "GadgetID" },
        customCity: { required: false, type: "UpdateCustomCityInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: "action",
      operationName: "bulkUpdateCustomCities",
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
        inputs: { required: true, type: "[BulkUpdateCustomCitiesInput!]" }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: "action",
      operationName: "deleteCustomCity",
      operationReturnType: "DeleteCustomCity",
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
      operationName: "bulkDeleteCustomCities",
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
      operationName: "upsertCustomCity",
      operationReturnType: "UpsertCustomCity",
      functionName: "upsert",
      namespace: null,
      modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: "[String!]" },
        customCity: { required: false, type: "UpsertCustomCityInput" }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: ["on"],
      hasReturnType: {
        "... on CreateCustomCityResult": { hasReturnType: false },
        "... on UpdateCustomCityResult": { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: "action",
      operationName: "bulkUpsertCustomCities",
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
        inputs: { required: true, type: "[BulkUpsertCustomCitiesInput!]" }
      },
      paramOnlyVariables: ["on"],
      defaultSelection: DefaultCustomCitySelection
    }
  ]
);
export {
  CustomCityManager,
  DefaultCustomCitySelection
};
//# sourceMappingURL=CustomCity.js.map
