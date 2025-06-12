
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import { GadgetRecord, SenditConfig } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultSenditConfigServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly accountType: true
	readonly lastAuthenticated: true
	readonly name: true
	readonly publicKey: true
	readonly secretKey: true
	readonly shopId: true
	readonly shop: false
	readonly token: true
};
/** Context of the `create` action on the `senditConfig` model. */
export interface CreateSenditConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `senditConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SenditConfig, DefaultSenditConfigServerSelection>>;
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
		senditConfig?: {
			accountType?: string
			lastAuthenticated?: Date
			name?: string
			publicKey?: string
			secretKey?: string
			shop?: {
				_link: string | null
			}
			token?: string
		}
	};
	/**
	* @private The context of this action.
	*/
	context: CreateSenditConfigActionContext;
}
/** Context of the `update` action on the `senditConfig` model. */
export interface UpdateSenditConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `senditConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SenditConfig, DefaultSenditConfigServerSelection>>;
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
		senditConfig?: {
			accountType?: string
			lastAuthenticated?: Date
			name?: string
			publicKey?: string
			secretKey?: string
			shop?: {
				_link: string | null
			}
			token?: string
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateSenditConfigActionContext;
}
/** Context of the `delete` action on the `senditConfig` model. */
export interface DeleteSenditConfigActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `senditConfig` record this action is operating on.
	*/
	record: GadgetRecord<Select<SenditConfig, DefaultSenditConfigServerSelection>>;
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
	context: DeleteSenditConfigActionContext;
}
