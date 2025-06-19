import React, { useState, useCallback } from 'react';
import {
  Card,
  Text,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  Badge,
  Banner,
  List
} from '@shopify/polaris';

interface ParsedOrder {
  orderNumber: string;
  originalText: string;
  isValid: boolean;
}

interface BulkOrderInputProps {
  onOrdersParsed: (orders: ParsedOrder[]) => void;
  disabled?: boolean;
}

export const BulkOrderInput: React.FC<BulkOrderInputProps> = ({
  onOrdersParsed,
  disabled = false
}) => {
  const [bulkInput, setBulkInput] = useState('');
  const [parsedOrders, setParsedOrders] = useState<ParsedOrder[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const parseOrderInput = useCallback((input: string): ParsedOrder[] => {
    if (!input.trim()) return [];

    const lines = input.split('\n').filter(line => line.trim());
    const orders: ParsedOrder[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Try to extract order number from various formats
      // Format 1: DHEC0C057C - #3136
      // Format 2: #3136
      // Format 3: 3136
      // Format 4: DHEC0C057C
      
      let orderNumber = '';
      let isValid = false;

      // Look for #XXXX pattern first
      const hashMatch = trimmedLine.match(/#(\d+)/);
      if (hashMatch) {
        orderNumber = hashMatch[1];
        isValid = true;
      } else {
        // Look for standalone numbers (4+ digits)
        const numberMatch = trimmedLine.match(/\b(\d{4,})\b/);
        if (numberMatch) {
          orderNumber = numberMatch[1];
          isValid = true;
        } else {
          // Look for alphanumeric codes (like DHEC0C057C)
          const codeMatch = trimmedLine.match(/\b([A-Z0-9]{8,})\b/);
          if (codeMatch) {
            orderNumber = codeMatch[1];
            isValid = true;
          }
        }
      }

      if (orderNumber) {
        orders.push({
          orderNumber,
          originalText: trimmedLine,
          isValid
        });
      }
    }

    return orders;
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setBulkInput(value);
    
    if (value.trim()) {
      const parsed = parseOrderInput(value);
      setParsedOrders(parsed);
      setShowPreview(parsed.length > 0);
    } else {
      setParsedOrders([]);
      setShowPreview(false);
    }
  }, [parseOrderInput]);

  const handleProcessOrders = useCallback(() => {
    const validOrders = parsedOrders.filter(order => order.isValid);
    if (validOrders.length > 0) {
      onOrdersParsed(validOrders);
    }
  }, [parsedOrders, onOrdersParsed]);

  const validOrdersCount = parsedOrders.filter(order => order.isValid).length;
  const invalidOrdersCount = parsedOrders.length - validOrdersCount;

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">
          Bulk Order Returns
        </Text>
        
        <Text as="p" tone="subdued">
          Enter multiple order numbers, one per line. Supports various formats like #3136, DHEC0C057C, or mixed text.
        </Text>

        <TextField
          label="Order Numbers"
          value={bulkInput}
          onChange={handleInputChange}
          multiline={6}
          placeholder={`Example:
DHEC0C057C - #3136
DHEC0BA262 - #3140
DHEB44EB70 - #3112
#3145
3150`}
          disabled={disabled}
          helpText="Enter order numbers in any format, one per line"
        />

        {showPreview && (
          <Card background="bg-surface-secondary">
            <BlockStack gap="300">
              <InlineStack gap="200" align="space-between">
                <Text variant="bodyMd" fontWeight="semibold">
                  Detected Orders
                </Text>
                <InlineStack gap="200">
                  {validOrdersCount > 0 && (
                    <Badge tone="success">
                      {validOrdersCount} valid
                    </Badge>
                  )}
                  {invalidOrdersCount > 0 && (
                    <Badge tone="critical">
                      {invalidOrdersCount} invalid
                    </Badge>
                  )}
                </InlineStack>
              </InlineStack>

              {parsedOrders.length > 0 && (
                <List type="bullet">
                  {parsedOrders.map((order, index) => (
                    <List.Item key={index}>
                      <InlineStack gap="200" align="space-between">
                        <Text variant="bodySm">
                          Order #{order.orderNumber}
                        </Text>
                        <Badge tone={order.isValid ? "success" : "critical"}>
                          {order.isValid ? "Valid" : "Invalid"}
                        </Badge>
                      </InlineStack>
                      <Text variant="bodySm" tone="subdued">
                        From: "{order.originalText}"
                      </Text>
                    </List.Item>
                  ))}
                </List>
              )}

              {validOrdersCount === 0 && parsedOrders.length > 0 && (
                <Banner tone="critical">
                  <p>No valid order numbers detected. Please check your input format.</p>
                </Banner>
              )}

              {validOrdersCount > 0 && (
                <InlineStack gap="300" align="end">
                  <Button
                    primary
                    onClick={handleProcessOrders}
                    disabled={disabled || validOrdersCount === 0}
                  >
                    Process {validOrdersCount} Order{validOrdersCount !== 1 ? 's' : ''}
                  </Button>
                </InlineStack>
              )}
            </BlockStack>
          </Card>
        )}
      </BlockStack>
    </Card>
  );
};
