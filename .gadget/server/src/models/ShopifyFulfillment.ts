// All the generated types for the "shopifyFulfillment" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, ShopifyFulfillment } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultShopifyFulfillmentServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly shopifyCreatedAt: true;
      readonly name: true;
      readonly originAddress: true;
      readonly receipt: true;
      readonly service: true;
      readonly shipmentStatus: true;
      readonly status: true;
      readonly trackingCompany: true;
      readonly trackingNumbers: true;
      readonly trackingUrls: true;
      readonly shopifyUpdatedAt: true;
      readonly orderId: true;
    readonly order: false;
      readonly shopId: true;
    readonly shop: false;
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
shopifyFulfillment?: { id?: string;shopifyCreatedAt?: Date;name?: string;originAddress?: Scalars["JSON"];receipt?: Scalars["JSON"];service?: string;shipmentStatus?: string;status?: string;trackingCompany?: string;trackingNumbers?: Scalars["JSON"];trackingUrls?: Scalars["JSON"];shopifyUpdatedAt?: Date;order?: { _link: string | null };shop?: { _link: string | null }; };
};
  /**
  * @private The context of this action.
  */
  context: CreateShopifyFulfillmentActionContext;
};


    
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
shopifyFulfillment?: { id?: string;shopifyCreatedAt?: Date;name?: string;originAddress?: Scalars["JSON"];receipt?: Scalars["JSON"];service?: string;shipmentStatus?: string;status?: string;trackingCompany?: string;trackingNumbers?: Scalars["JSON"];trackingUrls?: Scalars["JSON"];shopifyUpdatedAt?: Date;order?: { _link: string | null };shop?: { _link: string | null }; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: UpdateShopifyFulfillmentActionContext;
};


    
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
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: DeleteShopifyFulfillmentActionContext;
};


  