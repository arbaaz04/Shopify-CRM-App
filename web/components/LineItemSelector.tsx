import React, { useState, useCallback } from 'react';
import {
  Card,
  ResourceList,
  ResourceItem,
  Text,
  Button,
  ButtonGroup,
  InlineStack,
  BlockStack,
  Badge,
  Thumbnail,
  Checkbox
} from '@shopify/polaris';

interface LineItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  originalQuantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: any;
  image?: string | null;
  returnable: boolean;
  maxReturnQuantity: number;
}

interface SelectedLineItem {
  lineItemId: string;
  quantity: number;
  reason?: string;
}

interface LineItemSelectorProps {
  lineItems: LineItem[];
  onSelectionChange: (selectedItems: SelectedLineItem[]) => void;
  disabled?: boolean;
}

export const LineItemSelector: React.FC<LineItemSelectorProps> = ({
  lineItems,
  onSelectionChange,
  disabled = false
}) => {
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedLineItem>>(new Map());

  const handleItemToggle = useCallback((lineItemId: string, isSelected: boolean) => {
    const newSelectedItems = new Map(selectedItems);
    
    if (isSelected) {
      const lineItem = lineItems.find(item => item.id === lineItemId);
      if (lineItem) {
        newSelectedItems.set(lineItemId, {
          lineItemId,
          quantity: 1, // Default to 1
          reason: 'Customer return'
        });
      }
    } else {
      newSelectedItems.delete(lineItemId);
    }
    
    setSelectedItems(newSelectedItems);
    onSelectionChange(Array.from(newSelectedItems.values()));
  }, [selectedItems, lineItems, onSelectionChange]);

  const handleQuantityChange = useCallback((lineItemId: string, change: number) => {
    const newSelectedItems = new Map(selectedItems);
    const currentSelection = newSelectedItems.get(lineItemId);
    const lineItem = lineItems.find(item => item.id === lineItemId);
    
    if (currentSelection && lineItem) {
      const newQuantity = Math.max(1, Math.min(
        currentSelection.quantity + change,
        lineItem.maxReturnQuantity
      ));
      
      newSelectedItems.set(lineItemId, {
        ...currentSelection,
        quantity: newQuantity
      });
      
      setSelectedItems(newSelectedItems);
      onSelectionChange(Array.from(newSelectedItems.values()));
    }
  }, [selectedItems, lineItems, onSelectionChange]);

  const renderLineItem = (item: LineItem) => {
    const isSelected = selectedItems.has(item.id);
    const selectedQuantity = selectedItems.get(item.id)?.quantity || 1;
    const canDecrease = selectedQuantity > 1;
    const canIncrease = selectedQuantity < item.maxReturnQuantity;

    return (
      <ResourceItem
        id={item.id}
        key={item.id}
      >
        <BlockStack gap="300">
          <InlineStack gap="400" align="space-between">
            <InlineStack gap="300" align="start">
              <Checkbox
                checked={isSelected}
                onChange={(checked) => handleItemToggle(item.id, checked)}
                disabled={disabled || !item.returnable}
              />
              
              {item.image && (
                <Thumbnail
                  source={item.image}
                  alt={item.name}
                  size="small"
                />
              )}
              
              <BlockStack gap="100">
                <Text variant="bodyMd" fontWeight="semibold">
                  {item.name}
                </Text>
                {item.sku && (
                  <Text variant="bodySm" tone="subdued">
                    SKU: {item.sku}
                  </Text>
                )}
                <InlineStack gap="200">
                  <Text variant="bodySm">
                    Available: {item.quantity}
                  </Text>
                  <Text variant="bodySm">
                    Unit Price: ${item.unitPrice.toFixed(2)}
                  </Text>
                </InlineStack>
              </BlockStack>
            </InlineStack>
            
            <InlineStack gap="200" align="end">
              <Text variant="bodyMd" fontWeight="semibold">
                ${item.totalPrice.toFixed(2)}
              </Text>
              
              {item.quantity !== item.originalQuantity && (
                <Badge tone="attention">
                  Partially Refunded
                </Badge>
              )}
            </InlineStack>
          </InlineStack>
          
          {isSelected && (
            <InlineStack gap="200" align="start">
              <Text variant="bodySm" fontWeight="medium">
                Return Quantity:
              </Text>
              <ButtonGroup segmented>
                <Button
                  size="micro"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={disabled || !canDecrease}
                >
                  -
                </Button>
                <div style={{ 
                  padding: '4px 12px', 
                  border: '1px solid var(--p-color-border)', 
                  borderLeft: 'none',
                  borderRight: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '40px',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}>
                  {selectedQuantity}
                </div>
                <Button
                  size="micro"
                  onClick={() => handleQuantityChange(item.id, 1)}
                  disabled={disabled || !canIncrease}
                >
                  +
                </Button>
              </ButtonGroup>
              
              <Text variant="bodySm" tone="subdued">
                of {item.maxReturnQuantity} available
              </Text>
              
              <Text variant="bodySm" fontWeight="medium">
                Refund: ${(item.unitPrice * selectedQuantity).toFixed(2)}
              </Text>
            </InlineStack>
          )}
        </BlockStack>
      </ResourceItem>
    );
  };

  const selectedCount = selectedItems.size;
  const totalRefundAmount = Array.from(selectedItems.values()).reduce((total, selection) => {
    const lineItem = lineItems.find(item => item.id === selection.lineItemId);
    return total + (lineItem ? lineItem.unitPrice * selection.quantity : 0);
  }, 0);

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="space-between">
          <Text variant="headingMd" as="h3">
            Select Items to Return
          </Text>
          {selectedCount > 0 && (
            <Badge tone="info">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </Badge>
          )}
        </InlineStack>
        
        {selectedCount > 0 && (
          <InlineStack gap="200" align="space-between">
            <Text variant="bodyMd" fontWeight="medium">
              Total Refund Amount:
            </Text>
            <Text variant="bodyMd" fontWeight="semibold">
              ${totalRefundAmount.toFixed(2)}
            </Text>
          </InlineStack>
        )}
        
        <ResourceList
          resourceName={{ singular: 'item', plural: 'items' }}
          items={lineItems}
          renderItem={renderLineItem}
        />
      </BlockStack>
    </Card>
  );
};
