import { useState, useCallback } from 'react';
import {
  Page,
  Card,
  Text,
  BlockStack,
  Banner,
  Spinner
} from "@shopify/polaris";
import { useFindFirst } from "@gadgetinc/react";
import { api } from "../api";
import { BulkOrderInput } from "../components/BulkOrderInput";
import { BulkReturnInterface } from "../components/BulkReturnInterface";
import { BulkReturnResults } from "../components/BulkReturnResults";



const ProcessReturnsPage = () => {
  const [{ data: shop, fetching: shopFetching, error: shopError }] = useFindFirst(api.shopifyShop);

  // State
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Bulk order state
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // Bulk return state
  const [foundOrders, setFoundOrders] = useState<any[]>([]);
  const [showBulkReturnInterface, setShowBulkReturnInterface] = useState(false);
  const [bulkReturnResults, setBulkReturnResults] = useState<any>(null);
  const [showBulkReturnResults, setShowBulkReturnResults] = useState(false);
  const [isBulkReturning, setIsBulkReturning] = useState(false);



  // Bulk processing handlers
  const handleBulkOrdersParsed = useCallback(async (orders: any[]) => {
    if (!shop?.id) {
      setError('Shop information not available');
      return;
    }

    setIsBulkProcessing(true);
    setError(null);

    try {
      const result = await (api as any).searchBulkOrdersForReturn({
        orderNumbers: orders.map(o => o.orderNumber),
        shopId: shop.id
      });

      if (result.success) {
        // Filter only successful orders for the bulk return interface
        const successfulOrders = result.results.filter((r: any) => r.success && r.orderData);

        if (successfulOrders.length > 0) {
          setFoundOrders(successfulOrders.map((r: any) => r.orderData));
          setShowBulkReturnInterface(true);
        } else {
          setError('No returnable orders found in the provided list');
        }
      } else {
        setError(result.error || 'Failed to process bulk orders');
      }
    } catch (err) {
      setError('An error occurred while processing bulk orders');
      console.error('Bulk processing error:', err);
    } finally {
      setIsBulkProcessing(false);
    }
  }, [shop?.id]);

  const handleStartOver = useCallback(() => {
    setShowBulkReturnInterface(false);
    setFoundOrders([]);
    setShowBulkReturnResults(false);
    setBulkReturnResults(null);
  }, []);

  // Handle bulk return processing
  const handleBulkReturns = useCallback(async (orderSelections: any[]) => {
    if (!shop?.id) {
      setError('Shop information not available');
      return;
    }

    setIsBulkReturning(true);
    setError(null);

    try {
      const result = await (api as any).processBulkReturns({
        orderSelections,
        shopId: shop.id
      });

      if (result.success) {
        setBulkReturnResults(result);
        setShowBulkReturnResults(true);
        setShowBulkReturnInterface(false);
      } else {
        setError(result.error || 'Failed to process bulk returns');
      }
    } catch (err) {
      setError('An error occurred while processing bulk returns');
      console.error('Bulk return processing error:', err);
    } finally {
      setIsBulkReturning(false);
    }
  }, [shop?.id]);

  // Show loading state while fetching shop data
  if (shopFetching) {
    return (
      <Page title="Process Returns & Refunds">
        <Card>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <Spinner size="large" />
            <div style={{ marginLeft: '1rem' }}>
              <Text variant="bodyMd" as="p" tone="subdued">
                Loading shop information...
              </Text>
            </div>
          </div>
        </Card>
      </Page>
    );
  }

  // Show error state if there's an error loading shop data
  if (shopError) {
    return (
      <Page title="Process Returns & Refunds">
        <Card>
          <Banner tone="critical">
            <p>Error loading shop information: {shopError.message}</p>
          </Banner>
        </Card>
      </Page>
    );
  }

  return (
    <Page title="Returns Processing">
      <BlockStack gap="500">
        {/* Show bulk return results if available */}
        {showBulkReturnResults && bulkReturnResults && (
          <BulkReturnResults
            results={bulkReturnResults.results}
            summary={bulkReturnResults.summary}
            onStartOver={handleStartOver}
          />
        )}

        {/* Show bulk return interface if orders found */}
        {showBulkReturnInterface && foundOrders.length > 0 && (
          <BulkReturnInterface
            orders={foundOrders}
            onProcessReturns={handleBulkReturns}
            onCancel={handleStartOver}
            isProcessing={isBulkReturning}
          />
        )}

        {/* Main bulk order input - only show if not showing other interfaces */}
        {!showBulkReturnInterface && !showBulkReturnResults && (
          <BulkOrderInput
            onOrdersParsed={handleBulkOrdersParsed}
            disabled={isBulkProcessing}
          />
        )}

        {/* Error/Success Messages */}
        {error && (
          <Banner tone="critical" onDismiss={() => setError(null)}>
            <p>{error}</p>
          </Banner>
        )}

        {success && (
          <Banner tone="success" onDismiss={() => setSuccess(null)}>
            <p>{success}</p>
          </Banner>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '10px 0', color: '#637381', fontSize: '14px' }}>
          Designed by Scrptble in Pakistan
        </div>
      </BlockStack>
    </Page>
  );
};

export default ProcessReturnsPage;
