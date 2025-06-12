// All the generated types for the "shopifyShop" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyShop } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultShopifyShopServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly state: true;
      readonly plan: true;
      readonly accessToken: true;
      readonly address1: true;
      readonly address2: true;
      readonly city: true;
      readonly country: true;
      readonly countryCode: true;
      readonly countryName: true;
      readonly countyTaxes: true;
      readonly shopifyCreatedAt: true;
      readonly currency: true;
      readonly customerEmail: true;
      readonly disabledWebhooks: true;
      readonly domain: true;
      readonly eligibleForPayments: true;
      readonly email: true;
      readonly enabledPresentmentCurrencies: true;
      readonly finances: true;
      readonly googleAppsDomain: true;
      readonly googleAppsLoginEnabled: true;
      readonly grantedScopes: true;
      readonly hasDiscounts: true;
      readonly hasGiftCards: true;
      readonly hasStorefront: true;
      readonly ianaTimezone: true;
      readonly installedViaApiKey: true;
      readonly latitude: true;
      readonly longitude: true;
      readonly marketingSmsContentEnabledAtCheckout: true;
      readonly moneyFormat: true;
      readonly moneyInEmailsFormat: true;
      readonly moneyWithCurrencyFormat: true;
      readonly moneyWithCurrencyInEmailsFormat: true;
      readonly multiLocationEnabled: true;
      readonly myshopifyDomain: true;
      readonly name: true;
      readonly passwordEnabled: true;
      readonly phone: true;
      readonly planDisplayName: true;
      readonly planName: true;
      readonly preLaunchEnabled: true;
      readonly primaryLocale: true;
      readonly province: true;
      readonly provinceCode: true;
      readonly registeredWebhooks: true;
      readonly requiresExtraPaymentsAgreement: true;
      readonly setupRequired: true;
      readonly shopOwner: true;
      readonly source: true;
      readonly shopifyUpdatedAt: true;
      readonly syncs: false;
      readonly gdprRequests: false;
      readonly fulfillmentOrders: false;
      readonly fulfillmentServices: false;
      readonly fulfillments: false;
      readonly customers: false;
      readonly orders: false;
      readonly productVariants: false;
      readonly products: false;
  };

  
/** Context of the `update` action on the `shopifyShop` model. */
export interface UpdateShopifyShopActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyShop` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"shop/update"> | TriggerWithType<"shopify_sync">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyShop?: { id?: string;plan?: Scalars["JSON"];address1?: string;address2?: string;city?: string;country?: string;countryCode?: string;countryName?: string;countyTaxes?: Scalars["JSON"];shopifyCreatedAt?: Date;currency?: string;customerEmail?: string;domain?: string;eligibleForPayments?: boolean;email?: string;enabledPresentmentCurrencies?: string[];finances?: boolean;googleAppsDomain?: string;googleAppsLoginEnabled?: boolean;hasDiscounts?: boolean;hasGiftCards?: boolean;hasStorefront?: boolean;ianaTimezone?: string;latitude?: number;longitude?: number;marketingSmsContentEnabledAtCheckout?: boolean;moneyFormat?: string;moneyInEmailsFormat?: string;moneyWithCurrencyFormat?: string;moneyWithCurrencyInEmailsFormat?: string;multiLocationEnabled?: boolean;myshopifyDomain?: string;name?: string;passwordEnabled?: boolean;phone?: string;planDisplayName?: string;planName?: string;preLaunchEnabled?: boolean;primaryLocale?: string;province?: string;provinceCode?: string;requiresExtraPaymentsAgreement?: boolean;setupRequired?: boolean;shopOwner?: string;source?: string;shopifyUpdatedAt?: Date; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: UpdateShopifyShopActionContext;
};


    
/** Context of the `install` action on the `shopifyShop` model. */
export interface InstallShopifyShopActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyShop` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: TriggerWithType<"shopify_oauth">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyShop?: { id?: string;plan?: Scalars["JSON"];address1?: string;address2?: string;city?: string;country?: string;countryCode?: string;countryName?: string;countyTaxes?: Scalars["JSON"];shopifyCreatedAt?: Date;currency?: string;customerEmail?: string;domain?: string;eligibleForPayments?: boolean;email?: string;enabledPresentmentCurrencies?: string[];finances?: boolean;googleAppsDomain?: string;googleAppsLoginEnabled?: boolean;hasDiscounts?: boolean;hasGiftCards?: boolean;hasStorefront?: boolean;ianaTimezone?: string;latitude?: number;longitude?: number;marketingSmsContentEnabledAtCheckout?: boolean;moneyFormat?: string;moneyInEmailsFormat?: string;moneyWithCurrencyFormat?: string;moneyWithCurrencyInEmailsFormat?: string;multiLocationEnabled?: boolean;myshopifyDomain?: string;name?: string;passwordEnabled?: boolean;phone?: string;planDisplayName?: string;planName?: string;preLaunchEnabled?: boolean;primaryLocale?: string;province?: string;provinceCode?: string;requiresExtraPaymentsAgreement?: boolean;setupRequired?: boolean;shopOwner?: string;source?: string;shopifyUpdatedAt?: Date; };
};
  /**
  * @private The context of this action.
  */
  context: InstallShopifyShopActionContext;
};


    
/** Context of the `reinstall` action on the `shopifyShop` model. */
export interface ReinstallShopifyShopActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyShop` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: TriggerWithType<"shopify_oauth">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyShop?: { id?: string;plan?: Scalars["JSON"];address1?: string;address2?: string;city?: string;country?: string;countryCode?: string;countryName?: string;countyTaxes?: Scalars["JSON"];shopifyCreatedAt?: Date;currency?: string;customerEmail?: string;domain?: string;eligibleForPayments?: boolean;email?: string;enabledPresentmentCurrencies?: string[];finances?: boolean;googleAppsDomain?: string;googleAppsLoginEnabled?: boolean;hasDiscounts?: boolean;hasGiftCards?: boolean;hasStorefront?: boolean;ianaTimezone?: string;latitude?: number;longitude?: number;marketingSmsContentEnabledAtCheckout?: boolean;moneyFormat?: string;moneyInEmailsFormat?: string;moneyWithCurrencyFormat?: string;moneyWithCurrencyInEmailsFormat?: string;multiLocationEnabled?: boolean;myshopifyDomain?: string;name?: string;passwordEnabled?: boolean;phone?: string;planDisplayName?: string;planName?: string;preLaunchEnabled?: boolean;primaryLocale?: string;province?: string;provinceCode?: string;requiresExtraPaymentsAgreement?: boolean;setupRequired?: boolean;shopOwner?: string;source?: string;shopifyUpdatedAt?: Date; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: ReinstallShopifyShopActionContext;
};


    
/** Context of the `uninstall` action on the `shopifyShop` model. */
export interface UninstallShopifyShopActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyShop` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"app/uninstalled">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyShop?: { id?: string;plan?: Scalars["JSON"];address1?: string;address2?: string;city?: string;country?: string;countryCode?: string;countryName?: string;countyTaxes?: Scalars["JSON"];shopifyCreatedAt?: Date;currency?: string;customerEmail?: string;domain?: string;eligibleForPayments?: boolean;email?: string;enabledPresentmentCurrencies?: string[];finances?: boolean;googleAppsDomain?: string;googleAppsLoginEnabled?: boolean;hasDiscounts?: boolean;hasGiftCards?: boolean;hasStorefront?: boolean;ianaTimezone?: string;latitude?: number;longitude?: number;marketingSmsContentEnabledAtCheckout?: boolean;moneyFormat?: string;moneyInEmailsFormat?: string;moneyWithCurrencyFormat?: string;moneyWithCurrencyInEmailsFormat?: string;multiLocationEnabled?: boolean;myshopifyDomain?: string;name?: string;passwordEnabled?: boolean;phone?: string;planDisplayName?: string;planName?: string;preLaunchEnabled?: boolean;primaryLocale?: string;province?: string;provinceCode?: string;requiresExtraPaymentsAgreement?: boolean;setupRequired?: boolean;shopOwner?: string;source?: string;shopifyUpdatedAt?: Date; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: UninstallShopifyShopActionContext;
};


  