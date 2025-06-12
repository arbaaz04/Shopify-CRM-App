
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyFulfillmentOrder } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes.js";
export type DefaultShopifyFulfillmentOrderServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly shopifyCreatedAt: true
	readonly fulfillAt: true
	readonly fulfillBy: true
	readonly internationalDuties: true
	readonly requestStatus: true
	readonly status: true
	readonly supportedActions: true
	readonly shopifyUpdatedAt: true
	readonly orderId: true
	readonly order: false
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyFulfillmentOrder` model. */
export interface CreateShopifyFulfillmentOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentOrder, DefaultShopifyFulfillmentOrderServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"fulfillment_orders/order_routing_complete"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_submitted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_accepted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_rejected"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/placed_on_hold"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_submitted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_accepted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_rejected"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancelled"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_service_failed_to_complete"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/moved"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/split"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/merged"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/hold_released"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/line_items_prepared_for_local_delivery"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/line_items_prepared_for_pickup"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/rescheduled"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/scheduled_fulfillment_order_ready"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyFulfillmentOrder?: {
			id?: string
			shopifyCreatedAt?: Date
			fulfillAt?: Date
			fulfillBy?: Date
			internationalDuties?: Scalars["JSON"]
			requestStatus?: string
			status?: string
			supportedActions?: Scalars["JSON"]
			shopifyUpdatedAt?: Date
			order?: {
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
	context: CreateShopifyFulfillmentOrderActionContext;
}
/** Context of the `update` action on the `shopifyFulfillmentOrder` model. */
export interface UpdateShopifyFulfillmentOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentOrder, DefaultShopifyFulfillmentOrderServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"fulfillment_orders/order_routing_complete"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_submitted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_accepted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_request_rejected"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/placed_on_hold"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_submitted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_accepted"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancellation_request_rejected"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/cancelled"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/fulfillment_service_failed_to_complete"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/moved"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/split"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/merged"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/hold_released"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/line_items_prepared_for_local_delivery"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/line_items_prepared_for_pickup"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/rescheduled"> | ShopifyWebhookTriggerForTopic<"fulfillment_orders/scheduled_fulfillment_order_ready"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyFulfillmentOrder?: {
			id?: string
			shopifyCreatedAt?: Date
			fulfillAt?: Date
			fulfillBy?: Date
			internationalDuties?: Scalars["JSON"]
			requestStatus?: string
			status?: string
			supportedActions?: Scalars["JSON"]
			shopifyUpdatedAt?: Date
			order?: {
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
	context: UpdateShopifyFulfillmentOrderActionContext;
}
/** Context of the `delete` action on the `shopifyFulfillmentOrder` model. */
export interface DeleteShopifyFulfillmentOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentOrder, DefaultShopifyFulfillmentOrderServerSelection>>;
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
	context: DeleteShopifyFulfillmentOrderActionContext;
}
