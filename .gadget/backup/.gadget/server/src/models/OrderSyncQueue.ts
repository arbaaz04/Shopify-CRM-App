// All the generated types for the "orderSyncQueue" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/bambe-crm-app";
import { GadgetRecord, OrderSyncQueue } from "@gadget-client/bambe-crm-app";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultOrderSyncQueueServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly shopifyOrderId: true;
    readonly shopifyOrder: false;
      readonly shopId: true;
    readonly shop: false;
      readonly status: true;
      readonly syncAttempts: true;
      readonly lastSyncAt: true;
      readonly lastErrorMessage: true;
      readonly trackingId: true;
      readonly trackingSyncedToSheet: true;
  };

