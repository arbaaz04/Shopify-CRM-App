import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyFulfillment, AvailableShopifyFulfillmentSelection, ShopifyFulfillmentSort, ShopifyFulfillmentFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyFulfillment. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyFulfillmentOrDefault<Options extends Selectable<AvailableShopifyFulfillmentSelection>> = DeepFilterNever<Select<ShopifyFulfillment, DefaultSelection<AvailableShopifyFulfillmentSelection, Options, typeof DefaultShopifyFulfillmentSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifyFulfillment.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyFulfillmentRecord, recordWithName: ShopifyFulfillmentRecord<{ select: { name: true; } }>) => {
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
export type ShopifyFulfillmentRecord<Selection extends AvailableShopifyFulfillmentSelection | undefined = typeof DefaultShopifyFulfillmentSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyFulfillmentOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyFulfillmentSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly deliveredAt: true;
    readonly displayStatus: true;
    readonly estimatedDeliveryAt: true;
    readonly inTransitAt: true;
    readonly name: true;
    readonly orderId: true;
    readonly originAddress: true;
    readonly receipt: true;
    readonly requiresShipping: true;
    readonly service: true;
    readonly shipmentStatus: true;
    readonly shopId: true;
    readonly shopifyCreatedAt: true;
    readonly shopifyUpdatedAt: true;
    readonly status: true;
    readonly totalQuantity: true;
    readonly trackingCompany: true;
    readonly trackingInfo: true;
    readonly trackingNumbers: true;
    readonly trackingUrls: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifyFulfillment";
declare const pluralModelApiIdentifier: "shopifyFulfillments";
/** Options that can be passed to the `ShopifyFulfillmentManager#findOne` method */
export interface FindOneShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyFulfillmentManager#maybeFindOne` method */
export interface MaybeFindOneShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyFulfillmentManager#findMany` method */
export interface FindManyShopifyFulfillmentsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentSort | ShopifyFulfillmentSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentFilter | ShopifyFulfillmentFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyFulfillmentManager#findFirst` method */
export interface FindFirstShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentSort | ShopifyFulfillmentSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentFilter | ShopifyFulfillmentFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyFulfillmentManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyFulfillmentSort | ShopifyFulfillmentSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyFulfillmentFilter | ShopifyFulfillmentFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
}
export interface UpdateShopifyFulfillmentOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyFulfillmentSelection;
}
export interface DeleteShopifyFulfillmentOptions {
}
/**
 * A manager for the shopifyFulfillment model with all the available operations for reading and writing to it.*/
export type ShopifyFulfillmentManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyFulfillment by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyFulfillmentOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        optionsType: FindOneShopifyFulfillmentOptions;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyFulfillment by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyFulfillmentOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyFulfillmentOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyFulfillmentOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    findMany: {
        /**
         * Finds many shopifyFulfillment. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyFulfillmentsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyFulfillmentsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyFulfillmentRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyFulfillmentsOptions;
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyFulfillment. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyFulfillmentOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyFulfillmentOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyFulfillmentOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyFulfillment. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyFulfillmentOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyFulfillmentOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyFulfillmentOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    findById: {
        /**
        * Finds one shopifyFulfillment by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyFulfillmentOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOptions>): PromiseOrLiveIterator<Options, ShopifyFulfillmentRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyFulfillmentOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    maybeFindById: {
        /**
        * Finds one shopifyFulfillment by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifyFulfillmentOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOptions>): Promise<ShopifyFulfillmentRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyFulfillmentOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyFulfillmentSelection;
        namespace: null;
        selectionType: AvailableShopifyFulfillmentSelection;
        schemaType: Query["shopifyFulfillment"];
    };
    create: {
        /**
         * @deprecated The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'createShopifyFulfillment';
        errorMessage: 'The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyFulfillmentOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.create';
    };
    bulkCreate: {
        /**
         * @deprecated The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkCreateShopifyFulfillments';
        errorMessage: 'The action create on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyFulfillmentOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.bulkCreate';
    };
    update: {
        /**
         * @deprecated The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'updateShopifyFulfillment';
        errorMessage: 'The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyFulfillmentOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.update';
    };
    bulkUpdate: {
        /**
         * @deprecated The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUpdateShopifyFulfillments';
        errorMessage: 'The action update on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyFulfillmentOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.bulkUpdate';
    };
    delete: {
        /**
         * @deprecated The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'deleteShopifyFulfillment';
        errorMessage: 'The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: DeleteShopifyFulfillmentOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.delete';
    };
    bulkDelete: {
        /**
         * @deprecated The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkDeleteShopifyFulfillments';
        errorMessage: 'The action delete on model shopifyFulfillment does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: DeleteShopifyFulfillmentOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyFulfillment.bulkDelete';
    };
};
/**
 * A manager for the shopifyFulfillment model with all the available operations for reading and writing to it.*/
export declare const ShopifyFulfillmentManager: {
    new (connection: GadgetConnection): ShopifyFulfillmentManager;
};
export {};
