# Shipping Cost Absorption Feature

## Overview

The shipping cost absorption feature automatically adjusts item prices when orders have zero shipping costs but use courier services with delivery charges. This ensures that the merchant absorbs shipping costs for "free shipping" offers without affecting order fulfillment or other operations.

## How It Works

### 1. Trigger Conditions
The system applies shipping cost absorption when:
- Order has shipping fees = $0 (checked via `shippingLines`)
- Order contains recognized courier service tags (Sendit or Speedaf)
- Delivery charges are configured for the shop
- Order is being written to Google Sheets

### 2. Courier Service Detection
The system identifies courier services through order tags:

**Sendit Service:**
- Tags containing: "sendit", "send it", or exact match "sendit"

**Speedaf Service:**
- Tags containing: "speedaf", "speed af", or exact match "speedaf"

### 3. Shipping Cost Calculation
When absorption is applied:
1. Retrieves delivery charges from the `deliveryCharges` model
2. Gets the appropriate charge (Sendit or Speedaf)
3. Calculates shipping cost per item: `shippingCharge / totalQuantity`
4. Subtracts proportional shipping from each line item price
5. Updates the total order price accordingly

### Example

**Original Order:**
```
Item 1: $40 x 2 qty = $80
Item 2: $60 x 1 qty = $60
Total: $140
Shipping: $0 (free shipping offer)
```

**With $12 Sendit shipping charge:**
```
Total quantity: 2 + 1 = 3 items
Shipping per item: $12 / 3 = $4

Adjusted prices:
Item 1: $40 - $4 = $36 x 2 qty = $72
Item 2: $60 - $4 = $56 x 1 qty = $56
New Total: $128
```

**Result written to sheets:**
- Item 1 shows $36 unit price (not $40)
- Item 2 shows $56 unit price (not $60)
- Total shows $128 (not $140)

## Implementation Details

### Core Components

1. **`applyShippingCostAbsorption.ts`** - Main logic for absorption calculation
2. **`writeBatchOrdersToSheets.ts`** - Updated to apply absorption before writing
3. **`syncOrders.ts`** - Updated to apply absorption before writing
4. **`deliveryCharges` model** - Stores configured delivery charges per shop

### Key Functions

#### `applyShippingCostAbsorption`
- **Input:** Order data and shop ID
- **Output:** Processed order with adjusted prices (if applicable)
- **Parameters:**
  - `order`: Order object with line items and shipping info
  - `shopId`: Shop identifier for delivery charges lookup

#### Helper Functions
- `getOrderShippingCost()` - Extracts shipping cost from order's shipping lines
- `determineCourierService()` - Identifies courier from order tags
- `getDeliveryCharges()` - Retrieves shop's delivery charges configuration
- `applyShippingAbsorption()` - Performs the actual price adjustments

### Configuration

Delivery charges are configured through the app's config page:
- Navigate to Google Sheet Config
- Select "Delivery Charges" tab
- Set charges for Sendit and Speedaf services
- Save configuration

### Integration Points

The absorption logic is automatically applied at these points:
1. **Batch order writing** (`writeBatchOrdersToSheets`)
2. **Order sync** (`syncOrders`)
3. **Individual order processing** (any action using the absorption API)

### Error Handling

The system gracefully handles errors:
- If absorption fails, original order is processed unchanged
- Missing configurations result in no absorption (normal processing)
- Invalid courier tags are ignored
- Errors are logged but don't block order processing

### Testing

Use the `testShippingCostAbsorption` action to verify:
- Sendit order with zero shipping
- Order with existing shipping (should not change)
- Speedaf order with zero shipping
- Error scenarios and edge cases

## Notes

### What's NOT Affected
- Original Shopify order data remains unchanged
- Fulfillment and tracking operations work normally
- Only Google Sheets data reflects adjusted prices
- Customer invoices and receipts show original prices

### Limitations
- Only works with Sendit and Speedaf courier services
- Requires proper order tagging for courier identification
- Delivery charges must be configured in the app
- Only applies to orders with exactly $0 shipping costs

### Future Enhancements
- Support for additional courier services
- Custom tagging rules configuration
- Percentage-based absorption instead of fixed amounts
- Advanced pricing rules and exceptions
