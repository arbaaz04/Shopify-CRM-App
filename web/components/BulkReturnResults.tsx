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

  return (
    <BlockStack gap="500">
      {/* Summary Card */}
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd" as="h3">
            Bulk Return Processing Results
          </Text>

          <InlineStack gap="400" wrap={false}>
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Total Orders</Text>
              <Text variant="bodyMd">{summary.totalOrders}</Text>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Successful</Text>
              <Badge tone="success">{summary.successfulReturns}</Badge>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Failed</Text>
              <Badge tone="critical">{summary.failedReturns}</Badge>
            </BlockStack>

            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Items Returned</Text>
              <Text variant="bodyMd">{summary.totalProcessedItems}</Text>
            </BlockStack>

            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Total Refunds</Text>
              <Text variant="bodyMd">{summary.totalRefundAmount.toFixed(2)} {summary.currency}</Text>
            </BlockStack>

            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Success Rate</Text>
              <Badge tone={summary.successRate >= 80 ? "success" : summary.successRate >= 50 ? "attention" : "critical"}>
                {summary.successRate}%
              </Badge>
            </BlockStack>
          </InlineStack>

          <InlineStack gap="300">
            <Button onClick={onStartOver}>
              Process More Returns
            </Button>
          </InlineStack>
        </BlockStack>
      </Card>

      {/* Successful Returns */}
      {successfulResults.length > 0 && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="space-between">
              <Text variant="headingMd" as="h3">
                Successful Returns ({successfulResults.length})
              </Text>
              <Badge tone="success">Completed</Badge>
            </InlineStack>

            <Banner tone="success">
              <p>The following returns were processed successfully:</p>
            </Banner>

            <BlockStack gap="300">
              {successfulResults.map((result, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <BlockStack gap="300">
                    <InlineStack gap="200" align="space-between">
                      <Text variant="bodyMd" fontWeight="semibold">
                        {result.orderName}
                      </Text>
                      <Badge tone="success">Success</Badge>
                    </InlineStack>

                    <InlineStack gap="400" wrap={false}>
                      <BlockStack gap="100">
                        <Text variant="bodySm" tone="subdued">Items Returned</Text>
                        <Text variant="bodySm">{result.processedItems || 0}</Text>
                      </BlockStack>
                      
                      <BlockStack gap="100">
                        <Text variant="bodySm" tone="subdued">Refund Amount</Text>
                        <Text variant="bodySm">
                          {result.refundAmount?.toFixed(2) || '0.00'} {result.currency || 'MAD'}
                        </Text>
                      </BlockStack>
                    </InlineStack>

                    <Text variant="bodySm" tone="subdued">
                      {result.message}
                    </Text>
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
              <Text variant="headingMd" as="h3">
                Failed Returns ({failedResults.length})
              </Text>
              <Badge tone="critical">Issues</Badge>
            </InlineStack>

            <Banner tone="critical">
              <p>The following returns could not be processed:</p>
            </Banner>

            <List type="bullet">
              {failedResults.map((result, index) => (
                <List.Item key={index}>
                  <BlockStack gap="100">
                    <Text variant="bodyMd" fontWeight="semibold">
                      {result.orderName}
                    </Text>
                    <Text variant="bodySm" tone="critical">
                      {result.error || result.message}
                    </Text>
                  </BlockStack>
                </List.Item>
              ))}
            </List>

            <Banner tone="info">
              <p>You can try processing the failed orders individually or check the error messages for more details.</p>
            </Banner>
          </BlockStack>
        </Card>
      )}
    </BlockStack>
  );
};
