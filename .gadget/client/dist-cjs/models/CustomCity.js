"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CustomCity_exports = {};
__export(CustomCity_exports, {
  CustomCityManager: () => CustomCityManager,
  DefaultCustomCitySelection: () => DefaultCustomCitySelection
});
module.exports = __toCommonJS(CustomCity_exports);
var import_builder = require("../builder.js");
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
const CustomCityManager = (0, import_builder.buildModelManager)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomCityManager,
  DefaultCustomCitySelection
});
//# sourceMappingURL=CustomCity.js.map
