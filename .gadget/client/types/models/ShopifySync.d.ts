import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifySync, AvailableShopifySyncSelection, ShopifySyncSort, ShopifySyncFilter, AbortShopifySyncInput, CompleteShopifySyncInput, ErrorShopifySyncInput, RunShopifySyncInput, Scalars, UpsertShopifySyncInput } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifySync. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifySyncOrDefault<Options extends Selectable<AvailableShopifySyncSelection>> = DeepFilterNever<Select<ShopifySync, DefaultSelection<AvailableShopifySyncSelection, Options, typeof DefaultShopifySyncSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifySync.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifySyncRecord, recordWithName: ShopifySyncRecord<{ select: { name: true; } }>) => {
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
export type ShopifySyncRecord<Selection extends AvailableShopifySyncSelection | undefined = typeof DefaultShopifySyncSelection> = DeepFilterNever<GadgetRecord<SelectedShopifySyncOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifySyncSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly state: true;
    readonly createdAt: true;
    readonly domain: true;
    readonly errorDetails: true;
    readonly errorMessage: true;
    readonly force: true;
    readonly models: true;
    readonly shopId: true;
    readonly syncSince: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifySync";
declare const pluralModelApiIdentifier: "shopifySyncs";
/** Options that can be passed to the `ShopifySyncManager#findOne` method */
export interface FindOneShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifySyncManager#maybeFindOne` method */
export interface MaybeFindOneShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifySyncManager#findMany` method */
export interface FindManyShopifySyncsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifySyncSort | ShopifySyncSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifySyncFilter | ShopifySyncFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifySyncManager#findFirst` method */
export interface FindFirstShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifySyncSort | ShopifySyncSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifySyncFilter | ShopifySyncFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifySyncManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifySyncSort | ShopifySyncSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifySyncFilter | ShopifySyncFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface AbortShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
}
export interface CompleteShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
}
export interface ErrorShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
}
export interface RunShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
}
export interface UpsertShopifySyncOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifySyncSelection;
}
/**
 * The fully-qualified, expanded form of the inputs for executing the abort action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedAbortShopifySyncVariables = {
    shopifySync?: AbortShopifySyncInput;
};
/**
 * The inputs for executing abort on shopifySync.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type AbortShopifySyncVariables = AbortShopifySyncInput;
/**
 * The return value from executing abort on shopifySync
 * Is a GadgetRecord of the model's type.
 **/
export type AbortShopifySyncResult<Options extends AbortShopifySyncOptions> = SelectedShopifySyncOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifySyncOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the complete action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCompleteShopifySyncVariables = {
    shopifySync?: CompleteShopifySyncInput;
};
/**
 * The inputs for executing complete on shopifySync.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CompleteShopifySyncVariables = CompleteShopifySyncInput;
/**
 * The return value from executing complete on shopifySync
 * Is a GadgetRecord of the model's type.
 **/
export type CompleteShopifySyncResult<Options extends CompleteShopifySyncOptions> = SelectedShopifySyncOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifySyncOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the error action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedErrorShopifySyncVariables = {
    shopifySync?: ErrorShopifySyncInput;
};
/**
 * The inputs for executing error on shopifySync.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type ErrorShopifySyncVariables = ErrorShopifySyncInput;
/**
 * The return value from executing error on shopifySync
 * Is a GadgetRecord of the model's type.
 **/
export type ErrorShopifySyncResult<Options extends ErrorShopifySyncOptions> = SelectedShopifySyncOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifySyncOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the run action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedRunShopifySyncVariables = {
    shopifySync?: RunShopifySyncInput;
    startReason?: (Scalars['String'] | null) | null;
};
/**
 * The inputs for executing run on shopifySync.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type RunShopifySyncVariables = RunShopifySyncInput;
/**
 * The return value from executing run on shopifySync
 * Is a GadgetRecord of the model's type.
 **/
export type RunShopifySyncResult<Options extends RunShopifySyncOptions> = SelectedShopifySyncOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifySyncOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertShopifySyncVariables = {
    on?: ((Scalars['String'] | null))[];
    shopifySync?: UpsertShopifySyncInput;
    startReason?: (Scalars['String'] | null) | null;
};
/**
 * The inputs for executing upsert on shopifySync.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertShopifySyncVariables = Omit<UpsertShopifySyncInput, "on"> & {
    on?: ((Scalars['String'] | null))[];
};
/**
 * The return value from executing upsert on shopifySync
 *
 **/
export type UpsertShopifySyncResult<Options extends UpsertShopifySyncOptions> = SelectedShopifySyncOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifySyncOrDefault<Options>>;
/**
 * A manager for the shopifySync model with all the available operations for reading and writing to it.*/
export type ShopifySyncManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifySync by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifySyncOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifySyncOptions>): PromiseOrLiveIterator<Options, ShopifySyncRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        optionsType: FindOneShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifySync by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifySyncOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifySyncOptions>): PromiseOrLiveIterator<Options, ShopifySyncRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifySyncOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    findMany: {
        /**
         * Finds many shopifySync. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifySyncsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifySyncsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifySyncRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifySyncsOptions;
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifySync. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifySyncOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifySyncOptions>): PromiseOrLiveIterator<Options, ShopifySyncRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifySyncOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifySync. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifySyncOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifySyncOptions>): PromiseOrLiveIterator<Options, ShopifySyncRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifySyncOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    findById: {
        /**
        * Finds one shopifySync by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifySyncOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifySyncOptions>): PromiseOrLiveIterator<Options, ShopifySyncRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifySyncOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    maybeFindById: {
        /**
        * Finds one shopifySync by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifySyncOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifySyncOptions>): Promise<ShopifySyncRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifySyncOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifySyncSelection;
        namespace: null;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
    };
    abort: {
        /**
         * Executes the abort actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.abort("1", {
          *   domain: "example value for domain",
          *   errorDetails: "example value for errorDetails",
          *   errorMessage: "example value for errorMessage",
          *   force: true,
          *   syncSince: "2025-09-01T00:00:00.000+00:00",
          * });
        **/
        <Options extends AbortShopifySyncOptions>(id: string, variables: AbortShopifySyncVariables, options?: LimitToKnownKeys<Options, AbortShopifySyncOptions>): Promise<AbortShopifySyncResult<Options>>;
        /**
         * Executes the abort actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.abort("1", {
          *   shopifySync: {
          *     domain: "example value for domain",
          *     errorDetails: "example value for errorDetails",
          *     errorMessage: "example value for errorMessage",
          *     force: true,
          *     syncSince: "2025-09-01T00:00:00.000+00:00",
          *   },
          * });
        **/
        <Options extends AbortShopifySyncOptions>(id: string, variables: FullyQualifiedAbortShopifySyncVariables, options?: LimitToKnownKeys<Options, AbortShopifySyncOptions>): Promise<AbortShopifySyncResult<Options>>;
        type: 'action';
        operationName: 'abortShopifySync';
        operationReturnType: 'AbortShopifySync';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: true;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            id: {
                required: true;
                type: 'GadgetID';
            };
            shopifySync: {
                required: false;
                type: 'AbortShopifySyncInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedAbortShopifySyncVariables | AbortShopifySyncVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['AbortShopifySyncInput'];
        optionsType: AbortShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    bulkAbort: {
        /**
          * Executes the bulkAbort action with the given inputs.
          */
        <Options extends AbortShopifySyncOptions>(inputs: (FullyQualifiedAbortShopifySyncVariables | AbortShopifySyncVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, AbortShopifySyncOptions>): Promise<AbortShopifySyncResult<Options>[]>;
        type: 'action';
        operationName: 'bulkAbortShopifySyncs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'abort';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: AbortShopifySyncOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkAbortShopifySyncsInput!]';
            };
        };
        variablesType: (FullyQualifiedAbortShopifySyncVariables | AbortShopifySyncVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    complete: {
        /**
         * Executes the complete actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.complete("1", {
          *   domain: "example value for domain",
          *   errorDetails: "example value for errorDetails",
          *   errorMessage: "example value for errorMessage",
          *   force: true,
          *   syncSince: "2025-09-01T00:00:00.000+00:00",
          * });
        **/
        <Options extends CompleteShopifySyncOptions>(id: string, variables: CompleteShopifySyncVariables, options?: LimitToKnownKeys<Options, CompleteShopifySyncOptions>): Promise<CompleteShopifySyncResult<Options>>;
        /**
         * Executes the complete actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.complete("1", {
          *   shopifySync: {
          *     domain: "example value for domain",
          *     errorDetails: "example value for errorDetails",
          *     errorMessage: "example value for errorMessage",
          *     force: true,
          *     syncSince: "2025-09-01T00:00:00.000+00:00",
          *   },
          * });
        **/
        <Options extends CompleteShopifySyncOptions>(id: string, variables: FullyQualifiedCompleteShopifySyncVariables, options?: LimitToKnownKeys<Options, CompleteShopifySyncOptions>): Promise<CompleteShopifySyncResult<Options>>;
        type: 'action';
        operationName: 'completeShopifySync';
        operationReturnType: 'CompleteShopifySync';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: true;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            id: {
                required: true;
                type: 'GadgetID';
            };
            shopifySync: {
                required: false;
                type: 'CompleteShopifySyncInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedCompleteShopifySyncVariables | CompleteShopifySyncVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['CompleteShopifySyncInput'];
        optionsType: CompleteShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    bulkComplete: {
        /**
          * Executes the bulkComplete action with the given inputs.
          */
        <Options extends CompleteShopifySyncOptions>(inputs: (FullyQualifiedCompleteShopifySyncVariables | CompleteShopifySyncVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, CompleteShopifySyncOptions>): Promise<CompleteShopifySyncResult<Options>[]>;
        type: 'action';
        operationName: 'bulkCompleteShopifySyncs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'complete';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: CompleteShopifySyncOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkCompleteShopifySyncsInput!]';
            };
        };
        variablesType: (FullyQualifiedCompleteShopifySyncVariables | CompleteShopifySyncVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    error: {
        /**
         * Executes the error actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.error("1", {
          *   domain: "example value for domain",
          *   errorDetails: "example value for errorDetails",
          *   errorMessage: "example value for errorMessage",
          *   force: true,
          *   syncSince: "2025-09-01T00:00:00.000+00:00",
          * });
        **/
        <Options extends ErrorShopifySyncOptions>(id: string, variables: ErrorShopifySyncVariables, options?: LimitToKnownKeys<Options, ErrorShopifySyncOptions>): Promise<ErrorShopifySyncResult<Options>>;
        /**
         * Executes the error actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.error("1", {
          *   shopifySync: {
          *     domain: "example value for domain",
          *     errorDetails: "example value for errorDetails",
          *     errorMessage: "example value for errorMessage",
          *     force: true,
          *     syncSince: "2025-09-01T00:00:00.000+00:00",
          *   },
          * });
        **/
        <Options extends ErrorShopifySyncOptions>(id: string, variables: FullyQualifiedErrorShopifySyncVariables, options?: LimitToKnownKeys<Options, ErrorShopifySyncOptions>): Promise<ErrorShopifySyncResult<Options>>;
        type: 'action';
        operationName: 'errorShopifySync';
        operationReturnType: 'ErrorShopifySync';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: true;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            id: {
                required: true;
                type: 'GadgetID';
            };
            shopifySync: {
                required: false;
                type: 'ErrorShopifySyncInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedErrorShopifySyncVariables | ErrorShopifySyncVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['ErrorShopifySyncInput'];
        optionsType: ErrorShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    bulkError: {
        /**
          * Executes the bulkError action with the given inputs.
          */
        <Options extends ErrorShopifySyncOptions>(inputs: (FullyQualifiedErrorShopifySyncVariables | ErrorShopifySyncVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, ErrorShopifySyncOptions>): Promise<ErrorShopifySyncResult<Options>[]>;
        type: 'action';
        operationName: 'bulkErrorShopifySyncs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'error';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: ErrorShopifySyncOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkErrorShopifySyncsInput!]';
            };
        };
        variablesType: (FullyQualifiedErrorShopifySyncVariables | ErrorShopifySyncVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    run: {
        /**
         * Executes the run action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.run({
          *   domain: "example value for domain",
          *   errorDetails: "example value for errorDetails",
          *   errorMessage: "example value for errorMessage",
          *   shop: {
          *     _link: "1",
          *   },
          *   startReason: "example value for startReason",
          *   syncSince: "2025-09-01T00:00:00.000+00:00",
          * });
        **/
        <Options extends RunShopifySyncOptions>(variables: RunShopifySyncVariables, options?: LimitToKnownKeys<Options, RunShopifySyncOptions>): Promise<RunShopifySyncResult<Options>>;
        /**
         * Executes the run action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const shopifySyncRecord = await api.shopifySync.run({
          *   shopifySync: {
          *     domain: "example value for domain",
          *     errorDetails: "example value for errorDetails",
          *     errorMessage: "example value for errorMessage",
          *     shop: {
          *       _link: "1",
          *     },
          *     syncSince: "2025-09-01T00:00:00.000+00:00",
          *   },
          *   startReason: "example value for startReason",
          * });
        **/
        <Options extends RunShopifySyncOptions>(variables: FullyQualifiedRunShopifySyncVariables, options?: LimitToKnownKeys<Options, RunShopifySyncOptions>): Promise<RunShopifySyncResult<Options>>;
        type: 'action';
        operationName: 'runShopifySync';
        operationReturnType: 'RunShopifySync';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: false;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            shopifySync: {
                required: false;
                type: 'RunShopifySyncInput';
            };
            startReason: {
                required: false;
                type: 'String';
            };
        };
        variablesType: (((FullyQualifiedRunShopifySyncVariables | RunShopifySyncVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['RunShopifySyncInput', 'Scalars'];
        optionsType: RunShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    bulkRun: {
        /**
          * Executes the bulkRun action with the given inputs.
          */
        <Options extends RunShopifySyncOptions>(inputs: (FullyQualifiedRunShopifySyncVariables | RunShopifySyncVariables)[], options?: LimitToKnownKeys<Options, RunShopifySyncOptions>): Promise<RunShopifySyncResult<Options>[]>;
        type: 'action';
        operationName: 'bulkRunShopifySyncs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'run';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: RunShopifySyncOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkRunShopifySyncsInput!]';
            };
        };
        variablesType: (FullyQualifiedRunShopifySyncVariables | RunShopifySyncVariables)[];
        paramOnlyVariables: [];
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    upsert: {
        /**
         * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const result = await api.shopifySync.upsert({
          *   domain: "example value for domain",
          *   errorDetails: "example value for errorDetails",
          *   id: "1",
          *   shop: {
          *     _link: "1",
          *   },
          *   startReason: "example value for startReason",
          *   syncSince: "2025-09-01T00:00:00.000+00:00",
          * });
        **/
        <Options extends UpsertShopifySyncOptions>(variables: UpsertShopifySyncVariables, options?: LimitToKnownKeys<Options, UpsertShopifySyncOptions>): Promise<UpsertShopifySyncResult<Options>>;
        /**
         * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const result = await api.shopifySync.upsert({
          *   shopifySync: {
          *     domain: "example value for domain",
          *     errorDetails: "example value for errorDetails",
          *     id: "1",
          *     shop: {
          *       _link: "1",
          *     },
          *     syncSince: "2025-09-01T00:00:00.000+00:00",
          *   },
          *   startReason: "example value for startReason",
          * });
        **/
        <Options extends UpsertShopifySyncOptions>(variables: FullyQualifiedUpsertShopifySyncVariables, options?: LimitToKnownKeys<Options, UpsertShopifySyncOptions>): Promise<UpsertShopifySyncResult<Options>>;
        type: 'action';
        operationName: 'upsertShopifySync';
        operationReturnType: 'UpsertShopifySync';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: false;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            on: {
                required: false;
                type: '[String!]';
            };
            shopifySync: {
                required: false;
                type: 'UpsertShopifySyncInput';
            };
            startReason: {
                required: false;
                type: 'String';
            };
        };
        variablesType: (((FullyQualifiedUpsertShopifySyncVariables | UpsertShopifySyncVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: ['on'];
        hasReturnType: {
            '... on RunShopifySyncResult': {
                hasReturnType: false;
            };
            '... on AbortShopifySyncResult': {
                hasReturnType: false;
            };
        };
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['Scalars', 'UpsertShopifySyncInput'];
        optionsType: UpsertShopifySyncOptions;
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
    bulkUpsert: {
        /**
          * Executes the bulkUpsert action with the given inputs.
          */
        <Options extends UpsertShopifySyncOptions>(inputs: (FullyQualifiedUpsertShopifySyncVariables | UpsertShopifySyncVariables)[], options?: LimitToKnownKeys<Options, UpsertShopifySyncOptions>): Promise<any[]>;
        type: 'action';
        operationName: 'bulkUpsertShopifySyncs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'upsert';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: UpsertShopifySyncOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpsertShopifySyncsInput!]';
            };
        };
        variablesType: (FullyQualifiedUpsertShopifySyncVariables | UpsertShopifySyncVariables)[];
        paramOnlyVariables: ['on'];
        selectionType: AvailableShopifySyncSelection;
        schemaType: Query["shopifySync"];
        defaultSelection: typeof DefaultShopifySyncSelection;
    };
};
/**
 * A manager for the shopifySync model with all the available operations for reading and writing to it.*/
export declare const ShopifySyncManager: {
    new (connection: GadgetConnection): ShopifySyncManager;
};
export {};
