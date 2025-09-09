import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, IDsList, PromiseOrLiveIterator, DeliveryCharges, AvailableDeliveryChargesSelection, DeliveryChargesSort, DeliveryChargesFilter, CreateDeliveryChargesInput, UpdateDeliveryChargesInput, Scalars, UpsertDeliveryChargesInput } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of deliveryCharges. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedDeliveryChargesOrDefault<Options extends Selectable<AvailableDeliveryChargesSelection>> = DeepFilterNever<Select<DeliveryCharges, DefaultSelection<AvailableDeliveryChargesSelection, Options, typeof DefaultDeliveryChargesSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for deliveryCharges.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: DeliveryChargesRecord, recordWithName: DeliveryChargesRecord<{ select: { name: true; } }>) => {
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
export type DeliveryChargesRecord<Selection extends AvailableDeliveryChargesSelection | undefined = typeof DefaultDeliveryChargesSelection> = DeepFilterNever<GadgetRecord<SelectedDeliveryChargesOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultDeliveryChargesSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly currency: true;
    readonly lastUpdated: true;
    readonly senditCharge: true;
    readonly shopId: true;
    readonly speedafCharge: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "deliveryCharges";
declare const pluralModelApiIdentifier: "deliveryChargess";
/** Options that can be passed to the `DeliveryChargesManager#findOne` method */
export interface FindOneDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `DeliveryChargesManager#maybeFindOne` method */
export interface MaybeFindOneDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `DeliveryChargesManager#findMany` method */
export interface FindManyDeliveryChargessOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: DeliveryChargesSort | DeliveryChargesSort[] | null;
    /** Only return records matching these filters. */
    filter?: DeliveryChargesFilter | DeliveryChargesFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `DeliveryChargesManager#findFirst` method */
export interface FindFirstDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: DeliveryChargesSort | DeliveryChargesSort[] | null;
    /** Only return records matching these filters. */
    filter?: DeliveryChargesFilter | DeliveryChargesFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `DeliveryChargesManager#maybeFindFirst` method */
export interface MaybeFindFirstDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: DeliveryChargesSort | DeliveryChargesSort[] | null;
    /** Only return records matching these filters. */
    filter?: DeliveryChargesFilter | DeliveryChargesFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
}
export interface UpdateDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
}
export interface DeleteDeliveryChargesOptions {
}
export interface UpsertDeliveryChargesOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableDeliveryChargesSelection;
}
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateDeliveryChargesVariables = {
    deliveryCharges?: CreateDeliveryChargesInput;
};
/**
 * The inputs for executing create on deliveryCharges.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateDeliveryChargesVariables = CreateDeliveryChargesInput;
/**
 * The return value from executing create on deliveryCharges
 * Is a GadgetRecord of the model's type.
 **/
export type CreateDeliveryChargesResult<Options extends CreateDeliveryChargesOptions> = SelectedDeliveryChargesOrDefault<Options> extends void ? void : GadgetRecord<SelectedDeliveryChargesOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateDeliveryChargesVariables = {
    deliveryCharges?: UpdateDeliveryChargesInput;
};
/**
 * The inputs for executing update on deliveryCharges.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateDeliveryChargesVariables = UpdateDeliveryChargesInput;
/**
 * The return value from executing update on deliveryCharges
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateDeliveryChargesResult<Options extends UpdateDeliveryChargesOptions> = SelectedDeliveryChargesOrDefault<Options> extends void ? void : GadgetRecord<SelectedDeliveryChargesOrDefault<Options>>;
/**
 * The return value from executing delete on deliveryCharges
 * Is void because this action deletes the record
 **/
export type DeleteDeliveryChargesResult<Options extends DeleteDeliveryChargesOptions> = void;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertDeliveryChargesVariables = {
    on?: ((Scalars['String'] | null))[];
    deliveryCharges?: UpsertDeliveryChargesInput;
};
/**
 * The inputs for executing upsert on deliveryCharges.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertDeliveryChargesVariables = Omit<UpsertDeliveryChargesInput, "on"> & {
    on?: ((Scalars['String'] | null))[];
};
/**
 * The return value from executing upsert on deliveryCharges
 *
 **/
export type UpsertDeliveryChargesResult<Options extends UpsertDeliveryChargesOptions> = SelectedDeliveryChargesOrDefault<Options> extends void ? void : GadgetRecord<SelectedDeliveryChargesOrDefault<Options>>;
/**
 * A manager for the deliveryCharges model with all the available operations for reading and writing to it.*/
export type DeliveryChargesManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one deliveryCharges by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneDeliveryChargesOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneDeliveryChargesOptions>): PromiseOrLiveIterator<Options, DeliveryChargesRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        optionsType: FindOneDeliveryChargesOptions;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    maybeFindOne: {
        /**
         * Finds one deliveryCharges by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneDeliveryChargesOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneDeliveryChargesOptions>): PromiseOrLiveIterator<Options, DeliveryChargesRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneDeliveryChargesOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    findMany: {
        /**
         * Finds many deliveryCharges. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyDeliveryChargessOptions>(options?: LimitToKnownKeys<Options, FindManyDeliveryChargessOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<DeliveryChargesRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyDeliveryChargessOptions;
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    findFirst: {
        /**
         * Finds the first matching deliveryCharges. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstDeliveryChargesOptions>(options?: LimitToKnownKeys<Options, FindFirstDeliveryChargesOptions>): PromiseOrLiveIterator<Options, DeliveryChargesRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstDeliveryChargesOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching deliveryCharges. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstDeliveryChargesOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstDeliveryChargesOptions>): PromiseOrLiveIterator<Options, DeliveryChargesRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstDeliveryChargesOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    findById: {
        /**
        * Finds one deliveryCharges by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneDeliveryChargesOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneDeliveryChargesOptions>): PromiseOrLiveIterator<Options, DeliveryChargesRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneDeliveryChargesOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    maybeFindById: {
        /**
        * Finds one deliveryCharges by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneDeliveryChargesOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneDeliveryChargesOptions>): Promise<DeliveryChargesRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneDeliveryChargesOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultDeliveryChargesSelection;
        namespace: null;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
    };
    create: {
        /**
         * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const deliveryChargesRecord = await api.deliveryCharges.create({
          *   currency: "example value for currency",
          *   lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *   senditCharge: 123,
          *   shop: {
          *     _link: "1",
          *   },
          *   speedafCharge: 123,
          * });
        **/
        <Options extends CreateDeliveryChargesOptions>(variables: CreateDeliveryChargesVariables, options?: LimitToKnownKeys<Options, CreateDeliveryChargesOptions>): Promise<CreateDeliveryChargesResult<Options>>;
        /**
         * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const deliveryChargesRecord = await api.deliveryCharges.create({
          *   deliveryCharges: {
          *     currency: "example value for currency",
          *     lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *     senditCharge: 123,
          *     shop: {
          *       _link: "1",
          *     },
          *     speedafCharge: 123,
          *   },
          * });
        **/
        <Options extends CreateDeliveryChargesOptions>(variables: FullyQualifiedCreateDeliveryChargesVariables, options?: LimitToKnownKeys<Options, CreateDeliveryChargesOptions>): Promise<CreateDeliveryChargesResult<Options>>;
        type: 'action';
        operationName: 'createDeliveryCharges';
        operationReturnType: 'CreateDeliveryCharges';
        namespace: null;
        modelApiIdentifier: typeof modelApiIdentifier;
        operatesWithRecordIdentity: false;
        modelSelectionField: typeof modelApiIdentifier;
        isBulk: false;
        isDeleter: false;
        variables: {
            deliveryCharges: {
                required: false;
                type: 'CreateDeliveryChargesInput';
            };
        };
        variablesType: (((FullyQualifiedCreateDeliveryChargesVariables | CreateDeliveryChargesVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['CreateDeliveryChargesInput'];
        optionsType: CreateDeliveryChargesOptions;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
    bulkCreate: {
        /**
          * Executes the bulkCreate action with the given inputs.
          */
        <Options extends CreateDeliveryChargesOptions>(inputs: (FullyQualifiedCreateDeliveryChargesVariables | CreateDeliveryChargesVariables)[], options?: LimitToKnownKeys<Options, CreateDeliveryChargesOptions>): Promise<CreateDeliveryChargesResult<Options>[]>;
        type: 'action';
        operationName: 'bulkCreateDeliveryCharges';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: CreateDeliveryChargesOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkCreateDeliveryChargesInput!]';
            };
        };
        variablesType: (FullyQualifiedCreateDeliveryChargesVariables | CreateDeliveryChargesVariables)[];
        paramOnlyVariables: [];
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
    update: {
        /**
         * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the flat style, all-params-together overload that most use cases should use.
        *
        * @example
        * * const deliveryChargesRecord = await api.deliveryCharges.update("1", {
          *   currency: "example value for currency",
          *   lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *   senditCharge: 123,
          *   shop: {
          *     _link: "1",
          *   },
          *   speedafCharge: 123,
          * });
        **/
        <Options extends UpdateDeliveryChargesOptions>(id: string, variables: UpdateDeliveryChargesVariables, options?: LimitToKnownKeys<Options, UpdateDeliveryChargesOptions>): Promise<UpdateDeliveryChargesResult<Options>>;
        /**
         * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const deliveryChargesRecord = await api.deliveryCharges.update("1", {
          *   deliveryCharges: {
          *     currency: "example value for currency",
          *     lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *     senditCharge: 123,
          *     shop: {
          *       _link: "1",
          *     },
          *     speedafCharge: 123,
          *   },
          * });
        **/
        <Options extends UpdateDeliveryChargesOptions>(id: string, variables: FullyQualifiedUpdateDeliveryChargesVariables, options?: LimitToKnownKeys<Options, UpdateDeliveryChargesOptions>): Promise<UpdateDeliveryChargesResult<Options>>;
        type: 'action';
        operationName: 'updateDeliveryCharges';
        operationReturnType: 'UpdateDeliveryCharges';
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
            deliveryCharges: {
                required: false;
                type: 'UpdateDeliveryChargesInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedUpdateDeliveryChargesVariables | UpdateDeliveryChargesVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['UpdateDeliveryChargesInput'];
        optionsType: UpdateDeliveryChargesOptions;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
    bulkUpdate: {
        /**
          * Executes the bulkUpdate action with the given inputs.
          */
        <Options extends UpdateDeliveryChargesOptions>(inputs: (FullyQualifiedUpdateDeliveryChargesVariables | UpdateDeliveryChargesVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, UpdateDeliveryChargesOptions>): Promise<UpdateDeliveryChargesResult<Options>[]>;
        type: 'action';
        operationName: 'bulkUpdateDeliveryCharges';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: UpdateDeliveryChargesOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpdateDeliveryChargesInput!]';
            };
        };
        variablesType: (FullyQualifiedUpdateDeliveryChargesVariables | UpdateDeliveryChargesVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
    delete: {
        /**
         * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * await api.deliveryCharges.delete("1");
        **/
        <Options extends DeleteDeliveryChargesOptions>(id: string, options?: LimitToKnownKeys<Options, DeleteDeliveryChargesOptions>): Promise<DeleteDeliveryChargesResult<Options>>;
        type: 'action';
        operationName: 'deleteDeliveryCharges';
        operationReturnType: 'DeleteDeliveryCharges';
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
        optionsType: DeleteDeliveryChargesOptions;
        selectionType: Record<string, never>;
        schemaType: null;
        defaultSelection: null;
    };
    bulkDelete: {
        /**
          * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
          */
        <Options extends DeleteDeliveryChargesOptions>(ids: string[], options?: LimitToKnownKeys<Options, DeleteDeliveryChargesOptions>): Promise<DeleteDeliveryChargesResult<Options>[]>;
        type: 'action';
        operationName: 'bulkDeleteDeliveryCharges';
        isBulk: true;
        isDeleter: true;
        hasReturnType: false;
        acceptsModelInput: false;
        operatesWithRecordIdentity: true;
        singleActionFunctionName: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: DeleteDeliveryChargesOptions;
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
        * * const result = await api.deliveryCharges.upsert({
          *   currency: "example value for currency",
          *   id: "1",
          *   lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *   senditCharge: 123,
          *   shop: {
          *     _link: "1",
          *   },
          * });
        **/
        <Options extends UpsertDeliveryChargesOptions>(variables: UpsertDeliveryChargesVariables, options?: LimitToKnownKeys<Options, UpsertDeliveryChargesOptions>): Promise<UpsertDeliveryChargesResult<Options>>;
        /**
         * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
        *
        * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
        *
        * @example
        * * const result = await api.deliveryCharges.upsert({
          *   deliveryCharges: {
          *     currency: "example value for currency",
          *     id: "1",
          *     lastUpdated: "2025-09-01T00:00:00.000+00:00",
          *     senditCharge: 123,
          *     shop: {
          *       _link: "1",
          *     },
          *   },
          * });
        **/
        <Options extends UpsertDeliveryChargesOptions>(variables: FullyQualifiedUpsertDeliveryChargesVariables, options?: LimitToKnownKeys<Options, UpsertDeliveryChargesOptions>): Promise<UpsertDeliveryChargesResult<Options>>;
        type: 'action';
        operationName: 'upsertDeliveryCharges';
        operationReturnType: 'UpsertDeliveryCharges';
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
            deliveryCharges: {
                required: false;
                type: 'UpsertDeliveryChargesInput';
            };
        };
        variablesType: (((FullyQualifiedUpsertDeliveryChargesVariables | UpsertDeliveryChargesVariables)) | undefined);
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: ['on'];
        hasReturnType: {
            '... on CreateDeliveryChargesResult': {
                hasReturnType: false;
            };
            '... on UpdateDeliveryChargesResult': {
                hasReturnType: false;
            };
        };
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['Scalars', 'UpsertDeliveryChargesInput'];
        optionsType: UpsertDeliveryChargesOptions;
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
    bulkUpsert: {
        /**
          * Executes the bulkUpsert action with the given inputs.
          */
        <Options extends UpsertDeliveryChargesOptions>(inputs: (FullyQualifiedUpsertDeliveryChargesVariables | UpsertDeliveryChargesVariables)[], options?: LimitToKnownKeys<Options, UpsertDeliveryChargesOptions>): Promise<any[]>;
        type: 'action';
        operationName: 'bulkUpsertDeliveryCharges';
        isBulk: true;
        isDeleter: false;
        hasReturnType: false;
        acceptsModelInput: true;
        operatesWithRecordIdentity: false;
        singleActionFunctionName: 'upsert';
        modelApiIdentifier: typeof modelApiIdentifier;
        modelSelectionField: typeof pluralModelApiIdentifier;
        optionsType: UpsertDeliveryChargesOptions;
        namespace: null;
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpsertDeliveryChargesInput!]';
            };
        };
        variablesType: (FullyQualifiedUpsertDeliveryChargesVariables | UpsertDeliveryChargesVariables)[];
        paramOnlyVariables: ['on'];
        selectionType: AvailableDeliveryChargesSelection;
        schemaType: Query["deliveryCharges"];
        defaultSelection: typeof DefaultDeliveryChargesSelection;
    };
};
/**
 * A manager for the deliveryCharges model with all the available operations for reading and writing to it.*/
export declare const DeliveryChargesManager: {
    new (connection: GadgetConnection): DeliveryChargesManager;
};
export {};
