import "path";

import { CreateShopifyCustomerActionContext } from "./models/ShopifyCustomer";

import { UpdateShopifyCustomerActionContext } from "./models/ShopifyCustomer";

import { DeleteShopifyCustomerActionContext } from "./models/ShopifyCustomer";

import { CreateShopifyGdprRequestActionContext } from "./models/ShopifyGdprRequest";

import { UpdateShopifyGdprRequestActionContext } from "./models/ShopifyGdprRequest";

import { CreateShopifyOrderActionContext } from "./models/ShopifyOrder";

import { UpdateShopifyOrderActionContext } from "./models/ShopifyOrder";

import { DeleteShopifyOrderActionContext } from "./models/ShopifyOrder";

import { UpdateShopifyShopActionContext } from "./models/ShopifyShop";

import { InstallShopifyShopActionContext } from "./models/ShopifyShop";

import { ReinstallShopifyShopActionContext } from "./models/ShopifyShop";

import { UninstallShopifyShopActionContext } from "./models/ShopifyShop";

import { AbortShopifySyncActionContext } from "./models/ShopifySync";

import { CompleteShopifySyncActionContext } from "./models/ShopifySync";

import { ErrorShopifySyncActionContext } from "./models/ShopifySync";

import { RunShopifySyncActionContext } from "./models/ShopifySync";

import { CreateGoogleSheetConfigActionContext } from "./models/GoogleSheetConfig";

import { UpdateGoogleSheetConfigActionContext } from "./models/GoogleSheetConfig";

import { DeleteGoogleSheetConfigActionContext } from "./models/GoogleSheetConfig";

import { CreateShopifyFulfillmentActionContext } from "./models/ShopifyFulfillment";

import { UpdateShopifyFulfillmentActionContext } from "./models/ShopifyFulfillment";

import { DeleteShopifyFulfillmentActionContext } from "./models/ShopifyFulfillment";

import { CreateShopifyFulfillmentOrderActionContext } from "./models/ShopifyFulfillmentOrder";

import { UpdateShopifyFulfillmentOrderActionContext } from "./models/ShopifyFulfillmentOrder";

import { DeleteShopifyFulfillmentOrderActionContext } from "./models/ShopifyFulfillmentOrder";

import { CreateShopifyFulfillmentServiceActionContext } from "./models/ShopifyFulfillmentService";

import { UpdateShopifyFulfillmentServiceActionContext } from "./models/ShopifyFulfillmentService";

import { DeleteShopifyFulfillmentServiceActionContext } from "./models/ShopifyFulfillmentService";

import { CreateShopifyProductActionContext } from "./models/ShopifyProduct";

import { UpdateShopifyProductActionContext } from "./models/ShopifyProduct";

import { DeleteShopifyProductActionContext } from "./models/ShopifyProduct";

import { CreateShopifyProductVariantActionContext } from "./models/ShopifyProductVariant";

import { UpdateShopifyProductVariantActionContext } from "./models/ShopifyProductVariant";

import { DeleteShopifyProductVariantActionContext } from "./models/ShopifyProductVariant";

import { CreateSenditConfigActionContext } from "./models/SenditConfig";

import { UpdateSenditConfigActionContext } from "./models/SenditConfig";

import { DeleteSenditConfigActionContext } from "./models/SenditConfig";

import { CreateSpeedafConfigActionContext } from "./models/SpeedafConfig";

import { UpdateSpeedafConfigActionContext } from "./models/SpeedafConfig";

import { DeleteSpeedafConfigActionContext } from "./models/SpeedafConfig";

import { FindFirstSpeedafConfigActionContext } from "./models/SpeedafConfig";

import { CreateCustomCityActionContext } from "./models/CustomCity";

import { UpdateCustomCityActionContext } from "./models/CustomCity";

import { DeleteCustomCityActionContext } from "./models/CustomCity";

import { CreateDeliveryChargesActionContext } from "./models/DeliveryCharges";

import { UpdateDeliveryChargesActionContext } from "./models/DeliveryCharges";

import { DeleteDeliveryChargesActionContext } from "./models/DeliveryCharges";

import { CreateBlacklistedPhoneActionContext } from "./models/BlacklistedPhone";

import { DeleteBlacklistedPhoneActionContext } from "./models/BlacklistedPhone";

import { ApplyDiscountsAndShippingGlobalActionContext } from "./global-actions";

import { ApplyShippingCostAbsorptionGlobalActionContext } from "./global-actions";

import { CalculateRefundGlobalActionContext } from "./global-actions";

import { CreateSenditOrderGlobalActionContext } from "./global-actions";

import { DebugOrderShippingGlobalActionContext } from "./global-actions";

import { DeleteSenditRecordGlobalActionContext } from "./global-actions";

import { DeleteSheetRowsByTrackingNumberGlobalActionContext } from "./global-actions";

import { DirectOrderTestGlobalActionContext } from "./global-actions";

import { ExtractOrderSKUsGlobalActionContext } from "./global-actions";

import { GetCustomCitiesGlobalActionContext } from "./global-actions";

import { GetDeliveryChargesGlobalActionContext } from "./global-actions";

import { GetSenditDistrictIdGlobalActionContext } from "./global-actions";

import { GetShippingCostGlobalActionContext } from "./global-actions";

import { ListRecentOrdersGlobalActionContext } from "./global-actions";

import { ProcessBulkReturnsGlobalActionContext } from "./global-actions";

import { ProcessOrderReturnGlobalActionContext } from "./global-actions";

import { ProcessSpeedafAPIGlobalActionContext } from "./global-actions";

import { RemoveOrderFromSheetsGlobalActionContext } from "./global-actions";

import { SearchBulkOrdersForReturnGlobalActionContext } from "./global-actions";

import { SearchOrderForReturnGlobalActionContext } from "./global-actions";

import { StandardizeMoroccanCityGlobalActionContext } from "./global-actions";

import { SyncOrdersGlobalActionContext } from "./global-actions";

import { TestGoogleAuthGlobalActionContext } from "./global-actions";

import { TestLocationQueryGlobalActionContext } from "./global-actions";

import { TestSenditConnectionGlobalActionContext } from "./global-actions";

import { TestSenditDeletionGlobalActionContext } from "./global-actions";

import { TestTrackingDetectionGlobalActionContext } from "./global-actions";

import { TestWriteToSheetGlobalActionContext } from "./global-actions";

import { TrackSpeedafOrdersGlobalActionContext } from "./global-actions";

import { UpdateDeliveryChargeGlobalActionContext } from "./global-actions";

import { UpdateReferenceTrackingGlobalActionContext } from "./global-actions";

import { WriteBatchOrdersToSheetsGlobalActionContext } from "./global-actions";

import { WriteSpeedafDataToSheetsGlobalActionContext } from "./global-actions";

import { WriteToShopifyGlobalActionContext } from "./global-actions";

import { ProcessBulkReturnsOldGlobalActionContext } from "./global-actions";

import { ProcessOrderReturnOldGlobalActionContext } from "./global-actions";




declare module "../../../api/models/shopifyCustomer/actions/create" {
  export type ActionRun = (params: CreateShopifyCustomerActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyCustomerActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCustomer/actions/update" {
  export type ActionRun = (params: UpdateShopifyCustomerActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyCustomerActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCustomer/actions/delete" {
  export type ActionRun = (params: DeleteShopifyCustomerActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyCustomerActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyGdprRequest/actions/create" {
  export type ActionRun = (params: CreateShopifyGdprRequestActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyGdprRequestActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyGdprRequest/actions/update" {
  export type ActionRun = (params: UpdateShopifyGdprRequestActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyGdprRequestActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/create" {
  export type ActionRun = (params: CreateShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/update" {
  export type ActionRun = (params: UpdateShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/delete" {
  export type ActionRun = (params: DeleteShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/update" {
  export type ActionRun = (params: UpdateShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/install" {
  export type ActionRun = (params: InstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: InstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/reinstall" {
  export type ActionRun = (params: ReinstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ReinstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/uninstall" {
  export type ActionRun = (params: UninstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UninstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/abort" {
  export type ActionRun = (params: AbortShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: AbortShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/complete" {
  export type ActionRun = (params: CompleteShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CompleteShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/error" {
  export type ActionRun = (params: ErrorShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ErrorShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/run" {
  export type ActionRun = (params: RunShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: RunShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/googleSheetConfig/actions/create" {
  export type ActionRun = (params: CreateGoogleSheetConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateGoogleSheetConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/googleSheetConfig/actions/update" {
  export type ActionRun = (params: UpdateGoogleSheetConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateGoogleSheetConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/googleSheetConfig/actions/delete" {
  export type ActionRun = (params: DeleteGoogleSheetConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteGoogleSheetConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillment/actions/create" {
  export type ActionRun = (params: CreateShopifyFulfillmentActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyFulfillmentActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillment/actions/update" {
  export type ActionRun = (params: UpdateShopifyFulfillmentActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyFulfillmentActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillment/actions/delete" {
  export type ActionRun = (params: DeleteShopifyFulfillmentActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyFulfillmentActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentOrder/actions/create" {
  export type ActionRun = (params: CreateShopifyFulfillmentOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyFulfillmentOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentOrder/actions/update" {
  export type ActionRun = (params: UpdateShopifyFulfillmentOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyFulfillmentOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentOrder/actions/delete" {
  export type ActionRun = (params: DeleteShopifyFulfillmentOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyFulfillmentOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentService/actions/create" {
  export type ActionRun = (params: CreateShopifyFulfillmentServiceActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyFulfillmentServiceActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentService/actions/update" {
  export type ActionRun = (params: UpdateShopifyFulfillmentServiceActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyFulfillmentServiceActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyFulfillmentService/actions/delete" {
  export type ActionRun = (params: DeleteShopifyFulfillmentServiceActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyFulfillmentServiceActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/create" {
  export type ActionRun = (params: CreateShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/update" {
  export type ActionRun = (params: UpdateShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/delete" {
  export type ActionRun = (params: DeleteShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProductVariant/actions/create" {
  export type ActionRun = (params: CreateShopifyProductVariantActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyProductVariantActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProductVariant/actions/update" {
  export type ActionRun = (params: UpdateShopifyProductVariantActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyProductVariantActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProductVariant/actions/delete" {
  export type ActionRun = (params: DeleteShopifyProductVariantActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyProductVariantActionContext) => Promise<any>;
}


declare module "../../../api/models/senditConfig/actions/create" {
  export type ActionRun = (params: CreateSenditConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateSenditConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/senditConfig/actions/update" {
  export type ActionRun = (params: UpdateSenditConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateSenditConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/senditConfig/actions/delete" {
  export type ActionRun = (params: DeleteSenditConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteSenditConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/speedafConfig/actions/create" {
  export type ActionRun = (params: CreateSpeedafConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateSpeedafConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/speedafConfig/actions/update" {
  export type ActionRun = (params: UpdateSpeedafConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateSpeedafConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/speedafConfig/actions/delete" {
  export type ActionRun = (params: DeleteSpeedafConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteSpeedafConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/speedafConfig/actions/findFirst" {
  export type ActionRun = (params: FindFirstSpeedafConfigActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: FindFirstSpeedafConfigActionContext) => Promise<any>;
}


declare module "../../../api/models/customCity/actions/create" {
  export type ActionRun = (params: CreateCustomCityActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateCustomCityActionContext) => Promise<any>;
}


declare module "../../../api/models/customCity/actions/update" {
  export type ActionRun = (params: UpdateCustomCityActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateCustomCityActionContext) => Promise<any>;
}


declare module "../../../api/models/customCity/actions/delete" {
  export type ActionRun = (params: DeleteCustomCityActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteCustomCityActionContext) => Promise<any>;
}


declare module "../../../api/models/deliveryCharges/actions/create" {
  export type ActionRun = (params: CreateDeliveryChargesActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateDeliveryChargesActionContext) => Promise<any>;
}


declare module "../../../api/models/deliveryCharges/actions/update" {
  export type ActionRun = (params: UpdateDeliveryChargesActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateDeliveryChargesActionContext) => Promise<any>;
}


declare module "../../../api/models/deliveryCharges/actions/delete" {
  export type ActionRun = (params: DeleteDeliveryChargesActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteDeliveryChargesActionContext) => Promise<any>;
}


declare module "../../../api/models/blacklistedPhone/actions/create" {
  export type ActionRun = (params: CreateBlacklistedPhoneActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateBlacklistedPhoneActionContext) => Promise<any>;
}


declare module "../../../api/models/blacklistedPhone/actions/delete" {
  export type ActionRun = (params: DeleteBlacklistedPhoneActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteBlacklistedPhoneActionContext) => Promise<any>;
}


declare module "../../../api/actions/applyDiscountsAndShipping" {
  export type ActionRun = (params: ApplyDiscountsAndShippingGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ApplyDiscountsAndShippingGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/applyShippingCostAbsorption" {
  export type ActionRun = (params: ApplyShippingCostAbsorptionGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ApplyShippingCostAbsorptionGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/calculateRefund" {
  export type ActionRun = (params: CalculateRefundGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CalculateRefundGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/createSenditOrder" {
  export type ActionRun = (params: CreateSenditOrderGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateSenditOrderGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/debugOrderShipping" {
  export type ActionRun = (params: DebugOrderShippingGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DebugOrderShippingGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/deleteSenditRecord" {
  export type ActionRun = (params: DeleteSenditRecordGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteSenditRecordGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/deleteSheetRowsByTrackingNumber" {
  export type ActionRun = (params: DeleteSheetRowsByTrackingNumberGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteSheetRowsByTrackingNumberGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/directOrderTest" {
  export type ActionRun = (params: DirectOrderTestGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DirectOrderTestGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/extractOrderSKUs" {
  export type ActionRun = (params: ExtractOrderSKUsGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ExtractOrderSKUsGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/getCustomCities" {
  export type ActionRun = (params: GetCustomCitiesGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: GetCustomCitiesGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/getDeliveryCharges" {
  export type ActionRun = (params: GetDeliveryChargesGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: GetDeliveryChargesGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/getSenditDistrictId" {
  export type ActionRun = (params: GetSenditDistrictIdGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: GetSenditDistrictIdGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/getShippingCost" {
  export type ActionRun = (params: GetShippingCostGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: GetShippingCostGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/listRecentOrders" {
  export type ActionRun = (params: ListRecentOrdersGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ListRecentOrdersGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processBulkReturns" {
  export type ActionRun = (params: ProcessBulkReturnsGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessBulkReturnsGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processOrderReturn" {
  export type ActionRun = (params: ProcessOrderReturnGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessOrderReturnGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processSpeedafAPI" {
  export type ActionRun = (params: ProcessSpeedafAPIGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessSpeedafAPIGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/removeOrderFromSheets" {
  export type ActionRun = (params: RemoveOrderFromSheetsGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: RemoveOrderFromSheetsGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/searchBulkOrdersForReturn" {
  export type ActionRun = (params: SearchBulkOrdersForReturnGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: SearchBulkOrdersForReturnGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/searchOrderForReturn" {
  export type ActionRun = (params: SearchOrderForReturnGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: SearchOrderForReturnGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/standardizeMoroccanCity" {
  export type ActionRun = (params: StandardizeMoroccanCityGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: StandardizeMoroccanCityGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/syncOrders" {
  export type ActionRun = (params: SyncOrdersGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: SyncOrdersGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testGoogleAuth" {
  export type ActionRun = (params: TestGoogleAuthGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestGoogleAuthGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testLocationQuery" {
  export type ActionRun = (params: TestLocationQueryGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestLocationQueryGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testSenditConnection" {
  export type ActionRun = (params: TestSenditConnectionGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestSenditConnectionGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testSenditDeletion" {
  export type ActionRun = (params: TestSenditDeletionGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestSenditDeletionGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testTrackingDetection" {
  export type ActionRun = (params: TestTrackingDetectionGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestTrackingDetectionGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/testWriteToSheet" {
  export type ActionRun = (params: TestWriteToSheetGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TestWriteToSheetGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/trackSpeedafOrders" {
  export type ActionRun = (params: TrackSpeedafOrdersGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: TrackSpeedafOrdersGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/updateDeliveryCharge" {
  export type ActionRun = (params: UpdateDeliveryChargeGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateDeliveryChargeGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/updateReferenceTracking" {
  export type ActionRun = (params: UpdateReferenceTrackingGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateReferenceTrackingGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/writeBatchOrdersToSheets" {
  export type ActionRun = (params: WriteBatchOrdersToSheetsGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: WriteBatchOrdersToSheetsGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/writeSpeedafDataToSheets" {
  export type ActionRun = (params: WriteSpeedafDataToSheetsGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: WriteSpeedafDataToSheetsGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/writeToShopify" {
  export type ActionRun = (params: WriteToShopifyGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: WriteToShopifyGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processBulkReturns_old" {
  export type ActionRun = (params: ProcessBulkReturnsOldGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessBulkReturnsOldGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processOrderReturn_old" {
  export type ActionRun = (params: ProcessOrderReturnOldGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessOrderReturnOldGlobalActionContext) => Promise<any>;
}

