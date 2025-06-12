
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import { GadgetRecord, ShopifyProductVariant } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";
export type DefaultShopifyProductVariantServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly barcode: true
	readonly compareAtPrice: true
	readonly inventoryPolicy: true
	readonly inventoryQuantity: true
	readonly option1: true
	readonly option2: true
	readonly option3: true
	readonly position: true
	readonly price: true
	readonly sku: true
	readonly taxable: true
	readonly title: true
	readonly productId: true
	readonly product: false
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyProductVariant` model. */
export interface CreateShopifyProductVariantActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProductVariant` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
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
		shopifyProductVariant?: {
			id?: string
			barcode?: string
			compareAtPrice?: string
			inventoryPolicy?: string
			inventoryQuantity?: number
			option1?: string
			option2?: string
			option3?: string
			position?: number
			price?: string
			sku?: string
			taxable?: boolean
			title?: string
			product?: {
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
	context: CreateShopifyProductVariantActionContext;
}
/** Context of the `update` action on the `shopifyProductVariant` model. */
export interface UpdateShopifyProductVariantActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProductVariant` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
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
		shopifyProductVariant?: {
			id?: string
			barcode?: string
			compareAtPrice?: string
			inventoryPolicy?: string
			inventoryQuantity?: number
			option1?: string
			option2?: string
			option3?: string
			position?: number
			price?: string
			sku?: string
			taxable?: boolean
			title?: string
			product?: {
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
	context: UpdateShopifyProductVariantActionContext;
}
/** Context of the `delete` action on the `shopifyProductVariant` model. */
export interface DeleteShopifyProductVariantActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyProductVariant` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"products/delete"> | ShopifyWebhookTriggerForTopic<"products/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteShopifyProductVariantActionContext;
}
