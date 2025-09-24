// All the generated types for the "blacklistedPhone" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, BlacklistedPhone } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultBlacklistedPhoneServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly addedAt: true;
      readonly phone: true;
      readonly shopId: true;
    readonly shop: false;
  };

  
/** Context of the `create` action on the `blacklistedPhone` model. */
export interface CreateBlacklistedPhoneActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `blacklistedPhone` record this action is operating on.
  */
  record: GadgetRecord<Select<BlacklistedPhone, DefaultBlacklistedPhoneServerSelection>>;
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
blacklistedPhone?: { addedAt?: Date;phone?: string;shop?: { _link: string | null }; };
};
  /**
  * @private The context of this action.
  */
  context: CreateBlacklistedPhoneActionContext;
};


    
/** Context of the `delete` action on the `blacklistedPhone` model. */
export interface DeleteBlacklistedPhoneActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `blacklistedPhone` record this action is operating on.
  */
  record: GadgetRecord<Select<BlacklistedPhone, DefaultBlacklistedPhoneServerSelection>>;
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
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: DeleteBlacklistedPhoneActionContext;
};


  