
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyProduct } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes.js";
export type DefaultShopifyProductServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly category: true
	readonly hasVariantsThatRequiresComponents: true
	readonly body: true
	readonly shopifyCreatedAt: true
	readonly handle: true
	readonly productType: true
	readonly publishedAt: true
	readonly status: true
	readonly tags: true
	readonly templateSuffix: true
	readonly shopifyUpdatedAt: true
	readonly compareAtPriceRange: true
	readonly productCategory: true
	readonly title: true
	readonly vendor: true
	readonly variants: false
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyProduct` model. */
export interface CreateShopifyProductActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProduct` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProduct, DefaultShopifyProductServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"products/create"> | ShopifyWebhookTriggerForTopic<"products/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyProduct?: {
			id?: string
			category?: Scalars["JSON"]
			hasVariantsThatRequiresComponents?: boolean
			body?: string
			shopifyCreatedAt?: Date
			handle?: string
			productType?: string
			publishedAt?: Date
			status?: string
			tags?: Scalars["JSON"]
			templateSuffix?: string
			shopifyUpdatedAt?: Date
			compareAtPriceRange?: Scalars["JSON"]
			productCategory?: Scalars["JSON"]
			title?: string
			vendor?: string
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyProductActionContext;
}
/** Context of the `update` action on the `shopifyProduct` model. */
export interface UpdateShopifyProductActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProduct` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProduct, DefaultShopifyProductServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"products/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyProduct?: {
			id?: string
			category?: Scalars["JSON"]
			hasVariantsThatRequiresComponents?: boolean
			body?: string
			shopifyCreatedAt?: Date
			handle?: string
			productType?: string
			publishedAt?: Date
			status?: string
			tags?: Scalars["JSON"]
			templateSuffix?: string
			shopifyUpdatedAt?: Date
			compareAtPriceRange?: Scalars["JSON"]
			productCategory?: Scalars["JSON"]
			title?: string
			vendor?: string
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyProductActionContext;
}
/** Context of the `delete` action on the `shopifyProduct` model. */
export interface DeleteShopifyProductActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProduct` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProduct, DefaultShopifyProductServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"products/delete">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteShopifyProductActionContext;
}
