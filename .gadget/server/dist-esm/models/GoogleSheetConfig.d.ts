
import { AmbientContext } from "../AmbientContext.js";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types.js";
import { GadgetRecord, GoogleSheetConfig } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultGoogleSheetConfigServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly orderSheetName: true
	readonly shopId: true
	readonly shop: false
	readonly customerSheetName: true
	readonly courierApiProvider: true
	readonly spreadsheetId: true
	readonly courierApiKey: true
};
/** Context of the `create` action on the `googleSheetConfig` model. */
export interface CreateGoogleSheetConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `googleSheetConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<GoogleSheetConfig, DefaultGoogleSheetConfigServerSelection>>;
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
		googleSheetConfig?: {
			orderSheetName?: string
			shop?: {
				_link: string | null
			}
			customerSheetName?: string
			courierApiProvider?: string
			spreadsheetId?: string
			courierApiKey?: string
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateGoogleSheetConfigActionContext;
}
/** Context of the `update` action on the `googleSheetConfig` model. */
export interface UpdateGoogleSheetConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `googleSheetConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<GoogleSheetConfig, DefaultGoogleSheetConfigServerSelection>>;
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
		googleSheetConfig?: {
			orderSheetName?: string
			shop?: {
				_link: string | null
			}
			customerSheetName?: string
			courierApiProvider?: string
			spreadsheetId?: string
			courierApiKey?: string
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateGoogleSheetConfigActionContext;
}
/** Context of the `delete` action on the `googleSheetConfig` model. */
export interface DeleteGoogleSheetConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `googleSheetConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<GoogleSheetConfig, DefaultGoogleSheetConfigServerSelection>>;
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
	context: DeleteGoogleSheetConfigActionContext;
}
