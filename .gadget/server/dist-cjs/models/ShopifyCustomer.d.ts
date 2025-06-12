
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyCustomer } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";
export type DefaultShopifyCustomerServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly statistics: true
	readonly locale: true
	readonly acceptsMarketing: true
	readonly acceptsMarketingUpdatedAt: true
	readonly shopifyCreatedAt: true
	readonly currency: true
	readonly email: true
	readonly emailMarketingConsent: true
	readonly firstName: true
	readonly lastName: true
	readonly marketingOptInLevel: true
	readonly multipassIdentifier: true
	readonly note: true
	readonly orders: false
	readonly phone: true
	readonly smsMarketingConsent: true
	readonly shopifyState: true
	readonly tags: true
	readonly taxExempt: true
	readonly taxExemptions: true
	readonly shopifyUpdatedAt: true
	readonly verifiedEmail: true
	readonly lastOrderId: true
	readonly lastOrder: false
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyCustomer` model. */
export interface CreateShopifyCustomerActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyCustomer` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyCustomer, DefaultShopifyCustomerServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"customers/create"> | ShopifyWebhookTriggerForTopic<"customers/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyCustomer?: {
			id?: string
			statistics?: Scalars["JSON"]
			locale?: string
			acceptsMarketing?: boolean
			acceptsMarketingUpdatedAt?: Date
			shopifyCreatedAt?: Date
			currency?: string
			email?: string
			emailMarketingConsent?: Scalars["JSON"]
			firstName?: string
			lastName?: string
			marketingOptInLevel?: string
			multipassIdentifier?: string
			note?: string
			phone?: string
			smsMarketingConsent?: Scalars["JSON"]
			shopifyState?: string
			tags?: Scalars["JSON"]
			taxExempt?: boolean
			taxExemptions?: string[]
			shopifyUpdatedAt?: Date
			verifiedEmail?: boolean
			lastOrder?: {
				_link: string | null
			}
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyCustomerActionContext;
}
/** Context of the `update` action on the `shopifyCustomer` model. */
export interface UpdateShopifyCustomerActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyCustomer` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyCustomer, DefaultShopifyCustomerServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"customers/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyCustomer?: {
			id?: string
			statistics?: Scalars["JSON"]
			locale?: string
			acceptsMarketing?: boolean
			acceptsMarketingUpdatedAt?: Date
			shopifyCreatedAt?: Date
			currency?: string
			email?: string
			emailMarketingConsent?: Scalars["JSON"]
			firstName?: string
			lastName?: string
			marketingOptInLevel?: string
			multipassIdentifier?: string
			note?: string
			phone?: string
			smsMarketingConsent?: Scalars["JSON"]
			shopifyState?: string
			tags?: Scalars["JSON"]
			taxExempt?: boolean
			taxExemptions?: string[]
			shopifyUpdatedAt?: Date
			verifiedEmail?: boolean
			lastOrder?: {
				_link: string | null
			}
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyCustomerActionContext;
}
/** Context of the `delete` action on the `shopifyCustomer` model. */
export interface DeleteShopifyCustomerActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyCustomer` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyCustomer, DefaultShopifyCustomerServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"customers/delete">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteShopifyCustomerActionContext;
}
