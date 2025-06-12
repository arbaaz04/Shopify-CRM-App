import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, SenditTracking, AvailableSenditTrackingSelection, SenditTrackingSort, SenditTrackingFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of senditTracking. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedSenditTrackingOrDefault<Options extends Selectable<AvailableSenditTrackingSelection>> = DeepFilterNever<Select<SenditTracking, DefaultSelection<AvailableSenditTrackingSelection, Options, typeof DefaultSenditTrackingSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for senditTracking.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: SenditTrackingRecord, recordWithName: SenditTrackingRecord<{ select: { name: true; } }>) => {
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
export type SenditTrackingRecord<Selection extends AvailableSenditTrackingSelection | undefined = typeof DefaultSenditTrackingSelection> = DeepFilterNever<GadgetRecord<SelectedSenditTrackingOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultSenditTrackingSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly data: true;
    readonly fee: true;
    readonly orderId: true;
    readonly status: true;
    readonly trackingCode: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "senditTracking";
declare const pluralModelApiIdentifier: "senditTrackings";
/** Options that can be passed to the `SenditTrackingManager#findOne` method */
export interface FindOneSenditTrackingOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSenditTrackingSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `SenditTrackingManager#maybeFindOne` method */
export interface MaybeFindOneSenditTrackingOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSenditTrackingSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `SenditTrackingManager#findMany` method */
export interface FindManySenditTrackingsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSenditTrackingSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: SenditTrackingSort | SenditTrackingSort[] | null;
    /** Only return records matching these filters. */
    filter?: SenditTrackingFilter | SenditTrackingFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `SenditTrackingManager#findFirst` method */
export interface FindFirstSenditTrackingOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSenditTrackingSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: SenditTrackingSort | SenditTrackingSort[] | null;
    /** Only return records matching these filters. */
    filter?: SenditTrackingFilter | SenditTrackingFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `SenditTrackingManager#maybeFindFirst` method */
export interface MaybeFindFirstSenditTrackingOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSenditTrackingSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: SenditTrackingSort | SenditTrackingSort[] | null;
    /** Only return records matching these filters. */
    filter?: SenditTrackingFilter | SenditTrackingFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/**
 * A manager for the senditTracking model with all the available operations for reading and writing to it.*/
export type SenditTrackingManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one senditTracking by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneSenditTrackingOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneSenditTrackingOptions>): PromiseOrLiveIterator<Options, SenditTrackingRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        optionsType: FindOneSenditTrackingOptions;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    maybeFindOne: {
        /**
         * Finds one senditTracking by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneSenditTrackingOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneSenditTrackingOptions>): PromiseOrLiveIterator<Options, SenditTrackingRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneSenditTrackingOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    findMany: {
        /**
         * Finds many senditTracking. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManySenditTrackingsOptions>(options?: LimitToKnownKeys<Options, FindManySenditTrackingsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<SenditTrackingRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManySenditTrackingsOptions;
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    findFirst: {
        /**
         * Finds the first matching senditTracking. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstSenditTrackingOptions>(options?: LimitToKnownKeys<Options, FindFirstSenditTrackingOptions>): PromiseOrLiveIterator<Options, SenditTrackingRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstSenditTrackingOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching senditTracking. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstSenditTrackingOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstSenditTrackingOptions>): PromiseOrLiveIterator<Options, SenditTrackingRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstSenditTrackingOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    findById: {
        /**
        * Finds one senditTracking by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneSenditTrackingOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSenditTrackingOptions>): PromiseOrLiveIterator<Options, SenditTrackingRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneSenditTrackingOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
    maybeFindById: {
        /**
        * Finds one senditTracking by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneSenditTrackingOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSenditTrackingOptions>): Promise<SenditTrackingRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneSenditTrackingOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSenditTrackingSelection;
        namespace: null;
        selectionType: AvailableSenditTrackingSelection;
        schemaType: Query["senditTracking"];
    };
};
/**
 * A manager for the senditTracking model with all the available operations for reading and writing to it.*/
export declare const SenditTrackingManager: {
    new (connection: GadgetConnection): SenditTrackingManager;
};
export {};
