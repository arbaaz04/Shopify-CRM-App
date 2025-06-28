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
  ShopifyShop,
  AvailableShopifyShopSelection,
  ShopifyShopSort,
  ShopifyShopFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";


/**
* A type that holds only the selected fields (and nested fields) of shopifyShop. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyShopOrDefault<Options extends Selectable<AvailableShopifyShopSelection>> = DeepFilterNever<
    Select<
      ShopifyShop,
      DefaultSelection<
        AvailableShopifyShopSelection,
        Options,
        typeof DefaultShopifyShopSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyShop.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyShopRecord, recordWithName: ShopifyShopRecord<{ select: { name: true; } }>) => {
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
export type ShopifyShopRecord<Selection extends AvailableShopifyShopSelection | undefined = typeof DefaultShopifyShopSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyShopOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyShopSelection = {
     __typename: true,
     id: true,
     state: true,
     address1: true,
     address2: true,
     city: true,
     country: true,
     countryCode: true,
     countryName: true,
     countyTaxes: true,
     createdAt: true,
     currency: true,
     customerEmail: true,
     disabledWebhooks: true,
     domain: true,
     eligibleForPayments: true,
     email: true,
     enabledPresentmentCurrencies: true,
     finances: true,
     googleAppsDomain: true,
     googleAppsLoginEnabled: true,
     grantedScopes: true,
     hasDiscounts: true,
     hasGiftCards: true,
     hasStorefront: true,
     ianaTimezone: true,
     installedViaApiKey: true,
     latitude: true,
     longitude: true,
     marketingSmsContentEnabledAtCheckout: true,
     moneyFormat: true,
     moneyInEmailsFormat: true,
     moneyWithCurrencyFormat: true,
     moneyWithCurrencyInEmailsFormat: true,
     multiLocationEnabled: true,
     myshopifyDomain: true,
     name: true,
     passwordEnabled: true,
     phone: true,
     plan: true,
     planDisplayName: true,
     planName: true,
     preLaunchEnabled: true,
     primaryLocale: true,
     province: true,
     provinceCode: true,
     registeredWebhooks: true,
     requiresExtraPaymentsAgreement: true,
     setupRequired: true,
     shopOwner: true,
     shopifyCreatedAt: true,
     shopifyUpdatedAt: true,
     source: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "shopifyShop" as const;
const pluralModelApiIdentifier = "shopifyShops" as const;
/** Options that can be passed to the `ShopifyShopManager#findOne` method */
 export interface FindOneShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyShopManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyShopManager#findMany` method */
 export interface FindManyShopifyShopsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyShopManager#findFirst` method */
 export interface FindFirstShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyShopManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface UpdateShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};
export interface InstallShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};
export interface ReinstallShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};
export interface UninstallShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};

/**
 * A manager for the shopifyShop model with all the available operations for reading and writing to it.*/
export type ShopifyShopManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyShop by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): PromiseOrLiveIterator<Options,ShopifyShopRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      optionsType: FindOneShopifyShopOptions;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyShop by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyShopOptions>): PromiseOrLiveIterator<Options,ShopifyShopRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyShopOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  findMany: {
      /**
       * Finds many shopifyShop. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyShopsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyShopsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyShopRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyShopsOptions;
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyShopOptions>): PromiseOrLiveIterator<Options,ShopifyShopRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyShopOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyShopOptions>): PromiseOrLiveIterator<Options,ShopifyShopRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyShopOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  findById: {
      /**
      * Finds one shopifyShop by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyShopOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): PromiseOrLiveIterator<Options,ShopifyShopRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyShopOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyShop by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyShopOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): Promise<ShopifyShopRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyShopOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyShopSelection;
      namespace: null;
      selectionType: AvailableShopifyShopSelection;
      schemaType: Query["shopifyShop"];
    }
  update: {
      /**
       * @deprecated The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyShop';
      errorMessage: string;
      optionsType: UpdateShopifyShopOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyShops';
      errorMessage: string;
      optionsType: UpdateShopifyShopOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.bulkUpdate';
    }
  install: {
      /**
       * @deprecated The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'installShopifyShop';
      errorMessage: string;
      optionsType: InstallShopifyShopOptions;
      actionApiIdentifier: 'install';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.install';
    }
  bulkInstall: {
      /**
       * @deprecated The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkInstallShopifyShops';
      errorMessage: string;
      optionsType: InstallShopifyShopOptions;
      actionApiIdentifier: 'install';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.bulkInstall';
    }
  reinstall: {
      /**
       * @deprecated The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'reinstallShopifyShop';
      errorMessage: string;
      optionsType: ReinstallShopifyShopOptions;
      actionApiIdentifier: 'reinstall';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.reinstall';
    }
  bulkReinstall: {
      /**
       * @deprecated The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkReinstallShopifyShops';
      errorMessage: string;
      optionsType: ReinstallShopifyShopOptions;
      actionApiIdentifier: 'reinstall';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.bulkReinstall';
    }
  uninstall: {
      /**
       * @deprecated The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'uninstallShopifyShop';
      errorMessage: string;
      optionsType: UninstallShopifyShopOptions;
      actionApiIdentifier: 'uninstall';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.uninstall';
    }
  bulkUninstall: {
      /**
       * @deprecated The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUninstallShopifyShops';
      errorMessage: string;
      optionsType: UninstallShopifyShopOptions;
      actionApiIdentifier: 'uninstall';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyShop.bulkUninstall';
    }
};

/**
 * A manager for the shopifyShop model with all the available operations for reading and writing to it.*/
export const ShopifyShopManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyShopSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyShopSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyShop',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyShops',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'installShopifyShop',
      functionName: 'install',
      errorMessage: 'The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'install',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.install'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkInstallShopifyShops',
      functionName: 'bulkInstall',
      errorMessage: 'The action install on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'install',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.bulkInstall'
    },
    {
      type: 'stubbedAction',
      operationName: 'reinstallShopifyShop',
      functionName: 'reinstall',
      errorMessage: 'The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'reinstall',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.reinstall'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkReinstallShopifyShops',
      functionName: 'bulkReinstall',
      errorMessage: 'The action reinstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'reinstall',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.bulkReinstall'
    },
    {
      type: 'stubbedAction',
      operationName: 'uninstallShopifyShop',
      functionName: 'uninstall',
      errorMessage: 'The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'uninstall',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.uninstall'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUninstallShopifyShops',
      functionName: 'bulkUninstall',
      errorMessage: 'The action uninstall on model shopifyShop does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'uninstall',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyShop.bulkUninstall'
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyShopManager;
};