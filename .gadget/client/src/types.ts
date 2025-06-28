import { FieldSelection, FilterNever } from "@gadgetinc/api-client-core";
import { ComputedViewWithoutVariables, ComputedViewWithVariables, ComputedViewFunctionWithoutVariables, ComputedViewFunctionWithVariables } from "./computedViews.js";

export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }


export enum GadgetFieldType {
  Any,
  Array,
  BelongsTo,
  Boolean,
  Code,
  Color,
  Computed,
  DateTime,
  Email,
  EncryptedString,
  Enum,
  File,
  HasMany,
  HasManyThrough,
  HasOne,
  ID,
  JSON,
  Money,
  Null,
  Number,
  Object,
  Password,
  RecordState,
  RichText,
  RoleAssignments,
  String,
  URL,
  Vector,
}


export enum BackgroundActionPriority {
  DEFAULT,
  HIGH,
  LOW,
  PLATFORM,
}


export enum BackgroundActionOutcome {
  failed,
  completed,
}



export type GadgetFieldValidationUnion = AvailableGadgetRegexFieldValidationSelection | AvailableGadgetRangeFieldValidationSelection | AvailableGadgetOnlyImageFileFieldValidationSelection | AvailableGadgetGenericFieldValidationSelection;


export type AvailableGadgetFieldValidationUnionSelection = GadgetRegexFieldValidation | GadgetRangeFieldValidation | GadgetOnlyImageFileFieldValidation | GadgetGenericFieldValidation;

/** Represents the possible values of the Cancel Reason enum. */
export type ShopifyOrderCancelReasonEnum = "CUSTOMER" | "DECLINED" | "FRAUD" | "INVENTORY" | "OTHER" | "STAFF" | string;

/** Represents the possible values of the Currency enum. */
export type ShopifyOrderCurrencyEnum = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BYR" | "BZD" | "CAD" | "CDF" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JEP" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KID" | "KMF" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LVL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "UYU" | "UZS" | "VEF" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XXX" | "YER" | "ZAR" | "ZMW" | string;

/** Represents the possible values of the Financial Status enum. */
export type ShopifyOrderFinancialStatusEnum = "AUTHORIZED" | "EXPIRED" | "PAID" | "PARTIALLY_PAID" | "PARTIALLY_REFUNDED" | "PENDING" | "REFUNDED" | "VOIDED" | string;

/** Represents the possible values of the Fulfillment Status enum. */
export type ShopifyOrderFulfillmentStatusEnum = "FULFILLED" | "IN_PROGRESS" | "ON_HOLD" | "OPEN" | "PARTIALLY_FULFILLED" | "PENDING_FULFILLMENT" | "REQUEST_DECLINED" | "RESTOCKED" | "SCHEDULED" | "UNFULFILLED" | string;

/** Represents the possible values of the Presentment Currency enum. */
export type ShopifyOrderPresentmentCurrencyEnum = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BYR" | "BZD" | "CAD" | "CDF" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JEP" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KID" | "KMF" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LVL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "UYU" | "UZS" | "VEF" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XXX" | "YER" | "ZAR" | "ZMW" | string;

/** Represents the possible values of the Status enum. */
export type ShopifyFulfillmentStatusEnum = "CANCELLED" | "ERROR" | "FAILURE" | "SUCCESS" | "OPEN" | "PENDING" | string;

/** Represents the possible values of the Currency enum. */
export type ShopifyShopCurrencyEnum = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BYR" | "BZD" | "CAD" | "CDF" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JEP" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KID" | "KMF" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LVL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "UYU" | "UZS" | "VEF" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XXX" | "YER" | "ZAR" | "ZMW" | string;

/** Represents the possible values of the Enabled Presentment Currencies enum. */
export type ShopifyShopEnabledPresentmentCurrenciesEnum = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BYR" | "BZD" | "CAD" | "CDF" | "CHF" | "CLP" | "CNY" | "COP" | "CRC" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JEP" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KID" | "KMF" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LVL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "UYU" | "UZS" | "VEF" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XXX" | "YER" | "ZAR" | "ZMW" | string;

/** A sort order for a field. Can be Ascending or Descending. */
export type SortOrder = "Ascending"|"Descending";

/** The `StateValue` scalar type represents an input value for a recordState field. It can be a string, like 'created.active', or a JSON object, like { created: 'active' }. */
export type StateValue = any;

/** Represents the possible values of the Topic enum. */
export type ShopifyGdprRequestTopicEnum = "customers/data_request" | "customers/redact" | "shop/redact";

/** Represents the possible values of the Request Status enum. */
export type ShopifyFulfillmentOrderRequestStatusEnum = "UNSUBMITTED" | "SUBMITTED" | "ACCEPTED" | "REJECTED" | "CANCELLATION_REQUESTED" | "CANCELLATION_ACCEPTED" | "CANCELLATION_REJECTED" | "CLOSED" | string;

/** Represents the possible values of the Status enum. */
export type ShopifyFulfillmentOrderStatusEnum = "OPEN" | "IN_PROGRESS" | "CANCELLED" | "INCOMPLETE" | "CLOSED" | "SCHEDULED" | "ON_HOLD" | string;

/** Represents the possible values of the Type enum. */
export type ShopifyFulfillmentServiceTypeEnum = "GIFT_CARD" | "MANUAL" | "THIRD_PARTY" | string;

/** Represents the possible values of the Status enum. */
export type ShopifyProductStatusEnum = "active" | "archived" | "draft";

/** Represents the possible values of the Shopify State enum. */
export type ShopifyCustomerShopifyStateEnum = "DISABLED" | "INVITED" | "ENABLED" | "DECLINED" | string;

/** Represents the possible values of the Tax Exemptions enum. */
export type ShopifyCustomerTaxExemptionsEnum = "CA_BC_COMMERCIAL_FISHERY_EXEMPTION" | "CA_BC_CONTRACTOR_EXEMPTION" | "CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION" | "CA_BC_RESELLER_EXEMPTION" | "CA_BC_SUB_CONTRACTOR_EXEMPTION" | "CA_DIPLOMAT_EXEMPTION" | "CA_MB_COMMERCIAL_FISHERY_EXEMPTION" | "CA_MB_FARMER_EXEMPTION" | "CA_MB_RESELLER_EXEMPTION" | "CA_NS_COMMERCIAL_FISHERY_EXEMPTION" | "CA_NS_FARMER_EXEMPTION" | "CA_ON_PURCHASE_EXEMPTION" | "CA_PE_COMMERCIAL_FISHERY_EXEMPTION" | "CA_SK_COMMERCIAL_FISHERY_EXEMPTION" | "CA_SK_CONTRACTOR_EXEMPTION" | "CA_SK_FARMER_EXEMPTION" | "CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION" | "CA_SK_RESELLER_EXEMPTION" | "CA_SK_SUB_CONTRACTOR_EXEMPTION" | "CA_STATUS_CARD_EXEMPTION" | "EU_REVERSE_CHARGE_EXEMPTION_RULE" | "US_AK_RESELLER_EXEMPTION" | "US_AL_RESELLER_EXEMPTION" | "US_AR_RESELLER_EXEMPTION" | "US_AZ_RESELLER_EXEMPTION" | "US_CA_RESELLER_EXEMPTION" | "US_CO_RESELLER_EXEMPTION" | "US_CT_RESELLER_EXEMPTION" | "US_DC_RESELLER_EXEMPTION" | "US_DE_RESELLER_EXEMPTION" | "US_FL_RESELLER_EXEMPTION" | "US_GA_RESELLER_EXEMPTION" | "US_HI_RESELLER_EXEMPTION" | "US_IA_RESELLER_EXEMPTION" | "US_ID_RESELLER_EXEMPTION" | "US_IL_RESELLER_EXEMPTION" | "US_IN_RESELLER_EXEMPTION" | "US_KS_RESELLER_EXEMPTION" | "US_KY_RESELLER_EXEMPTION" | "US_LA_RESELLER_EXEMPTION" | "US_MA_RESELLER_EXEMPTION" | "US_MD_RESELLER_EXEMPTION" | "US_ME_RESELLER_EXEMPTION" | "US_MI_RESELLER_EXEMPTION" | "US_MN_RESELLER_EXEMPTION" | "US_MO_RESELLER_EXEMPTION" | "US_MS_RESELLER_EXEMPTION" | "US_MT_RESELLER_EXEMPTION" | "US_NC_RESELLER_EXEMPTION" | "US_ND_RESELLER_EXEMPTION" | "US_NE_RESELLER_EXEMPTION" | "US_NH_RESELLER_EXEMPTION" | "US_NJ_RESELLER_EXEMPTION" | "US_NM_RESELLER_EXEMPTION" | "US_NV_RESELLER_EXEMPTION" | "US_NY_RESELLER_EXEMPTION" | "US_OH_RESELLER_EXEMPTION" | "US_OK_RESELLER_EXEMPTION" | "US_OR_RESELLER_EXEMPTION" | "US_PA_RESELLER_EXEMPTION" | "US_RI_RESELLER_EXEMPTION" | "US_SC_RESELLER_EXEMPTION" | "US_SD_RESELLER_EXEMPTION" | "US_TN_RESELLER_EXEMPTION" | "US_TX_RESELLER_EXEMPTION" | "US_UT_RESELLER_EXEMPTION" | "US_VA_RESELLER_EXEMPTION" | "US_VT_RESELLER_EXEMPTION" | "US_WA_RESELLER_EXEMPTION" | "US_WI_RESELLER_EXEMPTION" | "US_WV_RESELLER_EXEMPTION" | "US_WY_RESELLER_EXEMPTION" | string;

/** Represents the possible values of the courierType enum. */
export type CustomCityCourierTypeEnum = "sendit" | "speedaf" | "general";

/** Represents one shopifyCustomer result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyCustomerRecord = Scalars["JSONObject"];

/** Represents one shopifyGdprRequest result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyGdprRequestRecord = Scalars["JSONObject"];

/** Represents one shopifyOrder result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyOrderRecord = Scalars["JSONObject"];

/** Represents one shopifyShop result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyShopRecord = Scalars["JSONObject"];

/** Represents one shopifySync result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifySyncRecord = Scalars["JSONObject"];

/** Represents one googleSheetConfig result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalGoogleSheetConfigRecord = Scalars["JSONObject"];

/** Represents one session result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalSessionRecord = Scalars["JSONObject"];

/** Represents one shopifyFulfillment result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyFulfillmentRecord = Scalars["JSONObject"];

/** Represents one shopifyFulfillmentOrder result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyFulfillmentOrderRecord = Scalars["JSONObject"];

/** Represents one shopifyFulfillmentService result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyFulfillmentServiceRecord = Scalars["JSONObject"];

/** Represents one shopifyProduct result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyProductRecord = Scalars["JSONObject"];

/** Represents one shopifyProductVariant result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalShopifyProductVariantRecord = Scalars["JSONObject"];

/** Represents one senditConfig result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalSenditConfigRecord = Scalars["JSONObject"];

/** Represents one speedafConfig result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalSpeedafConfigRecord = Scalars["JSONObject"];

/** Represents one customCity result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalCustomCityRecord = Scalars["JSONObject"];


export type BackgroundActionResult = AvailableCalculateRefundResultSelection | AvailableCreateSenditOrderResultSelection | AvailableDirectOrderTestResultSelection | AvailableExtractOrderSKUsResultSelection | AvailableFulfillOrderResultSelection | AvailableGetCombinedCityListResultSelection | AvailableGetCustomCitiesResultSelection | AvailableGetSenditDistrictIdResultSelection | AvailableProcessBulkReturnsResultSelection | AvailableProcessOrderReturnResultSelection | AvailableProcessSpeedafAPIResultSelection | AvailableRemoveOrderFromSheetsResultSelection | AvailableSearchBulkOrdersForReturnResultSelection | AvailableSearchOrderForReturnResultSelection | AvailableSenditFulfillOrderResultSelection | AvailableStandardizeMoroccanAddressResultSelection | AvailableStandardizeMoroccanCityResultSelection | AvailableSyncOrdersResultSelection | AvailableTestGoogleAuthResultSelection | AvailableTestLocationQueryResultSelection | AvailableTestOriginalCityExtractionResultSelection | AvailableTestSenditConnectionResultSelection | AvailableTestWriteToSheetResultSelection | AvailableTrackSpeedafOrdersResultSelection | AvailableUpdateReferenceTrackingResultSelection | AvailableWriteBatchOrdersToSheetsResultSelection | AvailableWriteSpeedafDataToSheetsResultSelection | AvailableWriteToShopifyResultSelection | AvailableUpdateShopifyOrderResultSelection | AvailableAbortShopifySyncResultSelection | AvailableCompleteShopifySyncResultSelection | AvailableErrorShopifySyncResultSelection | AvailableRunShopifySyncResultSelection | AvailableCreateGoogleSheetConfigResultSelection | AvailableUpdateGoogleSheetConfigResultSelection | AvailableDeleteGoogleSheetConfigResultSelection | AvailableCreateSenditConfigResultSelection | AvailableUpdateSenditConfigResultSelection | AvailableDeleteSenditConfigResultSelection | AvailableCreateSpeedafConfigResultSelection | AvailableUpdateSpeedafConfigResultSelection | AvailableDeleteSpeedafConfigResultSelection | AvailableFindFirstSpeedafConfigResultSelection | AvailableCreateCustomCityResultSelection | AvailableUpdateCustomCityResultSelection | AvailableDeleteCustomCityResultSelection;


export type AvailableBackgroundActionResultSelection = CalculateRefundResult | CreateSenditOrderResult | DirectOrderTestResult | ExtractOrderSKUsResult | FulfillOrderResult | GetCombinedCityListResult | GetCustomCitiesResult | GetSenditDistrictIdResult | ProcessBulkReturnsResult | ProcessOrderReturnResult | ProcessSpeedafAPIResult | RemoveOrderFromSheetsResult | SearchBulkOrdersForReturnResult | SearchOrderForReturnResult | SenditFulfillOrderResult | StandardizeMoroccanAddressResult | StandardizeMoroccanCityResult | SyncOrdersResult | TestGoogleAuthResult | TestLocationQueryResult | TestOriginalCityExtractionResult | TestSenditConnectionResult | TestWriteToSheetResult | TrackSpeedafOrdersResult | UpdateReferenceTrackingResult | WriteBatchOrdersToSheetsResult | WriteSpeedafDataToSheetsResult | WriteToShopifyResult | UpdateShopifyOrderResult | AbortShopifySyncResult | CompleteShopifySyncResult | ErrorShopifySyncResult | RunShopifySyncResult | CreateGoogleSheetConfigResult | UpdateGoogleSheetConfigResult | DeleteGoogleSheetConfigResult | CreateSenditConfigResult | UpdateSenditConfigResult | DeleteSenditConfigResult | CreateSpeedafConfigResult | UpdateSpeedafConfigResult | DeleteSpeedafConfigResult | FindFirstSpeedafConfigResult | CreateCustomCityResult | UpdateCustomCityResult | DeleteCustomCityResult;



export type ShopifySyncSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the state field. Defaults to ascending (smallest value first). */
  state?: SortOrder | null;

  /** Sort the results by the syncSince field. Defaults to ascending (smallest value first). */
  syncSince?: SortOrder | null;

  /** Sort the results by the domain field. Defaults to ascending (smallest value first). */
  domain?: SortOrder | null;

  /** Sort the results by the errorDetails field. Defaults to ascending (smallest value first). */
  errorDetails?: SortOrder | null;

  /** Sort the results by the errorMessage field. Defaults to ascending (smallest value first). */
  errorMessage?: SortOrder | null;

  /** Sort the results by the force field. Defaults to ascending (smallest value first). */
  force?: SortOrder | null;

  /** Sort the results by the models field. Defaults to ascending (smallest value first). */
  models?: SortOrder | null;
};



export type ShopifySyncFilter = {

  AND?: (ShopifySyncFilter | null)[];

  OR?: (ShopifySyncFilter | null)[];

  NOT?: (ShopifySyncFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  state?: StateFilter | null;

  syncSince?: DateTimeFilter | null;

  domain?: StringFilter | null;

  errorDetails?: StringFilter | null;

  errorMessage?: StringFilter | null;

  force?: BooleanFilter | null;

  models?: JSONFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type IDFilter = {

  equals?: (Scalars['GadgetID'] | null) | null;

  notEquals?: (Scalars['GadgetID'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['GadgetID'] | null) | null)[];

  notIn?: ((Scalars['GadgetID'] | null) | null)[];

  lessThan?: (Scalars['GadgetID'] | null) | null;

  lessThanOrEqual?: (Scalars['GadgetID'] | null) | null;

  greaterThan?: (Scalars['GadgetID'] | null) | null;

  greaterThanOrEqual?: (Scalars['GadgetID'] | null) | null;
};



export type DateTimeFilter = {

  equals?: Date | Scalars['ISO8601DateString'] | null;

  notEquals?: Date | Scalars['ISO8601DateString'] | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: (Date | Scalars['ISO8601DateString'] | null)[];

  notIn?: (Date | Scalars['ISO8601DateString'] | null)[];

  lessThan?: Date | Scalars['ISO8601DateString'] | null;

  lessThanOrEqual?: Date | Scalars['ISO8601DateString'] | null;

  greaterThan?: Date | Scalars['ISO8601DateString'] | null;

  greaterThanOrEqual?: Date | Scalars['ISO8601DateString'] | null;

  before?: Date | Scalars['ISO8601DateString'] | null;

  after?: Date | Scalars['ISO8601DateString'] | null;
};



export type StateFilter = {

  /** If true, return only records that have a state value set. If false, return only records that do not have a state value set. */
  isSet?: (Scalars['Boolean'] | null) | null;

  /** Return only records that are in this given state. The state must be specified as a dot separated string of nested state names, like 'created.installed' or 'deleted'. */
  inState?: (Scalars['String'] | null) | null;

  /** Return only records that are in this given state. The state can be specified as a dot separated string of nested state names, like 'created.installed' or 'deleted', or as a JSON object, like { created: 'active' }. */
  equals?: (Scalars['StateValue'] | null) | null;

  /** Return only records that are in any of these given states. The states can be specified as a dot separated string of nested state names, like 'created.installed' or 'deleted', or as a JSON object, like { created: 'active' }. */
  in?: ((Scalars['StateValue'] | null))[];

  /** Return only records that are not in any of these given states. The states can be specified as a dot separated string of nested state names, like 'created.installed' or 'deleted', or as a JSON object, like { created: 'active' }. */
  notIn?: ((Scalars['StateValue'] | null))[];

  /** Return only records that are not in this given state. The state value must be specified as a dot separated string of nested state names, like 'created.installed' or 'deleted', or as a JSON object, like { created: 'active' }. */
  notEquals?: (Scalars['StateValue'] | null) | null;
};



export type StringFilter = {

  equals?: (Scalars['String'] | null) | null;

  notEquals?: (Scalars['String'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['String'] | null) | null)[];

  notIn?: ((Scalars['String'] | null) | null)[];

  lessThan?: (Scalars['String'] | null) | null;

  lessThanOrEqual?: (Scalars['String'] | null) | null;

  greaterThan?: (Scalars['String'] | null) | null;

  greaterThanOrEqual?: (Scalars['String'] | null) | null;

  startsWith?: (Scalars['String'] | null) | null;
};



export type BooleanFilter = {

  isSet?: (Scalars['Boolean'] | null) | null;

  equals?: (Scalars['Boolean'] | null) | null;

  notEquals?: (Scalars['Boolean'] | null) | null;
};



export type JSONFilter = {

  isSet?: (Scalars['Boolean'] | null) | null;

  equals?: (Scalars['JSON'] | null) | null;

  in?: ((Scalars['JSON'] | null) | null)[];

  notIn?: ((Scalars['JSON'] | null) | null)[];

  notEquals?: (Scalars['JSON'] | null) | null;

  matches?: (Scalars['JSON'] | null) | null;
};



export type ShopifyShopRelationshipFilter = {

  AND?: (ShopifyShopRelationshipFilter | null)[];

  OR?: (ShopifyShopRelationshipFilter | null)[];

  NOT?: (ShopifyShopRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  state?: StateFilter | null;

  plan?: JSONFilter | null;

  address1?: StringFilter | null;

  address2?: StringFilter | null;

  city?: StringFilter | null;

  country?: StringFilter | null;

  countryCode?: StringFilter | null;

  countryName?: StringFilter | null;

  countyTaxes?: JSONFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  currency?: SingleEnumFilter | null;

  customerEmail?: StringFilter | null;

  disabledWebhooks?: JSONFilter | null;

  domain?: StringFilter | null;

  eligibleForPayments?: BooleanFilter | null;

  email?: StringFilter | null;

  enabledPresentmentCurrencies?: MultiEnumFilter | null;

  finances?: BooleanFilter | null;

  googleAppsDomain?: StringFilter | null;

  googleAppsLoginEnabled?: BooleanFilter | null;

  grantedScopes?: JSONFilter | null;

  hasDiscounts?: BooleanFilter | null;

  hasGiftCards?: BooleanFilter | null;

  hasStorefront?: BooleanFilter | null;

  ianaTimezone?: StringFilter | null;

  installedViaApiKey?: StringFilter | null;

  latitude?: FloatFilter | null;

  longitude?: FloatFilter | null;

  marketingSmsContentEnabledAtCheckout?: BooleanFilter | null;

  moneyFormat?: StringFilter | null;

  moneyInEmailsFormat?: StringFilter | null;

  moneyWithCurrencyFormat?: StringFilter | null;

  moneyWithCurrencyInEmailsFormat?: StringFilter | null;

  multiLocationEnabled?: BooleanFilter | null;

  myshopifyDomain?: StringFilter | null;

  name?: StringFilter | null;

  passwordEnabled?: BooleanFilter | null;

  phone?: StringFilter | null;

  planDisplayName?: StringFilter | null;

  planName?: StringFilter | null;

  preLaunchEnabled?: BooleanFilter | null;

  primaryLocale?: StringFilter | null;

  province?: StringFilter | null;

  provinceCode?: StringFilter | null;

  registeredWebhooks?: JSONFilter | null;

  requiresExtraPaymentsAgreement?: BooleanFilter | null;

  setupRequired?: BooleanFilter | null;

  shopOwner?: StringFilter | null;

  source?: StringFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  syncs?: ShopifySyncsRelationshipFilter | null;

  gdprRequests?: ShopifyGdprRequestsRelationshipFilter | null;

  fulfillmentOrders?: ShopifyFulfillmentOrdersRelationshipFilter | null;

  fulfillmentServices?: ShopifyFulfillmentServicesRelationshipFilter | null;

  fulfillments?: ShopifyFulfillmentsRelationshipFilter | null;

  customers?: ShopifyCustomersRelationshipFilter | null;

  orders?: ShopifyOrdersRelationshipFilter | null;

  productVariants?: ShopifyProductVariantsRelationshipFilter | null;

  products?: ShopifyProductsRelationshipFilter | null;
};



export type SingleEnumFilter = {

  isSet?: (Scalars['Boolean'] | null) | null;

  equals?: (Scalars['String'] | null) | null;

  notEquals?: (Scalars['String'] | null) | null;

  in?: ((Scalars['String'] | null) | null)[];
};



export type MultiEnumFilter = {

  isSet?: (Scalars['Boolean'] | null) | null;

  equals?: ((Scalars['String'] | null) | null)[];

  notEquals?: ((Scalars['String'] | null) | null)[];

  contains?: ((Scalars['String'] | null) | null)[];
};



export type FloatFilter = {

  equals?: (Scalars['Float'] | null) | null;

  notEquals?: (Scalars['Float'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['Float'] | null) | null)[];

  notIn?: ((Scalars['Float'] | null) | null)[];

  lessThan?: (Scalars['Float'] | null) | null;

  lessThanOrEqual?: (Scalars['Float'] | null) | null;

  greaterThan?: (Scalars['Float'] | null) | null;

  greaterThanOrEqual?: (Scalars['Float'] | null) | null;
};



export type ShopifySyncsRelationshipFilter = {

  some?: ShopifySyncsInnerRelationshipFilter | null;

  every?: ShopifySyncsInnerRelationshipFilter | null;
};



export type ShopifySyncsInnerRelationshipFilter = {

  AND?: (ShopifySyncsInnerRelationshipFilter | null)[];

  OR?: (ShopifySyncsInnerRelationshipFilter | null)[];

  NOT?: (ShopifySyncsInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  state?: StateFilter | null;

  syncSince?: DateTimeFilter | null;

  domain?: StringFilter | null;

  errorDetails?: StringFilter | null;

  errorMessage?: StringFilter | null;

  force?: BooleanFilter | null;

  models?: JSONFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyGdprRequestsRelationshipFilter = {

  some?: ShopifyGdprRequestsInnerRelationshipFilter | null;

  every?: ShopifyGdprRequestsInnerRelationshipFilter | null;
};



export type ShopifyGdprRequestsInnerRelationshipFilter = {

  AND?: (ShopifyGdprRequestsInnerRelationshipFilter | null)[];

  OR?: (ShopifyGdprRequestsInnerRelationshipFilter | null)[];

  NOT?: (ShopifyGdprRequestsInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  payload?: JSONFilter | null;

  topic?: SingleEnumFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyFulfillmentOrdersRelationshipFilter = {

  some?: ShopifyFulfillmentOrdersInnerRelationshipFilter | null;

  every?: ShopifyFulfillmentOrdersInnerRelationshipFilter | null;
};



export type ShopifyFulfillmentOrdersInnerRelationshipFilter = {

  AND?: (ShopifyFulfillmentOrdersInnerRelationshipFilter | null)[];

  OR?: (ShopifyFulfillmentOrdersInnerRelationshipFilter | null)[];

  NOT?: (ShopifyFulfillmentOrdersInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  fulfillAt?: DateTimeFilter | null;

  fulfillBy?: DateTimeFilter | null;

  internationalDuties?: JSONFilter | null;

  requestStatus?: SingleEnumFilter | null;

  status?: SingleEnumFilter | null;

  supportedActions?: JSONFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  orderId?: IDFilter | null;

  order?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyOrderRelationshipFilter = {

  AND?: (ShopifyOrderRelationshipFilter | null)[];

  OR?: (ShopifyOrderRelationshipFilter | null)[];

  NOT?: (ShopifyOrderRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  additionalFees?: JSONFilter | null;

  cancellation?: JSONFilter | null;

  billingAddress?: JSONFilter | null;

  browserIp?: StringFilter | null;

  buyerAcceptsMarketing?: BooleanFilter | null;

  cancelReason?: SingleEnumFilter | null;

  cancelledAt?: DateTimeFilter | null;

  cartToken?: StringFilter | null;

  checkoutToken?: StringFilter | null;

  clientDetails?: JSONFilter | null;

  closedAt?: DateTimeFilter | null;

  currency?: SingleEnumFilter | null;

  customerLocale?: StringFilter | null;

  discountApplications?: JSONFilter | null;

  discountCodes?: JSONFilter | null;

  email?: StringFilter | null;

  estimatedTaxes?: BooleanFilter | null;

  financialStatus?: SingleEnumFilter | null;

  fulfillmentStatus?: SingleEnumFilter | null;

  landingSite?: StringFilter | null;

  name?: StringFilter | null;

  note?: StringFilter | null;

  noteAttributes?: JSONFilter | null;

  orderStatusUrl?: StringFilter | null;

  paymentGatewayNames?: JSONFilter | null;

  presentmentCurrency?: SingleEnumFilter | null;

  processedAt?: DateTimeFilter | null;

  processingMethod?: StringFilter | null;

  shippingAddress?: JSONFilter | null;

  sourceName?: StringFilter | null;

  subtotalPrice?: StringFilter | null;

  subtotalPriceSet?: JSONFilter | null;

  tags?: JSONFilter | null;

  taxLines?: JSONFilter | null;

  taxesIncluded?: BooleanFilter | null;

  test?: BooleanFilter | null;

  totalDiscounts?: StringFilter | null;

  totalDiscountsSet?: JSONFilter | null;

  totalLineItemsPrice?: StringFilter | null;

  totalLineItemsPriceSet?: JSONFilter | null;

  totalOutstanding?: StringFilter | null;

  totalPrice?: StringFilter | null;

  totalPriceSet?: JSONFilter | null;

  totalTax?: StringFilter | null;

  totalTaxSet?: JSONFilter | null;

  totalTipReceived?: StringFilter | null;

  totalWeight?: FloatFilter | null;

  customerId?: IDFilter | null;

  customer?: ShopifyCustomerRelationshipFilter | null;

  fulfillments?: ShopifyFulfillmentsRelationshipFilter | null;

  shopifyShopId?: IDFilter | null;

  shopifyShop?: ShopifyShopRelationshipFilter | null;

  fulfillmentOrders?: ShopifyFulfillmentOrdersRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  writeOrder?: BooleanFilter | null;

  autoWrite?: BooleanFilter | null;
};



export type ShopifyCustomerRelationshipFilter = {

  AND?: (ShopifyCustomerRelationshipFilter | null)[];

  OR?: (ShopifyCustomerRelationshipFilter | null)[];

  NOT?: (ShopifyCustomerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  statistics?: JSONFilter | null;

  locale?: StringFilter | null;

  acceptsMarketing?: BooleanFilter | null;

  acceptsMarketingUpdatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  currency?: StringFilter | null;

  email?: StringFilter | null;

  emailMarketingConsent?: JSONFilter | null;

  firstName?: StringFilter | null;

  lastName?: StringFilter | null;

  marketingOptInLevel?: StringFilter | null;

  multipassIdentifier?: StringFilter | null;

  note?: StringFilter | null;

  orders?: ShopifyOrdersRelationshipFilter | null;

  phone?: StringFilter | null;

  smsMarketingConsent?: JSONFilter | null;

  shopifyState?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  taxExempt?: BooleanFilter | null;

  taxExemptions?: MultiEnumFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  verifiedEmail?: BooleanFilter | null;

  lastOrderId?: IDFilter | null;

  lastOrder?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyOrdersRelationshipFilter = {

  some?: ShopifyOrdersInnerRelationshipFilter | null;

  every?: ShopifyOrdersInnerRelationshipFilter | null;
};



export type ShopifyOrdersInnerRelationshipFilter = {

  AND?: (ShopifyOrdersInnerRelationshipFilter | null)[];

  OR?: (ShopifyOrdersInnerRelationshipFilter | null)[];

  NOT?: (ShopifyOrdersInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  additionalFees?: JSONFilter | null;

  cancellation?: JSONFilter | null;

  billingAddress?: JSONFilter | null;

  browserIp?: StringFilter | null;

  buyerAcceptsMarketing?: BooleanFilter | null;

  cancelReason?: SingleEnumFilter | null;

  cancelledAt?: DateTimeFilter | null;

  cartToken?: StringFilter | null;

  checkoutToken?: StringFilter | null;

  clientDetails?: JSONFilter | null;

  closedAt?: DateTimeFilter | null;

  currency?: SingleEnumFilter | null;

  customerLocale?: StringFilter | null;

  discountApplications?: JSONFilter | null;

  discountCodes?: JSONFilter | null;

  email?: StringFilter | null;

  estimatedTaxes?: BooleanFilter | null;

  financialStatus?: SingleEnumFilter | null;

  fulfillmentStatus?: SingleEnumFilter | null;

  landingSite?: StringFilter | null;

  name?: StringFilter | null;

  note?: StringFilter | null;

  noteAttributes?: JSONFilter | null;

  orderStatusUrl?: StringFilter | null;

  paymentGatewayNames?: JSONFilter | null;

  presentmentCurrency?: SingleEnumFilter | null;

  processedAt?: DateTimeFilter | null;

  processingMethod?: StringFilter | null;

  shippingAddress?: JSONFilter | null;

  sourceName?: StringFilter | null;

  subtotalPrice?: StringFilter | null;

  subtotalPriceSet?: JSONFilter | null;

  tags?: JSONFilter | null;

  taxLines?: JSONFilter | null;

  taxesIncluded?: BooleanFilter | null;

  test?: BooleanFilter | null;

  totalDiscounts?: StringFilter | null;

  totalDiscountsSet?: JSONFilter | null;

  totalLineItemsPrice?: StringFilter | null;

  totalLineItemsPriceSet?: JSONFilter | null;

  totalOutstanding?: StringFilter | null;

  totalPrice?: StringFilter | null;

  totalPriceSet?: JSONFilter | null;

  totalTax?: StringFilter | null;

  totalTaxSet?: JSONFilter | null;

  totalTipReceived?: StringFilter | null;

  totalWeight?: FloatFilter | null;

  customerId?: IDFilter | null;

  customer?: ShopifyCustomerRelationshipFilter | null;

  fulfillments?: ShopifyFulfillmentsRelationshipFilter | null;

  shopifyShopId?: IDFilter | null;

  shopifyShop?: ShopifyShopRelationshipFilter | null;

  fulfillmentOrders?: ShopifyFulfillmentOrdersRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  writeOrder?: BooleanFilter | null;

  autoWrite?: BooleanFilter | null;
};



export type ShopifyFulfillmentsRelationshipFilter = {

  some?: ShopifyFulfillmentsInnerRelationshipFilter | null;

  every?: ShopifyFulfillmentsInnerRelationshipFilter | null;
};



export type ShopifyFulfillmentsInnerRelationshipFilter = {

  AND?: (ShopifyFulfillmentsInnerRelationshipFilter | null)[];

  OR?: (ShopifyFulfillmentsInnerRelationshipFilter | null)[];

  NOT?: (ShopifyFulfillmentsInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  name?: StringFilter | null;

  originAddress?: JSONFilter | null;

  receipt?: JSONFilter | null;

  service?: StringFilter | null;

  shipmentStatus?: StringFilter | null;

  status?: SingleEnumFilter | null;

  trackingCompany?: StringFilter | null;

  trackingNumbers?: JSONFilter | null;

  trackingUrls?: JSONFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  orderId?: IDFilter | null;

  order?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyFulfillmentServicesRelationshipFilter = {

  some?: ShopifyFulfillmentServicesInnerRelationshipFilter | null;

  every?: ShopifyFulfillmentServicesInnerRelationshipFilter | null;
};



export type ShopifyFulfillmentServicesInnerRelationshipFilter = {

  AND?: (ShopifyFulfillmentServicesInnerRelationshipFilter | null)[];

  OR?: (ShopifyFulfillmentServicesInnerRelationshipFilter | null)[];

  NOT?: (ShopifyFulfillmentServicesInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  serviceName?: StringFilter | null;

  type?: SingleEnumFilter | null;

  adminGraphqlApiId?: StringFilter | null;

  callbackUrl?: StringFilter | null;

  format?: StringFilter | null;

  fulfillmentOrdersOptIn?: BooleanFilter | null;

  handle?: StringFilter | null;

  inventoryManagement?: BooleanFilter | null;

  name?: StringFilter | null;

  permitsSkuSharing?: BooleanFilter | null;

  requiresShippingMethod?: BooleanFilter | null;

  trackingSupport?: BooleanFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyCustomersRelationshipFilter = {

  some?: ShopifyCustomersInnerRelationshipFilter | null;

  every?: ShopifyCustomersInnerRelationshipFilter | null;
};



export type ShopifyCustomersInnerRelationshipFilter = {

  AND?: (ShopifyCustomersInnerRelationshipFilter | null)[];

  OR?: (ShopifyCustomersInnerRelationshipFilter | null)[];

  NOT?: (ShopifyCustomersInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  statistics?: JSONFilter | null;

  locale?: StringFilter | null;

  acceptsMarketing?: BooleanFilter | null;

  acceptsMarketingUpdatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  currency?: StringFilter | null;

  email?: StringFilter | null;

  emailMarketingConsent?: JSONFilter | null;

  firstName?: StringFilter | null;

  lastName?: StringFilter | null;

  marketingOptInLevel?: StringFilter | null;

  multipassIdentifier?: StringFilter | null;

  note?: StringFilter | null;

  orders?: ShopifyOrdersRelationshipFilter | null;

  phone?: StringFilter | null;

  smsMarketingConsent?: JSONFilter | null;

  shopifyState?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  taxExempt?: BooleanFilter | null;

  taxExemptions?: MultiEnumFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  verifiedEmail?: BooleanFilter | null;

  lastOrderId?: IDFilter | null;

  lastOrder?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyProductVariantsRelationshipFilter = {

  some?: ShopifyProductVariantsInnerRelationshipFilter | null;

  every?: ShopifyProductVariantsInnerRelationshipFilter | null;
};



export type ShopifyProductVariantsInnerRelationshipFilter = {

  AND?: (ShopifyProductVariantsInnerRelationshipFilter | null)[];

  OR?: (ShopifyProductVariantsInnerRelationshipFilter | null)[];

  NOT?: (ShopifyProductVariantsInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  barcode?: StringFilter | null;

  compareAtPrice?: StringFilter | null;

  inventoryPolicy?: StringFilter | null;

  inventoryQuantity?: FloatFilter | null;

  option1?: StringFilter | null;

  option2?: StringFilter | null;

  option3?: StringFilter | null;

  position?: FloatFilter | null;

  price?: StringFilter | null;

  sku?: StringFilter | null;

  taxable?: BooleanFilter | null;

  title?: StringFilter | null;

  productId?: IDFilter | null;

  product?: ShopifyProductRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyProductRelationshipFilter = {

  AND?: (ShopifyProductRelationshipFilter | null)[];

  OR?: (ShopifyProductRelationshipFilter | null)[];

  NOT?: (ShopifyProductRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  handle?: StringFilter | null;

  productType?: StringFilter | null;

  publishedAt?: DateTimeFilter | null;

  status?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  templateSuffix?: StringFilter | null;

  title?: StringFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  variants?: ShopifyProductVariantsRelationshipFilter | null;

  vendor?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  category?: JSONFilter | null;

  compareAtPriceRange?: JSONFilter | null;

  hasVariantsThatRequiresComponents?: BooleanFilter | null;

  productCategory?: JSONFilter | null;

  body?: StringFilter | null;
};



export type ShopifyProductsRelationshipFilter = {

  some?: ShopifyProductsInnerRelationshipFilter | null;

  every?: ShopifyProductsInnerRelationshipFilter | null;
};



export type ShopifyProductsInnerRelationshipFilter = {

  AND?: (ShopifyProductsInnerRelationshipFilter | null)[];

  OR?: (ShopifyProductsInnerRelationshipFilter | null)[];

  NOT?: (ShopifyProductsInnerRelationshipFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  handle?: StringFilter | null;

  productType?: StringFilter | null;

  publishedAt?: DateTimeFilter | null;

  status?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  templateSuffix?: StringFilter | null;

  title?: StringFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  variants?: ShopifyProductVariantsRelationshipFilter | null;

  vendor?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  category?: JSONFilter | null;

  compareAtPriceRange?: JSONFilter | null;

  hasVariantsThatRequiresComponents?: BooleanFilter | null;

  productCategory?: JSONFilter | null;

  body?: StringFilter | null;
};



export type ShopifyGdprRequestSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the payload field. Defaults to ascending (smallest value first). */
  payload?: SortOrder | null;

  /** Sort the results by the topic field. Defaults to ascending (smallest value first). */
  topic?: SortOrder | null;
};



export type ShopifyGdprRequestFilter = {

  AND?: (ShopifyGdprRequestFilter | null)[];

  OR?: (ShopifyGdprRequestFilter | null)[];

  NOT?: (ShopifyGdprRequestFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  payload?: JSONFilter | null;

  topic?: SingleEnumFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyFulfillmentOrderSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the shopifyCreatedAt field. Defaults to ascending (smallest value first). */
  shopifyCreatedAt?: SortOrder | null;

  /** Sort the results by the fulfillAt field. Defaults to ascending (smallest value first). */
  fulfillAt?: SortOrder | null;

  /** Sort the results by the fulfillBy field. Defaults to ascending (smallest value first). */
  fulfillBy?: SortOrder | null;

  /** Sort the results by the internationalDuties field. Defaults to ascending (smallest value first). */
  internationalDuties?: SortOrder | null;

  /** Sort the results by the requestStatus field. Defaults to ascending (smallest value first). */
  requestStatus?: SortOrder | null;

  /** Sort the results by the status field. Defaults to ascending (smallest value first). */
  status?: SortOrder | null;

  /** Sort the results by the supportedActions field. Defaults to ascending (smallest value first). */
  supportedActions?: SortOrder | null;

  /** Sort the results by the shopifyUpdatedAt field. Defaults to ascending (smallest value first). */
  shopifyUpdatedAt?: SortOrder | null;
};



export type ShopifyFulfillmentOrderFilter = {

  AND?: (ShopifyFulfillmentOrderFilter | null)[];

  OR?: (ShopifyFulfillmentOrderFilter | null)[];

  NOT?: (ShopifyFulfillmentOrderFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  fulfillAt?: DateTimeFilter | null;

  fulfillBy?: DateTimeFilter | null;

  internationalDuties?: JSONFilter | null;

  requestStatus?: SingleEnumFilter | null;

  status?: SingleEnumFilter | null;

  supportedActions?: JSONFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  orderId?: IDFilter | null;

  order?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyFulfillmentServiceSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the serviceName field. Defaults to ascending (smallest value first). */
  serviceName?: SortOrder | null;

  /** Sort the results by the type field. Defaults to ascending (smallest value first). */
  type?: SortOrder | null;

  /** Sort the results by the adminGraphqlApiId field. Defaults to ascending (smallest value first). */
  adminGraphqlApiId?: SortOrder | null;

  /** Sort the results by the callbackUrl field. Defaults to ascending (smallest value first). */
  callbackUrl?: SortOrder | null;

  /** Sort the results by the format field. Defaults to ascending (smallest value first). */
  format?: SortOrder | null;

  /** Sort the results by the fulfillmentOrdersOptIn field. Defaults to ascending (smallest value first). */
  fulfillmentOrdersOptIn?: SortOrder | null;

  /** Sort the results by the handle field. Defaults to ascending (smallest value first). */
  handle?: SortOrder | null;

  /** Sort the results by the inventoryManagement field. Defaults to ascending (smallest value first). */
  inventoryManagement?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;

  /** Sort the results by the permitsSkuSharing field. Defaults to ascending (smallest value first). */
  permitsSkuSharing?: SortOrder | null;

  /** Sort the results by the requiresShippingMethod field. Defaults to ascending (smallest value first). */
  requiresShippingMethod?: SortOrder | null;

  /** Sort the results by the trackingSupport field. Defaults to ascending (smallest value first). */
  trackingSupport?: SortOrder | null;
};



export type ShopifyFulfillmentServiceFilter = {

  AND?: (ShopifyFulfillmentServiceFilter | null)[];

  OR?: (ShopifyFulfillmentServiceFilter | null)[];

  NOT?: (ShopifyFulfillmentServiceFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  serviceName?: StringFilter | null;

  type?: SingleEnumFilter | null;

  adminGraphqlApiId?: StringFilter | null;

  callbackUrl?: StringFilter | null;

  format?: StringFilter | null;

  fulfillmentOrdersOptIn?: BooleanFilter | null;

  handle?: StringFilter | null;

  inventoryManagement?: BooleanFilter | null;

  name?: StringFilter | null;

  permitsSkuSharing?: BooleanFilter | null;

  requiresShippingMethod?: BooleanFilter | null;

  trackingSupport?: BooleanFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyFulfillmentSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the shopifyCreatedAt field. Defaults to ascending (smallest value first). */
  shopifyCreatedAt?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;

  /** Sort the results by the originAddress field. Defaults to ascending (smallest value first). */
  originAddress?: SortOrder | null;

  /** Sort the results by the receipt field. Defaults to ascending (smallest value first). */
  receipt?: SortOrder | null;

  /** Sort the results by the service field. Defaults to ascending (smallest value first). */
  service?: SortOrder | null;

  /** Sort the results by the shipmentStatus field. Defaults to ascending (smallest value first). */
  shipmentStatus?: SortOrder | null;

  /** Sort the results by the status field. Defaults to ascending (smallest value first). */
  status?: SortOrder | null;

  /** Sort the results by the trackingCompany field. Defaults to ascending (smallest value first). */
  trackingCompany?: SortOrder | null;

  /** Sort the results by the trackingNumbers field. Defaults to ascending (smallest value first). */
  trackingNumbers?: SortOrder | null;

  /** Sort the results by the trackingUrls field. Defaults to ascending (smallest value first). */
  trackingUrls?: SortOrder | null;

  /** Sort the results by the shopifyUpdatedAt field. Defaults to ascending (smallest value first). */
  shopifyUpdatedAt?: SortOrder | null;
};



export type ShopifyFulfillmentFilter = {

  AND?: (ShopifyFulfillmentFilter | null)[];

  OR?: (ShopifyFulfillmentFilter | null)[];

  NOT?: (ShopifyFulfillmentFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  name?: StringFilter | null;

  originAddress?: JSONFilter | null;

  receipt?: JSONFilter | null;

  service?: StringFilter | null;

  shipmentStatus?: StringFilter | null;

  status?: SingleEnumFilter | null;

  trackingCompany?: StringFilter | null;

  trackingNumbers?: JSONFilter | null;

  trackingUrls?: JSONFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  orderId?: IDFilter | null;

  order?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyCustomerSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the statistics field. Defaults to ascending (smallest value first). */
  statistics?: SortOrder | null;

  /** Sort the results by the locale field. Defaults to ascending (smallest value first). */
  locale?: SortOrder | null;

  /** Sort the results by the acceptsMarketing field. Defaults to ascending (smallest value first). */
  acceptsMarketing?: SortOrder | null;

  /** Sort the results by the acceptsMarketingUpdatedAt field. Defaults to ascending (smallest value first). */
  acceptsMarketingUpdatedAt?: SortOrder | null;

  /** Sort the results by the shopifyCreatedAt field. Defaults to ascending (smallest value first). */
  shopifyCreatedAt?: SortOrder | null;

  /** Sort the results by the currency field. Defaults to ascending (smallest value first). */
  currency?: SortOrder | null;

  /** Sort the results by the email field. Defaults to ascending (smallest value first). */
  email?: SortOrder | null;

  /** Sort the results by the emailMarketingConsent field. Defaults to ascending (smallest value first). */
  emailMarketingConsent?: SortOrder | null;

  /** Sort the results by the firstName field. Defaults to ascending (smallest value first). */
  firstName?: SortOrder | null;

  /** Sort the results by the lastName field. Defaults to ascending (smallest value first). */
  lastName?: SortOrder | null;

  /** Sort the results by the marketingOptInLevel field. Defaults to ascending (smallest value first). */
  marketingOptInLevel?: SortOrder | null;

  /** Sort the results by the multipassIdentifier field. Defaults to ascending (smallest value first). */
  multipassIdentifier?: SortOrder | null;

  /** Sort the results by the note field. Defaults to ascending (smallest value first). */
  note?: SortOrder | null;

  /** Sort the results by the phone field. Defaults to ascending (smallest value first). */
  phone?: SortOrder | null;

  /** Sort the results by the smsMarketingConsent field. Defaults to ascending (smallest value first). */
  smsMarketingConsent?: SortOrder | null;

  /** Sort the results by the shopifyState field. Defaults to ascending (smallest value first). */
  shopifyState?: SortOrder | null;

  /** Sort the results by the tags field. Defaults to ascending (smallest value first). */
  tags?: SortOrder | null;

  /** Sort the results by the taxExempt field. Defaults to ascending (smallest value first). */
  taxExempt?: SortOrder | null;

  /** Sort the results by the taxExemptions field. Defaults to ascending (smallest value first). */
  taxExemptions?: SortOrder | null;

  /** Sort the results by the shopifyUpdatedAt field. Defaults to ascending (smallest value first). */
  shopifyUpdatedAt?: SortOrder | null;

  /** Sort the results by the verifiedEmail field. Defaults to ascending (smallest value first). */
  verifiedEmail?: SortOrder | null;
};



export type ShopifyCustomerFilter = {

  AND?: (ShopifyCustomerFilter | null)[];

  OR?: (ShopifyCustomerFilter | null)[];

  NOT?: (ShopifyCustomerFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  statistics?: JSONFilter | null;

  locale?: StringFilter | null;

  acceptsMarketing?: BooleanFilter | null;

  acceptsMarketingUpdatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  currency?: StringFilter | null;

  email?: StringFilter | null;

  emailMarketingConsent?: JSONFilter | null;

  firstName?: StringFilter | null;

  lastName?: StringFilter | null;

  marketingOptInLevel?: StringFilter | null;

  multipassIdentifier?: StringFilter | null;

  note?: StringFilter | null;

  orders?: ShopifyOrdersRelationshipFilter | null;

  phone?: StringFilter | null;

  smsMarketingConsent?: JSONFilter | null;

  shopifyState?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  taxExempt?: BooleanFilter | null;

  taxExemptions?: MultiEnumFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  verifiedEmail?: BooleanFilter | null;

  lastOrderId?: IDFilter | null;

  lastOrder?: ShopifyOrderRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyOrderSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the additionalFees field. Defaults to ascending (smallest value first). */
  additionalFees?: SortOrder | null;

  /** Sort the results by the cancellation field. Defaults to ascending (smallest value first). */
  cancellation?: SortOrder | null;

  /** Sort the results by the billingAddress field. Defaults to ascending (smallest value first). */
  billingAddress?: SortOrder | null;

  /** Sort the results by the browserIp field. Defaults to ascending (smallest value first). */
  browserIp?: SortOrder | null;

  /** Sort the results by the buyerAcceptsMarketing field. Defaults to ascending (smallest value first). */
  buyerAcceptsMarketing?: SortOrder | null;

  /** Sort the results by the cancelReason field. Defaults to ascending (smallest value first). */
  cancelReason?: SortOrder | null;

  /** Sort the results by the cancelledAt field. Defaults to ascending (smallest value first). */
  cancelledAt?: SortOrder | null;

  /** Sort the results by the cartToken field. Defaults to ascending (smallest value first). */
  cartToken?: SortOrder | null;

  /** Sort the results by the checkoutToken field. Defaults to ascending (smallest value first). */
  checkoutToken?: SortOrder | null;

  /** Sort the results by the clientDetails field. Defaults to ascending (smallest value first). */
  clientDetails?: SortOrder | null;

  /** Sort the results by the closedAt field. Defaults to ascending (smallest value first). */
  closedAt?: SortOrder | null;

  /** Sort the results by the currency field. Defaults to ascending (smallest value first). */
  currency?: SortOrder | null;

  /** Sort the results by the customerLocale field. Defaults to ascending (smallest value first). */
  customerLocale?: SortOrder | null;

  /** Sort the results by the discountApplications field. Defaults to ascending (smallest value first). */
  discountApplications?: SortOrder | null;

  /** Sort the results by the discountCodes field. Defaults to ascending (smallest value first). */
  discountCodes?: SortOrder | null;

  /** Sort the results by the email field. Defaults to ascending (smallest value first). */
  email?: SortOrder | null;

  /** Sort the results by the estimatedTaxes field. Defaults to ascending (smallest value first). */
  estimatedTaxes?: SortOrder | null;

  /** Sort the results by the financialStatus field. Defaults to ascending (smallest value first). */
  financialStatus?: SortOrder | null;

  /** Sort the results by the fulfillmentStatus field. Defaults to ascending (smallest value first). */
  fulfillmentStatus?: SortOrder | null;

  /** Sort the results by the landingSite field. Defaults to ascending (smallest value first). */
  landingSite?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;

  /** Sort the results by the note field. Defaults to ascending (smallest value first). */
  note?: SortOrder | null;

  /** Sort the results by the noteAttributes field. Defaults to ascending (smallest value first). */
  noteAttributes?: SortOrder | null;

  /** Sort the results by the orderStatusUrl field. Defaults to ascending (smallest value first). */
  orderStatusUrl?: SortOrder | null;

  /** Sort the results by the paymentGatewayNames field. Defaults to ascending (smallest value first). */
  paymentGatewayNames?: SortOrder | null;

  /** Sort the results by the presentmentCurrency field. Defaults to ascending (smallest value first). */
  presentmentCurrency?: SortOrder | null;

  /** Sort the results by the processedAt field. Defaults to ascending (smallest value first). */
  processedAt?: SortOrder | null;

  /** Sort the results by the processingMethod field. Defaults to ascending (smallest value first). */
  processingMethod?: SortOrder | null;

  /** Sort the results by the shippingAddress field. Defaults to ascending (smallest value first). */
  shippingAddress?: SortOrder | null;

  /** Sort the results by the sourceName field. Defaults to ascending (smallest value first). */
  sourceName?: SortOrder | null;

  /** Sort the results by the subtotalPrice field. Defaults to ascending (smallest value first). */
  subtotalPrice?: SortOrder | null;

  /** Sort the results by the subtotalPriceSet field. Defaults to ascending (smallest value first). */
  subtotalPriceSet?: SortOrder | null;

  /** Sort the results by the tags field. Defaults to ascending (smallest value first). */
  tags?: SortOrder | null;

  /** Sort the results by the taxLines field. Defaults to ascending (smallest value first). */
  taxLines?: SortOrder | null;

  /** Sort the results by the taxesIncluded field. Defaults to ascending (smallest value first). */
  taxesIncluded?: SortOrder | null;

  /** Sort the results by the test field. Defaults to ascending (smallest value first). */
  test?: SortOrder | null;

  /** Sort the results by the totalDiscounts field. Defaults to ascending (smallest value first). */
  totalDiscounts?: SortOrder | null;

  /** Sort the results by the totalDiscountsSet field. Defaults to ascending (smallest value first). */
  totalDiscountsSet?: SortOrder | null;

  /** Sort the results by the totalLineItemsPrice field. Defaults to ascending (smallest value first). */
  totalLineItemsPrice?: SortOrder | null;

  /** Sort the results by the totalLineItemsPriceSet field. Defaults to ascending (smallest value first). */
  totalLineItemsPriceSet?: SortOrder | null;

  /** Sort the results by the totalOutstanding field. Defaults to ascending (smallest value first). */
  totalOutstanding?: SortOrder | null;

  /** Sort the results by the totalPrice field. Defaults to ascending (smallest value first). */
  totalPrice?: SortOrder | null;

  /** Sort the results by the totalPriceSet field. Defaults to ascending (smallest value first). */
  totalPriceSet?: SortOrder | null;

  /** Sort the results by the totalTax field. Defaults to ascending (smallest value first). */
  totalTax?: SortOrder | null;

  /** Sort the results by the totalTaxSet field. Defaults to ascending (smallest value first). */
  totalTaxSet?: SortOrder | null;

  /** Sort the results by the totalTipReceived field. Defaults to ascending (smallest value first). */
  totalTipReceived?: SortOrder | null;

  /** Sort the results by the totalWeight field. Defaults to ascending (smallest value first). */
  totalWeight?: SortOrder | null;

  /** Sort the results by the writeOrder field. Defaults to ascending (smallest value first). */
  writeOrder?: SortOrder | null;

  /** Sort the results by the autoWrite field. Defaults to ascending (smallest value first). */
  autoWrite?: SortOrder | null;
};



export type ShopifyOrderFilter = {

  AND?: (ShopifyOrderFilter | null)[];

  OR?: (ShopifyOrderFilter | null)[];

  NOT?: (ShopifyOrderFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  additionalFees?: JSONFilter | null;

  cancellation?: JSONFilter | null;

  billingAddress?: JSONFilter | null;

  browserIp?: StringFilter | null;

  buyerAcceptsMarketing?: BooleanFilter | null;

  cancelReason?: SingleEnumFilter | null;

  cancelledAt?: DateTimeFilter | null;

  cartToken?: StringFilter | null;

  checkoutToken?: StringFilter | null;

  clientDetails?: JSONFilter | null;

  closedAt?: DateTimeFilter | null;

  currency?: SingleEnumFilter | null;

  customerLocale?: StringFilter | null;

  discountApplications?: JSONFilter | null;

  discountCodes?: JSONFilter | null;

  email?: StringFilter | null;

  estimatedTaxes?: BooleanFilter | null;

  financialStatus?: SingleEnumFilter | null;

  fulfillmentStatus?: SingleEnumFilter | null;

  landingSite?: StringFilter | null;

  name?: StringFilter | null;

  note?: StringFilter | null;

  noteAttributes?: JSONFilter | null;

  orderStatusUrl?: StringFilter | null;

  paymentGatewayNames?: JSONFilter | null;

  presentmentCurrency?: SingleEnumFilter | null;

  processedAt?: DateTimeFilter | null;

  processingMethod?: StringFilter | null;

  shippingAddress?: JSONFilter | null;

  sourceName?: StringFilter | null;

  subtotalPrice?: StringFilter | null;

  subtotalPriceSet?: JSONFilter | null;

  tags?: JSONFilter | null;

  taxLines?: JSONFilter | null;

  taxesIncluded?: BooleanFilter | null;

  test?: BooleanFilter | null;

  totalDiscounts?: StringFilter | null;

  totalDiscountsSet?: JSONFilter | null;

  totalLineItemsPrice?: StringFilter | null;

  totalLineItemsPriceSet?: JSONFilter | null;

  totalOutstanding?: StringFilter | null;

  totalPrice?: StringFilter | null;

  totalPriceSet?: JSONFilter | null;

  totalTax?: StringFilter | null;

  totalTaxSet?: JSONFilter | null;

  totalTipReceived?: StringFilter | null;

  totalWeight?: FloatFilter | null;

  customerId?: IDFilter | null;

  customer?: ShopifyCustomerRelationshipFilter | null;

  fulfillments?: ShopifyFulfillmentsRelationshipFilter | null;

  shopifyShopId?: IDFilter | null;

  shopifyShop?: ShopifyShopRelationshipFilter | null;

  fulfillmentOrders?: ShopifyFulfillmentOrdersRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  writeOrder?: BooleanFilter | null;

  autoWrite?: BooleanFilter | null;
};



export type ShopifyProductVariantSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the barcode field. Defaults to ascending (smallest value first). */
  barcode?: SortOrder | null;

  /** Sort the results by the compareAtPrice field. Defaults to ascending (smallest value first). */
  compareAtPrice?: SortOrder | null;

  /** Sort the results by the inventoryPolicy field. Defaults to ascending (smallest value first). */
  inventoryPolicy?: SortOrder | null;

  /** Sort the results by the inventoryQuantity field. Defaults to ascending (smallest value first). */
  inventoryQuantity?: SortOrder | null;

  /** Sort the results by the option1 field. Defaults to ascending (smallest value first). */
  option1?: SortOrder | null;

  /** Sort the results by the option2 field. Defaults to ascending (smallest value first). */
  option2?: SortOrder | null;

  /** Sort the results by the option3 field. Defaults to ascending (smallest value first). */
  option3?: SortOrder | null;

  /** Sort the results by the position field. Defaults to ascending (smallest value first). */
  position?: SortOrder | null;

  /** Sort the results by the price field. Defaults to ascending (smallest value first). */
  price?: SortOrder | null;

  /** Sort the results by the sku field. Defaults to ascending (smallest value first). */
  sku?: SortOrder | null;

  /** Sort the results by the taxable field. Defaults to ascending (smallest value first). */
  taxable?: SortOrder | null;

  /** Sort the results by the title field. Defaults to ascending (smallest value first). */
  title?: SortOrder | null;
};



export type ShopifyProductVariantFilter = {

  AND?: (ShopifyProductVariantFilter | null)[];

  OR?: (ShopifyProductVariantFilter | null)[];

  NOT?: (ShopifyProductVariantFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  barcode?: StringFilter | null;

  compareAtPrice?: StringFilter | null;

  inventoryPolicy?: StringFilter | null;

  inventoryQuantity?: FloatFilter | null;

  option1?: StringFilter | null;

  option2?: StringFilter | null;

  option3?: StringFilter | null;

  position?: FloatFilter | null;

  price?: StringFilter | null;

  sku?: StringFilter | null;

  taxable?: BooleanFilter | null;

  title?: StringFilter | null;

  productId?: IDFilter | null;

  product?: ShopifyProductRelationshipFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type ShopifyProductSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the shopifyCreatedAt field. Defaults to ascending (smallest value first). */
  shopifyCreatedAt?: SortOrder | null;

  /** Sort the results by the handle field. Defaults to ascending (smallest value first). */
  handle?: SortOrder | null;

  /** Sort the results by the productType field. Defaults to ascending (smallest value first). */
  productType?: SortOrder | null;

  /** Sort the results by the publishedAt field. Defaults to ascending (smallest value first). */
  publishedAt?: SortOrder | null;

  /** Sort the results by the status field. Defaults to ascending (smallest value first). */
  status?: SortOrder | null;

  /** Sort the results by the tags field. Defaults to ascending (smallest value first). */
  tags?: SortOrder | null;

  /** Sort the results by the templateSuffix field. Defaults to ascending (smallest value first). */
  templateSuffix?: SortOrder | null;

  /** Sort the results by the title field. Defaults to ascending (smallest value first). */
  title?: SortOrder | null;

  /** Sort the results by the shopifyUpdatedAt field. Defaults to ascending (smallest value first). */
  shopifyUpdatedAt?: SortOrder | null;

  /** Sort the results by the vendor field. Defaults to ascending (smallest value first). */
  vendor?: SortOrder | null;

  /** Sort the results by the category field. Defaults to ascending (smallest value first). */
  category?: SortOrder | null;

  /** Sort the results by the compareAtPriceRange field. Defaults to ascending (smallest value first). */
  compareAtPriceRange?: SortOrder | null;

  /** Sort the results by the hasVariantsThatRequiresComponents field. Defaults to ascending (smallest value first). */
  hasVariantsThatRequiresComponents?: SortOrder | null;

  /** Sort the results by the productCategory field. Defaults to ascending (smallest value first). */
  productCategory?: SortOrder | null;

  /** Sort the results by the body field. Defaults to ascending (smallest value first). */
  body?: SortOrder | null;
};



export type ShopifyProductFilter = {

  AND?: (ShopifyProductFilter | null)[];

  OR?: (ShopifyProductFilter | null)[];

  NOT?: (ShopifyProductFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  handle?: StringFilter | null;

  productType?: StringFilter | null;

  publishedAt?: DateTimeFilter | null;

  status?: SingleEnumFilter | null;

  tags?: JSONFilter | null;

  templateSuffix?: StringFilter | null;

  title?: StringFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  variants?: ShopifyProductVariantsRelationshipFilter | null;

  vendor?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  category?: JSONFilter | null;

  compareAtPriceRange?: JSONFilter | null;

  hasVariantsThatRequiresComponents?: BooleanFilter | null;

  productCategory?: JSONFilter | null;

  body?: StringFilter | null;
};



export type ShopifyShopSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the state field. Defaults to ascending (smallest value first). */
  state?: SortOrder | null;

  /** Sort the results by the plan field. Defaults to ascending (smallest value first). */
  plan?: SortOrder | null;

  /** Sort the results by the address1 field. Defaults to ascending (smallest value first). */
  address1?: SortOrder | null;

  /** Sort the results by the address2 field. Defaults to ascending (smallest value first). */
  address2?: SortOrder | null;

  /** Sort the results by the city field. Defaults to ascending (smallest value first). */
  city?: SortOrder | null;

  /** Sort the results by the country field. Defaults to ascending (smallest value first). */
  country?: SortOrder | null;

  /** Sort the results by the countryCode field. Defaults to ascending (smallest value first). */
  countryCode?: SortOrder | null;

  /** Sort the results by the countryName field. Defaults to ascending (smallest value first). */
  countryName?: SortOrder | null;

  /** Sort the results by the countyTaxes field. Defaults to ascending (smallest value first). */
  countyTaxes?: SortOrder | null;

  /** Sort the results by the shopifyCreatedAt field. Defaults to ascending (smallest value first). */
  shopifyCreatedAt?: SortOrder | null;

  /** Sort the results by the currency field. Defaults to ascending (smallest value first). */
  currency?: SortOrder | null;

  /** Sort the results by the customerEmail field. Defaults to ascending (smallest value first). */
  customerEmail?: SortOrder | null;

  /** Sort the results by the disabledWebhooks field. Defaults to ascending (smallest value first). */
  disabledWebhooks?: SortOrder | null;

  /** Sort the results by the domain field. Defaults to ascending (smallest value first). */
  domain?: SortOrder | null;

  /** Sort the results by the eligibleForPayments field. Defaults to ascending (smallest value first). */
  eligibleForPayments?: SortOrder | null;

  /** Sort the results by the email field. Defaults to ascending (smallest value first). */
  email?: SortOrder | null;

  /** Sort the results by the enabledPresentmentCurrencies field. Defaults to ascending (smallest value first). */
  enabledPresentmentCurrencies?: SortOrder | null;

  /** Sort the results by the finances field. Defaults to ascending (smallest value first). */
  finances?: SortOrder | null;

  /** Sort the results by the googleAppsDomain field. Defaults to ascending (smallest value first). */
  googleAppsDomain?: SortOrder | null;

  /** Sort the results by the googleAppsLoginEnabled field. Defaults to ascending (smallest value first). */
  googleAppsLoginEnabled?: SortOrder | null;

  /** Sort the results by the grantedScopes field. Defaults to ascending (smallest value first). */
  grantedScopes?: SortOrder | null;

  /** Sort the results by the hasDiscounts field. Defaults to ascending (smallest value first). */
  hasDiscounts?: SortOrder | null;

  /** Sort the results by the hasGiftCards field. Defaults to ascending (smallest value first). */
  hasGiftCards?: SortOrder | null;

  /** Sort the results by the hasStorefront field. Defaults to ascending (smallest value first). */
  hasStorefront?: SortOrder | null;

  /** Sort the results by the ianaTimezone field. Defaults to ascending (smallest value first). */
  ianaTimezone?: SortOrder | null;

  /** Sort the results by the installedViaApiKey field. Defaults to ascending (smallest value first). */
  installedViaApiKey?: SortOrder | null;

  /** Sort the results by the latitude field. Defaults to ascending (smallest value first). */
  latitude?: SortOrder | null;

  /** Sort the results by the longitude field. Defaults to ascending (smallest value first). */
  longitude?: SortOrder | null;

  /** Sort the results by the marketingSmsContentEnabledAtCheckout field. Defaults to ascending (smallest value first). */
  marketingSmsContentEnabledAtCheckout?: SortOrder | null;

  /** Sort the results by the moneyFormat field. Defaults to ascending (smallest value first). */
  moneyFormat?: SortOrder | null;

  /** Sort the results by the moneyInEmailsFormat field. Defaults to ascending (smallest value first). */
  moneyInEmailsFormat?: SortOrder | null;

  /** Sort the results by the moneyWithCurrencyFormat field. Defaults to ascending (smallest value first). */
  moneyWithCurrencyFormat?: SortOrder | null;

  /** Sort the results by the moneyWithCurrencyInEmailsFormat field. Defaults to ascending (smallest value first). */
  moneyWithCurrencyInEmailsFormat?: SortOrder | null;

  /** Sort the results by the multiLocationEnabled field. Defaults to ascending (smallest value first). */
  multiLocationEnabled?: SortOrder | null;

  /** Sort the results by the myshopifyDomain field. Defaults to ascending (smallest value first). */
  myshopifyDomain?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;

  /** Sort the results by the passwordEnabled field. Defaults to ascending (smallest value first). */
  passwordEnabled?: SortOrder | null;

  /** Sort the results by the phone field. Defaults to ascending (smallest value first). */
  phone?: SortOrder | null;

  /** Sort the results by the planDisplayName field. Defaults to ascending (smallest value first). */
  planDisplayName?: SortOrder | null;

  /** Sort the results by the planName field. Defaults to ascending (smallest value first). */
  planName?: SortOrder | null;

  /** Sort the results by the preLaunchEnabled field. Defaults to ascending (smallest value first). */
  preLaunchEnabled?: SortOrder | null;

  /** Sort the results by the primaryLocale field. Defaults to ascending (smallest value first). */
  primaryLocale?: SortOrder | null;

  /** Sort the results by the province field. Defaults to ascending (smallest value first). */
  province?: SortOrder | null;

  /** Sort the results by the provinceCode field. Defaults to ascending (smallest value first). */
  provinceCode?: SortOrder | null;

  /** Sort the results by the registeredWebhooks field. Defaults to ascending (smallest value first). */
  registeredWebhooks?: SortOrder | null;

  /** Sort the results by the requiresExtraPaymentsAgreement field. Defaults to ascending (smallest value first). */
  requiresExtraPaymentsAgreement?: SortOrder | null;

  /** Sort the results by the setupRequired field. Defaults to ascending (smallest value first). */
  setupRequired?: SortOrder | null;

  /** Sort the results by the shopOwner field. Defaults to ascending (smallest value first). */
  shopOwner?: SortOrder | null;

  /** Sort the results by the source field. Defaults to ascending (smallest value first). */
  source?: SortOrder | null;

  /** Sort the results by the shopifyUpdatedAt field. Defaults to ascending (smallest value first). */
  shopifyUpdatedAt?: SortOrder | null;
};



export type ShopifyShopFilter = {

  AND?: (ShopifyShopFilter | null)[];

  OR?: (ShopifyShopFilter | null)[];

  NOT?: (ShopifyShopFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  state?: StateFilter | null;

  plan?: JSONFilter | null;

  address1?: StringFilter | null;

  address2?: StringFilter | null;

  city?: StringFilter | null;

  country?: StringFilter | null;

  countryCode?: StringFilter | null;

  countryName?: StringFilter | null;

  countyTaxes?: JSONFilter | null;

  shopifyCreatedAt?: DateTimeFilter | null;

  currency?: SingleEnumFilter | null;

  customerEmail?: StringFilter | null;

  disabledWebhooks?: JSONFilter | null;

  domain?: StringFilter | null;

  eligibleForPayments?: BooleanFilter | null;

  email?: StringFilter | null;

  enabledPresentmentCurrencies?: MultiEnumFilter | null;

  finances?: BooleanFilter | null;

  googleAppsDomain?: StringFilter | null;

  googleAppsLoginEnabled?: BooleanFilter | null;

  grantedScopes?: JSONFilter | null;

  hasDiscounts?: BooleanFilter | null;

  hasGiftCards?: BooleanFilter | null;

  hasStorefront?: BooleanFilter | null;

  ianaTimezone?: StringFilter | null;

  installedViaApiKey?: StringFilter | null;

  latitude?: FloatFilter | null;

  longitude?: FloatFilter | null;

  marketingSmsContentEnabledAtCheckout?: BooleanFilter | null;

  moneyFormat?: StringFilter | null;

  moneyInEmailsFormat?: StringFilter | null;

  moneyWithCurrencyFormat?: StringFilter | null;

  moneyWithCurrencyInEmailsFormat?: StringFilter | null;

  multiLocationEnabled?: BooleanFilter | null;

  myshopifyDomain?: StringFilter | null;

  name?: StringFilter | null;

  passwordEnabled?: BooleanFilter | null;

  phone?: StringFilter | null;

  planDisplayName?: StringFilter | null;

  planName?: StringFilter | null;

  preLaunchEnabled?: BooleanFilter | null;

  primaryLocale?: StringFilter | null;

  province?: StringFilter | null;

  provinceCode?: StringFilter | null;

  registeredWebhooks?: JSONFilter | null;

  requiresExtraPaymentsAgreement?: BooleanFilter | null;

  setupRequired?: BooleanFilter | null;

  shopOwner?: StringFilter | null;

  source?: StringFilter | null;

  shopifyUpdatedAt?: DateTimeFilter | null;

  syncs?: ShopifySyncsRelationshipFilter | null;

  gdprRequests?: ShopifyGdprRequestsRelationshipFilter | null;

  fulfillmentOrders?: ShopifyFulfillmentOrdersRelationshipFilter | null;

  fulfillmentServices?: ShopifyFulfillmentServicesRelationshipFilter | null;

  fulfillments?: ShopifyFulfillmentsRelationshipFilter | null;

  customers?: ShopifyCustomersRelationshipFilter | null;

  orders?: ShopifyOrdersRelationshipFilter | null;

  productVariants?: ShopifyProductVariantsRelationshipFilter | null;

  products?: ShopifyProductsRelationshipFilter | null;
};



export type GoogleSheetConfigSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the orderSheetName field. Defaults to ascending (smallest value first). */
  orderSheetName?: SortOrder | null;

  /** Sort the results by the customerSheetName field. Defaults to ascending (smallest value first). */
  customerSheetName?: SortOrder | null;

  /** Sort the results by the courierApiProvider field. Defaults to ascending (smallest value first). */
  courierApiProvider?: SortOrder | null;

  /** Sort the results by the spreadsheetId field. Defaults to ascending (smallest value first). */
  spreadsheetId?: SortOrder | null;
};



export type GoogleSheetConfigFilter = {

  AND?: (GoogleSheetConfigFilter | null)[];

  OR?: (GoogleSheetConfigFilter | null)[];

  NOT?: (GoogleSheetConfigFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  orderSheetName?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;

  customerSheetName?: StringFilter | null;

  courierApiProvider?: StringFilter | null;

  spreadsheetId?: StringFilter | null;
};



export type SessionFilter = {

  id?: IDEqualsFilter | null;

  shop?: IDEqualsFilter | null;

  shopId?: IDEqualsFilter | null;

  shopifySID?: StringEqualsFilter | null;
};



export type IDEqualsFilter = {

  equals?: (Scalars['GadgetID'] | null) | null;
};



export type StringEqualsFilter = {

  equals?: (Scalars['String'] | null) | null;
};



export type SenditConfigSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the accountType field. Defaults to ascending (smallest value first). */
  accountType?: SortOrder | null;

  /** Sort the results by the lastAuthenticated field. Defaults to ascending (smallest value first). */
  lastAuthenticated?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;
};



export type SenditConfigFilter = {

  AND?: (SenditConfigFilter | null)[];

  OR?: (SenditConfigFilter | null)[];

  NOT?: (SenditConfigFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  accountType?: StringFilter | null;

  lastAuthenticated?: DateTimeFilter | null;

  name?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type SpeedafConfigSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the apiEndpoint field. Defaults to ascending (smallest value first). */
  apiEndpoint?: SortOrder | null;

  /** Sort the results by the appCode field. Defaults to ascending (smallest value first). */
  appCode?: SortOrder | null;

  /** Sort the results by the customerCode field. Defaults to ascending (smallest value first). */
  customerCode?: SortOrder | null;

  /** Sort the results by the lastAuthenticated field. Defaults to ascending (smallest value first). */
  lastAuthenticated?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;

  /** Sort the results by the platformSource field. Defaults to ascending (smallest value first). */
  platformSource?: SortOrder | null;

  /** Sort the results by the secretKey field. Defaults to ascending (smallest value first). */
  secretKey?: SortOrder | null;
};



export type SpeedafConfigFilter = {

  AND?: (SpeedafConfigFilter | null)[];

  OR?: (SpeedafConfigFilter | null)[];

  NOT?: (SpeedafConfigFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  apiEndpoint?: StringFilter | null;

  appCode?: StringFilter | null;

  customerCode?: StringFilter | null;

  lastAuthenticated?: DateTimeFilter | null;

  name?: StringFilter | null;

  platformSource?: StringFilter | null;

  secretKey?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type CustomCitySort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the isActive field. Defaults to ascending (smallest value first). */
  isActive?: SortOrder | null;

  /** Sort the results by the addedAt field. Defaults to ascending (smallest value first). */
  addedAt?: SortOrder | null;

  /** Sort the results by the courierType field. Defaults to ascending (smallest value first). */
  courierType?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;
};



export type CustomCityFilter = {

  AND?: (CustomCityFilter | null)[];

  OR?: (CustomCityFilter | null)[];

  NOT?: (CustomCityFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  isActive?: BooleanFilter | null;

  addedAt?: DateTimeFilter | null;

  courierType?: SingleEnumFilter | null;

  name?: StringFilter | null;

  shopId?: IDFilter | null;

  shop?: ShopifyShopRelationshipFilter | null;
};



export type UpdateShopifyOrderInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  additionalFees?: (Scalars['JSON'] | null) | null;

  cancellation?: (Scalars['JSON'] | null) | null;

  billingAddress?: (Scalars['JSON'] | null) | null;

  browserIp?: (Scalars['String'] | null) | null;

  buyerAcceptsMarketing?: (Scalars['Boolean'] | null) | null;

  cancelReason?: ShopifyOrderCancelReasonEnum | null;

  cancelledAt?: Date | Scalars['ISO8601DateString'] | null;

  cartToken?: (Scalars['String'] | null) | null;

  checkoutToken?: (Scalars['String'] | null) | null;

  clientDetails?: (Scalars['JSON'] | null) | null;

  closedAt?: Date | Scalars['ISO8601DateString'] | null;

  currency?: ShopifyOrderCurrencyEnum | null;

  customerLocale?: (Scalars['String'] | null) | null;

  discountApplications?: (Scalars['JSON'] | null) | null;

  discountCodes?: (Scalars['JSON'] | null) | null;

  email?: (Scalars['String'] | null) | null;

  estimatedTaxes?: (Scalars['Boolean'] | null) | null;

  financialStatus?: ShopifyOrderFinancialStatusEnum | null;

  fulfillmentStatus?: ShopifyOrderFulfillmentStatusEnum | null;

  landingSite?: (Scalars['String'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  note?: (Scalars['String'] | null) | null;

  noteAttributes?: (Scalars['JSON'] | null) | null;

  orderStatusUrl?: (Scalars['String'] | null) | null;

  paymentGatewayNames?: (Scalars['JSON'] | null) | null;

  presentmentCurrency?: ShopifyOrderPresentmentCurrencyEnum | null;

  processedAt?: Date | Scalars['ISO8601DateString'] | null;

  processingMethod?: (Scalars['String'] | null) | null;

  shippingAddress?: (Scalars['JSON'] | null) | null;

  sourceName?: (Scalars['String'] | null) | null;

  subtotalPrice?: (Scalars['String'] | null) | null;

  subtotalPriceSet?: (Scalars['JSON'] | null) | null;

  tags?: (Scalars['JSON'] | null) | null;

  taxLines?: (Scalars['JSON'] | null) | null;

  taxesIncluded?: (Scalars['Boolean'] | null) | null;

  test?: (Scalars['Boolean'] | null) | null;

  totalDiscounts?: (Scalars['String'] | null) | null;

  totalDiscountsSet?: (Scalars['JSON'] | null) | null;

  totalLineItemsPrice?: (Scalars['String'] | null) | null;

  totalLineItemsPriceSet?: (Scalars['JSON'] | null) | null;

  totalOutstanding?: (Scalars['String'] | null) | null;

  totalPrice?: (Scalars['String'] | null) | null;

  totalPriceSet?: (Scalars['JSON'] | null) | null;

  totalTax?: (Scalars['String'] | null) | null;

  totalTaxSet?: (Scalars['JSON'] | null) | null;

  totalTipReceived?: (Scalars['String'] | null) | null;

  totalWeight?: (Scalars['Float'] | null) | null;

  customer?: ShopifyCustomerBelongsToInput | null;

  shopifyShop?: ShopifyShopBelongsToInput | null;

  shop?: ShopifyShopBelongsToInput | null;

  writeOrder?: (Scalars['Boolean'] | null) | null;

  autoWrite?: (Scalars['Boolean'] | null) | null;
};



export type ShopifyCustomerBelongsToInput = {

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type ShopifyShopBelongsToInput = {

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type BulkUpdateShopifyOrdersInput = {

  shopifyOrder?: UpdateShopifyOrderInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type AbortShopifySyncInput = {

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkAbortShopifySyncsInput = {

  shopifySync?: AbortShopifySyncInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type CompleteShopifySyncInput = {

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkCompleteShopifySyncsInput = {

  shopifySync?: CompleteShopifySyncInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type ErrorShopifySyncInput = {

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkErrorShopifySyncsInput = {

  shopifySync?: ErrorShopifySyncInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type RunShopifySyncInput = {

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkRunShopifySyncsInput = {

  shopifySync?: RunShopifySyncInput | null;

  startReason?: (Scalars['String'] | null) | null;
};



export type UpsertShopifySyncInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkUpsertShopifySyncsInput = {

  /** An array of Strings */
  on?: ((Scalars['String'] | null))[];

  shopifySync?: UpsertShopifySyncInput | null;

  startReason?: (Scalars['String'] | null) | null;
};



export type CreateGoogleSheetConfigInput = {

  orderSheetName?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  customerSheetName?: (Scalars['String'] | null) | null;

  courierApiProvider?: (Scalars['String'] | null) | null;

  spreadsheetId?: (Scalars['String'] | null) | null;

  courierApiKey?: (Scalars['String'] | null) | null;
};



export type BulkCreateGoogleSheetConfigsInput = {

  googleSheetConfig?: CreateGoogleSheetConfigInput | null;
};



export type UpdateGoogleSheetConfigInput = {

  orderSheetName?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  customerSheetName?: (Scalars['String'] | null) | null;

  courierApiProvider?: (Scalars['String'] | null) | null;

  spreadsheetId?: (Scalars['String'] | null) | null;

  courierApiKey?: (Scalars['String'] | null) | null;
};



export type BulkUpdateGoogleSheetConfigsInput = {

  googleSheetConfig?: UpdateGoogleSheetConfigInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type UpsertGoogleSheetConfigInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  orderSheetName?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  customerSheetName?: (Scalars['String'] | null) | null;

  courierApiProvider?: (Scalars['String'] | null) | null;

  spreadsheetId?: (Scalars['String'] | null) | null;

  courierApiKey?: (Scalars['String'] | null) | null;
};



export type BulkUpsertGoogleSheetConfigsInput = {

  /** An array of Strings */
  on?: ((Scalars['String'] | null))[];

  googleSheetConfig?: UpsertGoogleSheetConfigInput | null;
};



export type CreateSenditConfigInput = {

  accountType?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  publicKey?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  token?: (Scalars['String'] | null) | null;
};



export type BulkCreateSenditConfigsInput = {

  senditConfig?: CreateSenditConfigInput | null;
};



export type UpdateSenditConfigInput = {

  accountType?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  publicKey?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  token?: (Scalars['String'] | null) | null;
};



export type BulkUpdateSenditConfigsInput = {

  senditConfig?: UpdateSenditConfigInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type UpsertSenditConfigInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  accountType?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  publicKey?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;

  token?: (Scalars['String'] | null) | null;
};



export type BulkUpsertSenditConfigsInput = {

  /** An array of Strings */
  on?: ((Scalars['String'] | null))[];

  senditConfig?: UpsertSenditConfigInput | null;
};



export type CreateSpeedafConfigInput = {

  apiEndpoint?: (Scalars['String'] | null) | null;

  appCode?: (Scalars['String'] | null) | null;

  customerCode?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  platformSource?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkCreateSpeedafConfigsInput = {

  speedafConfig?: CreateSpeedafConfigInput | null;
};



export type UpdateSpeedafConfigInput = {

  apiEndpoint?: (Scalars['String'] | null) | null;

  appCode?: (Scalars['String'] | null) | null;

  customerCode?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  platformSource?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkUpdateSpeedafConfigsInput = {

  speedafConfig?: UpdateSpeedafConfigInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type UpsertSpeedafConfigInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  apiEndpoint?: (Scalars['String'] | null) | null;

  appCode?: (Scalars['String'] | null) | null;

  customerCode?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  platformSource?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkUpsertSpeedafConfigsInput = {

  /** An array of Strings */
  on?: ((Scalars['String'] | null))[];

  speedafConfig?: UpsertSpeedafConfigInput | null;
};



export type CreateCustomCityInput = {

  isActive?: (Scalars['Boolean'] | null) | null;

  addedAt?: Date | Scalars['ISO8601DateString'] | null;

  courierType?: CustomCityCourierTypeEnum | null;

  name?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkCreateCustomCitiesInput = {

  customCity?: CreateCustomCityInput | null;
};



export type UpdateCustomCityInput = {

  isActive?: (Scalars['Boolean'] | null) | null;

  addedAt?: Date | Scalars['ISO8601DateString'] | null;

  courierType?: CustomCityCourierTypeEnum | null;

  name?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkUpdateCustomCitiesInput = {

  customCity?: UpdateCustomCityInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type UpsertCustomCityInput = {

  id?: (Scalars['GadgetID'] | null) | null;

  isActive?: (Scalars['Boolean'] | null) | null;

  addedAt?: Date | Scalars['ISO8601DateString'] | null;

  courierType?: CustomCityCourierTypeEnum | null;

  name?: (Scalars['String'] | null) | null;

  shop?: ShopifyShopBelongsToInput | null;
};



export type BulkUpsertCustomCitiesInput = {

  /** An array of Strings */
  on?: ((Scalars['String'] | null))[];

  customCity?: UpsertCustomCityInput | null;
};



export type CalculateRefundLineItemsElementTypeInput = {

  lineItemId?: (Scalars['String'] | null) | null;

  quantity?: (Scalars['Float'] | null) | null;

  reason?: (Scalars['String'] | null) | null;
};



export type ProcessBulkReturnsOrderSelectionsElementTypeInput = {

  orderId?: (Scalars['String'] | null) | null;

  /** An array of ProcessBulkReturnsOrderSelectionsElementTypeSelectedItemsElementTypeInputs */
  selectedItems?: (ProcessBulkReturnsOrderSelectionsElementTypeSelectedItemsElementTypeInput)[];
};



export type ProcessBulkReturnsOrderSelectionsElementTypeSelectedItemsElementTypeInput = {

  lineItemId?: (Scalars['String'] | null) | null;

  quantity?: (Scalars['Float'] | null) | null;
};



export type ProcessOrderReturnLineItemsElementTypeInput = {

  lineItemId?: (Scalars['String'] | null) | null;

  quantity?: (Scalars['Float'] | null) | null;

  reason?: (Scalars['String'] | null) | null;
};



export type SyncOrdersOrdersElementTypeInput = {

  id?: (Scalars['String'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  customerName?: (Scalars['String'] | null) | null;

  phone?: (Scalars['String'] | null) | null;

  address?: (Scalars['String'] | null) | null;

  city?: (Scalars['String'] | null) | null;

  rawCity?: (Scalars['String'] | null) | null;

  /** An array of SyncOrdersOrdersElementTypeLineItemsElementTypeInputs */
  lineItems?: (SyncOrdersOrdersElementTypeLineItemsElementTypeInput)[];

  totalPrice?: (Scalars['String'] | null) | null;

  displayFulfillmentStatus?: (Scalars['String'] | null) | null;

  createdAt?: (Scalars['String'] | null) | null;

  /** An array of Strings */
  tags?: ((Scalars['String'] | null))[];

  trackingNumber?: (Scalars['String'] | null) | null;

  isCancelled?: (Scalars['Boolean'] | null) | null;

  isDeleted?: (Scalars['Boolean'] | null) | null;

  isFulfillmentCancelled?: (Scalars['Boolean'] | null) | null;
};



export type SyncOrdersOrdersElementTypeLineItemsElementTypeInput = {

  name?: (Scalars['String'] | null) | null;

  quantity?: (Scalars['Float'] | null) | null;

  sku?: (Scalars['String'] | null) | null;

  price?: (Scalars['String'] | null) | null;
};



export type WriteSpeedafDataToSheetsTrackingDataElementTypeInput = {

  trackingNumber?: (Scalars['String'] | null) | null;

  latestStatus?: (Scalars['String'] | null) | null;
};



export type EnqueueBackgroundActionOptions = {

  /** A fixed ID to assign to this background action. If not passed, a random ID will be generated and assigned. */
  id?: (Scalars['String'] | null) | null;

  /** The priority for executing this action. */
  priority?: BackgroundActionPriority | null;

  /** Group actions into the same queue and limit the concurrency they can run with. */
  queue?: BackgroundActionQueue | null;

  /** Options governing if and how this action will be retried if it fails. */
  retries?: BackgroundActionRetryPolicy | null;

  /** Actions won't be started until after this time. */
  startAt?: Date | Scalars['ISO8601DateString'] | null;
};



export type BackgroundActionQueue = {

  /** The identifier for this queue. */
  name: (Scalars['String'] | null);

  /** The maximum number of actions that will be run at the same time. Defaults to 1 if not passed (only one job per key at once). */
  maxConcurrency?: (Scalars['Int'] | null) | null;
};



export type BackgroundActionRetryPolicy = {

  /** The number of repeat attempts to make if the initial attempt fails. Defaults to 10. Note: the total number of attempts will be this number plus one -- this counts the number of retries *after* the first attempt. */
  retryCount?: (Scalars['Int'] | null) | null;

  /** How long to delay the first retry attempt, in milliseconds. Default is 1000. */
  initialInterval?: (Scalars['Int'] | null) | null;

  /** The maximum amount of time to delay a retry while exponentially backing off in milliseconds. Default is not set, so the retry can backoff indefinitely */
  maxInterval?: (Scalars['Int'] | null) | null;

  /** The exponential backoff factor to use for calculating the retry delay for successive retries. Set this higher to grow the delay faster with each retry attempt. Default is 2. */
  backoffFactor?: (Scalars['Int'] | null) | null;

  /** If true, the retry interval will be randomized by a small amount to avoid all retries happening at the same time. Default is false. */
  randomizeInterval?: (Scalars['Boolean'] | null) | null;
};



export type InternalShopifyCustomerInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  statistics?: (Scalars['JSON'] | null) | null;

  locale?: (Scalars['String'] | null) | null;

  acceptsMarketing?: (Scalars['Boolean'] | null) | null;

  acceptsMarketingUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  shopifyCreatedAt?: Date | Scalars['ISO8601DateString'] | null;

  currency?: (Scalars['String'] | null) | null;

  email?: (Scalars['String'] | null) | null;

  emailMarketingConsent?: (Scalars['JSON'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  lastName?: (Scalars['String'] | null) | null;

  marketingOptInLevel?: (Scalars['String'] | null) | null;

  multipassIdentifier?: (Scalars['String'] | null) | null;

  note?: (Scalars['String'] | null) | null;

  phone?: (Scalars['String'] | null) | null;

  smsMarketingConsent?: (Scalars['JSON'] | null) | null;

  shopifyState?: ShopifyCustomerShopifyStateEnum | null;

  tags?: (Scalars['JSON'] | null) | null;

  taxExempt?: (Scalars['Boolean'] | null) | null;

  taxExemptions?: (ShopifyCustomerTaxExemptionsEnum)[];

  shopifyUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  verifiedEmail?: (Scalars['Boolean'] | null) | null;

  lastOrder?: InternalBelongsToInput | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalBelongsToInput = {

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type AppGraphQLTriggerMutationContext = {

  /** The ID of the session that triggered this mutation. Will be the session that's loaded in the mutation context. */
  sessionID?: (Scalars['GadgetID'] | null) | null;
};



export type InternalShopifyGdprRequestInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  payload?: (Scalars['JSON'] | null) | null;

  topic?: ShopifyGdprRequestTopicEnum | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalShopifyOrderInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  additionalFees?: (Scalars['JSON'] | null) | null;

  cancellation?: (Scalars['JSON'] | null) | null;

  billingAddress?: (Scalars['JSON'] | null) | null;

  browserIp?: (Scalars['String'] | null) | null;

  buyerAcceptsMarketing?: (Scalars['Boolean'] | null) | null;

  cancelReason?: ShopifyOrderCancelReasonEnum | null;

  cancelledAt?: Date | Scalars['ISO8601DateString'] | null;

  cartToken?: (Scalars['String'] | null) | null;

  checkoutToken?: (Scalars['String'] | null) | null;

  clientDetails?: (Scalars['JSON'] | null) | null;

  closedAt?: Date | Scalars['ISO8601DateString'] | null;

  currency?: ShopifyOrderCurrencyEnum | null;

  customerLocale?: (Scalars['String'] | null) | null;

  discountApplications?: (Scalars['JSON'] | null) | null;

  discountCodes?: (Scalars['JSON'] | null) | null;

  email?: (Scalars['String'] | null) | null;

  estimatedTaxes?: (Scalars['Boolean'] | null) | null;

  financialStatus?: ShopifyOrderFinancialStatusEnum | null;

  fulfillmentStatus?: ShopifyOrderFulfillmentStatusEnum | null;

  landingSite?: (Scalars['String'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  note?: (Scalars['String'] | null) | null;

  noteAttributes?: (Scalars['JSON'] | null) | null;

  orderStatusUrl?: (Scalars['String'] | null) | null;

  paymentGatewayNames?: (Scalars['JSON'] | null) | null;

  presentmentCurrency?: ShopifyOrderPresentmentCurrencyEnum | null;

  processedAt?: Date | Scalars['ISO8601DateString'] | null;

  processingMethod?: (Scalars['String'] | null) | null;

  shippingAddress?: (Scalars['JSON'] | null) | null;

  sourceName?: (Scalars['String'] | null) | null;

  subtotalPrice?: (Scalars['String'] | null) | null;

  subtotalPriceSet?: (Scalars['JSON'] | null) | null;

  tags?: (Scalars['JSON'] | null) | null;

  taxLines?: (Scalars['JSON'] | null) | null;

  taxesIncluded?: (Scalars['Boolean'] | null) | null;

  test?: (Scalars['Boolean'] | null) | null;

  totalDiscounts?: (Scalars['String'] | null) | null;

  totalDiscountsSet?: (Scalars['JSON'] | null) | null;

  totalLineItemsPrice?: (Scalars['String'] | null) | null;

  totalLineItemsPriceSet?: (Scalars['JSON'] | null) | null;

  totalOutstanding?: (Scalars['String'] | null) | null;

  totalPrice?: (Scalars['String'] | null) | null;

  totalPriceSet?: (Scalars['JSON'] | null) | null;

  totalTax?: (Scalars['String'] | null) | null;

  totalTaxSet?: (Scalars['JSON'] | null) | null;

  totalTipReceived?: (Scalars['String'] | null) | null;

  totalWeight?: (Scalars['Float'] | null) | null;

  customer?: InternalBelongsToInput | null;

  shopifyShop?: InternalBelongsToInput | null;

  shop?: InternalBelongsToInput | null;

  writeOrder?: (Scalars['Boolean'] | null) | null;

  autoWrite?: (Scalars['Boolean'] | null) | null;

  /** An optional list of atomically applied commands for race-safe mutations of the record */
  _atomics?: InternalShopifyOrderAtomicsInput | null;
};



export type InternalShopifyOrderAtomicsInput = {

  /** Numeric atomic commands for operating on totalWeight. */
  totalWeight?: (NumericAtomicFieldUpdateInput)[];
};



export type NumericAtomicFieldUpdateInput = {

  /** A number to atomically increment the field value by. Can only be used on numeric fields. */
  increment?: (Scalars['Float'] | null) | null;

  /** A number to atomically decrement the field value by. Can only be used on numeric fields. */
  decrement?: (Scalars['Float'] | null) | null;
};



export type InternalShopifyShopInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  plan?: (Scalars['JSON'] | null) | null;

  accessToken?: (Scalars['String'] | null) | null;

  address1?: (Scalars['String'] | null) | null;

  address2?: (Scalars['String'] | null) | null;

  city?: (Scalars['String'] | null) | null;

  country?: (Scalars['String'] | null) | null;

  countryCode?: (Scalars['String'] | null) | null;

  countryName?: (Scalars['String'] | null) | null;

  countyTaxes?: (Scalars['JSON'] | null) | null;

  shopifyCreatedAt?: Date | Scalars['ISO8601DateString'] | null;

  currency?: ShopifyShopCurrencyEnum | null;

  customerEmail?: (Scalars['String'] | null) | null;

  disabledWebhooks?: (Scalars['JSON'] | null) | null;

  domain?: (Scalars['String'] | null) | null;

  eligibleForPayments?: (Scalars['Boolean'] | null) | null;

  email?: (Scalars['String'] | null) | null;

  enabledPresentmentCurrencies?: (ShopifyShopEnabledPresentmentCurrenciesEnum)[];

  finances?: (Scalars['Boolean'] | null) | null;

  googleAppsDomain?: (Scalars['String'] | null) | null;

  googleAppsLoginEnabled?: (Scalars['Boolean'] | null) | null;

  grantedScopes?: (Scalars['JSON'] | null) | null;

  hasDiscounts?: (Scalars['Boolean'] | null) | null;

  hasGiftCards?: (Scalars['Boolean'] | null) | null;

  hasStorefront?: (Scalars['Boolean'] | null) | null;

  ianaTimezone?: (Scalars['String'] | null) | null;

  installedViaApiKey?: (Scalars['String'] | null) | null;

  latitude?: (Scalars['Float'] | null) | null;

  longitude?: (Scalars['Float'] | null) | null;

  marketingSmsContentEnabledAtCheckout?: (Scalars['Boolean'] | null) | null;

  moneyFormat?: (Scalars['String'] | null) | null;

  moneyInEmailsFormat?: (Scalars['String'] | null) | null;

  moneyWithCurrencyFormat?: (Scalars['String'] | null) | null;

  moneyWithCurrencyInEmailsFormat?: (Scalars['String'] | null) | null;

  multiLocationEnabled?: (Scalars['Boolean'] | null) | null;

  myshopifyDomain?: (Scalars['String'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  passwordEnabled?: (Scalars['Boolean'] | null) | null;

  phone?: (Scalars['String'] | null) | null;

  planDisplayName?: (Scalars['String'] | null) | null;

  planName?: (Scalars['String'] | null) | null;

  preLaunchEnabled?: (Scalars['Boolean'] | null) | null;

  primaryLocale?: (Scalars['String'] | null) | null;

  province?: (Scalars['String'] | null) | null;

  provinceCode?: (Scalars['String'] | null) | null;

  registeredWebhooks?: (Scalars['JSON'] | null) | null;

  requiresExtraPaymentsAgreement?: (Scalars['Boolean'] | null) | null;

  setupRequired?: (Scalars['Boolean'] | null) | null;

  shopOwner?: (Scalars['String'] | null) | null;

  source?: (Scalars['String'] | null) | null;

  shopifyUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  /** An optional list of atomically applied commands for race-safe mutations of the record */
  _atomics?: InternalShopifyShopAtomicsInput | null;
};



export type InternalShopifyShopAtomicsInput = {

  /** Numeric atomic commands for operating on latitude. */
  latitude?: (NumericAtomicFieldUpdateInput)[];

  /** Numeric atomic commands for operating on longitude. */
  longitude?: (NumericAtomicFieldUpdateInput)[];
};



export type InternalShopifySyncInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  syncSince?: Date | Scalars['ISO8601DateString'] | null;

  domain?: (Scalars['String'] | null) | null;

  errorDetails?: (Scalars['String'] | null) | null;

  errorMessage?: (Scalars['String'] | null) | null;

  force?: (Scalars['Boolean'] | null) | null;

  models?: (Scalars['JSON'] | null) | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalGoogleSheetConfigInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  orderSheetName?: (Scalars['String'] | null) | null;

  shop?: InternalBelongsToInput | null;

  customerSheetName?: (Scalars['String'] | null) | null;

  courierApiProvider?: (Scalars['String'] | null) | null;

  spreadsheetId?: (Scalars['String'] | null) | null;

  courierApiKey?: (Scalars['String'] | null) | null;
};



export type InternalSessionInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  shop?: InternalBelongsToInput | null;

  shopifySID?: (Scalars['String'] | null) | null;

  /** A string list of Gadget platform Role keys to assign to this record */
  roles?: ((Scalars['String'] | null))[];
};



export type InternalShopifyFulfillmentInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  shopifyCreatedAt?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  originAddress?: (Scalars['JSON'] | null) | null;

  receipt?: (Scalars['JSON'] | null) | null;

  service?: (Scalars['String'] | null) | null;

  shipmentStatus?: (Scalars['String'] | null) | null;

  status?: ShopifyFulfillmentStatusEnum | null;

  trackingCompany?: (Scalars['String'] | null) | null;

  trackingNumbers?: (Scalars['JSON'] | null) | null;

  trackingUrls?: (Scalars['JSON'] | null) | null;

  shopifyUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  order?: InternalBelongsToInput | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalShopifyFulfillmentOrderInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  shopifyCreatedAt?: Date | Scalars['ISO8601DateString'] | null;

  fulfillAt?: Date | Scalars['ISO8601DateString'] | null;

  fulfillBy?: Date | Scalars['ISO8601DateString'] | null;

  internationalDuties?: (Scalars['JSON'] | null) | null;

  requestStatus?: ShopifyFulfillmentOrderRequestStatusEnum | null;

  status?: ShopifyFulfillmentOrderStatusEnum | null;

  supportedActions?: (Scalars['JSON'] | null) | null;

  shopifyUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  order?: InternalBelongsToInput | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalShopifyFulfillmentServiceInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  serviceName?: (Scalars['String'] | null) | null;

  type?: ShopifyFulfillmentServiceTypeEnum | null;

  adminGraphqlApiId?: (Scalars['String'] | null) | null;

  callbackUrl?: (Scalars['String'] | null) | null;

  format?: (Scalars['String'] | null) | null;

  fulfillmentOrdersOptIn?: (Scalars['Boolean'] | null) | null;

  handle?: (Scalars['String'] | null) | null;

  inventoryManagement?: (Scalars['Boolean'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  permitsSkuSharing?: (Scalars['Boolean'] | null) | null;

  requiresShippingMethod?: (Scalars['Boolean'] | null) | null;

  trackingSupport?: (Scalars['Boolean'] | null) | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalShopifyProductInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  shopifyCreatedAt?: Date | Scalars['ISO8601DateString'] | null;

  handle?: (Scalars['String'] | null) | null;

  productType?: (Scalars['String'] | null) | null;

  publishedAt?: Date | Scalars['ISO8601DateString'] | null;

  status?: ShopifyProductStatusEnum | null;

  tags?: (Scalars['JSON'] | null) | null;

  templateSuffix?: (Scalars['String'] | null) | null;

  title?: (Scalars['String'] | null) | null;

  shopifyUpdatedAt?: Date | Scalars['ISO8601DateString'] | null;

  vendor?: (Scalars['String'] | null) | null;

  shop?: InternalBelongsToInput | null;

  category?: (Scalars['JSON'] | null) | null;

  compareAtPriceRange?: (Scalars['JSON'] | null) | null;

  hasVariantsThatRequiresComponents?: (Scalars['Boolean'] | null) | null;

  productCategory?: (Scalars['JSON'] | null) | null;

  body?: (Scalars['String'] | null) | null;
};



export type InternalShopifyProductVariantInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  barcode?: (Scalars['String'] | null) | null;

  compareAtPrice?: (Scalars['String'] | null) | null;

  inventoryPolicy?: (Scalars['String'] | null) | null;

  inventoryQuantity?: (Scalars['Float'] | null) | null;

  option1?: (Scalars['String'] | null) | null;

  option2?: (Scalars['String'] | null) | null;

  option3?: (Scalars['String'] | null) | null;

  position?: (Scalars['Float'] | null) | null;

  price?: (Scalars['String'] | null) | null;

  sku?: (Scalars['String'] | null) | null;

  taxable?: (Scalars['Boolean'] | null) | null;

  title?: (Scalars['String'] | null) | null;

  product?: InternalBelongsToInput | null;

  shop?: InternalBelongsToInput | null;

  /** An optional list of atomically applied commands for race-safe mutations of the record */
  _atomics?: InternalShopifyProductVariantAtomicsInput | null;
};



export type InternalShopifyProductVariantAtomicsInput = {

  /** Numeric atomic commands for operating on inventoryQuantity. */
  inventoryQuantity?: (NumericAtomicFieldUpdateInput)[];

  /** Numeric atomic commands for operating on position. */
  position?: (NumericAtomicFieldUpdateInput)[];
};



export type InternalSenditConfigInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  accountType?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  publicKey?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: InternalBelongsToInput | null;

  token?: (Scalars['String'] | null) | null;
};



export type InternalSpeedafConfigInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  apiEndpoint?: (Scalars['String'] | null) | null;

  appCode?: (Scalars['String'] | null) | null;

  customerCode?: (Scalars['String'] | null) | null;

  lastAuthenticated?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  platformSource?: (Scalars['String'] | null) | null;

  secretKey?: (Scalars['String'] | null) | null;

  shop?: InternalBelongsToInput | null;
};



export type InternalCustomCityInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  isActive?: (Scalars['Boolean'] | null) | null;

  addedAt?: Date | Scalars['ISO8601DateString'] | null;

  courierType?: CustomCityCourierTypeEnum | null;

  name?: (Scalars['String'] | null) | null;

  shop?: InternalBelongsToInput | null;
};


/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  /** Represents an amount of some currency. Specified as a string so user's aren't tempted to do math on the value. */
  CurrencyAmount: string;
  /** Represents a UTC date formatted an ISO-8601 formatted 'full-date' string. */
  ISO8601DateString: string;
  /** A file object produced by a browser for uploading to cloud storage */
  Upload: File;
  /** A record's current state for a recordState type field */
  StateValue: Record<string, string>;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: JSONObject;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: JSONValue;
  /** Integer type that can handle bigints and Big numbers */
  Int: number;
  /** The ID of a record in Gadget */
  GadgetID: string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** Represents the state of one record in a Gadget database. Represented as either a string or set of strings nested in objects. */
  RecordState: (string | { [key: string]: Scalars['RecordState'] });
  /** Instructions for a client to turn raw transport types (like strings) into useful client side types (like Dates). Unstable and not intended for developer use. */
  HydrationPlan: unknown;
};


/** This Error object is returned for errors which don't have other specific handling. It has a message which is safe to display to users, but is often technical in nature. It also has a `code` field which is documented in the Gadget API Error Codes docs. */
export interface SimpleError extends ExecutionError {
  __typename: 'SimpleError';
  /** The human facing error message for this error. */
  message: Scalars['String'];
  /** The Gadget platform error code for this error. */
  code: Scalars['String'];
  /** The stack for any exception that caused the error */
  stack: (Scalars['String'] | null);
};



export type AvailableSimpleErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this error. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error */
  stack?: boolean | null | undefined;
};



export type ExecutionError = {

  __typename: 'SimpleError'|'InvalidRecordError';

  /** The human facing error message for this error. */
  message: Scalars['String'];

  /** The Gadget platform error code for this error. */
  code: Scalars['String'];

  /** The stack for any exception that caused the error. Only available for super users. */
  stack: (Scalars['String'] | null);
};



export type AvailableExecutionErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this error. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error. Only available for super users. */
  stack?: boolean | null | undefined;
};


/** This object is returned as an error when a record doesn't pass the defined validations on the model. The validation messages for each of the invalid fields are available via the other fields on this error type. */
export interface InvalidRecordError extends ExecutionError {
  __typename: 'InvalidRecordError';
  /** The human facing error message for this error. */
  message: Scalars['String'];
  /** The Gadget platform error code for this InvalidRecordError. */
  code: Scalars['String'];
  /** The stack for any exception that caused the error */
  stack: (Scalars['String'] | null);
  /** An object mapping field apiIdentifiers to arrays of validation error message strings for that field, as a JSON object. The object may have keys that don't correspond exactly to field apiIdentifiers if added by validations, and the object may have missing keys if no errors were encountered for that field. */
  validationErrorsByField: (Scalars['JSONObject'] | null);
  /** A list of InvalidFieldError objects describing each of the errors encountered on the invalid record. */
  validationErrors: InvalidFieldError[];
  /** The record which failed validation, if available. Returns all the owned fields of the record -- no sub-selections are required or possible. Only available for super users. */
  record: (Scalars['JSONObject'] | null);
  /** The model of the record which failed validation */
  model: (GadgetModel | null);
};



export type AvailableInvalidRecordErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this InvalidRecordError. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error */
  stack?: boolean | null | undefined;

  /** An object mapping field apiIdentifiers to arrays of validation error message strings for that field, as a JSON object. The object may have keys that don't correspond exactly to field apiIdentifiers if added by validations, and the object may have missing keys if no errors were encountered for that field. */
  validationErrorsByField?: boolean | null | undefined;

  /** A list of InvalidFieldError objects describing each of the errors encountered on the invalid record. */
  validationErrors?: AvailableInvalidFieldErrorSelection;

  /** The record which failed validation, if available. Returns all the owned fields of the record -- no sub-selections are required or possible. Only available for super users. */
  record?: boolean | null | undefined;

  /** The model of the record which failed validation */
  model?: AvailableGadgetModelSelection;
};


/** This Error object represents one individual failed validation for a record field. It has a message which is appropriate for display to a user, and lists the apiIdentifier of the field in question. The `apiIdentifier` for the field is not guaranteed to exist on the model. */
export type InvalidFieldError = {

  __typename: 'InvalidFieldError';

  /** The human facing error message for this error. */
  message: Scalars['String'];

  /** The apiIdentifier of the field this error occurred on. */
  apiIdentifier: Scalars['String'];
};



export type AvailableInvalidFieldErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The apiIdentifier of the field this error occurred on. */
  apiIdentifier?: boolean | null | undefined;
};



export type GadgetModel = {

  __typename: 'GadgetModel';

  key: Scalars['String'];

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  filterable: Scalars['Boolean'];

  sortable: Scalars['Boolean'];

  searchable: Scalars['Boolean'];

  defaultDisplayField: GadgetModelField;

  fields: GadgetModelField[];

  actions: GadgetAction[];

  action: (GadgetAction | null);

  pluralName: Scalars['String'];

  pluralApiIdentifier: Scalars['String'];

  currentSingletonApiIdentifier: (Scalars['String'] | null);

  defaultRecord: Scalars['JSON'];

  initialCreatedState: (Scalars['String'] | null);
};



export type AvailableGadgetModelSelection = {

  __typename?: boolean | null | undefined;

  key?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  filterable?: boolean | null | undefined;

  sortable?: boolean | null | undefined;

  searchable?: boolean | null | undefined;

  defaultDisplayField?: AvailableGadgetModelFieldSelection;

  fields?: AvailableGadgetModelFieldSelection;

  actions?: AvailableGadgetActionSelection;

  action?: AvailableGadgetActionSelection;

  pluralName?: boolean | null | undefined;

  pluralApiIdentifier?: boolean | null | undefined;

  currentSingletonApiIdentifier?: boolean | null | undefined;

  defaultRecord?: boolean | null | undefined;

  initialCreatedState?: boolean | null | undefined;
};


/** One field of a Gadget model */
export interface GadgetModelField extends GadgetField {
  __typename: 'GadgetModelField';
  name: Scalars['String'];
  apiIdentifier: Scalars['String'];
  fieldType: GadgetFieldType;
  hasDefault: Scalars['Boolean'];
  required: Scalars['Boolean'];
  requiredArgumentForInput: Scalars['Boolean'];
  configuration: GadgetFieldConfigInterface;
  isUniqueField: Scalars['Boolean'];
  sortable: Scalars['Boolean'];
  filterable: Scalars['Boolean'];
  examples: GadgetModelFieldExamples;
};



export type AvailableGadgetModelFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;

  isUniqueField?: boolean | null | undefined;

  sortable?: boolean | null | undefined;

  filterable?: boolean | null | undefined;

  examples?: AvailableGadgetModelFieldExamplesSelection;
};



export type GadgetField = {

  __typename: 'GadgetModelField'|'GadgetObjectField';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  fieldType: GadgetFieldType;

  hasDefault: Scalars['Boolean'];

  required: Scalars['Boolean'];

  requiredArgumentForInput: Scalars['Boolean'];

  configuration: GadgetFieldConfigInterface;
};



export type AvailableGadgetFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;
};


/** The common bits that all field configuration types share */
export type GadgetFieldConfigInterface = {

  __typename: 'GadgetGenericFieldConfig'|'GadgetObjectFieldConfig'|'GadgetBelongsToConfig'|'GadgetHasOneConfig'|'GadgetHasManyConfig'|'GadgetHasManyThroughConfig'|'GadgetEnumConfig'|'GadgetDateTimeConfig'|'GadgetNumberConfig';

  fieldType: GadgetFieldType;

  validations: (GadgetFieldValidationUnion | null)[];
};



export type AvailableGadgetFieldConfigInterfaceSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;
};



export type GadgetModelFieldExamples = {

  __typename: 'GadgetModelFieldExamples';

  linkExistingChild: (GadgetFieldUsageExample | null);

  linkNewChild: (GadgetFieldUsageExample | null);

  linkToExistingParent: (GadgetFieldUsageExample | null);

  createNestedInParent: (GadgetFieldUsageExample | null);
};



export type AvailableGadgetModelFieldExamplesSelection = {

  __typename?: boolean | null | undefined;

  linkExistingChild?: AvailableGadgetFieldUsageExampleSelection;

  linkNewChild?: AvailableGadgetFieldUsageExampleSelection;

  linkToExistingParent?: AvailableGadgetFieldUsageExampleSelection;

  createNestedInParent?: AvailableGadgetFieldUsageExampleSelection;
};



export type GadgetFieldUsageExample = {

  __typename: 'GadgetFieldUsageExample';

  exampleGraphQLMutation: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];
};



export type AvailableGadgetFieldUsageExampleSelection = {

  __typename?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;
};



export type GadgetAction = {

  __typename: 'GadgetAction';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  requiresInput: Scalars['Boolean'];

  acceptsInput: Scalars['Boolean'];

  /** @deprecated This field will be removed. Use `isDeleteAction` instead. */
  hasDeleteRecordEffect: Scalars['Boolean'];

  /** @deprecated This field will be removed. Use `isCreateOrUpdateAction` instead. */
  hasCreateOrUpdateEffect: Scalars['Boolean'];

  isDeleteAction: Scalars['Boolean'];

  isCreateOrUpdateAction: Scalars['Boolean'];

  isUpsertMetaAction: Scalars['Boolean'];

  operatesWithRecordIdentity: Scalars['Boolean'];

  /** @deprecated This field will be removed. */
  possibleTransitions: Scalars['JSONObject'];

  availableInBulk: Scalars['Boolean'];

  bulkApiIdentifier: (Scalars['String'] | null);

  hasAmbiguousIdentifier: Scalars['Boolean'];

  inputFields: GadgetObjectField[];

  bulkInvokedByIDOnly: Scalars['Boolean'];

  triggers: GadgetTrigger[];

  examples: (GadgetActionGraphQLType | null);
};



export type AvailableGadgetActionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  requiresInput?: boolean | null | undefined;

  acceptsInput?: boolean | null | undefined;

  /** @deprecated This field will be removed. Use `isDeleteAction` instead. */
  hasDeleteRecordEffect?: boolean | null | undefined;

  /** @deprecated This field will be removed. Use `isCreateOrUpdateAction` instead. */
  hasCreateOrUpdateEffect?: boolean | null | undefined;

  isDeleteAction?: boolean | null | undefined;

  isCreateOrUpdateAction?: boolean | null | undefined;

  isUpsertMetaAction?: boolean | null | undefined;

  operatesWithRecordIdentity?: boolean | null | undefined;

  /** @deprecated This field will be removed. */
  possibleTransitions?: boolean | null | undefined;

  availableInBulk?: boolean | null | undefined;

  bulkApiIdentifier?: boolean | null | undefined;

  hasAmbiguousIdentifier?: boolean | null | undefined;

  inputFields?: AvailableGadgetObjectFieldSelection;

  bulkInvokedByIDOnly?: boolean | null | undefined;

  triggers?: AvailableGadgetTriggerSelection;

  examples?: AvailableGadgetActionGraphQLTypeSelection;
};


/** One field of an action input or other transitory object in Gadget */
export interface GadgetObjectField extends GadgetField {
  __typename: 'GadgetObjectField';
  name: Scalars['String'];
  apiIdentifier: Scalars['String'];
  fieldType: GadgetFieldType;
  hasDefault: Scalars['Boolean'];
  required: Scalars['Boolean'];
  requiredArgumentForInput: Scalars['Boolean'];
  configuration: GadgetFieldConfigInterface;
};



export type AvailableGadgetObjectFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;
};



export type GadgetTrigger = {

  __typename: 'GadgetTrigger';

  specID: Scalars['String'];
};



export type AvailableGadgetTriggerSelection = {

  __typename?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export type GadgetActionGraphQLType = {

  __typename: 'GadgetActionGraphQLType';

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation: Scalars['String'];

  exampleGraphQLMutation: Scalars['String'];

  inputGraphQLTypeSDL: (Scalars['String'] | null);

  outputGraphQLTypeSDL: Scalars['String'];

  inputTypeScriptInterface: (Scalars['String'] | null);

  outputTypeScriptInterface: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleJSInputs: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];

  /** @deprecated moved to exampleBulkGraphQLMutation */
  exampleBulkMutation: (Scalars['String'] | null);

  exampleBulkGraphQLMutation: (Scalars['String'] | null);

  exampleBulkGraphQLVariables: (Scalars['JSON'] | null);

  exampleBulkImperativeInvocation: (Scalars['String'] | null);

  exampleBulkReactHook: (Scalars['String'] | null);

  bulkOutputGraphQLTypeSDL: (Scalars['String'] | null);
};



export type AvailableGadgetActionGraphQLTypeSelection = {

  __typename?: boolean | null | undefined;

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  inputGraphQLTypeSDL?: boolean | null | undefined;

  outputGraphQLTypeSDL?: boolean | null | undefined;

  inputTypeScriptInterface?: boolean | null | undefined;

  outputTypeScriptInterface?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleJSInputs?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;

  /** @deprecated moved to exampleBulkGraphQLMutation */
  exampleBulkMutation?: boolean | null | undefined;

  exampleBulkGraphQLMutation?: boolean | null | undefined;

  exampleBulkGraphQLVariables?: boolean | null | undefined;

  exampleBulkImperativeInvocation?: boolean | null | undefined;

  exampleBulkReactHook?: boolean | null | undefined;

  bulkOutputGraphQLTypeSDL?: boolean | null | undefined;
};



export interface GadgetGenericFieldConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetGenericFieldConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
};



export type AvailableGadgetGenericFieldConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;
};



export interface GadgetObjectFieldConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetObjectFieldConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  name: (Scalars['String'] | null);
  fields: GadgetModelField[];
};



export type AvailableGadgetObjectFieldConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  name?: boolean | null | undefined;

  fields?: AvailableGadgetModelFieldSelection;
};



export interface GadgetBelongsToConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetBelongsToConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
};



export type AvailableGadgetBelongsToConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;
};



export interface GadgetHasOneConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetHasOneConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  inverseField: (GadgetModelField | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
};



export type AvailableGadgetHasOneConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  inverseField?: AvailableGadgetModelFieldSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;
};



export interface GadgetHasManyConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetHasManyConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  inverseField: (GadgetModelField | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
  isJoinModelHasManyField: Scalars['Boolean'];
};



export type AvailableGadgetHasManyConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  inverseField?: AvailableGadgetModelFieldSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;

  isJoinModelHasManyField?: boolean | null | undefined;
};



export interface GadgetHasManyThroughConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetHasManyThroughConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  inverseField: (GadgetModelField | null);
  joinModelKey: (Scalars['String'] | null);
  joinModel: (GadgetModel | null);
  inverseJoinModelField: (GadgetModelField | null);
  inverseRelatedModelField: (GadgetModelField | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
  joinModelHasManyFieldApiIdentifier: (Scalars['String'] | null);
};



export type AvailableGadgetHasManyThroughConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  inverseField?: AvailableGadgetModelFieldSelection;

  joinModelKey?: boolean | null | undefined;

  joinModel?: AvailableGadgetModelSelection;

  inverseJoinModelField?: AvailableGadgetModelFieldSelection;

  inverseRelatedModelField?: AvailableGadgetModelFieldSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;

  joinModelHasManyFieldApiIdentifier?: boolean | null | undefined;
};



export interface GadgetEnumConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetEnumConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  allowMultiple: Scalars['Boolean'];
  allowOther: Scalars['Boolean'];
  options: GadgetEnumOption[];
};



export type AvailableGadgetEnumConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  allowMultiple?: boolean | null | undefined;

  allowOther?: boolean | null | undefined;

  options?: AvailableGadgetEnumOptionSelection;
};



export type GadgetEnumOption = {

  __typename: 'GadgetEnumOption';

  name: Scalars['String'];

  color: Scalars['String'];
};



export type AvailableGadgetEnumOptionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  color?: boolean | null | undefined;
};



export interface GadgetDateTimeConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetDateTimeConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  includeTime: Scalars['Boolean'];
};



export type AvailableGadgetDateTimeConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  includeTime?: boolean | null | undefined;
};



export interface GadgetNumberConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetNumberConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  decimals: (Scalars['Int'] | null);
};



export type AvailableGadgetNumberConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  decimals?: boolean | null | undefined;
};



export interface GadgetRegexFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetRegexFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  pattern: (Scalars['String'] | null);
};



export type AvailableGadgetRegexFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  pattern?: boolean | null | undefined;
};


/** The common bits that all field validation types share */
export type GadgetFieldValidationInterface = {

  __typename: 'GadgetRegexFieldValidation'|'GadgetRangeFieldValidation'|'GadgetOnlyImageFileFieldValidation'|'GadgetGenericFieldValidation';

  name: Scalars['String'];

  specID: Scalars['String'];
};



export type AvailableGadgetFieldValidationInterfaceSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export interface GadgetRangeFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetRangeFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  min: (Scalars['Int'] | null);
  max: (Scalars['Int'] | null);
};



export type AvailableGadgetRangeFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  min?: boolean | null | undefined;

  max?: boolean | null | undefined;
};



export interface GadgetOnlyImageFileFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetOnlyImageFileFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  allowAnimatedImages: Scalars['Boolean'];
};



export type AvailableGadgetOnlyImageFileFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  allowAnimatedImages?: boolean | null | undefined;
};



export interface GadgetGenericFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetGenericFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
};



export type AvailableGadgetGenericFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export interface UpsertError extends UpsertShopifyCustomerResult, UpsertShopifyGdprRequestResult, UpsertShopifyOrderResult, UpsertShopifyShopResult, UpsertShopifySyncResult, UpsertGoogleSheetConfigResult, UpsertShopifyFulfillmentResult, UpsertShopifyFulfillmentOrderResult, UpsertShopifyFulfillmentServiceResult, UpsertShopifyProductResult, UpsertShopifyProductVariantResult, UpsertSenditConfigResult, UpsertSpeedafConfigResult, UpsertCustomCityResult {
  __typename: 'UpsertError';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertErrorSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyCustomerResult = {

  __typename: 'UpsertError'|'CreateShopifyCustomerResult'|'UpdateShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyGdprRequestResult = {

  __typename: 'UpsertError'|'CreateShopifyGdprRequestResult'|'UpdateShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyOrderResult = {

  __typename: 'UpsertError'|'UpdateShopifyOrderResult'|'CreateShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyShopResult = {

  __typename: 'UpsertError'|'UpdateShopifyShopResult'|'InstallShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifySyncResult = {

  __typename: 'UpsertError'|'AbortShopifySyncResult'|'RunShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertGoogleSheetConfigResult = {

  __typename: 'UpsertError'|'CreateGoogleSheetConfigResult'|'UpdateGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyFulfillmentResult = {

  __typename: 'UpsertError'|'CreateShopifyFulfillmentResult'|'UpdateShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyFulfillmentOrderResult = {

  __typename: 'UpsertError'|'CreateShopifyFulfillmentOrderResult'|'UpdateShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyFulfillmentServiceResult = {

  __typename: 'UpsertError'|'CreateShopifyFulfillmentServiceResult'|'UpdateShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyProductResult = {

  __typename: 'UpsertError'|'CreateShopifyProductResult'|'UpdateShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertShopifyProductVariantResult = {

  __typename: 'UpsertError'|'CreateShopifyProductVariantResult'|'UpdateShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertSenditConfigResult = {

  __typename: 'UpsertError'|'CreateSenditConfigResult'|'UpdateSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertSpeedafConfigResult = {

  __typename: 'UpsertError'|'CreateSpeedafConfigResult'|'UpdateSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type UpsertCustomCityResult = {

  __typename: 'UpsertError'|'CreateCustomCityResult'|'UpdateCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableUpsertCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type Query = {

  __typename: 'Query';

  shopifyCustomer: (ShopifyCustomer | null);

  shopifyCustomers: ShopifyCustomerConnection;

  shopifyGdprRequest: (ShopifyGdprRequest | null);

  shopifyGdprRequests: ShopifyGdprRequestConnection;

  shopifyOrder: (ShopifyOrder | null);

  shopifyOrders: ShopifyOrderConnection;

  shopifyShop: (ShopifyShop | null);

  shopifyShops: ShopifyShopConnection;

  shopifySync: (ShopifySync | null);

  shopifySyncs: ShopifySyncConnection;

  googleSheetConfig: (GoogleSheetConfig | null);

  googleSheetConfigs: GoogleSheetConfigConnection;

  session: (Session | null);

  sessions: SessionConnection;

  shopifyFulfillment: (ShopifyFulfillment | null);

  shopifyFulfillments: ShopifyFulfillmentConnection;

  shopifyFulfillmentOrder: (ShopifyFulfillmentOrder | null);

  shopifyFulfillmentOrders: ShopifyFulfillmentOrderConnection;

  shopifyFulfillmentService: (ShopifyFulfillmentService | null);

  shopifyFulfillmentServices: ShopifyFulfillmentServiceConnection;

  shopifyProduct: (ShopifyProduct | null);

  shopifyProducts: ShopifyProductConnection;

  shopifyProductVariant: (ShopifyProductVariant | null);

  shopifyProductVariants: ShopifyProductVariantConnection;

  senditConfig: (SenditConfig | null);

  senditConfigs: SenditConfigConnection;

  speedafConfig: (SpeedafConfig | null);

  speedafConfigs: SpeedafConfigConnection;

  customCity: (CustomCity | null);

  customCities: CustomCityConnection;

  currentSession: (Session | null);

  shopifyConnection: Shopify;

  internal: InternalQueries;
};



export type AvailableQuerySelection = {

  __typename?: boolean | null | undefined;

  shopifyCustomer?: AvailableShopifyCustomerSelection;

  shopifyCustomers?: AvailableShopifyCustomerConnectionSelection;

  shopifyGdprRequest?: AvailableShopifyGdprRequestSelection;

  shopifyGdprRequests?: AvailableShopifyGdprRequestConnectionSelection;

  shopifyOrder?: AvailableShopifyOrderSelection;

  shopifyOrders?: AvailableShopifyOrderConnectionSelection;

  shopifyShop?: AvailableShopifyShopSelection;

  shopifyShops?: AvailableShopifyShopConnectionSelection;

  shopifySync?: AvailableShopifySyncSelection;

  shopifySyncs?: AvailableShopifySyncConnectionSelection;

  googleSheetConfig?: AvailableGoogleSheetConfigSelection;

  googleSheetConfigs?: AvailableGoogleSheetConfigConnectionSelection;

  session?: AvailableSessionSelection;

  sessions?: AvailableSessionConnectionSelection;

  shopifyFulfillment?: AvailableShopifyFulfillmentSelection;

  shopifyFulfillments?: AvailableShopifyFulfillmentConnectionSelection;

  shopifyFulfillmentOrder?: AvailableShopifyFulfillmentOrderSelection;

  shopifyFulfillmentOrders?: AvailableShopifyFulfillmentOrderConnectionSelection;

  shopifyFulfillmentService?: AvailableShopifyFulfillmentServiceSelection;

  shopifyFulfillmentServices?: AvailableShopifyFulfillmentServiceConnectionSelection;

  shopifyProduct?: AvailableShopifyProductSelection;

  shopifyProducts?: AvailableShopifyProductConnectionSelection;

  shopifyProductVariant?: AvailableShopifyProductVariantSelection;

  shopifyProductVariants?: AvailableShopifyProductVariantConnectionSelection;

  senditConfig?: AvailableSenditConfigSelection;

  senditConfigs?: AvailableSenditConfigConnectionSelection;

  speedafConfig?: AvailableSpeedafConfigSelection;

  speedafConfigs?: AvailableSpeedafConfigConnectionSelection;

  customCity?: AvailableCustomCitySelection;

  customCities?: AvailableCustomCityConnectionSelection;

  currentSession?: AvailableSessionSelection;

  shopifyConnection?: AvailableShopifySelection;

  internal?: AvailableInternalQueriesSelection;
};



export type ShopifyCustomer = {

  __typename: 'ShopifyCustomer';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  statistics: (Scalars['JSON'] | null);

  locale: (Scalars['String'] | null);

  acceptsMarketing: (Scalars['Boolean'] | null);

  acceptsMarketingUpdatedAt: (Scalars['DateTime'] | null);

  shopifyCreatedAt: (Scalars['DateTime'] | null);

  currency: (Scalars['String'] | null);

  email: (Scalars['String'] | null);

  emailMarketingConsent: (Scalars['JSON'] | null);

  firstName: (Scalars['String'] | null);

  lastName: (Scalars['String'] | null);

  marketingOptInLevel: (Scalars['String'] | null);

  multipassIdentifier: (Scalars['String'] | null);

  note: (Scalars['String'] | null);

  orders: ShopifyOrderConnection;

  phone: (Scalars['String'] | null);

  smsMarketingConsent: (Scalars['JSON'] | null);

  shopifyState: ShopifyCustomerShopifyStateEnum;

  tags: (Scalars['JSON'] | null);

  taxExempt: (Scalars['Boolean'] | null);

  taxExemptions: ShopifyCustomerTaxExemptionsEnum[];

  shopifyUpdatedAt: (Scalars['DateTime'] | null);

  verifiedEmail: (Scalars['Boolean'] | null);

  lastOrder: (ShopifyOrder | null);

  lastOrderId: (Scalars['GadgetID'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyCustomerSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  statistics?: boolean | null | undefined;

  locale?: boolean | null | undefined;

  acceptsMarketing?: boolean | null | undefined;

  acceptsMarketingUpdatedAt?: boolean | null | undefined;

  shopifyCreatedAt?: boolean | null | undefined;

  currency?: boolean | null | undefined;

  email?: boolean | null | undefined;

  emailMarketingConsent?: boolean | null | undefined;

  firstName?: boolean | null | undefined;

  lastName?: boolean | null | undefined;

  marketingOptInLevel?: boolean | null | undefined;

  multipassIdentifier?: boolean | null | undefined;

  note?: boolean | null | undefined;

  orders?: AvailableShopifyOrderConnectionSelection;

  phone?: boolean | null | undefined;

  smsMarketingConsent?: boolean | null | undefined;

  shopifyState?: boolean | null | undefined;

  tags?: boolean | null | undefined;

  taxExempt?: boolean | null | undefined;

  taxExemptions?: boolean | null | undefined;

  shopifyUpdatedAt?: boolean | null | undefined;

  verifiedEmail?: boolean | null | undefined;

  lastOrder?: AvailableShopifyOrderSelection;

  lastOrderId?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyOrder items. */
export type ShopifyOrderConnection = {

  __typename: 'ShopifyOrderConnection';

  /** A list of edges. */
  edges: ShopifyOrderEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyOrderConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyOrderEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyOrder connection. */
export type ShopifyOrderEdge = {

  __typename: 'ShopifyOrderEdge';

  /** The item at the end of the edge */
  node: ShopifyOrder;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyOrderEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyOrderSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyOrder = {

  __typename: 'ShopifyOrder';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  additionalFees: (Scalars['JSON'] | null);

  cancellation: (Scalars['JSON'] | null);

  billingAddress: (Scalars['JSON'] | null);

  browserIp: (Scalars['String'] | null);

  buyerAcceptsMarketing: (Scalars['Boolean'] | null);

  cancelReason: ShopifyOrderCancelReasonEnum;

  cancelledAt: (Scalars['DateTime'] | null);

  cartToken: (Scalars['String'] | null);

  checkoutToken: (Scalars['String'] | null);

  clientDetails: (Scalars['JSON'] | null);

  closedAt: (Scalars['DateTime'] | null);

  currency: ShopifyOrderCurrencyEnum;

  customerLocale: (Scalars['String'] | null);

  discountApplications: (Scalars['JSON'] | null);

  discountCodes: (Scalars['JSON'] | null);

  email: (Scalars['String'] | null);

  estimatedTaxes: (Scalars['Boolean'] | null);

  financialStatus: ShopifyOrderFinancialStatusEnum;

  fulfillmentStatus: ShopifyOrderFulfillmentStatusEnum;

  landingSite: (Scalars['String'] | null);

  name: (Scalars['String'] | null);

  note: (Scalars['String'] | null);

  noteAttributes: (Scalars['JSON'] | null);

  orderStatusUrl: (Scalars['String'] | null);

  paymentGatewayNames: (Scalars['JSON'] | null);

  presentmentCurrency: ShopifyOrderPresentmentCurrencyEnum;

  processedAt: (Scalars['DateTime'] | null);

  processingMethod: (Scalars['String'] | null);

  shippingAddress: (Scalars['JSON'] | null);

  sourceName: (Scalars['String'] | null);

  subtotalPrice: (Scalars['String'] | null);

  subtotalPriceSet: (Scalars['JSON'] | null);

  tags: (Scalars['JSON'] | null);

  taxLines: (Scalars['JSON'] | null);

  taxesIncluded: (Scalars['Boolean'] | null);

  test: (Scalars['Boolean'] | null);

  totalDiscounts: (Scalars['String'] | null);

  totalDiscountsSet: (Scalars['JSON'] | null);

  totalLineItemsPrice: (Scalars['String'] | null);

  totalLineItemsPriceSet: (Scalars['JSON'] | null);

  totalOutstanding: (Scalars['String'] | null);

  totalPrice: (Scalars['String'] | null);

  totalPriceSet: (Scalars['JSON'] | null);

  totalTax: (Scalars['String'] | null);

  totalTaxSet: (Scalars['JSON'] | null);

  totalTipReceived: (Scalars['String'] | null);

  totalWeight: (Scalars['Float'] | null);

  customer: (ShopifyCustomer | null);

  customerId: (Scalars['GadgetID'] | null);

  fulfillments: ShopifyFulfillmentConnection;

  shopifyShop: (ShopifyShop | null);

  shopifyShopId: (Scalars['GadgetID'] | null);

  fulfillmentOrders: ShopifyFulfillmentOrderConnection;

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  writeOrder: (Scalars['Boolean'] | null);

  autoWrite: (Scalars['Boolean'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyOrderSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  additionalFees?: boolean | null | undefined;

  cancellation?: boolean | null | undefined;

  billingAddress?: boolean | null | undefined;

  browserIp?: boolean | null | undefined;

  buyerAcceptsMarketing?: boolean | null | undefined;

  cancelReason?: boolean | null | undefined;

  cancelledAt?: boolean | null | undefined;

  cartToken?: boolean | null | undefined;

  checkoutToken?: boolean | null | undefined;

  clientDetails?: boolean | null | undefined;

  closedAt?: boolean | null | undefined;

  currency?: boolean | null | undefined;

  customerLocale?: boolean | null | undefined;

  discountApplications?: boolean | null | undefined;

  discountCodes?: boolean | null | undefined;

  email?: boolean | null | undefined;

  estimatedTaxes?: boolean | null | undefined;

  financialStatus?: boolean | null | undefined;

  fulfillmentStatus?: boolean | null | undefined;

  landingSite?: boolean | null | undefined;

  name?: boolean | null | undefined;

  note?: boolean | null | undefined;

  noteAttributes?: boolean | null | undefined;

  orderStatusUrl?: boolean | null | undefined;

  paymentGatewayNames?: boolean | null | undefined;

  presentmentCurrency?: boolean | null | undefined;

  processedAt?: boolean | null | undefined;

  processingMethod?: boolean | null | undefined;

  shippingAddress?: boolean | null | undefined;

  sourceName?: boolean | null | undefined;

  subtotalPrice?: boolean | null | undefined;

  subtotalPriceSet?: boolean | null | undefined;

  tags?: boolean | null | undefined;

  taxLines?: boolean | null | undefined;

  taxesIncluded?: boolean | null | undefined;

  test?: boolean | null | undefined;

  totalDiscounts?: boolean | null | undefined;

  totalDiscountsSet?: boolean | null | undefined;

  totalLineItemsPrice?: boolean | null | undefined;

  totalLineItemsPriceSet?: boolean | null | undefined;

  totalOutstanding?: boolean | null | undefined;

  totalPrice?: boolean | null | undefined;

  totalPriceSet?: boolean | null | undefined;

  totalTax?: boolean | null | undefined;

  totalTaxSet?: boolean | null | undefined;

  totalTipReceived?: boolean | null | undefined;

  totalWeight?: boolean | null | undefined;

  customer?: AvailableShopifyCustomerSelection;

  customerId?: boolean | null | undefined;

  fulfillments?: AvailableShopifyFulfillmentConnectionSelection;

  shopifyShop?: AvailableShopifyShopSelection;

  shopifyShopId?: boolean | null | undefined;

  fulfillmentOrders?: AvailableShopifyFulfillmentOrderConnectionSelection;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  writeOrder?: boolean | null | undefined;

  autoWrite?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyFulfillment items. */
export type ShopifyFulfillmentConnection = {

  __typename: 'ShopifyFulfillmentConnection';

  /** A list of edges. */
  edges: ShopifyFulfillmentEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyFulfillmentConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyFulfillmentEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyFulfillment connection. */
export type ShopifyFulfillmentEdge = {

  __typename: 'ShopifyFulfillmentEdge';

  /** The item at the end of the edge */
  node: ShopifyFulfillment;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyFulfillmentEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyFulfillmentSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyFulfillment = {

  __typename: 'ShopifyFulfillment';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  shopifyCreatedAt: (Scalars['DateTime'] | null);

  name: (Scalars['String'] | null);

  originAddress: (Scalars['JSON'] | null);

  receipt: (Scalars['JSON'] | null);

  service: (Scalars['String'] | null);

  shipmentStatus: (Scalars['String'] | null);

  status: ShopifyFulfillmentStatusEnum;

  trackingCompany: (Scalars['String'] | null);

  trackingNumbers: (Scalars['JSON'] | null);

  trackingUrls: (Scalars['JSON'] | null);

  shopifyUpdatedAt: (Scalars['DateTime'] | null);

  order: (ShopifyOrder | null);

  orderId: (Scalars['GadgetID'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyFulfillmentSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  shopifyCreatedAt?: boolean | null | undefined;

  name?: boolean | null | undefined;

  originAddress?: boolean | null | undefined;

  receipt?: boolean | null | undefined;

  service?: boolean | null | undefined;

  shipmentStatus?: boolean | null | undefined;

  status?: boolean | null | undefined;

  trackingCompany?: boolean | null | undefined;

  trackingNumbers?: boolean | null | undefined;

  trackingUrls?: boolean | null | undefined;

  shopifyUpdatedAt?: boolean | null | undefined;

  order?: AvailableShopifyOrderSelection;

  orderId?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};



export type ShopifyShop = {

  __typename: 'ShopifyShop';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state: Scalars['RecordState'];

  plan: (Scalars['JSON'] | null);

  address1: (Scalars['String'] | null);

  address2: (Scalars['String'] | null);

  city: (Scalars['String'] | null);

  country: (Scalars['String'] | null);

  countryCode: (Scalars['String'] | null);

  countryName: (Scalars['String'] | null);

  countyTaxes: (Scalars['JSON'] | null);

  shopifyCreatedAt: (Scalars['DateTime'] | null);

  currency: ShopifyShopCurrencyEnum;

  customerEmail: (Scalars['String'] | null);

  disabledWebhooks: (Scalars['JSON'] | null);

  domain: (Scalars['String'] | null);

  eligibleForPayments: (Scalars['Boolean'] | null);

  email: (Scalars['String'] | null);

  enabledPresentmentCurrencies: ShopifyShopEnabledPresentmentCurrenciesEnum[];

  finances: (Scalars['Boolean'] | null);

  googleAppsDomain: (Scalars['String'] | null);

  googleAppsLoginEnabled: (Scalars['Boolean'] | null);

  grantedScopes: (Scalars['JSON'] | null);

  hasDiscounts: (Scalars['Boolean'] | null);

  hasGiftCards: (Scalars['Boolean'] | null);

  hasStorefront: (Scalars['Boolean'] | null);

  ianaTimezone: (Scalars['String'] | null);

  installedViaApiKey: (Scalars['String'] | null);

  latitude: (Scalars['Float'] | null);

  longitude: (Scalars['Float'] | null);

  marketingSmsContentEnabledAtCheckout: (Scalars['Boolean'] | null);

  moneyFormat: (Scalars['String'] | null);

  moneyInEmailsFormat: (Scalars['String'] | null);

  moneyWithCurrencyFormat: (Scalars['String'] | null);

  moneyWithCurrencyInEmailsFormat: (Scalars['String'] | null);

  multiLocationEnabled: (Scalars['Boolean'] | null);

  myshopifyDomain: (Scalars['String'] | null);

  name: (Scalars['String'] | null);

  passwordEnabled: (Scalars['Boolean'] | null);

  phone: (Scalars['String'] | null);

  planDisplayName: (Scalars['String'] | null);

  planName: (Scalars['String'] | null);

  preLaunchEnabled: (Scalars['Boolean'] | null);

  primaryLocale: (Scalars['String'] | null);

  province: (Scalars['String'] | null);

  provinceCode: (Scalars['String'] | null);

  registeredWebhooks: (Scalars['JSON'] | null);

  requiresExtraPaymentsAgreement: (Scalars['Boolean'] | null);

  setupRequired: (Scalars['Boolean'] | null);

  shopOwner: (Scalars['String'] | null);

  source: (Scalars['String'] | null);

  shopifyUpdatedAt: (Scalars['DateTime'] | null);

  syncs: ShopifySyncConnection;

  gdprRequests: ShopifyGdprRequestConnection;

  fulfillmentOrders: ShopifyFulfillmentOrderConnection;

  fulfillmentServices: ShopifyFulfillmentServiceConnection;

  fulfillments: ShopifyFulfillmentConnection;

  customers: ShopifyCustomerConnection;

  orders: ShopifyOrderConnection;

  productVariants: ShopifyProductVariantConnection;

  products: ShopifyProductConnection;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyShopSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state?: boolean | null | undefined;

  plan?: boolean | null | undefined;

  address1?: boolean | null | undefined;

  address2?: boolean | null | undefined;

  city?: boolean | null | undefined;

  country?: boolean | null | undefined;

  countryCode?: boolean | null | undefined;

  countryName?: boolean | null | undefined;

  countyTaxes?: boolean | null | undefined;

  shopifyCreatedAt?: boolean | null | undefined;

  currency?: boolean | null | undefined;

  customerEmail?: boolean | null | undefined;

  disabledWebhooks?: boolean | null | undefined;

  domain?: boolean | null | undefined;

  eligibleForPayments?: boolean | null | undefined;

  email?: boolean | null | undefined;

  enabledPresentmentCurrencies?: boolean | null | undefined;

  finances?: boolean | null | undefined;

  googleAppsDomain?: boolean | null | undefined;

  googleAppsLoginEnabled?: boolean | null | undefined;

  grantedScopes?: boolean | null | undefined;

  hasDiscounts?: boolean | null | undefined;

  hasGiftCards?: boolean | null | undefined;

  hasStorefront?: boolean | null | undefined;

  ianaTimezone?: boolean | null | undefined;

  installedViaApiKey?: boolean | null | undefined;

  latitude?: boolean | null | undefined;

  longitude?: boolean | null | undefined;

  marketingSmsContentEnabledAtCheckout?: boolean | null | undefined;

  moneyFormat?: boolean | null | undefined;

  moneyInEmailsFormat?: boolean | null | undefined;

  moneyWithCurrencyFormat?: boolean | null | undefined;

  moneyWithCurrencyInEmailsFormat?: boolean | null | undefined;

  multiLocationEnabled?: boolean | null | undefined;

  myshopifyDomain?: boolean | null | undefined;

  name?: boolean | null | undefined;

  passwordEnabled?: boolean | null | undefined;

  phone?: boolean | null | undefined;

  planDisplayName?: boolean | null | undefined;

  planName?: boolean | null | undefined;

  preLaunchEnabled?: boolean | null | undefined;

  primaryLocale?: boolean | null | undefined;

  province?: boolean | null | undefined;

  provinceCode?: boolean | null | undefined;

  registeredWebhooks?: boolean | null | undefined;

  requiresExtraPaymentsAgreement?: boolean | null | undefined;

  setupRequired?: boolean | null | undefined;

  shopOwner?: boolean | null | undefined;

  source?: boolean | null | undefined;

  shopifyUpdatedAt?: boolean | null | undefined;

  syncs?: AvailableShopifySyncConnectionSelection;

  gdprRequests?: AvailableShopifyGdprRequestConnectionSelection;

  fulfillmentOrders?: AvailableShopifyFulfillmentOrderConnectionSelection;

  fulfillmentServices?: AvailableShopifyFulfillmentServiceConnectionSelection;

  fulfillments?: AvailableShopifyFulfillmentConnectionSelection;

  customers?: AvailableShopifyCustomerConnectionSelection;

  orders?: AvailableShopifyOrderConnectionSelection;

  productVariants?: AvailableShopifyProductVariantConnectionSelection;

  products?: AvailableShopifyProductConnectionSelection;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifySync items. */
export type ShopifySyncConnection = {

  __typename: 'ShopifySyncConnection';

  /** A list of edges. */
  edges: ShopifySyncEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifySyncConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifySyncEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifySync connection. */
export type ShopifySyncEdge = {

  __typename: 'ShopifySyncEdge';

  /** The item at the end of the edge */
  node: ShopifySync;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifySyncEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifySyncSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifySync = {

  __typename: 'ShopifySync';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state: Scalars['RecordState'];

  /** DateTime that this sync was run from */
  syncSince: (Scalars['DateTime'] | null);

  domain: Scalars['String'];

  errorDetails: (Scalars['String'] | null);

  errorMessage: (Scalars['String'] | null);

  force: (Scalars['Boolean'] | null);

  models: (Scalars['JSON'] | null);

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifySyncSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state?: boolean | null | undefined;

  /** DateTime that this sync was run from */
  syncSince?: boolean | null | undefined;

  domain?: boolean | null | undefined;

  errorDetails?: boolean | null | undefined;

  errorMessage?: boolean | null | undefined;

  force?: boolean | null | undefined;

  models?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** Information about pagination in a connection. */
export type PageInfo = {

  __typename: 'PageInfo';

  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];

  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];

  /** When paginating backwards, the cursor to continue. */
  startCursor: (Scalars['String'] | null);

  /** When paginating forwards, the cursor to continue. */
  endCursor: (Scalars['String'] | null);
};



export type AvailablePageInfoSelection = {

  __typename?: boolean | null | undefined;

  /** When paginating forwards, are there more items? */
  hasNextPage?: boolean | null | undefined;

  /** When paginating backwards, are there more items? */
  hasPreviousPage?: boolean | null | undefined;

  /** When paginating backwards, the cursor to continue. */
  startCursor?: boolean | null | undefined;

  /** When paginating forwards, the cursor to continue. */
  endCursor?: boolean | null | undefined;
};


/** A connection to a list of ShopifyGdprRequest items. */
export type ShopifyGdprRequestConnection = {

  __typename: 'ShopifyGdprRequestConnection';

  /** A list of edges. */
  edges: ShopifyGdprRequestEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyGdprRequestConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyGdprRequestEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyGdprRequest connection. */
export type ShopifyGdprRequestEdge = {

  __typename: 'ShopifyGdprRequestEdge';

  /** The item at the end of the edge */
  node: ShopifyGdprRequest;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyGdprRequestEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyGdprRequestSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyGdprRequest = {

  __typename: 'ShopifyGdprRequest';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  payload: (Scalars['JSON'] | null);

  topic: ShopifyGdprRequestTopicEnum;

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyGdprRequestSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  payload?: boolean | null | undefined;

  topic?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyFulfillmentOrder items. */
export type ShopifyFulfillmentOrderConnection = {

  __typename: 'ShopifyFulfillmentOrderConnection';

  /** A list of edges. */
  edges: ShopifyFulfillmentOrderEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyFulfillmentOrderConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyFulfillmentOrderEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyFulfillmentOrder connection. */
export type ShopifyFulfillmentOrderEdge = {

  __typename: 'ShopifyFulfillmentOrderEdge';

  /** The item at the end of the edge */
  node: ShopifyFulfillmentOrder;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyFulfillmentOrderEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyFulfillmentOrderSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyFulfillmentOrder = {

  __typename: 'ShopifyFulfillmentOrder';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  shopifyCreatedAt: (Scalars['DateTime'] | null);

  fulfillAt: (Scalars['DateTime'] | null);

  fulfillBy: (Scalars['DateTime'] | null);

  internationalDuties: (Scalars['JSON'] | null);

  requestStatus: ShopifyFulfillmentOrderRequestStatusEnum;

  status: ShopifyFulfillmentOrderStatusEnum;

  supportedActions: (Scalars['JSON'] | null);

  shopifyUpdatedAt: (Scalars['DateTime'] | null);

  order: (ShopifyOrder | null);

  orderId: (Scalars['GadgetID'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyFulfillmentOrderSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  shopifyCreatedAt?: boolean | null | undefined;

  fulfillAt?: boolean | null | undefined;

  fulfillBy?: boolean | null | undefined;

  internationalDuties?: boolean | null | undefined;

  requestStatus?: boolean | null | undefined;

  status?: boolean | null | undefined;

  supportedActions?: boolean | null | undefined;

  shopifyUpdatedAt?: boolean | null | undefined;

  order?: AvailableShopifyOrderSelection;

  orderId?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyFulfillmentService items. */
export type ShopifyFulfillmentServiceConnection = {

  __typename: 'ShopifyFulfillmentServiceConnection';

  /** A list of edges. */
  edges: ShopifyFulfillmentServiceEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyFulfillmentServiceConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyFulfillmentServiceEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyFulfillmentService connection. */
export type ShopifyFulfillmentServiceEdge = {

  __typename: 'ShopifyFulfillmentServiceEdge';

  /** The item at the end of the edge */
  node: ShopifyFulfillmentService;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyFulfillmentServiceEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyFulfillmentServiceSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyFulfillmentService = {

  __typename: 'ShopifyFulfillmentService';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  serviceName: (Scalars['String'] | null);

  type: ShopifyFulfillmentServiceTypeEnum;

  adminGraphqlApiId: (Scalars['String'] | null);

  callbackUrl: (Scalars['String'] | null);

  format: (Scalars['String'] | null);

  fulfillmentOrdersOptIn: (Scalars['Boolean'] | null);

  handle: (Scalars['String'] | null);

  inventoryManagement: (Scalars['Boolean'] | null);

  name: (Scalars['String'] | null);

  permitsSkuSharing: (Scalars['Boolean'] | null);

  requiresShippingMethod: (Scalars['Boolean'] | null);

  trackingSupport: (Scalars['Boolean'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyFulfillmentServiceSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  serviceName?: boolean | null | undefined;

  type?: boolean | null | undefined;

  adminGraphqlApiId?: boolean | null | undefined;

  callbackUrl?: boolean | null | undefined;

  format?: boolean | null | undefined;

  fulfillmentOrdersOptIn?: boolean | null | undefined;

  handle?: boolean | null | undefined;

  inventoryManagement?: boolean | null | undefined;

  name?: boolean | null | undefined;

  permitsSkuSharing?: boolean | null | undefined;

  requiresShippingMethod?: boolean | null | undefined;

  trackingSupport?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyCustomer items. */
export type ShopifyCustomerConnection = {

  __typename: 'ShopifyCustomerConnection';

  /** A list of edges. */
  edges: ShopifyCustomerEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyCustomerConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyCustomerEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyCustomer connection. */
export type ShopifyCustomerEdge = {

  __typename: 'ShopifyCustomerEdge';

  /** The item at the end of the edge */
  node: ShopifyCustomer;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyCustomerEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyCustomerSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of ShopifyProductVariant items. */
export type ShopifyProductVariantConnection = {

  __typename: 'ShopifyProductVariantConnection';

  /** A list of edges. */
  edges: ShopifyProductVariantEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyProductVariantConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyProductVariantEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyProductVariant connection. */
export type ShopifyProductVariantEdge = {

  __typename: 'ShopifyProductVariantEdge';

  /** The item at the end of the edge */
  node: ShopifyProductVariant;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyProductVariantEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyProductVariantSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type ShopifyProductVariant = {

  __typename: 'ShopifyProductVariant';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  barcode: (Scalars['String'] | null);

  compareAtPrice: (Scalars['String'] | null);

  inventoryPolicy: (Scalars['String'] | null);

  inventoryQuantity: (Scalars['Float'] | null);

  option1: (Scalars['String'] | null);

  option2: (Scalars['String'] | null);

  option3: (Scalars['String'] | null);

  position: (Scalars['Float'] | null);

  price: (Scalars['String'] | null);

  sku: (Scalars['String'] | null);

  taxable: (Scalars['Boolean'] | null);

  title: (Scalars['String'] | null);

  product: (ShopifyProduct | null);

  productId: (Scalars['GadgetID'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyProductVariantSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  barcode?: boolean | null | undefined;

  compareAtPrice?: boolean | null | undefined;

  inventoryPolicy?: boolean | null | undefined;

  inventoryQuantity?: boolean | null | undefined;

  option1?: boolean | null | undefined;

  option2?: boolean | null | undefined;

  option3?: boolean | null | undefined;

  position?: boolean | null | undefined;

  price?: boolean | null | undefined;

  sku?: boolean | null | undefined;

  taxable?: boolean | null | undefined;

  title?: boolean | null | undefined;

  product?: AvailableShopifyProductSelection;

  productId?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};



export type ShopifyProduct = {

  __typename: 'ShopifyProduct';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  shopifyCreatedAt: (Scalars['DateTime'] | null);

  handle: (Scalars['String'] | null);

  productType: (Scalars['String'] | null);

  publishedAt: (Scalars['DateTime'] | null);

  status: ShopifyProductStatusEnum;

  tags: (Scalars['JSON'] | null);

  templateSuffix: (Scalars['String'] | null);

  title: (Scalars['String'] | null);

  shopifyUpdatedAt: (Scalars['DateTime'] | null);

  variants: ShopifyProductVariantConnection;

  vendor: (Scalars['String'] | null);

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  category: (Scalars['JSON'] | null);

  compareAtPriceRange: (Scalars['JSON'] | null);

  hasVariantsThatRequiresComponents: (Scalars['Boolean'] | null);

  productCategory: (Scalars['JSON'] | null);

  body: (Scalars['String'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableShopifyProductSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Shopify. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  shopifyCreatedAt?: boolean | null | undefined;

  handle?: boolean | null | undefined;

  productType?: boolean | null | undefined;

  publishedAt?: boolean | null | undefined;

  status?: boolean | null | undefined;

  tags?: boolean | null | undefined;

  templateSuffix?: boolean | null | undefined;

  title?: boolean | null | undefined;

  shopifyUpdatedAt?: boolean | null | undefined;

  variants?: AvailableShopifyProductVariantConnectionSelection;

  vendor?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  category?: boolean | null | undefined;

  compareAtPriceRange?: boolean | null | undefined;

  hasVariantsThatRequiresComponents?: boolean | null | undefined;

  productCategory?: boolean | null | undefined;

  body?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of ShopifyProduct items. */
export type ShopifyProductConnection = {

  __typename: 'ShopifyProductConnection';

  /** A list of edges. */
  edges: ShopifyProductEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyProductConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyProductEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyProduct connection. */
export type ShopifyProductEdge = {

  __typename: 'ShopifyProductEdge';

  /** The item at the end of the edge */
  node: ShopifyProduct;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyProductEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyProductSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of ShopifyShop items. */
export type ShopifyShopConnection = {

  __typename: 'ShopifyShopConnection';

  /** A list of edges. */
  edges: ShopifyShopEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableShopifyShopConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableShopifyShopEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a ShopifyShop connection. */
export type ShopifyShopEdge = {

  __typename: 'ShopifyShopEdge';

  /** The item at the end of the edge */
  node: ShopifyShop;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableShopifyShopEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableShopifyShopSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type GoogleSheetConfig = {

  __typename: 'GoogleSheetConfig';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  orderSheetName: Scalars['String'];

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  customerSheetName: Scalars['String'];

  courierApiProvider: (Scalars['String'] | null);

  spreadsheetId: Scalars['String'];

  courierApiKey: (Scalars['String'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableGoogleSheetConfigSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  orderSheetName?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  customerSheetName?: boolean | null | undefined;

  courierApiProvider?: boolean | null | undefined;

  spreadsheetId?: boolean | null | undefined;

  courierApiKey?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of GoogleSheetConfig items. */
export type GoogleSheetConfigConnection = {

  __typename: 'GoogleSheetConfigConnection';

  /** A list of edges. */
  edges: GoogleSheetConfigEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableGoogleSheetConfigConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableGoogleSheetConfigEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a GoogleSheetConfig connection. */
export type GoogleSheetConfigEdge = {

  __typename: 'GoogleSheetConfigEdge';

  /** The item at the end of the edge */
  node: GoogleSheetConfig;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableGoogleSheetConfigEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableGoogleSheetConfigSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Session = {

  __typename: 'Session';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: (Scalars['GadgetID'] | null);

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  shop: (ShopifyShop | null);

  shopId: (Scalars['GadgetID'] | null);

  shopifySID: (Scalars['String'] | null);

  roles: Role[];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableSessionSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  shopifySID?: boolean | null | undefined;

  roles?: AvailableRoleSelection;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A named group of permissions granted to a particular actor in the system. Managed in the Gadget editor. */
export type Role = {

  __typename: 'Role';

  /** The stable identifier for this role. Null if the role has since been deleted. */
  key: Scalars['String'];

  /** The human readable name for this role. Can be changed. */
  name: Scalars['String'];
};



export type AvailableRoleSelection = {

  __typename?: boolean | null | undefined;

  /** The stable identifier for this role. Null if the role has since been deleted. */
  key?: boolean | null | undefined;

  /** The human readable name for this role. Can be changed. */
  name?: boolean | null | undefined;
};


/** A connection to a list of Session items. */
export type SessionConnection = {

  __typename: 'SessionConnection';

  /** A list of edges. */
  edges: SessionEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableSessionConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableSessionEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a Session connection. */
export type SessionEdge = {

  __typename: 'SessionEdge';

  /** The item at the end of the edge */
  node: Session;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableSessionEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableSessionSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type SenditConfig = {

  __typename: 'SenditConfig';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  accountType: (Scalars['String'] | null);

  lastAuthenticated: (Scalars['DateTime'] | null);

  name: (Scalars['String'] | null);

  publicKey: Scalars['String'];

  secretKey: Scalars['String'];

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  token: (Scalars['String'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableSenditConfigSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  accountType?: boolean | null | undefined;

  lastAuthenticated?: boolean | null | undefined;

  name?: boolean | null | undefined;

  publicKey?: boolean | null | undefined;

  secretKey?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  token?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of SenditConfig items. */
export type SenditConfigConnection = {

  __typename: 'SenditConfigConnection';

  /** A list of edges. */
  edges: SenditConfigEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableSenditConfigConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableSenditConfigEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a SenditConfig connection. */
export type SenditConfigEdge = {

  __typename: 'SenditConfigEdge';

  /** The item at the end of the edge */
  node: SenditConfig;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableSenditConfigEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableSenditConfigSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type SpeedafConfig = {

  __typename: 'SpeedafConfig';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  apiEndpoint: (Scalars['String'] | null);

  appCode: Scalars['String'];

  customerCode: Scalars['String'];

  lastAuthenticated: (Scalars['DateTime'] | null);

  name: (Scalars['String'] | null);

  platformSource: (Scalars['String'] | null);

  secretKey: Scalars['String'];

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableSpeedafConfigSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  apiEndpoint?: boolean | null | undefined;

  appCode?: boolean | null | undefined;

  customerCode?: boolean | null | undefined;

  lastAuthenticated?: boolean | null | undefined;

  name?: boolean | null | undefined;

  platformSource?: boolean | null | undefined;

  secretKey?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of SpeedafConfig items. */
export type SpeedafConfigConnection = {

  __typename: 'SpeedafConfigConnection';

  /** A list of edges. */
  edges: SpeedafConfigEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableSpeedafConfigConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableSpeedafConfigEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a SpeedafConfig connection. */
export type SpeedafConfigEdge = {

  __typename: 'SpeedafConfigEdge';

  /** The item at the end of the edge */
  node: SpeedafConfig;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableSpeedafConfigEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableSpeedafConfigSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type CustomCity = {

  __typename: 'CustomCity';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  isActive: (Scalars['Boolean'] | null);

  addedAt: (Scalars['DateTime'] | null);

  courierType: CustomCityCourierTypeEnum;

  name: Scalars['String'];

  shop: ShopifyShop;

  shopId: Scalars['GadgetID'];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableCustomCitySelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  isActive?: boolean | null | undefined;

  addedAt?: boolean | null | undefined;

  courierType?: boolean | null | undefined;

  name?: boolean | null | undefined;

  shop?: AvailableShopifyShopSelection;

  shopId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of CustomCity items. */
export type CustomCityConnection = {

  __typename: 'CustomCityConnection';

  /** A list of edges. */
  edges: CustomCityEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableCustomCityConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableCustomCityEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a CustomCity connection. */
export type CustomCityEdge = {

  __typename: 'CustomCityEdge';

  /** The item at the end of the edge */
  node: CustomCity;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableCustomCityEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableCustomCitySelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** Represents one of the roles an identity in the system can be entitled to */
export type GadgetRole = {

  __typename: 'GadgetRole';

  key: Scalars['String'];

  name: Scalars['String'];

  selectable: Scalars['Boolean'];

  order: Scalars['Int'];
};



export type AvailableGadgetRoleSelection = {

  __typename?: boolean | null | undefined;

  key?: boolean | null | undefined;

  name?: boolean | null | undefined;

  selectable?: boolean | null | undefined;

  order?: boolean | null | undefined;
};



export type GadgetGlobalAction = {

  __typename: 'GadgetGlobalAction';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  requiresInput: Scalars['Boolean'];

  acceptsInput: Scalars['Boolean'];

  triggers: GadgetTrigger[];

  inputFields: GadgetObjectField[];

  examples: (GadgetGlobalActionGraphQLType | null);
};



export type AvailableGadgetGlobalActionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  requiresInput?: boolean | null | undefined;

  acceptsInput?: boolean | null | undefined;

  triggers?: AvailableGadgetTriggerSelection;

  inputFields?: AvailableGadgetObjectFieldSelection;

  examples?: AvailableGadgetGlobalActionGraphQLTypeSelection;
};



export type GadgetGlobalActionGraphQLType = {

  __typename: 'GadgetGlobalActionGraphQLType';

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation: Scalars['String'];

  exampleGraphQLMutation: Scalars['String'];

  inputGraphQLTypeSDL: (Scalars['String'] | null);

  outputGraphQLTypeSDL: Scalars['String'];

  inputTypeScriptInterface: (Scalars['String'] | null);

  outputTypeScriptInterface: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleJSInputs: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];
};



export type AvailableGadgetGlobalActionGraphQLTypeSelection = {

  __typename?: boolean | null | undefined;

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  inputGraphQLTypeSDL?: boolean | null | undefined;

  outputGraphQLTypeSDL?: boolean | null | undefined;

  inputTypeScriptInterface?: boolean | null | undefined;

  outputTypeScriptInterface?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleJSInputs?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;
};


/** One upload target to use for the Direct Upload style of sending files to Gadget */
export type DirectUploadToken = {

  __typename: 'DirectUploadToken';

  /** The URL to upload a file to. */
  url: Scalars['String'];

  /** The token to pass to an action to reference the uploaded file. */
  token: Scalars['String'];
};



export type AvailableDirectUploadTokenSelection = {

  __typename?: boolean | null | undefined;

  /** The URL to upload a file to. */
  url?: boolean | null | undefined;

  /** The token to pass to an action to reference the uploaded file. */
  token?: boolean | null | undefined;
};


/** Information about the Shopify Connection */
export type Shopify = {

  __typename: 'Shopify';

  /** Whether the current session's shop requires a re-authentication with Shopify to acquire updated scopes */
  requiresReauthentication: (Scalars['Boolean'] | null);

  /** A list missing scopes compared to the Connection based on the current session's shop */
  missingScopes: Scalars['String'][];
};



export type AvailableShopifySelection = {

  __typename?: boolean | null | undefined;

  /** Whether the current session's shop requires a re-authentication with Shopify to acquire updated scopes */
  requiresReauthentication?: boolean | null | undefined;

  /** A list missing scopes compared to the Connection based on the current session's shop */
  missingScopes?: boolean | null | undefined;
};



export type InternalQueries = {

  __typename: 'InternalQueries';

  shopifyCustomer: (InternalShopifyCustomerRecord | null);

  listShopifyCustomer: InternalShopifyCustomerRecordConnection;

  /** Currently open platform transaction details, or null if no transaction is open */
  currentTransactionDetails: (Scalars['JSONObject'] | null);

  shopifyGdprRequest: (InternalShopifyGdprRequestRecord | null);

  listShopifyGdprRequest: InternalShopifyGdprRequestRecordConnection;

  shopifyOrder: (InternalShopifyOrderRecord | null);

  listShopifyOrder: InternalShopifyOrderRecordConnection;

  shopifyShop: (InternalShopifyShopRecord | null);

  listShopifyShop: InternalShopifyShopRecordConnection;

  shopifySync: (InternalShopifySyncRecord | null);

  listShopifySync: InternalShopifySyncRecordConnection;

  googleSheetConfig: (InternalGoogleSheetConfigRecord | null);

  listGoogleSheetConfig: InternalGoogleSheetConfigRecordConnection;

  session: (InternalSessionRecord | null);

  listSession: InternalSessionRecordConnection;

  shopifyFulfillment: (InternalShopifyFulfillmentRecord | null);

  listShopifyFulfillment: InternalShopifyFulfillmentRecordConnection;

  shopifyFulfillmentOrder: (InternalShopifyFulfillmentOrderRecord | null);

  listShopifyFulfillmentOrder: InternalShopifyFulfillmentOrderRecordConnection;

  shopifyFulfillmentService: (InternalShopifyFulfillmentServiceRecord | null);

  listShopifyFulfillmentService: InternalShopifyFulfillmentServiceRecordConnection;

  shopifyProduct: (InternalShopifyProductRecord | null);

  listShopifyProduct: InternalShopifyProductRecordConnection;

  shopifyProductVariant: (InternalShopifyProductVariantRecord | null);

  listShopifyProductVariant: InternalShopifyProductVariantRecordConnection;

  senditConfig: (InternalSenditConfigRecord | null);

  listSenditConfig: InternalSenditConfigRecordConnection;

  speedafConfig: (InternalSpeedafConfigRecord | null);

  listSpeedafConfig: InternalSpeedafConfigRecordConnection;

  customCity: (InternalCustomCityRecord | null);

  listCustomCity: InternalCustomCityRecordConnection;
};



export type AvailableInternalQueriesSelection = {

  __typename?: boolean | null | undefined;

  shopifyCustomer?: boolean | null | undefined;

  listShopifyCustomer?: AvailableInternalShopifyCustomerRecordConnectionSelection;

  /** Currently open platform transaction details, or null if no transaction is open */
  currentTransactionDetails?: boolean | null | undefined;

  shopifyGdprRequest?: boolean | null | undefined;

  listShopifyGdprRequest?: AvailableInternalShopifyGdprRequestRecordConnectionSelection;

  shopifyOrder?: boolean | null | undefined;

  listShopifyOrder?: AvailableInternalShopifyOrderRecordConnectionSelection;

  shopifyShop?: boolean | null | undefined;

  listShopifyShop?: AvailableInternalShopifyShopRecordConnectionSelection;

  shopifySync?: boolean | null | undefined;

  listShopifySync?: AvailableInternalShopifySyncRecordConnectionSelection;

  googleSheetConfig?: boolean | null | undefined;

  listGoogleSheetConfig?: AvailableInternalGoogleSheetConfigRecordConnectionSelection;

  session?: boolean | null | undefined;

  listSession?: AvailableInternalSessionRecordConnectionSelection;

  shopifyFulfillment?: boolean | null | undefined;

  listShopifyFulfillment?: AvailableInternalShopifyFulfillmentRecordConnectionSelection;

  shopifyFulfillmentOrder?: boolean | null | undefined;

  listShopifyFulfillmentOrder?: AvailableInternalShopifyFulfillmentOrderRecordConnectionSelection;

  shopifyFulfillmentService?: boolean | null | undefined;

  listShopifyFulfillmentService?: AvailableInternalShopifyFulfillmentServiceRecordConnectionSelection;

  shopifyProduct?: boolean | null | undefined;

  listShopifyProduct?: AvailableInternalShopifyProductRecordConnectionSelection;

  shopifyProductVariant?: boolean | null | undefined;

  listShopifyProductVariant?: AvailableInternalShopifyProductVariantRecordConnectionSelection;

  senditConfig?: boolean | null | undefined;

  listSenditConfig?: AvailableInternalSenditConfigRecordConnectionSelection;

  speedafConfig?: boolean | null | undefined;

  listSpeedafConfig?: AvailableInternalSpeedafConfigRecordConnectionSelection;

  customCity?: boolean | null | undefined;

  listCustomCity?: AvailableInternalCustomCityRecordConnectionSelection;
};


/** A connection to a list of InternalShopifyCustomerRecord items. */
export type InternalShopifyCustomerRecordConnection = {

  __typename: 'InternalShopifyCustomerRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyCustomerRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyCustomerRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyCustomerRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyCustomerRecord connection. */
export type InternalShopifyCustomerRecordEdge = {

  __typename: 'InternalShopifyCustomerRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyCustomerRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyCustomerRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyGdprRequestRecord items. */
export type InternalShopifyGdprRequestRecordConnection = {

  __typename: 'InternalShopifyGdprRequestRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyGdprRequestRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyGdprRequestRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyGdprRequestRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyGdprRequestRecord connection. */
export type InternalShopifyGdprRequestRecordEdge = {

  __typename: 'InternalShopifyGdprRequestRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyGdprRequestRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyGdprRequestRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyOrderRecord items. */
export type InternalShopifyOrderRecordConnection = {

  __typename: 'InternalShopifyOrderRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyOrderRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyOrderRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyOrderRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyOrderRecord connection. */
export type InternalShopifyOrderRecordEdge = {

  __typename: 'InternalShopifyOrderRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyOrderRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyOrderRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyShopRecord items. */
export type InternalShopifyShopRecordConnection = {

  __typename: 'InternalShopifyShopRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyShopRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyShopRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyShopRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyShopRecord connection. */
export type InternalShopifyShopRecordEdge = {

  __typename: 'InternalShopifyShopRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyShopRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyShopRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifySyncRecord items. */
export type InternalShopifySyncRecordConnection = {

  __typename: 'InternalShopifySyncRecordConnection';

  /** A list of edges. */
  edges: InternalShopifySyncRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifySyncRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifySyncRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifySyncRecord connection. */
export type InternalShopifySyncRecordEdge = {

  __typename: 'InternalShopifySyncRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifySyncRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifySyncRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalGoogleSheetConfigRecord items. */
export type InternalGoogleSheetConfigRecordConnection = {

  __typename: 'InternalGoogleSheetConfigRecordConnection';

  /** A list of edges. */
  edges: InternalGoogleSheetConfigRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalGoogleSheetConfigRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalGoogleSheetConfigRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalGoogleSheetConfigRecord connection. */
export type InternalGoogleSheetConfigRecordEdge = {

  __typename: 'InternalGoogleSheetConfigRecordEdge';

  /** The item at the end of the edge */
  node: InternalGoogleSheetConfigRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalGoogleSheetConfigRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalSessionRecord items. */
export type InternalSessionRecordConnection = {

  __typename: 'InternalSessionRecordConnection';

  /** A list of edges. */
  edges: InternalSessionRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalSessionRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalSessionRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalSessionRecord connection. */
export type InternalSessionRecordEdge = {

  __typename: 'InternalSessionRecordEdge';

  /** The item at the end of the edge */
  node: InternalSessionRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalSessionRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyFulfillmentRecord items. */
export type InternalShopifyFulfillmentRecordConnection = {

  __typename: 'InternalShopifyFulfillmentRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyFulfillmentRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyFulfillmentRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyFulfillmentRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyFulfillmentRecord connection. */
export type InternalShopifyFulfillmentRecordEdge = {

  __typename: 'InternalShopifyFulfillmentRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyFulfillmentRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyFulfillmentRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyFulfillmentOrderRecord items. */
export type InternalShopifyFulfillmentOrderRecordConnection = {

  __typename: 'InternalShopifyFulfillmentOrderRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyFulfillmentOrderRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyFulfillmentOrderRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyFulfillmentOrderRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyFulfillmentOrderRecord connection. */
export type InternalShopifyFulfillmentOrderRecordEdge = {

  __typename: 'InternalShopifyFulfillmentOrderRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyFulfillmentOrderRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyFulfillmentOrderRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyFulfillmentServiceRecord items. */
export type InternalShopifyFulfillmentServiceRecordConnection = {

  __typename: 'InternalShopifyFulfillmentServiceRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyFulfillmentServiceRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyFulfillmentServiceRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyFulfillmentServiceRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyFulfillmentServiceRecord connection. */
export type InternalShopifyFulfillmentServiceRecordEdge = {

  __typename: 'InternalShopifyFulfillmentServiceRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyFulfillmentServiceRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyFulfillmentServiceRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyProductRecord items. */
export type InternalShopifyProductRecordConnection = {

  __typename: 'InternalShopifyProductRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyProductRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyProductRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyProductRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyProductRecord connection. */
export type InternalShopifyProductRecordEdge = {

  __typename: 'InternalShopifyProductRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyProductRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyProductRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalShopifyProductVariantRecord items. */
export type InternalShopifyProductVariantRecordConnection = {

  __typename: 'InternalShopifyProductVariantRecordConnection';

  /** A list of edges. */
  edges: InternalShopifyProductVariantRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalShopifyProductVariantRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalShopifyProductVariantRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalShopifyProductVariantRecord connection. */
export type InternalShopifyProductVariantRecordEdge = {

  __typename: 'InternalShopifyProductVariantRecordEdge';

  /** The item at the end of the edge */
  node: InternalShopifyProductVariantRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalShopifyProductVariantRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalSenditConfigRecord items. */
export type InternalSenditConfigRecordConnection = {

  __typename: 'InternalSenditConfigRecordConnection';

  /** A list of edges. */
  edges: InternalSenditConfigRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalSenditConfigRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalSenditConfigRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalSenditConfigRecord connection. */
export type InternalSenditConfigRecordEdge = {

  __typename: 'InternalSenditConfigRecordEdge';

  /** The item at the end of the edge */
  node: InternalSenditConfigRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalSenditConfigRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalSpeedafConfigRecord items. */
export type InternalSpeedafConfigRecordConnection = {

  __typename: 'InternalSpeedafConfigRecordConnection';

  /** A list of edges. */
  edges: InternalSpeedafConfigRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalSpeedafConfigRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalSpeedafConfigRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalSpeedafConfigRecord connection. */
export type InternalSpeedafConfigRecordEdge = {

  __typename: 'InternalSpeedafConfigRecordEdge';

  /** The item at the end of the edge */
  node: InternalSpeedafConfigRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalSpeedafConfigRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalCustomCityRecord items. */
export type InternalCustomCityRecordConnection = {

  __typename: 'InternalCustomCityRecordConnection';

  /** A list of edges. */
  edges: InternalCustomCityRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalCustomCityRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalCustomCityRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalCustomCityRecord connection. */
export type InternalCustomCityRecordEdge = {

  __typename: 'InternalCustomCityRecordEdge';

  /** The item at the end of the edge */
  node: InternalCustomCityRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalCustomCityRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Mutation = {

  __typename: 'Mutation';

  updateShopifyOrder: (UpdateShopifyOrderResult | null);

  bulkUpdateShopifyOrders: (BulkUpdateShopifyOrdersResult | null);

  abortShopifySync: (AbortShopifySyncResult | null);

  bulkAbortShopifySyncs: (BulkAbortShopifySyncsResult | null);

  completeShopifySync: (CompleteShopifySyncResult | null);

  bulkCompleteShopifySyncs: (BulkCompleteShopifySyncsResult | null);

  errorShopifySync: (ErrorShopifySyncResult | null);

  bulkErrorShopifySyncs: (BulkErrorShopifySyncsResult | null);

  runShopifySync: (RunShopifySyncResult | null);

  bulkRunShopifySyncs: (BulkRunShopifySyncsResult | null);

  upsertShopifySync: (UpsertShopifySyncResult | null);

  bulkUpsertShopifySyncs: BulkUpsertShopifySyncsResult;

  createGoogleSheetConfig: (CreateGoogleSheetConfigResult | null);

  bulkCreateGoogleSheetConfigs: (BulkCreateGoogleSheetConfigsResult | null);

  updateGoogleSheetConfig: (UpdateGoogleSheetConfigResult | null);

  bulkUpdateGoogleSheetConfigs: (BulkUpdateGoogleSheetConfigsResult | null);

  deleteGoogleSheetConfig: (DeleteGoogleSheetConfigResult | null);

  bulkDeleteGoogleSheetConfigs: (BulkDeleteGoogleSheetConfigsResult | null);

  upsertGoogleSheetConfig: (UpsertGoogleSheetConfigResult | null);

  bulkUpsertGoogleSheetConfigs: BulkUpsertGoogleSheetConfigsResult;

  createSenditConfig: (CreateSenditConfigResult | null);

  bulkCreateSenditConfigs: (BulkCreateSenditConfigsResult | null);

  updateSenditConfig: (UpdateSenditConfigResult | null);

  bulkUpdateSenditConfigs: (BulkUpdateSenditConfigsResult | null);

  deleteSenditConfig: (DeleteSenditConfigResult | null);

  bulkDeleteSenditConfigs: (BulkDeleteSenditConfigsResult | null);

  upsertSenditConfig: (UpsertSenditConfigResult | null);

  bulkUpsertSenditConfigs: BulkUpsertSenditConfigsResult;

  createSpeedafConfig: (CreateSpeedafConfigResult | null);

  bulkCreateSpeedafConfigs: (BulkCreateSpeedafConfigsResult | null);

  updateSpeedafConfig: (UpdateSpeedafConfigResult | null);

  bulkUpdateSpeedafConfigs: (BulkUpdateSpeedafConfigsResult | null);

  deleteSpeedafConfig: (DeleteSpeedafConfigResult | null);

  bulkDeleteSpeedafConfigs: (BulkDeleteSpeedafConfigsResult | null);

  findFirstSpeedafConfig: (FindFirstSpeedafConfigResult | null);

  bulkFindFirstSpeedafConfigs: (BulkFindFirstSpeedafConfigsResult | null);

  upsertSpeedafConfig: (UpsertSpeedafConfigResult | null);

  bulkUpsertSpeedafConfigs: BulkUpsertSpeedafConfigsResult;

  createCustomCity: (CreateCustomCityResult | null);

  bulkCreateCustomCities: (BulkCreateCustomCitiesResult | null);

  updateCustomCity: (UpdateCustomCityResult | null);

  bulkUpdateCustomCities: (BulkUpdateCustomCitiesResult | null);

  deleteCustomCity: (DeleteCustomCityResult | null);

  bulkDeleteCustomCities: (BulkDeleteCustomCitiesResult | null);

  upsertCustomCity: (UpsertCustomCityResult | null);

  bulkUpsertCustomCities: BulkUpsertCustomCitiesResult;

  calculateRefund: (CalculateRefundResult | null);

  createSenditOrder: (CreateSenditOrderResult | null);

  directOrderTest: (DirectOrderTestResult | null);

  extractOrderSKUs: (ExtractOrderSKUsResult | null);

  fulfillOrder: (FulfillOrderResult | null);

  getCombinedCityList: (GetCombinedCityListResult | null);

  getCustomCities: (GetCustomCitiesResult | null);

  getSenditDistrictId: (GetSenditDistrictIdResult | null);

  processBulkReturns: (ProcessBulkReturnsResult | null);

  processOrderReturn: (ProcessOrderReturnResult | null);

  processSpeedafAPI: (ProcessSpeedafAPIResult | null);

  removeOrderFromSheets: (RemoveOrderFromSheetsResult | null);

  searchBulkOrdersForReturn: (SearchBulkOrdersForReturnResult | null);

  searchOrderForReturn: (SearchOrderForReturnResult | null);

  senditFulfillOrder: (SenditFulfillOrderResult | null);

  standardizeMoroccanAddress: (StandardizeMoroccanAddressResult | null);

  standardizeMoroccanCity: (StandardizeMoroccanCityResult | null);

  syncOrders: (SyncOrdersResult | null);

  testGoogleAuth: (TestGoogleAuthResult | null);

  testLocationQuery: (TestLocationQueryResult | null);

  testOriginalCityExtraction: (TestOriginalCityExtractionResult | null);

  testSenditConnection: (TestSenditConnectionResult | null);

  testWriteToSheet: (TestWriteToSheetResult | null);

  trackSpeedafOrders: (TrackSpeedafOrdersResult | null);

  updateReferenceTracking: (UpdateReferenceTrackingResult | null);

  writeBatchOrdersToSheets: (WriteBatchOrdersToSheetsResult | null);

  writeSpeedafDataToSheets: (WriteSpeedafDataToSheetsResult | null);

  writeToShopify: (WriteToShopifyResult | null);

  shopifyConnection: (ShopifyConnectionMutations | null);

  background: BackgroundMutations;

  internal: InternalMutations;
};



export type AvailableMutationSelection = {

  __typename?: boolean | null | undefined;

  updateShopifyOrder?: AvailableUpdateShopifyOrderResultSelection;

  bulkUpdateShopifyOrders?: AvailableBulkUpdateShopifyOrdersResultSelection;

  abortShopifySync?: AvailableAbortShopifySyncResultSelection;

  bulkAbortShopifySyncs?: AvailableBulkAbortShopifySyncsResultSelection;

  completeShopifySync?: AvailableCompleteShopifySyncResultSelection;

  bulkCompleteShopifySyncs?: AvailableBulkCompleteShopifySyncsResultSelection;

  errorShopifySync?: AvailableErrorShopifySyncResultSelection;

  bulkErrorShopifySyncs?: AvailableBulkErrorShopifySyncsResultSelection;

  runShopifySync?: AvailableRunShopifySyncResultSelection;

  bulkRunShopifySyncs?: AvailableBulkRunShopifySyncsResultSelection;

  upsertShopifySync?: AvailableUpsertShopifySyncResultSelection;

  bulkUpsertShopifySyncs?: AvailableBulkUpsertShopifySyncsResultSelection;

  createGoogleSheetConfig?: AvailableCreateGoogleSheetConfigResultSelection;

  bulkCreateGoogleSheetConfigs?: AvailableBulkCreateGoogleSheetConfigsResultSelection;

  updateGoogleSheetConfig?: AvailableUpdateGoogleSheetConfigResultSelection;

  bulkUpdateGoogleSheetConfigs?: AvailableBulkUpdateGoogleSheetConfigsResultSelection;

  deleteGoogleSheetConfig?: AvailableDeleteGoogleSheetConfigResultSelection;

  bulkDeleteGoogleSheetConfigs?: AvailableBulkDeleteGoogleSheetConfigsResultSelection;

  upsertGoogleSheetConfig?: AvailableUpsertGoogleSheetConfigResultSelection;

  bulkUpsertGoogleSheetConfigs?: AvailableBulkUpsertGoogleSheetConfigsResultSelection;

  createSenditConfig?: AvailableCreateSenditConfigResultSelection;

  bulkCreateSenditConfigs?: AvailableBulkCreateSenditConfigsResultSelection;

  updateSenditConfig?: AvailableUpdateSenditConfigResultSelection;

  bulkUpdateSenditConfigs?: AvailableBulkUpdateSenditConfigsResultSelection;

  deleteSenditConfig?: AvailableDeleteSenditConfigResultSelection;

  bulkDeleteSenditConfigs?: AvailableBulkDeleteSenditConfigsResultSelection;

  upsertSenditConfig?: AvailableUpsertSenditConfigResultSelection;

  bulkUpsertSenditConfigs?: AvailableBulkUpsertSenditConfigsResultSelection;

  createSpeedafConfig?: AvailableCreateSpeedafConfigResultSelection;

  bulkCreateSpeedafConfigs?: AvailableBulkCreateSpeedafConfigsResultSelection;

  updateSpeedafConfig?: AvailableUpdateSpeedafConfigResultSelection;

  bulkUpdateSpeedafConfigs?: AvailableBulkUpdateSpeedafConfigsResultSelection;

  deleteSpeedafConfig?: AvailableDeleteSpeedafConfigResultSelection;

  bulkDeleteSpeedafConfigs?: AvailableBulkDeleteSpeedafConfigsResultSelection;

  findFirstSpeedafConfig?: AvailableFindFirstSpeedafConfigResultSelection;

  bulkFindFirstSpeedafConfigs?: AvailableBulkFindFirstSpeedafConfigsResultSelection;

  upsertSpeedafConfig?: AvailableUpsertSpeedafConfigResultSelection;

  bulkUpsertSpeedafConfigs?: AvailableBulkUpsertSpeedafConfigsResultSelection;

  createCustomCity?: AvailableCreateCustomCityResultSelection;

  bulkCreateCustomCities?: AvailableBulkCreateCustomCitiesResultSelection;

  updateCustomCity?: AvailableUpdateCustomCityResultSelection;

  bulkUpdateCustomCities?: AvailableBulkUpdateCustomCitiesResultSelection;

  deleteCustomCity?: AvailableDeleteCustomCityResultSelection;

  bulkDeleteCustomCities?: AvailableBulkDeleteCustomCitiesResultSelection;

  upsertCustomCity?: AvailableUpsertCustomCityResultSelection;

  bulkUpsertCustomCities?: AvailableBulkUpsertCustomCitiesResultSelection;

  calculateRefund?: AvailableCalculateRefundResultSelection;

  createSenditOrder?: AvailableCreateSenditOrderResultSelection;

  directOrderTest?: AvailableDirectOrderTestResultSelection;

  extractOrderSKUs?: AvailableExtractOrderSKUsResultSelection;

  fulfillOrder?: AvailableFulfillOrderResultSelection;

  getCombinedCityList?: AvailableGetCombinedCityListResultSelection;

  getCustomCities?: AvailableGetCustomCitiesResultSelection;

  getSenditDistrictId?: AvailableGetSenditDistrictIdResultSelection;

  processBulkReturns?: AvailableProcessBulkReturnsResultSelection;

  processOrderReturn?: AvailableProcessOrderReturnResultSelection;

  processSpeedafAPI?: AvailableProcessSpeedafAPIResultSelection;

  removeOrderFromSheets?: AvailableRemoveOrderFromSheetsResultSelection;

  searchBulkOrdersForReturn?: AvailableSearchBulkOrdersForReturnResultSelection;

  searchOrderForReturn?: AvailableSearchOrderForReturnResultSelection;

  senditFulfillOrder?: AvailableSenditFulfillOrderResultSelection;

  standardizeMoroccanAddress?: AvailableStandardizeMoroccanAddressResultSelection;

  standardizeMoroccanCity?: AvailableStandardizeMoroccanCityResultSelection;

  syncOrders?: AvailableSyncOrdersResultSelection;

  testGoogleAuth?: AvailableTestGoogleAuthResultSelection;

  testLocationQuery?: AvailableTestLocationQueryResultSelection;

  testOriginalCityExtraction?: AvailableTestOriginalCityExtractionResultSelection;

  testSenditConnection?: AvailableTestSenditConnectionResultSelection;

  testWriteToSheet?: AvailableTestWriteToSheetResultSelection;

  trackSpeedafOrders?: AvailableTrackSpeedafOrdersResultSelection;

  updateReferenceTracking?: AvailableUpdateReferenceTrackingResultSelection;

  writeBatchOrdersToSheets?: AvailableWriteBatchOrdersToSheetsResultSelection;

  writeSpeedafDataToSheets?: AvailableWriteSpeedafDataToSheetsResultSelection;

  writeToShopify?: AvailableWriteToShopifyResultSelection;

  shopifyConnection?: AvailableShopifyConnectionMutationsSelection;

  background?: AvailableBackgroundMutationsSelection;

  internal?: AvailableInternalMutationsSelection;
};



export interface UpdateShopifyOrderResult extends UpsertShopifyOrderResult {
  __typename: 'UpdateShopifyOrderResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyOrder: (ShopifyOrder | null);
};



export type AvailableUpdateShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyOrder?: AvailableShopifyOrderSelection;
};


/** The output when running the update on the shopifyOrder model in bulk. */
export type BulkUpdateShopifyOrdersResult = {

  __typename: 'BulkUpdateShopifyOrdersResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed shopifyOrder records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifyOrders: (ShopifyOrder | null)[];
};



export type AvailableBulkUpdateShopifyOrdersResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed shopifyOrder records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifyOrders?: AvailableShopifyOrderSelection;
};



export interface AbortShopifySyncResult extends UpsertShopifySyncResult {
  __typename: 'AbortShopifySyncResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifySync: (ShopifySync | null);
};



export type AvailableAbortShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifySync?: AvailableShopifySyncSelection;
};


/** The output when running the abort on the shopifySync model in bulk. */
export type BulkAbortShopifySyncsResult = {

  __typename: 'BulkAbortShopifySyncsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs: (ShopifySync | null)[];
};



export type AvailableBulkAbortShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs?: AvailableShopifySyncSelection;
};



export type CompleteShopifySyncResult = {

  __typename: 'CompleteShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  shopifySync: (ShopifySync | null);
};



export type AvailableCompleteShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifySync?: AvailableShopifySyncSelection;
};


/** The output when running the complete on the shopifySync model in bulk. */
export type BulkCompleteShopifySyncsResult = {

  __typename: 'BulkCompleteShopifySyncsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs: (ShopifySync | null)[];
};



export type AvailableBulkCompleteShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs?: AvailableShopifySyncSelection;
};



export type ErrorShopifySyncResult = {

  __typename: 'ErrorShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  shopifySync: (ShopifySync | null);
};



export type AvailableErrorShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifySync?: AvailableShopifySyncSelection;
};


/** The output when running the error on the shopifySync model in bulk. */
export type BulkErrorShopifySyncsResult = {

  __typename: 'BulkErrorShopifySyncsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs: (ShopifySync | null)[];
};



export type AvailableBulkErrorShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs?: AvailableShopifySyncSelection;
};



export interface RunShopifySyncResult extends UpsertShopifySyncResult {
  __typename: 'RunShopifySyncResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifySync: (ShopifySync | null);
};



export type AvailableRunShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifySync?: AvailableShopifySyncSelection;
};


/** The output when running the run on the shopifySync model in bulk. */
export type BulkRunShopifySyncsResult = {

  __typename: 'BulkRunShopifySyncsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs: (ShopifySync | null)[];
};



export type AvailableBulkRunShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed shopifySync records by each sent bulk action. Returned in the same order as the input bulk action params. */
  shopifySyncs?: AvailableShopifySyncSelection;
};


/** The result of a bulk upsert operation for the shopifySync model */
export type BulkUpsertShopifySyncsResult = {

  __typename: 'BulkUpsertShopifySyncsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The results of each upsert action in the bulk operation */
  shopifySyncs: (ShopifySync | null)[];
};



export type AvailableBulkUpsertShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The results of each upsert action in the bulk operation */
  shopifySyncs?: AvailableShopifySyncSelection;
};



export interface CreateGoogleSheetConfigResult extends UpsertGoogleSheetConfigResult {
  __typename: 'CreateGoogleSheetConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  googleSheetConfig: (GoogleSheetConfig | null);
};



export type AvailableCreateGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  googleSheetConfig?: AvailableGoogleSheetConfigSelection;
};


/** The output when running the create on the googleSheetConfig model in bulk. */
export type BulkCreateGoogleSheetConfigsResult = {

  __typename: 'BulkCreateGoogleSheetConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed googleSheetConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  googleSheetConfigs: (GoogleSheetConfig | null)[];
};



export type AvailableBulkCreateGoogleSheetConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed googleSheetConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  googleSheetConfigs?: AvailableGoogleSheetConfigSelection;
};



export interface UpdateGoogleSheetConfigResult extends UpsertGoogleSheetConfigResult {
  __typename: 'UpdateGoogleSheetConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  googleSheetConfig: (GoogleSheetConfig | null);
};



export type AvailableUpdateGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  googleSheetConfig?: AvailableGoogleSheetConfigSelection;
};


/** The output when running the update on the googleSheetConfig model in bulk. */
export type BulkUpdateGoogleSheetConfigsResult = {

  __typename: 'BulkUpdateGoogleSheetConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed googleSheetConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  googleSheetConfigs: (GoogleSheetConfig | null)[];
};



export type AvailableBulkUpdateGoogleSheetConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed googleSheetConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  googleSheetConfigs?: AvailableGoogleSheetConfigSelection;
};



export type DeleteGoogleSheetConfigResult = {

  __typename: 'DeleteGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the googleSheetConfig model in bulk. */
export type BulkDeleteGoogleSheetConfigsResult = {

  __typename: 'BulkDeleteGoogleSheetConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteGoogleSheetConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};


/** The result of a bulk upsert operation for the googleSheetConfig model */
export type BulkUpsertGoogleSheetConfigsResult = {

  __typename: 'BulkUpsertGoogleSheetConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The results of each upsert action in the bulk operation */
  googleSheetConfigs: (GoogleSheetConfig | null)[];
};



export type AvailableBulkUpsertGoogleSheetConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The results of each upsert action in the bulk operation */
  googleSheetConfigs?: AvailableGoogleSheetConfigSelection;
};



export interface CreateSenditConfigResult extends UpsertSenditConfigResult {
  __typename: 'CreateSenditConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  senditConfig: (SenditConfig | null);
};



export type AvailableCreateSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  senditConfig?: AvailableSenditConfigSelection;
};


/** The output when running the create on the senditConfig model in bulk. */
export type BulkCreateSenditConfigsResult = {

  __typename: 'BulkCreateSenditConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed senditConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  senditConfigs: (SenditConfig | null)[];
};



export type AvailableBulkCreateSenditConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed senditConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  senditConfigs?: AvailableSenditConfigSelection;
};



export interface UpdateSenditConfigResult extends UpsertSenditConfigResult {
  __typename: 'UpdateSenditConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  senditConfig: (SenditConfig | null);
};



export type AvailableUpdateSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  senditConfig?: AvailableSenditConfigSelection;
};


/** The output when running the update on the senditConfig model in bulk. */
export type BulkUpdateSenditConfigsResult = {

  __typename: 'BulkUpdateSenditConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed senditConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  senditConfigs: (SenditConfig | null)[];
};



export type AvailableBulkUpdateSenditConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed senditConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  senditConfigs?: AvailableSenditConfigSelection;
};



export type DeleteSenditConfigResult = {

  __typename: 'DeleteSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the senditConfig model in bulk. */
export type BulkDeleteSenditConfigsResult = {

  __typename: 'BulkDeleteSenditConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteSenditConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};


/** The result of a bulk upsert operation for the senditConfig model */
export type BulkUpsertSenditConfigsResult = {

  __typename: 'BulkUpsertSenditConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The results of each upsert action in the bulk operation */
  senditConfigs: (SenditConfig | null)[];
};



export type AvailableBulkUpsertSenditConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The results of each upsert action in the bulk operation */
  senditConfigs?: AvailableSenditConfigSelection;
};



export interface CreateSpeedafConfigResult extends UpsertSpeedafConfigResult {
  __typename: 'CreateSpeedafConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  speedafConfig: (SpeedafConfig | null);
};



export type AvailableCreateSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  speedafConfig?: AvailableSpeedafConfigSelection;
};


/** The output when running the create on the speedafConfig model in bulk. */
export type BulkCreateSpeedafConfigsResult = {

  __typename: 'BulkCreateSpeedafConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs: (SpeedafConfig | null)[];
};



export type AvailableBulkCreateSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs?: AvailableSpeedafConfigSelection;
};



export interface UpdateSpeedafConfigResult extends UpsertSpeedafConfigResult {
  __typename: 'UpdateSpeedafConfigResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  speedafConfig: (SpeedafConfig | null);
};



export type AvailableUpdateSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  speedafConfig?: AvailableSpeedafConfigSelection;
};


/** The output when running the update on the speedafConfig model in bulk. */
export type BulkUpdateSpeedafConfigsResult = {

  __typename: 'BulkUpdateSpeedafConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs: (SpeedafConfig | null)[];
};



export type AvailableBulkUpdateSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs?: AvailableSpeedafConfigSelection;
};



export type DeleteSpeedafConfigResult = {

  __typename: 'DeleteSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the speedafConfig model in bulk. */
export type BulkDeleteSpeedafConfigsResult = {

  __typename: 'BulkDeleteSpeedafConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};



export type FindFirstSpeedafConfigResult = {

  __typename: 'FindFirstSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  speedafConfig: (SpeedafConfig | null);
};



export type AvailableFindFirstSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  speedafConfig?: AvailableSpeedafConfigSelection;
};


/** The output when running the findFirst on the speedafConfig model in bulk. */
export type BulkFindFirstSpeedafConfigsResult = {

  __typename: 'BulkFindFirstSpeedafConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs: (SpeedafConfig | null)[];
};



export type AvailableBulkFindFirstSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed speedafConfig records by each sent bulk action. Returned in the same order as the input bulk action params. */
  speedafConfigs?: AvailableSpeedafConfigSelection;
};


/** The result of a bulk upsert operation for the speedafConfig model */
export type BulkUpsertSpeedafConfigsResult = {

  __typename: 'BulkUpsertSpeedafConfigsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The results of each upsert action in the bulk operation */
  speedafConfigs: (SpeedafConfig | null)[];
};



export type AvailableBulkUpsertSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The results of each upsert action in the bulk operation */
  speedafConfigs?: AvailableSpeedafConfigSelection;
};



export interface CreateCustomCityResult extends UpsertCustomCityResult {
  __typename: 'CreateCustomCityResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  customCity: (CustomCity | null);
};



export type AvailableCreateCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  customCity?: AvailableCustomCitySelection;
};


/** The output when running the create on the customCity model in bulk. */
export type BulkCreateCustomCitiesResult = {

  __typename: 'BulkCreateCustomCitiesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed customCity records by each sent bulk action. Returned in the same order as the input bulk action params. */
  customCities: (CustomCity | null)[];
};



export type AvailableBulkCreateCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed customCity records by each sent bulk action. Returned in the same order as the input bulk action params. */
  customCities?: AvailableCustomCitySelection;
};



export interface UpdateCustomCityResult extends UpsertCustomCityResult {
  __typename: 'UpdateCustomCityResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  customCity: (CustomCity | null);
};



export type AvailableUpdateCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  customCity?: AvailableCustomCitySelection;
};


/** The output when running the update on the customCity model in bulk. */
export type BulkUpdateCustomCitiesResult = {

  __typename: 'BulkUpdateCustomCitiesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed customCity records by each sent bulk action. Returned in the same order as the input bulk action params. */
  customCities: (CustomCity | null)[];
};



export type AvailableBulkUpdateCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed customCity records by each sent bulk action. Returned in the same order as the input bulk action params. */
  customCities?: AvailableCustomCitySelection;
};



export type DeleteCustomCityResult = {

  __typename: 'DeleteCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the customCity model in bulk. */
export type BulkDeleteCustomCitiesResult = {

  __typename: 'BulkDeleteCustomCitiesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};


/** The result of a bulk upsert operation for the customCity model */
export type BulkUpsertCustomCitiesResult = {

  __typename: 'BulkUpsertCustomCitiesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The results of each upsert action in the bulk operation */
  customCities: (CustomCity | null)[];
};



export type AvailableBulkUpsertCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The results of each upsert action in the bulk operation */
  customCities?: AvailableCustomCitySelection;
};



export type CalculateRefundResult = {

  __typename: 'CalculateRefundResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableCalculateRefundResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type CreateSenditOrderResult = {

  __typename: 'CreateSenditOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableCreateSenditOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type DirectOrderTestResult = {

  __typename: 'DirectOrderTestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableDirectOrderTestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type ExtractOrderSKUsResult = {

  __typename: 'ExtractOrderSKUsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableExtractOrderSKUsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type FulfillOrderResult = {

  __typename: 'FulfillOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableFulfillOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type GetCombinedCityListResult = {

  __typename: 'GetCombinedCityListResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableGetCombinedCityListResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type GetCustomCitiesResult = {

  __typename: 'GetCustomCitiesResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableGetCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type GetSenditDistrictIdResult = {

  __typename: 'GetSenditDistrictIdResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableGetSenditDistrictIdResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type ProcessBulkReturnsResult = {

  __typename: 'ProcessBulkReturnsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableProcessBulkReturnsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type ProcessOrderReturnResult = {

  __typename: 'ProcessOrderReturnResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableProcessOrderReturnResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type ProcessSpeedafAPIResult = {

  __typename: 'ProcessSpeedafAPIResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableProcessSpeedafAPIResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type RemoveOrderFromSheetsResult = {

  __typename: 'RemoveOrderFromSheetsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableRemoveOrderFromSheetsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type SearchBulkOrdersForReturnResult = {

  __typename: 'SearchBulkOrdersForReturnResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableSearchBulkOrdersForReturnResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type SearchOrderForReturnResult = {

  __typename: 'SearchOrderForReturnResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableSearchOrderForReturnResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type SenditFulfillOrderResult = {

  __typename: 'SenditFulfillOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableSenditFulfillOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type StandardizeMoroccanAddressResult = {

  __typename: 'StandardizeMoroccanAddressResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableStandardizeMoroccanAddressResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type StandardizeMoroccanCityResult = {

  __typename: 'StandardizeMoroccanCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableStandardizeMoroccanCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type SyncOrdersResult = {

  __typename: 'SyncOrdersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableSyncOrdersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TestGoogleAuthResult = {

  __typename: 'TestGoogleAuthResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTestGoogleAuthResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TestLocationQueryResult = {

  __typename: 'TestLocationQueryResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTestLocationQueryResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TestOriginalCityExtractionResult = {

  __typename: 'TestOriginalCityExtractionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTestOriginalCityExtractionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TestSenditConnectionResult = {

  __typename: 'TestSenditConnectionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTestSenditConnectionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TestWriteToSheetResult = {

  __typename: 'TestWriteToSheetResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTestWriteToSheetResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type TrackSpeedafOrdersResult = {

  __typename: 'TrackSpeedafOrdersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableTrackSpeedafOrdersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type UpdateReferenceTrackingResult = {

  __typename: 'UpdateReferenceTrackingResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableUpdateReferenceTrackingResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type WriteBatchOrdersToSheetsResult = {

  __typename: 'WriteBatchOrdersToSheetsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableWriteBatchOrdersToSheetsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type WriteSpeedafDataToSheetsResult = {

  __typename: 'WriteSpeedafDataToSheetsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableWriteSpeedafDataToSheetsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type WriteToShopifyResult = {

  __typename: 'WriteToShopifyResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  result: (Scalars['JSON'] | null);
};



export type AvailableWriteToShopifyResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  result?: boolean | null | undefined;
};



export type ShopifyConnectionMutations = {

  __typename: 'ShopifyConnectionMutations';

  fetchOrInstallShop: (ShopifyConnectionFetchOrInstallShopResult | null);
};



export type AvailableShopifyConnectionMutationsSelection = {

  __typename?: boolean | null | undefined;

  fetchOrInstallShop?: AvailableShopifyConnectionFetchOrInstallShopResultSelection;
};



export type ShopifyConnectionFetchOrInstallShopResult = {

  __typename: 'ShopifyConnectionFetchOrInstallShopResult';

  isAuthenticated: Scalars['Boolean'];

  redirectToOauth: Scalars['Boolean'];

  missingScopes: Scalars['String'][];
};



export type AvailableShopifyConnectionFetchOrInstallShopResultSelection = {

  __typename?: boolean | null | undefined;

  isAuthenticated?: boolean | null | undefined;

  redirectToOauth?: boolean | null | undefined;

  missingScopes?: boolean | null | undefined;
};



export type BackgroundMutations = {

  __typename: 'BackgroundMutations';

  updateShopifyOrder: EnqueueBackgroundActionResult;

  bulkUpdateShopifyOrders: BulkEnqueueBackgroundActionResult;

  abortShopifySync: EnqueueBackgroundActionResult;

  bulkAbortShopifySyncs: BulkEnqueueBackgroundActionResult;

  completeShopifySync: EnqueueBackgroundActionResult;

  bulkCompleteShopifySyncs: BulkEnqueueBackgroundActionResult;

  errorShopifySync: EnqueueBackgroundActionResult;

  bulkErrorShopifySyncs: BulkEnqueueBackgroundActionResult;

  runShopifySync: EnqueueBackgroundActionResult;

  bulkRunShopifySyncs: BulkEnqueueBackgroundActionResult;

  upsertShopifySync: EnqueueBackgroundActionResult;

  bulkUpsertShopifySyncs: BulkEnqueueBackgroundActionResult;

  createGoogleSheetConfig: EnqueueBackgroundActionResult;

  bulkCreateGoogleSheetConfigs: BulkEnqueueBackgroundActionResult;

  updateGoogleSheetConfig: EnqueueBackgroundActionResult;

  bulkUpdateGoogleSheetConfigs: BulkEnqueueBackgroundActionResult;

  deleteGoogleSheetConfig: EnqueueBackgroundActionResult;

  bulkDeleteGoogleSheetConfigs: BulkEnqueueBackgroundActionResult;

  upsertGoogleSheetConfig: EnqueueBackgroundActionResult;

  bulkUpsertGoogleSheetConfigs: BulkEnqueueBackgroundActionResult;

  createSenditConfig: EnqueueBackgroundActionResult;

  bulkCreateSenditConfigs: BulkEnqueueBackgroundActionResult;

  updateSenditConfig: EnqueueBackgroundActionResult;

  bulkUpdateSenditConfigs: BulkEnqueueBackgroundActionResult;

  deleteSenditConfig: EnqueueBackgroundActionResult;

  bulkDeleteSenditConfigs: BulkEnqueueBackgroundActionResult;

  upsertSenditConfig: EnqueueBackgroundActionResult;

  bulkUpsertSenditConfigs: BulkEnqueueBackgroundActionResult;

  createSpeedafConfig: EnqueueBackgroundActionResult;

  bulkCreateSpeedafConfigs: BulkEnqueueBackgroundActionResult;

  updateSpeedafConfig: EnqueueBackgroundActionResult;

  bulkUpdateSpeedafConfigs: BulkEnqueueBackgroundActionResult;

  deleteSpeedafConfig: EnqueueBackgroundActionResult;

  bulkDeleteSpeedafConfigs: BulkEnqueueBackgroundActionResult;

  findFirstSpeedafConfig: EnqueueBackgroundActionResult;

  bulkFindFirstSpeedafConfigs: BulkEnqueueBackgroundActionResult;

  upsertSpeedafConfig: EnqueueBackgroundActionResult;

  bulkUpsertSpeedafConfigs: BulkEnqueueBackgroundActionResult;

  createCustomCity: EnqueueBackgroundActionResult;

  bulkCreateCustomCities: BulkEnqueueBackgroundActionResult;

  updateCustomCity: EnqueueBackgroundActionResult;

  bulkUpdateCustomCities: BulkEnqueueBackgroundActionResult;

  deleteCustomCity: EnqueueBackgroundActionResult;

  bulkDeleteCustomCities: BulkEnqueueBackgroundActionResult;

  upsertCustomCity: EnqueueBackgroundActionResult;

  bulkUpsertCustomCities: BulkEnqueueBackgroundActionResult;

  calculateRefund: EnqueueBackgroundActionResult;

  createSenditOrder: EnqueueBackgroundActionResult;

  directOrderTest: EnqueueBackgroundActionResult;

  extractOrderSKUs: EnqueueBackgroundActionResult;

  fulfillOrder: EnqueueBackgroundActionResult;

  getCombinedCityList: EnqueueBackgroundActionResult;

  getCustomCities: EnqueueBackgroundActionResult;

  getSenditDistrictId: EnqueueBackgroundActionResult;

  processBulkReturns: EnqueueBackgroundActionResult;

  processOrderReturn: EnqueueBackgroundActionResult;

  processSpeedafAPI: EnqueueBackgroundActionResult;

  removeOrderFromSheets: EnqueueBackgroundActionResult;

  searchBulkOrdersForReturn: EnqueueBackgroundActionResult;

  searchOrderForReturn: EnqueueBackgroundActionResult;

  senditFulfillOrder: EnqueueBackgroundActionResult;

  standardizeMoroccanAddress: EnqueueBackgroundActionResult;

  standardizeMoroccanCity: EnqueueBackgroundActionResult;

  syncOrders: EnqueueBackgroundActionResult;

  testGoogleAuth: EnqueueBackgroundActionResult;

  testLocationQuery: EnqueueBackgroundActionResult;

  testOriginalCityExtraction: EnqueueBackgroundActionResult;

  testSenditConnection: EnqueueBackgroundActionResult;

  testWriteToSheet: EnqueueBackgroundActionResult;

  trackSpeedafOrders: EnqueueBackgroundActionResult;

  updateReferenceTracking: EnqueueBackgroundActionResult;

  writeBatchOrdersToSheets: EnqueueBackgroundActionResult;

  writeSpeedafDataToSheets: EnqueueBackgroundActionResult;

  writeToShopify: EnqueueBackgroundActionResult;
};



export type AvailableBackgroundMutationsSelection = {

  __typename?: boolean | null | undefined;

  updateShopifyOrder?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateShopifyOrders?: AvailableBulkEnqueueBackgroundActionResultSelection;

  abortShopifySync?: AvailableEnqueueBackgroundActionResultSelection;

  bulkAbortShopifySyncs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  completeShopifySync?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCompleteShopifySyncs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  errorShopifySync?: AvailableEnqueueBackgroundActionResultSelection;

  bulkErrorShopifySyncs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  runShopifySync?: AvailableEnqueueBackgroundActionResultSelection;

  bulkRunShopifySyncs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  upsertShopifySync?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpsertShopifySyncs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createGoogleSheetConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateGoogleSheetConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateGoogleSheetConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateGoogleSheetConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteGoogleSheetConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteGoogleSheetConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  upsertGoogleSheetConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpsertGoogleSheetConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createSenditConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateSenditConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateSenditConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateSenditConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteSenditConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteSenditConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  upsertSenditConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpsertSenditConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createSpeedafConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateSpeedafConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateSpeedafConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateSpeedafConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteSpeedafConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteSpeedafConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  findFirstSpeedafConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkFindFirstSpeedafConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  upsertSpeedafConfig?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpsertSpeedafConfigs?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createCustomCity?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateCustomCities?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateCustomCity?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateCustomCities?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteCustomCity?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteCustomCities?: AvailableBulkEnqueueBackgroundActionResultSelection;

  upsertCustomCity?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpsertCustomCities?: AvailableBulkEnqueueBackgroundActionResultSelection;

  calculateRefund?: AvailableEnqueueBackgroundActionResultSelection;

  createSenditOrder?: AvailableEnqueueBackgroundActionResultSelection;

  directOrderTest?: AvailableEnqueueBackgroundActionResultSelection;

  extractOrderSKUs?: AvailableEnqueueBackgroundActionResultSelection;

  fulfillOrder?: AvailableEnqueueBackgroundActionResultSelection;

  getCombinedCityList?: AvailableEnqueueBackgroundActionResultSelection;

  getCustomCities?: AvailableEnqueueBackgroundActionResultSelection;

  getSenditDistrictId?: AvailableEnqueueBackgroundActionResultSelection;

  processBulkReturns?: AvailableEnqueueBackgroundActionResultSelection;

  processOrderReturn?: AvailableEnqueueBackgroundActionResultSelection;

  processSpeedafAPI?: AvailableEnqueueBackgroundActionResultSelection;

  removeOrderFromSheets?: AvailableEnqueueBackgroundActionResultSelection;

  searchBulkOrdersForReturn?: AvailableEnqueueBackgroundActionResultSelection;

  searchOrderForReturn?: AvailableEnqueueBackgroundActionResultSelection;

  senditFulfillOrder?: AvailableEnqueueBackgroundActionResultSelection;

  standardizeMoroccanAddress?: AvailableEnqueueBackgroundActionResultSelection;

  standardizeMoroccanCity?: AvailableEnqueueBackgroundActionResultSelection;

  syncOrders?: AvailableEnqueueBackgroundActionResultSelection;

  testGoogleAuth?: AvailableEnqueueBackgroundActionResultSelection;

  testLocationQuery?: AvailableEnqueueBackgroundActionResultSelection;

  testOriginalCityExtraction?: AvailableEnqueueBackgroundActionResultSelection;

  testSenditConnection?: AvailableEnqueueBackgroundActionResultSelection;

  testWriteToSheet?: AvailableEnqueueBackgroundActionResultSelection;

  trackSpeedafOrders?: AvailableEnqueueBackgroundActionResultSelection;

  updateReferenceTracking?: AvailableEnqueueBackgroundActionResultSelection;

  writeBatchOrdersToSheets?: AvailableEnqueueBackgroundActionResultSelection;

  writeSpeedafDataToSheets?: AvailableEnqueueBackgroundActionResultSelection;

  writeToShopify?: AvailableEnqueueBackgroundActionResultSelection;
};


/** The value returned from enqueuing an action to run in the background */
export type EnqueueBackgroundActionResult = {

  __typename: 'EnqueueBackgroundActionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  backgroundAction: (BackgroundActionHandle | null);
};



export type AvailableEnqueueBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  backgroundAction?: AvailableBackgroundActionHandleSelection;
};


/** One action enqueued for execution in the background */
export type BackgroundActionHandle = {

  __typename: 'BackgroundActionHandle';

  /** The ID of the background action */
  id: Scalars['String'];
};



export type AvailableBackgroundActionHandleSelection = {

  __typename?: boolean | null | undefined;

  /** The ID of the background action */
  id?: boolean | null | undefined;
};


/** The value returned from bulk enqueuing actions to run in the background */
export type BulkEnqueueBackgroundActionResult = {

  __typename: 'BulkEnqueueBackgroundActionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  backgroundActions: BackgroundActionHandle[];
};



export type AvailableBulkEnqueueBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  backgroundActions?: AvailableBackgroundActionHandleSelection;
};



export type InternalMutations = {

  __typename: 'InternalMutations';

  startTransaction: Scalars['String'];

  commitTransaction: Scalars['String'];

  rollbackTransaction: Scalars['String'];

  /** Acquire a backend lock, returning only once the lock has been acquired */
  acquireLock: LockOperationResult;

  createShopifyCustomer: (InternalCreateShopifyCustomerResult | null);

  updateShopifyCustomer: (InternalUpdateShopifyCustomerResult | null);

  deleteShopifyCustomer: (InternalDeleteShopifyCustomerResult | null);

  deleteManyShopifyCustomer: (InternalDeleteManyShopifyCustomerResult | null);

  bulkCreateShopifyCustomers: (InternalBulkCreateShopifyCustomersResult | null);

  upsertShopifyCustomer: (InternalUpsertShopifyCustomerResult | null);

  triggerCreateShopifyCustomer: (CreateShopifyCustomerResult | null);

  triggerUpdateShopifyCustomer: (UpdateShopifyCustomerResult | null);

  triggerDeleteShopifyCustomer: (DeleteShopifyCustomerResult | null);

  createShopifyGdprRequest: (InternalCreateShopifyGdprRequestResult | null);

  updateShopifyGdprRequest: (InternalUpdateShopifyGdprRequestResult | null);

  deleteShopifyGdprRequest: (InternalDeleteShopifyGdprRequestResult | null);

  deleteManyShopifyGdprRequest: (InternalDeleteManyShopifyGdprRequestResult | null);

  bulkCreateShopifyGdprRequests: (InternalBulkCreateShopifyGdprRequestsResult | null);

  upsertShopifyGdprRequest: (InternalUpsertShopifyGdprRequestResult | null);

  triggerCreateShopifyGdprRequest: (CreateShopifyGdprRequestResult | null);

  triggerUpdateShopifyGdprRequest: (UpdateShopifyGdprRequestResult | null);

  createShopifyOrder: (InternalCreateShopifyOrderResult | null);

  updateShopifyOrder: (InternalUpdateShopifyOrderResult | null);

  deleteShopifyOrder: (InternalDeleteShopifyOrderResult | null);

  deleteManyShopifyOrder: (InternalDeleteManyShopifyOrderResult | null);

  bulkCreateShopifyOrders: (InternalBulkCreateShopifyOrdersResult | null);

  upsertShopifyOrder: (InternalUpsertShopifyOrderResult | null);

  triggerCreateShopifyOrder: (CreateShopifyOrderResult | null);

  triggerUpdateShopifyOrder: (UpdateShopifyOrderResult | null);

  triggerDeleteShopifyOrder: (DeleteShopifyOrderResult | null);

  createShopifyShop: (InternalCreateShopifyShopResult | null);

  updateShopifyShop: (InternalUpdateShopifyShopResult | null);

  deleteShopifyShop: (InternalDeleteShopifyShopResult | null);

  deleteManyShopifyShop: (InternalDeleteManyShopifyShopResult | null);

  bulkCreateShopifyShops: (InternalBulkCreateShopifyShopsResult | null);

  upsertShopifyShop: (InternalUpsertShopifyShopResult | null);

  triggerUpdateShopifyShop: (UpdateShopifyShopResult | null);

  triggerInstallShopifyShop: (InstallShopifyShopResult | null);

  triggerReinstallShopifyShop: (ReinstallShopifyShopResult | null);

  triggerUninstallShopifyShop: (UninstallShopifyShopResult | null);

  createShopifySync: (InternalCreateShopifySyncResult | null);

  updateShopifySync: (InternalUpdateShopifySyncResult | null);

  deleteShopifySync: (InternalDeleteShopifySyncResult | null);

  deleteManyShopifySync: (InternalDeleteManyShopifySyncResult | null);

  bulkCreateShopifySyncs: (InternalBulkCreateShopifySyncsResult | null);

  upsertShopifySync: (InternalUpsertShopifySyncResult | null);

  triggerAbortShopifySync: (AbortShopifySyncResult | null);

  triggerCompleteShopifySync: (CompleteShopifySyncResult | null);

  triggerErrorShopifySync: (ErrorShopifySyncResult | null);

  triggerRunShopifySync: (RunShopifySyncResult | null);

  createGoogleSheetConfig: (InternalCreateGoogleSheetConfigResult | null);

  updateGoogleSheetConfig: (InternalUpdateGoogleSheetConfigResult | null);

  deleteGoogleSheetConfig: (InternalDeleteGoogleSheetConfigResult | null);

  deleteManyGoogleSheetConfig: (InternalDeleteManyGoogleSheetConfigResult | null);

  bulkCreateGoogleSheetConfigs: (InternalBulkCreateGoogleSheetConfigsResult | null);

  upsertGoogleSheetConfig: (InternalUpsertGoogleSheetConfigResult | null);

  triggerCreateGoogleSheetConfig: (CreateGoogleSheetConfigResult | null);

  triggerUpdateGoogleSheetConfig: (UpdateGoogleSheetConfigResult | null);

  triggerDeleteGoogleSheetConfig: (DeleteGoogleSheetConfigResult | null);

  createSession: (InternalCreateSessionResult | null);

  updateSession: (InternalUpdateSessionResult | null);

  deleteSession: (InternalDeleteSessionResult | null);

  deleteManySession: (InternalDeleteManySessionResult | null);

  bulkCreateSessions: (InternalBulkCreateSessionsResult | null);

  upsertSession: (InternalUpsertSessionResult | null);

  createShopifyFulfillment: (InternalCreateShopifyFulfillmentResult | null);

  updateShopifyFulfillment: (InternalUpdateShopifyFulfillmentResult | null);

  deleteShopifyFulfillment: (InternalDeleteShopifyFulfillmentResult | null);

  deleteManyShopifyFulfillment: (InternalDeleteManyShopifyFulfillmentResult | null);

  bulkCreateShopifyFulfillments: (InternalBulkCreateShopifyFulfillmentsResult | null);

  upsertShopifyFulfillment: (InternalUpsertShopifyFulfillmentResult | null);

  triggerCreateShopifyFulfillment: (CreateShopifyFulfillmentResult | null);

  triggerUpdateShopifyFulfillment: (UpdateShopifyFulfillmentResult | null);

  triggerDeleteShopifyFulfillment: (DeleteShopifyFulfillmentResult | null);

  createShopifyFulfillmentOrder: (InternalCreateShopifyFulfillmentOrderResult | null);

  updateShopifyFulfillmentOrder: (InternalUpdateShopifyFulfillmentOrderResult | null);

  deleteShopifyFulfillmentOrder: (InternalDeleteShopifyFulfillmentOrderResult | null);

  deleteManyShopifyFulfillmentOrder: (InternalDeleteManyShopifyFulfillmentOrderResult | null);

  bulkCreateShopifyFulfillmentOrders: (InternalBulkCreateShopifyFulfillmentOrdersResult | null);

  upsertShopifyFulfillmentOrder: (InternalUpsertShopifyFulfillmentOrderResult | null);

  triggerCreateShopifyFulfillmentOrder: (CreateShopifyFulfillmentOrderResult | null);

  triggerUpdateShopifyFulfillmentOrder: (UpdateShopifyFulfillmentOrderResult | null);

  triggerDeleteShopifyFulfillmentOrder: (DeleteShopifyFulfillmentOrderResult | null);

  createShopifyFulfillmentService: (InternalCreateShopifyFulfillmentServiceResult | null);

  updateShopifyFulfillmentService: (InternalUpdateShopifyFulfillmentServiceResult | null);

  deleteShopifyFulfillmentService: (InternalDeleteShopifyFulfillmentServiceResult | null);

  deleteManyShopifyFulfillmentService: (InternalDeleteManyShopifyFulfillmentServiceResult | null);

  bulkCreateShopifyFulfillmentServices: (InternalBulkCreateShopifyFulfillmentServicesResult | null);

  upsertShopifyFulfillmentService: (InternalUpsertShopifyFulfillmentServiceResult | null);

  triggerCreateShopifyFulfillmentService: (CreateShopifyFulfillmentServiceResult | null);

  triggerUpdateShopifyFulfillmentService: (UpdateShopifyFulfillmentServiceResult | null);

  triggerDeleteShopifyFulfillmentService: (DeleteShopifyFulfillmentServiceResult | null);

  createShopifyProduct: (InternalCreateShopifyProductResult | null);

  updateShopifyProduct: (InternalUpdateShopifyProductResult | null);

  deleteShopifyProduct: (InternalDeleteShopifyProductResult | null);

  deleteManyShopifyProduct: (InternalDeleteManyShopifyProductResult | null);

  bulkCreateShopifyProducts: (InternalBulkCreateShopifyProductsResult | null);

  upsertShopifyProduct: (InternalUpsertShopifyProductResult | null);

  triggerCreateShopifyProduct: (CreateShopifyProductResult | null);

  triggerUpdateShopifyProduct: (UpdateShopifyProductResult | null);

  triggerDeleteShopifyProduct: (DeleteShopifyProductResult | null);

  createShopifyProductVariant: (InternalCreateShopifyProductVariantResult | null);

  updateShopifyProductVariant: (InternalUpdateShopifyProductVariantResult | null);

  deleteShopifyProductVariant: (InternalDeleteShopifyProductVariantResult | null);

  deleteManyShopifyProductVariant: (InternalDeleteManyShopifyProductVariantResult | null);

  bulkCreateShopifyProductVariants: (InternalBulkCreateShopifyProductVariantsResult | null);

  upsertShopifyProductVariant: (InternalUpsertShopifyProductVariantResult | null);

  triggerCreateShopifyProductVariant: (CreateShopifyProductVariantResult | null);

  triggerUpdateShopifyProductVariant: (UpdateShopifyProductVariantResult | null);

  triggerDeleteShopifyProductVariant: (DeleteShopifyProductVariantResult | null);

  createSenditConfig: (InternalCreateSenditConfigResult | null);

  updateSenditConfig: (InternalUpdateSenditConfigResult | null);

  deleteSenditConfig: (InternalDeleteSenditConfigResult | null);

  deleteManySenditConfig: (InternalDeleteManySenditConfigResult | null);

  bulkCreateSenditConfigs: (InternalBulkCreateSenditConfigsResult | null);

  upsertSenditConfig: (InternalUpsertSenditConfigResult | null);

  triggerCreateSenditConfig: (CreateSenditConfigResult | null);

  triggerUpdateSenditConfig: (UpdateSenditConfigResult | null);

  triggerDeleteSenditConfig: (DeleteSenditConfigResult | null);

  createSpeedafConfig: (InternalCreateSpeedafConfigResult | null);

  updateSpeedafConfig: (InternalUpdateSpeedafConfigResult | null);

  deleteSpeedafConfig: (InternalDeleteSpeedafConfigResult | null);

  deleteManySpeedafConfig: (InternalDeleteManySpeedafConfigResult | null);

  bulkCreateSpeedafConfigs: (InternalBulkCreateSpeedafConfigsResult | null);

  upsertSpeedafConfig: (InternalUpsertSpeedafConfigResult | null);

  triggerCreateSpeedafConfig: (CreateSpeedafConfigResult | null);

  triggerUpdateSpeedafConfig: (UpdateSpeedafConfigResult | null);

  triggerDeleteSpeedafConfig: (DeleteSpeedafConfigResult | null);

  triggerFindFirstSpeedafConfig: (FindFirstSpeedafConfigResult | null);

  createCustomCity: (InternalCreateCustomCityResult | null);

  updateCustomCity: (InternalUpdateCustomCityResult | null);

  deleteCustomCity: (InternalDeleteCustomCityResult | null);

  deleteManyCustomCity: (InternalDeleteManyCustomCityResult | null);

  bulkCreateCustomCities: (InternalBulkCreateCustomCitiesResult | null);

  upsertCustomCity: (InternalUpsertCustomCityResult | null);

  triggerCreateCustomCity: (CreateCustomCityResult | null);

  triggerUpdateCustomCity: (UpdateCustomCityResult | null);

  triggerDeleteCustomCity: (DeleteCustomCityResult | null);

  triggerCalculateRefund: (CalculateRefundResult | null);

  triggerCreateSenditOrder: (CreateSenditOrderResult | null);

  triggerDirectOrderTest: (DirectOrderTestResult | null);

  triggerExtractOrderSKUs: (ExtractOrderSKUsResult | null);

  triggerFulfillOrder: (FulfillOrderResult | null);

  triggerGetCombinedCityList: (GetCombinedCityListResult | null);

  triggerGetCustomCities: (GetCustomCitiesResult | null);

  triggerGetSenditDistrictId: (GetSenditDistrictIdResult | null);

  triggerProcessBulkReturns: (ProcessBulkReturnsResult | null);

  triggerProcessOrderReturn: (ProcessOrderReturnResult | null);

  triggerProcessSpeedafAPI: (ProcessSpeedafAPIResult | null);

  triggerRemoveOrderFromSheets: (RemoveOrderFromSheetsResult | null);

  triggerSearchBulkOrdersForReturn: (SearchBulkOrdersForReturnResult | null);

  triggerSearchOrderForReturn: (SearchOrderForReturnResult | null);

  triggerSenditFulfillOrder: (SenditFulfillOrderResult | null);

  triggerStandardizeMoroccanAddress: (StandardizeMoroccanAddressResult | null);

  triggerStandardizeMoroccanCity: (StandardizeMoroccanCityResult | null);

  triggerSyncOrders: (SyncOrdersResult | null);

  triggerTestGoogleAuth: (TestGoogleAuthResult | null);

  triggerTestLocationQuery: (TestLocationQueryResult | null);

  triggerTestOriginalCityExtraction: (TestOriginalCityExtractionResult | null);

  triggerTestSenditConnection: (TestSenditConnectionResult | null);

  triggerTestWriteToSheet: (TestWriteToSheetResult | null);

  triggerTrackSpeedafOrders: (TrackSpeedafOrdersResult | null);

  triggerUpdateReferenceTracking: (UpdateReferenceTrackingResult | null);

  triggerWriteBatchOrdersToSheets: (WriteBatchOrdersToSheetsResult | null);

  triggerWriteSpeedafDataToSheets: (WriteSpeedafDataToSheetsResult | null);

  triggerWriteToShopify: (WriteToShopifyResult | null);

  cancelBackgroundAction: CancelBackgroundActionResult;

  bulkCancelBackgroundActions: BulkCancelBackgroundActionResult;
};



export type AvailableInternalMutationsSelection = {

  __typename?: boolean | null | undefined;

  startTransaction?: boolean | null | undefined;

  commitTransaction?: boolean | null | undefined;

  rollbackTransaction?: boolean | null | undefined;

  /** Acquire a backend lock, returning only once the lock has been acquired */
  acquireLock?: AvailableLockOperationResultSelection;

  createShopifyCustomer?: AvailableInternalCreateShopifyCustomerResultSelection;

  updateShopifyCustomer?: AvailableInternalUpdateShopifyCustomerResultSelection;

  deleteShopifyCustomer?: AvailableInternalDeleteShopifyCustomerResultSelection;

  deleteManyShopifyCustomer?: AvailableInternalDeleteManyShopifyCustomerResultSelection;

  bulkCreateShopifyCustomers?: AvailableInternalBulkCreateShopifyCustomersResultSelection;

  upsertShopifyCustomer?: AvailableInternalUpsertShopifyCustomerResultSelection;

  triggerCreateShopifyCustomer?: AvailableCreateShopifyCustomerResultSelection;

  triggerUpdateShopifyCustomer?: AvailableUpdateShopifyCustomerResultSelection;

  triggerDeleteShopifyCustomer?: AvailableDeleteShopifyCustomerResultSelection;

  createShopifyGdprRequest?: AvailableInternalCreateShopifyGdprRequestResultSelection;

  updateShopifyGdprRequest?: AvailableInternalUpdateShopifyGdprRequestResultSelection;

  deleteShopifyGdprRequest?: AvailableInternalDeleteShopifyGdprRequestResultSelection;

  deleteManyShopifyGdprRequest?: AvailableInternalDeleteManyShopifyGdprRequestResultSelection;

  bulkCreateShopifyGdprRequests?: AvailableInternalBulkCreateShopifyGdprRequestsResultSelection;

  upsertShopifyGdprRequest?: AvailableInternalUpsertShopifyGdprRequestResultSelection;

  triggerCreateShopifyGdprRequest?: AvailableCreateShopifyGdprRequestResultSelection;

  triggerUpdateShopifyGdprRequest?: AvailableUpdateShopifyGdprRequestResultSelection;

  createShopifyOrder?: AvailableInternalCreateShopifyOrderResultSelection;

  updateShopifyOrder?: AvailableInternalUpdateShopifyOrderResultSelection;

  deleteShopifyOrder?: AvailableInternalDeleteShopifyOrderResultSelection;

  deleteManyShopifyOrder?: AvailableInternalDeleteManyShopifyOrderResultSelection;

  bulkCreateShopifyOrders?: AvailableInternalBulkCreateShopifyOrdersResultSelection;

  upsertShopifyOrder?: AvailableInternalUpsertShopifyOrderResultSelection;

  triggerCreateShopifyOrder?: AvailableCreateShopifyOrderResultSelection;

  triggerUpdateShopifyOrder?: AvailableUpdateShopifyOrderResultSelection;

  triggerDeleteShopifyOrder?: AvailableDeleteShopifyOrderResultSelection;

  createShopifyShop?: AvailableInternalCreateShopifyShopResultSelection;

  updateShopifyShop?: AvailableInternalUpdateShopifyShopResultSelection;

  deleteShopifyShop?: AvailableInternalDeleteShopifyShopResultSelection;

  deleteManyShopifyShop?: AvailableInternalDeleteManyShopifyShopResultSelection;

  bulkCreateShopifyShops?: AvailableInternalBulkCreateShopifyShopsResultSelection;

  upsertShopifyShop?: AvailableInternalUpsertShopifyShopResultSelection;

  triggerUpdateShopifyShop?: AvailableUpdateShopifyShopResultSelection;

  triggerInstallShopifyShop?: AvailableInstallShopifyShopResultSelection;

  triggerReinstallShopifyShop?: AvailableReinstallShopifyShopResultSelection;

  triggerUninstallShopifyShop?: AvailableUninstallShopifyShopResultSelection;

  createShopifySync?: AvailableInternalCreateShopifySyncResultSelection;

  updateShopifySync?: AvailableInternalUpdateShopifySyncResultSelection;

  deleteShopifySync?: AvailableInternalDeleteShopifySyncResultSelection;

  deleteManyShopifySync?: AvailableInternalDeleteManyShopifySyncResultSelection;

  bulkCreateShopifySyncs?: AvailableInternalBulkCreateShopifySyncsResultSelection;

  upsertShopifySync?: AvailableInternalUpsertShopifySyncResultSelection;

  triggerAbortShopifySync?: AvailableAbortShopifySyncResultSelection;

  triggerCompleteShopifySync?: AvailableCompleteShopifySyncResultSelection;

  triggerErrorShopifySync?: AvailableErrorShopifySyncResultSelection;

  triggerRunShopifySync?: AvailableRunShopifySyncResultSelection;

  createGoogleSheetConfig?: AvailableInternalCreateGoogleSheetConfigResultSelection;

  updateGoogleSheetConfig?: AvailableInternalUpdateGoogleSheetConfigResultSelection;

  deleteGoogleSheetConfig?: AvailableInternalDeleteGoogleSheetConfigResultSelection;

  deleteManyGoogleSheetConfig?: AvailableInternalDeleteManyGoogleSheetConfigResultSelection;

  bulkCreateGoogleSheetConfigs?: AvailableInternalBulkCreateGoogleSheetConfigsResultSelection;

  upsertGoogleSheetConfig?: AvailableInternalUpsertGoogleSheetConfigResultSelection;

  triggerCreateGoogleSheetConfig?: AvailableCreateGoogleSheetConfigResultSelection;

  triggerUpdateGoogleSheetConfig?: AvailableUpdateGoogleSheetConfigResultSelection;

  triggerDeleteGoogleSheetConfig?: AvailableDeleteGoogleSheetConfigResultSelection;

  createSession?: AvailableInternalCreateSessionResultSelection;

  updateSession?: AvailableInternalUpdateSessionResultSelection;

  deleteSession?: AvailableInternalDeleteSessionResultSelection;

  deleteManySession?: AvailableInternalDeleteManySessionResultSelection;

  bulkCreateSessions?: AvailableInternalBulkCreateSessionsResultSelection;

  upsertSession?: AvailableInternalUpsertSessionResultSelection;

  createShopifyFulfillment?: AvailableInternalCreateShopifyFulfillmentResultSelection;

  updateShopifyFulfillment?: AvailableInternalUpdateShopifyFulfillmentResultSelection;

  deleteShopifyFulfillment?: AvailableInternalDeleteShopifyFulfillmentResultSelection;

  deleteManyShopifyFulfillment?: AvailableInternalDeleteManyShopifyFulfillmentResultSelection;

  bulkCreateShopifyFulfillments?: AvailableInternalBulkCreateShopifyFulfillmentsResultSelection;

  upsertShopifyFulfillment?: AvailableInternalUpsertShopifyFulfillmentResultSelection;

  triggerCreateShopifyFulfillment?: AvailableCreateShopifyFulfillmentResultSelection;

  triggerUpdateShopifyFulfillment?: AvailableUpdateShopifyFulfillmentResultSelection;

  triggerDeleteShopifyFulfillment?: AvailableDeleteShopifyFulfillmentResultSelection;

  createShopifyFulfillmentOrder?: AvailableInternalCreateShopifyFulfillmentOrderResultSelection;

  updateShopifyFulfillmentOrder?: AvailableInternalUpdateShopifyFulfillmentOrderResultSelection;

  deleteShopifyFulfillmentOrder?: AvailableInternalDeleteShopifyFulfillmentOrderResultSelection;

  deleteManyShopifyFulfillmentOrder?: AvailableInternalDeleteManyShopifyFulfillmentOrderResultSelection;

  bulkCreateShopifyFulfillmentOrders?: AvailableInternalBulkCreateShopifyFulfillmentOrdersResultSelection;

  upsertShopifyFulfillmentOrder?: AvailableInternalUpsertShopifyFulfillmentOrderResultSelection;

  triggerCreateShopifyFulfillmentOrder?: AvailableCreateShopifyFulfillmentOrderResultSelection;

  triggerUpdateShopifyFulfillmentOrder?: AvailableUpdateShopifyFulfillmentOrderResultSelection;

  triggerDeleteShopifyFulfillmentOrder?: AvailableDeleteShopifyFulfillmentOrderResultSelection;

  createShopifyFulfillmentService?: AvailableInternalCreateShopifyFulfillmentServiceResultSelection;

  updateShopifyFulfillmentService?: AvailableInternalUpdateShopifyFulfillmentServiceResultSelection;

  deleteShopifyFulfillmentService?: AvailableInternalDeleteShopifyFulfillmentServiceResultSelection;

  deleteManyShopifyFulfillmentService?: AvailableInternalDeleteManyShopifyFulfillmentServiceResultSelection;

  bulkCreateShopifyFulfillmentServices?: AvailableInternalBulkCreateShopifyFulfillmentServicesResultSelection;

  upsertShopifyFulfillmentService?: AvailableInternalUpsertShopifyFulfillmentServiceResultSelection;

  triggerCreateShopifyFulfillmentService?: AvailableCreateShopifyFulfillmentServiceResultSelection;

  triggerUpdateShopifyFulfillmentService?: AvailableUpdateShopifyFulfillmentServiceResultSelection;

  triggerDeleteShopifyFulfillmentService?: AvailableDeleteShopifyFulfillmentServiceResultSelection;

  createShopifyProduct?: AvailableInternalCreateShopifyProductResultSelection;

  updateShopifyProduct?: AvailableInternalUpdateShopifyProductResultSelection;

  deleteShopifyProduct?: AvailableInternalDeleteShopifyProductResultSelection;

  deleteManyShopifyProduct?: AvailableInternalDeleteManyShopifyProductResultSelection;

  bulkCreateShopifyProducts?: AvailableInternalBulkCreateShopifyProductsResultSelection;

  upsertShopifyProduct?: AvailableInternalUpsertShopifyProductResultSelection;

  triggerCreateShopifyProduct?: AvailableCreateShopifyProductResultSelection;

  triggerUpdateShopifyProduct?: AvailableUpdateShopifyProductResultSelection;

  triggerDeleteShopifyProduct?: AvailableDeleteShopifyProductResultSelection;

  createShopifyProductVariant?: AvailableInternalCreateShopifyProductVariantResultSelection;

  updateShopifyProductVariant?: AvailableInternalUpdateShopifyProductVariantResultSelection;

  deleteShopifyProductVariant?: AvailableInternalDeleteShopifyProductVariantResultSelection;

  deleteManyShopifyProductVariant?: AvailableInternalDeleteManyShopifyProductVariantResultSelection;

  bulkCreateShopifyProductVariants?: AvailableInternalBulkCreateShopifyProductVariantsResultSelection;

  upsertShopifyProductVariant?: AvailableInternalUpsertShopifyProductVariantResultSelection;

  triggerCreateShopifyProductVariant?: AvailableCreateShopifyProductVariantResultSelection;

  triggerUpdateShopifyProductVariant?: AvailableUpdateShopifyProductVariantResultSelection;

  triggerDeleteShopifyProductVariant?: AvailableDeleteShopifyProductVariantResultSelection;

  createSenditConfig?: AvailableInternalCreateSenditConfigResultSelection;

  updateSenditConfig?: AvailableInternalUpdateSenditConfigResultSelection;

  deleteSenditConfig?: AvailableInternalDeleteSenditConfigResultSelection;

  deleteManySenditConfig?: AvailableInternalDeleteManySenditConfigResultSelection;

  bulkCreateSenditConfigs?: AvailableInternalBulkCreateSenditConfigsResultSelection;

  upsertSenditConfig?: AvailableInternalUpsertSenditConfigResultSelection;

  triggerCreateSenditConfig?: AvailableCreateSenditConfigResultSelection;

  triggerUpdateSenditConfig?: AvailableUpdateSenditConfigResultSelection;

  triggerDeleteSenditConfig?: AvailableDeleteSenditConfigResultSelection;

  createSpeedafConfig?: AvailableInternalCreateSpeedafConfigResultSelection;

  updateSpeedafConfig?: AvailableInternalUpdateSpeedafConfigResultSelection;

  deleteSpeedafConfig?: AvailableInternalDeleteSpeedafConfigResultSelection;

  deleteManySpeedafConfig?: AvailableInternalDeleteManySpeedafConfigResultSelection;

  bulkCreateSpeedafConfigs?: AvailableInternalBulkCreateSpeedafConfigsResultSelection;

  upsertSpeedafConfig?: AvailableInternalUpsertSpeedafConfigResultSelection;

  triggerCreateSpeedafConfig?: AvailableCreateSpeedafConfigResultSelection;

  triggerUpdateSpeedafConfig?: AvailableUpdateSpeedafConfigResultSelection;

  triggerDeleteSpeedafConfig?: AvailableDeleteSpeedafConfigResultSelection;

  triggerFindFirstSpeedafConfig?: AvailableFindFirstSpeedafConfigResultSelection;

  createCustomCity?: AvailableInternalCreateCustomCityResultSelection;

  updateCustomCity?: AvailableInternalUpdateCustomCityResultSelection;

  deleteCustomCity?: AvailableInternalDeleteCustomCityResultSelection;

  deleteManyCustomCity?: AvailableInternalDeleteManyCustomCityResultSelection;

  bulkCreateCustomCities?: AvailableInternalBulkCreateCustomCitiesResultSelection;

  upsertCustomCity?: AvailableInternalUpsertCustomCityResultSelection;

  triggerCreateCustomCity?: AvailableCreateCustomCityResultSelection;

  triggerUpdateCustomCity?: AvailableUpdateCustomCityResultSelection;

  triggerDeleteCustomCity?: AvailableDeleteCustomCityResultSelection;

  triggerCalculateRefund?: AvailableCalculateRefundResultSelection;

  triggerCreateSenditOrder?: AvailableCreateSenditOrderResultSelection;

  triggerDirectOrderTest?: AvailableDirectOrderTestResultSelection;

  triggerExtractOrderSKUs?: AvailableExtractOrderSKUsResultSelection;

  triggerFulfillOrder?: AvailableFulfillOrderResultSelection;

  triggerGetCombinedCityList?: AvailableGetCombinedCityListResultSelection;

  triggerGetCustomCities?: AvailableGetCustomCitiesResultSelection;

  triggerGetSenditDistrictId?: AvailableGetSenditDistrictIdResultSelection;

  triggerProcessBulkReturns?: AvailableProcessBulkReturnsResultSelection;

  triggerProcessOrderReturn?: AvailableProcessOrderReturnResultSelection;

  triggerProcessSpeedafAPI?: AvailableProcessSpeedafAPIResultSelection;

  triggerRemoveOrderFromSheets?: AvailableRemoveOrderFromSheetsResultSelection;

  triggerSearchBulkOrdersForReturn?: AvailableSearchBulkOrdersForReturnResultSelection;

  triggerSearchOrderForReturn?: AvailableSearchOrderForReturnResultSelection;

  triggerSenditFulfillOrder?: AvailableSenditFulfillOrderResultSelection;

  triggerStandardizeMoroccanAddress?: AvailableStandardizeMoroccanAddressResultSelection;

  triggerStandardizeMoroccanCity?: AvailableStandardizeMoroccanCityResultSelection;

  triggerSyncOrders?: AvailableSyncOrdersResultSelection;

  triggerTestGoogleAuth?: AvailableTestGoogleAuthResultSelection;

  triggerTestLocationQuery?: AvailableTestLocationQueryResultSelection;

  triggerTestOriginalCityExtraction?: AvailableTestOriginalCityExtractionResultSelection;

  triggerTestSenditConnection?: AvailableTestSenditConnectionResultSelection;

  triggerTestWriteToSheet?: AvailableTestWriteToSheetResultSelection;

  triggerTrackSpeedafOrders?: AvailableTrackSpeedafOrdersResultSelection;

  triggerUpdateReferenceTracking?: AvailableUpdateReferenceTrackingResultSelection;

  triggerWriteBatchOrdersToSheets?: AvailableWriteBatchOrdersToSheetsResultSelection;

  triggerWriteSpeedafDataToSheets?: AvailableWriteSpeedafDataToSheetsResultSelection;

  triggerWriteToShopify?: AvailableWriteToShopifyResultSelection;

  cancelBackgroundAction?: AvailableCancelBackgroundActionResultSelection;

  bulkCancelBackgroundActions?: AvailableBulkCancelBackgroundActionResultSelection;
};



export type LockOperationResult = {

  __typename: 'LockOperationResult';

  /** Whether the lock operation succeeded */
  success: Scalars['Boolean'];

  /** Any errors encountered during the locking/unlocking operation */
  errors: ExecutionError[];
};



export type AvailableLockOperationResultSelection = {

  __typename?: boolean | null | undefined;

  /** Whether the lock operation succeeded */
  success?: boolean | null | undefined;

  /** Any errors encountered during the locking/unlocking operation */
  errors?: AvailableExecutionErrorSelection;
};



export type InternalCreateShopifyCustomerResult = {

  __typename: 'InternalCreateShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyCustomer: (InternalShopifyCustomerRecord | null);
};



export type AvailableInternalCreateShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyCustomer?: boolean | null | undefined;
};



export type InternalUpdateShopifyCustomerResult = {

  __typename: 'InternalUpdateShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyCustomer: (InternalShopifyCustomerRecord | null);
};



export type AvailableInternalUpdateShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyCustomer?: boolean | null | undefined;
};



export type InternalDeleteShopifyCustomerResult = {

  __typename: 'InternalDeleteShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyCustomer: (InternalShopifyCustomerRecord | null);
};



export type AvailableInternalDeleteShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyCustomer?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyCustomerResult = {

  __typename: 'InternalDeleteManyShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyCustomersResult = {

  __typename: 'InternalBulkCreateShopifyCustomersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyCustomers: (InternalShopifyCustomerRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyCustomersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyCustomers?: boolean | null | undefined;
};



export type InternalUpsertShopifyCustomerResult = {

  __typename: 'InternalUpsertShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyCustomer: (InternalShopifyCustomerRecord | null);
};



export type AvailableInternalUpsertShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyCustomer?: boolean | null | undefined;
};



export interface CreateShopifyCustomerResult extends UpsertShopifyCustomerResult {
  __typename: 'CreateShopifyCustomerResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyCustomer: (ShopifyCustomer | null);
};



export type AvailableCreateShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyCustomer?: AvailableShopifyCustomerSelection;
};



export interface UpdateShopifyCustomerResult extends UpsertShopifyCustomerResult {
  __typename: 'UpdateShopifyCustomerResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyCustomer: (ShopifyCustomer | null);
};



export type AvailableUpdateShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyCustomer?: AvailableShopifyCustomerSelection;
};



export type DeleteShopifyCustomerResult = {

  __typename: 'DeleteShopifyCustomerResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyCustomerResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyGdprRequestResult = {

  __typename: 'InternalCreateShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyGdprRequest: (InternalShopifyGdprRequestRecord | null);
};



export type AvailableInternalCreateShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyGdprRequest?: boolean | null | undefined;
};



export type InternalUpdateShopifyGdprRequestResult = {

  __typename: 'InternalUpdateShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyGdprRequest: (InternalShopifyGdprRequestRecord | null);
};



export type AvailableInternalUpdateShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyGdprRequest?: boolean | null | undefined;
};



export type InternalDeleteShopifyGdprRequestResult = {

  __typename: 'InternalDeleteShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyGdprRequest: (InternalShopifyGdprRequestRecord | null);
};



export type AvailableInternalDeleteShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyGdprRequest?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyGdprRequestResult = {

  __typename: 'InternalDeleteManyShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyGdprRequestsResult = {

  __typename: 'InternalBulkCreateShopifyGdprRequestsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyGdprRequests: (InternalShopifyGdprRequestRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyGdprRequestsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyGdprRequests?: boolean | null | undefined;
};



export type InternalUpsertShopifyGdprRequestResult = {

  __typename: 'InternalUpsertShopifyGdprRequestResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyGdprRequest: (InternalShopifyGdprRequestRecord | null);
};



export type AvailableInternalUpsertShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyGdprRequest?: boolean | null | undefined;
};



export interface CreateShopifyGdprRequestResult extends UpsertShopifyGdprRequestResult {
  __typename: 'CreateShopifyGdprRequestResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyGdprRequest: (ShopifyGdprRequest | null);
};



export type AvailableCreateShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyGdprRequest?: AvailableShopifyGdprRequestSelection;
};



export interface UpdateShopifyGdprRequestResult extends UpsertShopifyGdprRequestResult {
  __typename: 'UpdateShopifyGdprRequestResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyGdprRequest: (ShopifyGdprRequest | null);
};



export type AvailableUpdateShopifyGdprRequestResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyGdprRequest?: AvailableShopifyGdprRequestSelection;
};



export type InternalCreateShopifyOrderResult = {

  __typename: 'InternalCreateShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyOrder: (InternalShopifyOrderRecord | null);
};



export type AvailableInternalCreateShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyOrder?: boolean | null | undefined;
};



export type InternalUpdateShopifyOrderResult = {

  __typename: 'InternalUpdateShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyOrder: (InternalShopifyOrderRecord | null);
};



export type AvailableInternalUpdateShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyOrder?: boolean | null | undefined;
};



export type InternalDeleteShopifyOrderResult = {

  __typename: 'InternalDeleteShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyOrder: (InternalShopifyOrderRecord | null);
};



export type AvailableInternalDeleteShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyOrder?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyOrderResult = {

  __typename: 'InternalDeleteManyShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyOrdersResult = {

  __typename: 'InternalBulkCreateShopifyOrdersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyOrders: (InternalShopifyOrderRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyOrdersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyOrders?: boolean | null | undefined;
};



export type InternalUpsertShopifyOrderResult = {

  __typename: 'InternalUpsertShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyOrder: (InternalShopifyOrderRecord | null);
};



export type AvailableInternalUpsertShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyOrder?: boolean | null | undefined;
};



export interface CreateShopifyOrderResult extends UpsertShopifyOrderResult {
  __typename: 'CreateShopifyOrderResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyOrder: (ShopifyOrder | null);
};



export type AvailableCreateShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyOrder?: AvailableShopifyOrderSelection;
};



export type DeleteShopifyOrderResult = {

  __typename: 'DeleteShopifyOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyShopResult = {

  __typename: 'InternalCreateShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyShop: (InternalShopifyShopRecord | null);
};



export type AvailableInternalCreateShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyShop?: boolean | null | undefined;
};



export type InternalUpdateShopifyShopResult = {

  __typename: 'InternalUpdateShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyShop: (InternalShopifyShopRecord | null);
};



export type AvailableInternalUpdateShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyShop?: boolean | null | undefined;
};



export type InternalDeleteShopifyShopResult = {

  __typename: 'InternalDeleteShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyShop: (InternalShopifyShopRecord | null);
};



export type AvailableInternalDeleteShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyShop?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyShopResult = {

  __typename: 'InternalDeleteManyShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyShopsResult = {

  __typename: 'InternalBulkCreateShopifyShopsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyShops: (InternalShopifyShopRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyShopsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyShops?: boolean | null | undefined;
};



export type InternalUpsertShopifyShopResult = {

  __typename: 'InternalUpsertShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyShop: (InternalShopifyShopRecord | null);
};



export type AvailableInternalUpsertShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyShop?: boolean | null | undefined;
};



export interface UpdateShopifyShopResult extends UpsertShopifyShopResult {
  __typename: 'UpdateShopifyShopResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyShop: (ShopifyShop | null);
};



export type AvailableUpdateShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyShop?: AvailableShopifyShopSelection;
};



export interface InstallShopifyShopResult extends UpsertShopifyShopResult {
  __typename: 'InstallShopifyShopResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyShop: (ShopifyShop | null);
};



export type AvailableInstallShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyShop?: AvailableShopifyShopSelection;
};



export type ReinstallShopifyShopResult = {

  __typename: 'ReinstallShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  shopifyShop: (ShopifyShop | null);
};



export type AvailableReinstallShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyShop?: AvailableShopifyShopSelection;
};



export type UninstallShopifyShopResult = {

  __typename: 'UninstallShopifyShopResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  shopifyShop: (ShopifyShop | null);
};



export type AvailableUninstallShopifyShopResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyShop?: AvailableShopifyShopSelection;
};



export type InternalCreateShopifySyncResult = {

  __typename: 'InternalCreateShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifySync: (InternalShopifySyncRecord | null);
};



export type AvailableInternalCreateShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifySync?: boolean | null | undefined;
};



export type InternalUpdateShopifySyncResult = {

  __typename: 'InternalUpdateShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifySync: (InternalShopifySyncRecord | null);
};



export type AvailableInternalUpdateShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifySync?: boolean | null | undefined;
};



export type InternalDeleteShopifySyncResult = {

  __typename: 'InternalDeleteShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifySync: (InternalShopifySyncRecord | null);
};



export type AvailableInternalDeleteShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifySync?: boolean | null | undefined;
};



export type InternalDeleteManyShopifySyncResult = {

  __typename: 'InternalDeleteManyShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifySyncsResult = {

  __typename: 'InternalBulkCreateShopifySyncsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifySyncs: (InternalShopifySyncRecord | null)[];
};



export type AvailableInternalBulkCreateShopifySyncsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifySyncs?: boolean | null | undefined;
};



export type InternalUpsertShopifySyncResult = {

  __typename: 'InternalUpsertShopifySyncResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifySync: (InternalShopifySyncRecord | null);
};



export type AvailableInternalUpsertShopifySyncResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifySync?: boolean | null | undefined;
};



export type InternalCreateGoogleSheetConfigResult = {

  __typename: 'InternalCreateGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  googleSheetConfig: (InternalGoogleSheetConfigRecord | null);
};



export type AvailableInternalCreateGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  googleSheetConfig?: boolean | null | undefined;
};



export type InternalUpdateGoogleSheetConfigResult = {

  __typename: 'InternalUpdateGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  googleSheetConfig: (InternalGoogleSheetConfigRecord | null);
};



export type AvailableInternalUpdateGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  googleSheetConfig?: boolean | null | undefined;
};



export type InternalDeleteGoogleSheetConfigResult = {

  __typename: 'InternalDeleteGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  googleSheetConfig: (InternalGoogleSheetConfigRecord | null);
};



export type AvailableInternalDeleteGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  googleSheetConfig?: boolean | null | undefined;
};



export type InternalDeleteManyGoogleSheetConfigResult = {

  __typename: 'InternalDeleteManyGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateGoogleSheetConfigsResult = {

  __typename: 'InternalBulkCreateGoogleSheetConfigsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  googleSheetConfigs: (InternalGoogleSheetConfigRecord | null)[];
};



export type AvailableInternalBulkCreateGoogleSheetConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  googleSheetConfigs?: boolean | null | undefined;
};



export type InternalUpsertGoogleSheetConfigResult = {

  __typename: 'InternalUpsertGoogleSheetConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  googleSheetConfig: (InternalGoogleSheetConfigRecord | null);
};



export type AvailableInternalUpsertGoogleSheetConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  googleSheetConfig?: boolean | null | undefined;
};



export type InternalCreateSessionResult = {

  __typename: 'InternalCreateSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalCreateSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  session?: boolean | null | undefined;
};



export type InternalUpdateSessionResult = {

  __typename: 'InternalUpdateSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalUpdateSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  session?: boolean | null | undefined;
};



export type InternalDeleteSessionResult = {

  __typename: 'InternalDeleteSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalDeleteSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  session?: boolean | null | undefined;
};



export type InternalDeleteManySessionResult = {

  __typename: 'InternalDeleteManySessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManySessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateSessionsResult = {

  __typename: 'InternalBulkCreateSessionsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  sessions: (InternalSessionRecord | null)[];
};



export type AvailableInternalBulkCreateSessionsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  sessions?: boolean | null | undefined;
};



export type InternalUpsertSessionResult = {

  __typename: 'InternalUpsertSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalUpsertSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  session?: boolean | null | undefined;
};



export type InternalCreateShopifyFulfillmentResult = {

  __typename: 'InternalCreateShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillment: (InternalShopifyFulfillmentRecord | null);
};



export type AvailableInternalCreateShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillment?: boolean | null | undefined;
};



export type InternalUpdateShopifyFulfillmentResult = {

  __typename: 'InternalUpdateShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillment: (InternalShopifyFulfillmentRecord | null);
};



export type AvailableInternalUpdateShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillment?: boolean | null | undefined;
};



export type InternalDeleteShopifyFulfillmentResult = {

  __typename: 'InternalDeleteShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillment: (InternalShopifyFulfillmentRecord | null);
};



export type AvailableInternalDeleteShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillment?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyFulfillmentResult = {

  __typename: 'InternalDeleteManyShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyFulfillmentsResult = {

  __typename: 'InternalBulkCreateShopifyFulfillmentsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyFulfillments: (InternalShopifyFulfillmentRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyFulfillmentsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyFulfillments?: boolean | null | undefined;
};



export type InternalUpsertShopifyFulfillmentResult = {

  __typename: 'InternalUpsertShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillment: (InternalShopifyFulfillmentRecord | null);
};



export type AvailableInternalUpsertShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillment?: boolean | null | undefined;
};



export interface CreateShopifyFulfillmentResult extends UpsertShopifyFulfillmentResult {
  __typename: 'CreateShopifyFulfillmentResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillment: (ShopifyFulfillment | null);
};



export type AvailableCreateShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillment?: AvailableShopifyFulfillmentSelection;
};



export interface UpdateShopifyFulfillmentResult extends UpsertShopifyFulfillmentResult {
  __typename: 'UpdateShopifyFulfillmentResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillment: (ShopifyFulfillment | null);
};



export type AvailableUpdateShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillment?: AvailableShopifyFulfillmentSelection;
};



export type DeleteShopifyFulfillmentResult = {

  __typename: 'DeleteShopifyFulfillmentResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyFulfillmentResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyFulfillmentOrderResult = {

  __typename: 'InternalCreateShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentOrder: (InternalShopifyFulfillmentOrderRecord | null);
};



export type AvailableInternalCreateShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentOrder?: boolean | null | undefined;
};



export type InternalUpdateShopifyFulfillmentOrderResult = {

  __typename: 'InternalUpdateShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentOrder: (InternalShopifyFulfillmentOrderRecord | null);
};



export type AvailableInternalUpdateShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentOrder?: boolean | null | undefined;
};



export type InternalDeleteShopifyFulfillmentOrderResult = {

  __typename: 'InternalDeleteShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentOrder: (InternalShopifyFulfillmentOrderRecord | null);
};



export type AvailableInternalDeleteShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentOrder?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyFulfillmentOrderResult = {

  __typename: 'InternalDeleteManyShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyFulfillmentOrdersResult = {

  __typename: 'InternalBulkCreateShopifyFulfillmentOrdersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyFulfillmentOrders: (InternalShopifyFulfillmentOrderRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyFulfillmentOrdersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyFulfillmentOrders?: boolean | null | undefined;
};



export type InternalUpsertShopifyFulfillmentOrderResult = {

  __typename: 'InternalUpsertShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentOrder: (InternalShopifyFulfillmentOrderRecord | null);
};



export type AvailableInternalUpsertShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentOrder?: boolean | null | undefined;
};



export interface CreateShopifyFulfillmentOrderResult extends UpsertShopifyFulfillmentOrderResult {
  __typename: 'CreateShopifyFulfillmentOrderResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillmentOrder: (ShopifyFulfillmentOrder | null);
};



export type AvailableCreateShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillmentOrder?: AvailableShopifyFulfillmentOrderSelection;
};



export interface UpdateShopifyFulfillmentOrderResult extends UpsertShopifyFulfillmentOrderResult {
  __typename: 'UpdateShopifyFulfillmentOrderResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillmentOrder: (ShopifyFulfillmentOrder | null);
};



export type AvailableUpdateShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillmentOrder?: AvailableShopifyFulfillmentOrderSelection;
};



export type DeleteShopifyFulfillmentOrderResult = {

  __typename: 'DeleteShopifyFulfillmentOrderResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyFulfillmentOrderResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyFulfillmentServiceResult = {

  __typename: 'InternalCreateShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentService: (InternalShopifyFulfillmentServiceRecord | null);
};



export type AvailableInternalCreateShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentService?: boolean | null | undefined;
};



export type InternalUpdateShopifyFulfillmentServiceResult = {

  __typename: 'InternalUpdateShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentService: (InternalShopifyFulfillmentServiceRecord | null);
};



export type AvailableInternalUpdateShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentService?: boolean | null | undefined;
};



export type InternalDeleteShopifyFulfillmentServiceResult = {

  __typename: 'InternalDeleteShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentService: (InternalShopifyFulfillmentServiceRecord | null);
};



export type AvailableInternalDeleteShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentService?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyFulfillmentServiceResult = {

  __typename: 'InternalDeleteManyShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyFulfillmentServicesResult = {

  __typename: 'InternalBulkCreateShopifyFulfillmentServicesResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyFulfillmentServices: (InternalShopifyFulfillmentServiceRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyFulfillmentServicesResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyFulfillmentServices?: boolean | null | undefined;
};



export type InternalUpsertShopifyFulfillmentServiceResult = {

  __typename: 'InternalUpsertShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyFulfillmentService: (InternalShopifyFulfillmentServiceRecord | null);
};



export type AvailableInternalUpsertShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyFulfillmentService?: boolean | null | undefined;
};



export interface CreateShopifyFulfillmentServiceResult extends UpsertShopifyFulfillmentServiceResult {
  __typename: 'CreateShopifyFulfillmentServiceResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillmentService: (ShopifyFulfillmentService | null);
};



export type AvailableCreateShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillmentService?: AvailableShopifyFulfillmentServiceSelection;
};



export interface UpdateShopifyFulfillmentServiceResult extends UpsertShopifyFulfillmentServiceResult {
  __typename: 'UpdateShopifyFulfillmentServiceResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyFulfillmentService: (ShopifyFulfillmentService | null);
};



export type AvailableUpdateShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyFulfillmentService?: AvailableShopifyFulfillmentServiceSelection;
};



export type DeleteShopifyFulfillmentServiceResult = {

  __typename: 'DeleteShopifyFulfillmentServiceResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyFulfillmentServiceResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyProductResult = {

  __typename: 'InternalCreateShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProduct: (InternalShopifyProductRecord | null);
};



export type AvailableInternalCreateShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProduct?: boolean | null | undefined;
};



export type InternalUpdateShopifyProductResult = {

  __typename: 'InternalUpdateShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProduct: (InternalShopifyProductRecord | null);
};



export type AvailableInternalUpdateShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProduct?: boolean | null | undefined;
};



export type InternalDeleteShopifyProductResult = {

  __typename: 'InternalDeleteShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProduct: (InternalShopifyProductRecord | null);
};



export type AvailableInternalDeleteShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProduct?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyProductResult = {

  __typename: 'InternalDeleteManyShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyProductsResult = {

  __typename: 'InternalBulkCreateShopifyProductsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyProducts: (InternalShopifyProductRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyProductsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyProducts?: boolean | null | undefined;
};



export type InternalUpsertShopifyProductResult = {

  __typename: 'InternalUpsertShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProduct: (InternalShopifyProductRecord | null);
};



export type AvailableInternalUpsertShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProduct?: boolean | null | undefined;
};



export interface CreateShopifyProductResult extends UpsertShopifyProductResult {
  __typename: 'CreateShopifyProductResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyProduct: (ShopifyProduct | null);
};



export type AvailableCreateShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyProduct?: AvailableShopifyProductSelection;
};



export interface UpdateShopifyProductResult extends UpsertShopifyProductResult {
  __typename: 'UpdateShopifyProductResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyProduct: (ShopifyProduct | null);
};



export type AvailableUpdateShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyProduct?: AvailableShopifyProductSelection;
};



export type DeleteShopifyProductResult = {

  __typename: 'DeleteShopifyProductResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyProductResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateShopifyProductVariantResult = {

  __typename: 'InternalCreateShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProductVariant: (InternalShopifyProductVariantRecord | null);
};



export type AvailableInternalCreateShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProductVariant?: boolean | null | undefined;
};



export type InternalUpdateShopifyProductVariantResult = {

  __typename: 'InternalUpdateShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProductVariant: (InternalShopifyProductVariantRecord | null);
};



export type AvailableInternalUpdateShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProductVariant?: boolean | null | undefined;
};



export type InternalDeleteShopifyProductVariantResult = {

  __typename: 'InternalDeleteShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProductVariant: (InternalShopifyProductVariantRecord | null);
};



export type AvailableInternalDeleteShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProductVariant?: boolean | null | undefined;
};



export type InternalDeleteManyShopifyProductVariantResult = {

  __typename: 'InternalDeleteManyShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateShopifyProductVariantsResult = {

  __typename: 'InternalBulkCreateShopifyProductVariantsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  shopifyProductVariants: (InternalShopifyProductVariantRecord | null)[];
};



export type AvailableInternalBulkCreateShopifyProductVariantsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  shopifyProductVariants?: boolean | null | undefined;
};



export type InternalUpsertShopifyProductVariantResult = {

  __typename: 'InternalUpsertShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  shopifyProductVariant: (InternalShopifyProductVariantRecord | null);
};



export type AvailableInternalUpsertShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  shopifyProductVariant?: boolean | null | undefined;
};



export interface CreateShopifyProductVariantResult extends UpsertShopifyProductVariantResult {
  __typename: 'CreateShopifyProductVariantResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyProductVariant: (ShopifyProductVariant | null);
};



export type AvailableCreateShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyProductVariant?: AvailableShopifyProductVariantSelection;
};



export interface UpdateShopifyProductVariantResult extends UpsertShopifyProductVariantResult {
  __typename: 'UpdateShopifyProductVariantResult';
  success: Scalars['Boolean'];
  errors: ExecutionError[];
  actionRun: (Scalars['String'] | null);
  shopifyProductVariant: (ShopifyProductVariant | null);
};



export type AvailableUpdateShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  shopifyProductVariant?: AvailableShopifyProductVariantSelection;
};



export type DeleteShopifyProductVariantResult = {

  __typename: 'DeleteShopifyProductVariantResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteShopifyProductVariantResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};



export type InternalCreateSenditConfigResult = {

  __typename: 'InternalCreateSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  senditConfig: (InternalSenditConfigRecord | null);
};



export type AvailableInternalCreateSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  senditConfig?: boolean | null | undefined;
};



export type InternalUpdateSenditConfigResult = {

  __typename: 'InternalUpdateSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  senditConfig: (InternalSenditConfigRecord | null);
};



export type AvailableInternalUpdateSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  senditConfig?: boolean | null | undefined;
};



export type InternalDeleteSenditConfigResult = {

  __typename: 'InternalDeleteSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  senditConfig: (InternalSenditConfigRecord | null);
};



export type AvailableInternalDeleteSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  senditConfig?: boolean | null | undefined;
};



export type InternalDeleteManySenditConfigResult = {

  __typename: 'InternalDeleteManySenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManySenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateSenditConfigsResult = {

  __typename: 'InternalBulkCreateSenditConfigsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  senditConfigs: (InternalSenditConfigRecord | null)[];
};



export type AvailableInternalBulkCreateSenditConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  senditConfigs?: boolean | null | undefined;
};



export type InternalUpsertSenditConfigResult = {

  __typename: 'InternalUpsertSenditConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  senditConfig: (InternalSenditConfigRecord | null);
};



export type AvailableInternalUpsertSenditConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  senditConfig?: boolean | null | undefined;
};



export type InternalCreateSpeedafConfigResult = {

  __typename: 'InternalCreateSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  speedafConfig: (InternalSpeedafConfigRecord | null);
};



export type AvailableInternalCreateSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  speedafConfig?: boolean | null | undefined;
};



export type InternalUpdateSpeedafConfigResult = {

  __typename: 'InternalUpdateSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  speedafConfig: (InternalSpeedafConfigRecord | null);
};



export type AvailableInternalUpdateSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  speedafConfig?: boolean | null | undefined;
};



export type InternalDeleteSpeedafConfigResult = {

  __typename: 'InternalDeleteSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  speedafConfig: (InternalSpeedafConfigRecord | null);
};



export type AvailableInternalDeleteSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  speedafConfig?: boolean | null | undefined;
};



export type InternalDeleteManySpeedafConfigResult = {

  __typename: 'InternalDeleteManySpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManySpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateSpeedafConfigsResult = {

  __typename: 'InternalBulkCreateSpeedafConfigsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  speedafConfigs: (InternalSpeedafConfigRecord | null)[];
};



export type AvailableInternalBulkCreateSpeedafConfigsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  speedafConfigs?: boolean | null | undefined;
};



export type InternalUpsertSpeedafConfigResult = {

  __typename: 'InternalUpsertSpeedafConfigResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  speedafConfig: (InternalSpeedafConfigRecord | null);
};



export type AvailableInternalUpsertSpeedafConfigResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  speedafConfig?: boolean | null | undefined;
};



export type InternalCreateCustomCityResult = {

  __typename: 'InternalCreateCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  customCity: (InternalCustomCityRecord | null);
};



export type AvailableInternalCreateCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  customCity?: boolean | null | undefined;
};



export type InternalUpdateCustomCityResult = {

  __typename: 'InternalUpdateCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  customCity: (InternalCustomCityRecord | null);
};



export type AvailableInternalUpdateCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  customCity?: boolean | null | undefined;
};



export type InternalDeleteCustomCityResult = {

  __typename: 'InternalDeleteCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  customCity: (InternalCustomCityRecord | null);
};



export type AvailableInternalDeleteCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  customCity?: boolean | null | undefined;
};



export type InternalDeleteManyCustomCityResult = {

  __typename: 'InternalDeleteManyCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateCustomCitiesResult = {

  __typename: 'InternalBulkCreateCustomCitiesResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  customCities: (InternalCustomCityRecord | null)[];
};



export type AvailableInternalBulkCreateCustomCitiesResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  customCities?: boolean | null | undefined;
};



export type InternalUpsertCustomCityResult = {

  __typename: 'InternalUpsertCustomCityResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  /** Whether the record was created by this upsert operation */
  created: Scalars['Boolean'];

  customCity: (InternalCustomCityRecord | null);
};



export type AvailableInternalUpsertCustomCityResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  /** Whether the record was created by this upsert operation */
  created?: boolean | null | undefined;

  customCity?: boolean | null | undefined;
};


/** The value returned from cancelling a background action */
export type CancelBackgroundActionResult = {

  __typename: 'CancelBackgroundActionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  backgroundAction: (BackgroundActionHandle | null);
};



export type AvailableCancelBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  backgroundAction?: AvailableBackgroundActionHandleSelection;
};


/** The value returned from cancelling a background action */
export type BulkCancelBackgroundActionResult = {

  __typename: 'BulkCancelBackgroundActionResult';

  successCount: Scalars['Int'];

  failedCount: Scalars['Int'];
};



export type AvailableBulkCancelBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  successCount?: boolean | null | undefined;

  failedCount?: boolean | null | undefined;
};



export type Subscription = {

  __typename: 'Subscription';

  /** Subscribe to events about the application for the development harness */
  gadgetMetaHarnessEvents: GadgetApplicationHarnessEvent;

  backgroundAction: (BackgroundAction | null);
};



export type AvailableSubscriptionSelection = {

  __typename?: boolean | null | undefined;

  /** Subscribe to events about the application for the development harness */
  gadgetMetaHarnessEvents?: AvailableGadgetApplicationHarnessEventSelection;

  backgroundAction?: AvailableBackgroundActionSelection;
};



export type GadgetApplicationHarnessEvent = {

  __typename: 'GadgetApplicationHarnessEvent';

  id: Scalars['String'];

  event: Scalars['JSON'];
};



export type AvailableGadgetApplicationHarnessEventSelection = {

  __typename?: boolean | null | undefined;

  id?: boolean | null | undefined;

  event?: boolean | null | undefined;
};



export type BackgroundAction = {

  __typename: 'BackgroundAction';

  /** The ID of the background action */
  id: Scalars['String'];

  outcome: (BackgroundActionOutcome | null);

  result: (BackgroundActionResult | null);
};



export type AvailableBackgroundActionSelection = {

  __typename?: boolean | null | undefined;

  /** The ID of the background action */
  id?: boolean | null | undefined;

  outcome?: boolean | null | undefined;

  result?: AvailableBackgroundActionResultSelection;
};



export type ExplicitNestingRequired = never;

export type DeepFilterNever<T> = T extends Record<string, unknown> ? FilterNever<{
  [Key in keyof T]: T[Key] extends Record<string, unknown> ? DeepFilterNever<T[Key]> : T[Key];
}> : T;

/**
 * Given a schema we can select values from, apply a given selection to that schema to get the output type.
 **/
export type Select<Schema, Selection extends FieldSelection | null | undefined> = Selection extends null | undefined
  ? never
  : Schema extends (infer T)[]
  ? Select<T, Selection>[]
  : Schema extends null
  ? Select<Exclude<Schema, null>, Selection> | null
  : {
      [Key in keyof Selection & keyof Schema]: Selection[Key] extends true
        ? Schema[Key]
        : Selection[Key] extends FieldSelection
        ? Select<Schema[Key], Selection[Key]>
        : never;
    };

export type IDsList = {
  ids: string[];
}

/**
 * For finder functions which accept the `live: true` argument, this type decides if the return type will be one value or an async iterable stream of values
 * If {live: true}, returns an AsyncIterable<Result>
 * Anything else, returns a Promise<Result>
 **/
export type PromiseOrLiveIterator<Options extends { live?: boolean }, Result> = Options extends { live: true } ? AsyncIterable<Result> : Promise<Result>;

export type { ComputedViewWithoutVariables, ComputedViewWithVariables, ComputedViewFunctionWithoutVariables, ComputedViewFunctionWithVariables }
