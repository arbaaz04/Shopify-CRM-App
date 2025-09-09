# Shipping Cost Calculation Update

## Problem Fixed
The system was incorrectly identifying orders as having free shipping when they actually had shipping fees included in the order total. This was causing the shipping cost absorption logic to be applied to orders that already had shipping costs.

## Solution Implemented
Updated the shipping cost calculation to use the correct formula that extracts the actual shipping cost from the order data:

```
Shipping Cost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts
```

## Files Modified

### 1. Backend Action: `api/actions/applyShippingCostAbsorption.ts`
- **Updated Function**: `getOrderShippingCost()`
- **Previous Logic**: Checked `shippingLines` array for shipping cost data
- **New Logic**: Uses the mathematical formula to calculate actual shipping cost
- **Benefits**: More accurate detection of shipping costs from order totals

### 2. Frontend Helper: `web/utils/shippingHelpers.ts`
- **Updated Function**: `getOrderShippingCost()`
- **Synchronized**: Frontend calculation with backend logic
- **Benefits**: Consistent shipping cost detection across frontend and backend

### 3. Test Action: `api/actions/testShippingCalculation.ts` (New)
- **Purpose**: Test the new shipping cost calculation formula
- **Features**:
  - Tests specific orders or first 5 orders
  - Shows detailed breakdown of calculation
  - Identifies courier services based on tracking numbers
  - Provides summary statistics

## Formula Breakdown
The formula works by isolating the shipping cost from the order total:

```typescript
const totalPrice = parseFloat(order.totalPrice || '0');
const totalLineItemsPrice = parseFloat(order.totalLineItemsPrice || '0');
const totalTax = parseFloat(order.totalTax || '0');
const totalDiscounts = parseFloat(order.totalDiscounts || '0');

const shippingCost = totalPrice - totalLineItemsPrice - totalTax + totalDiscounts;
```

### Example Calculation:
- **Order Total**: $125.00
- **Line Items Total**: $100.00
- **Tax**: $10.00
- **Discounts**: $0.00
- **Calculated Shipping**: $125.00 - $100.00 - $10.00 + $0.00 = **$15.00**

## Integration Points

### Shipping Cost Absorption Logic
1. Calculate actual shipping cost using the new formula
2. If shipping cost > $0: No absorption needed
3. If shipping cost = $0: Check tracking number for courier service
4. Apply delivery charges proportionally to line items if courier detected

### UI Display
- Orders with shipping costs will show: "Shipping: $X.XX"
- Orders with free shipping will show: "Free Shipping"
- Orders with free shipping + recognized courier will show: "Free Shipping (SENDIT/SPEEDAF - Cost Absorbed)"

## Testing
Use the new test action to verify the calculation:

```typescript
// Test all orders in a shop
await api.actions.testShippingCalculation.run({ shopId: "your-shop-id" });

// Test specific order
await api.actions.testShippingCalculation.run({ 
  shopId: "your-shop-id", 
  orderId: "specific-order-id" 
});
```

## Expected Outcomes
1. **Accurate Detection**: Only orders with truly $0 shipping costs will trigger absorption
2. **Proper Labeling**: UI will correctly show shipping status based on actual costs
3. **Correct Processing**: Sheet writing will only apply cost absorption to appropriate orders
4. **Detailed Logging**: Enhanced logging shows calculation breakdown for debugging

## Courier Detection (Unchanged)
The tracking number prefix detection remains the same:
- **DH prefix** → Sendit delivery
- **MA prefix** → Speedaf delivery

## Benefits
- ✅ Fixes false positive free shipping detection
- ✅ More accurate shipping cost calculation
- ✅ Better user experience with correct labeling
- ✅ Prevents unnecessary cost absorption on orders with actual shipping fees
- ✅ Comprehensive testing capability
- ✅ Enhanced debugging with detailed logging
