import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  Checkbox,
  Modal,
  Banner,
  Divider,
  Box,
  TextField
} from '@shopify/polaris';

interface LineItem {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  maxReturnQuantity: number;
}

interface OrderData {
  id: string;
  name: string;
  customerName: string;
  trackingNumber: string;
  financialStatus: string;
  lineItems: LineItem[];
}

interface SelectedItem {
  lineItemId: string;
  quantity: number;
}

interface OrderSelection {
  orderId: string;
  selectedItems: SelectedItem[];
}

interface SelectedOrder {
  orderId: string;
  selected: boolean;
}

interface BulkReturnInterfaceProps {
  orders: OrderData[];
  onProcessReturns: (selections: OrderSelection[]) => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export const BulkReturnInterface: React.FC<BulkReturnInterfaceProps> = ({
  orders,
  onProcessReturns,
  onCancel,
  isProcessing
}) => {
  const [orderSelections, setOrderSelections] = useState<Record<string, SelectedItem[]>>({});
  const [selectedOrders, setSelectedOrders] = useState<Record<string, boolean>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Initialize all orders and items as selected by default
  useEffect(() => {
    const initialOrderSelections: Record<string, SelectedItem[]> = {};
    const initialSelectedOrders: Record<string, boolean> = {};

    orders.forEach(order => {
      // Select all orders by default
      initialSelectedOrders[order.id] = true;

      // Select all items with their max return quantity by default
      initialOrderSelections[order.id] = order.lineItems.map(item => ({
        lineItemId: item.id,
        quantity: item.maxReturnQuantity
      }));
    });

    setSelectedOrders(initialSelectedOrders);
    setOrderSelections(initialOrderSelections);
  }, [orders]);

  // Handle item selection for a specific order
  const handleItemSelection = useCallback((orderId: string, lineItemId: string, quantity: number, checked: boolean) => {
    setOrderSelections(prev => {
      const orderItems = prev[orderId] || [];

      if (checked) {
        // Add or update the item
        const existingIndex = orderItems.findIndex(item => item.lineItemId === lineItemId);
        if (existingIndex >= 0) {
          orderItems[existingIndex].quantity = quantity;
        } else {
          orderItems.push({ lineItemId, quantity });
        }
      } else {
        // Remove the item
        return {
          ...prev,
          [orderId]: orderItems.filter(item => item.lineItemId !== lineItemId)
        };
      }

      return {
        ...prev,
        [orderId]: [...orderItems]
      };
    });
  }, []);

  // Handle order selection
  const handleOrderSelection = useCallback((orderId: string, checked: boolean) => {
    setSelectedOrders(prev => ({
      ...prev,
      [orderId]: checked
    }));

    // If unchecking an order, also uncheck all its items
    if (!checked) {
      setOrderSelections(prev => ({
        ...prev,
        [orderId]: []
      }));
    } else {
      // If checking an order, select all its items with max quantities
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setOrderSelections(prev => ({
          ...prev,
          [orderId]: order.lineItems.map(item => ({
            lineItemId: item.id,
            quantity: item.maxReturnQuantity
          }))
        }));
      }
    }
  }, [orders]);

  // Handle select all orders
  const handleSelectAllOrders = useCallback((checked: boolean) => {
    const newSelectedOrders: Record<string, boolean> = {};
    const newOrderSelections: Record<string, SelectedItem[]> = {};

    orders.forEach(order => {
      newSelectedOrders[order.id] = checked;

      if (checked) {
        // Select all items with max quantities
        newOrderSelections[order.id] = order.lineItems.map(item => ({
          lineItemId: item.id,
          quantity: item.maxReturnQuantity
        }));
      } else {
        // Deselect all items
        newOrderSelections[order.id] = [];
      }
    });

    setSelectedOrders(newSelectedOrders);
    setOrderSelections(newOrderSelections);
  }, [orders]);

  // Handle select all items for a specific order
  const handleSelectAllItemsInOrder = useCallback((orderId: string, checked: boolean) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (checked) {
      // Select all items in this order with max quantities
      setOrderSelections(prev => ({
        ...prev,
        [orderId]: order.lineItems.map(item => ({
          lineItemId: item.id,
          quantity: item.maxReturnQuantity
        }))
      }));
    } else {
      // Deselect all items in this order
      setOrderSelections(prev => ({
        ...prev,
        [orderId]: []
      }));
    }
  }, [orders]);

  // Handle quantity change for a specific item
  const handleQuantityChange = useCallback((orderId: string, lineItemId: string, newQuantity: number) => {
    setOrderSelections(prev => {
      const orderItems = prev[orderId] || [];
      const existingIndex = orderItems.findIndex(item => item.lineItemId === lineItemId);

      if (existingIndex >= 0) {
        orderItems[existingIndex].quantity = newQuantity;
        return {
          ...prev,
          [orderId]: [...orderItems]
        };
      }

      return prev;
    });
  }, []);

  // Check if any orders are selected
  const hasSelectedOrders = Object.values(selectedOrders).some(selected => selected);

  // Check if any items are selected across selected orders
  const hasSelectedItems = Object.entries(orderSelections).some(([orderId, items]) =>
    selectedOrders[orderId] && items.length > 0
  );

  // Get total selected items count (only from selected orders)
  const totalSelectedItems = Object.entries(orderSelections).reduce((total, [orderId, items]) => {
    if (selectedOrders[orderId]) {
      return total + items.reduce((sum, item) => sum + item.quantity, 0);
    }
    return total;
  }, 0);

  // Get count of selected orders
  const selectedOrdersCount = Object.values(selectedOrders).filter(selected => selected).length;

  // Check if all orders are selected
  const allOrdersSelected = orders.length > 0 && Object.values(selectedOrders).every(selected => selected);

  // Handle process returns
  const handleProcessReturns = useCallback(() => {
    const selections: OrderSelection[] = Object.entries(orderSelections)
      .filter(([orderId, items]) => selectedOrders[orderId] && items.length > 0)
      .map(([orderId, selectedItems]) => ({
        orderId,
        selectedItems
      }));

    onProcessReturns(selections);
    setShowConfirmModal(false);
  }, [orderSelections, selectedOrders, onProcessReturns]);

  // Get confirmation modal content
  const getConfirmationContent = () => {
    const ordersWithSelections = Object.entries(orderSelections)
      .filter(([orderId, items]) => selectedOrders[orderId] && items.length > 0)
      .map(([orderId, selectedItems]) => {
        const order = orders.find(o => o.id === orderId);
        return { order, selectedItems };
      });

    return ordersWithSelections.map(({ order, selectedItems }) => {
      if (!order) return null;

      return (
        <Card key={order.id} background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text variant="bodyMd" fontWeight="semibold">
              <a
                href={`https://admin.shopify.com/store/08d880-20/orders/${order.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2c6ecb',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                {order.name}
              </a>
              {' - '}{order.customerName}
            </Text>
            
            <BlockStack gap="200">
              {selectedItems.map(selectedItem => {
                const lineItem = order.lineItems.find(item => item.id === selectedItem.lineItemId);
                if (!lineItem) return null;

                return (
                  <InlineStack key={selectedItem.lineItemId} gap="200" align="space-between">
                    <Text variant="bodySm">
                      {lineItem.name} (x{selectedItem.quantity})
                    </Text>
                    <Text variant="bodySm">
                      {((lineItem.unitPrice || 0) * selectedItem.quantity).toFixed(2)} MAD
                    </Text>
                  </InlineStack>
                );
              })}
            </BlockStack>
          </BlockStack>
        </Card>
      );
    });
  };

  return (
    <BlockStack gap="500">
      <Card>
        <BlockStack gap="400">
          <InlineStack gap="200" align="space-between">
            <Text variant="headingMd" as="h3">
              Returns Processing ({orders.length} orders)
            </Text>
            <InlineStack gap="200">
              <Badge tone="info">
                {selectedOrdersCount} orders selected
              </Badge>
              <Badge tone="info">
                {totalSelectedItems} items selected
              </Badge>
            </InlineStack>
          </InlineStack>

          <InlineStack gap="300" align="space-between">
            <Text as="p" tone="subdued">
              Select orders and returnable items. Only selected orders and items will be processed for returns.
            </Text>
            <Button
              size="micro"
              onClick={() => handleSelectAllOrders(!allOrdersSelected)}
            >
              {allOrdersSelected ? 'Deselect All Orders' : 'Select All Orders'}
            </Button>
          </InlineStack>
        </BlockStack>
      </Card>

      {/* Orders List */}
      <BlockStack gap="400">
        {orders.map((order) => {
          const isOrderSelected = selectedOrders[order.id];
          const isPaymentPending = order.financialStatus === 'PENDING' ||
                                   order.financialStatus === 'PAYMENT_PENDING' ||
                                   order.financialStatus === 'pending' ||
                                   order.financialStatus === 'payment_pending' ||
                                   order.financialStatus === 'AUTHORIZED' ||
                                   order.financialStatus === 'authorized';

          return (
            <Card key={order.id} background={isOrderSelected ? "bg-surface-selected" : undefined}>
              <BlockStack gap="400">
                {/* Order Header with Selection */}
                <InlineStack gap="300" align="space-between">
                  <InlineStack gap="300" align="start">
                    <Checkbox
                      checked={isOrderSelected}
                      onChange={(checked) => handleOrderSelection(order.id, checked)}
                    />
                    <BlockStack gap="100">
                      <Text variant="bodyMd" fontWeight="semibold">
                        <a
                          href={`https://admin.shopify.com/store/08d880-20/orders/${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#2c6ecb',
                            textDecoration: 'none',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          {order.name}
                        </a>
                        {' - '}{order.customerName}
                      </Text>
                      <InlineStack gap="200" align="center">
                        {order.trackingNumber && (
                          <Text variant="bodySm" tone="subdued">
                            Tracking: {order.trackingNumber}
                          </Text>
                        )}
                        <Badge tone={isPaymentPending ? "warning" : "info"}>
                          {order.financialStatus}
                        </Badge>
                        {isPaymentPending && (
                          <Badge tone="critical">
                            No Refund - Return Only
                          </Badge>
                        )}
                      </InlineStack>
                    </BlockStack>
                  </InlineStack>

                  <InlineStack gap="200" align="center">
                    <Button
                      size="micro"
                      onClick={() => {
                        const allItemsSelected = order.lineItems.every(item =>
                          orderSelections[order.id]?.some(selected => selected.lineItemId === item.id)
                        );
                        handleSelectAllItemsInOrder(order.id, !allItemsSelected);
                      }}
                      disabled={!isOrderSelected}
                      style={{ fontSize: '11px', padding: '2px 8px', minHeight: '24px' }}
                    >
                      {order.lineItems.every(item =>
                        orderSelections[order.id]?.some(selected => selected.lineItemId === item.id)
                      ) ? 'Deselect All Items' : 'Select All Items'}
                    </Button>
                    <Badge tone="success" size="small">
                      {order.lineItems.length} returnable items
                    </Badge>
                  </InlineStack>
                </InlineStack>

              <Divider />

              {/* Returnable Items */}
              <BlockStack gap="300">
                {order.lineItems.map((item) => {
                  const isSelected = orderSelections[order.id]?.some(
                    selected => selected.lineItemId === item.id
                  );
                  const selectedQuantity = orderSelections[order.id]?.find(
                    selected => selected.lineItemId === item.id
                  )?.quantity || item.maxReturnQuantity;

                  return (
                    <Box
                      key={item.id}
                      padding="300"
                      background={isOrderSelected ? "bg-surface-secondary" : "bg-surface-disabled"}
                      borderRadius="200"
                    >
                      <InlineStack gap="300" align="space-between">
                        <BlockStack gap="200">
                          <Checkbox
                            label={item.name}
                            checked={isSelected && isOrderSelected}
                            disabled={!isOrderSelected}
                            onChange={(checked) =>
                              handleItemSelection(order.id, item.id, selectedQuantity, checked)
                            }
                          />
                          <Text variant="bodySm" tone="subdued">
                            SKU: {item.sku} | Available: {item.maxReturnQuantity}
                          </Text>

                          {/* Quantity Controls - only show if item is selected and has more than 1 quantity */}
                          {isSelected && isOrderSelected && item.maxReturnQuantity > 1 && (
                            <InlineStack gap="200" align="center" blockAlign="center">
                              <Text variant="bodySm" fontWeight="semibold">
                                Quantity:
                              </Text>
                              <div style={{ width: '80px' }}>
                                <TextField
                                  label=""
                                  type="number"
                                  value={selectedQuantity.toString()}
                                  onChange={(value) => {
                                    const newQuantity = Math.max(1, Math.min(item.maxReturnQuantity, parseInt(value) || 1));
                                    handleQuantityChange(order.id, item.id, newQuantity);
                                  }}
                                  min={1}
                                  max={item.maxReturnQuantity}
                                  autoComplete="off"
                                  disabled={!isOrderSelected}
                                />
                              </div>
                            </InlineStack>
                          )}
                        </BlockStack>

                        <BlockStack gap="100" align="end">
                          <Text variant="bodyMd" fontWeight="semibold">
                            {(item.unitPrice || 0).toFixed(2)} MAD
                          </Text>
                          {isSelected && (
                            <Text variant="bodySm" tone="subdued">
                              Total: {((item.unitPrice || 0) * selectedQuantity).toFixed(2)} MAD
                            </Text>
                          )}
                        </BlockStack>
                      </InlineStack>
                    </Box>
                  );
                })}
              </BlockStack>
            </BlockStack>
          </Card>
          );
        })}
      </BlockStack>

      {/* Process Buttons */}
      <InlineStack gap="300" align="end">
        <Button
          size="large"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="large"
          onClick={() => setShowConfirmModal(true)}
          disabled={!hasSelectedItems || isProcessing}
          loading={isProcessing}
        >
          Process Returns ({totalSelectedItems} items)
        </Button>
      </InlineStack>

      {/* Confirmation Modal */}
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Bulk Returns"
        primaryAction={{
          content: 'Process All Returns',
          onAction: handleProcessReturns,
          loading: isProcessing
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setShowConfirmModal(false)
          }
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Banner tone="warning">
              <p>You are about to process returns for {selectedOrdersCount} orders with {totalSelectedItems} total items.</p>
            </Banner>

            <Text variant="bodyMd" fontWeight="semibold">
              Returns to be processed:
            </Text>

            <BlockStack gap="300">
              {getConfirmationContent()}
            </BlockStack>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </BlockStack>
  );
};
