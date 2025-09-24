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

interface ParsedPhone {
  phoneNumber: string;
  originalText: string;
  isValid: boolean;
}

interface BulkPhoneInputProps {
  onPhonesParsed: (phones: ParsedPhone[]) => void;
  disabled?: boolean;
}

export const BulkPhoneInput: React.FC<BulkPhoneInputProps> = ({
  onPhonesParsed,
  disabled = false
}) => {
  const [bulkInput, setBulkInput] = useState('');
  const [parsedPhones, setParsedPhones] = useState<ParsedPhone[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const parsePhoneInput = useCallback((input: string): ParsedPhone[] => {
    if (!input.trim()) return [];

    const lines = input.split('\n').filter(line => line.trim());
    const phones: ParsedPhone[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Extract phone numbers from various formats
      // Remove common non-digit characters except + at the beginning
      let phoneNumber = '';
      let isValid = false;

      // Clean the line - keep only digits and + at the start
      const cleanedLine = trimmedLine.replace(/[^\d+]/g, '');
      
      // Check if it looks like a phone number
      if (cleanedLine.length >= 6) { // Minimum reasonable phone number length
        phoneNumber = cleanedLine;
        isValid = true;
      } else {
        // Try to extract just digits from the line
        const digits = trimmedLine.replace(/\D/g, '');
        if (digits.length >= 6) {
          phoneNumber = digits;
          isValid = true;
        }
      }

      if (phoneNumber) {
        phones.push({
          phoneNumber,
          originalText: trimmedLine,
          isValid
        });
      }
    }

    return phones;
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setBulkInput(value);
    
    if (value.trim()) {
      const parsed = parsePhoneInput(value);
      setParsedPhones(parsed);
      setShowPreview(parsed.length > 0);
    } else {
      setParsedPhones([]);
      setShowPreview(false);
    }
  }, [parsePhoneInput]);

  const handleProcessPhones = useCallback(() => {
    const validPhones = parsedPhones.filter(phone => phone.isValid);
    if (validPhones.length > 0) {
      onPhonesParsed(validPhones);
    }
  }, [parsedPhones, onPhonesParsed]);

  return (
    <BlockStack gap="400">
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd" as="h3">
            Bulk Add Phone Numbers
          </Text>
          
          <Text variant="bodyMd" as="p" tone="subdued">
            Enter phone numbers to blacklist, one per line. The system will automatically detect and clean phone number formats.
          </Text>

          <TextField
            label="Phone Numbers"
            value={bulkInput}
            onChange={handleInputChange}
            multiline={8}
            autoComplete="off"
            placeholder={`Enter phone numbers, one per line:
123456789
+212-123-456-789
0663123456
...`}
            helpText="Supported formats: digits only, with country codes, with dashes/spaces"
            disabled={disabled}
          />

          {showPreview && (
            <Card background="bg-surface-secondary">
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingSm" as="h4">
                    Preview ({parsedPhones.length} phone numbers detected)
                  </Text>
                  <InlineStack gap="200">
                    <Badge tone="success">
                      {`${parsedPhones.filter(p => p.isValid).length} valid`}
                    </Badge>
                    {parsedPhones.filter(p => !p.isValid).length > 0 && (
                      <Badge tone="critical">
                        {`${parsedPhones.filter(p => !p.isValid).length} invalid`}
                      </Badge>
                    )}
                  </InlineStack>
                </InlineStack>

                {parsedPhones.length > 10 && (
                  <Banner>
                    <Text variant="bodyMd" as="p">
                      Showing first 10 of {parsedPhones.length} detected phone numbers
                    </Text>
                  </Banner>
                )}

                <List type="bullet">
                  {parsedPhones.slice(0, 10).map((phone, index) => (
                    <List.Item key={index}>
                      <InlineStack gap="200" align="start">
                        <Text 
                          variant="bodyMd" 
                          as="span"
                          tone={phone.isValid ? 'success' : 'critical'}
                          fontWeight={phone.isValid ? 'medium' : 'regular'}
                        >
                          {phone.phoneNumber}
                        </Text>
                        {phone.originalText !== phone.phoneNumber && (
                          <Text variant="bodySm" as="span" tone="subdued">
                            (from: {phone.originalText})
                          </Text>
                        )}
                      </InlineStack>
                    </List.Item>
                  ))}
                </List>

                <InlineStack gap="300">
                  <Button
                    variant="primary"
                    onClick={handleProcessPhones}
                    disabled={disabled || parsedPhones.filter(p => p.isValid).length === 0}
                  >
                    {`Add ${parsedPhones.filter(p => p.isValid).length} Phone Numbers`}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setBulkInput('');
                      setParsedPhones([]);
                      setShowPreview(false);
                    }}
                    disabled={disabled}
                  >
                    Clear
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          )}
        </BlockStack>
      </Card>
    </BlockStack>
  );
};
