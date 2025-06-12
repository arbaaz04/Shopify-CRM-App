import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, OrderSyncQueue, AvailableOrderSyncQueueSelection, OrderSyncQueueSort, OrderSyncQueueFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of orderSyncQueue. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedOrderSyncQueueOrDefault<Options extends Selectable<AvailableOrderSyncQueueSelection>> = DeepFilterNever<Select<OrderSyncQueue, DefaultSelection<AvailableOrderSyncQueueSelection, Options, typeof DefaultOrderSyncQueueSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for orderSyncQueue.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: OrderSyncQueueRecord, recordWithName: OrderSyncQueueRecord<{ select: { name: true; } }>) => {
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
export type OrderSyncQueueRecord<Selection extends AvailableOrderSyncQueueSelection | undefined = typeof DefaultOrderSyncQueueSelection> = DeepFilterNever<GadgetRecord<SelectedOrderSyncQueueOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultOrderSyncQueueSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly lastErrorMessage: true;
    readonly lastSyncAt: true;
    readonly shopId: true;
    readonly shopifyOrderId: true;
    readonly status: true;
    readonly syncAttempts: true;
    readonly trackingId: true;
    readonly trackingSyncedToSheet: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "orderSyncQueue";
declare const pluralModelApiIdentifier: "orderSyncQueues";
/** Options that can be passed to the `OrderSyncQueueManager#findOne` method */
export interface FindOneOrderSyncQueueOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableOrderSyncQueueSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `OrderSyncQueueManager#maybeFindOne` method */
export interface MaybeFindOneOrderSyncQueueOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableOrderSyncQueueSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `OrderSyncQueueManager#findMany` method */
export interface FindManyOrderSyncQueuesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableOrderSyncQueueSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: OrderSyncQueueSort | OrderSyncQueueSort[] | null;
    /** Only return records matching these filters. */
    filter?: OrderSyncQueueFilter | OrderSyncQueueFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `OrderSyncQueueManager#findFirst` method */
export interface FindFirstOrderSyncQueueOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableOrderSyncQueueSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: OrderSyncQueueSort | OrderSyncQueueSort[] | null;
    /** Only return records matching these filters. */
    filter?: OrderSyncQueueFilter | OrderSyncQueueFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `OrderSyncQueueManager#maybeFindFirst` method */
export interface MaybeFindFirstOrderSyncQueueOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableOrderSyncQueueSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: OrderSyncQueueSort | OrderSyncQueueSort[] | null;
    /** Only return records matching these filters. */
    filter?: OrderSyncQueueFilter | OrderSyncQueueFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/**
 * A manager for the orderSyncQueue model with all the available operations for reading and writing to it.*/
export type OrderSyncQueueManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one orderSyncQueue by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneOrderSyncQueueOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneOrderSyncQueueOptions>): PromiseOrLiveIterator<Options, OrderSyncQueueRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        optionsType: FindOneOrderSyncQueueOptions;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    maybeFindOne: {
        /**
         * Finds one orderSyncQueue by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneOrderSyncQueueOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneOrderSyncQueueOptions>): PromiseOrLiveIterator<Options, OrderSyncQueueRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneOrderSyncQueueOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    findMany: {
        /**
         * Finds many orderSyncQueue. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyOrderSyncQueuesOptions>(options?: LimitToKnownKeys<Options, FindManyOrderSyncQueuesOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<OrderSyncQueueRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyOrderSyncQueuesOptions;
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    findFirst: {
        /**
         * Finds the first matching orderSyncQueue. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstOrderSyncQueueOptions>(options?: LimitToKnownKeys<Options, FindFirstOrderSyncQueueOptions>): PromiseOrLiveIterator<Options, OrderSyncQueueRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstOrderSyncQueueOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching orderSyncQueue. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstOrderSyncQueueOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstOrderSyncQueueOptions>): PromiseOrLiveIterator<Options, OrderSyncQueueRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstOrderSyncQueueOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    findById: {
        /**
        * Finds one orderSyncQueue by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneOrderSyncQueueOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneOrderSyncQueueOptions>): PromiseOrLiveIterator<Options, OrderSyncQueueRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneOrderSyncQueueOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
    maybeFindById: {
        /**
        * Finds one orderSyncQueue by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneOrderSyncQueueOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneOrderSyncQueueOptions>): Promise<OrderSyncQueueRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneOrderSyncQueueOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultOrderSyncQueueSelection;
        namespace: null;
        selectionType: AvailableOrderSyncQueueSelection;
        schemaType: Query["orderSyncQueue"];
    };
};
/**
 * A manager for the orderSyncQueue model with all the available operations for reading and writing to it.*/
export declare const OrderSyncQueueManager: {
    new (connection: GadgetConnection): OrderSyncQueueManager;
};
export {};
