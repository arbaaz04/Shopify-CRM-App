
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyGdprRequest } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";
export type DefaultShopifyGdprRequestServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly payload: true
	readonly topic: true
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyGdprRequest` model. */
export interface CreateShopifyGdprRequestActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyGdprRequest` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyGdprRequest, DefaultShopifyGdprRequestServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"shop/redact"> | ShopifyWebhookTriggerForTopic<"customers/redact"> | ShopifyWebhookTriggerForTopic<"customers/data_request">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyGdprRequest?: {
			payload?: Scalars["JSON"]
			topic?: string
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyGdprRequestActionContext;
}
/** Context of the `update` action on the `shopifyGdprRequest` model. */
export interface UpdateShopifyGdprRequestActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyGdprRequest` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyGdprRequest, DefaultShopifyGdprRequestServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"shop/redact"> | ShopifyWebhookTriggerForTopic<"customers/redact"> | ShopifyWebhookTriggerForTopic<"customers/data_request">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyGdprRequest?: {
			payload?: Scalars["JSON"]
			topic?: string
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyGdprRequestActionContext;
}
