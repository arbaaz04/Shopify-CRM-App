
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyOrder } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes.js";
export type DefaultShopifyOrderServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly additionalFees: true
	readonly cancellation: true
	readonly billingAddress: true
	readonly browserIp: true
	readonly buyerAcceptsMarketing: true
	readonly cancelReason: true
	readonly cancelledAt: true
	readonly cartToken: true
	readonly checkoutToken: true
	readonly clientDetails: true
	readonly closedAt: true
	readonly currency: true
	readonly customerLocale: true
	readonly discountApplications: true
	readonly discountCodes: true
	readonly email: true
	readonly estimatedTaxes: true
	readonly financialStatus: true
	readonly fulfillmentStatus: true
	readonly landingSite: true
	readonly name: true
	readonly note: true
	readonly noteAttributes: true
	readonly orderStatusUrl: true
	readonly paymentGatewayNames: true
	readonly presentmentCurrency: true
	readonly processedAt: true
	readonly processingMethod: true
	readonly shippingAddress: true
	readonly sourceName: true
	readonly subtotalPrice: true
	readonly subtotalPriceSet: true
	readonly tags: true
	readonly taxLines: true
	readonly taxesIncluded: true
	readonly test: true
	readonly totalDiscounts: true
	readonly totalDiscountsSet: true
	readonly totalLineItemsPrice: true
	readonly totalLineItemsPriceSet: true
	readonly totalOutstanding: true
	readonly totalPrice: true
	readonly totalPriceSet: true
	readonly totalTax: true
	readonly totalTaxSet: true
	readonly totalTipReceived: true
	readonly totalWeight: true
	readonly customerId: true
	readonly customer: false
	readonly fulfillments: false
	readonly shopifyShopId: true
	readonly shopifyShop: false
	readonly fulfillmentOrders: false
	readonly shopId: true
	readonly shop: false
	readonly writeOrder: true
	readonly autoWrite: true
};
/** Context of the `create` action on the `shopifyOrder` model. */
export interface CreateShopifyOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"orders/create"> | ShopifyWebhookTriggerForTopic<"orders/updated"> | ShopifyWebhookTriggerForTopic<"orders/risk_assessment_changed"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyOrder?: {
			id?: string
			additionalFees?: Scalars["JSON"]
			cancellation?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			browserIp?: string
			buyerAcceptsMarketing?: boolean
			cancelReason?: string
			cancelledAt?: Date
			cartToken?: string
			checkoutToken?: string
			clientDetails?: Scalars["JSON"]
			closedAt?: Date
			currency?: string
			customerLocale?: string
			discountApplications?: Scalars["JSON"]
			discountCodes?: Scalars["JSON"]
			email?: string
			estimatedTaxes?: boolean
			financialStatus?: string
			fulfillmentStatus?: string
			landingSite?: string
			name?: string
			note?: string
			noteAttributes?: Scalars["JSON"]
			orderStatusUrl?: string
			paymentGatewayNames?: Scalars["JSON"]
			presentmentCurrency?: string
			processedAt?: Date
			processingMethod?: string
			shippingAddress?: Scalars["JSON"]
			sourceName?: string
			subtotalPrice?: string
			subtotalPriceSet?: Scalars["JSON"]
			tags?: Scalars["JSON"]
			taxLines?: Scalars["JSON"]
			taxesIncluded?: boolean
			test?: boolean
			totalDiscounts?: string
			totalDiscountsSet?: Scalars["JSON"]
			totalLineItemsPrice?: string
			totalLineItemsPriceSet?: Scalars["JSON"]
			totalOutstanding?: string
			totalPrice?: string
			totalPriceSet?: Scalars["JSON"]
			totalTax?: string
			totalTaxSet?: Scalars["JSON"]
			totalTipReceived?: string
			totalWeight?: number
			customer?: {
				_link: string | null
			}
			shopifyShop?: {
				_link: string | null
			}
			shop?: {
				_link: string | null
			}
			writeOrder?: boolean
			autoWrite?: boolean
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateShopifyOrderActionContext;
}
/** Context of the `update` action on the `shopifyOrder` model. */
export interface UpdateShopifyOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"orders/updated"> | ShopifyWebhookTriggerForTopic<"orders/risk_assessment_changed"> | TriggerWithType<"shopify_sync"> | TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyOrder?: {
			id?: string
			additionalFees?: Scalars["JSON"]
			cancellation?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			browserIp?: string
			buyerAcceptsMarketing?: boolean
			cancelReason?: string
			cancelledAt?: Date
			cartToken?: string
			checkoutToken?: string
			clientDetails?: Scalars["JSON"]
			closedAt?: Date
			currency?: string
			customerLocale?: string
			discountApplications?: Scalars["JSON"]
			discountCodes?: Scalars["JSON"]
			email?: string
			estimatedTaxes?: boolean
			financialStatus?: string
			fulfillmentStatus?: string
			landingSite?: string
			name?: string
			note?: string
			noteAttributes?: Scalars["JSON"]
			orderStatusUrl?: string
			paymentGatewayNames?: Scalars["JSON"]
			presentmentCurrency?: string
			processedAt?: Date
			processingMethod?: string
			shippingAddress?: Scalars["JSON"]
			sourceName?: string
			subtotalPrice?: string
			subtotalPriceSet?: Scalars["JSON"]
			tags?: Scalars["JSON"]
			taxLines?: Scalars["JSON"]
			taxesIncluded?: boolean
			test?: boolean
			totalDiscounts?: string
			totalDiscountsSet?: Scalars["JSON"]
			totalLineItemsPrice?: string
			totalLineItemsPriceSet?: Scalars["JSON"]
			totalOutstanding?: string
			totalPrice?: string
			totalPriceSet?: Scalars["JSON"]
			totalTax?: string
			totalTaxSet?: Scalars["JSON"]
			totalTipReceived?: string
			totalWeight?: number
			customer?: {
				_link: string | null
			}
			shopifyShop?: {
				_link: string | null
			}
			shop?: {
				_link: string | null
			}
			writeOrder?: boolean
			autoWrite?: boolean
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyOrderActionContext;
}
/** Context of the `delete` action on the `shopifyOrder` model. */
export interface DeleteShopifyOrderActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyOrder` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"orders/delete">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteShopifyOrderActionContext;
}
