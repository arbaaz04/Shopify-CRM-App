
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import { GadgetRecord, DeliveryCharges } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultDeliveryChargesServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly currency: true
	readonly lastUpdated: true
	readonly shopId: true
	readonly shop: false
	readonly senditCharge: true
	readonly speedafCharge: true
};
/** Context of the `create` action on the `deliveryCharges` model. */
export interface CreateDeliveryChargesActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `deliveryCharges` record this action is operating on.
	*/
	record: GadgetRecord<Select<DeliveryCharges, DefaultDeliveryChargesServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		deliveryCharges?: {
			currency?: string
			lastUpdated?: Date
			shop?: {
				_link: string | null
			}
			senditCharge?: number
			speedafCharge?: number
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateDeliveryChargesActionContext;
}
/** Context of the `update` action on the `deliveryCharges` model. */
export interface UpdateDeliveryChargesActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `deliveryCharges` record this action is operating on.
	*/
	record: GadgetRecord<Select<DeliveryCharges, DefaultDeliveryChargesServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		deliveryCharges?: {
			currency?: string
			lastUpdated?: Date
			shop?: {
				_link: string | null
			}
			senditCharge?: number
			speedafCharge?: number
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateDeliveryChargesActionContext;
}
/** Context of the `delete` action on the `deliveryCharges` model. */
export interface DeleteDeliveryChargesActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `deliveryCharges` record this action is operating on.
	*/
	record: GadgetRecord<Select<DeliveryCharges, DefaultDeliveryChargesServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: DeleteDeliveryChargesActionContext;
}
