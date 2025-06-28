import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyOrder, AvailableShopifyOrderSelection, ShopifyOrderSort, ShopifyOrderFilter, UpdateShopifyOrderInput } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyOrder. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyOrderOrDefault<Options extends Selectable<AvailableShopifyOrderSelection>> = DeepFilterNever<Select<ShopifyOrder, DefaultSelection<AvailableShopifyOrderSelection, Options, typeof DefaultShopifyOrderSelection>>>;
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
export type ShopifyOrderRecord<Selection extends AvailableShopifyOrderSelection | undefined = typeof DefaultShopifyOrderSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyOrderOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyOrderSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly additionalFees: true;
    readonly autoWrite: true;
    readonly billingAddress: true;
    readonly browserIp: true;
    readonly buyerAcceptsMarketing: true;
    readonly cancelReason: true;
    readonly cancellation: true;
    readonly cancelledAt: true;
    readonly cartToken: true;
    readonly checkoutToken: true;
    readonly clientDetails: true;
    readonly closedAt: true;
    readonly createdAt: true;
    readonly currency: true;
    readonly customerId: true;
    readonly customerLocale: true;
    readonly discountApplications: true;
    readonly discountCodes: true;
    readonly email: true;
    readonly estimatedTaxes: true;
    readonly financialStatus: true;
    readonly fulfillmentStatus: true;
    readonly landingSite: true;
    readonly name: true;
    readonly note: true;
    readonly noteAttributes: true;
    readonly orderStatusUrl: true;
    readonly paymentGatewayNames: true;
    readonly presentmentCurrency: true;
    readonly processedAt: true;
    readonly processingMethod: true;
    readonly shippingAddress: true;
    readonly shopId: true;
    readonly shopifyShopId: true;
    readonly sourceName: true;
    readonly subtotalPrice: true;
    readonly subtotalPriceSet: true;
    readonly tags: true;
    readonly taxLines: true;
    readonly taxesIncluded: true;
    readonly test: true;
    readonly totalDiscounts: true;
    readonly totalDiscountsSet: true;
    readonly totalLineItemsPrice: true;
    readonly totalLineItemsPriceSet: true;
    readonly totalOutstanding: true;
    readonly totalPrice: true;
    readonly totalPriceSet: true;
    readonly totalTax: true;
    readonly totalTaxSet: true;
    readonly totalTipReceived: true;
    readonly totalWeight: true;
    readonly updatedAt: true;
    readonly writeOrder: true;
};
declare const modelApiIdentifier: "shopifyOrder";
declare const pluralModelApiIdentifier: "shopifyOrders";
/** Options that can be passed to the `ShopifyOrderManager#findOne` method */
export interface FindOneShopifyOrderOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyOrderSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyOrderManager#maybeFindOne` method */
export interface MaybeFindOneShopifyOrderOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyOrderSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
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
}
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
}
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
}
export interface CreateShopifyOrderOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyOrderSelection;
}
export interface UpdateShopifyOrderOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyOrderSelection;
}
export interface DeleteShopifyOrderOptions {
}
/**
 * The fully-qualified, expanded form of the inputs for executing the update action.
 * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
 **/
export type FullyQualifiedUpdateShopifyOrderVariables = {
    shopifyOrder?: UpdateShopifyOrderInput;
};
/**
 * The inputs for executing update on shopifyOrder.
 * This is the flattened style of inputs, suitable for general use, and should be preferred.
 **/
export type UpdateShopifyOrderVariables = UpdateShopifyOrderInput;
/**
 * The return value from executing update on shopifyOrder
 * Is a GadgetRecord of the model's type.
 **/
export type UpdateShopifyOrderResult<Options extends UpdateShopifyOrderOptions> = SelectedShopifyOrderOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifyOrderOrDefault<Options>>;
/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export type ShopifyOrderManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options, ShopifyOrderRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyOrderSelection;
        namespace: null;
        optionsType: FindOneShopifyOrderOptions;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options, ShopifyOrderRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyOrderOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyOrderSelection;
        namespace: null;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
    };
    findMany: {
        /**
         * Finds many shopifyOrder. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyOrdersOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyOrdersOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyOrderRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyOrdersOptions;
        defaultSelection: typeof DefaultShopifyOrderSelection;
        namespace: null;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options, ShopifyOrderRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyOrderOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyOrderSelection;
        namespace: null;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options, ShopifyOrderRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyOrderOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyOrderSelection;
        namespace: null;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
    };
    findById: {
        /**
        * Finds one shopifyOrder by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options, ShopifyOrderRecord<Options["select"]>>;
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
    };
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
    };
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
    };
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
    };
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
        <Options extends UpdateShopifyOrderOptions>(id: string, variables: UpdateShopifyOrderVariables, options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>): Promise<UpdateShopifyOrderResult<Options>>;
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
        <Options extends UpdateShopifyOrderOptions>(id: string, variables: FullyQualifiedUpdateShopifyOrderVariables, options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>): Promise<UpdateShopifyOrderResult<Options>>;
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
            id: {
                required: true;
                type: 'GadgetID';
            };
            shopifyOrder: {
                required: false;
                type: 'UpdateShopifyOrderInput';
            };
        };
        variablesType: ({
            id: string;
        } & (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables));
        hasAmbiguousIdentifier: false;
        paramOnlyVariables: [];
        hasReturnType: false;
        acceptsModelInput: true;
        hasCreateOrUpdateEffect: true;
        imports: ['UpdateShopifyOrderInput'];
        optionsType: UpdateShopifyOrderOptions;
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
        defaultSelection: typeof DefaultShopifyOrderSelection;
    };
    bulkUpdate: {
        /**
          * Executes the bulkUpdate action with the given inputs.
          */
        <Options extends UpdateShopifyOrderOptions>(inputs: (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables & {
            id: string;
        })[], options?: LimitToKnownKeys<Options, UpdateShopifyOrderOptions>): Promise<UpdateShopifyOrderResult<Options>[]>;
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
        variables: {
            inputs: {
                required: true;
                type: '[BulkUpdateShopifyOrdersInput!]';
            };
        };
        variablesType: (FullyQualifiedUpdateShopifyOrderVariables | UpdateShopifyOrderVariables & {
            id: string;
        })[];
        paramOnlyVariables: [];
        selectionType: AvailableShopifyOrderSelection;
        schemaType: Query["shopifyOrder"];
        defaultSelection: typeof DefaultShopifyOrderSelection;
    };
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
    };
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
    };
};
/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export declare const ShopifyOrderManager: {
    new (connection: GadgetConnection): ShopifyOrderManager;
};
export {};
