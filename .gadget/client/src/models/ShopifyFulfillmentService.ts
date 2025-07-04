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
  ShopifyFulfillmentService,
  AvailableShopifyFulfillmentServiceSelection,
  ShopifyFulfillmentServiceSort,
  ShopifyFulfillmentServiceFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyFulfillmentService. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyFulfillmentServiceOrDefault<Options extends Selectable<AvailableShopifyFulfillmentServiceSelection>> = DeepFilterNever<
    Select<
      ShopifyFulfillmentService,
      DefaultSelection<
        AvailableShopifyFulfillmentServiceSelection,
        Options,
        typeof DefaultShopifyFulfillmentServiceSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyFulfillmentService.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyFulfillmentServiceRecord, recordWithName: ShopifyFulfillmentServiceRecord<{ select: { name: true; } }>) => {
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
export type ShopifyFulfillmentServiceRecord<Selection extends AvailableShopifyFulfillmentServiceSelection | undefined = typeof DefaultShopifyFulfillmentServiceSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyFulfillmentServiceOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyFulfillmentServiceSelection = {
     __typename: true,
     id: true,
     adminGraphqlApiId: true,
     callbackUrl: true,
     createdAt: true,
     format: true,
     fulfillmentOrdersOptIn: true,
     handle: true,
     inventoryManagement: true,
     name: true,
     permitsSkuSharing: true,
     requiresShippingMethod: true,
     serviceName: true,
     shopId: true,
     trackingSupport: true,
     type: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "shopifyFulfillmentService" as const;
const pluralModelApiIdentifier = "shopifyFulfillmentServices" as const;
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findOne` method */
 export interface FindOneShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findMany` method */
 export interface FindManyShopifyFulfillmentServicesOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#findFirst` method */
 export interface FindFirstShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyFulfillmentServiceManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyFulfillmentServiceSort | ShopifyFulfillmentServiceSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyFulfillmentServiceFilter | ShopifyFulfillmentServiceFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
};
export interface UpdateShopifyFulfillmentServiceOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyFulfillmentServiceSelection;
};
export interface DeleteShopifyFulfillmentServiceOptions {

};

/**
 * A manager for the shopifyFulfillmentService model with all the available operations for reading and writing to it.*/
export type ShopifyFulfillmentServiceManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyFulfillmentService by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyFulfillmentServiceOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentServiceRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      optionsType: FindOneShopifyFulfillmentServiceOptions;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyFulfillmentService by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyFulfillmentServiceOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyFulfillmentServiceOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  findMany: {
      /**
       * Finds many shopifyFulfillmentService. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyFulfillmentServicesOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyFulfillmentServicesOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyFulfillmentServiceRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyFulfillmentServicesOptions;
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyFulfillmentService. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyFulfillmentServiceOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentServiceRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyFulfillmentServiceOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyFulfillmentService. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyFulfillmentServiceOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyFulfillmentServiceOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  findById: {
      /**
      * Finds one shopifyFulfillmentService by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyFulfillmentServiceOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): PromiseOrLiveIterator<Options,ShopifyFulfillmentServiceRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyFulfillmentServiceOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyFulfillmentService by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyFulfillmentServiceOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyFulfillmentServiceOptions>): Promise<ShopifyFulfillmentServiceRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyFulfillmentServiceOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyFulfillmentServiceSelection;
      namespace: null;
      selectionType: AvailableShopifyFulfillmentServiceSelection;
      schemaType: Query["shopifyFulfillmentService"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyFulfillmentService';
      errorMessage: string;
      optionsType: CreateShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyFulfillmentServices';
      errorMessage: string;
      optionsType: CreateShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyFulfillmentService';
      errorMessage: string;
      optionsType: UpdateShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyFulfillmentServices';
      errorMessage: string;
      optionsType: UpdateShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyFulfillmentService';
      errorMessage: string;
      optionsType: DeleteShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyFulfillmentServices';
      errorMessage: string;
      optionsType: DeleteShopifyFulfillmentServiceOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyFulfillmentService.bulkDelete';
    }
};

/**
 * A manager for the shopifyFulfillmentService model with all the available operations for reading and writing to it.*/
export const ShopifyFulfillmentServiceManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyFulfillmentServiceSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyFulfillmentServiceSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyFulfillmentService',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyFulfillmentServices',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyFulfillmentService',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyFulfillmentServices',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyFulfillmentService',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyFulfillmentServices',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyFulfillmentService does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyFulfillmentService.bulkDelete'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyFulfillmentServiceManager;
};