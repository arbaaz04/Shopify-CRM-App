/// <reference path="./ActionContextTypes.d.ts" />
/**
* This is the Gadget server side types library for:
*
*   _                     _                                                            
*  | |__   __ _ _ __ ___ | |__   ___        ___ _ __ _ __ ___         __ _ _ __  _ __  
*  | '_ \ / _` | '_ ` _ \| '_ \ / _ \_____ / __| '__| '_ ` _ \ _____ / _` | '_ \| '_ \ 
*  | |_) | (_| | | | | | | |_) |  __/_____| (__| |  | | | | | |_____| (_| | |_) | |_) |
*  |_.__/ \__,_|_| |_| |_|_.__/ \___|      \___|_|  |_| |_| |_|      \__,_| .__/| .__/ 
*                                                                         |_|   |_|    
*
* Built for environment `Development` at version 1870
* Framework version: ^1.3.0
* Edit this app here: https://bambe-crm-app.gadget.dev/edit
*/
import type { Client } from "@gadget-client/bambe-crm-app";
import { Logger } from "./AmbientContext";
export { InvalidRecordError } from "@gadgetinc/api-client-core";
export * from "./metadataFileTypes";
export * from "./AmbientContext";
export * from "./AppConfigs";
export * from "./AppConfiguration";
export * from "./AppConnections";
import { AppConnections } from "./AppConnections";
export * from "./auth";
export * as DefaultEmailTemplates from "./email-templates/index";
export * from "./emails";
export { InvalidStateTransitionError } from "./errors";
export * from "./global-actions";
export * from "./routes";
export * from "./state-chart/index";
export * from "./types";
export * from "./ActionOptions";
export * from "./effects";
export * from "./utils";
export * from "./WebhookPayloadTypes";
export { preventCrossShopDataAccess, ShopifyBulkOperationState, ShopifySellingPlanGroupProductState, ShopifySellingPlanGroupProductVariantState, ShopifyShopState, ShopifySyncState, abortSync, finishBulkOperation, globalShopifySync, shopifySync } from "./shopify/index";
/**
* @internal
*/
import { Globals, actionContextLocalStorage } from "./globals";
export * from "./models/ShopifyCustomer";
export * from "./models/ShopifyGdprRequest";
export * from "./models/ShopifyOrder";
export * from "./models/ShopifyShop";
export * from "./models/ShopifySync";
export * from "./models/GoogleSheetConfig";
export * from "./models/Session";
export * from "./models/ShopifyFulfillment";
export * from "./models/ShopifyFulfillmentOrder";
export * from "./models/ShopifyFulfillmentService";
export * from "./models/ShopifyProduct";
export * from "./models/ShopifyProductVariant";
export * from "./models/SenditConfig";
export * from "./models/SpeedafConfig";
/**
* A map of connection name to instantiated connection objects for the app.
*/
declare let connections: AppConnections;
/**
* An instance of the Gadget logger
*/
declare let logger: Logger;
/**
* An instance of the Gadget API client that has admin permissions
*/
declare let api: Client;
/**
* This is used internally to set the connections.
* @internal
*/
export declare const setConnections: (appConnections: AppConnections) => void;
/**
* This is used internally to set the rootLogger.
* @internal
*/
export declare const setLogger: (rootLogger: Logger) => void;
/**
* This is used internally to set the client Instance
* @internal
*/
export declare const setApiClient: (client: Client) => void;
export { api, logger, connections };
/**
* @internal
*/
export { Globals, actionContextLocalStorage };
