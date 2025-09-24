import type { ShopifyWebhookActionTrigger } from "./types";
/**
 * Shopify webhook payload for the "app/uninstalled" topic
 */

export interface ShopifyAppUninstalledPayload {
  address1: string;
  address2: null | string;
  auto_configure_tax_inclusivity: boolean | null;
  checkout_api_supported: boolean;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  county_taxes: boolean | null;
  created_at: null | string;
  currency: string;
  customer_email: string;
  domain: null | string;
  eligible_for_payments: boolean;
  email: string;
  enabled_presentment_currencies: string[];
  finances: boolean;
  google_apps_domain: null | string;
  google_apps_login_enabled: boolean | null;
  has_discounts: boolean;
  has_gift_cards: boolean;
  has_storefront: boolean;
  iana_timezone: null | string;
  id: number;
  latitude: null | number;
  longitude: null | number;
  marketing_sms_consent_enabled_at_checkout: boolean;
  money_format: string;
  money_in_emails_format: string;
  money_with_currency_format: string;
  money_with_currency_in_emails_format: string;
  multi_location_enabled: boolean;
  myshopify_domain: null | string;
  name: string;
  password_enabled: boolean | null;
  phone: string;
  plan_display_name: string;
  plan_name: string;
  pre_launch_enabled: boolean;
  primary_locale: string;
  primary_location_id: number;
  province: string;
  province_code: string;
  requires_extra_payments_agreement: boolean;
  setup_required: boolean;
  shop_owner: string;
  source: null | string;
  tax_shipping: boolean | null;
  taxes_included: boolean | null;
  timezone: string;
  transactional_sms_disabled: boolean;
  updated_at: null | string;
  weight_unit: string;
  zip: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "app/uninstalled" topic
 */
export interface ShopifyAppUninstalledTrigger extends ShopifyWebhookActionTrigger {
  topic: "app/uninstalled";
  payload: ShopifyAppUninstalledPayload;
}
/**
 * Shopify webhook payload for the "customers/create" topic
 */

export interface ShopifyCustomersCreatePayload {
  addresses: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    country_code: string;
    country_name: string;
    customer_id: number;
    default: boolean;
    first_name: string;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  }[];
  admin_graphql_api_id: string;
  created_at: string;
  currency: string;
  default_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    country_name: string;
    customer_id: number;
    default: boolean;
    first_name: string;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  email: null | string;
  first_name: string;
  id: number;
  last_name: string;
  multipass_identifier: null | string;
  note: string;
  phone: null | string;
  state: string;
  tax_exempt: boolean;
  tax_exemptions: string[];
  updated_at: string;
  verified_email: boolean;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/create" topic
 */
export interface ShopifyCustomersCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/create";
  payload: ShopifyCustomersCreatePayload;
}
/**
 * Shopify webhook payload for the "customers/data_request" topic
 */

export interface ShopifyCustomersDataRequestPayload {
  customer: {
    email: string;
    id: number;
    phone: string;
    [k: string]: unknown;
  };
  data_request: {
    id: number;
    [k: string]: unknown;
  };
  orders_requested: number[];
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/data_request" topic
 */
export interface ShopifyCustomersDataRequestTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/data_request";
  payload: ShopifyCustomersDataRequestPayload;
}
/**
 * Shopify webhook payload for the "customers/delete" topic
 */

export interface ShopifyCustomersDeletePayload {
  addresses: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    country_code: string;
    country_name: string;
    customer_id: number;
    default: boolean;
    first_name: string;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  }[];
  admin_graphql_api_id: string;
  id: number;
  phone: null | string;
  tax_exemptions: string[];
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/delete" topic
 */
export interface ShopifyCustomersDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/delete";
  payload: ShopifyCustomersDeletePayload;
}
/**
 * Shopify webhook payload for the "customers/redact" topic
 */

export interface ShopifyCustomersRedactPayload {
  customer: {
    email: string;
    id: number;
    phone: string;
    [k: string]: unknown;
  };
  orders_to_redact: number[];
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/redact" topic
 */
export interface ShopifyCustomersRedactTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/redact";
  payload: ShopifyCustomersRedactPayload;
}
/**
 * Shopify webhook payload for the "customers/update" topic
 */

export interface ShopifyCustomersUpdatePayload {
  addresses: {
    address1: string;
    address2: string;
    city: string;
    company: string;
    country: string;
    country_code: string;
    country_name: string;
    customer_id: number;
    default: boolean;
    first_name: string;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  }[];
  admin_graphql_api_id: string;
  created_at: string;
  currency: string;
  default_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    country_name: string;
    customer_id: number;
    default: boolean;
    first_name: string;
    id: number;
    last_name: string;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  email: null | string;
  first_name: string;
  id: number;
  last_name: string;
  multipass_identifier: null | string;
  note: string;
  phone: null | string;
  state: string;
  tax_exempt: boolean;
  tax_exemptions: string[];
  updated_at: string;
  verified_email: boolean;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/update" topic
 */
export interface ShopifyCustomersUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/update";
  payload: ShopifyCustomersUpdatePayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_accepted" topic
 */

export interface ShopifyFulfillmentOrdersCancellationRequestAcceptedPayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  message: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_accepted" topic
 */
export interface ShopifyFulfillmentOrdersCancellationRequestAcceptedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/cancellation_request_accepted";
  payload: ShopifyFulfillmentOrdersCancellationRequestAcceptedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_rejected" topic
 */

export interface ShopifyFulfillmentOrdersCancellationRequestRejectedPayload {
  fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  message: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_rejected" topic
 */
export interface ShopifyFulfillmentOrdersCancellationRequestRejectedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/cancellation_request_rejected";
  payload: ShopifyFulfillmentOrdersCancellationRequestRejectedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_submitted" topic
 */

export interface ShopifyFulfillmentOrdersCancellationRequestSubmittedPayload {
  fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  fulfillment_order_merchant_request: {
    id: string;
    message: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/cancellation_request_submitted" topic
 */
export interface ShopifyFulfillmentOrdersCancellationRequestSubmittedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/cancellation_request_submitted";
  payload: ShopifyFulfillmentOrdersCancellationRequestSubmittedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/cancelled" topic
 */

export interface ShopifyFulfillmentOrdersCancelledPayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  replacement_fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/cancelled" topic
 */
export interface ShopifyFulfillmentOrdersCancelledTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/cancelled";
  payload: ShopifyFulfillmentOrdersCancelledPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_accepted" topic
 */

export interface ShopifyFulfillmentOrdersFulfillmentRequestAcceptedPayload {
  fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  message: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_accepted" topic
 */
export interface ShopifyFulfillmentOrdersFulfillmentRequestAcceptedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/fulfillment_request_accepted";
  payload: ShopifyFulfillmentOrdersFulfillmentRequestAcceptedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_rejected" topic
 */

export interface ShopifyFulfillmentOrdersFulfillmentRequestRejectedPayload {
  fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  message: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_rejected" topic
 */
export interface ShopifyFulfillmentOrdersFulfillmentRequestRejectedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/fulfillment_request_rejected";
  payload: ShopifyFulfillmentOrdersFulfillmentRequestRejectedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_submitted" topic
 */

export interface ShopifyFulfillmentOrdersFulfillmentRequestSubmittedPayload {
  fulfillment_order_merchant_request: {
    id: string;
    message: string;
    [k: string]: unknown;
  };
  original_fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  submitted_fulfillment_order: {
    id: string;
    request_status: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_request_submitted" topic
 */
export interface ShopifyFulfillmentOrdersFulfillmentRequestSubmittedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/fulfillment_request_submitted";
  payload: ShopifyFulfillmentOrdersFulfillmentRequestSubmittedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_service_failed_to_complete" topic
 */

export interface ShopifyFulfillmentOrdersFulfillmentServiceFailedToCompletePayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  message: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/fulfillment_service_failed_to_complete" topic
 */
export interface ShopifyFulfillmentOrdersFulfillmentServiceFailedToCompleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/fulfillment_service_failed_to_complete";
  payload: ShopifyFulfillmentOrdersFulfillmentServiceFailedToCompletePayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/hold_released" topic
 */

export interface ShopifyFulfillmentOrdersHoldReleasedPayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/hold_released" topic
 */
export interface ShopifyFulfillmentOrdersHoldReleasedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/hold_released";
  payload: ShopifyFulfillmentOrdersHoldReleasedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/line_items_prepared_for_local_delivery" topic
 */

export interface ShopifyFulfillmentOrdersLineItemsPreparedForLocalDeliveryPayload {
  fulfillment_order: {
    delivery_method: {
      method_type: string;
      [k: string]: unknown;
    };
    id: string;
    preparable: boolean;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/line_items_prepared_for_local_delivery" topic
 */
export interface ShopifyFulfillmentOrdersLineItemsPreparedForLocalDeliveryTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/line_items_prepared_for_local_delivery";
  payload: ShopifyFulfillmentOrdersLineItemsPreparedForLocalDeliveryPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/line_items_prepared_for_pickup" topic
 */

export interface ShopifyFulfillmentOrdersLineItemsPreparedForPickupPayload {
  fulfillment_order: {
    delivery_method: {
      method_type: string;
      [k: string]: unknown;
    };
    id: string;
    preparable: boolean;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/line_items_prepared_for_pickup" topic
 */
export interface ShopifyFulfillmentOrdersLineItemsPreparedForPickupTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/line_items_prepared_for_pickup";
  payload: ShopifyFulfillmentOrdersLineItemsPreparedForPickupPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/merged" topic
 */

export interface ShopifyFulfillmentOrdersMergedPayload {
  fulfillment_order_merges: {
    fulfillment_order: {
      id: string;
      status: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  merge_intents: {
    fulfillment_order_id: number;
    fulfillment_order_line_items: {
      id: number;
      quantity: number;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/merged" topic
 */
export interface ShopifyFulfillmentOrdersMergedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/merged";
  payload: ShopifyFulfillmentOrdersMergedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/moved" topic
 */

export interface ShopifyFulfillmentOrdersMovedPayload {
  destination_location_id: string;
  fulfillment_order_line_items_requested: {
    id: string;
    quantity: number;
    [k: string]: unknown;
  }[];
  moved_fulfillment_order: {
    assigned_location_id: string;
    id: string;
    status: string;
    [k: string]: unknown;
  };
  original_fulfillment_order: {
    assigned_location_id: string;
    id: string;
    status: string;
    [k: string]: unknown;
  };
  source_location: {
    id: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/moved" topic
 */
export interface ShopifyFulfillmentOrdersMovedTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/moved";
  payload: ShopifyFulfillmentOrdersMovedPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/order_routing_complete" topic
 */

export interface ShopifyFulfillmentOrdersOrderRoutingCompletePayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/order_routing_complete" topic
 */
export interface ShopifyFulfillmentOrdersOrderRoutingCompleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/order_routing_complete";
  payload: ShopifyFulfillmentOrdersOrderRoutingCompletePayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/placed_on_hold" topic
 */

export interface ShopifyFulfillmentOrdersPlacedOnHoldPayload {
  created_fulfillment_hold: {
    handle: string;
    held_by_app: {
      id: string;
      [k: string]: unknown;
    };
    held_by_requesting_app: boolean;
    id: string;
    reason: string;
    reason_notes: string;
    [k: string]: unknown;
  };
  fulfillment_order: {
    fulfillment_holds: {
      handle: string;
      held_by_app: {
        id: string;
        [k: string]: unknown;
      };
      held_by_requesting_app: boolean;
      id: string;
      reason: string;
      reason_notes: string;
      [k: string]: unknown;
    }[];
    id: string;
    status: string;
    [k: string]: unknown;
  };
  held_fulfillment_order_line_items: {
    id: string;
    quantity: number;
    [k: string]: unknown;
  }[];
  remaining_fulfillment_order: {
    assigned_location?: {
      address1: null;
      address2: null;
      city: null;
      country_code: string;
      location_id: number;
      name: string;
      phone: null;
      province: null;
      zip: null;
      [k: string]: unknown;
    };
    assigned_location_id?: number;
    delivery_method?: {
      id: number;
      max_delivery_date_time: null;
      method_type: string;
      min_delivery_date_time: null;
      [k: string]: unknown;
    };
    destination?: {
      address1: string;
      address2: string;
      city: string;
      company: null;
      country: string;
      email: string;
      first_name: string;
      id: number;
      last_name: string;
      phone: null;
      province: string;
      zip: string;
      [k: string]: unknown;
    };
    fulfill_at?: string;
    fulfill_by?: null;
    fulfillment_holds?: never[];
    id: string | number;
    international_duties?: {
      incoterm: string;
      [k: string]: unknown;
    };
    line_items?: {
      fulfillable_quantity: number;
      fulfillment_order_id: number;
      id: number;
      inventory_item_id: number;
      line_item_id: number;
      quantity: number;
      shop_id: number;
      variant_id: number;
      [k: string]: unknown;
    }[];
    order_id?: number;
    request_status?: string;
    shop_id?: number;
    status: string;
    supported_actions?: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/placed_on_hold" topic
 */
export interface ShopifyFulfillmentOrdersPlacedOnHoldTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/placed_on_hold";
  payload: ShopifyFulfillmentOrdersPlacedOnHoldPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/rescheduled" topic
 */

export interface ShopifyFulfillmentOrdersRescheduledPayload {
  fulfillment_order: {
    fulfill_at: string;
    id: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/rescheduled" topic
 */
export interface ShopifyFulfillmentOrdersRescheduledTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/rescheduled";
  payload: ShopifyFulfillmentOrdersRescheduledPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/scheduled_fulfillment_order_ready" topic
 */

export interface ShopifyFulfillmentOrdersScheduledFulfillmentOrderReadyPayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/scheduled_fulfillment_order_ready" topic
 */
export interface ShopifyFulfillmentOrdersScheduledFulfillmentOrderReadyTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/scheduled_fulfillment_order_ready";
  payload: ShopifyFulfillmentOrdersScheduledFulfillmentOrderReadyPayload;
}
/**
 * Shopify webhook payload for the "fulfillment_orders/split" topic
 */

export interface ShopifyFulfillmentOrdersSplitPayload {
  fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  remaining_fulfillment_order: {
    assigned_location?: {
      address1: null;
      address2: null;
      city: null;
      country_code: string;
      location_id: number;
      name: string;
      phone: null;
      province: null;
      zip: null;
      [k: string]: unknown;
    };
    assigned_location_id?: number;
    delivery_method?: {
      id: number;
      max_delivery_date_time: null;
      method_type: string;
      min_delivery_date_time: null;
      [k: string]: unknown;
    };
    destination?: {
      address1: string;
      address2: string;
      city: string;
      company: null;
      country: string;
      email: string;
      first_name: string;
      id: number;
      last_name: string;
      phone: null;
      province: string;
      zip: string;
      [k: string]: unknown;
    };
    fulfill_at?: string;
    fulfill_by?: null;
    fulfillment_holds?: never[];
    id: string | number;
    international_duties?: {
      incoterm: string;
      [k: string]: unknown;
    };
    line_items?: {
      fulfillable_quantity: number;
      fulfillment_order_id: number;
      id: number;
      inventory_item_id: number;
      line_item_id: number;
      quantity: number;
      shop_id: number;
      variant_id: number;
      [k: string]: unknown;
    }[];
    order_id?: number;
    request_status?: string;
    shop_id?: number;
    status: string;
    supported_actions?: string[];
    [k: string]: unknown;
  };
  replacement_fulfillment_order: {
    id: string;
    status: string;
    [k: string]: unknown;
  };
  split_line_items: {
    id: string;
    quantity: number;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillment_orders/split" topic
 */
export interface ShopifyFulfillmentOrdersSplitTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillment_orders/split";
  payload: ShopifyFulfillmentOrdersSplitPayload;
}
/**
 * Shopify webhook payload for the "fulfillments/create" topic
 */

export interface ShopifyFulfillmentsCreatePayload {
  admin_graphql_api_id: string;
  created_at: string;
  destination: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  email: string;
  id: number;
  line_items: {
    admin_graphql_api_id: string;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: {
      admin_graphql_api_id: string;
      country_code_of_origin: string;
      harmonized_system_code: string;
      id: number;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    }[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    tax_code?: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  name: string;
  order_id: number;
  origin_address: {
    [k: string]: unknown;
  };
  receipt: {
    gift_cards?: {
      id: number;
      line_item_id: number;
      masked_code: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  service: null | string;
  shipment_status: null | string;
  status: string;
  tracking_company: string;
  tracking_number: string;
  tracking_numbers: string[];
  tracking_url: string;
  tracking_urls: string[];
  updated_at: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillments/create" topic
 */
export interface ShopifyFulfillmentsCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillments/create";
  payload: ShopifyFulfillmentsCreatePayload;
}
/**
 * Shopify webhook payload for the "fulfillments/update" topic
 */

export interface ShopifyFulfillmentsUpdatePayload {
  admin_graphql_api_id: string;
  created_at: string;
  destination: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  email: string;
  id: number;
  line_items: {
    admin_graphql_api_id: string;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: {
      admin_graphql_api_id: string;
      country_code_of_origin: string;
      harmonized_system_code: string;
      id: number;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    }[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    tax_code?: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  name: string;
  order_id: number;
  origin_address: {
    [k: string]: unknown;
  };
  receipt: {
    gift_cards?: {
      id: number;
      line_item_id: number;
      masked_code: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  service: null | string;
  shipment_status: null | string;
  status: string;
  tracking_company: string;
  tracking_number: string;
  tracking_numbers: string[];
  tracking_url: string;
  tracking_urls: string[];
  updated_at: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "fulfillments/update" topic
 */
export interface ShopifyFulfillmentsUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "fulfillments/update";
  payload: ShopifyFulfillmentsUpdatePayload;
}
/**
 * Shopify webhook payload for the "orders/create" topic
 */

export interface ShopifyOrdersCreatePayload {
  admin_graphql_api_id: string;
  app_id: number | null;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number | null;
  checkout_token: null | string;
  client_details: null | {
    accept_language: null | string;
    browser_height: number | null;
    browser_ip?: string;
    browser_width?: number | null;
    session_hash?: null;
    user_agent?: string;
    [k: string]: unknown;
  };
  closed_at: null | string;
  confirmation_number: null | string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_subtotal_price: string;
  current_subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_discounts: string;
  current_total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_price: string;
  current_total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_tax: string;
  current_total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: string;
      id: number;
      last_name: string;
      name: string;
      phone: string;
      province: string;
      province_code: string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    marketing_opt_in_level?: string;
    multipass_identifier: null | string;
    note: null | string;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_applications: {
    allocation_method: string;
    code?: string;
    description?: string;
    target_selection: string;
    target_type: string;
    title?: string;
    type: string;
    value: string;
    value_type: string;
    [k: string]: unknown;
  }[];
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  fulfillments: {
    admin_graphql_api_id: string;
    created_at: string;
    id: number;
    line_items: {
      admin_graphql_api_id: string;
      current_quantity?: number;
      discount_allocations: {
        amount: string;
        amount_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        discount_application_index: number;
        [k: string]: unknown;
      }[];
      duties: never[];
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: string;
      gift_card: boolean;
      grams: number;
      id: number;
      name: string;
      pre_tax_price?: string;
      pre_tax_price_set?: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      product_exists: boolean;
      product_id: number;
      properties: never[];
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      variant_id: number;
      variant_inventory_management: null | string;
      variant_title: null | string;
      vendor: string;
      [k: string]: unknown;
    }[];
    location_id: number;
    name: string;
    order_id: number;
    origin_address: {
      [k: string]: unknown;
    };
    receipt: {
      [k: string]: unknown;
    };
    service: string;
    shipment_status: null | string;
    status: string;
    tracking_company: null | string;
    tracking_number: null | string;
    tracking_numbers: string[];
    tracking_url: null | string;
    tracking_urls: string[];
    updated_at: string;
    [k: string]: unknown;
  }[];
  id: number;
  landing_site: null | string;
  landing_site_ref: null | string;
  line_items: {
    admin_graphql_api_id: string;
    attributed_staffs: {
      id: string;
      quantity: number;
      [k: string]: unknown;
    }[];
    current_quantity: number;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: never[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sales_line_item_group_id?: number | null;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  original_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  payment_gateway_names: string[];
  payment_terms: null | string;
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: null | string;
  referring_site: null | string;
  refunds: never[];
  returns: never[];
  shipping_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    carrier_identifier: null | string;
    code: null | string;
    current_discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    discount_allocations: never[];
    discounted_price: string;
    discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    id: number;
    is_removed: boolean;
    phone: null | string;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    requested_fulfillment_service_id: null;
    source: null | string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    title: string;
    [k: string]: unknown;
  }[];
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  tags: string;
  tax_exempt: boolean;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_cash_rounding_refund_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_discounts: string;
  total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tax: string;
  total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/create" topic
 */
export interface ShopifyOrdersCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/create";
  payload: ShopifyOrdersCreatePayload;
}
/**
 * Shopify webhook payload for the "orders/delete" topic
 */

export interface ShopifyOrdersDeletePayload {
  id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/delete" topic
 */
export interface ShopifyOrdersDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/delete";
  payload: ShopifyOrdersDeletePayload;
}
/**
 * Shopify webhook payload for the "orders/risk_assessment_changed" topic
 */

export interface ShopifyOrdersRiskAssessmentChangedPayload {
  admin_graphql_api_order_id: null | string;
  created_at: null | string;
  order_id: null | string;
  provider_id: number | null;
  provider_title: null | string;
  risk_level: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/risk_assessment_changed" topic
 */
export interface ShopifyOrdersRiskAssessmentChangedTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/risk_assessment_changed";
  payload: ShopifyOrdersRiskAssessmentChangedPayload;
}
/**
 * Shopify webhook payload for the "orders/updated" topic
 */

export interface ShopifyOrdersUpdatedPayload {
  admin_graphql_api_id: string;
  app_id: number | null;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number | null;
  checkout_token: null | string;
  client_details: null | {
    accept_language: null | string;
    browser_height: number | null;
    browser_ip?: string;
    browser_width?: number | null;
    session_hash?: null;
    user_agent?: string;
    [k: string]: unknown;
  };
  closed_at: null | string;
  confirmation_number: null | string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_subtotal_price: string;
  current_subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_discounts: string;
  current_total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_price: string;
  current_total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_tax: string;
  current_total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: string;
      id: number;
      last_name: string;
      name: string;
      phone: string;
      province: string;
      province_code: string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    marketing_opt_in_level?: string;
    multipass_identifier: null | string;
    note: null | string;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_applications: {
    allocation_method: string;
    code?: string;
    description?: string;
    target_selection: string;
    target_type: string;
    title?: string;
    type: string;
    value: string;
    value_type: string;
    [k: string]: unknown;
  }[];
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  fulfillments: {
    admin_graphql_api_id: string;
    created_at: string;
    id: number;
    line_items: {
      admin_graphql_api_id: string;
      current_quantity?: number;
      discount_allocations: {
        amount: string;
        amount_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        discount_application_index: number;
        [k: string]: unknown;
      }[];
      duties: never[];
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: string;
      gift_card: boolean;
      grams: number;
      id: number;
      name: string;
      pre_tax_price?: string;
      pre_tax_price_set?: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      product_exists: boolean;
      product_id: number;
      properties: never[];
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      variant_id: number;
      variant_inventory_management: null | string;
      variant_title: null | string;
      vendor: string;
      [k: string]: unknown;
    }[];
    location_id: number;
    name: string;
    order_id: number;
    origin_address: {
      [k: string]: unknown;
    };
    receipt: {
      [k: string]: unknown;
    };
    service: string;
    shipment_status: null | string;
    status: string;
    tracking_company: null | string;
    tracking_number: null | string;
    tracking_numbers: string[];
    tracking_url: null | string;
    tracking_urls: string[];
    updated_at: string;
    [k: string]: unknown;
  }[];
  id: number;
  landing_site: null | string;
  landing_site_ref: null | string;
  line_items: {
    admin_graphql_api_id: string;
    attributed_staffs: {
      id: string;
      quantity: number;
      [k: string]: unknown;
    }[];
    current_quantity: number;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: never[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sales_line_item_group_id?: number | null;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  original_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  payment_gateway_names: string[];
  payment_terms: null | string;
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: null | string;
  referring_site: null | string;
  refunds: never[];
  returns: never[];
  shipping_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    carrier_identifier: null | string;
    code: null | string;
    current_discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    discount_allocations: never[];
    discounted_price: string;
    discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    id: number;
    is_removed: boolean;
    phone: null | string;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    requested_fulfillment_service_id: null;
    source: null | string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    title: string;
    [k: string]: unknown;
  }[];
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  tags: string;
  tax_exempt: boolean;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_cash_rounding_refund_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_discounts: string;
  total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tax: string;
  total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/updated" topic
 */
export interface ShopifyOrdersUpdatedTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/updated";
  payload: ShopifyOrdersUpdatedPayload;
}
/**
 * Shopify webhook payload for the "products/create" topic
 */

export interface ShopifyProductsCreatePayload {
  admin_graphql_api_id: string;
  body_html: string;
  category: null | {
    admin_graphql_api_id: string;
    full_name: string;
    name: string;
    [k: string]: unknown;
  };
  created_at: null | string;
  handle: string;
  has_variants_that_requires_components: boolean;
  id: number;
  image: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  };
  images: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  }[];
  media: {
    admin_graphql_api_id: string;
    alt: string;
    created_at: string;
    id: number;
    media_content_type: string;
    position: number;
    preview_image: {
      height: number;
      src: string;
      status: string;
      width: number;
      [k: string]: unknown;
    };
    product_id: number;
    status: string;
    updated_at: string;
    variant_ids: never[];
    [k: string]: unknown;
  }[];
  options: {
    id: number;
    name: string;
    position: number;
    product_id: number;
    values: string[];
    [k: string]: unknown;
  }[];
  product_type: string;
  published_at: null | string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: null | string;
  title: string;
  updated_at: string;
  variant_gids: {
    admin_graphql_api_id: string;
    updated_at: string;
    [k: string]: unknown;
  }[];
  variants: {
    admin_graphql_api_id: string;
    barcode: null | string;
    compare_at_price: null | string;
    created_at: string;
    fulfillment_service?: string;
    grams?: number;
    id: number;
    image_id: number | null;
    inventory_item_id: number | null;
    inventory_management?: string;
    inventory_policy: string;
    inventory_quantity: number;
    old_inventory_quantity: number;
    option1: string;
    option2: null | string;
    option3: null | string;
    position: number;
    price: string;
    product_id: number;
    requires_shipping?: boolean;
    sku: null | string;
    taxable: boolean;
    title: string;
    updated_at: string;
    weight?: number;
    weight_unit?: string;
    [k: string]: unknown;
  }[];
  vendor: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/create" topic
 */
export interface ShopifyProductsCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/create";
  payload: ShopifyProductsCreatePayload;
}
/**
 * Shopify webhook payload for the "products/delete" topic
 */

export interface ShopifyProductsDeletePayload {
  id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/delete" topic
 */
export interface ShopifyProductsDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/delete";
  payload: ShopifyProductsDeletePayload;
}
/**
 * Shopify webhook payload for the "products/update" topic
 */

export interface ShopifyProductsUpdatePayload {
  admin_graphql_api_id: string;
  body_html: string;
  category: null | {
    admin_graphql_api_id: string;
    full_name: string;
    name: string;
    [k: string]: unknown;
  };
  created_at: null | string;
  handle: string;
  has_variants_that_requires_components: boolean;
  id: number;
  image: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  };
  images: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  }[];
  media: {
    admin_graphql_api_id: string;
    alt: string;
    created_at: string;
    id: number;
    media_content_type: string;
    position: number;
    preview_image: {
      height: number;
      src: string;
      status: string;
      width: number;
      [k: string]: unknown;
    };
    product_id: number;
    status: string;
    updated_at: string;
    variant_ids: never[];
    [k: string]: unknown;
  }[];
  options: {
    id: number;
    name: string;
    position: number;
    product_id: number;
    values: string[];
    [k: string]: unknown;
  }[];
  product_type: string;
  published_at: null | string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: null | string;
  title: string;
  updated_at: string;
  variant_gids: {
    admin_graphql_api_id: string;
    updated_at: string;
    [k: string]: unknown;
  }[];
  variants: {
    admin_graphql_api_id: string;
    barcode: null | string;
    compare_at_price: null | string;
    created_at: string;
    fulfillment_service?: string;
    grams?: number;
    id: number;
    image_id: number | null;
    inventory_item_id: number | null;
    inventory_management?: string;
    inventory_policy: string;
    inventory_quantity: number;
    old_inventory_quantity: number;
    option1: string;
    option2: null | string;
    option3: null | string;
    position: number;
    price: string;
    product_id: number;
    requires_shipping?: boolean;
    sku: null | string;
    taxable: boolean;
    title: string;
    updated_at: string;
    weight?: number;
    weight_unit?: string;
    [k: string]: unknown;
  }[];
  vendor: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/update" topic
 */
export interface ShopifyProductsUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/update";
  payload: ShopifyProductsUpdatePayload;
}
/**
 * Shopify webhook payload for the "shop/redact" topic
 */

export interface ShopifyShopRedactPayload {
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "shop/redact" topic
 */
export interface ShopifyShopRedactTrigger extends ShopifyWebhookActionTrigger {
  topic: "shop/redact";
  payload: ShopifyShopRedactPayload;
}
/**
 * Shopify webhook payload for the "shop/update" topic
 */

export interface ShopifyShopUpdatePayload {
  address1: string;
  address2: null | string;
  auto_configure_tax_inclusivity: boolean | null;
  checkout_api_supported: boolean;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  county_taxes: boolean | null;
  created_at: null | string;
  currency: string;
  customer_email: string;
  domain: null | string;
  eligible_for_payments: boolean;
  email: string;
  enabled_presentment_currencies: string[];
  finances: boolean;
  google_apps_domain: null | string;
  google_apps_login_enabled: boolean | null;
  has_discounts: boolean;
  has_gift_cards: boolean;
  has_storefront: boolean;
  iana_timezone: null | string;
  id: number;
  latitude: null | number;
  longitude: null | number;
  marketing_sms_consent_enabled_at_checkout: boolean;
  money_format: string;
  money_in_emails_format: string;
  money_with_currency_format: string;
  money_with_currency_in_emails_format: string;
  multi_location_enabled: boolean;
  myshopify_domain: null | string;
  name: string;
  password_enabled: boolean | null;
  phone: string;
  plan_display_name: string;
  plan_name: string;
  pre_launch_enabled: boolean;
  primary_locale: string;
  primary_location_id: number;
  province: string;
  province_code: null | string;
  requires_extra_payments_agreement: boolean;
  setup_required: boolean;
  shop_owner: string;
  source: null | string;
  tax_shipping: boolean | null;
  taxes_included: boolean | null;
  timezone: string;
  transactional_sms_disabled: boolean;
  updated_at: null | string;
  weight_unit: string;
  zip: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "shop/update" topic
 */
export interface ShopifyShopUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "shop/update";
  payload: ShopifyShopUpdatePayload;
}

/**
 * Union type of all Shopify webhook payloads
 */
export type ShopifyWebhookTrigger = ShopifyAppUninstalledTrigger | ShopifyCustomersCreateTrigger | ShopifyCustomersDataRequestTrigger | ShopifyCustomersDeleteTrigger | ShopifyCustomersRedactTrigger | ShopifyCustomersUpdateTrigger | ShopifyFulfillmentOrdersCancellationRequestAcceptedTrigger | ShopifyFulfillmentOrdersCancellationRequestRejectedTrigger | ShopifyFulfillmentOrdersCancellationRequestSubmittedTrigger | ShopifyFulfillmentOrdersCancelledTrigger | ShopifyFulfillmentOrdersFulfillmentRequestAcceptedTrigger | ShopifyFulfillmentOrdersFulfillmentRequestRejectedTrigger | ShopifyFulfillmentOrdersFulfillmentRequestSubmittedTrigger | ShopifyFulfillmentOrdersFulfillmentServiceFailedToCompleteTrigger | ShopifyFulfillmentOrdersHoldReleasedTrigger | ShopifyFulfillmentOrdersLineItemsPreparedForLocalDeliveryTrigger | ShopifyFulfillmentOrdersLineItemsPreparedForPickupTrigger | ShopifyFulfillmentOrdersMergedTrigger | ShopifyFulfillmentOrdersMovedTrigger | ShopifyFulfillmentOrdersOrderRoutingCompleteTrigger | ShopifyFulfillmentOrdersPlacedOnHoldTrigger | ShopifyFulfillmentOrdersRescheduledTrigger | ShopifyFulfillmentOrdersScheduledFulfillmentOrderReadyTrigger | ShopifyFulfillmentOrdersSplitTrigger | ShopifyFulfillmentsCreateTrigger | ShopifyFulfillmentsUpdateTrigger | ShopifyOrdersCreateTrigger | ShopifyOrdersDeleteTrigger | ShopifyOrdersRiskAssessmentChangedTrigger | ShopifyOrdersUpdatedTrigger | ShopifyShopRedactTrigger | ShopifyShopUpdateTrigger | ShopifyProductsCreateTrigger | ShopifyProductsDeleteTrigger | ShopifyProductsUpdateTrigger;

/**
 * Shopify webhook payload for a specific topic
 */
export type ShopifyWebhookTriggerForTopic<T extends string> = Extract<ShopifyWebhookTrigger, { topic: T }>;
