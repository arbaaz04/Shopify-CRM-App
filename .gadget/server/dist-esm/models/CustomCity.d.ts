
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import { GadgetRecord, CustomCity } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultCustomCityServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly isActive: true
	readonly addedAt: true
	readonly courierType: true
	readonly name: true
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `customCity` model. */
export interface CreateCustomCityActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `customCity` record this action is operating on.
	*/
	record: GadgetRecord<Select<CustomCity, DefaultCustomCityServerSelection>>;
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
		customCity?: {
			name?: string
			courierType?: string
			isActive?: boolean
			addedAt?: Date
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateCustomCityActionContext;
}
/** Context of the `update` action on the `customCity` model. */
export interface UpdateCustomCityActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `customCity` record this action is operating on.
	*/
	record: GadgetRecord<Select<CustomCity, DefaultCustomCityServerSelection>>;
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
		customCity?: {
			name?: string
			courierType?: string
			isActive?: boolean
			addedAt?: Date
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateCustomCityActionContext;
}
/** Context of the `delete` action on the `customCity` model. */
export interface DeleteCustomCityActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `customCity` record this action is operating on.
	*/
	record: GadgetRecord<Select<CustomCity, DefaultCustomCityServerSelection>>;
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
	context: DeleteCustomCityActionContext;
}
