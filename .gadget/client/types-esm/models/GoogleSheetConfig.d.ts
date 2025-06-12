import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, IDsList, PromiseOrLiveIterator, GoogleSheetConfig, AvailableGoogleSheetConfigSelection, GoogleSheetConfigSort, GoogleSheetConfigFilter, CreateGoogleSheetConfigInput, UpdateGoogleSheetConfigInput, Scalars, UpsertGoogleSheetConfigInput } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of googleSheetConfig. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedGoogleSheetConfigOrDefault<Options extends Selectable<AvailableGoogleSheetConfigSelection>> = DeepFilterNever<Select<GoogleSheetConfig, DefaultSelection<AvailableGoogleSheetConfigSelection, Options, typeof DefaultGoogleSheetConfigSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for googleSheetConfig.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: GoogleSheetConfigRecord, recordWithName: GoogleSheetConfigRecord<{ select: { name: true; } }>) => {
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
export type GoogleSheetConfigRecord<Selection extends AvailableGoogleSheetConfigSelection | undefined = typeof DefaultGoogleSheetConfigSelection> = DeepFilterNever<GadgetRecord<SelectedGoogleSheetConfigOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultGoogleSheetConfigSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly courierApiKey: true;
    readonly courierApiProvider: true;
    readonly createdAt: true;
    readonly customerSheetName: true;
    readonly orderSheetName: true;
    readonly shopId: true;
    readonly spreadsheetId: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "googleSheetConfig";
declare const pluralModelApiIdentifier: "googleSheetConfigs";
/** Options that can be passed to the `GoogleSheetConfigManager#findOne` method */
export interface FindOneGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `GoogleSheetConfigManager#maybeFindOne` method */
export interface MaybeFindOneGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `GoogleSheetConfigManager#findMany` method */
export interface FindManyGoogleSheetConfigsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: GoogleSheetConfigSort | GoogleSheetConfigSort[] | null;
    /** Only return records matching these filters. */
    filter?: GoogleSheetConfigFilter | GoogleSheetConfigFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `GoogleSheetConfigManager#findFirst` method */
export interface FindFirstGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: GoogleSheetConfigSort | GoogleSheetConfigSort[] | null;
    /** Only return records matching these filters. */
    filter?: GoogleSheetConfigFilter | GoogleSheetConfigFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `GoogleSheetConfigManager#maybeFindFirst` method */
export interface MaybeFindFirstGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: GoogleSheetConfigSort | GoogleSheetConfigSort[] | null;
    /** Only return records matching these filters. */
    filter?: GoogleSheetConfigFilter | GoogleSheetConfigFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
}
export interface UpdateGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
}
export interface DeleteGoogleSheetConfigOptions {
}
export interface UpsertGoogleSheetConfigOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableGoogleSheetConfigSelection;
}
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateGoogleSheetConfigVariables = {
    googleSheetConfig?: CreateGoogleSheetConfigInput;
};
/**
 * The inputs for executing create on googleSheetConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateGoogleSheetConfigVariables = CreateGoogleSheetConfigInput;
/**
 * The return value from executing create on googleSheetConfig
 * Is a GadgetRecord of the model's type.
 **/
export type CreateGoogleSheetConfigResult<Options extends CreateGoogleSheetConfigOptions> = SelectedGoogleSheetConfigOrDefault<Options> extends void ? void : GadgetRecord<SelectedGoogleSheetConfigOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateGoogleSheetConfigVariables = {
    googleSheetConfig?: UpdateGoogleSheetConfigInput;
};
/**
 * The inputs for executing update on googleSheetConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateGoogleSheetConfigVariables = UpdateGoogleSheetConfigInput;
/**
 * The return value from executing update on googleSheetConfig
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateGoogleSheetConfigResult<Options extends UpdateGoogleSheetConfigOptions> = SelectedGoogleSheetConfigOrDefault<Options> extends void ? void : GadgetRecord<SelectedGoogleSheetConfigOrDefault<Options>>;
/**
 * The return value from executing delete on googleSheetConfig
 * Is void because this action deletes the record
 **/
export type DeleteGoogleSheetConfigResult<Options extends DeleteGoogleSheetConfigOptions> = void;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertGoogleSheetConfigVariables = {
    on?: ((Scalars['String'] | null))[];
    googleSheetConfig?: UpsertGoogleSheetConfigInput;
};
/**
 * The inputs for executing upsert on googleSheetConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertGoogleSheetConfigVariables = Omit<UpsertGoogleSheetConfigInput, "on"> & {
    on?: ((Scalars['String'] | null))[];
};
/**
 * The return value from executing upsert on googleSheetConfig
 *
 **/
export type UpsertGoogleSheetConfigResult<Options extends UpsertGoogleSheetConfigOptions> = SelectedGoogleSheetConfigOrDefault<Options> extends void ? void : GadgetRecord<SelectedGoogleSheetConfigOrDefault<Options>>;
/**
 * A manager for the googleSheetConfig model with all the available operations for reading and writing to it.*/
export type GoogleSheetConfigManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one googleSheetConfig by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneGoogleSheetConfigOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneGoogleSheetConfigOptions>): PromiseOrLiveIterator<Options, GoogleSheetConfigRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        optionsType: FindOneGoogleSheetConfigOptions;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    maybeFindOne: {
        /**
         * Finds one googleSheetConfig by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneGoogleSheetConfigOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneGoogleSheetConfigOptions>): PromiseOrLiveIterator<Options, GoogleSheetConfigRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneGoogleSheetConfigOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    findMany: {
        /**
         * Finds many googleSheetConfig. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyGoogleSheetConfigsOptions>(options?: LimitToKnownKeys<Options, FindManyGoogleSheetConfigsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<GoogleSheetConfigRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyGoogleSheetConfigsOptions;
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    findFirst: {
        /**
         * Finds the first matching googleSheetConfig. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstGoogleSheetConfigOptions>(options?: LimitToKnownKeys<Options, FindFirstGoogleSheetConfigOptions>): PromiseOrLiveIterator<Options, GoogleSheetConfigRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstGoogleSheetConfigOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching googleSheetConfig. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstGoogleSheetConfigOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstGoogleSheetConfigOptions>): PromiseOrLiveIterator<Options, GoogleSheetConfigRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstGoogleSheetConfigOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    findById: {
        /**
        * Finds one googleSheetConfig by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneGoogleSheetConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneGoogleSheetConfigOptions>): PromiseOrLiveIterator<Options, GoogleSheetConfigRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneGoogleSheetConfigOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    maybeFindById: {
        /**
        * Finds one googleSheetConfig by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneGoogleSheetConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneGoogleSheetConfigOptions>): Promise<GoogleSheetConfigRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneGoogleSheetConfigOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
        namespace: null;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
    };
    create: {
        /**
         * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const googleSheetConfigRecord = await api.googleSheetConfig.create({
          *   courierApiProvider: "example value for courierApiProvider",
          *   customerSheetName: "example value for customerSheetName",
          *   orderSheetName: "example value for orderSheetName",
          *   shop: {
          *     _link: "1",
          *   },
          *   spreadsheetId: "example value for spreadsheetId",
          * });
        **/
        <Options extends CreateGoogleSheetConfigOptions>(variables: CreateGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, CreateGoogleSheetConfigOptions>): Promise<CreateGoogleSheetConfigResult<Options>>;
        /**
         * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const googleSheetConfigRecord = await api.googleSheetConfig.create({
          *   googleSheetConfig: {
          *     courierApiProvider: "example value for courierApiProvider",
          *     customerSheetName: "example value for customerSheetName",
          *     orderSheetName: "example value for orderSheetName",
          *     shop: {
          *       _link: "1",
          *     },
          *     spreadsheetId: "example value for spreadsheetId",
          *   },
          * });
        **/
        <Options extends CreateGoogleSheetConfigOptions>(variables: FullyQualifiedCreateGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, CreateGoogleSheetConfigOptions>): Promise<CreateGoogleSheetConfigResult<Options>>;
        type: 'action';
        operationName: 'createGoogleSheetConfig';
        operationReturnType: 'CreateGoogleSheetConfig';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: false;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            googleSheetConfig: {
                required: false;
                type: 'CreateGoogleSheetConfigInput';
            };
        };
        variablesType: (((FullyQualifiedCreateGoogleSheetConfigVariables | CreateGoogleSheetConfigVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['CreateGoogleSheetConfigInput'];
        optionsType: CreateGoogleSheetConfigOptions;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
    bulkCreate: {
        /**
          * Executes the bulkCreate action with the given inputs.
          */
        <Options extends CreateGoogleSheetConfigOptions>(inputs: (FullyQualifiedCreateGoogleSheetConfigVariables | CreateGoogleSheetConfigVariables)[], options?: LimitToKnownKeys<Options, CreateGoogleSheetConfigOptions>): Promise<CreateGoogleSheetConfigResult<Options>[]>;
        type: 'action';
        operationName: 'bulkCreateGoogleSheetConfigs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: CreateGoogleSheetConfigOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkCreateGoogleSheetConfigsInput!]';
            };
        };
        variablesType: (FullyQualifiedCreateGoogleSheetConfigVariables | CreateGoogleSheetConfigVariables)[];
        paramOnlyVariables: [];
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
    update: {
        /**
         * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const googleSheetConfigRecord = await api.googleSheetConfig.update("1", {
          *   courierApiProvider: "example value for courierApiProvider",
          *   customerSheetName: "example value for customerSheetName",
          *   orderSheetName: "example value for orderSheetName",
          *   shop: {
          *     _link: "1",
          *   },
          *   spreadsheetId: "example value for spreadsheetId",
          * });
        **/
        <Options extends UpdateGoogleSheetConfigOptions>(id: string, variables: UpdateGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, UpdateGoogleSheetConfigOptions>): Promise<UpdateGoogleSheetConfigResult<Options>>;
        /**
         * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const googleSheetConfigRecord = await api.googleSheetConfig.update("1", {
          *   googleSheetConfig: {
          *     courierApiProvider: "example value for courierApiProvider",
          *     customerSheetName: "example value for customerSheetName",
          *     orderSheetName: "example value for orderSheetName",
          *     shop: {
          *       _link: "1",
          *     },
          *     spreadsheetId: "example value for spreadsheetId",
          *   },
          * });
        **/
        <Options extends UpdateGoogleSheetConfigOptions>(id: string, variables: FullyQualifiedUpdateGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, UpdateGoogleSheetConfigOptions>): Promise<UpdateGoogleSheetConfigResult<Options>>;
        type: 'action';
        operationName: 'updateGoogleSheetConfig';
        operationReturnType: 'UpdateGoogleSheetConfig';
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
            googleSheetConfig: {
                required: false;
                type: 'UpdateGoogleSheetConfigInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedUpdateGoogleSheetConfigVariables | UpdateGoogleSheetConfigVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['UpdateGoogleSheetConfigInput'];
        optionsType: UpdateGoogleSheetConfigOptions;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
    bulkUpdate: {
        /**
          * Executes the bulkUpdate action with the given inputs.
          */
        <Options extends UpdateGoogleSheetConfigOptions>(inputs: (FullyQualifiedUpdateGoogleSheetConfigVariables | UpdateGoogleSheetConfigVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, UpdateGoogleSheetConfigOptions>): Promise<UpdateGoogleSheetConfigResult<Options>[]>;
        type: 'action';
        operationName: 'bulkUpdateGoogleSheetConfigs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: UpdateGoogleSheetConfigOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpdateGoogleSheetConfigsInput!]';
            };
        };
        variablesType: (FullyQualifiedUpdateGoogleSheetConfigVariables | UpdateGoogleSheetConfigVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
    delete: {
        /**
         * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * await api.googleSheetConfig.delete("1");
        **/
        <Options extends DeleteGoogleSheetConfigOptions>(id: string, options?: LimitToKnownKeys<Options, DeleteGoogleSheetConfigOptions>): Promise<DeleteGoogleSheetConfigResult<Options>>;
        type: 'action';
        operationName: 'deleteGoogleSheetConfig';
        operationReturnType: 'DeleteGoogleSheetConfig';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: true;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: true;
        variables: {
            id: {
                required: true;
                type: 'GadgetID';
            };
        };
        variablesType: ({
            id: string;
        });
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: false;
        hasCreateOrUpdateEffect: false;
        imports: [];
        optionsType: DeleteGoogleSheetConfigOptions;
        selectionType: Record<string, never>;
        schemaType: null;
        defaultSelection: null;
    };
    bulkDelete: {
        /**
          * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
          */
        <Options extends DeleteGoogleSheetConfigOptions>(ids: string[], options?: LimitToKnownKeys<Options, DeleteGoogleSheetConfigOptions>): Promise<DeleteGoogleSheetConfigResult<Options>[]>;
        type: 'action';
        operationName: 'bulkDeleteGoogleSheetConfigs';
        isBulk: true;
        isDeleter: true;
        hasReturnType: false;
        acceptsModelInput: false;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: DeleteGoogleSheetConfigOptions;
        namespace: null;
        variables: {
            ids: {
                required: true;
                type: '[GadgetID!]';
            };
        };
        variablesType: IDsList | undefined;
        paramOnlyVariables: [];
        selectionType: Record<string, never>;
        schemaType: null;
        defaultSelection: null;
    };
    upsert: {
        /**
         * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const result = await api.googleSheetConfig.upsert({
          *   customerSheetName: "example value for customerSheetName",
          *   id: "1",
          *   orderSheetName: "example value for orderSheetName",
          *   shop: {
          *     _link: "1",
          *   },
          *   spreadsheetId: "example value for spreadsheetId",
          * });
        **/
        <Options extends UpsertGoogleSheetConfigOptions>(variables: UpsertGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, UpsertGoogleSheetConfigOptions>): Promise<UpsertGoogleSheetConfigResult<Options>>;
        /**
         * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const result = await api.googleSheetConfig.upsert({
          *   googleSheetConfig: {
          *     customerSheetName: "example value for customerSheetName",
          *     id: "1",
          *     orderSheetName: "example value for orderSheetName",
          *     shop: {
          *       _link: "1",
          *     },
          *     spreadsheetId: "example value for spreadsheetId",
          *   },
          * });
        **/
        <Options extends UpsertGoogleSheetConfigOptions>(variables: FullyQualifiedUpsertGoogleSheetConfigVariables, options?: LimitToKnownKeys<Options, UpsertGoogleSheetConfigOptions>): Promise<UpsertGoogleSheetConfigResult<Options>>;
        type: 'action';
        operationName: 'upsertGoogleSheetConfig';
        operationReturnType: 'UpsertGoogleSheetConfig';
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
            googleSheetConfig: {
                required: false;
                type: 'UpsertGoogleSheetConfigInput';
            };
        };
        variablesType: (((FullyQualifiedUpsertGoogleSheetConfigVariables | UpsertGoogleSheetConfigVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: ['on'];
        hasReturnType: {
            '... on CreateGoogleSheetConfigResult': {
                hasReturnType: false;
            };
            '... on UpdateGoogleSheetConfigResult': {
                hasReturnType: false;
            };
        };
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['Scalars', 'UpsertGoogleSheetConfigInput'];
        optionsType: UpsertGoogleSheetConfigOptions;
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
    bulkUpsert: {
        /**
          * Executes the bulkUpsert action with the given inputs.
          */
        <Options extends UpsertGoogleSheetConfigOptions>(inputs: (FullyQualifiedUpsertGoogleSheetConfigVariables | UpsertGoogleSheetConfigVariables)[], options?: LimitToKnownKeys<Options, UpsertGoogleSheetConfigOptions>): Promise<any[]>;
        type: 'action';
        operationName: 'bulkUpsertGoogleSheetConfigs';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'upsert';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: UpsertGoogleSheetConfigOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpsertGoogleSheetConfigsInput!]';
            };
        };
        variablesType: (FullyQualifiedUpsertGoogleSheetConfigVariables | UpsertGoogleSheetConfigVariables)[];
        paramOnlyVariables: ['on'];
        selectionType: AvailableGoogleSheetConfigSelection;
        schemaType: Query["googleSheetConfig"];
        defaultSelection: typeof DefaultGoogleSheetConfigSelection;
    };
};
/**
 * A manager for the googleSheetConfig model with all the available operations for reading and writing to it.*/
export declare const GoogleSheetConfigManager: {
    new (connection: GadgetConnection): GoogleSheetConfigManager;
};
export {};
