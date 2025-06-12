import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyShop, AvailableShopifyShopSelection, ShopifyShopSort, ShopifyShopFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyShop. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyShopOrDefault<Options extends Selectable<AvailableShopifyShopSelection>> = DeepFilterNever<Select<ShopifyShop, DefaultSelection<AvailableShopifyShopSelection, Options, typeof DefaultShopifyShopSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifyShop.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyShopRecord, recordWithName: ShopifyShopRecord<{ select: { name: true; } }>) => {
 *   // The type of the `record` variable will include all fields of the model.
 *   const name = record.name;
 *   const otherField = record.otherField;
 *
 *   // The type of the `recordWithName` variable will only include the selected fields.
 *   const name = recordWithName.name;
 *   const otherField = recordWithName.otherField; // Type error: Property 'otherField' does not exist on type 'GadgetRecord<{ name: true; }>'.
 * }
 * ```
 */
export type ShopifyShopRecord<Selection extends AvailableShopifyShopSelection | undefined = typeof DefaultShopifyShopSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyShopOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyShopSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly state: true;
    readonly address1: true;
    readonly address2: true;
    readonly city: true;
    readonly country: true;
    readonly countryCode: true;
    readonly countryName: true;
    readonly countyTaxes: true;
    readonly createdAt: true;
    readonly currency: true;
    readonly customerEmail: true;
    readonly disabledWebhooks: true;
    readonly domain: true;
    readonly eligibleForPayments: true;
    readonly email: true;
    readonly enabledPresentmentCurrencies: true;
    readonly finances: true;
    readonly googleAppsDomain: true;
    readonly googleAppsLoginEnabled: true;
    readonly grantedScopes: true;
    readonly hasDiscounts: true;
    readonly hasGiftCards: true;
    readonly hasStorefront: true;
    readonly ianaTimezone: true;
    readonly installedViaApiKey: true;
    readonly latitude: true;
    readonly longitude: true;
    readonly marketingSmsContentEnabledAtCheckout: true;
    readonly moneyFormat: true;
    readonly moneyInEmailsFormat: true;
    readonly moneyWithCurrencyFormat: true;
    readonly moneyWithCurrencyInEmailsFormat: true;
    readonly multiLocationEnabled: true;
    readonly myshopifyDomain: true;
    readonly name: true;
    readonly passwordEnabled: true;
    readonly phone: true;
    readonly plan: true;
    readonly planDisplayName: true;
    readonly planName: true;
    readonly preLaunchEnabled: true;
    readonly primaryLocale: true;
    readonly province: true;
    readonly provinceCode: true;
    readonly registeredWebhooks: true;
    readonly requiresExtraPaymentsAgreement: true;
    readonly setupRequired: true;
    readonly shopOwner: true;
    readonly shopifyCreatedAt: true;
    readonly shopifyUpdatedAt: true;
    readonly source: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifyShop";
declare const pluralModelApiIdentifier: "shopifyShops";
/** Options that can be passed to the `ShopifyShopManager#findOne` method */
export interface FindOneShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyShopManager#maybeFindOne` method */
export interface MaybeFindOneShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyShopManager#findMany` method */
export interface FindManyShopifyShopsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyShopSort | ShopifyShopSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyShopManager#findFirst` method */
export interface FindFirstShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyShopSort | ShopifyShopSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyShopManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyShopSort | ShopifyShopSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface UpdateShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
}
export interface InstallShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
}
export interface ReinstallShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
}
export interface UninstallShopifyShopOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyShopSelection;
}
/**
 * A manager for the shopifyShop model with all the available operations for reading and writing to it.*/
export type ShopifyShopManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyShop by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): PromiseOrLiveIterator<Options, ShopifyShopRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        optionsType: FindOneShopifyShopOptions;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyShop by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyShopOptions>): PromiseOrLiveIterator<Options, ShopifyShopRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyShopOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    findMany: {
        /**
         * Finds many shopifyShop. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyShopsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyShopsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyShopRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyShopsOptions;
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyShopOptions>): PromiseOrLiveIterator<Options, ShopifyShopRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyShopOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyShopOptions>): PromiseOrLiveIterator<Options, ShopifyShopRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyShopOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    findById: {
        /**
        * Finds one shopifyShop by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyShopOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): PromiseOrLiveIterator<Options, ShopifyShopRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyShopOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    maybeFindById: {
        /**
        * Finds one shopifyShop by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifyShopOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): Promise<ShopifyShopRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyShopOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyShopSelection;
        namespace: null;
        selectionType: AvailableShopifyShopSelection;
        schemaType: Query["shopifyShop"];
    };
    update: {
        /**
         * @deprecated The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'updateShopifyShop';
        errorMessage: 'The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyShopOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.update';
    };
    bulkUpdate: {
        /**
         * @deprecated The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUpdateShopifyShops';
        errorMessage: 'The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyShopOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.bulkUpdate';
    };
    install: {
        /**
         * @deprecated The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'installShopifyShop';
        errorMessage: 'The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: InstallShopifyShopOptions;
        actionApiIdentifier: 'install';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.install';
    };
    bulkInstall: {
        /**
         * @deprecated The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkInstallShopifyShops';
        errorMessage: 'The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: InstallShopifyShopOptions;
        actionApiIdentifier: 'install';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.bulkInstall';
    };
    reinstall: {
        /**
         * @deprecated The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'reinstallShopifyShop';
        errorMessage: 'The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: ReinstallShopifyShopOptions;
        actionApiIdentifier: 'reinstall';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.reinstall';
    };
    bulkReinstall: {
        /**
         * @deprecated The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkReinstallShopifyShops';
        errorMessage: 'The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: ReinstallShopifyShopOptions;
        actionApiIdentifier: 'reinstall';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.bulkReinstall';
    };
    uninstall: {
        /**
         * @deprecated The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'uninstallShopifyShop';
        errorMessage: 'The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UninstallShopifyShopOptions;
        actionApiIdentifier: 'uninstall';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.uninstall';
    };
    bulkUninstall: {
        /**
         * @deprecated The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUninstallShopifyShops';
        errorMessage: 'The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UninstallShopifyShopOptions;
        actionApiIdentifier: 'uninstall';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyShop.bulkUninstall';
    };
};
/**
 * A manager for the shopifyShop model with all the available operations for reading and writing to it.*/
export declare const ShopifyShopManager: {
    new (connection: GadgetConnection): ShopifyShopManager;
};
export {};
