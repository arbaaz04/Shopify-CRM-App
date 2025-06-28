import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyFulfillmentService, AvailableShopifyFulfillmentServiceSelection, ShopifyFulfillmentServiceSort, ShopifyFulfillmentServiceFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyFulfillmentService. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyFulfillmentServiceOrDefault<Options extends Selectable<AvailableShopifyFulfillmentServiceSelection>> = DeepFilterNever<Select<ShopifyFulfillmentService, DefaultSelection<AvailableShopifyFulfillmentServiceSelection, Options, typeof DefaultShopifyFulfillmentServiceSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifyFulfillmentService.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyFulfillmentServiceRecord, recordWithName: ShopifyFulfillmentServiceRecord<{ select: { name: true; } }>) => {
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
export type ShopifyFulfillmentServiceRecord<Selection extends AvailableShopifyFulfillmentServiceSelection | undefined = typeof DefaultShopifyFulfillmentServiceSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyFulfillmentServiceOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyFulfillmentServiceSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly adminGraphqlApiId: true;
    readonly callbackUrl: true;
    readonly createdAt: true;
    readonly format: true;
    readonly fulfillmentOrdersOptIn: true;
    readonly handle: true;
    readonly inventoryManagement: true;
    readonly name: true;
    readonly permitsSkuSharing: true;
    readonly requiresShippingMethod: true;
    readonly serviceName: true;
    readonly shopId: true;
    readonly trackingSupport: true;
    readonly type: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifyFulfillmentService";
declare const pluralModelApiIdentifier: "shopifyFulfillmentServices";
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findOne` method */
export interface FindOneShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#maybeFindOne` method */
export interface MaybeFindOneShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findMany` method */
export interface FindManyShopifyFulfillmentServicesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findFirst` method */
export interface FindFirstShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
}
export interface UpdateShopifyFulfillmentServiceOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentServiceSelection;
}
export interface DeleteShopifyFulfillmentServiceOptions {
}
/**
 * A manager for the shopifyFulfillmentService model with all the available operations for reading and writing to it.*/
export type ShopifyFulfillmentServiceManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyFulfillmentService by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyFulfillmentServiceOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentServiceRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        optionsType: FindOneShopifyFulfillmentServiceOptions;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyFulfillmentService by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyFulfillmentServiceOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyFulfillmentServiceOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    findMany: {
        /**
         * Finds many shopifyFulfillmentService. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyFulfillmentServicesOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyFulfillmentServicesOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyFulfillmentServiceRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyFulfillmentServicesOptions;
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyFulfillmentService. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyFulfillmentServiceOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentServiceRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyFulfillmentServiceOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyFulfillmentService. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyFulfillmentServiceOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyFulfillmentServiceOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    findById: {
        /**
        * Finds one shopifyFulfillmentService by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyFulfillmentServiceOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentServiceRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyFulfillmentServiceOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    maybeFindById: {
        /**
        * Finds one shopifyFulfillmentService by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifyFulfillmentServiceOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): Promise<ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyFulfillmentServiceOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentServiceSelection;
        schemaType: Query["shopifyFulfillmentService"];
    };
    create: {
        /**
         * @deprecated The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'createShopifyFulfillmentService';
        errorMessage: string;
        optionsType: CreateShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.create';
    };
    bulkCreate: {
        /**
         * @deprecated The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkCreateShopifyFulfillmentServices';
        errorMessage: string;
        optionsType: CreateShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.bulkCreate';
    };
    update: {
        /**
         * @deprecated The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'updateShopifyFulfillmentService';
        errorMessage: string;
        optionsType: UpdateShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.update';
    };
    bulkUpdate: {
        /**
         * @deprecated The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUpdateShopifyFulfillmentServices';
        errorMessage: string;
        optionsType: UpdateShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.bulkUpdate';
    };
    delete: {
        /**
         * @deprecated The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'deleteShopifyFulfillmentService';
        errorMessage: string;
        optionsType: DeleteShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.delete';
    };
    bulkDelete: {
        /**
         * @deprecated The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkDeleteShopifyFulfillmentServices';
        errorMessage: string;
        optionsType: DeleteShopifyFulfillmentServiceOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillmentService.bulkDelete';
    };
};
/**
 * A manager for the shopifyFulfillmentService model with all the available operations for reading and writing to it.*/
export declare const ShopifyFulfillmentServiceManager: {
    new (connection: GadgetConnection): ShopifyFulfillmentServiceManager;
};
export {};
