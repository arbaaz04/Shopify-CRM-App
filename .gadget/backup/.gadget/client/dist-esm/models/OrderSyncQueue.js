import { buildModelManager } from "../builder.js";
const DefaultOrderSyncQueueSelection = {
  __typename: true,
  id: true,
  createdAt: true,
  lastErrorMessage: true,
  lastSyncAt: true,
  shopId: true,
  shopifyOrderId: true,
  status: true,
  syncAttempts: true,
  trackingId: true,
  trackingSyncedToSheet: true,
  updatedAt: true
};
const modelApiIdentifier = "orderSyncQueue";
const pluralModelApiIdentifier = "orderSyncQueues";
;
;
;
;
;
const OrderSyncQueueManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultOrderSyncQueueSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultOrderSyncQueueSelection,
      namespace: null
    }
  ]
);
export {
  DefaultOrderSyncQueueSelection,
  OrderSyncQueueManager
};
//# sourceMappingURL=OrderSyncQueue.js.map
