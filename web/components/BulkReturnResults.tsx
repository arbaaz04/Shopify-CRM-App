import React from 'react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  Banner,
  List,
  Divider
} from '@shopify/polaris';

interface ProcessingResult {
  orderId: string;
  orderName: string;
  success: boolean;
  message: string;
  refundAmount?: number;
  currency?: string;
  error?: string;
  processedItems?: number;
  isInventoryOnly?: boolean; // New field to track inventory-only returns
  lineItems?: Array<{ // Add line items details
    name: string;
    quantity: number;
    price?: number;
    sku?: string;
    lineItemId?: string;
  }>;
}

interface BulkReturnResultsProps {
  results: ProcessingResult[];
  summary: {
    totalOrders: number;
    successfulReturns: number;
    failedReturns: number;
    totalRefundAmount: number;
    currency: string;
    totalProcessedItems: number;
    successRate: number;
  };
  onStartOver: () => void;
}

export const BulkReturnResults: React.FC<BulkReturnResultsProps> = ({
  results,
  summary,
  onStartOver
}) => {
  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);
  
  // Categorize successful results
  const inventoryOnlyReturns = successfulResults.filter(r => r.isInventoryOnly === true);
  const refundedReturns = successfulResults.filter(r => r.isInventoryOnly !== true);

  // Helper function to format order name
  const formatOrderName = (orderName: string) => {
    if (!orderName) return '#Unknown';
    const name = String(orderName);
    return name.startsWith('#') ? name : `#${name}`;
  };

  // Helper function to clean line item names
  const cleanItemName = (name: string) => {
    if (!name) return '';
    // Remove "Line Item gid://shopify/LineItem/[id]" prefix if present
    const cleanedName = name.replace(/^Line Item gid:\/\/shopify\/LineItem\/\d+\s*/, '');
    // Extract the part in parentheses if it looks like a product name
    const match = cleanedName.match(/\(([^)]+)\)/);
    return match ? match[1] : cleanedName.trim();
  };

  return (
    <BlockStack gap="500">
      {/* Summary Card - Simplified */}
      <Card>
        <BlockStack gap="400">
          <Text as="h2" variant="headingMd">
            Return Processing Results
          </Text>

          <InlineStack gap="400" wrap={false}>
            <BlockStack gap="200">
              <Text as="span" variant="bodyMd" fontWeight="semibold">Total Orders</Text>
              <Text as="span" variant="bodyMd">{summary.totalOrders}</Text>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text as="span" variant="bodyMd" fontWeight="semibold">Successful</Text>
              <Badge tone="success">{summary.successfulReturns.toString()}</Badge>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text as="span" variant="bodyMd" fontWeight="semibold">Failed</Text>
              <Badge tone="critical">{summary.failedReturns.toString()}</Badge>
            </BlockStack>

            {summary.totalRefundAmount > 0 && (
              <BlockStack gap="200">
                <Text as="span" variant="bodyMd" fontWeight="semibold">Total Refunded</Text>
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                  {summary.totalRefundAmount.toFixed(2)} {summary.currency}
                </Text>
              </BlockStack>
            )}
          </InlineStack>

          <InlineStack gap="300">
            <Button onClick={onStartOver}>
              Process More Returns
            </Button>
          </InlineStack>
        </BlockStack>
      </Card>

      {/* Refunded Returns */}
      {refundedReturns.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text as="h3" variant="headingMd">
                Refunded Returns ({refundedReturns.length})
              </Text>
              <InlineStack gap="200">
                <Badge tone="success">Completed with Refunds</Badge>
                <Text as="span" variant="bodySm" fontWeight="semibold">
                  Total: {refundedReturns.reduce((sum, r) => sum + (r.refundAmount || 0), 0).toFixed(2)} {summary.currency}
                </Text>
              </InlineStack>
            </InlineStack>

            <Banner tone="success">
              <Text as="p" variant="bodyMd">
                The following orders were processed with inventory returns and monetary refunds:
              </Text>
            </Banner>

            <BlockStack gap="300">
              {refundedReturns.map((result, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <BlockStack gap="300">
                    <InlineStack gap="200" align="space-between">
                      <Text as="h4" variant="bodyMd" fontWeight="semibold">
                        {formatOrderName(result.orderName)}
                      </Text>
                      <Badge tone="success">Refunded</Badge>
                    </InlineStack>

                    {/* Show returned items with prices */}
                    {result.lineItems && result.lineItems.length > 0 ? (
                      <BlockStack gap="200">
                        <Text as="span" variant="bodySm" fontWeight="semibold">Refunded Items:</Text>
                        <List type="bullet">
                          {result.lineItems.map((item, itemIndex) => (
                            <List.Item key={itemIndex}>
                              <Text as="span" variant="bodySm">
                                {item.name ? 
                                  `${cleanItemName(item.name)} ${item.sku ? `(${item.sku})` : ''} - Qty: ${item.quantity}` :
                                  `Item ${itemIndex + 1} - Qty: ${item.quantity}`
                                }
                                {item.price && item.price > 0 ? ` - ${(item.price * item.quantity).toFixed(2)} ${result.currency}` : ''}
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    ) : (
                      <Text as="span" variant="bodySm" tone="subdued">
                        {result.processedItems || 0} items returned
                      </Text>
                    )}

                    <BlockStack gap="100">
                      <Text as="span" variant="bodySm" tone="subdued">Total Refund Amount</Text>
                      <Text as="span" variant="bodySm" fontWeight="semibold">
                        {result.refundAmount?.toFixed(2) || '0.00'} {result.currency || 'MAD'}
                      </Text>
                    </BlockStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                      {result.message}
                    </Text>
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>
      )}

      {/* Inventory-Only Returns */}
      {inventoryOnlyReturns.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text as="h3" variant="headingMd">
                Inventory-Only Returns ({inventoryOnlyReturns.length})
              </Text>
              <Badge tone="attention">Inventory Updated Only</Badge>
            </InlineStack>

            <Banner tone="info">
              <Text as="p" variant="bodyMd">
                The following orders were processed with inventory returns but no monetary refunds:
              </Text>
            </Banner>

            <BlockStack gap="300">
              {inventoryOnlyReturns.map((result, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <BlockStack gap="300">
                    <InlineStack gap="200" align="space-between">
                      <Text as="h4" variant="bodyMd" fontWeight="semibold">
                        {formatOrderName(result.orderName)}
                      </Text>
                      <Badge tone="attention">Inventory Only</Badge>
                    </InlineStack>

                    {/* Show returned items */}
                    {result.lineItems && result.lineItems.length > 0 ? (
                      <BlockStack gap="200">
                        <Text as="span" variant="bodySm" fontWeight="semibold">Returned Items:</Text>
                        <List type="bullet">
                          {result.lineItems.map((item, itemIndex) => (
                            <List.Item key={itemIndex}>
                              <Text as="span" variant="bodySm">
                                {item.name ? 
                                  `${cleanItemName(item.name)} ${item.sku ? `(${item.sku})` : ''} - Qty: ${item.quantity}` :
                                  `Item ${itemIndex + 1} - Qty: ${item.quantity}`
                                }
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    ) : (
                      <Text as="span" variant="bodySm" tone="subdued">
                        {result.processedItems || 0} items returned
                      </Text>
                    )}

                    {/* Only show message for non-inventory-only returns or important messages */}
                    {!result.isInventoryOnly && result.message && (
                      <Text as="p" variant="bodySm" tone="subdued">
                        {result.message}
                      </Text>
                    )}
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>
      )}

      {/* Failed Returns */}
      {failedResults.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text as="h3" variant="headingMd">
                Failed Returns ({failedResults.length})
              </Text>
              <Badge tone="critical">Issues</Badge>
            </InlineStack>

            <Banner tone="critical">
              <Text as="p" variant="bodyMd">
                The following returns could not be processed:
              </Text>
            </Banner>

            <List type="bullet">
              {failedResults.map((result, index) => (
                <List.Item key={index}>
                  <BlockStack gap="100">
                    <Text as="span" variant="bodyMd" fontWeight="semibold">
                      {formatOrderName(result.orderName)}
                    </Text>
                    <Text as="span" variant="bodySm" tone="critical">
                      {result.error || result.message}
                    </Text>
                  </BlockStack>
                </List.Item>
              ))}
            </List>

            <Banner tone="info">
              <Text as="p" variant="bodyMd">
                You can try processing the failed orders individually or check the error messages for more details.
              </Text>
            </Banner>
          </BlockStack>
        </Card>
      )}
    </BlockStack>
  );
};
