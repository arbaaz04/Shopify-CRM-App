/**
* This is the Gadget API client library for:
*
*   _                     _
*  | |__   __ _ _ __ ___ | |__   ___        ___ _ __ _ __ ___         __ _ _ __  _ __
*  | '_ \ / _` | '_ ` _ \| '_ \ / _ \_____ / __| '__| '_ ` _ \ _____ / _` | '_ \| '_ \
*  | |_) | (_| | | | | | | |_) |  __/_____| (__| |  | | | | | |_____| (_| | |_) | |_) |
*  |_.__/ \__,_|_| |_| |_|_.__/ \___|      \___|_|  |_| |_| |_|      \__,_| .__/| .__/
*                                                                         |_|   |_|
*
* Built for environment "Development" at version 2182
* API docs: https://docs.gadget.dev/api/bambe-crm-app
* Edit this app here: https://bambe-crm-app.gadget.app/edit
*/
export { BrowserSessionStorageType, GadgetClientError, GadgetConnection, GadgetInternalError, GadgetOperationError, GadgetRecord, GadgetRecordList, GadgetValidationError, InvalidRecordError, ChangeTracking } from "@gadgetinc/api-client-core";
export type { AuthenticationModeOptions, BrowserSessionAuthenticationModeOptions, ClientOptions, InvalidFieldError, Select } from "@gadgetinc/api-client-core";
export * from "./Client.js";
export * from "./types.js";
declare global {
    interface Window {
        gadgetConfig: {
            apiKeys: {
                shopify: string;
            };
            environment: string;
            env: Record<string, any>;
            authentication?: {
                signInPath: string;
                redirectOnSuccessfulSignInPath: string;
            };
            shopifyInstallState?: {
                redirectToOauth: boolean;
                isAuthenticated: boolean;
                missingScopes: string[];
                shopExists: boolean;
            };
            shopifyAppBridgeCDNScriptSrc?: string;
        };
    }
}
