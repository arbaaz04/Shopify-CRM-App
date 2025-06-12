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
  SenditConfig,
  AvailableSenditConfigSelection,
  SenditConfigSort,
  SenditConfigFilter,
  CreateSenditConfigInput,
  UpdateSenditConfigInput,
  Scalars,
  UpsertSenditConfigInput
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of senditConfig. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedSenditConfigOrDefault<Options extends Selectable<AvailableSenditConfigSelection>> = DeepFilterNever<
    Select<
      SenditConfig,
      DefaultSelection<
        AvailableSenditConfigSelection,
        Options,
        typeof DefaultSenditConfigSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for senditConfig.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: SenditConfigRecord, recordWithName: SenditConfigRecord<{ select: { name: true; } }>) => {
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
export type SenditConfigRecord<Selection extends AvailableSenditConfigSelection | undefined = typeof DefaultSenditConfigSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedSenditConfigOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultSenditConfigSelection = {
     __typename: true,
     id: true,
     accountType: true,
     createdAt: true,
     lastAuthenticated: true,
     name: true,
     publicKey: true,
     secretKey: true,
     shopId: true,
     token: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "senditConfig" as const;
const pluralModelApiIdentifier = "senditConfigs" as const;
/** Options that can be passed to the `SenditConfigManager#findOne` method */
 export interface FindOneSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `SenditConfigManager#maybeFindOne` method */
 export interface MaybeFindOneSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `SenditConfigManager#findMany` method */
 export interface FindManySenditConfigsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SenditConfigSort | SenditConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SenditConfigFilter | SenditConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `SenditConfigManager#findFirst` method */
 export interface FindFirstSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SenditConfigSort | SenditConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SenditConfigFilter | SenditConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `SenditConfigManager#maybeFindFirst` method */
 export interface MaybeFindFirstSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SenditConfigSort | SenditConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SenditConfigFilter | SenditConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
};
export interface UpdateSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
};
export interface DeleteSenditConfigOptions {

};
export interface UpsertSenditConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSenditConfigSelection;
};
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateSenditConfigVariables = {
  senditConfig?: CreateSenditConfigInput;
}
/**
 * The inputs for executing create on senditConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateSenditConfigVariables = CreateSenditConfigInput;
/**
 * The return value from executing create on senditConfig
 * Is a GadgetRecord of the model's type.
 **/
export type CreateSenditConfigResult<Options extends CreateSenditConfigOptions> = SelectedSenditConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSenditConfigOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateSenditConfigVariables = {
  senditConfig?: UpdateSenditConfigInput;
}
/**
 * The inputs for executing update on senditConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateSenditConfigVariables = UpdateSenditConfigInput;
/**
 * The return value from executing update on senditConfig
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateSenditConfigResult<Options extends UpdateSenditConfigOptions> = SelectedSenditConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSenditConfigOrDefault<Options>>;
/**
 * The return value from executing delete on senditConfig
 * Is void because this action deletes the record
 **/
export type DeleteSenditConfigResult<Options extends DeleteSenditConfigOptions> = void;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertSenditConfigVariables = {
  on?: ((Scalars['String'] | null))[];
  senditConfig?: UpsertSenditConfigInput;
}
/**
 * The inputs for executing upsert on senditConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertSenditConfigVariables = Omit<
     UpsertSenditConfigInput,
     "on"
   > & {
     on?: ((Scalars['String'] | null))[];
   };
/**
 * The return value from executing upsert on senditConfig
 *
 **/
export type UpsertSenditConfigResult<Options extends UpsertSenditConfigOptions> = SelectedSenditConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSenditConfigOrDefault<Options>>;

/**
 * A manager for the senditConfig model with all the available operations for reading and writing to it.*/
export type SenditConfigManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one senditConfig by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneSenditConfigOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneSenditConfigOptions>): PromiseOrLiveIterator<Options,SenditConfigRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      optionsType: FindOneSenditConfigOptions;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  maybeFindOne: {
      /**
       * Finds one senditConfig by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneSenditConfigOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneSenditConfigOptions>): PromiseOrLiveIterator<Options,SenditConfigRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneSenditConfigOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  findMany: {
      /**
       * Finds many senditConfig. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManySenditConfigsOptions>(options?: LimitToKnownKeys<Options, FindManySenditConfigsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<SenditConfigRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManySenditConfigsOptions;
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  findFirst: {
      /**
       * Finds the first matching senditConfig. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstSenditConfigOptions>(options?: LimitToKnownKeys<Options, FindFirstSenditConfigOptions>): PromiseOrLiveIterator<Options,SenditConfigRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstSenditConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching senditConfig. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstSenditConfigOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstSenditConfigOptions>): PromiseOrLiveIterator<Options,SenditConfigRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstSenditConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  findById: {
      /**
      * Finds one senditConfig by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneSenditConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSenditConfigOptions>): PromiseOrLiveIterator<Options,SenditConfigRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneSenditConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  maybeFindById: {
      /**
      * Finds one senditConfig by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneSenditConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSenditConfigOptions>): Promise<SenditConfigRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneSenditConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSenditConfigSelection;
      namespace: null;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
    }
  create: {
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const senditConfigRecord = await api.senditConfig.create({
        *   accountType: "example value for accountType",
        *   lastAuthenticated: "2025-06-01T00:00:00.000+00:00",
        *   publicKey: "encrypted secret",
        *   secretKey: "encrypted secret",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends CreateSenditConfigOptions>(
      
        variables: CreateSenditConfigVariables,
        options?: LimitToKnownKeys<Options, CreateSenditConfigOptions>
      ): Promise<CreateSenditConfigResult<Options>>;
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const senditConfigRecord = await api.senditConfig.create({
        *   senditConfig: {
        *     accountType: "example value for accountType",
        *     lastAuthenticated: "2025-06-01T00:00:00.000+00:00",
        *     publicKey: "encrypted secret",
        *     secretKey: "encrypted secret",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends CreateSenditConfigOptions>(
      
        variables: FullyQualifiedCreateSenditConfigVariables,
        options?: LimitToKnownKeys<Options, CreateSenditConfigOptions>
      ): Promise<CreateSenditConfigResult<Options>>;
      type: 'action';
      operationName: 'createSenditConfig';
      operationReturnType: 'CreateSenditConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: { senditConfig: { required: false, type: 'CreateSenditConfigInput' } };
      variablesType: ((
               
               & (FullyQualifiedCreateSenditConfigVariables | CreateSenditConfigVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'CreateSenditConfigInput' ];
      optionsType: CreateSenditConfigOptions;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
  bulkCreate: {
      /**
        * Executes the bulkCreate action with the given inputs.
        */
       <Options extends CreateSenditConfigOptions>(
          inputs: (FullyQualifiedCreateSenditConfigVariables | CreateSenditConfigVariables)[],
          options?: LimitToKnownKeys<Options, CreateSenditConfigOptions>
       ): Promise<CreateSenditConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkCreateSenditConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: CreateSenditConfigOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkCreateSenditConfigsInput!]' } };
      variablesType: (FullyQualifiedCreateSenditConfigVariables | CreateSenditConfigVariables)[];
      paramOnlyVariables: [];
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
  update: {
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const senditConfigRecord = await api.senditConfig.update("1", {
        *   accountType: "example value for accountType",
        *   lastAuthenticated: "2025-06-01T00:00:00.000+00:00",
        *   name: "example value for name",
        *   publicKey: "encrypted secret",
        *   secretKey: "encrypted secret",
        * });
      **/
      <Options extends UpdateSenditConfigOptions>(
        id: string,
        variables: UpdateSenditConfigVariables,
        options?: LimitToKnownKeys<Options, UpdateSenditConfigOptions>
      ): Promise<UpdateSenditConfigResult<Options>>;
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const senditConfigRecord = await api.senditConfig.update("1", {
        *   senditConfig: {
        *     accountType: "example value for accountType",
        *     lastAuthenticated: "2025-06-01T00:00:00.000+00:00",
        *     name: "example value for name",
        *     publicKey: "encrypted secret",
        *     secretKey: "encrypted secret",
        *   },
        * });
      **/
      <Options extends UpdateSenditConfigOptions>(
        id: string,
        variables: FullyQualifiedUpdateSenditConfigVariables,
        options?: LimitToKnownKeys<Options, UpdateSenditConfigOptions>
      ): Promise<UpdateSenditConfigResult<Options>>;
      type: 'action';
      operationName: 'updateSenditConfig';
      operationReturnType: 'UpdateSenditConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: true;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          id: { required: true, type: 'GadgetID' },
          senditConfig: { required: false, type: 'UpdateSenditConfigInput' }
        };
      variablesType: (
              { id: string }
              & (FullyQualifiedUpdateSenditConfigVariables | UpdateSenditConfigVariables)
            );
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'UpdateSenditConfigInput' ];
      optionsType: UpdateSenditConfigOptions;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
  bulkUpdate: {
      /**
        * Executes the bulkUpdate action with the given inputs.
        */
       <Options extends UpdateSenditConfigOptions>(
          inputs: (FullyQualifiedUpdateSenditConfigVariables | UpdateSenditConfigVariables & { id: string })[],
          options?: LimitToKnownKeys<Options, UpdateSenditConfigOptions>
       ): Promise<UpdateSenditConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkUpdateSenditConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpdateSenditConfigOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkUpdateSenditConfigsInput!]' } };
      variablesType: (FullyQualifiedUpdateSenditConfigVariables | UpdateSenditConfigVariables & { id: string })[];
      paramOnlyVariables: [];
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
  delete: {
      /**
       * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * await api.senditConfig.delete("1");
      **/
      <Options extends DeleteSenditConfigOptions>(
        id: string,
      
        options?: LimitToKnownKeys<Options, DeleteSenditConfigOptions>
      ): Promise<DeleteSenditConfigResult<Options>>;
      type: 'action';
      operationName: 'deleteSenditConfig';
      operationReturnType: 'DeleteSenditConfig';
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
      optionsType: DeleteSenditConfigOptions;
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
  bulkDelete: {
      /**
        * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
        */
       <Options extends DeleteSenditConfigOptions>(
          ids: string[],
          options?: LimitToKnownKeys<Options, DeleteSenditConfigOptions>
       ): Promise<DeleteSenditConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkDeleteSenditConfigs';
      isBulk: true;
      isDeleter: true;
      hasReturnType: false;
      acceptsModelInput: false;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: DeleteSenditConfigOptions;
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
      * * const result = await api.senditConfig.upsert({
        *   accountType: "example value for accountType",
        *   id: "1",
        *   publicKey: "encrypted secret",
        *   secretKey: "encrypted secret",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends UpsertSenditConfigOptions>(
      
        variables: UpsertSenditConfigVariables,
        options?: LimitToKnownKeys<Options, UpsertSenditConfigOptions>
      ): Promise<UpsertSenditConfigResult<Options>>;
      /**
       * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const result = await api.senditConfig.upsert({
        *   senditConfig: {
        *     accountType: "example value for accountType",
        *     id: "1",
        *     publicKey: "encrypted secret",
        *     secretKey: "encrypted secret",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends UpsertSenditConfigOptions>(
      
        variables: FullyQualifiedUpsertSenditConfigVariables,
        options?: LimitToKnownKeys<Options, UpsertSenditConfigOptions>
      ): Promise<UpsertSenditConfigResult<Options>>;
      type: 'action';
      operationName: 'upsertSenditConfig';
      operationReturnType: 'UpsertSenditConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          on: { required: false, type: '[String!]' },
          senditConfig: { required: false, type: 'UpsertSenditConfigInput' }
        };
      variablesType: ((
               
               & (FullyQualifiedUpsertSenditConfigVariables | UpsertSenditConfigVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [ 'on' ];
      hasReturnType: {
          '... on CreateSenditConfigResult': { hasReturnType: false },
          '... on UpdateSenditConfigResult': { hasReturnType: false }
        };
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'Scalars', 'UpsertSenditConfigInput' ];
      optionsType: UpsertSenditConfigOptions;
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
  bulkUpsert: {
      /**
        * Executes the bulkUpsert action with the given inputs.
        */
       <Options extends UpsertSenditConfigOptions>(
          inputs: (FullyQualifiedUpsertSenditConfigVariables | UpsertSenditConfigVariables)[],
          options?: LimitToKnownKeys<Options, UpsertSenditConfigOptions>
       ): Promise<any[]>
      type: 'action';
      operationName: 'bulkUpsertSenditConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'upsert';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpsertSenditConfigOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkUpsertSenditConfigsInput!]' } };
      variablesType: (FullyQualifiedUpsertSenditConfigVariables | UpsertSenditConfigVariables)[];
      paramOnlyVariables: [ 'on' ];
      selectionType: AvailableSenditConfigSelection;
      schemaType: Query["senditConfig"];
      defaultSelection: typeof DefaultSenditConfigSelection;
    }
};

/**
 * A manager for the senditConfig model with all the available operations for reading and writing to it.*/
export const SenditConfigManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultSenditConfigSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSenditConfigSelection,
      namespace: null
    },
    {
      type: 'action',
      operationName: 'createSenditConfig',
      operationReturnType: 'CreateSenditConfig',
      functionName: 'create',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        senditConfig: { required: false, type: 'CreateSenditConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkCreateSenditConfigs',
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
        inputs: { required: true, type: '[BulkCreateSenditConfigsInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: 'action',
      operationName: 'updateSenditConfig',
      operationReturnType: 'UpdateSenditConfig',
      functionName: 'update',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: 'GadgetID' },
        senditConfig: { required: false, type: 'UpdateSenditConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkUpdateSenditConfigs',
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
        inputs: { required: true, type: '[BulkUpdateSenditConfigsInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: 'action',
      operationName: 'deleteSenditConfig',
      operationReturnType: 'DeleteSenditConfig',
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
      operationName: 'bulkDeleteSenditConfigs',
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
      operationName: 'upsertSenditConfig',
      operationReturnType: 'UpsertSenditConfig',
      functionName: 'upsert',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: '[String!]' },
        senditConfig: { required: false, type: 'UpsertSenditConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [ 'on' ],
      hasReturnType: {
        '... on CreateSenditConfigResult': { hasReturnType: false },
        '... on UpdateSenditConfigResult': { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSenditConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkUpsertSenditConfigs',
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
        inputs: { required: true, type: '[BulkUpsertSenditConfigsInput!]' }
      },
      paramOnlyVariables: [ 'on' ],
      defaultSelection: DefaultSenditConfigSelection
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): SenditConfigManager;
};