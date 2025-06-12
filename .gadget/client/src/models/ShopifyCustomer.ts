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
  ShopifyCustomer,
  AvailableShopifyCustomerSelection,
  ShopifyCustomerSort,
  ShopifyCustomerFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyCustomer. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyCustomerOrDefault<Options extends Selectable<AvailableShopifyCustomerSelection>> = DeepFilterNever<
    Select<
      ShopifyCustomer,
      DefaultSelection<
        AvailableShopifyCustomerSelection,
        Options,
        typeof DefaultShopifyCustomerSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyCustomer.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyCustomerRecord, recordWithName: ShopifyCustomerRecord<{ select: { name: true; } }>) => {
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
export type ShopifyCustomerRecord<Selection extends AvailableShopifyCustomerSelection | undefined = typeof DefaultShopifyCustomerSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyCustomerOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyCustomerSelection = {
     __typename: true,
     id: true,
     acceptsMarketing: true,
     acceptsMarketingUpdatedAt: true,
     createdAt: true,
     currency: true,
     email: true,
     emailMarketingConsent: true,
     firstName: true,
     lastName: true,
     lastOrderId: true,
     locale: true,
     marketingOptInLevel: true,
     multipassIdentifier: true,
     note: true,
     phone: true,
     shopId: true,
     shopifyCreatedAt: true,
     shopifyState: true,
     shopifyUpdatedAt: true,
     smsMarketingConsent: true,
     statistics: true,
     tags: true,
     taxExempt: true,
     taxExemptions: true,
     updatedAt: true,
     verifiedEmail: true
   } as const;
const modelApiIdentifier = "shopifyCustomer" as const;
const pluralModelApiIdentifier = "shopifyCustomers" as const;
/** Options that can be passed to the `ShopifyCustomerManager#findOne` method */
 export interface FindOneShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCustomerManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCustomerManager#findMany` method */
 export interface FindManyShopifyCustomersOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCustomerSort | ShopifyCustomerSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCustomerFilter | ShopifyCustomerFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyCustomerManager#findFirst` method */
 export interface FindFirstShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCustomerSort | ShopifyCustomerSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCustomerFilter | ShopifyCustomerFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyCustomerManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCustomerSort | ShopifyCustomerSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCustomerFilter | ShopifyCustomerFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
};
export interface UpdateShopifyCustomerOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCustomerSelection;
};
export interface DeleteShopifyCustomerOptions {

};

/**
 * A manager for the shopifyCustomer model with all the available operations for reading and writing to it.*/
export type ShopifyCustomerManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyCustomer by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyCustomerOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCustomerOptions>): PromiseOrLiveIterator<Options,ShopifyCustomerRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      optionsType: FindOneShopifyCustomerOptions;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyCustomer by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyCustomerOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCustomerOptions>): PromiseOrLiveIterator<Options,ShopifyCustomerRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyCustomerOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  findMany: {
      /**
       * Finds many shopifyCustomer. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyCustomersOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCustomersOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyCustomerRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyCustomersOptions;
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyCustomer. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyCustomerOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCustomerOptions>): PromiseOrLiveIterator<Options,ShopifyCustomerRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyCustomerOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyCustomer. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyCustomerOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCustomerOptions>): PromiseOrLiveIterator<Options,ShopifyCustomerRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyCustomerOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  findById: {
      /**
      * Finds one shopifyCustomer by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyCustomerOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCustomerOptions>): PromiseOrLiveIterator<Options,ShopifyCustomerRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCustomerOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyCustomer by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyCustomerOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCustomerOptions>): Promise<ShopifyCustomerRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCustomerOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCustomerSelection;
      namespace: null;
      selectionType: AvailableShopifyCustomerSelection;
      schemaType: Query["shopifyCustomer"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyCustomer';
      errorMessage: 'The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCustomerOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyCustomers';
      errorMessage: 'The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCustomerOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyCustomer';
      errorMessage: 'The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCustomerOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyCustomers';
      errorMessage: 'The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCustomerOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyCustomer';
      errorMessage: 'The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCustomerOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyCustomers';
      errorMessage: 'The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCustomerOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCustomer.bulkDelete';
    }
};

/**
 * A manager for the shopifyCustomer model with all the available operations for reading and writing to it.*/
export const ShopifyCustomerManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCustomerSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCustomerSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyCustomer',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyCustomers',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyCustomer',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyCustomers',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyCustomer',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyCustomers',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyCustomer does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCustomer.bulkDelete'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyCustomerManager;
};