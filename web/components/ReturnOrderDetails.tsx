import React from 'react';
import {
  Card,
  Text,
  InlineStack,
  BlockStack,
  Badge,
  Divider
} from '@shopify/polaris';

interface OrderData {
  id: string;
  name: string;
  customerName: string;
  customer?: any;
  phone: string;
  email: string;
  address: string;
  city: string;
  shippingAddress?: any;
  totalPrice: number;
  subtotal: number;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  trackingNumber: string;
  lineItems: any[];
  refundInfo: {
    hasRefunds: boolean;
    totalRefunded: number;
    remainingRefundable: number;
  };
  canReturn: boolean;
  returnableItemsCount: number;
}

interface ReturnOrderDetailsProps {
  order: OrderData;
}

export const ReturnOrderDetails: React.FC<ReturnOrderDetailsProps> = ({ order }) => {
  const getStatusBadge = (status: string, type: 'financial' | 'fulfillment') => {
    let tone: 'success' | 'warning' | 'critical' | 'info' | 'attention' | undefined;
    
    if (type === 'financial') {
      switch (status?.toLowerCase()) {
        case 'paid':
          tone = 'success';
          break;
        case 'pending':
        case 'authorized':
          tone = 'warning';
          break;
        case 'refunded':
        case 'partially_refunded':
          tone = 'attention';
          break;
        case 'voided':
          tone = 'critical';
          break;
        default:
          tone = 'info';
      }
    } else {
      switch (status?.toLowerCase()) {
        case 'fulfilled':
          tone = 'success';
          break;
        case 'partial':
          tone = 'warning';
          break;
        case 'unfulfilled':
          tone = 'attention';
          break;
        default:
          tone = 'info';
      }
    }
    
    return <Badge tone={tone}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="space-between">
          <Text variant="headingMd" as="h3">
            Order Details
          </Text>
          {order.canReturn && (
            <Badge tone="success">Returnable</Badge>
          )}
        </InlineStack>

        <BlockStack gap="300">
          {/* Order Information */}
          <InlineStack gap="400" wrap={false}>
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Order Number</Text>
              <Text variant="bodyMd">{order.name}</Text>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Order Date</Text>
              <Text variant="bodyMd">{formatDate(order.createdAt)}</Text>
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Total Amount</Text>
              <Text variant="bodyMd">${order.totalPrice.toFixed(2)}</Text>
            </BlockStack>
          </InlineStack>

          <Divider />

          {/* Customer Information */}
          <BlockStack gap="200">
            <Text variant="bodyMd" fontWeight="semibold">Customer Information</Text>
            <InlineStack gap="400" wrap={false}>
              <BlockStack gap="100">
                <Text variant="bodySm" tone="subdued">Name</Text>
                <Text variant="bodyMd">{order.customerName}</Text>
              </BlockStack>
              
              {order.phone && (
                <BlockStack gap="100">
                  <Text variant="bodySm" tone="subdued">Phone</Text>
                  <Text variant="bodyMd">{order.phone}</Text>
                </BlockStack>
              )}
              
              {order.email && (
                <BlockStack gap="100">
                  <Text variant="bodySm" tone="subdued">Email</Text>
                  <Text variant="bodyMd">{order.email}</Text>
                </BlockStack>
              )}
            </InlineStack>
          </BlockStack>

          <Divider />

          {/* Shipping Information */}
          <BlockStack gap="200">
            <Text variant="bodyMd" fontWeight="semibold">Shipping Information</Text>
            <InlineStack gap="400" wrap={false}>
              <BlockStack gap="100">
                <Text variant="bodySm" tone="subdued">Address</Text>
                <Text variant="bodyMd">{order.address}</Text>
                <Text variant="bodyMd">{order.city}</Text>
              </BlockStack>
              
              {order.trackingNumber && (
                <BlockStack gap="100">
                  <Text variant="bodySm" tone="subdued">Tracking Number</Text>
                  <Text variant="bodyMd">{order.trackingNumber}</Text>
                </BlockStack>
              )}
            </InlineStack>
          </BlockStack>

          <Divider />

          {/* Order Status */}
          <InlineStack gap="400" wrap={false}>
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Payment Status</Text>
              {getStatusBadge(order.financialStatus, 'financial')}
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Fulfillment Status</Text>
              {getStatusBadge(order.fulfillmentStatus, 'fulfillment')}
            </BlockStack>
            
            <BlockStack gap="200">
              <Text variant="bodyMd" fontWeight="semibold">Returnable Items</Text>
              <Text variant="bodyMd">{order.returnableItemsCount} items</Text>
            </BlockStack>
          </InlineStack>

          {/* Refund Information */}
          {order.refundInfo.hasRefunds && (
            <>
              <Divider />
              <BlockStack gap="200">
                <Text variant="bodyMd" fontWeight="semibold">Refund Information</Text>
                <InlineStack gap="400" wrap={false}>
                  <BlockStack gap="100">
                    <Text variant="bodySm" tone="subdued">Total Refunded</Text>
                    <Text variant="bodyMd">${order.refundInfo.totalRefunded.toFixed(2)}</Text>
                  </BlockStack>
                  
                  <BlockStack gap="100">
                    <Text variant="bodySm" tone="subdued">Remaining Refundable</Text>
                    <Text variant="bodyMd">${order.refundInfo.remainingRefundable.toFixed(2)}</Text>
                  </BlockStack>
                </InlineStack>
              </BlockStack>
            </>
          )}
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
