import { pipe, map } from "wonka";
import { assert, GadgetConnection, AuthenticationMode, InternalModelManager, enqueueActionRunner, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import { buildGlobalAction } from "./builder.js";
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
import { DefaultShopifyCustomerSelection as DefaultShopifyCustomerSelection2 } from "./models/ShopifyCustomer.js";
import { DefaultShopifyGdprRequestSelection as DefaultShopifyGdprRequestSelection2 } from "./models/ShopifyGdprRequest.js";
import { DefaultShopifyOrderSelection as DefaultShopifyOrderSelection2 } from "./models/ShopifyOrder.js";
import { DefaultShopifyShopSelection as DefaultShopifyShopSelection2 } from "./models/ShopifyShop.js";
import { DefaultShopifySyncSelection as DefaultShopifySyncSelection2 } from "./models/ShopifySync.js";
import { DefaultGoogleSheetConfigSelection as DefaultGoogleSheetConfigSelection2 } from "./models/GoogleSheetConfig.js";
import { DefaultSessionSelection as DefaultSessionSelection2 } from "./models/Session.js";
import { DefaultShopifyFulfillmentSelection as DefaultShopifyFulfillmentSelection2 } from "./models/ShopifyFulfillment.js";
import { DefaultShopifyFulfillmentOrderSelection as DefaultShopifyFulfillmentOrderSelection2 } from "./models/ShopifyFulfillmentOrder.js";
import { DefaultShopifyFulfillmentServiceSelection as DefaultShopifyFulfillmentServiceSelection2 } from "./models/ShopifyFulfillmentService.js";
import { DefaultShopifyProductSelection as DefaultShopifyProductSelection2 } from "./models/ShopifyProduct.js";
import { DefaultShopifyProductVariantSelection as DefaultShopifyProductVariantSelection2 } from "./models/ShopifyProductVariant.js";
import { DefaultSenditConfigSelection as DefaultSenditConfigSelection2 } from "./models/SenditConfig.js";
import { DefaultSpeedafConfigSelection as DefaultSpeedafConfigSelection2 } from "./models/SpeedafConfig.js";
const productionEnv = "production";
const fallbackEnv = "development";
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return void 0;
  }
};
class Client {
  constructor(options) {
    this.options = options;
    /** Executes the createSenditOrder global action. */
    this.createSenditOrder = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "createSenditOrder",
      operationName: "createSenditOrder",
      operationReturnType: "CreateSenditOrder",
      namespace: null,
      variables: {}
    });
    /** Executes the directOrderTest global action. */
    this.directOrderTest = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "directOrderTest",
      operationName: "directOrderTest",
      operationReturnType: "DirectOrderTest",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the extractOrderSKUs global action. */
    this.extractOrderSKUs = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "extractOrderSKUs",
      operationName: "extractOrderSKUs",
      operationReturnType: "ExtractOrderSKUs",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the fulfillOrder global action. */
    this.fulfillOrder = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "fulfillOrder",
      operationName: "fulfillOrder",
      operationReturnType: "FulfillOrder",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        manualTrackingNumber: { required: false, type: "String" }
      }
    });
    /** Executes the getSenditDistrictId global action. */
    this.getSenditDistrictId = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "getSenditDistrictId",
      operationName: "getSenditDistrictId",
      operationReturnType: "GetSenditDistrictId",
      namespace: null,
      variables: {}
    });
    /** Executes the processSpeedafAPI global action. */
    this.processSpeedafAPI = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "processSpeedafAPI",
      operationName: "processSpeedafAPI",
      operationReturnType: "ProcessSpeedafAPI",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        requestData: { required: false, type: "JSONObject" },
        testMode: { required: false, type: "Boolean" }
      }
    });
    /** Executes the senditFulfillOrder global action. */
    this.senditFulfillOrder = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "senditFulfillOrder",
      operationName: "senditFulfillOrder",
      operationReturnType: "SenditFulfillOrder",
      namespace: null,
      variables: {}
    });
    /** Executes the standardizeMoroccanAddress global action. */
    this.standardizeMoroccanAddress = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "standardizeMoroccanAddress",
      operationName: "standardizeMoroccanAddress",
      operationReturnType: "StandardizeMoroccanAddress",
      namespace: null,
      variables: {}
    });
    /** Executes the standardizeMoroccanCity global action. */
    this.standardizeMoroccanCity = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "standardizeMoroccanCity",
      operationName: "standardizeMoroccanCity",
      operationReturnType: "StandardizeMoroccanCity",
      namespace: null,
      variables: {}
    });
    /** Executes the syncOrders global action. */
    this.syncOrders = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "syncOrders",
      operationName: "syncOrders",
      operationReturnType: "SyncOrders",
      namespace: null,
      variables: {
        limit: { required: false, type: "Float" },
        orders: { required: false, type: "[SyncOrdersOrdersElementTypeInput!]" }
      }
    });
    /** Executes the testGoogleAuth global action. */
    this.testGoogleAuth = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "testGoogleAuth",
      operationName: "testGoogleAuth",
      operationReturnType: "TestGoogleAuth",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        spreadsheetId: { required: false, type: "String" }
      }
    });
    /** Executes the testSenditConnection global action. */
    this.testSenditConnection = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "testSenditConnection",
      operationName: "testSenditConnection",
      operationReturnType: "TestSenditConnection",
      namespace: null,
      variables: {
        publicKey: { required: false, type: "String" },
        secretKey: { required: false, type: "String" },
        saveToPersistent: { required: false, type: "Boolean" }
      }
    });
    /** Executes the testWriteToSheet global action. */
    this.testWriteToSheet = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "testWriteToSheet",
      operationName: "testWriteToSheet",
      operationReturnType: "TestWriteToSheet",
      namespace: null,
      variables: {
        spreadsheetId: { required: false, type: "String" },
        sheetName: { required: false, type: "String" }
      }
    });
    /** Executes the updateReferenceTracking global action. */
    this.updateReferenceTracking = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "updateReferenceTracking",
      operationName: "updateReferenceTracking",
      operationReturnType: "UpdateReferenceTracking",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        shopId: { required: false, type: "String" },
        referenceTrackingCode: { required: false, type: "String" }
      }
    });
    /** Executes the writeBatchOrdersToSheets global action. */
    this.writeBatchOrdersToSheets = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "writeBatchOrdersToSheets",
      operationName: "writeBatchOrdersToSheets",
      operationReturnType: "WriteBatchOrdersToSheets",
      namespace: null,
      variables: {
        ordersData: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the writeToShopify global action. */
    this.writeToShopify = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "writeToShopify",
      operationName: "writeToShopify",
      operationReturnType: "WriteToShopify",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        mutation: { required: false, type: "String" },
        variables: { required: false, type: "JSONObject" }
      }
    });
    /** Executes the removeOrderFromSheets global action. */
    this.removeOrderFromSheets = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "removeOrderFromSheets",
      operationName: "removeOrderFromSheets",
      operationReturnType: "RemoveOrderFromSheets",
      namespace: null,
      variables: {}
    });
    /**
     * The list of environments with a customized API root endpoint
     */
    this.apiRoots = { "development": "https://bambe-crm-app--development.gadget.app/", "production": "https://bambe-crm-app.gadget.app/" };
    this.applicationId = "222569";
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    this.transaction = async (callback) => {
      return await this.connection.transaction(callback);
    };
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    this.getDirectUploadToken = async () => {
      const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", { nonce: Math.random().toString(36).slice(2, 7) }, {
        requestPolicy: "network-only"
      });
      return result.gadgetMeta.directUploadToken;
    };
    let inSSRContext = false;
    try {
      inSSRContext = !!(import.meta.env && import.meta.env.SSR);
    } catch (error) {
    }
    if (inSSRContext) {
      const api = globalThis.GadgetGlobals?.api;
      if (api) {
        return api.actAsSession;
      }
    }
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://bambe-crm-app${envPart}.gadget.app`;
    }
    const exchanges = { ...options?.exchanges };
    if (this.environment !== productionEnv) {
      const devHarnessExchange = ({ forward }) => {
        return (operations$) => {
          const operationResult$ = forward(operations$);
          return pipe(
            operationResult$,
            map((result) => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error) {
                console.warn("[gadget] error dispatching gadget dev harness event", error);
              }
              return result;
            })
          );
        };
      };
      exchanges.beforeAll = [
        devHarnessExchange,
        ...exchanges.beforeAll ?? []
      ];
    }
    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment
    });
    if (typeof window != "undefined" && this.connection.authenticationMode == AuthenticationMode.APIKey && !options?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
    }
    if (typeof options?.authenticationMode === "undefined" && typeof window !== "undefined" && window.shopify?.idToken) {
      this.connection.setAuthenticationMode({
        custom: {
          async processFetch(_input, init) {
            const headers = new Headers(init.headers);
            const idToken = await window.shopify.idToken();
            headers.append("Authorization", "ShopifySessionToken " + idToken);
            init.headers ?? (init.headers = {});
            headers.forEach(function(value, key) {
              init.headers[key] = value;
            });
          },
          async processTransactionConnectionParams(params) {
            const idToken = await window.shopify.idToken();
            params.auth.shopifySessionToken = idToken;
          }
        }
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
      shopifyCustomer: new InternalModelManager("shopifyCustomer", this.connection, { "pluralApiIdentifier": "shopifyCustomers", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, { "pluralApiIdentifier": "shopifyGdprRequests", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyOrder: new InternalModelManager("shopifyOrder", this.connection, { "pluralApiIdentifier": "shopifyOrders", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyShop: new InternalModelManager("shopifyShop", this.connection, { "pluralApiIdentifier": "shopifyShops", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifySync: new InternalModelManager("shopifySync", this.connection, { "pluralApiIdentifier": "shopifySyncs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      googleSheetConfig: new InternalModelManager("googleSheetConfig", this.connection, { "pluralApiIdentifier": "googleSheetConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      session: new InternalModelManager("session", this.connection, { "pluralApiIdentifier": "sessions", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillment: new InternalModelManager("shopifyFulfillment", this.connection, { "pluralApiIdentifier": "shopifyFulfillments", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillmentOrder: new InternalModelManager("shopifyFulfillmentOrder", this.connection, { "pluralApiIdentifier": "shopifyFulfillmentOrders", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyFulfillmentService: new InternalModelManager("shopifyFulfillmentService", this.connection, { "pluralApiIdentifier": "shopifyFulfillmentServices", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, { "pluralApiIdentifier": "shopifyProducts", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyProductVariant: new InternalModelManager("shopifyProductVariant", this.connection, { "pluralApiIdentifier": "shopifyProductVariants", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      senditConfig: new InternalModelManager("senditConfig", this.connection, { "pluralApiIdentifier": "senditConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      speedafConfig: new InternalModelManager("speedafConfig", this.connection, { "pluralApiIdentifier": "speedafConfigs", "hasAmbiguousIdentifiers": false, "namespace": [] })
    };
  }
  /**
   * Returns a new Client instance that will call the Gadget API as the application's admin user.
   * This can only be used for API clients using internal authentication.
   * @returns {Client} A new Client instance with admin authentication
   */
  get actAsAdmin() {
    assert(this.options?.authenticationMode?.internal, "actAsAdmin can only be used for API clients using internal authentication");
    return new Client({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: false
        }
      }
    });
  }
  /**
   * Returns a new Client instance that will call the Gadget API as with the permission of the current session.
   * This can only be used for API clients using internal authentication.
   * @returns {Client} A new Client instance with session authentication
   */
  get actAsSession() {
    assert(this.options?.authenticationMode?.internal, "actAsSession can only be used for API clients using internal authentication");
    return new Client({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: true
        }
      }
    });
  }
  /** Run an arbitrary GraphQL query. */
  async query(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /** Run an arbitrary GraphQL mutation. */
  async mutate(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
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
  async fetch(input, init = {}) {
    return await this.connection.fetch(input, init);
  }
  async enqueue(action, inputOrOptions, maybeOptions) {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
    let input;
    let options;
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
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
  handle(action, id) {
    return new BackgroundActionHandle(this.connection, action, id);
  }
  toString() {
    return `GadgetAPIClient<${this.environment}>`;
  }
  toJSON() {
    return this.toString();
  }
}
Client.prototype[Symbol.for("gadget/modelRelationships")] = { "shopifyCustomer": { "orders": { "type": "HasMany", "model": "shopifyOrder" }, "lastOrder": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyGdprRequest": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyOrder": { "customer": { "type": "BelongsTo", "model": "shopifyCustomer" }, "fulfillments": { "type": "HasMany", "model": "shopifyFulfillment" }, "shopifyShop": { "type": "BelongsTo", "model": "shopifyShop" }, "fulfillmentOrders": { "type": "HasMany", "model": "shopifyFulfillmentOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyShop": { "syncs": { "type": "HasMany", "model": "shopifySync" }, "gdprRequests": { "type": "HasMany", "model": "shopifyGdprRequest" }, "fulfillmentOrders": { "type": "HasMany", "model": "shopifyFulfillmentOrder" }, "fulfillmentServices": { "type": "HasMany", "model": "shopifyFulfillmentService" }, "fulfillments": { "type": "HasMany", "model": "shopifyFulfillment" }, "customers": { "type": "HasMany", "model": "shopifyCustomer" }, "orders": { "type": "HasMany", "model": "shopifyOrder" }, "productVariants": { "type": "HasMany", "model": "shopifyProductVariant" }, "products": { "type": "HasMany", "model": "shopifyProduct" } }, "shopifySync": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "googleSheetConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "session": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillment": { "order": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillmentOrder": { "order": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyFulfillmentService": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProduct": { "variants": { "type": "HasMany", "model": "shopifyProductVariant" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProductVariant": { "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "senditConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "speedafConfig": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } } };
export {
  Client,
  DefaultGoogleSheetConfigSelection2 as DefaultGoogleSheetConfigSelection,
  DefaultSenditConfigSelection2 as DefaultSenditConfigSelection,
  DefaultSessionSelection2 as DefaultSessionSelection,
  DefaultShopifyCustomerSelection2 as DefaultShopifyCustomerSelection,
  DefaultShopifyFulfillmentOrderSelection2 as DefaultShopifyFulfillmentOrderSelection,
  DefaultShopifyFulfillmentSelection2 as DefaultShopifyFulfillmentSelection,
  DefaultShopifyFulfillmentServiceSelection2 as DefaultShopifyFulfillmentServiceSelection,
  DefaultShopifyGdprRequestSelection2 as DefaultShopifyGdprRequestSelection,
  DefaultShopifyOrderSelection2 as DefaultShopifyOrderSelection,
  DefaultShopifyProductSelection2 as DefaultShopifyProductSelection,
  DefaultShopifyProductVariantSelection2 as DefaultShopifyProductVariantSelection,
  DefaultShopifyShopSelection2 as DefaultShopifyShopSelection,
  DefaultShopifySyncSelection2 as DefaultShopifySyncSelection,
  DefaultSpeedafConfigSelection2 as DefaultSpeedafConfigSelection
};
//# sourceMappingURL=Client.js.map
