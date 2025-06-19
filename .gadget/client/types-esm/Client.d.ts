import type { OperationContext } from "@urql/core";
import { GadgetConnection, GadgetTransaction, InternalModelManager, ActionFunctionMetadata, GlobalActionFunction, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import type { ClientOptions as ApiClientOptions, AnyClient, EnqueueBackgroundActionOptions, AnyActionFunction } from '@gadgetinc/api-client-core';
import type { DocumentNode } from 'graphql';
import { CalculateRefundLineItemsElementTypeInput, Scalars, ProcessBulkReturnsOrderSelectionsElementTypeInput, ProcessOrderReturnLineItemsElementTypeInput, SyncOrdersOrdersElementTypeInput } from "./types.js";
import { ShopifyCustomerManager } from "./models/ShopifyCustomer.js";
import { ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { ShopifyOrderManager } from "./models/ShopifyOrder.js";
import { ShopifyShopManager } from "./models/ShopifyShop.js";
import { ShopifySyncManager } from "./models/ShopifySync.js";
import { GoogleSheetConfigManager } from "./models/GoogleSheetConfig.js";
import { SessionManager } from "./models/Session.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { ShopifyFulfillmentManager } from "./models/ShopifyFulfillment.js";
import { ShopifyFulfillmentOrderManager } from "./models/ShopifyFulfillmentOrder.js";
import { ShopifyFulfillmentServiceManager } from "./models/ShopifyFulfillmentService.js";
import { ShopifyProductManager } from "./models/ShopifyProduct.js";
import { ShopifyProductVariantManager } from "./models/ShopifyProductVariant.js";
import { SenditConfigManager } from "./models/SenditConfig.js";
import { SpeedafConfigManager } from "./models/SpeedafConfig.js";
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
type ClientOptions = Omit<ApiClientOptions, "environment"> & {
    environment?: string;
};
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
/**
 * Root object used for interacting with the bambe-crm-app API. `BambeCrmAppClient` has `query` and `mutation` functions for executing raw GraphQL queries and mutations, as well as `ModelManager` objects for manipulating models with a JavaScript API. `BambeCrmAppClient` also has a `fetch` function for making raw requests to your backend.
 * */
export declare class BambeCrmAppClient implements AnyClient {
    readonly options?: ClientOptions | undefined;
    connection: GadgetConnection;
    /** Executes the calculateRefund global action. */
    calculateRefund: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            lineItems?: (CalculateRefundLineItemsElementTypeInput)[];
            refundShipping?: (Scalars["Boolean"] | null) | null;
            reason?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "calculateRefund";
        operationReturnType: "CalculateRefund";
        namespace: null;
        typesImports: ["CalculateRefundLineItemsElementTypeInput", "Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
            lineItems: {
                required: false;
                type: "[CalculateRefundLineItemsElementTypeInput!]";
            };
            refundShipping: {
                required: false;
                type: "Boolean";
            };
            reason: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            lineItems?: (CalculateRefundLineItemsElementTypeInput)[];
            refundShipping?: (Scalars["Boolean"] | null) | null;
            reason?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the createSenditOrder global action. */
    createSenditOrder: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "createSenditOrder";
        operationReturnType: "CreateSenditOrder";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the directOrderTest global action. */
    directOrderTest: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "directOrderTest";
        operationReturnType: "DirectOrderTest";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the extractOrderSKUs global action. */
    extractOrderSKUs: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "extractOrderSKUs";
        operationReturnType: "ExtractOrderSKUs";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the fulfillOrder global action. */
    fulfillOrder: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            manualTrackingNumber?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "fulfillOrder";
        operationReturnType: "FulfillOrder";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
            manualTrackingNumber: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            manualTrackingNumber?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the getSenditDistrictId global action. */
    getSenditDistrictId: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "getSenditDistrictId";
        operationReturnType: "GetSenditDistrictId";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the processBulkReturns global action. */
    processBulkReturns: {
        (variables?: {
            orderSelections?: (ProcessBulkReturnsOrderSelectionsElementTypeInput)[];
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "processBulkReturns";
        operationReturnType: "ProcessBulkReturns";
        namespace: null;
        typesImports: ["ProcessBulkReturnsOrderSelectionsElementTypeInput", "Scalars"];
        variables: {
            orderSelections: {
                required: false;
                type: "[ProcessBulkReturnsOrderSelectionsElementTypeInput!]";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderSelections?: (ProcessBulkReturnsOrderSelectionsElementTypeInput)[];
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the processOrderReturn global action. */
    processOrderReturn: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            lineItems?: (ProcessOrderReturnLineItemsElementTypeInput)[];
            refundShipping?: (Scalars["Boolean"] | null) | null;
            reason?: (Scalars["String"] | null) | null;
            notify?: (Scalars["Boolean"] | null) | null;
            skipRefund?: (Scalars["Boolean"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "processOrderReturn";
        operationReturnType: "ProcessOrderReturn";
        namespace: null;
        typesImports: ["ProcessOrderReturnLineItemsElementTypeInput", "Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
            lineItems: {
                required: false;
                type: "[ProcessOrderReturnLineItemsElementTypeInput!]";
            };
            refundShipping: {
                required: false;
                type: "Boolean";
            };
            reason: {
                required: false;
                type: "String";
            };
            notify: {
                required: false;
                type: "Boolean";
            };
            skipRefund: {
                required: false;
                type: "Boolean";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            lineItems?: (ProcessOrderReturnLineItemsElementTypeInput)[];
            refundShipping?: (Scalars["Boolean"] | null) | null;
            reason?: (Scalars["String"] | null) | null;
            notify?: (Scalars["Boolean"] | null) | null;
            skipRefund?: (Scalars["Boolean"] | null) | null;
        } | null | undefined;
    };
    /** Executes the processSpeedafAPI global action. */
    processSpeedafAPI: {
        (variables?: {
            shopId?: (Scalars["String"] | null) | null;
            requestData?: (Scalars["JSONObject"] | null) | null;
            testMode?: (Scalars["Boolean"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "processSpeedafAPI";
        operationReturnType: "ProcessSpeedafAPI";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            shopId: {
                required: false;
                type: "String";
            };
            requestData: {
                required: false;
                type: "JSONObject";
            };
            testMode: {
                required: false;
                type: "Boolean";
            };
        };
        variablesType: {
            shopId?: (Scalars["String"] | null) | null;
            requestData?: (Scalars["JSONObject"] | null) | null;
            testMode?: (Scalars["Boolean"] | null) | null;
        } | null | undefined;
    };
    /** Executes the removeOrderFromSheets global action. */
    removeOrderFromSheets: {
        (variables?: {
            orderName?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "removeOrderFromSheets";
        operationReturnType: "RemoveOrderFromSheets";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderName: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderName?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the searchBulkOrdersForReturn global action. */
    searchBulkOrdersForReturn: {
        (variables?: {
            orderNumbers?: ((Scalars["String"] | null))[];
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "searchBulkOrdersForReturn";
        operationReturnType: "SearchBulkOrdersForReturn";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderNumbers: {
                required: false;
                type: "[String!]";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderNumbers?: ((Scalars["String"] | null))[];
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the searchOrderForReturn global action. */
    searchOrderForReturn: {
        (variables?: {
            orderName?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "searchOrderForReturn";
        operationReturnType: "SearchOrderForReturn";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderName: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderName?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the senditFulfillOrder global action. */
    senditFulfillOrder: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "senditFulfillOrder";
        operationReturnType: "SenditFulfillOrder";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the standardizeMoroccanAddress global action. */
    standardizeMoroccanAddress: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "standardizeMoroccanAddress";
        operationReturnType: "StandardizeMoroccanAddress";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the standardizeMoroccanCity global action. */
    standardizeMoroccanCity: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "standardizeMoroccanCity";
        operationReturnType: "StandardizeMoroccanCity";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the syncOrders global action. */
    syncOrders: {
        (variables?: {
            limit?: (Scalars["Float"] | null) | null;
            orders?: (SyncOrdersOrdersElementTypeInput)[];
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "syncOrders";
        operationReturnType: "SyncOrders";
        namespace: null;
        typesImports: ["SyncOrdersOrdersElementTypeInput", "Scalars"];
        variables: {
            limit: {
                required: false;
                type: "Float";
            };
            orders: {
                required: false;
                type: "[SyncOrdersOrdersElementTypeInput!]";
            };
        };
        variablesType: {
            limit?: (Scalars["Float"] | null) | null;
            orders?: (SyncOrdersOrdersElementTypeInput)[];
        } | null | undefined;
    };
    /** Executes the testGoogleAuth global action. */
    testGoogleAuth: {
        (variables?: {
            shopId?: (Scalars["String"] | null) | null;
            spreadsheetId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "testGoogleAuth";
        operationReturnType: "TestGoogleAuth";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            shopId: {
                required: false;
                type: "String";
            };
            spreadsheetId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            shopId?: (Scalars["String"] | null) | null;
            spreadsheetId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the testLocationQuery global action. */
    testLocationQuery: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "testLocationQuery";
        operationReturnType: "TestLocationQuery";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the testSenditConnection global action. */
    testSenditConnection: {
        (variables?: {
            publicKey?: (Scalars["String"] | null) | null;
            secretKey?: (Scalars["String"] | null) | null;
            saveToPersistent?: (Scalars["Boolean"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "testSenditConnection";
        operationReturnType: "TestSenditConnection";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            publicKey: {
                required: false;
                type: "String";
            };
            secretKey: {
                required: false;
                type: "String";
            };
            saveToPersistent: {
                required: false;
                type: "Boolean";
            };
        };
        variablesType: {
            publicKey?: (Scalars["String"] | null) | null;
            secretKey?: (Scalars["String"] | null) | null;
            saveToPersistent?: (Scalars["Boolean"] | null) | null;
        } | null | undefined;
    };
    /** Executes the testWriteToSheet global action. */
    testWriteToSheet: {
        (variables?: {
            spreadsheetId?: (Scalars["String"] | null) | null;
            sheetName?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "testWriteToSheet";
        operationReturnType: "TestWriteToSheet";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            spreadsheetId: {
                required: false;
                type: "String";
            };
            sheetName: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            spreadsheetId?: (Scalars["String"] | null) | null;
            sheetName?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the updateReferenceTracking global action. */
    updateReferenceTracking: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            referenceTrackingCode?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "updateReferenceTracking";
        operationReturnType: "UpdateReferenceTracking";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
            referenceTrackingCode: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
            referenceTrackingCode?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the writeBatchOrdersToSheets global action. */
    writeBatchOrdersToSheets: {
        (variables?: {
            ordersData?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "writeBatchOrdersToSheets";
        operationReturnType: "WriteBatchOrdersToSheets";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            ordersData: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            ordersData?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the writeToShopify global action. */
    writeToShopify: {
        (variables?: {
            shopId?: (Scalars["String"] | null) | null;
            mutation?: (Scalars["String"] | null) | null;
            variables?: (Scalars["JSONObject"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "writeToShopify";
        operationReturnType: "WriteToShopify";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            shopId: {
                required: false;
                type: "String";
            };
            mutation: {
                required: false;
                type: "String";
            };
            variables: {
                required: false;
                type: "JSONObject";
            };
        };
        variablesType: {
            shopId?: (Scalars["String"] | null) | null;
            mutation?: (Scalars["String"] | null) | null;
            variables?: (Scalars["JSONObject"] | null) | null;
        } | null | undefined;
    };
    shopifyCustomer: ShopifyCustomerManager;
    shopifyGdprRequest: ShopifyGdprRequestManager;
    shopifyOrder: ShopifyOrderManager;
    shopifyShop: ShopifyShopManager;
    shopifySync: ShopifySyncManager;
    googleSheetConfig: GoogleSheetConfigManager;
    session: SessionManager;
    currentSession: CurrentSessionManager;
    shopifyFulfillment: ShopifyFulfillmentManager;
    shopifyFulfillmentOrder: ShopifyFulfillmentOrderManager;
    shopifyFulfillmentService: ShopifyFulfillmentServiceManager;
    shopifyProduct: ShopifyProductManager;
    shopifyProductVariant: ShopifyProductVariantManager;
    senditConfig: SenditConfigManager;
    speedafConfig: SpeedafConfigManager;
    /**
    * Namespaced object for accessing models via the Gadget internal APIs, which provide lower level and higher privileged operations directly against the database. Useful for maintenance operations like migrations or correcting broken data, and for implementing the high level actions.
    *
    * Returns an object of model API identifiers to `InternalModelManager` objects.
    *
    * Example:
    * `api.internal.user.findOne(...)`
    */
    internal: InternalModelManagers;
    /**
     * The list of environments with a customized API root endpoint
     */
    apiRoots: Record<string, string>;
    applicationId: string;
    environment: string;
    constructor(options?: ClientOptions | undefined);
    /**
     * Returns a new Client instance that will call the Gadget API as the application's admin user.
     * This can only be used for API clients using internal authentication.
     * @returns {BambeCrmAppClient} A new BambeCrmAppClient instance with admin authentication
     */
    get actAsAdmin(): BambeCrmAppClient;
    /**
     * Returns a new BambeCrmAppClient instance that will call the Gadget API as with the permission of the current session.
     * This can only be used for API clients using internal authentication.
     * @returns {BambeCrmAppClient} A new BambeCrmAppClient instance with session authentication
     */
    get actAsSession(): BambeCrmAppClient;
    /** Run an arbitrary GraphQL query. */
    query<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T>;
    /** Run an arbitrary GraphQL mutation. */
    mutate<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T>;
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    transaction: <T>(callback: (transaction: GadgetTransaction) => Promise<T>) => Promise<T>;
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
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    getDirectUploadToken: () => Promise<{
        url: string;
        token: string;
    }>;
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
    enqueue<SchemaT, Action extends AnyActionFunction & AllOptionalVariables<Action['variablesType']>>(action: Action, input?: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends AnyActionFunction & {
        variablesType: {
            id: string;
        };
    }>(action: Action, id: string, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends ActionFunctionMetadata<any, Record<string, never>, any, any, any, any> | GlobalActionFunction<Record<string, never>>>(action: Action, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends ActionFunctionMetadata<any, any, any, any, any, true>>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>[]>;
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
    enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    handle<SchemaT, Action extends AnyActionFunction>(action: Action, id: string): BackgroundActionHandle<SchemaT, Action>;
    toString(): string;
    toJSON(): string;
}
/** Legacy export under the `Client` name for backwards compatibility. */
export declare const Client: typeof BambeCrmAppClient;
export type Client = InstanceType<typeof BambeCrmAppClient>;
