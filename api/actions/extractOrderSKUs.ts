/**
 * Extract order data from Shopify and format it for further processing
 */

import { ActionOptions } from "gadget-server";
import { standardizeMoroccanCity, standardizeMoroccanCitySync } from "../utils/cityStandardization";

// Define the action run function type
type ActionRun = (context: { 
  params: { orderId: string; shopId: string },
  api: any, 
  logger: any, 
  connections: any 
}) => Promise<any>;

/**
 * Format phone number to a standardized format for non-Moroccan numbers
 */
function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Return empty string if no digits
  if (!digitsOnly) return "";
  
  // Format based on length
  if (digitsOnly.length === 10) {
    return `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
  } else if (digitsOnly.length > 10) {
    // For international numbers, keep the format simple
    return `+${digitsOnly}`;
  } else {
    // If less than 10 digits, return as is
    return digitsOnly;
  }
}

/**
 * Format Moroccan phone numbers according to local conventions
 * - Removes dashes and spaces
 * - Converts international format (+212) to local format (0xxxx)
 */
function formatMoroccanPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  let digitsOnly = phone.replace(/\D/g, '');
  
  // Return empty string if no digits
  if (!digitsOnly) return "";
  
  // Handle country code conversion
  if (digitsOnly.startsWith('212')) {
    // Convert +212 format to local 0 format
    // If it's +212 followed by 0, remove the 0 (to avoid 00...)
    if (digitsOnly.length > 3 && digitsOnly[3] === '0') {
      digitsOnly = '0' + digitsOnly.substring(4);
    } else {
      digitsOnly = '0' + digitsOnly.substring(3);
    }
  }
  
  // Ensure the number starts with 0
  if (!digitsOnly.startsWith('0') && digitsOnly.length === 9) {
    digitsOnly = '0' + digitsOnly;
  }
  
  // For Moroccan numbers, return without dashes or spaces
  return digitsOnly;
}

/**
 * Extract SKU from line items
 */
function extractSku(lineItems: any[]): string {
  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return "";
  }
  
  // Get the first line item's SKU
  const firstItem = lineItems[0];
  
  // Try to get the SKU from various possible locations
  return (
    firstItem.sku || 
    (firstItem.variant && firstItem.variant.sku) || 
    ""
  );
}

/**
 * Format address into a single line
 */
function formatAddress(shippingAddress: any): string {
  if (!shippingAddress) return "";
  
  return [
    shippingAddress.address1,
    shippingAddress.address2,
    shippingAddress.zip,
    shippingAddress.province
  ].filter(Boolean).join(", ");
}

/**
 * Get the customer name as a formatted string
 */
function formatCustomerName(customer: any): string {
  if (!customer) return "Unknown Customer";
  
  return [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ") || "Unknown Customer";
}

/**
 * Extract formatted phone number from multiple possible locations
 */
function extractPhoneNumber(orderData: any): string {
  // Try multiple possible locations for phone number
  let phone = '';

  if (orderData.customer?.phone) {
    phone = orderData.customer.phone;
  } else if (typeof orderData.phone === 'string' && orderData.phone.trim() !== '') {
    phone = orderData.phone;
  } else if (orderData.shippingAddress && typeof orderData.shippingAddress === 'object') {
    // Sometimes phone is nested in the shipping address
    if (typeof orderData.shippingAddress.phone === 'string' && orderData.shippingAddress.phone.trim() !== '') {
      phone = orderData.shippingAddress.phone;
    }
  }

  // Use the Moroccan phone number formatter
  return formatMoroccanPhoneNumber(phone);
}

/**
 * Extract Original City from noteAttributes
 */
function extractOriginalCity(orderData: any): string {
  try {
    if (!orderData || !orderData.noteAttributes) {
      return '';
    }

    // Handle both array and object formats
    let noteAttributes = orderData.noteAttributes;
    if (!Array.isArray(noteAttributes)) {
      return '';
    }

    // Look for the "Original City" name in noteAttributes
    const originalCityAttribute = noteAttributes.find((attr: any) =>
      attr && typeof attr === 'object' && attr.name === 'Original City'
    );

    return originalCityAttribute?.value || '';
  } catch (error) {
    console.error('Error extracting original city:', error);
    return '';
  }
}

/**
 * Format financial status for consistent display
 */
function formatFinancialStatus(status: string | null | undefined): {
  status: string,
  tone: 'success' | 'attention' | 'warning' | 'info'
} {
  if (!status) {
    return { status: 'PENDING', tone: 'attention' };
  }
  
  // Convert to uppercase for consistent display
  const financialStatus = String(status).toUpperCase();
  
  // Set appropriate badge tone based on status
  let tone: 'success' | 'attention' | 'warning' | 'info' = 'attention';
  
  if (financialStatus.includes('PAID') || financialStatus === 'AUTHORIZED') {
    tone = 'success';
  } else if (financialStatus.includes('REFUND') || financialStatus.includes('DECLINED')) {
    tone = 'warning';
  } else if (financialStatus === 'VOIDED' || financialStatus === 'CANCELED') {
    tone = 'info';
  }
  
  return { status: financialStatus, tone };
}

/**
 * Check if an order is cancelled based on its statuses and tags
 */
function checkIfOrderCancelled(orderData: any): boolean {
  // Check cancellation status directly if available
  if (orderData.cancelledAt) {
    return true;
  }
  
  // Check financial status for cancellation
  if (orderData.displayFinancialStatus) {
    const status = String(orderData.displayFinancialStatus).toUpperCase();
    if (status.includes('CANCEL') || status === 'VOIDED') {
      return true;
    }
  }
  
  // Check fulfillment status for cancellation
  if (orderData.displayFulfillmentStatus) {
    const status = String(orderData.displayFulfillmentStatus).toUpperCase();
    if (status.includes('CANCEL')) {
      return true;
    }
  }
  
  // Check if any tags contain cancellation keywords
  if (orderData.tags) {
    const tags = typeof orderData.tags === 'string' 
      ? orderData.tags.split(/,\s*/) 
      : Array.isArray(orderData.tags) ? orderData.tags : [];
    
    for (const tag of tags) {
      const tagStr = String(tag).toUpperCase();
      if (tagStr.includes('CANCEL') || tagStr.includes('ANNULÉ') || tagStr.includes('ANNULE')) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check if an order is deleted based on its properties
 */
function checkIfOrderDeleted(orderData: any): boolean {
  // Check deletion status directly if available
  if (orderData.deletedAt) {
    return true;
  }
  
  // Check if order has deletion flag
  if (orderData.isDeleted === true) {
    return true;
  }
  
  // Check tags for deletion indicators
  if (orderData.tags) {
    const tags = typeof orderData.tags === 'string' 
      ? orderData.tags.split(/,\s*/) 
      : Array.isArray(orderData.tags) ? orderData.tags : [];
    
    for (const tag of tags) {
      const tagStr = String(tag).toUpperCase();
      if (tagStr.includes('DELETED') || tagStr.includes('SUPPRIMÉ') || tagStr.includes('SUPPRIME')) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check if fulfillment has been cancelled
 */
function checkIfFulfillmentCancelled(orderData: any): {
  isFulfillmentCancelled: boolean,
  cancelledFulfillments: any[]
} {
  const cancelledFulfillments: any[] = [];
  
  // No fulfillments to check
  if (!orderData.fulfillments || !Array.isArray(orderData.fulfillments) || orderData.fulfillments.length === 0) {
    return { isFulfillmentCancelled: false, cancelledFulfillments };
  }
  
  // Check each fulfillment for cancellation
  let isFulfillmentCancelled = false;
  
  for (const fulfillment of orderData.fulfillments) {
    // Check for direct cancellation status - expanded to catch more cancellation statuses
    const status = fulfillment.status ? String(fulfillment.status).toUpperCase() : '';
    if (status === 'UNFULFILLED' || 
        status === 'CANCELED' || 
        status === 'CANCELLED' || 
        status === 'VOID' || 
        status.includes('CANCEL')) {
      isFulfillmentCancelled = true;
      cancelledFulfillments.push(fulfillment);
    }
  }
  
  return { isFulfillmentCancelled, cancelledFulfillments };
}

/**
 * Extract confirmation tag from order tags
 */
function extractConfirmationTag(orderData: any, confirmationTags: string[]): string {
  if (!orderData.tags) return '';
  
  // If tags is a string, split it
  const tagArray = typeof orderData.tags === 'string' 
    ? orderData.tags.split(/,\s*/) 
    : Array.isArray(orderData.tags) ? orderData.tags : [];
  
  // Find the first matching tag
  for (const tag of tagArray) {
    const strTag = String(tag);
    for (const confirmTag of confirmationTags) {
      if (strTag.includes(confirmTag)) {
        return strTag;
      }
    }
  }
  
  return '';
}

/**
 * Fetches order data from Shopify using GraphQL API
 */
async function fetchOrderData(
  orderId: string,
  connections: any,
  logger: any
): Promise<any> {
  // Format GraphQL query with proper field selection
  const graphqlQuery = `
    query GetOrder($id: ID!) {
      order(id: $id) {
        id
        name
        createdAt
        cancelledAt
        displayFinancialStatus
        displayFulfillmentStatus
        cancelReason
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        currentTotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        currentSubtotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        tags
        note
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        shippingAddress {
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        fulfillments {
          id
          status
          trackingInfo {
            number
            company
            url
          }
          createdAt
          updatedAt
        }
        lineItems(first: 50) {
          edges {
            node {
              id
              name
              quantity
              currentQuantity
              refundableQuantity
              sku
              variant {
                id
                sku
                price
                product {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
        refunds {
          id
        }
      }
    }
  `;
  
  const variables = {
    id: `gid://shopify/Order/${orderId}`
  };
  
  try {
    // Use cache-busting options to ensure fresh data
    const cacheOptions = { 
      disableCache: true,
      cacheTTL: 0,
      forceRefresh: true
    };
    
    const result = await connections.shopify.current.graphql(graphqlQuery, variables, cacheOptions);
    
    if (!result) {
      throw new Error("No GraphQL response received");
    }
    
    // Handle different possible response formats
    const orderData = 
      result.data?.order ||          // Standard GraphQL response
      result.body?.data?.order ||    // HTTP body-wrapped response
      result.data?.data?.order ||    // Double-nested response (common in HTTP clients)
      result.order;                  // Direct root response structure
    
    if (!orderData) {
      // Check for errors in various locations
      const errors = result.errors || result.body?.errors || result.data?.errors;
      if (errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
      }
      
      throw new Error(`Order data not found in response`);
    }
    
    // Use current price totals if available
    if (orderData.currentTotalPriceSet?.shopMoney?.amount) {
      orderData.totalPriceSet = {
        shopMoney: {
          amount: orderData.currentTotalPriceSet.shopMoney.amount,
          currencyCode: orderData.currentTotalPriceSet.shopMoney.currencyCode
        }
      };
    }
    
    // Transform line items to a more usable format, filtering out refunded items
    if (orderData?.lineItems?.edges && Array.isArray(orderData.lineItems.edges)) {
      orderData.lineItems = orderData.lineItems.edges
        .map((edge: any) => {
          const node = edge?.node || {};
          // Get both original and current quantities
          const originalQuantity = Number(node.quantity) || 0;
          const currentQuantity = Number(node.currentQuantity) || 0;
          
          // Skip items that have been fully refunded
          if (currentQuantity <= 0) {
            return null;
          }
          
          return {
            id: node.id || '',
            name: node.name || 'Unknown Item',
            quantity: currentQuantity,
            originalQuantity,
            sku: node.sku || node.variant?.sku || '',
            price: node.variant?.price || '0.00',
            product: node.variant?.product ? {
              id: node.variant.product.id,
              title: node.variant.product.title,
              handle: node.variant.product.handle
            } : null,
            refundableQuantity: Number(node.refundableQuantity) || 0
          };
        })
        .filter((item: any) => item !== null); // Remove null items (fully refunded)
    } else {
      orderData.lineItems = [];
    }
    
    // Extract tracking number
    if (orderData?.fulfillments && orderData.fulfillments.length > 0) {
      const trackingInfo = orderData.fulfillments[0]?.trackingInfo;
      orderData.trackingNumber = trackingInfo && trackingInfo.length > 0 
        ? trackingInfo[0].number 
        : '';
    } else {
      orderData.trackingNumber = '';
    }
    
    // Add a flag indicating if this order has refunds
    orderData.hasRefunds = orderData.refunds && orderData.refunds.length > 0;
    
    return orderData;
  } catch (error) {
    throw error;
  }
}

// ========== MAIN ACTION FUNCTION ==========

export const run: ActionRun = async ({ params, api, logger, connections }) => {
  try {
    // Validate and sanitize parameters
    if (!params.orderId) {
      throw new Error("orderId parameter is required");
    }
    
    if (!params.shopId) {
      throw new Error("shopId parameter is required");
    }
    
    // Ensure IDs are strings and contain only digits
    const orderId = String(params.orderId).replace(/\D/g, '');
    const shopId = String(params.shopId).replace(/\D/g, '');
    
    if (!orderId) {
      throw new Error("Invalid orderId format: must contain digits");
    }
    
    if (!shopId) {
      throw new Error("Invalid shopId format: must contain digits");
    }
    
    // Verify the shop exists
    const shop = await api.shopifyShop.findById(shopId);
    if (!shop) {
      throw new Error(`Shop with ID ${shopId} not found`);
    }
    
    // Fetch the order from Gadget database to get noteAttributes
    const orderBasic = await api.shopifyOrder.findById(orderId, {
      select: {
        id: true,
        noteAttributes: true
      }
    });
    if (!orderBasic) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    // Ensure we have a valid Shopify connection
    if (!connections?.shopify?.current?.graphql) {
      throw new Error("Shopify connection not properly initialized");
    }
    
    // Fetch detailed order data from Shopify
    const orderData = await fetchOrderData(orderId, connections, logger);
    
    // Check if the order is cancelled
    const isCancelled = checkIfOrderCancelled(orderData);
    const cancelReason = orderData.cancelReason || '';
    const cancelledAt = orderData.cancelledAt || '';
    
    // Check if the order is deleted
    const isDeleted = checkIfOrderDeleted(orderData);
    
    // Check if fulfillment has been cancelled
    const { isFulfillmentCancelled, cancelledFulfillments } = checkIfFulfillmentCancelled(orderData);
    
    // Extract customer information
    const customerName = formatCustomerName(orderData.customer);
    const phone = extractPhoneNumber(orderData);
    const email = orderData.customer?.email || '';

    // Extract Original City from noteAttributes (with error handling)
    let originalCity = '';
    try {
      // Use noteAttributes from Gadget database instead of Shopify API
      const orderDataWithNotes = { ...orderData, noteAttributes: orderBasic.noteAttributes };
      originalCity = extractOriginalCity(orderDataWithNotes);
    } catch (error) {
      console.error('Error extracting original city for order:', orderData.name, error);
      originalCity = '';
    }

    // Format address
    const address = formatAddress(orderData.shippingAddress);

    // Standardize city name
    const rawCity = orderData.shippingAddress?.city || '';
    const city = standardizeMoroccanCitySync(rawCity);
    
    // Extract SKUs from all active line items (filtering out refunded items)
    const skus = Array.isArray(orderData.lineItems) ? 
      orderData.lineItems
        .map((item: any) => {
          const sku = item.sku || (item.variant && item.variant.sku) || '';
          if (!sku || sku === '') return '';
          
          // Include quantity in the SKU string if quantity > 1
          const quantity = Number(item.quantity) || 0;
          if (quantity <= 0) {
            return '';
          }
          
          return quantity > 1 ? `${sku} (Qty: ${quantity})` : sku;
        })
        .filter((sku: string) => sku && sku !== '') : 
      [];
    
    // Format financial status
    const { status: financialStatus, tone: statusTone } = 
      formatFinancialStatus(orderData.displayFinancialStatus);
    
    // Format confirmation tag
    const confirmationTag = extractConfirmationTag(orderData, [
      "✅ WhatF Confirmed",
      "Confirmed By Wtp 💬",
      "Confirmed By Call 📞",
      "Confirmed IG 📷",
      "Confirmed ✅"
    ]);
    
    // If the order has refunds, add that information to the response
    const refundInfo = orderData.hasRefunds ? {
      hasRefunds: true,
      originalItemCount: orderData.lineItems.reduce((total: number, item: any) => total + (item.originalQuantity || 0), 0),
      currentItemCount: orderData.lineItems.reduce((total: number, item: any) => total + (item.quantity || 0), 0),
      originalTotal: orderData.totalPriceSet?.shopMoney?.amount || "0.00",
      refundedItems: orderData.lineItems
        .filter((item: any) => item.originalQuantity > item.quantity)
        .map((item: any) => ({
          name: item.name,
          sku: item.sku,
          originalQuantity: item.originalQuantity,
          currentQuantity: item.quantity,
          refundedQuantity: item.originalQuantity - item.quantity
        }))
    } : { hasRefunds: false };
    
    // Return the comprehensive order data
    return {
      success: true,
      message: `Successfully extracted data for order ${orderData.name}`,
      order: {
        id: orderId,
        name: orderData.name,
        customerName,
        customer: orderData.customer,
        phone,
        email,
        originalCity, // Include the Original City from noteAttributes
        address,
        city,
        rawCity, // Include the original city name for reference
        shippingAddress: orderData.shippingAddress,
        lineItems: orderData.lineItems || [],
        skus: skus,
        totalPrice: orderData.totalPriceSet?.shopMoney?.amount || "0.00",
        financialStatus,
        statusTone,
        fulfillmentStatus: orderData.displayFulfillmentStatus || "",
        createdAt: orderData.createdAt,
        tags: orderData.tags,
        note: orderData.note || "", // Include Shopify order note
        confirmationTag,
        trackingNumber: orderData.trackingNumber || "",
        refundInfo,
        isCancelled,
        cancelReason,
        cancelledAt,
        isDeleted,
        isFulfillmentCancelled,
        cancelledFulfillments: isFulfillmentCancelled ? cancelledFulfillments : []
      }
    };
  } catch (error) {
    // Centralized error handling
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  orderId: {
    type: "string",
    required: true
  },
  shopId: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};