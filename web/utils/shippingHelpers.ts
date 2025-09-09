/**
 * Helper function to determine shipping status and label for orders
 * Uses the getShippingCost action for accurate shipping cost calculation
 * 
 * Uses tracking number prefixes to identify courier services:
 * - DH prefix = Sendit delivery
 * - MA prefix = Speedaf delivery
 */

interface ShippingStatus {
  isFreeShipping: boolean;
  courierService: string | null;
  willAbsorbShipping: boolean;
  shippingCost: number;
  label: string;
  tone: 'info' | 'success' | 'warning' | 'attention' | 'critical';
}

/**
 * Analyze order shipping status (async version using getShippingCost action)
 */
export async function analyzeOrderShippingAsync(order: any, api: any): Promise<ShippingStatus> {
  try {
    // Use the getShippingCost action for accurate calculation
    const shippingCost = await api.getShippingCost({ orderId: order.id });
    const isFreeShipping = shippingCost === 0 || (Math.abs(shippingCost) < 0.01);
    
    // Determine courier service from tracking number prefix
    const courierService = determineCourierService(order.trackingNumber || '');
    
    // Determine if shipping will be absorbed
    const willAbsorbShipping = isFreeShipping && courierService !== null;
    
    // Generate appropriate label and tone
    let label = '';
    let tone: 'info' | 'success' | 'warning' | 'attention' | 'critical' = 'info';
    
    if (!isFreeShipping) {
      label = `Shipping: ${shippingCost.toFixed(2)} MAD`;
      tone = 'info';
    } else if (willAbsorbShipping) {
      label = `Free Shipping (${courierService?.toUpperCase()} - Cost Absorbed)`;
      tone = 'warning';
    } else if (isFreeShipping) {
      label = 'Free Shipping';
      tone = 'success';
    }
    
    return {
      isFreeShipping,
      courierService,
      willAbsorbShipping,
      shippingCost,
      label,
      tone
    };
  } catch (error) {
    console.error('Error analyzing order shipping (async)', { error, orderId: order.id });
    // Fallback to synchronous version
    return analyzeOrderShipping(order);
  }
}

/**
 * Analyze order shipping status (synchronous fallback version)
 */
export function analyzeOrderShipping(order: any): ShippingStatus {
  // Fallback calculation when API call fails
  const shippingCost = getOrderShippingCostFallback(order);
  const isFreeShipping = shippingCost === 0;
  
  // Determine courier service from tracking number prefix
  const courierService = determineCourierService(order.trackingNumber || '');
  
  // Determine if shipping will be absorbed
  const willAbsorbShipping = isFreeShipping && courierService !== null;
  
  // Generate appropriate label and tone
  let label = '';
  let tone: 'info' | 'success' | 'warning' | 'attention' | 'critical' = 'info';
  
  if (!isFreeShipping) {
    label = `Shipping: ${shippingCost.toFixed(2)} MAD`;
    tone = 'info';
  } else if (willAbsorbShipping) {
    label = `Free Shipping (${courierService?.toUpperCase()} - Cost Absorbed)`;
    tone = 'warning';
  } else if (isFreeShipping) {
    label = 'Free Shipping';
    tone = 'success';
  }
  
  return {
    isFreeShipping,
    courierService,
    willAbsorbShipping,
    shippingCost,
    label,
    tone
  };
}

/**
 * Get shipping cost from order using fallback calculation (when API call fails)
 * Formula: Shipping Cost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts
 */
function getOrderShippingCostFallback(order: any): number {
  try {
    // Extract required fields from order
    const totalPrice = parseFloat(order.totalPrice || '0');
    const totalLineItemsPrice = parseFloat(order.totalLineItemsPrice || '0');
    const totalTax = parseFloat(order.totalTax || '0');
    const totalDiscounts = parseFloat(order.totalDiscounts || '0');

    // Calculate shipping cost using the formula
    const shippingCost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts;

    // Account for rounding errors - treat very small amounts as zero
    const ROUNDING_TOLERANCE = 0.01;
    if (Math.abs(shippingCost) < ROUNDING_TOLERANCE) {
      return 0;
    }

    return Math.max(0, shippingCost); // Ensure non-negative
  } catch (error) {
    console.error('Error calculating fallback shipping cost', { error, orderId: order.id });
    return 0;
  }
}

/**
 * Determine courier service from tracking number prefix
 */
function determineCourierService(trackingNumber: string): string | null {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return null;
  }

  const trimmedTracking = trackingNumber.trim().toUpperCase();
  
  // Check for Sendit indicators (tracking starts with "DH")
  if (trimmedTracking.startsWith('DH')) {
    return 'sendit';
  }

  // Check for Speedaf indicators (tracking starts with "MA")
  if (trimmedTracking.startsWith('MA')) {
    return 'speedaf';
  }

  return null;
}
