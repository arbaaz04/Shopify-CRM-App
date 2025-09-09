import React from 'react';
import {
  Modal,
  Text,
  BlockStack,
  Button,
  InlineStack,
  Box,
  Divider,
  Banner
} from '@shopify/polaris';

interface RefundConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderName: string;
  requestedAmount: number;
  availableAmount: number;
  currency: string;
  onProceedInventoryOnly: () => void;
  onSkipOrder: () => void;
  isProcessing?: boolean;
}

const RefundConflictModal: React.FC<RefundConflictModalProps> = ({
  isOpen,
  onClose,
  orderName,
  requestedAmount,
  availableAmount,
  currency,
  onProceedInventoryOnly,
  onSkipOrder,
  isProcessing = false
}) => {
  const difference = requestedAmount - availableAmount;
  
  // Ensure order name is properly formatted with # prefix
  // Handle cases where orderName might be undefined, null, or just an ID
  const formattedOrderName = (() => {
    if (!orderName) return '#Unknown';
    const name = String(orderName);
    return name.startsWith('#') ? name : `#${name}`;
  })();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Insufficient Refund Amount"
      primaryAction={{
        content: isProcessing ? 'Processing...' : 'Return Items Only',
        onAction: onProceedInventoryOnly,
        loading: isProcessing,
        disabled: isProcessing
      }}
      secondaryActions={[
        {
          content: 'Skip This Order',
          onAction: onSkipOrder,
          disabled: isProcessing
        },
        {
          content: 'Cancel',
          onAction: onClose,
          disabled: isProcessing
        }
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          <Banner tone="warning">
            <Text as="p" variant="bodyMd">
              The requested refund amount exceeds what's available for this order.
            </Text>
          </Banner>

            <BlockStack gap="300">
            <Text as="h3" variant="headingMd">
              Order: {formattedOrderName}
            </Text>            <BlockStack gap="200">
              <InlineStack gap="200" wrap={false} align="space-between">
                <Text as="span" variant="bodyMd" tone="subdued">Requested refund:</Text>
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                  {currency} {requestedAmount.toFixed(2)}
                </Text>
              </InlineStack>

              <InlineStack gap="200" wrap={false} align="space-between">
                <Text as="span" variant="bodyMd" tone="subdued">Available for refund:</Text>
                <Text as="span" variant="bodyMd" fontWeight="semibold">
                  {currency} {availableAmount.toFixed(2)}
                </Text>
              </InlineStack>

              <Divider />

              <InlineStack gap="200" wrap={false} align="space-between">
                <Text as="span" variant="bodyMd" tone="subdued">Difference:</Text>
                <Text as="span" variant="bodyMd" fontWeight="semibold" tone="critical">
                  {currency} {difference.toFixed(2)} (exceeds available)
                </Text>
              </InlineStack>
            </BlockStack>
          </BlockStack>

          <BlockStack gap="300">
            <Text as="h3" variant="headingMd">
              What would you like to do?
            </Text>

            <BlockStack gap="200">
              <Box padding="300" background="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">
                    Return Items Only (Recommended)
                  </Text>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Process the return to update inventory and mark items as returned, 
                    but only refund the available amount of {currency} {availableAmount.toFixed(2)}.
                  </Text>
                </BlockStack>
              </Box>

              <Box padding="300" background="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">
                    Skip This Order
                  </Text>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Skip processing this order entirely and continue with the next order 
                    in the batch (if applicable).
                  </Text>
                </BlockStack>
              </Box>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};

export default RefundConflictModal;
