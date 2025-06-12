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
  SpeedafConfig,
  AvailableSpeedafConfigSelection,
  SpeedafConfigSort,
  SpeedafConfigFilter,
  CreateSpeedafConfigInput,
  UpdateSpeedafConfigInput,
  Scalars,
  UpsertSpeedafConfigInput
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of speedafConfig. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedSpeedafConfigOrDefault<Options extends Selectable<AvailableSpeedafConfigSelection>> = DeepFilterNever<
    Select<
      SpeedafConfig,
      DefaultSelection<
        AvailableSpeedafConfigSelection,
        Options,
        typeof DefaultSpeedafConfigSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for speedafConfig.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: SpeedafConfigRecord, recordWithName: SpeedafConfigRecord<{ select: { name: true; } }>) => {
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
export type SpeedafConfigRecord<Selection extends AvailableSpeedafConfigSelection | undefined = typeof DefaultSpeedafConfigSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedSpeedafConfigOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultSpeedafConfigSelection = {
     __typename: true,
     id: true,
     appCode: true,
     createdAt: true,
     customerCode: true,
     lastAuthenticated: true,
     platformSource: true,
     secretKey: true,
     shopId: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "speedafConfig" as const;
const pluralModelApiIdentifier = "speedafConfigs" as const;
/** Options that can be passed to the `SpeedafConfigManager#findOne` method */
 export interface FindOneSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `SpeedafConfigManager#maybeFindOne` method */
 export interface MaybeFindOneSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `SpeedafConfigManager#findMany` method */
 export interface FindManySpeedafConfigsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SpeedafConfigSort | SpeedafConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SpeedafConfigFilter | SpeedafConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `SpeedafConfigManager#findFirst` method */
 export interface FindFirstSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SpeedafConfigSort | SpeedafConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SpeedafConfigFilter | SpeedafConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `SpeedafConfigManager#maybeFindFirst` method */
 export interface MaybeFindFirstSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: SpeedafConfigSort | SpeedafConfigSort[] | null;
  /** Only return records matching these filters. */
  filter?: SpeedafConfigFilter | SpeedafConfigFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
};
export interface UpdateSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
};
export interface DeleteSpeedafConfigOptions {

};
export interface UpsertSpeedafConfigOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableSpeedafConfigSelection;
};
/**
 * The fully-qualified, expanded form of the inputs for executing the create action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedCreateSpeedafConfigVariables = {
  speedafConfig?: CreateSpeedafConfigInput;
}
/**
 * The inputs for executing create on speedafConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type CreateSpeedafConfigVariables = CreateSpeedafConfigInput;
/**
 * The return value from executing create on speedafConfig
 * Is a GadgetRecord of the model's type.
 **/
export type CreateSpeedafConfigResult<Options extends CreateSpeedafConfigOptions> = SelectedSpeedafConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSpeedafConfigOrDefault<Options>>;
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateSpeedafConfigVariables = {
  speedafConfig?: UpdateSpeedafConfigInput;
}
/**
 * The inputs for executing update on speedafConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateSpeedafConfigVariables = UpdateSpeedafConfigInput;
/**
 * The return value from executing update on speedafConfig
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateSpeedafConfigResult<Options extends UpdateSpeedafConfigOptions> = SelectedSpeedafConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSpeedafConfigOrDefault<Options>>;
/**
 * The return value from executing delete on speedafConfig
 * Is void because this action deletes the record
 **/
export type DeleteSpeedafConfigResult<Options extends DeleteSpeedafConfigOptions> = void;
/**
 * The fully-qualified, expanded form of the inputs for executing the upsert action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpsertSpeedafConfigVariables = {
  on?: ((Scalars['String'] | null))[];
  speedafConfig?: UpsertSpeedafConfigInput;
}
/**
 * The inputs for executing upsert on speedafConfig.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpsertSpeedafConfigVariables = Omit<
     UpsertSpeedafConfigInput,
     "on"
   > & {
     on?: ((Scalars['String'] | null))[];
   };
/**
 * The return value from executing upsert on speedafConfig
 *
 **/
export type UpsertSpeedafConfigResult<Options extends UpsertSpeedafConfigOptions> = SelectedSpeedafConfigOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedSpeedafConfigOrDefault<Options>>;

/**
 * A manager for the speedafConfig model with all the available operations for reading and writing to it.*/
export type SpeedafConfigManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one speedafConfig by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneSpeedafConfigOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneSpeedafConfigOptions>): PromiseOrLiveIterator<Options,SpeedafConfigRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      optionsType: FindOneSpeedafConfigOptions;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  maybeFindOne: {
      /**
       * Finds one speedafConfig by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneSpeedafConfigOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneSpeedafConfigOptions>): PromiseOrLiveIterator<Options,SpeedafConfigRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneSpeedafConfigOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  findMany: {
      /**
       * Finds many speedafConfig. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManySpeedafConfigsOptions>(options?: LimitToKnownKeys<Options, FindManySpeedafConfigsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<SpeedafConfigRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManySpeedafConfigsOptions;
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  findFirst: {
      /**
       * Finds the first matching speedafConfig. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstSpeedafConfigOptions>(options?: LimitToKnownKeys<Options, FindFirstSpeedafConfigOptions>): PromiseOrLiveIterator<Options,SpeedafConfigRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstSpeedafConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching speedafConfig. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstSpeedafConfigOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstSpeedafConfigOptions>): PromiseOrLiveIterator<Options,SpeedafConfigRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstSpeedafConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  findById: {
      /**
      * Finds one speedafConfig by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneSpeedafConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSpeedafConfigOptions>): PromiseOrLiveIterator<Options,SpeedafConfigRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneSpeedafConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  maybeFindById: {
      /**
      * Finds one speedafConfig by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneSpeedafConfigOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneSpeedafConfigOptions>): Promise<SpeedafConfigRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneSpeedafConfigOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultSpeedafConfigSelection;
      namespace: null;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
    }
  create: {
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const speedafConfigRecord = await api.speedafConfig.create({
        *   appCode: "encrypted secret",
        *   customerCode: "encrypted secret",
        *   platformSource: "encrypted secret",
        *   secretKey: "encrypted secret",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends CreateSpeedafConfigOptions>(
      
        variables: CreateSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, CreateSpeedafConfigOptions>
      ): Promise<CreateSpeedafConfigResult<Options>>;
      /**
       * Executes the create action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const speedafConfigRecord = await api.speedafConfig.create({
        *   speedafConfig: {
        *     appCode: "encrypted secret",
        *     customerCode: "encrypted secret",
        *     platformSource: "encrypted secret",
        *     secretKey: "encrypted secret",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends CreateSpeedafConfigOptions>(
      
        variables: FullyQualifiedCreateSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, CreateSpeedafConfigOptions>
      ): Promise<CreateSpeedafConfigResult<Options>>;
      type: 'action';
      operationName: 'createSpeedafConfig';
      operationReturnType: 'CreateSpeedafConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          speedafConfig: { required: false, type: 'CreateSpeedafConfigInput' }
        };
      variablesType: ((
               
               & (FullyQualifiedCreateSpeedafConfigVariables | CreateSpeedafConfigVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'CreateSpeedafConfigInput' ];
      optionsType: CreateSpeedafConfigOptions;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
  bulkCreate: {
      /**
        * Executes the bulkCreate action with the given inputs.
        */
       <Options extends CreateSpeedafConfigOptions>(
          inputs: (FullyQualifiedCreateSpeedafConfigVariables | CreateSpeedafConfigVariables)[],
          options?: LimitToKnownKeys<Options, CreateSpeedafConfigOptions>
       ): Promise<CreateSpeedafConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkCreateSpeedafConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: CreateSpeedafConfigOptions;
      namespace: null;
      variables: {
          inputs: { required: true, type: '[BulkCreateSpeedafConfigsInput!]' }
        };
      variablesType: (FullyQualifiedCreateSpeedafConfigVariables | CreateSpeedafConfigVariables)[];
      paramOnlyVariables: [];
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
  update: {
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const speedafConfigRecord = await api.speedafConfig.update("1", {
        *   appCode: "encrypted secret",
        *   customerCode: "encrypted secret",
        *   platformSource: "encrypted secret",
        *   secretKey: "encrypted secret",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends UpdateSpeedafConfigOptions>(
        id: string,
        variables: UpdateSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, UpdateSpeedafConfigOptions>
      ): Promise<UpdateSpeedafConfigResult<Options>>;
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const speedafConfigRecord = await api.speedafConfig.update("1", {
        *   speedafConfig: {
        *     appCode: "encrypted secret",
        *     customerCode: "encrypted secret",
        *     platformSource: "encrypted secret",
        *     secretKey: "encrypted secret",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends UpdateSpeedafConfigOptions>(
        id: string,
        variables: FullyQualifiedUpdateSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, UpdateSpeedafConfigOptions>
      ): Promise<UpdateSpeedafConfigResult<Options>>;
      type: 'action';
      operationName: 'updateSpeedafConfig';
      operationReturnType: 'UpdateSpeedafConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: true;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          id: { required: true, type: 'GadgetID' },
          speedafConfig: { required: false, type: 'UpdateSpeedafConfigInput' }
        };
      variablesType: (
              { id: string }
              & (FullyQualifiedUpdateSpeedafConfigVariables | UpdateSpeedafConfigVariables)
            );
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'UpdateSpeedafConfigInput' ];
      optionsType: UpdateSpeedafConfigOptions;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
  bulkUpdate: {
      /**
        * Executes the bulkUpdate action with the given inputs.
        */
       <Options extends UpdateSpeedafConfigOptions>(
          inputs: (FullyQualifiedUpdateSpeedafConfigVariables | UpdateSpeedafConfigVariables & { id: string })[],
          options?: LimitToKnownKeys<Options, UpdateSpeedafConfigOptions>
       ): Promise<UpdateSpeedafConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkUpdateSpeedafConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpdateSpeedafConfigOptions;
      namespace: null;
      variables: {
          inputs: { required: true, type: '[BulkUpdateSpeedafConfigsInput!]' }
        };
      variablesType: (FullyQualifiedUpdateSpeedafConfigVariables | UpdateSpeedafConfigVariables & { id: string })[];
      paramOnlyVariables: [];
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
  delete: {
      /**
       * Executes the delete actionon one record specified by `id`.Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * await api.speedafConfig.delete("1");
      **/
      <Options extends DeleteSpeedafConfigOptions>(
        id: string,
      
        options?: LimitToKnownKeys<Options, DeleteSpeedafConfigOptions>
      ): Promise<DeleteSpeedafConfigResult<Options>>;
      type: 'action';
      operationName: 'deleteSpeedafConfig';
      operationReturnType: 'DeleteSpeedafConfig';
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
      optionsType: DeleteSpeedafConfigOptions;
      selectionType: Record<string, never>;
      schemaType: null;
      defaultSelection: null;
    }
  bulkDelete: {
      /**
        * Executes the bulkDelete action with the given inputs.Deletes the records on the server.
        */
       <Options extends DeleteSpeedafConfigOptions>(
          ids: string[],
          options?: LimitToKnownKeys<Options, DeleteSpeedafConfigOptions>
       ): Promise<DeleteSpeedafConfigResult<Options>[]>
      type: 'action';
      operationName: 'bulkDeleteSpeedafConfigs';
      isBulk: true;
      isDeleter: true;
      hasReturnType: false;
      acceptsModelInput: false;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: DeleteSpeedafConfigOptions;
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
      * * const result = await api.speedafConfig.upsert({
        *   appCode: "encrypted secret",
        *   customerCode: "encrypted secret",
        *   platformSource: "encrypted secret",
        *   secretKey: "encrypted secret",
        *   shop: {
        *     _link: "1",
        *   },
        * });
      **/
      <Options extends UpsertSpeedafConfigOptions>(
      
        variables: UpsertSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, UpsertSpeedafConfigOptions>
      ): Promise<UpsertSpeedafConfigResult<Options>>;
      /**
       * Executes the upsert action.Accepts the parameters for the action via the `variables` argument.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const result = await api.speedafConfig.upsert({
        *   speedafConfig: {
        *     appCode: "encrypted secret",
        *     customerCode: "encrypted secret",
        *     platformSource: "encrypted secret",
        *     secretKey: "encrypted secret",
        *     shop: {
        *       _link: "1",
        *     },
        *   },
        * });
      **/
      <Options extends UpsertSpeedafConfigOptions>(
      
        variables: FullyQualifiedUpsertSpeedafConfigVariables,
        options?: LimitToKnownKeys<Options, UpsertSpeedafConfigOptions>
      ): Promise<UpsertSpeedafConfigResult<Options>>;
      type: 'action';
      operationName: 'upsertSpeedafConfig';
      operationReturnType: 'UpsertSpeedafConfig';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: false;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          on: { required: false, type: '[String!]' },
          speedafConfig: { required: false, type: 'UpsertSpeedafConfigInput' }
        };
      variablesType: ((
               
               & (FullyQualifiedUpsertSpeedafConfigVariables | UpsertSpeedafConfigVariables)
             ) | undefined);
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [ 'on' ];
      hasReturnType: {
          '... on CreateSpeedafConfigResult': { hasReturnType: false },
          '... on UpdateSpeedafConfigResult': { hasReturnType: false }
        };
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'Scalars', 'UpsertSpeedafConfigInput' ];
      optionsType: UpsertSpeedafConfigOptions;
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
  bulkUpsert: {
      /**
        * Executes the bulkUpsert action with the given inputs.
        */
       <Options extends UpsertSpeedafConfigOptions>(
          inputs: (FullyQualifiedUpsertSpeedafConfigVariables | UpsertSpeedafConfigVariables)[],
          options?: LimitToKnownKeys<Options, UpsertSpeedafConfigOptions>
       ): Promise<any[]>
      type: 'action';
      operationName: 'bulkUpsertSpeedafConfigs';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: false;
      singleActionFunctionName: 'upsert';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpsertSpeedafConfigOptions;
      namespace: null;
      variables: {
          inputs: { required: true, type: '[BulkUpsertSpeedafConfigsInput!]' }
        };
      variablesType: (FullyQualifiedUpsertSpeedafConfigVariables | UpsertSpeedafConfigVariables)[];
      paramOnlyVariables: [ 'on' ];
      selectionType: AvailableSpeedafConfigSelection;
      schemaType: Query["speedafConfig"];
      defaultSelection: typeof DefaultSpeedafConfigSelection;
    }
};

/**
 * A manager for the speedafConfig model with all the available operations for reading and writing to it.*/
export const SpeedafConfigManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultSpeedafConfigSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultSpeedafConfigSelection,
      namespace: null
    },
    {
      type: 'action',
      operationName: 'createSpeedafConfig',
      operationReturnType: 'CreateSpeedafConfig',
      functionName: 'create',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        speedafConfig: { required: false, type: 'CreateSpeedafConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSpeedafConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkCreateSpeedafConfigs',
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
        inputs: { required: true, type: '[BulkCreateSpeedafConfigsInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSpeedafConfigSelection
    },
    {
      type: 'action',
      operationName: 'updateSpeedafConfig',
      operationReturnType: 'UpdateSpeedafConfig',
      functionName: 'update',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: 'GadgetID' },
        speedafConfig: { required: false, type: 'UpdateSpeedafConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSpeedafConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkUpdateSpeedafConfigs',
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
        inputs: { required: true, type: '[BulkUpdateSpeedafConfigsInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultSpeedafConfigSelection
    },
    {
      type: 'action',
      operationName: 'deleteSpeedafConfig',
      operationReturnType: 'DeleteSpeedafConfig',
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
      operationName: 'bulkDeleteSpeedafConfigs',
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
      operationName: 'upsertSpeedafConfig',
      operationReturnType: 'UpsertSpeedafConfig',
      functionName: 'upsert',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: false,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        on: { required: false, type: '[String!]' },
        speedafConfig: { required: false, type: 'UpsertSpeedafConfigInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [ 'on' ],
      hasReturnType: {
        '... on CreateSpeedafConfigResult': { hasReturnType: false },
        '... on UpdateSpeedafConfigResult': { hasReturnType: false }
      },
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultSpeedafConfigSelection
    },
    {
      type: 'action',
      operationName: 'bulkUpsertSpeedafConfigs',
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
        inputs: { required: true, type: '[BulkUpsertSpeedafConfigsInput!]' }
      },
      paramOnlyVariables: [ 'on' ],
      defaultSelection: DefaultSpeedafConfigSelection
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): SpeedafConfigManager;
};