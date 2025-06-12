import { buildModelManager } from "../builder.js";
const DefaultSenditTrackingSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  data: true,
  fee: true,
  orderId: true,
  status: true,
  trackingCode: true,
  updatedAt: true
};
const modelApiIdentifier = "senditTracking";
const pluralModelApiIdentifier = "senditTrackings";
;
;
;
;
;
const SenditTrackingManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultSenditTrackingSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultSenditTrackingSelection,
      namespace: null
    }
  ]
);
export {
  DefaultSenditTrackingSelection,
  SenditTrackingManager
};
//# sourceMappingURL=SenditTracking.js.map
