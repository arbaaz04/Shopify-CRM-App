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
  BlacklistedPhone,
  AvailableBlacklistedPhoneSelection,
  BlacklistedPhoneSort,
  BlacklistedPhoneFilter,
  CreateBlacklistedPhoneInput
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of blacklistedPhone. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedBlacklistedPhoneOrDefault<Options extends Selectable<AvailableBlacklistedPhoneSelection>> = DeepFilterNever<
    Select<
      BlacklistedPhone,
      DefaultSelection<
        AvailableBlacklistedPhoneSelection,
        Options,
        typeof DefaultBlacklistedPhoneSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for blacklistedPhone.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: BlacklistedPhoneRecord, recordWithName: BlacklistedPhoneRecord<{ select: { name: true; } }>) => {
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
export type BlacklistedPhoneRecord<Selection extends AvailableBlacklistedPhoneSelection | undefined = typeof DefaultBlacklistedPhoneSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedBlacklistedPhoneOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultBlacklistedPhoneSelection = {
     __typename: true,
     id: true,
     addedAt: true,
     createdAt: true,
     phone: true,
     shopId: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "blacklistedPhone" as const;
const pluralModelApiIdentifier = "blacklistedPhones" as const;
/** Options that can be passed to the `BlacklistedPhoneManager#findOne` method */
 export interface FindOneBlacklistedPhoneOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `BlacklistedPhoneManager#maybeFindOne` method */
 export interface MaybeFindOneBlacklistedPhoneOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `BlacklistedPhoneManager#findMany` method */
 export interface FindManyBlacklistedPhonesOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: BlacklistedPhoneSort | BlacklistedPhoneSort[] | null;
  /** Only return records matching these filters. */
  filter?: BlacklistedPhoneFilter | BlacklistedPhoneFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `BlacklistedPhoneManager#findFirst` method */
 export interface FindFirstBlacklistedPhoneOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: BlacklistedPhoneSort | BlacklistedPhoneSort[] | null;
  /** Only return records matching these filters. */
  filter?: BlacklistedPhoneFilter | BlacklistedPhoneFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `BlacklistedPhoneManager#maybeFindFirst` method */
 export interface MaybeFindFirstBlacklistedPhoneOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: BlacklistedPhoneSort | BlacklistedPhoneSort[] | null;
  /** Only return records matching these filters. */
  filter?: BlacklistedPhoneFilter | BlacklistedPhoneFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateBlacklistedPhoneOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableBlacklistedPhoneSelection;
};
export interface DeleteBlacklistedPhoneOptions {

};
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateBlacklistedPhoneVariables = {
  blacklistedPhone?: CreateBlacklistedPhoneInput;
}
/**
 * The inputs for executing create on blacklistedPhone.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateBlacklistedPhoneVariables = CreateBlacklistedPhoneInput;
/**
 * The return value from executing create on blacklistedPhone
 * Is a GadgetRecord of the model's type.
 **/
export type CreateBlacklistedPhoneResult<Options extends CreateBlacklistedPhoneOptions> = SelectedBlacklistedPhoneOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedBlacklistedPhoneOrDefault<Options>>;
/**
 * The return value from executing delete on blacklistedPhone
 * Is void because this action deletes the record
 **/
export type DeleteBlacklistedPhoneResult<Options extends DeleteBlacklistedPhoneOptions> = void;

/**
 * A manager for the blacklistedPhone model with all the available operations for reading and writing to it.*/
export type BlacklistedPhoneManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one blacklistedPhone by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneBlacklistedPhoneOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneBlacklistedPhoneOptions>): PromiseOrLiveIterator<Options,BlacklistedPhoneRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      optionsType: FindOneBlacklistedPhoneOptions;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  maybeFindOne: {
      /**
       * Finds one blacklistedPhone by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneBlacklistedPhoneOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneBlacklistedPhoneOptions>): PromiseOrLiveIterator<Options,BlacklistedPhoneRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneBlacklistedPhoneOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  findMany: {
      /**
       * Finds many blacklistedPhone. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyBlacklistedPhonesOptions>(options?: LimitToKnownKeys<Options, FindManyBlacklistedPhonesOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<BlacklistedPhoneRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyBlacklistedPhonesOptions;
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  findFirst: {
      /**
       * Finds the first matching blacklistedPhone. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstBlacklistedPhoneOptions>(options?: LimitToKnownKeys<Options, FindFirstBlacklistedPhoneOptions>): PromiseOrLiveIterator<Options,BlacklistedPhoneRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstBlacklistedPhoneOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching blacklistedPhone. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstBlacklistedPhoneOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstBlacklistedPhoneOptions>): PromiseOrLiveIterator<Options,BlacklistedPhoneRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstBlacklistedPhoneOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  findById: {
      /**
      * Finds one blacklistedPhone by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneBlacklistedPhoneOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneBlacklistedPhoneOptions>): PromiseOrLiveIterator<Options,BlacklistedPhoneRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneBlacklistedPhoneOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  maybeFindById: {
      /**
      * Finds one blacklistedPhone by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneBlacklistedPhoneOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneBlacklistedPhoneOptions>): Promise<BlacklistedPhoneRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneBlacklistedPhoneOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
      namespace: null;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
    }
  create: {
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const blacklistedPhoneRecord = await api.blacklistedPhone.create({
        *   addedAt: "2025-09-01T00:00:00.000+00:00",
        *   phone: "example value for phone",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends CreateBlacklistedPhoneOptions>(
      
        variables: CreateBlacklistedPhoneVariables,
        options?: LimitToKnownKeys<Options, CreateBlacklistedPhoneOptions>
      ): Promise<CreateBlacklistedPhoneResult<Options>>;
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const blacklistedPhoneRecord = await api.blacklistedPhone.create({
        *   blacklistedPhone: {
        *     addedAt: "2025-09-01T00:00:00.000+00:00",
        *     phone: "example value for phone",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends CreateBlacklistedPhoneOptions>(
      
        variables: FullyQualifiedCreateBlacklistedPhoneVariables,
        options?: LimitToKnownKeys<Options, CreateBlacklistedPhoneOptions>
      ): Promise<CreateBlacklistedPhoneResult<Options>>;
      type: 'action';
      operationName: 'createBlacklistedPhone';
      operationReturnType: 'CreateBlacklistedPhone';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          blacklistedPhone: { required: false, type: 'CreateBlacklistedPhoneInput' }
        };
      variablesType: ((
               
               & (FullyQualifiedCreateBlacklistedPhoneVariables | CreateBlacklistedPhoneVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'CreateBlacklistedPhoneInput' ];
      optionsType: CreateBlacklistedPhoneOptions;
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
    }
  bulkCreate: {
      /**
        * Executes the bulkCreate action with the given inputs.
        */
       <Options extends CreateBlacklistedPhoneOptions>(
          inputs: (FullyQualifiedCreateBlacklistedPhoneVariables | CreateBlacklistedPhoneVariables)[],
          options?: LimitToKnownKeys<Options, CreateBlacklistedPhoneOptions>
       ): Promise<CreateBlacklistedPhoneResult<Options>[]>
      type: 'action';
      operationName: 'bulkCreateBlacklistedPhones';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: CreateBlacklistedPhoneOptions;
      namespace: null;
      variables: {
          inputs: { required: true, type: '[BulkCreateBlacklistedPhonesInput!]' }
        };
      variablesType: (FullyQualifiedCreateBlacklistedPhoneVariables | CreateBlacklistedPhoneVariables)[];
      paramOnlyVariables: [];
      selectionType: AvailableBlacklistedPhoneSelection;
      schemaType: Query["blacklistedPhone"];
      defaultSelection: typeof DefaultBlacklistedPhoneSelection;
    }
  delete: {
      /**
       * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * await api.blacklistedPhone.delete("1");
      **/
      <Options extends DeleteBlacklistedPhoneOptions>(
        id: string,
      
        options?: LimitToKnownKeys<Options, DeleteBlacklistedPhoneOptions>
      ): Promise<DeleteBlacklistedPhoneResult<Options>>;
      type: 'action';
      operationName: 'deleteBlacklistedPhone';
      operationReturnType: 'DeleteBlacklistedPhone';
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
      optionsType: DeleteBlacklistedPhoneOptions;
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
  bulkDelete: {
      /**
        * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
        */
       <Options extends DeleteBlacklistedPhoneOptions>(
          ids: string[],
          options?: LimitToKnownKeys<Options, DeleteBlacklistedPhoneOptions>
       ): Promise<DeleteBlacklistedPhoneResult<Options>[]>
      type: 'action';
      operationName: 'bulkDeleteBlacklistedPhones';
      isBulk: true;
      isDeleter: true;
      hasReturnType: false;
      acceptsModelInput: false;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: DeleteBlacklistedPhoneOptions;
      namespace: null;
      variables: { ids: { required: true, type: '[GadgetID!]' } };
      variablesType: IDsList | undefined;
      paramOnlyVariables: [];
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
};

/**
 * A manager for the blacklistedPhone model with all the available operations for reading and writing to it.*/
export const BlacklistedPhoneManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultBlacklistedPhoneSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultBlacklistedPhoneSelection,
      namespace: null
    },
    {
      type: 'action',
      operationName: 'createBlacklistedPhone',
      operationReturnType: 'CreateBlacklistedPhone',
      functionName: 'create',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        blacklistedPhone: { required: false, type: 'CreateBlacklistedPhoneInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultBlacklistedPhoneSelection
    },
    {
      type: 'action',
      operationName: 'bulkCreateBlacklistedPhones',
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
        inputs: { required: true, type: '[BulkCreateBlacklistedPhonesInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultBlacklistedPhoneSelection
    },
    {
      type: 'action',
      operationName: 'deleteBlacklistedPhone',
      operationReturnType: 'DeleteBlacklistedPhone',
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
      operationName: 'bulkDeleteBlacklistedPhones',
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
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): BlacklistedPhoneManager;
};