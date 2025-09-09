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
import { RefundConflictModal } from "../components/modals";



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

  // Refund conflict modal state
  const [showRefundConflictModal, setShowRefundConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState<{
    orderName: string;
    orderSelections: any[];
    currentIndex: number;
    requestedAmount: number;
    availableAmount: number;
    currency: string;
  } | null>(null);
  const [isProcessingConflict, setIsProcessingConflict] = useState(false);
  const [processedResults, setProcessedResults] = useState<any[]>([]); // Accumulate all results



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

  // Handle bulk return processing with conflict detection
  const handleBulkReturns = useCallback(async (orderSelections: any[]) => {
    if (!shop?.id) {
      setError('Shop information not available');
      return;
    }

    setIsBulkReturning(true);
    setError(null);
    setProcessedResults([]); // Reset accumulated results for new batch

    try {
      await processOrderSelectionsSequentially(orderSelections, 0);
    } catch (err) {
      setError('An error occurred while processing bulk returns');
      console.error('Bulk return processing error:', err);
      setIsBulkReturning(false);
    }
  }, [shop?.id]);

  // Process orders sequentially to handle conflicts individually
  const processOrderSelectionsSequentially = useCallback(async (orderSelections: any[], startIndex: number, accumulatedResults: any[] = []) => {
    const results: any[] = [...accumulatedResults]; // Start with accumulated results
    
    for (let i = startIndex; i < orderSelections.length; i++) {
      const orderSelection = orderSelections[i];
      const orderData = foundOrders.find(order => order.id === orderSelection.orderId);
      
      try {
        // Try to process individual order
        const result = await (api as any).processOrderReturn({
          orderId: orderSelection.orderId,
          shopId: shop!.id,
          lineItems: orderSelection.selectedItems.map((item: any) => ({
            lineItemId: item.lineItemId,
            quantity: item.quantity,
            reason: "Bulk return processing"
          })),
          refundShipping: false,
          reason: "Bulk return processing",
          notify: false,
          skipRefund: false
        });

        if (result.success) {
          // Use order name from API response first, then fall back to orderData, then to orderId
          const orderName = result.refund?.orderName || 
                           result.orderName ||
                           (orderData?.name ? (orderData.name.startsWith('#') ? orderData.name : `#${orderData.name}`) : `#${orderSelection.orderId}`);
          
          // Enhance line items with proper names from original order data
          let enhancedLineItems = result.refund?.lineItems || [];
          if (orderData?.lineItems && enhancedLineItems.length > 0) {
            enhancedLineItems = enhancedLineItems.map((refundItem: any) => {
              const originalItem = orderData.lineItems.find((item: any) => 
                item.id === refundItem.lineItemId || 
                item.lineItemId === refundItem.lineItemId
              );
              return {
                ...refundItem,
                name: refundItem.name || originalItem?.name || originalItem?.title || `Item ${refundItem.lineItemId}`,
                sku: refundItem.sku || originalItem?.sku || originalItem?.variant?.sku || ''
              };
            });
          }
          
          results.push({
            orderId: orderSelection.orderId,
            orderName: orderName,
            success: true,
            message: result.message || 'Return processed successfully',
            refundAmount: result.refund?.amount || 0,
            currency: result.refund?.currency || 'MAD',
            isInventoryOnly: result.isInventoryOnly || false,
            processedItems: orderSelection.selectedItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
            lineItems: enhancedLineItems
          });
        } else if (result.errorType === 'INSUFFICIENT_REFUND_AMOUNT') {
          // Show conflict modal for this order
          // Use order name from API response if available, otherwise fall back to orderData lookup
          const orderName = result.orderName || 
                           (orderData?.name ? (orderData.name.startsWith('#') ? orderData.name : `#${orderData.name}`) : `#${orderSelection.orderId}`);
          
          // Save current results before stopping processing
          setProcessedResults(results);
          
          setConflictData({
            orderName: orderName,
            orderSelections,
            currentIndex: i,
            requestedAmount: result.refundDetails.requestedAmount,
            availableAmount: result.refundDetails.availableAmount,
            currency: result.currency || result.refundDetails.currency || orderData?.currency || 'MAD'
          });
          setShowRefundConflictModal(true);
          return; // Stop processing and wait for user decision
        } else {
          results.push({
            orderId: orderSelection.orderId,
            orderName: orderData?.name || `Order ${orderSelection.orderId}`,
            success: false,
            message: result.error || 'Failed to process return',
            error: result.error,
            processedItems: 0
          });
        }
      } catch (orderError) {
        const errorMessage = orderError instanceof Error ? orderError.message : String(orderError);
        results.push({
          orderId: orderSelection.orderId,
          orderName: orderData?.name || `Order ${orderSelection.orderId}`,
          success: false,
          message: `Processing error: ${errorMessage}`,
          error: errorMessage,
          processedItems: 0
        });
      }
    }

    // All orders processed successfully
    const successfulReturns = results.filter(r => r.success).length;
    const failedReturns = results.filter(r => !r.success).length;
    const totalRefundAmount = results.reduce((sum, r) => sum + (r.refundAmount || 0), 0);

    setBulkReturnResults({
      success: true,
      results,
      summary: {
        totalOrders: orderSelections.length,
        successfulReturns,
        failedReturns,
        totalRefundAmount,
        currency: results[0]?.currency || 'MAD'
      }
    });
    setShowBulkReturnResults(true);
    setShowBulkReturnInterface(false);
    setIsBulkReturning(false);
  }, [shop, foundOrders]);

  // Handle inventory-only return from conflict modal
  const handleInventoryOnlyReturn = useCallback(async () => {
    if (!conflictData || !shop?.id) return;

    setIsProcessingConflict(true);
    
    try {
      const orderSelection = conflictData.orderSelections[conflictData.currentIndex];
      const orderData = foundOrders.find(order => order.id === orderSelection.orderId);
      
      // Process with inventory-only flag
      const result = await (api as any).processOrderReturn({
        orderId: orderSelection.orderId,
        shopId: shop.id,
        lineItems: orderSelection.selectedItems.map((item: any) => ({
          lineItemId: item.lineItemId,
          quantity: item.quantity,
          reason: "Bulk return processing"
        })),
        refundShipping: false,
        reason: "Bulk return processing (inventory-only)",
        notify: false,
        skipRefund: false,
        inventoryOnlyReturn: true
      });

      setShowRefundConflictModal(false);
      setIsProcessingConflict(false);
      setConflictData(null);

      // Continue processing remaining orders
      if (conflictData.currentIndex + 1 < conflictData.orderSelections.length) {
        // Enhance line items with proper names from original order data
        let enhancedLineItems = result.refund?.lineItems || [];
        if (orderData?.lineItems && enhancedLineItems.length > 0) {
          enhancedLineItems = enhancedLineItems.map((refundItem: any) => {
            const originalItem = orderData.lineItems.find((item: any) => 
              item.id === refundItem.lineItemId || 
              item.lineItemId === refundItem.lineItemId
            );
            return {
              ...refundItem,
              name: refundItem.name || originalItem?.name || originalItem?.title || `Item ${refundItem.lineItemId}`,
              sku: refundItem.sku || originalItem?.sku || originalItem?.variant?.sku || ''
            };
          });
        }
        
        // Add the current result to accumulated results
        const currentResult = {
          orderId: orderSelection.orderId,
          orderName: conflictData.orderName,
          success: result.success,
          message: result.success ? 'Inventory-only return processed successfully' : result.error,
          refundAmount: result.refund?.amount || 0,
          currency: result.refund?.currency || 'MAD',
          isInventoryOnly: result.isInventoryOnly || true,
          processedItems: orderSelection.selectedItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
          lineItems: enhancedLineItems
        };
        
        const accumulatedResults = [...processedResults, currentResult];
        setProcessedResults(accumulatedResults);
        
        await processOrderSelectionsSequentially(conflictData.orderSelections, conflictData.currentIndex + 1, accumulatedResults);
      } else {
        // Enhance line items with proper names from original order data
        let enhancedLineItems = result.refund?.lineItems || [];
        if (orderData?.lineItems && enhancedLineItems.length > 0) {
          enhancedLineItems = enhancedLineItems.map((refundItem: any) => {
            const originalItem = orderData.lineItems.find((item: any) => 
              item.id === refundItem.lineItemId || 
              item.lineItemId === refundItem.lineItemId
            );
            return {
              ...refundItem,
              name: refundItem.name || originalItem?.name || originalItem?.title || `Item ${refundItem.lineItemId}`,
              sku: refundItem.sku || originalItem?.sku || originalItem?.variant?.sku || ''
            };
          });
        }
        
        // This was the last order, show final results with all accumulated data
        const currentResult = {
          orderId: orderSelection.orderId,
          orderName: conflictData.orderName,
          success: result.success,
          message: result.success ? 'Inventory-only return processed successfully' : result.error,
          refundAmount: result.refund?.amount || 0,
          currency: result.refund?.currency || 'MAD',
          isInventoryOnly: result.isInventoryOnly || true,
          processedItems: orderSelection.selectedItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
          lineItems: enhancedLineItems
        };
        
        const finalResults = [...processedResults, currentResult];
        const successfulReturns = finalResults.filter(r => r.success).length;
        const failedReturns = finalResults.filter(r => !r.success).length;
        const totalRefundAmount = finalResults.reduce((sum, r) => sum + (r.refundAmount || 0), 0);

        setBulkReturnResults({
          success: true,
          results: finalResults,
          summary: {
            totalOrders: conflictData.orderSelections.length,
            successfulReturns,
            failedReturns,
            totalRefundAmount,
            currency: finalResults[0]?.currency || 'MAD'
          }
        });
        setShowBulkReturnResults(true);
        setShowBulkReturnInterface(false);
        setIsBulkReturning(false);
        setProcessedResults([]); // Reset for next batch
      }
    } catch (error) {
      console.error('Error processing inventory-only return:', error);
      setError('Failed to process inventory-only return');
      setIsProcessingConflict(false);
    }
  }, [conflictData, shop, processOrderSelectionsSequentially, foundOrders, processedResults]);

  // Handle skip order from conflict modal
  const handleSkipOrder = useCallback(async () => {
    if (!conflictData) return;

    setShowRefundConflictModal(false);
    setConflictData(null);

    // Add a skipped result to accumulated results
    const skippedResult = {
      orderId: conflictData.orderSelections[conflictData.currentIndex].orderId,
      orderName: conflictData.orderName,
      success: false,
      message: 'Order skipped due to insufficient refund amount',
      refundAmount: 0,
      currency: conflictData.currency,
      isInventoryOnly: false,
      processedItems: 0,
      lineItems: []
    };
    
    const accumulatedResults = [...processedResults, skippedResult];
    setProcessedResults(accumulatedResults);

    // Continue processing remaining orders
    if (conflictData.currentIndex + 1 < conflictData.orderSelections.length) {
      await processOrderSelectionsSequentially(conflictData.orderSelections, conflictData.currentIndex + 1, accumulatedResults);
    } else {
      // This was the last order, finish processing with accumulated results
      const successfulReturns = accumulatedResults.filter(r => r.success).length;
      const failedReturns = accumulatedResults.filter(r => !r.success).length;
      const totalRefundAmount = accumulatedResults.reduce((sum, r) => sum + (r.refundAmount || 0), 0);

      setBulkReturnResults({
        success: true,
        results: accumulatedResults,
        summary: {
          totalOrders: conflictData.orderSelections.length,
          successfulReturns,
          failedReturns,
          totalRefundAmount,
          currency: accumulatedResults[0]?.currency || 'MAD'
        }
      });
      setShowBulkReturnResults(true);
      setShowBulkReturnInterface(false);
      setIsBulkReturning(false);
      setProcessedResults([]); // Reset for next batch
    }
  }, [conflictData, processOrderSelectionsSequentially, processedResults]);

  // Handle close conflict modal
  const handleCloseConflictModal = useCallback(() => {
    setShowRefundConflictModal(false);
    setConflictData(null);
    setIsBulkReturning(false);
  }, []);

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

      {/* Refund Conflict Modal */}
      {conflictData && (
        <RefundConflictModal
          isOpen={showRefundConflictModal}
          onClose={handleCloseConflictModal}
          orderName={conflictData.orderName}
          requestedAmount={conflictData.requestedAmount}
          availableAmount={conflictData.availableAmount}
          currency={conflictData.currency}
          onProceedInventoryOnly={handleInventoryOnlyReturn}
          onSkipOrder={handleSkipOrder}
          isProcessing={isProcessingConflict}
        />
      )}
    </Page>
  );
};

export default ProcessReturnsPage;
