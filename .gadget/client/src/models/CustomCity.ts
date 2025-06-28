import {
  GadgetConnection,
  GadgetRecord,
  GadgetRecordImplementation,
  GadgetRecordList,
  GadgetNonUniqueDataError,
  actionRunner,
  findManyRunner,
  findOneRunner,
  findOneByFieldRunner,
  DefaultSelection,
  LimitToKnownKeys,
  Selectable
} from "@gadgetinc/api-client-core";

import {
  Query,
  ExplicitNestingRequired,
  Select,
        DeepFilterNever,
  IDsList,
  PromiseOrLiveIterator,
  CustomCity,
  AvailableCustomCitySelection,
  CustomCitySort,
  CustomCityFilter,
  CreateCustomCityInput,
  UpdateCustomCityInput,
  Scalars,
  UpsertCustomCityInput
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of customCity. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedCustomCityOrDefault<Options extends Selectable<AvailableCustomCitySelection>> = DeepFilterNever<
    Select<
      CustomCity,
      DefaultSelection<
        AvailableCustomCitySelection,
        Options,
        typeof DefaultCustomCitySelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for customCity.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: CustomCityRecord, recordWithName: CustomCityRecord<{ select: { name: true; } }>) => {
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
export type CustomCityRecord<Selection extends AvailableCustomCitySelection | undefined = typeof DefaultCustomCitySelection> = DeepFilterNever<
  GadgetRecord<
    SelectedCustomCityOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultCustomCitySelection = {
     __typename: true,
     id: true,
     addedAt: true,
     courierType: true,
     createdAt: true,
     isActive: true,
     name: true,
     shopId: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "customCity" as const;
const pluralModelApiIdentifier = "customCities" as const;
/** Options that can be passed to the `CustomCityManager#findOne` method */
 export interface FindOneCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `CustomCityManager#maybeFindOne` method */
 export interface MaybeFindOneCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `CustomCityManager#findMany` method */
 export interface FindManyCustomCitiesOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: CustomCitySort | CustomCitySort[] | null;
  /** Only return records matching these filters. */
  filter?: CustomCityFilter | CustomCityFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `CustomCityManager#findFirst` method */
 export interface FindFirstCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: CustomCitySort | CustomCitySort[] | null;
  /** Only return records matching these filters. */
  filter?: CustomCityFilter | CustomCityFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `CustomCityManager#maybeFindFirst` method */
 export interface MaybeFindFirstCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: CustomCitySort | CustomCitySort[] | null;
  /** Only return records matching these filters. */
  filter?: CustomCityFilter | CustomCityFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
};
export interface UpdateCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
};
export interface DeleteCustomCityOptions {

};
export interface UpsertCustomCityOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableCustomCitySelection;
};
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateCustomCityVariables = {
  customCity?: CreateCustomCityInput;
}
/**
 * The inputs for executing create on customCity.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateCustomCityVariables = CreateCustomCityInput;
/**
 * The return value from executing create on customCity
 * Is a GadgetRecord of the model's type.
 **/
export type CreateCustomCityResult<Options extends CreateCustomCityOptions> = SelectedCustomCityOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedCustomCityOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateCustomCityVariables = {
  customCity?: UpdateCustomCityInput;
}
/**
 * The inputs for executing update on customCity.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateCustomCityVariables = UpdateCustomCityInput;
/**
 * The return value from executing update on customCity
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateCustomCityResult<Options extends UpdateCustomCityOptions> = SelectedCustomCityOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedCustomCityOrDefault<Options>>;
/**
 * The return value from executing delete on customCity
 * Is void because this action deletes the record
 **/
export type DeleteCustomCityResult<Options extends DeleteCustomCityOptions> = void;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertCustomCityVariables = {
  on?: ((Scalars['String'] | null))[];
  customCity?: UpsertCustomCityInput;
}
/**
 * The inputs for executing upsert on customCity.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertCustomCityVariables = Omit<
     UpsertCustomCityInput,
     "on"
   > & {
     on?: ((Scalars['String'] | null))[];
   };
/**
 * The return value from executing upsert on customCity
 *
 **/
export type UpsertCustomCityResult<Options extends UpsertCustomCityOptions> = SelectedCustomCityOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedCustomCityOrDefault<Options>>;

/**
 * A manager for the customCity model with all the available operations for reading and writing to it.*/
export type CustomCityManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one customCity by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneCustomCityOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      optionsType: FindOneCustomCityOptions;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  maybeFindOne: {
      /**
       * Finds one customCity by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneCustomCityOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneCustomCityOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  findMany: {
      /**
       * Finds many customCity. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyCustomCitiesOptions>(options?: LimitToKnownKeys<Options, FindManyCustomCitiesOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<CustomCityRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyCustomCitiesOptions;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  findFirst: {
      /**
       * Finds the first matching customCity. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstCustomCityOptions>(options?: LimitToKnownKeys<Options, FindFirstCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching customCity. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstCustomCityOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  findById: {
      /**
      * Finds one customCity by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneCustomCityOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  maybeFindById: {
      /**
      * Finds one customCity by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneCustomCityOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneCustomCityOptions>): Promise<CustomCityRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  findByName: {
      /**
      * Finds one customCity by its name. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneCustomCityOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneCustomCityOptions>): PromiseOrLiveIterator<Options,CustomCityRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'name';
      findByVariableName: 'name';
      optionsType: FindOneCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  maybeFindByName: {
      /**
      * Finds one customCity by its name. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneCustomCityOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneCustomCityOptions>): Promise<CustomCityRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'name';
      findByVariableName: 'name';
      optionsType: FindOneCustomCityOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultCustomCitySelection;
      namespace: null;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
    }
  create: {
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const customCityRecord = await api.customCity.create({
        *   addedAt: "2025-06-01T00:00:00.000+00:00",
        *   courierType: "sendit",
        *   isActive: true,
        *   name: "example value for name",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends CreateCustomCityOptions>(
      
        variables: CreateCustomCityVariables,
        options?: LimitToKnownKeys<Options, CreateCustomCityOptions>
      ): Promise<CreateCustomCityResult<Options>>;
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const customCityRecord = await api.customCity.create({
        *   customCity: {
        *     addedAt: "2025-06-01T00:00:00.000+00:00",
        *     courierType: "sendit",
        *     isActive: true,
        *     name: "example value for name",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends CreateCustomCityOptions>(
      
        variables: FullyQualifiedCreateCustomCityVariables,
        options?: LimitToKnownKeys<Options, CreateCustomCityOptions>
      ): Promise<CreateCustomCityResult<Options>>;
      type: 'action';
      operationName: 'createCustomCity';
      operationReturnType: 'CreateCustomCity';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: { customCity: { required: false, type: 'CreateCustomCityInput' } };
      variablesType: ((
               
               & (FullyQualifiedCreateCustomCityVariables | CreateCustomCityVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'CreateCustomCityInput' ];
      optionsType: CreateCustomCityOptions;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
  bulkCreate: {
      /**
        * Executes the bulkCreate action with the given inputs.
        */
       <Options extends CreateCustomCityOptions>(
          inputs: (FullyQualifiedCreateCustomCityVariables | CreateCustomCityVariables)[],
          options?: LimitToKnownKeys<Options, CreateCustomCityOptions>
       ): Promise<CreateCustomCityResult<Options>[]>
      type: 'action';
      operationName: 'bulkCreateCustomCities';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: CreateCustomCityOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkCreateCustomCitiesInput!]' } };
      variablesType: (FullyQualifiedCreateCustomCityVariables | CreateCustomCityVariables)[];
      paramOnlyVariables: [];
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
  update: {
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const customCityRecord = await api.customCity.update("1", {
        *   addedAt: "2025-06-01T00:00:00.000+00:00",
        *   courierType: "sendit",
        *   isActive: true,
        *   name: "example value for name",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends UpdateCustomCityOptions>(
        id: string,
        variables: UpdateCustomCityVariables,
        options?: LimitToKnownKeys<Options, UpdateCustomCityOptions>
      ): Promise<UpdateCustomCityResult<Options>>;
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const customCityRecord = await api.customCity.update("1", {
        *   customCity: {
        *     addedAt: "2025-06-01T00:00:00.000+00:00",
        *     courierType: "sendit",
        *     isActive: true,
        *     name: "example value for name",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends UpdateCustomCityOptions>(
        id: string,
        variables: FullyQualifiedUpdateCustomCityVariables,
        options?: LimitToKnownKeys<Options, UpdateCustomCityOptions>
      ): Promise<UpdateCustomCityResult<Options>>;
      type: 'action';
      operationName: 'updateCustomCity';
      operationReturnType: 'UpdateCustomCity';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: true;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          id: { required: true, type: 'GadgetID' },
          customCity: { required: false, type: 'UpdateCustomCityInput' }
        };
      variablesType: (
              { id: string }
              & (FullyQualifiedUpdateCustomCityVariables | UpdateCustomCityVariables)
            );
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'UpdateCustomCityInput' ];
      optionsType: UpdateCustomCityOptions;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
  bulkUpdate: {
      /**
        * Executes the bulkUpdate action with the given inputs.
        */
       <Options extends UpdateCustomCityOptions>(
          inputs: (FullyQualifiedUpdateCustomCityVariables | UpdateCustomCityVariables & { id: string })[],
          options?: LimitToKnownKeys<Options, UpdateCustomCityOptions>
       ): Promise<UpdateCustomCityResult<Options>[]>
      type: 'action';
      operationName: 'bulkUpdateCustomCities';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpdateCustomCityOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkUpdateCustomCitiesInput!]' } };
      variablesType: (FullyQualifiedUpdateCustomCityVariables | UpdateCustomCityVariables & { id: string })[];
      paramOnlyVariables: [];
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
  delete: {
      /**
       * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * await api.customCity.delete("1");
      **/
      <Options extends DeleteCustomCityOptions>(
        id: string,
      
        options?: LimitToKnownKeys<Options, DeleteCustomCityOptions>
      ): Promise<DeleteCustomCityResult<Options>>;
      type: 'action';
      operationName: 'deleteCustomCity';
      operationReturnType: 'DeleteCustomCity';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: true;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: true;
      variables: { id: { required: true, type: 'GadgetID' } };
      variablesType: (
              { id: string }
              
            );
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: false;
      hasCreateOrUpdateEffect: false;
      imports: [];
      optionsType: DeleteCustomCityOptions;
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
  bulkDelete: {
      /**
        * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
        */
       <Options extends DeleteCustomCityOptions>(
          ids: string[],
          options?: LimitToKnownKeys<Options, DeleteCustomCityOptions>
       ): Promise<DeleteCustomCityResult<Options>[]>
      type: 'action';
      operationName: 'bulkDeleteCustomCities';
      isBulk: true;
      isDeleter: true;
      hasReturnType: false;
      acceptsModelInput: false;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: DeleteCustomCityOptions;
      namespace: null;
      variables: { ids: { required: true, type: '[GadgetID!]' } };
      variablesType: IDsList | undefined;
      paramOnlyVariables: [];
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
  upsert: {
      /**
       * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const result = await api.customCity.upsert({
        *   courierType: "sendit",
        *   id: "1",
        *   isActive: true,
        *   name: "example value for name",
        *   on: ["name"],
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends UpsertCustomCityOptions>(
      
        variables: UpsertCustomCityVariables,
        options?: LimitToKnownKeys<Options, UpsertCustomCityOptions>
      ): Promise<UpsertCustomCityResult<Options>>;
      /**
       * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const result = await api.customCity.upsert({
        *   customCity: {
        *     courierType: "sendit",
        *     id: "1",
        *     isActive: true,
        *     name: "example value for name",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        *   on: ["name"],
        * });
      **/
      <Options extends UpsertCustomCityOptions>(
      
        variables: FullyQualifiedUpsertCustomCityVariables,
        options?: LimitToKnownKeys<Options, UpsertCustomCityOptions>
      ): Promise<UpsertCustomCityResult<Options>>;
      type: 'action';
      operationName: 'upsertCustomCity';
      operationReturnType: 'UpsertCustomCity';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          on: { required: false, type: '[String!]' },
          customCity: { required: false, type: 'UpsertCustomCityInput' }
        };
      variablesType: ((
               
               & (FullyQualifiedUpsertCustomCityVariables | UpsertCustomCityVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [ 'on' ];
      hasReturnType: {
          '... on CreateCustomCityResult': { hasReturnType: false },
          '... on UpdateCustomCityResult': { hasReturnType: false }
        };
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'Scalars', 'UpsertCustomCityInput' ];
      optionsType: UpsertCustomCityOptions;
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
  bulkUpsert: {
      /**
        * Executes the bulkUpsert action with the given inputs.
        */
       <Options extends UpsertCustomCityOptions>(
          inputs: (FullyQualifiedUpsertCustomCityVariables | UpsertCustomCityVariables)[],
          options?: LimitToKnownKeys<Options, UpsertCustomCityOptions>
       ): Promise<any[]>
      type: 'action';
      operationName: 'bulkUpsertCustomCities';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'upsert';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpsertCustomCityOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkUpsertCustomCitiesInput!]' } };
      variablesType: (FullyQualifiedUpsertCustomCityVariables | UpsertCustomCityVariables)[];
      paramOnlyVariables: [ 'on' ];
      selectionType: AvailableCustomCitySelection;
      schemaType: Query["customCity"];
      defaultSelection: typeof DefaultCustomCitySelection;
    }
};

/**
 * A manager for the customCity model with all the available operations for reading and writing to it.*/
export const CustomCityManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultCustomCitySelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findByName',
      findByField: 'name',
      findByVariableName: 'name',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindByName',
      findByField: 'name',
      findByVariableName: 'name',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultCustomCitySelection,
      namespace: null
    },
    {
      type: 'action',
      operationName: 'createCustomCity',
      operationReturnType: 'CreateCustomCity',
      functionName: 'create',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: { customCity: { required: false, type: 'CreateCustomCityInput' } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: 'action',
      operationName: 'bulkCreateCustomCities',
      functionName: 'bulkCreate',
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: 'create',
      modelApiIdentifier: modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: '[BulkCreateCustomCitiesInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: 'action',
      operationName: 'updateCustomCity',
      operationReturnType: 'UpdateCustomCity',
      functionName: 'update',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: 'GadgetID' },
        customCity: { required: false, type: 'UpdateCustomCityInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: 'action',
      operationName: 'bulkUpdateCustomCities',
      functionName: 'bulkUpdate',
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: 'update',
      modelApiIdentifier: modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: '[BulkUpdateCustomCitiesInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: 'action',
      operationName: 'deleteCustomCity',
      operationReturnType: 'DeleteCustomCity',
      functionName: 'delete',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: true,
      variables: { id: { required: true, type: 'GadgetID' } },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: false,
      hasCreateOrUpdateEffect: false,
      defaultSelection: null
    },
    {
      type: 'action',
      operationName: 'bulkDeleteCustomCities',
      functionName: 'bulkDelete',
      isBulk: true,
      isDeleter: true,
      hasReturnType: false,
      acceptsModelInput: false,
      operatesWithRecordIdentity: true,
      singleActionFunctionName: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: { ids: { required: true, type: '[GadgetID!]' } },
      paramOnlyVariables: [],
      defaultSelection: null
    },
    {
      type: 'action',
      operationName: 'upsertCustomCity',
      operationReturnType: 'UpsertCustomCity',
      functionName: 'upsert',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: '[String!]' },
        customCity: { required: false, type: 'UpsertCustomCityInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [ 'on' ],
      hasReturnType: {
        '... on CreateCustomCityResult': { hasReturnType: false },
        '... on UpdateCustomCityResult': { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultCustomCitySelection
    },
    {
      type: 'action',
      operationName: 'bulkUpsertCustomCities',
      functionName: 'bulkUpsert',
      isBulk: true,
      isDeleter: false,
      hasReturnType: false,
      acceptsModelInput: true,
      operatesWithRecordIdentity: false,
      singleActionFunctionName: 'upsert',
      modelApiIdentifier: modelApiIdentifier,
      modelSelectionField: pluralModelApiIdentifier,
      namespace: null,
      variables: {
        inputs: { required: true, type: '[BulkUpsertCustomCitiesInput!]' }
      },
      paramOnlyVariables: [ 'on' ],
      defaultSelection: DefaultCustomCitySelection
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): CustomCityManager;
};