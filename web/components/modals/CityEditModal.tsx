import React from "react";
import {
  Modal, BlockStack, Box, Text, FormLayout, TextField, InlineStack, Button
} from "@shopify/polaris";
import { formatSpeedafCityForDisplay } from "../../utils";

interface Order {
  id: string;
  address?: string;
  city?: string;
  rawCity?: string;
  originalCity?: string;
}

interface CityEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editingOrderId: string | null;
  orders: Order[];
  exchangeOrders: Order[];
  cityInputValue: string;
  onCityInputChange: (value: string) => void;
  selectedCourier: string;
  filteredCities: string[];
  isLoading: boolean;
  onCitySelect: (city: string) => void;
  onClearSearch: () => void;
}

export const CityEditModal: React.FC<CityEditModalProps> = ({
  open,
  onClose,
  onSave,
  editingOrderId,
  orders,
  exchangeOrders,
  cityInputValue,
  onCityInputChange,
  selectedCourier,
  filteredCities,
  isLoading,
  onCitySelect,
  onClearSearch,
}) => {
  const currentOrder = editingOrderId ? 
    orders.find(o => o.id === editingOrderId) || exchangeOrders.find(o => o.id === editingOrderId) : 
    null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit City Name"
      primaryAction={{
        content: 'Save',
        onAction: onSave,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <div style={{ minHeight: '400px' }}>
          <BlockStack gap="400">
            {editingOrderId && currentOrder && (
              <Box background="bg-surface-secondary" padding="300" borderRadius="200">
                <Text variant="bodyMd" as="p">
                  <strong>Original Address:</strong> {currentOrder.address || "Address not found"}
                </Text>
                <Text variant="bodyMd" as="p">
                  <strong>AI Detected City:</strong> {" "}
                  {(() => {
                    const rawCity = currentOrder.rawCity;
                    const city = currentOrder.city;

                    if (rawCity) {
                      return <span style={{ color: '#108043' }}>{rawCity}</span>;
                    } else if (city) {
                      return <span style={{ color: '#c05717' }}>{city}</span>;
                    } else {
                      return <span style={{ color: '#d82c0d' }}>Unknown</span>;
                    }
                  })()}
                </Text>
                {currentOrder.originalCity && (
                  <Text variant="bodyMd" as="p">
                    <strong>Original City:</strong> {" "}
                    <span style={{ color: '#108043' }}>{currentOrder.originalCity}</span>
                  </Text>
                )}
              </Box>
            )}
            
            <FormLayout>
              <TextField
                label="City Name"
                value={cityInputValue}
                onChange={onCityInputChange}
                autoComplete="off"
                placeholder="Type to search cities..."
                helpText={`Showing cities for ${selectedCourier === 'speedaf' ? 'Speedaf' : 'Sendit'} (including custom cities). Type to search, scroll to view all cities, or click on a city to select it.`}
              />
              
              <div style={{ marginTop: '20px' }}>
                <InlineStack align="space-between">
                  <Text variant="headingSm" as="h3">
                    {isLoading ? "Searching..." : 
                      filteredCities.length > 0 ? 
                      `${filteredCities.length} ${filteredCities.length === 1 ? 'City' : 'Cities'} ${cityInputValue.trim() ? 'Matched' : 'Available'}` : 
                      "No cities match your search"}
                  </Text>
                  {cityInputValue.trim() && filteredCities.length > 0 && (
                    <Button 
                      variant="plain" 
                      onClick={onClearSearch}
                    >
                      Clear Search
                    </Button>
                  )}
                </InlineStack>
                <div style={{ 
                  height: '180px', 
                  overflowY: 'auto', 
                  marginTop: '10px',
                  border: '1px solid #dfe3e8',
                  borderRadius: '4px'
                }}>
                  {filteredCities.map(city => (
                    <div 
                      key={city}
                      onClick={() => onCitySelect(city)}
                      style={{ 
                        padding: '10px 12px',
                        borderBottom: '1px solid #f4f6f8',
                        cursor: 'pointer',
                        backgroundColor: city === cityInputValue ? '#f4f6f8' : 'transparent',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = city === cityInputValue ? '#f4f6f8' : 'transparent'}
                    >
                      <Text as="span">{selectedCourier === 'speedaf' ? formatSpeedafCityForDisplay(city) : city}</Text>
                      {city === cityInputValue && (
                        <div style={{ marginLeft: 'auto', color: '#008060' }}>✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FormLayout>
          </BlockStack>
        </div>
      </Modal.Section>
    </Modal>
  );
};
