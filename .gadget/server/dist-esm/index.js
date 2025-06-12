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
*/ /// <reference path="./ActionContextTypes.d.ts" />
export { InvalidRecordError } from '@gadgetinc/api-client-core';
export * from "./metadataFileTypes.js";
export * from "./AmbientContext.js";
export * from "./AppConfigs.js";
export * from "./AppConfiguration.js";
export * from "./AppConnections.js";
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
 */ import { Globals, actionContextLocalStorage } from "./globals.js";
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
/**
* A map of connection name to instantiated connection objects for the app.
*/ let connections;
/**
 * An instance of the Gadget logger
 */ let logger;
/**
 * An instance of the Gadget API client that has admin permissions
 */ let api;
/**
* This is used internally to set the connections.
* @internal
*/ export const setConnections = (appConnections)=>{
    connections = new Proxy(appConnections, {
        get: (target, prop)=>{
            const actionContext = actionContextLocalStorage.getStore();
            if (actionContext && actionContext.connections) {
                return actionContext.connections[prop];
            }
            const routeContext = Globals.requestContext.get("requestContext");
            if (routeContext && routeContext.connections) {
                return routeContext.connections[prop];
            }
            return target[prop];
        }
    });
};
/**
 * This is used internally to set the rootLogger.
 * @internal
 */ export const setLogger = (rootLogger)=>{
    // set the internal facing global logger to be this instance, which is tagged with the platform source
    Globals.logger = rootLogger;
    // set the user-facing global logger to be this instance tagged with the user source, as users are importing this global and using it
    logger = rootLogger.child({
        source: "user"
    });
};
/**
 * This is used internally to set the client Instance
 * @internal
 */ export const setApiClient = (client)=>{
    api = client;
};
export { api, logger, connections };
/**
 * @internal
 */ export { Globals, actionContextLocalStorage };
