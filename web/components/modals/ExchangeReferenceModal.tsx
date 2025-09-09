import React from "react";
import {
  Modal, BlockStack, Spinner, Text, Banner, FormLayout, Select, TextField
} from "@shopify/polaris";

interface ExchangeReferenceModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  referenceOrdersLoading: boolean;
  referenceOrderError: string | null;
  referenceOrderOptions: Array<{ label: string; value: string }>;
  selectedReferenceOrder: string;
  onReferenceOrderSelect: (value: string) => void;
  referenceOrderSearchValue: string;
  onReferenceOrderSearch: (value: string) => void;
}

export const ExchangeReferenceModal: React.FC<ExchangeReferenceModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
  referenceOrdersLoading,
  referenceOrderError,
  referenceOrderOptions,
  selectedReferenceOrder,
  onReferenceOrderSelect,
  referenceOrderSearchValue,
  onReferenceOrderSearch,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Exchange Order With"
      primaryAction={{
        content: 'Use Selected Order',
        onAction: onConfirm,
        loading: loading,
        disabled: referenceOrdersLoading
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {referenceOrdersLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spinner />
              <div style={{ marginTop: '8px' }}>
                <Text as="p" variant="bodyMd">Loading orders with the same phone number...</Text>
              </div>
            </div>
          ) : (
            <>
              {referenceOrderError && (
                <Banner tone="critical">
                  <p>{referenceOrderError}</p>
                </Banner>
              )}
              
              <FormLayout>
                <Select
                  label="Select Reference Order"
                  options={referenceOrderOptions}
                  value={selectedReferenceOrder}
                  onChange={onReferenceOrderSelect}
                  disabled={referenceOrdersLoading || referenceOrderOptions.length === 0}
                  placeholder="Choose an order..."
                />
                
                <TextField
                  label="Or enter order number manually"
                  value={referenceOrderSearchValue}
                  onChange={onReferenceOrderSearch}
                  autoComplete="off"
                  placeholder="e.g. #1001 or 1001"
                  helpText="Only orders with the same phone number will be accepted"
                />
                
                <Text variant="bodyMd" as="p">
                  Only orders fulfilled by Sendit from the same phone number are shown.
                </Text>
              </FormLayout>
            </>
          )}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};
