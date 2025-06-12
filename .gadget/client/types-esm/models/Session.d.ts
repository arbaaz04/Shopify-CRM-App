import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, Session, AvailableSessionSelection } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of session. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedSessionOrDefault<Options extends Selectable<AvailableSessionSelection>> = DeepFilterNever<Select<Session, DefaultSelection<AvailableSessionSelection, Options, typeof DefaultSessionSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for session.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: SessionRecord, recordWithName: SessionRecord<{ select: { name: true; } }>) => {
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
export type SessionRecord<Selection extends AvailableSessionSelection | undefined = typeof DefaultSessionSelection> = DeepFilterNever<GadgetRecord<SelectedSessionOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultSessionSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly roles: {
        readonly key: true;
        readonly name: true;
    };
    readonly shopId: true;
    readonly shopifySID: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "session";
declare const pluralModelApiIdentifier: "sessions";
/** Options that can be passed to the `SessionManager#findOne` method */
export interface FindOneSessionOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `SessionManager#maybeFindOne` method */
export interface MaybeFindOneSessionOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `SessionManager#findMany` method */
export interface FindManySessionsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `SessionManager#findFirst` method */
export interface FindFirstSessionOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `SessionManager#maybeFindFirst` method */
export interface MaybeFindFirstSessionOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/**
 * A manager for the session model with all the available operations for reading and writing to it.*/
export type SessionManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one session by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneSessionOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneSessionOptions>): PromiseOrLiveIterator<Options, SessionRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        optionsType: FindOneSessionOptions;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    maybeFindOne: {
        /**
         * Finds one session by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneSessionOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneSessionOptions>): PromiseOrLiveIterator<Options, SessionRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneSessionOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    findMany: {
        /**
         * Finds many session. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManySessionsOptions>(options?: LimitToKnownKeys<Options, FindManySessionsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<SessionRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManySessionsOptions;
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    findFirst: {
        /**
         * Finds the first matching session. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstSessionOptions>(options?: LimitToKnownKeys<Options, FindFirstSessionOptions>): PromiseOrLiveIterator<Options, SessionRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstSessionOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching session. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstSessionOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstSessionOptions>): PromiseOrLiveIterator<Options, SessionRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstSessionOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    findById: {
        /**
        * Finds one session by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneSessionOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSessionOptions>): PromiseOrLiveIterator<Options, SessionRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneSessionOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
    maybeFindById: {
        /**
        * Finds one session by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneSessionOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSessionOptions>): Promise<SessionRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneSessionOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultSessionSelection;
        namespace: null;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
};
/**
 * A manager for the session model with all the available operations for reading and writing to it.*/
export declare const SessionManager: {
    new (connection: GadgetConnection): SessionManager;
};
export {};
