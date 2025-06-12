
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import { GadgetRecord, SpeedafConfig } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultSpeedafConfigServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly apiEndpoint: true
	readonly appCode: true
	readonly customerCode: true
	readonly lastAuthenticated: true
	readonly name: true
	readonly platformSource: true
	readonly secretKey: true
	readonly shopId: true
	readonly shop: false
};
/** Context of the `create` action on the `speedafConfig` model. */
export interface CreateSpeedafConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `speedafConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SpeedafConfig, DefaultSpeedafConfigServerSelection>>;
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
		speedafConfig?: {
			apiEndpoint?: string
			appCode?: string
			customerCode?: string
			lastAuthenticated?: Date
			name?: string
			platformSource?: string
			secretKey?: string
			shop?: {
				_link: string | null
			}
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateSpeedafConfigActionContext;
}
/** Context of the `update` action on the `speedafConfig` model. */
export interface UpdateSpeedafConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `speedafConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SpeedafConfig, DefaultSpeedafConfigServerSelection>>;
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
		speedafConfig?: {
			apiEndpoint?: string
			appCode?: string
			customerCode?: string
			lastAuthenticated?: Date
			name?: string
			platformSource?: string
			secretKey?: string
			shop?: {
				_link: string | null
			}
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateSpeedafConfigActionContext;
}
/** Context of the `delete` action on the `speedafConfig` model. */
export interface DeleteSpeedafConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `speedafConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SpeedafConfig, DefaultSpeedafConfigServerSelection>>;
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
	context: DeleteSpeedafConfigActionContext;
}
/** Context of the `findFirst` action on the `speedafConfig` model. */
export interface FindFirstSpeedafConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `speedafConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SpeedafConfig, DefaultSpeedafConfigServerSelection>>;
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
	context: FindFirstSpeedafConfigActionContext;
}
