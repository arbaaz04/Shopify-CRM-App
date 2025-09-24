import type { AmbientContext } from "./AmbientContext";
import type { ActionTrigger, TriggerWithType, ActionExecutionScope } from "./types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { ShopifyWebhookTriggerForTopic } from "./WebhookPayloadTypes";

/** Context of the `applyDiscountsAndShipping` action. */
export interface ApplyDiscountsAndShippingGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
testMode?: boolean;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ApplyDiscountsAndShippingGlobalActionContext;
};


/** Context of the `applyShippingCostAbsorption` action. */
export interface ApplyShippingCostAbsorptionGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ApplyShippingCostAbsorptionGlobalActionContext;
};


/** Context of the `calculateRefund` action. */
export interface CalculateRefundGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;    
lineItems?: { lineItemId?: string;quantity?: number;reason?: string; }[];    
refundShipping?: boolean;    
reason?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: CalculateRefundGlobalActionContext;
};


/** Context of the `createSenditOrder` action. */
export interface CreateSenditOrderGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: CreateSenditOrderGlobalActionContext;
};


/** Context of the `debugOrderShipping` action. */
export interface DebugOrderShippingGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: DebugOrderShippingGlobalActionContext;
};


/** Context of the `deleteSenditRecord` action. */
export interface DeleteSenditRecordGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: DeleteSenditRecordGlobalActionContext;
};


/** Context of the `deleteSheetRowsByTrackingNumber` action. */
export interface DeleteSheetRowsByTrackingNumberGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
trackingNumbers?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: DeleteSheetRowsByTrackingNumberGlobalActionContext;
};


/** Context of the `directOrderTest` action. */
export interface DirectOrderTestGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: DirectOrderTestGlobalActionContext;
};


/** Context of the `extractOrderSKUs` action. */
export interface ExtractOrderSKUsGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ExtractOrderSKUsGlobalActionContext;
};


/** Context of the `getCustomCities` action. */
export interface GetCustomCitiesGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: GetCustomCitiesGlobalActionContext;
};


/** Context of the `getDeliveryCharges` action. */
export interface GetDeliveryChargesGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: GetDeliveryChargesGlobalActionContext;
};


/** Context of the `getSenditDistrictId` action. */
export interface GetSenditDistrictIdGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: GetSenditDistrictIdGlobalActionContext;
};


/** Context of the `getShippingCost` action. */
export interface GetShippingCostGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: GetShippingCostGlobalActionContext;
};


/** Context of the `listRecentOrders` action. */
export interface ListRecentOrdersGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ListRecentOrdersGlobalActionContext;
};


/** Context of the `processBulkReturns` action. */
export interface ProcessBulkReturnsGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderSelections?: { orderId?: string;selectedItems?: { lineItemId?: string;quantity?: number; }[]; }[];    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ProcessBulkReturnsGlobalActionContext;
};


/** Context of the `processOrderReturn` action. */
export interface ProcessOrderReturnGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;    
lineItems?: { lineItemId?: string;quantity?: number;reason?: string; }[];    
refundShipping?: boolean;    
reason?: string;    
notify?: boolean;    
skipRefund?: boolean;    
inventoryOnlyReturn?: boolean;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ProcessOrderReturnGlobalActionContext;
};


/** Context of the `processSpeedafAPI` action. */
export interface ProcessSpeedafAPIGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
shopId?: string;    
requestData?: Scalars["JSONObject"];    
testMode?: boolean;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ProcessSpeedafAPIGlobalActionContext;
};


/** Context of the `removeOrderFromSheets` action. */
export interface RemoveOrderFromSheetsGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderName?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: RemoveOrderFromSheetsGlobalActionContext;
};


/** Context of the `searchBulkOrdersForReturn` action. */
export interface SearchBulkOrdersForReturnGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderNumbers?: string[];    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: SearchBulkOrdersForReturnGlobalActionContext;
};


/** Context of the `searchOrderForReturn` action. */
export interface SearchOrderForReturnGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderName?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: SearchOrderForReturnGlobalActionContext;
};


/** Context of the `standardizeMoroccanCity` action. */
export interface StandardizeMoroccanCityGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: StandardizeMoroccanCityGlobalActionContext;
};


/** Context of the `syncOrders` action. */
export interface SyncOrdersGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
limit?: number;    
orders?: { id?: string;name?: string;customerName?: string;phone?: string;address?: string;city?: string;rawCity?: string;lineItems?: { name?: string;quantity?: number;sku?: string;price?: string; }[];totalPrice?: string;displayFulfillmentStatus?: string;createdAt?: string;tags?: string[];trackingNumber?: string;isCancelled?: boolean;isDeleted?: boolean;isFulfillmentCancelled?: boolean; }[];
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action"> | TriggerWithType<"scheduler">;
  /**
  * @private The context of this action.
  */
  context: SyncOrdersGlobalActionContext;
};


/** Context of the `testGoogleAuth` action. */
export interface TestGoogleAuthGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
shopId?: string;    
spreadsheetId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestGoogleAuthGlobalActionContext;
};


/** Context of the `testLocationQuery` action. */
export interface TestLocationQueryGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestLocationQueryGlobalActionContext;
};


/** Context of the `testSenditConnection` action. */
export interface TestSenditConnectionGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
publicKey?: string;    
secretKey?: string;    
saveToPersistent?: boolean;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestSenditConnectionGlobalActionContext;
};


/** Context of the `testSenditDeletion` action. */
export interface TestSenditDeletionGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestSenditDeletionGlobalActionContext;
};


/** Context of the `testTrackingDetection` action. */
export interface TestTrackingDetectionGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestTrackingDetectionGlobalActionContext;
};


/** Context of the `testWriteToSheet` action. */
export interface TestWriteToSheetGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
spreadsheetId?: string;    
sheetName?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TestWriteToSheetGlobalActionContext;
};


/** Context of the `trackSpeedafOrders` action. */
export interface TrackSpeedafOrdersGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
latestOrderName?: string;    
orderCount?: number;    
mode?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: TrackSpeedafOrdersGlobalActionContext;
};


/** Context of the `updateDeliveryCharge` action. */
export interface UpdateDeliveryChargeGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
senditCharge?: number;    
speedafCharge?: number;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: UpdateDeliveryChargeGlobalActionContext;
};


/** Context of the `updateReferenceTracking` action. */
export interface UpdateReferenceTrackingGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;    
referenceTrackingCode?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: UpdateReferenceTrackingGlobalActionContext;
};


/** Context of the `writeBatchOrdersToSheets` action. */
export interface WriteBatchOrdersToSheetsGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
ordersData?: string;    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: WriteBatchOrdersToSheetsGlobalActionContext;
};


/** Context of the `writeSpeedafDataToSheets` action. */
export interface WriteSpeedafDataToSheetsGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
shopId?: string;    
trackingData?: { trackingNumber?: string;latestStatus?: string; }[];
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: WriteSpeedafDataToSheetsGlobalActionContext;
};


/** Context of the `writeToShopify` action. */
export interface WriteToShopifyGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
shopId?: string;    
mutation?: string;    
variables?: Scalars["JSONObject"];
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: WriteToShopifyGlobalActionContext;
};


/** Context of the `processBulkReturns_old` action. */
export interface ProcessBulkReturnsOldGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderSelections?: { orderId?: string;selectedItems?: { lineItemId?: string;quantity?: number; }[]; }[];    
shopId?: string;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ProcessBulkReturnsOldGlobalActionContext;
};


/** Context of the `processOrderReturn_old` action. */
export interface ProcessOrderReturnOldGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {
orderId?: string;    
shopId?: string;    
lineItems?: { lineItemId?: string;quantity?: number;reason?: string; }[];    
refundShipping?: boolean;    
reason?: string;    
notify?: boolean;    
skipRefund?: boolean;
};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
  /**
  * @private The context of this action.
  */
  context: ProcessOrderReturnOldGlobalActionContext;
};


