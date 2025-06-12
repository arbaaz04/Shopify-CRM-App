
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyFulfillment } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";
export type DefaultShopifyFulfillmentServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly name: true
	readonly orderId: true
	readonly order: false
	readonly originAddress: true
	readonly receipt: true
	readonly service: true
	readonly shipmentStatus: true
	readonly shopifyCreatedAt: true
	readonly status: true
	readonly shopifyUpdatedAt: true
	readonly deliveredAt: true
	readonly trackingCompany: true
	readonly trackingNumbers: true
	readonly trackingUrls: true
	readonly displayStatus: true
	readonly estimatedDeliveryAt: true
	readonly inTransitAt: true
	readonly requiresShipping: true
	readonly totalQuantity: true
	readonly trackingInfo: true
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyFulfillment` model. */
export interface CreateShopifyFulfillmentActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillment` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillment, DefaultShopifyFulfillmentServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"fulfillments/create"> | ShopifyWebhookTriggerForTopic<"fulfillments/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyFulfillment?: {
			id?: string
			name?: string
			order?: {
				_link: string | null
			}
			originAddress?: Scalars["JSON"]
			receipt?: Scalars["JSON"]
			service?: string
			shipmentStatus?: string
			shopifyCreatedAt?: Date
			status?: string
			shopifyUpdatedAt?: Date
			deliveredAt?: Date
			trackingCompany?: string
			trackingNumbers?: Scalars["JSON"]
			trackingUrls?: Scalars["JSON"]
			displayStatus?: string
			estimatedDeliveryAt?: Date
			inTransitAt?: Date
			requiresShipping?: boolean
			totalQuantity?: number
			trackingInfo?: Scalars["JSON"]
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyFulfillmentActionContext;
}
/** Context of the `update` action on the `shopifyFulfillment` model. */
export interface UpdateShopifyFulfillmentActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillment` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillment, DefaultShopifyFulfillmentServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"fulfillments/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyFulfillment?: {
			id?: string
			name?: string
			order?: {
				_link: string | null
			}
			originAddress?: Scalars["JSON"]
			receipt?: Scalars["JSON"]
			service?: string
			shipmentStatus?: string
			shopifyCreatedAt?: Date
			status?: string
			shopifyUpdatedAt?: Date
			deliveredAt?: Date
			trackingCompany?: string
			trackingNumbers?: Scalars["JSON"]
			trackingUrls?: Scalars["JSON"]
			displayStatus?: string
			estimatedDeliveryAt?: Date
			inTransitAt?: Date
			requiresShipping?: boolean
			totalQuantity?: number
			trackingInfo?: Scalars["JSON"]
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyFulfillmentActionContext;
}
/** Context of the `delete` action on the `shopifyFulfillment` model. */
export interface DeleteShopifyFulfillmentActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillment` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillment, DefaultShopifyFulfillmentServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteShopifyFulfillmentActionContext;
}
