/**
 * Process bulk order returns sequentially
 */

import { ActionOptions } from "gadget-server";

interface SelectedItem {
  lineItemId: string;
  quantity: number;
}

interface OrderSelection {
  orderId: string;
  selectedItems: SelectedItem[];
}

interface ActionParams {
  orderSelections: OrderSelection[];
  shopId: string;
}

interface ActionContext {
  params: ActionParams;
  api: any;
  logger: any;
  connections: any;
}

interface ProcessingResult {
  orderId: string;
  orderName: string;
  success: boolean;
  message: string;
  refundAmount?: number;
  currency?: string;
  error?: string;
  processedItems?: number;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    const { orderSelections, shopId } = params;

    logger.info('Processing bulk returns', { 
      orderCount: orderSelections.length,
      shopId,
      totalSelections: orderSelections.reduce((sum, order) => sum + order.selectedItems.length, 0)
    });

    // Validate required parameters
    if (!orderSelections || !Array.isArray(orderSelections) || orderSelections.length === 0) {
      return {
        success: false,
        error: "Missing required parameters: orderSelections array is required"
      };
    }

    if (!shopId) {
      return {
        success: false,
        error: "Missing required parameter: shopId is required"
      };
    }

    if (orderSelections.length > 20) {
      return {
        success: false,
        error: "Too many orders requested. Maximum 20 orders per bulk operation."
      };
    }

    const results: ProcessingResult[] = [];
    let totalRefundAmount = 0;
    let currency = 'MAD';
    let successfulReturns = 0;
    let failedReturns = 0;

    // Process each order sequentially
    for (const orderSelection of orderSelections) {
      try {
        logger.info('Processing return for order', { 
          orderId: orderSelection.orderId,
          itemCount: orderSelection.selectedItems.length
        });

        // Get order name and financial status for logging and processing
        const order = await api.shopifyOrder.findFirst({
          filter: { id: { equals: orderSelection.orderId } }
        });

        const orderName = order?.name || `Order ${orderSelection.orderId}`;
        const financialStatus = order?.financialStatus || '';
        const isPaymentPending = financialStatus === 'PENDING' ||
                                 financialStatus === 'PAYMENT_PENDING' ||
                                 financialStatus === 'pending' ||
                                 financialStatus === 'payment_pending' ||
                                 financialStatus === 'AUTHORIZED' ||
                                 financialStatus === 'authorized';

        logger.info('Order financial status check', {
          orderId: orderSelection.orderId,
          orderName,
          financialStatus,
          isPaymentPending
        });

        // Process the return using the existing processOrderReturn action
        const returnResult = await api.processOrderReturn({
          orderId: orderSelection.orderId,
          shopId: shopId,
          lineItems: orderSelection.selectedItems.map(item => ({
            lineItemId: item.lineItemId,
            quantity: item.quantity,
            reason: "Bulk return processing"
          })),
          refundShipping: false,
          reason: "Bulk return processing",
          notify: false, // Don't notify customers for bulk processing
          inventoryOnlyReturn: isPaymentPending // Use inventory-only return for payment pending orders
        });

        if (returnResult.success) {
          const refundAmount = returnResult.refund?.amount || 0;
          const refundCurrency = returnResult.refund?.currency || 'MAD';
          
          results.push({
            orderId: orderSelection.orderId,
            orderName: orderName,
            success: true,
            message: returnResult.message || 'Return processed successfully',
            refundAmount: refundAmount,
            currency: refundCurrency,
            processedItems: orderSelection.selectedItems.reduce((sum, item) => sum + item.quantity, 0)
          });

          totalRefundAmount += refundAmount;
          currency = refundCurrency;
          successfulReturns++;

          logger.info('Return processed successfully', {
            orderId: orderSelection.orderId,
            orderName: orderName,
            refundAmount: refundAmount,
            currency: refundCurrency
          });

        } else {
          results.push({
            orderId: orderSelection.orderId,
            orderName: orderName,
            success: false,
            message: returnResult.error || 'Failed to process return',
            error: returnResult.error,
            processedItems: 0
          });

          failedReturns++;

          logger.error('Return processing failed', {
            orderId: orderSelection.orderId,
            orderName: orderName,
            error: returnResult.error
          });
        }

        // Add a small delay between orders to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (orderError) {
        const errorMessage = orderError instanceof Error ? orderError.message : String(orderError);
        
        results.push({
          orderId: orderSelection.orderId,
          orderName: `Order ${orderSelection.orderId}`,
          success: false,
          message: `Processing error: ${errorMessage}`,
          error: errorMessage,
          processedItems: 0
        });

        failedReturns++;

        logger.error('Error processing individual order return', {
          orderId: orderSelection.orderId,
          error: errorMessage,
          selectedItems: orderSelection.selectedItems.length
        });
      }
    }

    // Calculate summary
    const totalProcessedItems = results.reduce((sum, result) => sum + (result.processedItems || 0), 0);
    const successRate = Math.round((successfulReturns / orderSelections.length) * 100);

    logger.info('Bulk return processing completed', {
      totalOrders: orderSelections.length,
      successfulReturns,
      failedReturns,
      totalRefundAmount,
      currency,
      totalProcessedItems,
      successRate
    });

    return {
      success: true,
      message: `Bulk return processing completed: ${successfulReturns} successful, ${failedReturns} failed`,
      results: results,
      summary: {
        totalOrders: orderSelections.length,
        successfulReturns,
        failedReturns,
        totalRefundAmount,
        currency,
        totalProcessedItems,
        successRate
      }
    };

  } catch (error) {
    logger.error('Error in bulk return processing', { 
      error: error instanceof Error ? error.message : String(error),
      orderSelections: params.orderSelections?.length || 0
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while processing bulk returns"
    };
  }
};

export const params = {
  orderSelections: {
    type: "array",
    required: true,
    items: {
      type: "object",
      properties: {
        orderId: { type: "string" },
        selectedItems: {
          type: "array",
          items: {
            type: "object",
            properties: {
              lineItemId: { type: "string" },
              quantity: { type: "number" }
            }
          }
        }
      }
    }
  },
  shopId: {
    type: "string",
    required: true
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
