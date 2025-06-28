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
  ShopifyFulfillmentOrder,
  AvailableShopifyFulfillmentOrderSelection,
  ShopifyFulfillmentOrderSort,
  ShopifyFulfillmentOrderFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyFulfillmentOrder. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyFulfillmentOrderOrDefault<Options extends Selectable<AvailableShopifyFulfillmentOrderSelection>> = DeepFilterNever<
    Select<
      ShopifyFulfillmentOrder,
      DefaultSelection<
        AvailableShopifyFulfillmentOrderSelection,
        Options,
        typeof DefaultShopifyFulfillmentOrderSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyFulfillmentOrder.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyFulfillmentOrderRecord, recordWithName: ShopifyFulfillmentOrderRecord<{ select: { name: true; } }>) => {
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
export type ShopifyFulfillmentOrderRecord<Selection extends AvailableShopifyFulfillmentOrderSelection | undefined = typeof DefaultShopifyFulfillmentOrderSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyFulfillmentOrderOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyFulfillmentOrderSelection = {
     __typename: true,
     id: true,
     createdAt: true,
     fulfillAt: true,
     fulfillBy: true,
     internationalDuties: true,
     orderId: true,
     requestStatus: true,
     shopId: true,
     shopifyCreatedAt: true,
     shopifyUpdatedAt: true,
     status: true,
     supportedActions: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "shopifyFulfillmentOrder" as const;
const pluralModelApiIdentifier = "shopifyFulfillmentOrders" as const;
/** Options that can be passed to the `ShopifyFulfillmentOrderManager#findOne` method */
 export interface FindOneShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyFulfillmentOrderManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyFulfillmentOrderManager#findMany` method */
 export interface FindManyShopifyFulfillmentOrdersOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentOrderSort | ShopifyFulfillmentOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentOrderFilter | ShopifyFulfillmentOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyFulfillmentOrderManager#findFirst` method */
 export interface FindFirstShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentOrderSort | ShopifyFulfillmentOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentOrderFilter | ShopifyFulfillmentOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyFulfillmentOrderManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentOrderSort | ShopifyFulfillmentOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentOrderFilter | ShopifyFulfillmentOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
};
export interface UpdateShopifyFulfillmentOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentOrderSelection;
};
export interface DeleteShopifyFulfillmentOrderOptions {

};

/**
 * A manager for the shopifyFulfillmentOrder model with all the available operations for reading and writing to it.*/
export type ShopifyFulfillmentOrderManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyFulfillmentOrder by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyFulfillmentOrderOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOrderOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      optionsType: FindOneShopifyFulfillmentOrderOptions;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyFulfillmentOrder by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyFulfillmentOrderOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyFulfillmentOrderOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyFulfillmentOrderOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  findMany: {
      /**
       * Finds many shopifyFulfillmentOrder. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyFulfillmentOrdersOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyFulfillmentOrdersOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyFulfillmentOrderRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyFulfillmentOrdersOptions;
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyFulfillmentOrder. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyFulfillmentOrderOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyFulfillmentOrderOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentOrderRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyFulfillmentOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyFulfillmentOrder. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyFulfillmentOrderOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyFulfillmentOrderOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentOrderRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyFulfillmentOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  findById: {
      /**
      * Finds one shopifyFulfillmentOrder by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyFulfillmentOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOrderOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyFulfillmentOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyFulfillmentOrder by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyFulfillmentOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentOrderOptions>): Promise<ShopifyFulfillmentOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyFulfillmentOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentOrderSelection;
      schemaType: Query["shopifyFulfillmentOrder"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyFulfillmentOrder';
      errorMessage: string;
      optionsType: CreateShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyFulfillmentOrders';
      errorMessage: string;
      optionsType: CreateShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyFulfillmentOrder';
      errorMessage: string;
      optionsType: UpdateShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyFulfillmentOrders';
      errorMessage: string;
      optionsType: UpdateShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyFulfillmentOrder';
      errorMessage: string;
      optionsType: DeleteShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyFulfillmentOrders';
      errorMessage: string;
      optionsType: DeleteShopifyFulfillmentOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentOrder.bulkDelete';
    }
};

/**
 * A manager for the shopifyFulfillmentOrder model with all the available operations for reading and writing to it.*/
export const ShopifyFulfillmentOrderManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyFulfillmentOrderSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentOrderSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyFulfillmentOrder',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyFulfillmentOrders',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyFulfillmentOrder',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyFulfillmentOrders',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyFulfillmentOrder',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyFulfillmentOrders',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyFulfillmentOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentOrder.bulkDelete'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyFulfillmentOrderManager;
};