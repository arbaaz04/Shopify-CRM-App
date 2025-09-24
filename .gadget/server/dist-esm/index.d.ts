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
* Built for environment `Development` at version 2613
* Framework version: ^1.3.0
* Edit this app here: https://bambe-crm-app.gadget.dev/edit
*/
import type { BambeCrmAppClient } from "@gadget-client/bambe-crm-app";
import { Logger } from "./AmbientContext.js";
export { InvalidRecordError } from "@gadgetinc/api-client-core";
export * from "./metadataFileTypes.js";
export * from "./AmbientContext.js";
export * from "./AppConfigs.js";
export * from "./AppConfiguration.js";
export * from "./AppConnections.js";
import { AppConnections } from "./AppConnections.js";
export * from "./auth.js";
export * as DefaultEmailTemplates from "./email-templates/index.js";
export * from "./emails.js";
export { InvalidStateTransitionError } from "./errors.js";
export * from "./global-actions.js";
export * from "./routes.js";
export * from "./state-chart/index.js";
export * from "./types.js";
export * from "./ActionOptions.js";
export * from "./effects.js";
export * from "./utils.js";
export * from "./WebhookPayloadTypes.js";
export { preventCrossShopDataAccess, ShopifyBulkOperationState, ShopifySellingPlanGroupProductState, ShopifySellingPlanGroupProductVariantState, ShopifyShopState, ShopifySyncState, abortSync, finishBulkOperation, globalShopifySync, shopifySync } from "./shopify/index.js";
/**
* @internal
*/
import { Globals, actionContextLocalStorage } from "./globals.js";
export * from "./models/ShopifyCustomer.js";
export * from "./models/ShopifyGdprRequest.js";
export * from "./models/ShopifyOrder.js";
export * from "./models/ShopifyShop.js";
export * from "./models/ShopifySync.js";
export * from "./models/GoogleSheetConfig.js";
export * from "./models/Session.js";
export * from "./models/ShopifyFulfillment.js";
export * from "./models/ShopifyFulfillmentOrder.js";
export * from "./models/ShopifyFulfillmentService.js";
export * from "./models/ShopifyProduct.js";
export * from "./models/ShopifyProductVariant.js";
export * from "./models/SenditConfig.js";
export * from "./models/SpeedafConfig.js";
export * from "./models/CustomCity.js";
export * from "./models/DeliveryCharges.js";
export * from "./models/BlacklistedPhone.js";
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
declare let api: BambeCrmAppClient;
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
export declare const setApiClient: (client: BambeCrmAppClient) => void;
export { api, logger, connections };
/**
* @internal
*/
export { Globals, actionContextLocalStorage };
