import { GadgetConnection, GadgetRecord, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, Session, AvailableSessionSelection } from "../types.js";
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
/** Options that can be passed to the `SessionManager#findOne` method */
export interface GetCurrentSessionOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableSessionSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/**
 * A manager for the session model with all the available operations for reading and writing to it.*/
export type CurrentSessionManager = {
    readonly connection: GadgetConnection;
    get: {
        /**
         * Finds the current session for this client. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends GetCurrentSessionOptions>(options?: LimitToKnownKeys<Options, GetCurrentSessionOptions>): Promise<GadgetRecord<SelectedSessionOrDefault<Options>>>;
        type: 'get';
        operationName: 'currentSession';
        defaultSelection: typeof DefaultSessionSelection;
        modelApiIdentifier: typeof modelApiIdentifier;
        namespace: null;
        optionsType: GetCurrentSessionOptions;
        selectionType: AvailableSessionSelection;
        schemaType: Query["session"];
    };
};
/**
 * A manager for the session model with all the available operations for reading and writing to it.*/
export declare const CurrentSessionManager: {
    new (connection: GadgetConnection): CurrentSessionManager;
};
export {};
