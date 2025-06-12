// generated with metadata generator for bambe-crm-app for fv ^1.3.0
import type { OperationContext, Exchange } from "@urql/core";
import { pipe, map } from "wonka";
import { assert, GadgetConnection, AuthenticationMode, GadgetTransaction, InternalModelManager, ActionFunctionMetadata, GlobalActionFunction, enqueueActionRunner, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import type { ClientOptions as ApiClientOptions, AnyClient, EnqueueBackgroundActionOptions, AnyActionFunction } from '@gadgetinc/api-client-core';
import type { DocumentNode } from 'graphql';

import { buildGlobalAction } from "./builder.js";
import { Scalars, SyncOrdersOrdersElementTypeInput } from "./types.js";
import { DefaultShopifyCustomerSelection, ShopifyCustomerManager } from "./models/ShopifyCustomer.js";
import { DefaultShopifyGdprRequestSelection, ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { DefaultShopifyOrderSelection, ShopifyOrderManager } from "./models/ShopifyOrder.js";
import { DefaultShopifyShopSelection, ShopifyShopManager } from "./models/ShopifyShop.js";
import { DefaultShopifySyncSelection, ShopifySyncManager } from "./models/ShopifySync.js";
import { DefaultGoogleSheetConfigSelection, GoogleSheetConfigManager } from "./models/GoogleSheetConfig.js";
import { DefaultSessionSelection, SessionManager } from "./models/Session.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { DefaultShopifyFulfillmentSelection, ShopifyFulfillmentManager } from "./models/ShopifyFulfillment.js";
import { DefaultShopifyFulfillmentOrderSelection, ShopifyFulfillmentOrderManager } from "./models/ShopifyFulfillmentOrder.js";
import { DefaultShopifyFulfillmentServiceSelection, ShopifyFulfillmentServiceManager } from "./models/ShopifyFulfillmentService.js";
import { DefaultShopifyProductSelection, ShopifyProductManager } from "./models/ShopifyProduct.js";
import { DefaultShopifyProductVariantSelection, ShopifyProductVariantManager } from "./models/ShopifyProductVariant.js";
import { DefaultSenditConfigSelection, SenditConfigManager } from "./models/SenditConfig.js";
import { DefaultSpeedafConfigSelection, SpeedafConfigManager } from "./models/SpeedafConfig.js";
export { DefaultShopifyCustomerSelection, type ShopifyCustomerRecord } from "./models/ShopifyCustomer.js";
export { DefaultShopifyGdprRequestSelection, type ShopifyGdprRequestRecord } from "./models/ShopifyGdprRequest.js";
export { DefaultShopifyOrderSelection, type ShopifyOrderRecord } from "./models/ShopifyOrder.js";
export { DefaultShopifyShopSelection, type ShopifyShopRecord } from "./models/ShopifyShop.js";
export { DefaultShopifySyncSelection, type ShopifySyncRecord } from "./models/ShopifySync.js";
export { DefaultGoogleSheetConfigSelection, type GoogleSheetConfigRecord } from "./models/GoogleSheetConfig.js";
export { DefaultSessionSelection, type SessionRecord } from "./models/Session.js";
export { DefaultShopifyFulfillmentSelection, type ShopifyFulfillmentRecord } from "./models/ShopifyFulfillment.js";
export { DefaultShopifyFulfillmentOrderSelection, type ShopifyFulfillmentOrderRecord } from "./models/ShopifyFulfillmentOrder.js";
export { DefaultShopifyFulfillmentServiceSelection, type ShopifyFulfillmentServiceRecord } from "./models/ShopifyFulfillmentService.js";
export { DefaultShopifyProductSelection, type ShopifyProductRecord } from "./models/ShopifyProduct.js";
export { DefaultShopifyProductVariantSelection, type ShopifyProductVariantRecord } from "./models/ShopifyProductVariant.js";
export { DefaultSenditConfigSelection, type SenditConfigRecord } from "./models/SenditConfig.js";
export { DefaultSpeedafConfigSelection, type SpeedafConfigRecord } from "./models/SpeedafConfig.js";

type ClientOptions = Omit<ApiClientOptions, "environment"> & { environment?: string };
type AllOptionalVariables<T> = Partial<T> extends T ? object : never;
export type InternalModelManagers = {
   /** The internal API model manager for the shopifyCustomer model */
   shopifyCustomer: InternalModelManager;
   /** The internal API model manager for the shopifyGdprRequest model */
   shopifyGdprRequest: InternalModelManager;
   /** The internal API model manager for the shopifyOrder model */
   shopifyOrder: InternalModelManager;
   /** The internal API model manager for the shopifyShop model */
   shopifyShop: InternalModelManager;
   /** The internal API model manager for the shopifySync model */
   shopifySync: InternalModelManager;
   /** The internal API model manager for the googleSheetConfig model */
   googleSheetConfig: InternalModelManager;
   /** The internal API model manager for the session model */
   session: InternalModelManager;
   /** The internal API model manager for the shopifyFulfillment model */
   shopifyFulfillment: InternalModelManager;
   /** The internal API model manager for the shopifyFulfillmentOrder model */
   shopifyFulfillmentOrder: InternalModelManager;
   /** The internal API model manager for the shopifyFulfillmentService model */
   shopifyFulfillmentService: InternalModelManager;
   /** The internal API model manager for the shopifyProduct model */
   shopifyProduct: InternalModelManager;
   /** The internal API model manager for the shopifyProductVariant model */
   shopifyProductVariant: InternalModelManager;
   /** The internal API model manager for the senditConfig model */
   senditConfig: InternalModelManager;
   /** The internal API model manager for the speedafConfig model */
   speedafConfig: InternalModelManager;
 };

const productionEnv = "production";
const fallbackEnv = "development";

/**
 * Return the implicit environment
 * We specifically use an environment variable  `process.env.GADGET_ENV` or similar so that bundlers like webpack or vite can string replace this value in built source codes with the user's desired value.
 */
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return undefined;
  }
}



/**
 * Root object used for interacting with the bambe-crm-app API. `Client` has `query` and `mutation` functions for executing raw GraphQL queries and mutations, as well as `ModelManager` objects for manipulating models with a JavaScript API. `Client` also has a `fetch` function for making raw requests to your backend.
 * */
export class Client implements AnyClient {
  connection!: GadgetConnection;

  /** Executes the createSenditOrder global action. */
  createSenditOrder = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'createSenditOrder',
                       operationName: 'createSenditOrder',
                       operationReturnType: 'CreateSenditOrder',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'createSenditOrder';
                     operationReturnType: 'CreateSenditOrder';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the directOrderTest global action. */
  directOrderTest = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'directOrderTest',
                       operationName: 'directOrderTest',
                       operationReturnType: 'DirectOrderTest',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'directOrderTest';
                     operationReturnType: 'DirectOrderTest';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the extractOrderSKUs global action. */
  extractOrderSKUs = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'extractOrderSKUs',
                       operationName: 'extractOrderSKUs',
                       operationReturnType: 'ExtractOrderSKUs',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'extractOrderSKUs';
                     operationReturnType: 'ExtractOrderSKUs';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the fulfillOrder global action. */
  fulfillOrder = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'fulfillOrder',
                       operationName: 'fulfillOrder',
                       operationReturnType: 'FulfillOrder',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' },
                         manualTrackingNumber: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                        manualTrackingNumber?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'fulfillOrder';
                     operationReturnType: 'FulfillOrder';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' },
                         manualTrackingNumber: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                             manualTrackingNumber?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the getSenditDistrictId global action. */
  getSenditDistrictId = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'getSenditDistrictId',
                       operationName: 'getSenditDistrictId',
                       operationReturnType: 'GetSenditDistrictId',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'getSenditDistrictId';
                     operationReturnType: 'GetSenditDistrictId';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the processSpeedafAPI global action. */
  processSpeedafAPI = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'processSpeedafAPI',
                       operationName: 'processSpeedafAPI',
                       operationReturnType: 'ProcessSpeedafAPI',
                       namespace: null,
                       variables: {
                         shopId: { required: false, type: 'String' },
                         requestData: { required: false, type: 'JSONObject' },
                         testMode: { required: false, type: 'Boolean' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        shopId?: (Scalars['String'] | null) | null;
                                        requestData?: (Scalars['JSONObject'] | null) | null;
                                        testMode?: (Scalars['Boolean'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'processSpeedafAPI';
                     operationReturnType: 'ProcessSpeedafAPI';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         shopId: { required: false, type: 'String' },
                         requestData: { required: false, type: 'JSONObject' },
                         testMode: { required: false, type: 'Boolean' }
                       };
                     variablesType: {
                             shopId?: (Scalars['String'] | null) | null;
                             requestData?: (Scalars['JSONObject'] | null) | null;
                             testMode?: (Scalars['Boolean'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the removeOrderFromSheets global action. */
  removeOrderFromSheets = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'removeOrderFromSheets',
                       operationName: 'removeOrderFromSheets',
                       operationReturnType: 'RemoveOrderFromSheets',
                       namespace: null,
                       variables: {
                         orderName: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderName?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'removeOrderFromSheets';
                     operationReturnType: 'RemoveOrderFromSheets';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderName: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderName?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the senditFulfillOrder global action. */
  senditFulfillOrder = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'senditFulfillOrder',
                       operationName: 'senditFulfillOrder',
                       operationReturnType: 'SenditFulfillOrder',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'senditFulfillOrder';
                     operationReturnType: 'SenditFulfillOrder';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the standardizeMoroccanAddress global action. */
  standardizeMoroccanAddress = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'standardizeMoroccanAddress',
                       operationName: 'standardizeMoroccanAddress',
                       operationReturnType: 'StandardizeMoroccanAddress',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'standardizeMoroccanAddress';
                     operationReturnType: 'StandardizeMoroccanAddress';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the standardizeMoroccanCity global action. */
  standardizeMoroccanCity = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'standardizeMoroccanCity',
                       operationName: 'standardizeMoroccanCity',
                       operationReturnType: 'StandardizeMoroccanCity',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'standardizeMoroccanCity';
                     operationReturnType: 'StandardizeMoroccanCity';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the syncOrders global action. */
  syncOrders = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'syncOrders',
                       operationName: 'syncOrders',
                       operationReturnType: 'SyncOrders',
                       namespace: null,
                       variables: {
                         limit: { required: false, type: 'Float' },
                         orders: { required: false, type: '[SyncOrdersOrdersElementTypeInput!]' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        limit?: (Scalars['Float'] | null) | null;
                                        orders?: (SyncOrdersOrdersElementTypeInput)[];
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'syncOrders';
                     operationReturnType: 'SyncOrders';
                     namespace: null;
                     typesImports: [ 'SyncOrdersOrdersElementTypeInput', 'Scalars' ];
                     variables: {
                         limit: { required: false, type: 'Float' },
                         orders: { required: false, type: '[SyncOrdersOrdersElementTypeInput!]' }
                       };
                     variablesType: {
                             limit?: (Scalars['Float'] | null) | null;
                             orders?: (SyncOrdersOrdersElementTypeInput)[];
                           }
                             | null
                             | undefined;
                   };
  /** Executes the testGoogleAuth global action. */
  testGoogleAuth = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'testGoogleAuth',
                       operationName: 'testGoogleAuth',
                       operationReturnType: 'TestGoogleAuth',
                       namespace: null,
                       variables: {
                         shopId: { required: false, type: 'String' },
                         spreadsheetId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        shopId?: (Scalars['String'] | null) | null;
                                        spreadsheetId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'testGoogleAuth';
                     operationReturnType: 'TestGoogleAuth';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         shopId: { required: false, type: 'String' },
                         spreadsheetId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             shopId?: (Scalars['String'] | null) | null;
                             spreadsheetId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the testSenditConnection global action. */
  testSenditConnection = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'testSenditConnection',
                       operationName: 'testSenditConnection',
                       operationReturnType: 'TestSenditConnection',
                       namespace: null,
                       variables: {
                         publicKey: { required: false, type: 'String' },
                         secretKey: { required: false, type: 'String' },
                         saveToPersistent: { required: false, type: 'Boolean' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        publicKey?: (Scalars['String'] | null) | null;
                                        secretKey?: (Scalars['String'] | null) | null;
                                        saveToPersistent?: (Scalars['Boolean'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'testSenditConnection';
                     operationReturnType: 'TestSenditConnection';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         publicKey: { required: false, type: 'String' },
                         secretKey: { required: false, type: 'String' },
                         saveToPersistent: { required: false, type: 'Boolean' }
                       };
                     variablesType: {
                             publicKey?: (Scalars['String'] | null) | null;
                             secretKey?: (Scalars['String'] | null) | null;
                             saveToPersistent?: (Scalars['Boolean'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the testWriteToSheet global action. */
  testWriteToSheet = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'testWriteToSheet',
                       operationName: 'testWriteToSheet',
                       operationReturnType: 'TestWriteToSheet',
                       namespace: null,
                       variables: {
                         spreadsheetId: { required: false, type: 'String' },
                         sheetName: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        spreadsheetId?: (Scalars['String'] | null) | null;
                                        sheetName?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'testWriteToSheet';
                     operationReturnType: 'TestWriteToSheet';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         spreadsheetId: { required: false, type: 'String' },
                         sheetName: { required: false, type: 'String' }
                       };
                     variablesType: {
                             spreadsheetId?: (Scalars['String'] | null) | null;
                             sheetName?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the updateReferenceTracking global action. */
  updateReferenceTracking = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'updateReferenceTracking',
                       operationName: 'updateReferenceTracking',
                       operationReturnType: 'UpdateReferenceTracking',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' },
                         referenceTrackingCode: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                        referenceTrackingCode?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'updateReferenceTracking';
                     operationReturnType: 'UpdateReferenceTracking';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' },
                         referenceTrackingCode: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                             referenceTrackingCode?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the writeBatchOrdersToSheets global action. */
  writeBatchOrdersToSheets = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'writeBatchOrdersToSheets',
                       operationName: 'writeBatchOrdersToSheets',
                       operationReturnType: 'WriteBatchOrdersToSheets',
                       namespace: null,
                       variables: {
                         ordersData: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        ordersData?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'writeBatchOrdersToSheets';
                     operationReturnType: 'WriteBatchOrdersToSheets';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         ordersData: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             ordersData?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the writeToShopify global action. */
  writeToShopify = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'writeToShopify',
                       operationName: 'writeToShopify',
                       operationReturnType: 'WriteToShopify',
                       namespace: null,
                       variables: {
                         shopId: { required: false, type: 'String' },
                         mutation: { required: false, type: 'String' },
                         variables: { required: false, type: 'JSONObject' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        shopId?: (Scalars['String'] | null) | null;
                                        mutation?: (Scalars['String'] | null) | null;
                                        variables?: (Scalars['JSONObject'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'writeToShopify';
                     operationReturnType: 'WriteToShopify';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         shopId: { required: false, type: 'String' },
                         mutation: { required: false, type: 'String' },
                         variables: { required: false, type: 'JSONObject' }
                       };
                     variablesType: {
                             shopId?: (Scalars['String'] | null) | null;
                             mutation?: (Scalars['String'] | null) | null;
                             variables?: (Scalars['JSONObject'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  shopifyCustomer!: ShopifyCustomerManager;
  shopifyGdprRequest!: ShopifyGdprRequestManager;
  shopifyOrder!: ShopifyOrderManager;
  shopifyShop!: ShopifyShopManager;
  shopifySync!: ShopifySyncManager;
  googleSheetConfig!: GoogleSheetConfigManager;
  session!: SessionManager;
  currentSession!: CurrentSessionManager;
  shopifyFulfillment!: ShopifyFulfillmentManager;
  shopifyFulfillmentOrder!: ShopifyFulfillmentOrderManager;
  shopifyFulfillmentService!: ShopifyFulfillmentServiceManager;
  shopifyProduct!: ShopifyProductManager;
  shopifyProductVariant!: ShopifyProductVariantManager;
  senditConfig!: SenditConfigManager;
  speedafConfig!: SpeedafConfigManager;

  /**
  * Namespaced object for accessing models via the Gadget internal APIs, which provide lower level and higher privileged operations directly against the database. Useful for maintenance operations like migrations or correcting broken data, and for implementing the high level actions.
  *
  * Returns an object of model API identifiers to `InternalModelManager` objects.
  *
  * Example:
  * `api.internal.user.findOne(...)`
  */
  internal!: InternalModelManagers;

  /**
   * The list of environments with a customized API root endpoint
   */
  apiRoots: Record<string, string> = {"development":"https://bambe-crm-app--development.gadget.app/","production":"https://bambe-crm-app.gadget.app/"};



  applicationId: string = "222569";
  environment!: string;

  constructor(readonly options?: ClientOptions | undefined) {
    let inSSRContext = false;

    try {
      // @ts-ignore
      inSSRContext = !!(import.meta.env && import.meta.env.SSR);
    } catch (error) {
      // no-op; this try-catch is here to prevent the empty-import-meta esbuild warning:
    }

    // Inside Vite SSR contexts on Gadget's app sandboxes, we use the global api client set up
    // by the gadget-server package. This is so that the api client used in i.e. Remix loaders
    // has all of the same auth and functionality as any other sandbox api client.
    if (inSSRContext) {
      const api = (globalThis as any).GadgetGlobals?.api;

      if (api) {
        return api.actAsSession;
      }
    }

    // for multi environment apps (this one), we accept any 'ole string as an environment, and we look in GADGET_ENV to determine the environment if not passed explicitly
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot: string;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://bambe-crm-app${envPart}.gadget.app`;
    }

    const exchanges = {...options?.exchanges};
    if (this.environment !== productionEnv) {
      const devHarnessExchange: Exchange = ({ forward }) => {
        return operations$ => {
          const operationResult$ = forward(operations$)

          return pipe(
            operationResult$,
            map(result => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error: any) {
                // gracefully handle environments where CustomEvent is misbehaved like jsdom
                console.warn("[gadget] error dispatching gadget dev harness event", error)
              }

              return result;
            })
          );
        };
      };

      exchanges.beforeAll = [
        devHarnessExchange,
        ...(exchanges.beforeAll ?? []),
      ];
    }

    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == 'undefined' ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment,
    });

    if (typeof window != 'undefined' && this.connection.authenticationMode == AuthenticationMode.APIKey && !(options as any)?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.")
    }

    // automatically use shopify authentication if no authentication method has been passed and the shopify app bridge is available
    if (typeof options?.authenticationMode === "undefined" && typeof window !== "undefined" && (window as any).shopify?.idToken) {
      this.connection.setAuthenticationMode({
        custom: {
          async processFetch(_input, init) {
            const headers = new Headers(init.headers);
            const idToken = await (window as any).shopify.idToken();
            headers.append("Authorization", "ShopifySessionToken "+ idToken);
            init.headers ??= {};
            headers.forEach(function (value, key) {
              (init.headers as Record<string, string>)[key] = value;
            });
          },
          async processTransactionConnectionParams(params) {
            const idToken = await (window as any).shopify.idToken();
            params.auth.shopifySessionToken = idToken;
          },
        },
      });
    }





    this.shopifyCustomer = new ShopifyCustomerManager(this.connection);
    this.shopifyGdprRequest = new ShopifyGdprRequestManager(this.connection);
    this.shopifyOrder = new ShopifyOrderManager(this.connection);
    this.shopifyShop = new ShopifyShopManager(this.connection);
    this.shopifySync = new ShopifySyncManager(this.connection);
    this.googleSheetConfig = new GoogleSheetConfigManager(this.connection);
    this.session = new SessionManager(this.connection);
    this.currentSession = new CurrentSessionManager(this.connection);
    this.shopifyFulfillment = new ShopifyFulfillmentManager(this.connection);
    this.shopifyFulfillmentOrder = new ShopifyFulfillmentOrderManager(this.connection);
    this.shopifyFulfillmentService = new ShopifyFulfillmentServiceManager(this.connection);
    this.shopifyProduct = new ShopifyProductManager(this.connection);
    this.shopifyProductVariant = new ShopifyProductVariantManager(this.connection);
    this.senditConfig = new SenditConfigManager(this.connection);
    this.speedafConfig = new SpeedafConfigManager(this.connection);

    this.internal = {
                      shopifyCustomer: new InternalModelManager("shopifyCustomer", this.connection, {"pluralApiIdentifier":"shopifyCustomers","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, {"pluralApiIdentifier":"shopifyGdprRequests","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyOrder: new InternalModelManager("shopifyOrder", this.connection, {"pluralApiIdentifier":"shopifyOrders","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyShop: new InternalModelManager("shopifyShop", this.connection, {"pluralApiIdentifier":"shopifyShops","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifySync: new InternalModelManager("shopifySync", this.connection, {"pluralApiIdentifier":"shopifySyncs","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      googleSheetConfig: new InternalModelManager("googleSheetConfig", this.connection, {"pluralApiIdentifier":"googleSheetConfigs","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      session: new InternalModelManager("session", this.connection, {"pluralApiIdentifier":"sessions","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyFulfillment: new InternalModelManager("shopifyFulfillment", this.connection, {"pluralApiIdentifier":"shopifyFulfillments","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyFulfillmentOrder: new InternalModelManager("shopifyFulfillmentOrder", this.connection, {"pluralApiIdentifier":"shopifyFulfillmentOrders","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyFulfillmentService: new InternalModelManager("shopifyFulfillmentService", this.connection, {"pluralApiIdentifier":"shopifyFulfillmentServices","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, {"pluralApiIdentifier":"shopifyProducts","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyProductVariant: new InternalModelManager("shopifyProductVariant", this.connection, {"pluralApiIdentifier":"shopifyProductVariants","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      senditConfig: new InternalModelManager("senditConfig", this.connection, {"pluralApiIdentifier":"senditConfigs","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      speedafConfig: new InternalModelManager("speedafConfig", this.connection, {"pluralApiIdentifier":"speedafConfigs","hasAmbiguousIdentifiers":false,"namespace":[]}),
                    };
  }

  /**
   * Returns a new Client instance that will call the Gadget API as the application's admin user.
   * This can only be used for API clients using internal authentication.
   * @returns {Client} A new Client instance with admin authentication
   */
  get actAsAdmin(): Client {
    assert(this.options?.authenticationMode?.internal, "actAsAdmin can only be used for API clients using internal authentication")

    return new Client({
    ...this.options,
    authenticationMode: {
      internal: {
        ...this.options!.authenticationMode!.internal!,
        actAsSession: false,
      }
    }
    });
  }

  /**
   * Returns a new Client instance that will call the Gadget API as with the permission of the current session.
   * This can only be used for API clients using internal authentication.
   * @returns {Client} A new Client instance with session authentication
   */
  get actAsSession(): Client {
    assert(this.options?.authenticationMode?.internal, "actAsSession can only be used for API clients using internal authentication")

    return new Client({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options!.authenticationMode!.internal!,
          actAsSession: true,
        }
      }
    })
  }

  /** Run an arbitrary GraphQL query. */
  async query<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T> {
    const {data, error} = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error) throw error
    return data as T;
  }

  /** Run an arbitrary GraphQL mutation. */
  async mutate<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T> {
    const {data, error} = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error) throw error
    return data as T;
  }

  /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
  transaction = async <T>(callback: (transaction: GadgetTransaction) => Promise<T>): Promise<T> => {
    return await this.connection.transaction(callback)
  }

  /**
   * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
   *
   * @example
   * await api.fetch("https://myapp--development.gadget.app/foo/bar");
   *
   * @example
   * // fetch a relative URL from the endpoint this API client is configured to fetch from
   * await api.fetch("/foo/bar");
   **/
  async fetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
    return await this.connection.fetch(input, init);
  }

  /**
  * Get a new direct upload token for file uploads to directly to cloud storage.
  * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
  * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
  */
  getDirectUploadToken = async (): Promise<{url: string, token: string}> => {
    const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", {nonce: Math.random().toString(36).slice(2, 7)}, {
      requestPolicy: "network-only",
    });
    return (result as any).gadgetMeta.directUploadToken;
  }

  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & AllOptionalVariables<Action['variablesType']>>(action: Action, input?: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The id for the record to run the action on. This is only one overload of this function, see the other forms for other input types.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, "123");
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & {variablesType: {id: string}}>(action: Action, id: string, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status. This is the variant of enqueue for actions which accept no inputs.
   *
   * @param action The action to enqueue.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, Record<string, never>, any, any, any, any> | GlobalActionFunction<Record<string, never>>>(action: Action, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue a set of actions in bulk for execution. The backend will run each action as soon as possible, and return an array of handles to each action right away that can be used to check their statuses.
   *
   * @param bulkAction The bulk action to enqueue
   * @param input The input variables for the action, in array or object form.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "foo" }, {name: "bar"}], { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkDelete, [2, 42]);
   *
   * @example
   * const handle = await api.enqueue(api.widget.addInventory, [{id: 1, amount: 10}, {id: 2, amount: 15}]);
   *
  **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, any, any, any, any, true>>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>[]>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, inputOrOptions?: Action["variablesType"] | EnqueueBackgroundActionOptions<Action>, maybeOptions?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action> | BackgroundActionHandle<SchemaT, Action>[]> {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
  
    let input: Action["variablesType"] | undefined;
    let options: EnqueueBackgroundActionOptions<Action> | undefined;
  
    // process different overloads to pull out the input and or options
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
        // id input shorthand passes just the id as a string, wrap it into a variables object
        input = { id: inputOrOptions };
      } else {
        input = inputOrOptions;
      }
      options = {};
    }
  
    return await enqueueActionRunner(this.connection, action, input, options);
  }
  
  /**
   * Returns a handle for a given background action id
   *
   * @param action The action that was enqueued
   * @param id The id of the background action
   *
   * @example
   * const handle = api.handle(api.widget.update, "app-job-12346");
   *
   * @example
   * const handle = api.handle(api.someGlobalAction, "app-job-56789");
   **/
  handle<SchemaT, Action extends AnyActionFunction>(action: Action, id: string): BackgroundActionHandle<SchemaT, Action> {
    return new BackgroundActionHandle(this.connection, action, id);
  }

  toString(): string {
    return `GadgetAPIClient<${this.environment}>`;
  }

  toJSON(): string {
    return this.toString()
  }
}

(Client.prototype as any)[Symbol.for("gadget/modelRelationships")] = {"shopifyCustomer":{"orders":{"type":"HasMany","model":"shopifyOrder"},"lastOrder":{"type":"BelongsTo","model":"shopifyOrder"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyGdprRequest":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyOrder":{"customer":{"type":"BelongsTo","model":"shopifyCustomer"},"fulfillments":{"type":"HasMany","model":"shopifyFulfillment"},"shopifyShop":{"type":"BelongsTo","model":"shopifyShop"},"fulfillmentOrders":{"type":"HasMany","model":"shopifyFulfillmentOrder"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyShop":{"syncs":{"type":"HasMany","model":"shopifySync"},"gdprRequests":{"type":"HasMany","model":"shopifyGdprRequest"},"fulfillmentOrders":{"type":"HasMany","model":"shopifyFulfillmentOrder"},"fulfillmentServices":{"type":"HasMany","model":"shopifyFulfillmentService"},"fulfillments":{"type":"HasMany","model":"shopifyFulfillment"},"customers":{"type":"HasMany","model":"shopifyCustomer"},"orders":{"type":"HasMany","model":"shopifyOrder"},"productVariants":{"type":"HasMany","model":"shopifyProductVariant"},"products":{"type":"HasMany","model":"shopifyProduct"}},"shopifySync":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"googleSheetConfig":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"session":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyFulfillment":{"order":{"type":"BelongsTo","model":"shopifyOrder"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyFulfillmentOrder":{"order":{"type":"BelongsTo","model":"shopifyOrder"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyFulfillmentService":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProduct":{"variants":{"type":"HasMany","model":"shopifyProductVariant"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProductVariant":{"product":{"type":"BelongsTo","model":"shopifyProduct"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"senditConfig":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"speedafConfig":{"shop":{"type":"BelongsTo","model":"shopifyShop"}}};