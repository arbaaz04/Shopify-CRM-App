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
var OrderSyncQueue_exports = {};
__export(OrderSyncQueue_exports, {
  DefaultOrderSyncQueueSelection: () => DefaultOrderSyncQueueSelection,
  OrderSyncQueueManager: () => OrderSyncQueueManager
});
module.exports = __toCommonJS(OrderSyncQueue_exports);
var import_builder = require("../builder.js");
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
const OrderSyncQueueManager = (0, import_builder.buildModelManager)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultOrderSyncQueueSelection,
  OrderSyncQueueManager
});
//# sourceMappingURL=OrderSyncQueue.js.map
