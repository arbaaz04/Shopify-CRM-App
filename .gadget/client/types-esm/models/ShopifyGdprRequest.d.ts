import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyGdprRequest, AvailableShopifyGdprRequestSelection, ShopifyGdprRequestSort, ShopifyGdprRequestFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyGdprRequest. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyGdprRequestOrDefault<Options extends Selectable<AvailableShopifyGdprRequestSelection>> = DeepFilterNever<Select<ShopifyGdprRequest, DefaultSelection<AvailableShopifyGdprRequestSelection, Options, typeof DefaultShopifyGdprRequestSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifyGdprRequest.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyGdprRequestRecord, recordWithName: ShopifyGdprRequestRecord<{ select: { name: true; } }>) => {
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
export type ShopifyGdprRequestRecord<Selection extends AvailableShopifyGdprRequestSelection | undefined = typeof DefaultShopifyGdprRequestSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyGdprRequestOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyGdprRequestSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly payload: true;
    readonly shopId: true;
    readonly topic: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifyGdprRequest";
declare const pluralModelApiIdentifier: "shopifyGdprRequests";
/** Options that can be passed to the `ShopifyGdprRequestManager#findOne` method */
export interface FindOneShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyGdprRequestManager#maybeFindOne` method */
export interface MaybeFindOneShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyGdprRequestManager#findMany` method */
export interface FindManyShopifyGdprRequestsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyGdprRequestSort | ShopifyGdprRequestSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyGdprRequestFilter | ShopifyGdprRequestFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyGdprRequestManager#findFirst` method */
export interface FindFirstShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyGdprRequestSort | ShopifyGdprRequestSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyGdprRequestFilter | ShopifyGdprRequestFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyGdprRequestManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyGdprRequestSort | ShopifyGdprRequestSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyGdprRequestFilter | ShopifyGdprRequestFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
}
export interface UpdateShopifyGdprRequestOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyGdprRequestSelection;
}
/**
 * A manager for the shopifyGdprRequest model with all the available operations for reading and writing to it.*/
export type ShopifyGdprRequestManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyGdprRequest by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyGdprRequestOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyGdprRequestOptions>): PromiseOrLiveIterator<Options, ShopifyGdprRequestRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        optionsType: FindOneShopifyGdprRequestOptions;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyGdprRequest by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyGdprRequestOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyGdprRequestOptions>): PromiseOrLiveIterator<Options, ShopifyGdprRequestRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyGdprRequestOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    findMany: {
        /**
         * Finds many shopifyGdprRequest. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyGdprRequestsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyGdprRequestsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyGdprRequestRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyGdprRequestsOptions;
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyGdprRequest. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyGdprRequestOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyGdprRequestOptions>): PromiseOrLiveIterator<Options, ShopifyGdprRequestRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyGdprRequestOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyGdprRequest. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyGdprRequestOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyGdprRequestOptions>): PromiseOrLiveIterator<Options, ShopifyGdprRequestRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyGdprRequestOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    findById: {
        /**
        * Finds one shopifyGdprRequest by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyGdprRequestOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyGdprRequestOptions>): PromiseOrLiveIterator<Options, ShopifyGdprRequestRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyGdprRequestOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    maybeFindById: {
        /**
        * Finds one shopifyGdprRequest by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifyGdprRequestOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyGdprRequestOptions>): Promise<ShopifyGdprRequestRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyGdprRequestOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyGdprRequestSelection;
        namespace: null;
        selectionType: AvailableShopifyGdprRequestSelection;
        schemaType: Query["shopifyGdprRequest"];
    };
    create: {
        /**
         * @deprecated The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'createShopifyGdprRequest';
        errorMessage: 'The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyGdprRequestOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyGdprRequest.create';
    };
    bulkCreate: {
        /**
         * @deprecated The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkCreateShopifyGdprRequests';
        errorMessage: 'The action create on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyGdprRequestOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyGdprRequest.bulkCreate';
    };
    update: {
        /**
         * @deprecated The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'updateShopifyGdprRequest';
        errorMessage: 'The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyGdprRequestOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyGdprRequest.update';
    };
    bulkUpdate: {
        /**
         * @deprecated The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUpdateShopifyGdprRequests';
        errorMessage: 'The action update on model shopifyGdprRequest does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyGdprRequestOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyGdprRequest.bulkUpdate';
    };
};
/**
 * A manager for the shopifyGdprRequest model with all the available operations for reading and writing to it.*/
export declare const ShopifyGdprRequestManager: {
    new (connection: GadgetConnection): ShopifyGdprRequestManager;
};
export {};
