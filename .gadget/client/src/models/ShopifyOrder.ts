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
  ShopifyOrder,
  AvailableShopifyOrderSelection,
  ShopifyOrderSort,
  ShopifyOrderFilter,
  UpdateShopifyOrderInput
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyOrder. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyOrderOrDefault<Options extends Selectable<AvailableShopifyOrderSelection>> = DeepFilterNever<
    Select<
      ShopifyOrder,
      DefaultSelection<
        AvailableShopifyOrderSelection,
        Options,
        typeof DefaultShopifyOrderSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyOrder.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyOrderRecord, recordWithName: ShopifyOrderRecord<{ select: { name: true; } }>) => {
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
export type ShopifyOrderRecord<Selection extends AvailableShopifyOrderSelection | undefined = typeof DefaultShopifyOrderSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyOrderOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyOrderSelection = {
     __typename: true,
     id: true,
     additionalFees: true,
     autoWrite: true,
     billingAddress: true,
     browserIp: true,
     buyerAcceptsMarketing: true,
     cancelReason: true,
     cancellation: true,
     cancelledAt: true,
     cartToken: true,
     checkoutToken: true,
     clientDetails: true,
     closedAt: true,
     createdAt: true,
     currency: true,
     customerId: true,
     customerLocale: true,
     discountApplications: true,
     discountCodes: true,
     email: true,
     estimatedTaxes: true,
     financialStatus: true,
     fulfillmentStatus: true,
     landingSite: true,
     name: true,
     note: true,
     noteAttributes: true,
     orderStatusUrl: true,
     paymentGatewayNames: true,
     presentmentCurrency: true,
     processedAt: true,
     processingMethod: true,
     shippingAddress: true,
     shopId: true,
     shopifyShopId: true,
     sourceName: true,
     subtotalPrice: true,
     subtotalPriceSet: true,
     tags: true,
     taxLines: true,
     taxesIncluded: true,
     test: true,
     totalDiscounts: true,
     totalDiscountsSet: true,
     totalLineItemsPrice: true,
     totalLineItemsPriceSet: true,
     totalOutstanding: true,
     totalPrice: true,
     totalPriceSet: true,
     totalTax: true,
     totalTaxSet: true,
     totalTipReceived: true,
     totalWeight: true,
     updatedAt: true,
     writeOrder: true
   } as const;
const modelApiIdentifier = "shopifyOrder" as const;
const pluralModelApiIdentifier = "shopifyOrders" as const;
/** Options that can be passed to the `ShopifyOrderManager#findOne` method */
 export interface FindOneShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyOrderManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyOrderManager#findMany` method */
 export interface FindManyShopifyOrdersOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyOrderManager#findFirst` method */
 export interface FindFirstShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyOrderManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
};
export interface UpdateShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
};
export interface DeleteShopifyOrderOptions {

};
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateShopifyOrderVariables = {
  shopifyOrder?: UpdateShopifyOrderInput;
}
/**
 * The inputs for executing update on shopifyOrder.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateShopifyOrderVariables = UpdateShopifyOrderInput;
/**
 * The return value from executing update on shopifyOrder
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateShopifyOrderResult<Options extends UpdateShopifyOrderOptions> = SelectedShopifyOrderOrDefault<Options> extends void ?
      void :
      GadgetRecord<SelectedShopifyOrderOrDefault<Options>>;

/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export type ShopifyOrderManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      optionsType: FindOneShopifyOrderOptions;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyOrderOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findMany: {
      /**
       * Finds many shopifyOrder. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyOrdersOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyOrdersOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyOrderRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyOrdersOptions;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findById: {
      /**
      * Finds one shopifyOrder by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyOrder by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): Promise<ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyOrder';
      errorMessage: string;
      optionsType: CreateShopifyOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyOrders';
      errorMessage: string;
      optionsType: CreateShopifyOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.bulkCreate';
    }
  update: {
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the flat style, all-params-together overload that most use cases should use.
      *
      * @example
      * * const shopifyOrderRecord = await api.shopifyOrder.update("1", {
        *   additionalFees: {
        *     example: true,
        *     key: "value",
        *   },
        *   billingAddress: {
        *     example: true,
        *     key: "value",
        *   },
        *   browserIp: "example value for browserIp",
        *   cancellation: {
        *     example: true,
        *     key: "value",
        *   },
        *   id: "1",
        * });
      **/
      <Options extends UpdateShopifyOrderOptions>(
        id: string,
        variables: UpdateShopifyOrderVariables,
        options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>
      ): Promise<UpdateShopifyOrderResult<Options>>;
      /**
       * Executes the update actionon one record specified by `id`.Runs the action and returns a Promise for the updated record.
      *
      * This is the fully qualified, nested api identifier style overload that should be used when there's an ambiguity between an action param and a model field.
      *
      * @example
      * * const shopifyOrderRecord = await api.shopifyOrder.update("1", {
        *   shopifyOrder: {
        *     additionalFees: {
        *       example: true,
        *       key: "value",
        *     },
        *     billingAddress: {
        *       example: true,
        *       key: "value",
        *     },
        *     browserIp: "example value for browserIp",
        *     cancellation: {
        *       example: true,
        *       key: "value",
        *     },
        *     id: "1",
        *   },
        * });
      **/
      <Options extends UpdateShopifyOrderOptions>(
        id: string,
        variables: FullyQualifiedUpdateShopifyOrderVariables,
        options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>
      ): Promise<UpdateShopifyOrderResult<Options>>;
      type: 'action';
      operationName: 'updateShopifyOrder';
      operationReturnType: 'UpdateShopifyOrder';
      namespace: null;
      modelApiIdentifier: typeof modelApiIdentifier;
      operatesWithRecordIdentity: true;
      modelSelectionField: typeof modelApiIdentifier;
      isBulk: false;
      isDeleter: false;
      variables: {
          id: { required: true, type: 'GadgetID' },
          shopifyOrder: { required: false, type: 'UpdateShopifyOrderInput' }
        };
      variablesType: (
              { id: string }
              & (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables)
            );
      hasAmbiguousIdentifier: false;
      paramOnlyVariables: [];
      hasReturnType: false;
      acceptsModelInput: true;
      hasCreateOrUpdateEffect: true;
      imports: [ 'UpdateShopifyOrderInput' ];
      optionsType: UpdateShopifyOrderOptions;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
      defaultSelection: typeof DefaultShopifyOrderSelection;
    }
  bulkUpdate: {
      /**
        * Executes the bulkUpdate action with the given inputs.
        */
       <Options extends UpdateShopifyOrderOptions>(
          inputs: (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables & { id: string })[],
          options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>
       ): Promise<UpdateShopifyOrderResult<Options>[]>
      type: 'action';
      operationName: 'bulkUpdateShopifyOrders';
      isBulk: true;
      isDeleter: false;
      hasReturnType: false;
      acceptsModelInput: true;
      operatesWithRecordIdentity: true;
      singleActionFunctionName: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      modelSelectionField: typeof pluralModelApiIdentifier;
      optionsType: UpdateShopifyOrderOptions;
      namespace: null;
      variables: { inputs: { required: true, type: '[BulkUpdateShopifyOrdersInput!]' } };
      variablesType: (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables & { id: string })[];
      paramOnlyVariables: [];
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
      defaultSelection: typeof DefaultShopifyOrderSelection;
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyOrder';
      errorMessage: string;
      optionsType: DeleteShopifyOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyOrders';
      errorMessage: string;
      optionsType: DeleteShopifyOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.bulkDelete';
    }
};

/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export const ShopifyOrderManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyOrderSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyOrder',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyOrders',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.bulkCreate'
    },
    {
      type: 'action',
      operationName: 'updateShopifyOrder',
      operationReturnType: 'UpdateShopifyOrder',
      functionName: 'update',
      namespace: null,
      modelApiIdentifier: modelApiIdentifier,
      operatesWithRecordIdentity: true,
      modelSelectionField: modelApiIdentifier,
      isBulk: false,
      isDeleter: false,
      variables: {
        id: { required: true, type: 'GadgetID' },
        shopifyOrder: { required: false, type: 'UpdateShopifyOrderInput' }
      },
      hasAmbiguousIdentifier: false,
      paramOnlyVariables: [],
      hasReturnType: false,
      acceptsModelInput: true,
      hasCreateOrUpdateEffect: true,
      defaultSelection: DefaultShopifyOrderSelection
    },
    {
      type: 'action',
      operationName: 'bulkUpdateShopifyOrders',
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
        inputs: { required: true, type: '[BulkUpdateShopifyOrdersInput!]' }
      },
      paramOnlyVariables: [],
      defaultSelection: DefaultShopifyOrderSelection
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyOrder',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyOrders',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.bulkDelete'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyOrderManager;
};