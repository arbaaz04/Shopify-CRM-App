
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import { GadgetRecord, ShopifyFulfillmentService } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultShopifyFulfillmentServiceServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly serviceName: true
	readonly type: true
	readonly adminGraphqlApiId: true
	readonly callbackUrl: true
	readonly format: true
	readonly fulfillmentOrdersOptIn: true
	readonly handle: true
	readonly inventoryManagement: true
	readonly name: true
	readonly permitsSkuSharing: true
	readonly requiresShippingMethod: true
	readonly trackingSupport: true
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `shopifyFulfillmentService` model. */
export interface CreateShopifyFulfillmentServiceActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentService` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentService, DefaultShopifyFulfillmentServiceServerSelection>>;
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
		shopifyFulfillmentService?: {
			serviceName?: string
			type?: string
			adminGraphqlApiId?: string
			callbackUrl?: string
			format?: string
			fulfillmentOrdersOptIn?: boolean
			handle?: string
			inventoryManagement?: boolean
			name?: string
			permitsSkuSharing?: boolean
			requiresShippingMethod?: boolean
			trackingSupport?: boolean
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyFulfillmentServiceActionContext;
}
/** Context of the `update` action on the `shopifyFulfillmentService` model. */
export interface UpdateShopifyFulfillmentServiceActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentService` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentService, DefaultShopifyFulfillmentServiceServerSelection>>;
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
		shopifyFulfillmentService?: {
			serviceName?: string
			type?: string
			adminGraphqlApiId?: string
			callbackUrl?: string
			format?: string
			fulfillmentOrdersOptIn?: boolean
			handle?: string
			inventoryManagement?: boolean
			name?: string
			permitsSkuSharing?: boolean
			requiresShippingMethod?: boolean
			trackingSupport?: boolean
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyFulfillmentServiceActionContext;
}
/** Context of the `delete` action on the `shopifyFulfillmentService` model. */
export interface DeleteShopifyFulfillmentServiceActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyFulfillmentService` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyFulfillmentService, DefaultShopifyFulfillmentServiceServerSelection>>;
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
	context: DeleteShopifyFulfillmentServiceActionContext;
}
