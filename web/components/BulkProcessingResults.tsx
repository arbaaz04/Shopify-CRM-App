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

interface OrderProcessingResult {
  orderNumber: string;
  success: boolean;
  message: string;
  orderData?: any;
  error?: string;
  refundAmount?: number;
  currency?: string;
}

interface BulkProcessingResultsProps {
  results: OrderProcessingResult[];
  onStartOver: () => void;
  onProcessIndividualReturn: (orderData: any) => void;
}

export const BulkProcessingResults: React.FC<BulkProcessingResultsProps> = ({
  results,
  onStartOver,
  onProcessIndividualReturn
}) => {
  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);
  const foundOrders = results.filter(r => r.success && r.orderData);
  const notFoundOrders = results.filter(r => !r.success);

  const totalRefundAmount = successfulResults.reduce((sum, result) => {
    return sum + (result.refundAmount || 0);
  }, 0);

  const currency = successfulResults.find(r => r.currency)?.currency || 'MAD';

  return (
    <BlockStack gap="500">
      {/* Summary Card */}
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd" as="h3">
            Bulk Processing Results
          </Text>

          <InlineStack gap="400" wrap={false}>
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Total Orders</Text>
              <Text variant="bodyMd">{results.length}</Text>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Found</Text>
              <Badge tone="success">{foundOrders.length}</Badge>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Not Found</Text>
              <Badge tone="critical">{notFoundOrders.length}</Badge>
            </BlockStack>

            {totalRefundAmount > 0 && (
              <BlockStack gap="200">
                <Text variant="bodyMd" fontWeight="semibold">Total Refunds</Text>
                <Text variant="bodyMd">{totalRefundAmount.toFixed(2)} {currency}</Text>
              </BlockStack>
            )}
          </InlineStack>

          <InlineStack gap="300">
            <Button onClick={onStartOver}>
              Process More Orders
            </Button>
          </InlineStack>
        </BlockStack>
      </Card>

      {/* Found Orders */}
      {foundOrders.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text variant="headingMd" as="h3">
                Orders Found ({foundOrders.length})
              </Text>
              <Badge tone="success">Ready for Returns</Badge>
            </InlineStack>

            <Text as="p" tone="subdued">
              These orders were found and are available for return processing.
            </Text>

            <BlockStack gap="300">
              {foundOrders.map((result, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <BlockStack gap="300">
                    <InlineStack gap="200" align="space-between">
                      <Text variant="bodyMd" fontWeight="semibold">
                        Order #{result.orderNumber}
                      </Text>
                      <Badge tone="success">Found</Badge>
                    </InlineStack>

                    {result.orderData && (
                      <BlockStack gap="200">
                        <InlineStack gap="400" wrap={false}>
                          <BlockStack gap="100">
                            <Text variant="bodySm" tone="subdued">Customer</Text>
                            <Text variant="bodySm">{result.orderData.customerName}</Text>
                          </BlockStack>
                          
                          <BlockStack gap="100">
                            <Text variant="bodySm" tone="subdued">Total</Text>
                            <Text variant="bodySm">{result.orderData.totalPrice} {result.orderData.currency || currency}</Text>
                          </BlockStack>
                          
                          <BlockStack gap="100">
                            <Text variant="bodySm" tone="subdued">Items</Text>
                            <Text variant="bodySm">{result.orderData.returnableItemsCount} returnable</Text>
                          </BlockStack>
                        </InlineStack>

                        <InlineStack gap="300" align="end">
                          <Button
                            onClick={() => onProcessIndividualReturn(result.orderData)}
                            size="slim"
                          >
                            Process Return
                          </Button>
                        </InlineStack>
                      </BlockStack>
                    )}
                  </BlockStack>
                </Card>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>
      )}

      {/* Failed Orders */}
      {failedResults.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text variant="headingMd" as="h3">
                Orders Not Found ({failedResults.length})
              </Text>
              <Badge tone="critical">Issues</Badge>
            </InlineStack>

            <Banner tone="critical">
              <p>The following orders could not be found or processed:</p>
            </Banner>

            <List type="bullet">
              {failedResults.map((result, index) => (
                <List.Item key={index}>
                  <BlockStack gap="100">
                    <Text variant="bodyMd" fontWeight="semibold">
                      Order #{result.orderNumber}
                    </Text>
                    <Text variant="bodySm" tone="critical">
                      {result.error || result.message}
                    </Text>
                  </BlockStack>
                </List.Item>
              ))}
            </List>

            <Banner tone="info">
              <p>
                <strong>Common reasons orders aren't found:</strong>
              </p>
              <List type="bullet">
                <List.Item>Order number doesn't exist in your shop</List.Item>
                <List.Item>Order was placed in a different shop</List.Item>
                <List.Item>Order number format is incorrect</List.Item>
                <List.Item>Order is already fully refunded</List.Item>
              </List>
            </Banner>
          </BlockStack>
        </Card>
      )}
    </BlockStack>
  );
};
