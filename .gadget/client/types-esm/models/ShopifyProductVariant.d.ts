import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, PromiseOrLiveIterator, ShopifyProductVariant, AvailableShopifyProductVariantSelection, ShopifyProductVariantSort, ShopifyProductVariantFilter } from "../types.js";
/**
* A type that holds only the selected fields (and nested fields) of shopifyProductVariant. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyProductVariantOrDefault<Options extends Selectable<AvailableShopifyProductVariantSelection>> = DeepFilterNever<Select<ShopifyProductVariant, DefaultSelection<AvailableShopifyProductVariantSelection, Options, typeof DefaultShopifyProductVariantSelection>>>;
/**
 * A type that represents a `GadgetRecord` type for shopifyProductVariant.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyProductVariantRecord, recordWithName: ShopifyProductVariantRecord<{ select: { name: true; } }>) => {
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
export type ShopifyProductVariantRecord<Selection extends AvailableShopifyProductVariantSelection | undefined = typeof DefaultShopifyProductVariantSelection> = DeepFilterNever<GadgetRecord<SelectedShopifyProductVariantOrDefault<{
    select: Selection;
}>>>;
export declare const DefaultShopifyProductVariantSelection: {
    readonly __typename: true;
    readonly id: true;
    readonly barcode: true;
    readonly compareAtPrice: true;
    readonly createdAt: true;
    readonly inventoryPolicy: true;
    readonly inventoryQuantity: true;
    readonly option1: true;
    readonly option2: true;
    readonly option3: true;
    readonly position: true;
    readonly price: true;
    readonly productId: true;
    readonly shopId: true;
    readonly sku: true;
    readonly taxable: true;
    readonly title: true;
    readonly updatedAt: true;
};
declare const modelApiIdentifier: "shopifyProductVariant";
declare const pluralModelApiIdentifier: "shopifyProductVariants";
/** Options that can be passed to the `ShopifyProductVariantManager#findOne` method */
export interface FindOneShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyProductVariantManager#maybeFindOne` method */
export interface MaybeFindOneShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
}
/** Options that can be passed to the `ShopifyProductVariantManager#findMany` method */
export interface FindManyShopifyProductVariantsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyProductVariantManager#findFirst` method */
export interface FindFirstShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyProductVariantManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
    /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
    live?: boolean;
    /** Return records sorted by these sorts */
    sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
export interface CreateShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
}
export interface UpdateShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
}
export interface DeleteShopifyProductVariantOptions {
}
/**
 * A manager for the shopifyProductVariant model with all the available operations for reading and writing to it.*/
export type ShopifyProductVariantManager = {
    readonly connection: GadgetConnection;
    findOne: {
        /**
         * Finds one shopifyProductVariant by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
         **/
        <Options extends FindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>): PromiseOrLiveIterator<Options, ShopifyProductVariantRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        optionsType: FindOneShopifyProductVariantOptions;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    maybeFindOne: {
        /**
         * Finds one shopifyProductVariant by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
         **/
        <Options extends MaybeFindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyProductVariantOptions>): PromiseOrLiveIterator<Options, ShopifyProductVariantRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof modelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: MaybeFindOneShopifyProductVariantOptions;
        findByVariableName: 'id';
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    findMany: {
        /**
         * Finds many shopifyProductVariant. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindManyShopifyProductVariantsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyProductVariantsOptions>): PromiseOrLiveIterator<Options, GadgetRecordList<ShopifyProductVariantRecord<Options["select"]>>>;
        type: 'findMany';
        operationName: typeof pluralModelApiIdentifier;
        modelApiIdentifier: typeof modelApiIdentifier;
        optionsType: FindManyShopifyProductVariantsOptions;
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    findFirst: {
        /**
         * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
         **/
        <Options extends FindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyProductVariantOptions>): PromiseOrLiveIterator<Options, ShopifyProductVariantRecord<Options["select"]>>;
        type: 'findFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: FindFirstShopifyProductVariantOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    maybeFindFirst: {
        /**
         * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
         **/
        <Options extends MaybeFindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyProductVariantOptions>): PromiseOrLiveIterator<Options, ShopifyProductVariantRecord<Options["select"]> | null>;
        type: 'maybeFindFirst';
        operationName: typeof pluralModelApiIdentifier;
        optionsType: MaybeFindFirstShopifyProductVariantOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    findById: {
        /**
        * Finds one shopifyProductVariant by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
        **/
        <Options extends FindOneShopifyProductVariantOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>): PromiseOrLiveIterator<Options, ShopifyProductVariantRecord<Options["select"]>>;
        type: 'findOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyProductVariantOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    maybeFindById: {
        /**
        * Finds one shopifyProductVariant by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
        **/
        <Options extends FindOneShopifyProductVariantOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>): Promise<ShopifyProductVariantRecord<Options["select"]> | null>;
        type: 'maybeFindOne';
        operationName: typeof pluralModelApiIdentifier;
        findByField: 'id';
        findByVariableName: 'id';
        optionsType: FindOneShopifyProductVariantOptions;
        modelApiIdentifier: typeof modelApiIdentifier;
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        namespace: null;
        selectionType: AvailableShopifyProductVariantSelection;
        schemaType: Query["shopifyProductVariant"];
    };
    create: {
        /**
         * @deprecated The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'createShopifyProductVariant';
        errorMessage: 'The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyProductVariantOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.create';
    };
    bulkCreate: {
        /**
         * @deprecated The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkCreateShopifyProductVariants';
        errorMessage: 'The action create on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: CreateShopifyProductVariantOptions;
        actionApiIdentifier: 'create';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.bulkCreate';
    };
    update: {
        /**
         * @deprecated The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'updateShopifyProductVariant';
        errorMessage: 'The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyProductVariantOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.update';
    };
    bulkUpdate: {
        /**
         * @deprecated The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkUpdateShopifyProductVariants';
        errorMessage: 'The action update on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: UpdateShopifyProductVariantOptions;
        actionApiIdentifier: 'update';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.bulkUpdate';
    };
    delete: {
        /**
         * @deprecated The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'deleteShopifyProductVariant';
        errorMessage: 'The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: DeleteShopifyProductVariantOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.delete';
    };
    bulkDelete: {
        /**
         * @deprecated The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
         */
        (...args: any[]): never;
        type: 'stubbedAction';
        operationName: 'bulkDeleteShopifyProductVariants';
        errorMessage: 'The action delete on model shopifyProductVariant does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
        optionsType: DeleteShopifyProductVariantOptions;
        actionApiIdentifier: 'delete';
        modelApiIdentifier: typeof modelApiIdentifier;
        schemaType: null;
        selectionType: Record<string, never>;
        variables: {};
        reason: 'MissingApiTrigger';
        dataPath: 'shopifyProductVariant.bulkDelete';
    };
};
/**
 * A manager for the shopifyProductVariant model with all the available operations for reading and writing to it.*/
export declare const ShopifyProductVariantManager: {
    new (connection: GadgetConnection): ShopifyProductVariantManager;
};
export {};
