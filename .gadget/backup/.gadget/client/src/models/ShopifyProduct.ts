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
  ShopifyProduct,
  AvailableShopifyProductSelection,
  ShopifyProductSort,
  ShopifyProductFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyProduct. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyProductOrDefault<Options extends Selectable<AvailableShopifyProductSelection>> = DeepFilterNever<
    Select<
      ShopifyProduct,
      DefaultSelection<
        AvailableShopifyProductSelection,
        Options,
        typeof DefaultShopifyProductSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyProduct.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyProductRecord, recordWithName: ShopifyProductRecord<{ select: { name: true; } }>) => {
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
export type ShopifyProductRecord<Selection extends AvailableShopifyProductSelection | undefined = typeof DefaultShopifyProductSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyProductOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyProductSelection = {
     __typename: true,
     id: true,
     body: true,
     category: true,
     compareAtPriceRange: true,
     createdAt: true,
     handle: true,
     hasVariantsThatRequiresComponents: true,
     productCategory: true,
     productType: true,
     publishedAt: true,
     shopId: true,
     shopifyCreatedAt: true,
     shopifyUpdatedAt: true,
     status: true,
     tags: true,
     templateSuffix: true,
     title: true,
     updatedAt: true,
     vendor: true
   } as const;
const modelApiIdentifier = "shopifyProduct" as const;
const pluralModelApiIdentifier = "shopifyProducts" as const;
/** Options that can be passed to the `ShopifyProductManager#findOne` method */
 export interface FindOneShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyProductManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyProductManager#findMany` method */
 export interface FindManyShopifyProductsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductSort | ShopifyProductSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductFilter | ShopifyProductFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyProductManager#findFirst` method */
 export interface FindFirstShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductSort | ShopifyProductSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductFilter | ShopifyProductFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyProductManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductSort | ShopifyProductSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductFilter | ShopifyProductFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
};
export interface UpdateShopifyProductOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductSelection;
};
export interface DeleteShopifyProductOptions {

};

/**
 * A manager for the shopifyProduct model with all the available operations for reading and writing to it.*/
export type ShopifyProductManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyProduct by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyProductOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductOptions>): PromiseOrLiveIterator<Options,ShopifyProductRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      optionsType: FindOneShopifyProductOptions;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyProduct by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyProductOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyProductOptions>): PromiseOrLiveIterator<Options,ShopifyProductRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyProductOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  findMany: {
      /**
       * Finds many shopifyProduct. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyProductsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyProductsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyProductRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyProductsOptions;
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyProduct. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyProductOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyProductOptions>): PromiseOrLiveIterator<Options,ShopifyProductRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyProductOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyProduct. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyProductOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyProductOptions>): PromiseOrLiveIterator<Options,ShopifyProductRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyProductOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  findById: {
      /**
      * Finds one shopifyProduct by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyProductOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductOptions>): PromiseOrLiveIterator<Options,ShopifyProductRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyProductOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyProduct by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyProductOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductOptions>): Promise<ShopifyProductRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyProductOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyProductSelection;
      namespace: null;
      selectionType: AvailableShopifyProductSelection;
      schemaType: Query["shopifyProduct"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyProduct';
      errorMessage: 'The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyProductOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyProducts';
      errorMessage: 'The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyProductOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyProduct';
      errorMessage: 'The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyProductOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyProducts';
      errorMessage: 'The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyProductOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyProduct';
      errorMessage: 'The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyProductOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyProducts';
      errorMessage: 'The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyProductOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyProduct.bulkDelete';
    }
};

/**
 * A manager for the shopifyProduct model with all the available operations for reading and writing to it.*/
export const ShopifyProductManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyProductSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyProductSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyProduct',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyProducts',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyProduct',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyProducts',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyProduct',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyProducts',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyProduct does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyProduct.bulkDelete'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyProductManager;
};