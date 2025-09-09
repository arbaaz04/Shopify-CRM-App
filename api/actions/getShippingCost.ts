/**
 * Calculate shipping cost with rounding error tolerance
 * 
 * Formula: totalPrice - totalLineItemsPrice - totalTax + totalDiscounts
 * 
 * Accounts for rounding errors by treating values within 0.01 tolerance as zero
 * This prevents absorption from being skipped due to tiny decimal differences
 */

export const run: ActionRun = async ({ params, api }) => {
  if (!params.orderId) {
    throw new Error("orderId is required");
  }

  const order = await api.shopifyOrder.findOne(params.orderId, {
    select: {
      totalPrice: true,
      totalLineItemsPrice: true,
      totalTax: true,
      totalDiscounts: true
    }
  });

  if (!order) {
    throw new Error(`Order ${params.orderId} not found`);
  }

  const shippingCost = parseFloat(order.totalPrice || "0") - 
                      parseFloat(order.totalLineItemsPrice || "0") - 
                      parseFloat(order.totalTax || "0") + 
                      parseFloat(order.totalDiscounts || "0");

  // Account for rounding errors - treat values within 0.01 as zero
  const ROUNDING_TOLERANCE = 0.01;
  
  if (Math.abs(shippingCost) <= ROUNDING_TOLERANCE) {
    return 0; // Consider as free shipping
  }
  
  return Math.round(shippingCost * 100) / 100; // Round to 2 decimal places
};

export const params = {
  orderId: { type: "string" }
};