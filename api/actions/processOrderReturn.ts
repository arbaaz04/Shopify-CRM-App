/**
 * Process order returns and refunds
 */

import { ActionOptions } from "gadget-server";
import * as testLocationQuery from "./testLocationQuery";

/**
 * Initialize Google Sheets client (using same method as writeBatchOrdersToSheets)
 */
async function initGoogleSheetsClient(): Promise<any> {
  try {
    // Use require instead of dynamic import for compatibility
    const { google } = require('googleapis');

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
    if (serviceAccountKey === "{}") {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set");
    }

    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (parseError) {
      throw new Error(`Failed to parse Google service account key: ${parseError}`);
    }

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Google service account credentials missing required fields (client_email or private_key)");
    }

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    throw new Error(`Failed to initialize Google Sheets client: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get sheet configuration for the shop
 */
async function getSheetConfig(shopId: string, api: any, logger: any) {
  try {
    logger.info('Looking up Google Sheet configuration', { shopId });

    const sheetConfig = await api.googleSheetConfig.findFirst({
      filter: { shopId: { equals: shopId } }
    });

    logger.info('Sheet config lookup result', {
      configFound: !!sheetConfig,
      shopId: sheetConfig?.shopId,
      hasSpreadsheetId: !!sheetConfig?.spreadsheetId,
      spreadsheetId: sheetConfig?.spreadsheetId
    });

    if (!sheetConfig) {
      throw new Error(`Google Sheet configuration not found for shop ${shopId}`);
    }

    return sheetConfig;
  } catch (error) {
    logger.error('Error in getSheetConfig', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      shopId
    });
    throw new Error(`Failed to get sheet configuration: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Update Google Sheets with return information
 */
async function updateGoogleSheetsWithReturn(
  orderName: string,
  returnedLineItems: any[],
  shopId: string,
  api: any,
  logger: any
): Promise<void> {
  try {
    logger.info('Step 1: Initializing Google Sheets client');
    // Initialize Google Sheets client
    const sheets = await initGoogleSheetsClient();
    logger.info('Step 1: Google Sheets client initialized successfully');

    logger.info('Step 2: Getting sheet configuration', { shopId });
    // Get sheet configuration
    const sheetConfig = await getSheetConfig(shopId, api, logger);
    logger.info('Step 2: Sheet configuration retrieved', {
      spreadsheetId: sheetConfig.spreadsheetId
    });

    // Search only in "Orders" sheet (Pending Orders sheet was deleted)
    const sheetNames = ["Orders"];

    for (const sheetName of sheetNames) {
      logger.info(`Step 3: Processing sheet ${sheetName}`);
      try {
        await updateReturnInSheet(
          sheets,
          sheetConfig.spreadsheetId,
          sheetName,
          orderName,
          returnedLineItems,
          logger
        );
        logger.info(`Step 3: Successfully processed sheet ${sheetName}`);
      } catch (sheetError) {
        logger.error(`Step 3: Error processing sheet ${sheetName}`, {
          error: sheetError instanceof Error ? sheetError.message : String(sheetError),
          stack: sheetError instanceof Error ? sheetError.stack : undefined,
          sheetName
        });
        // Continue with other sheets even if one fails
      }
    }

    logger.info('Successfully updated Google Sheets with return information', {
      orderName,
      returnedItems: returnedLineItems.length
    });

  } catch (error) {
    logger.error('Error updating Google Sheets with return information', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      orderName,
      returnedLineItems: returnedLineItems.length,
      shopId
    });
    throw error;
  }
}

/**
 * Update return status in a specific sheet
 */
async function updateReturnInSheet(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  orderName: string,
  returnedLineItems: any[],
  logger: any
): Promise<void> {
  try {
    logger.info(`Searching for order ${orderName} in sheet ${sheetName}`, {
      returnedLineItems: returnedLineItems.map(item => ({
        lineItemId: item.lineItemId,
        name: item.name,
        sku: item.sku, // This is what we'll match against Column E
        quantity: item.quantity
      }))
    });

    // Get all data from the sheet to find matching entries
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      logger.info(`No data found in sheet ${sheetName}`);
      return;
    }

    logger.info(`Found ${rows.length} rows in sheet ${sheetName}`);

    // Log a few sample rows to understand the data structure
    if (rows.length > 0) {
      logger.info(`Sample row structure:`, {
        row0: rows[0],
        columnE: rows[0]?.[4], // Column E
        columnL: rows[0]?.[11], // Column L
        columnZ: rows[0]?.[25] // Column Z
      });
    }

    // Find rows that match the order name (column Z) and track returns
    const updates = [];

    for (const returnedItem of returnedLineItems) {
      let returnedQuantity = returnedItem.quantity;

      // Find matching rows for this line item
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowOrderName = row[25]; // Column Z (0-indexed: 25)
        const rowSKU = row[4]; // Column E (0-indexed: 4)
        const rowStatus = row[11]; // Column L (0-indexed: 11)

        // Match by SKU (Column E contains SKUs like "20320-BabyJoli-Minnie | 12m")
        const returnedItemSKU = returnedItem.sku; // This comes from calculateRefund.ts

        // Check if this row matches our order and SKU
        const rowMatches = rowOrderName === orderName &&
                          returnedQuantity > 0 &&
                          rowSKU === returnedItemSKU;

        if (rowMatches) {
          // If this row doesn't already have "Return", mark it
          if (rowStatus !== "Return") {
            updates.push({
              range: `${sheetName}!L${i + 1}`, // Column L, 1-indexed row
              values: [["On Stock"]]
            });

            returnedQuantity--;

            logger.info(`Marking return for row ${i + 1}`, {
              orderName,
              sku: rowSKU,
              matchedWith: returnedItemSKU,
              remainingQuantity: returnedQuantity
            });
          } else {
            logger.info(`Row ${i + 1} already marked as Return`, {
              orderName,
              sku: rowSKU
            });
          }
        }
      }
    }

    // Apply all updates in a batch
    if (updates.length > 0) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: "USER_ENTERED",
          data: updates
        }
      });

      logger.info(`Updated ${updates.length} rows in ${sheetName} with return status`);
    } else {
      logger.info(`No updates needed in ${sheetName} for order ${orderName}`);
    }

  } catch (error) {
    logger.error(`Error updating returns in sheet ${sheetName}`, {
      error: error instanceof Error ? error.message : String(error),
      orderName,
      sheetName
    });
    throw error;
  }
}

interface RefundLineItem {
  lineItemId: string;
  quantity: number;
  reason?: string;
}

interface ActionParams {
  orderId: string;
  shopId: string;
  lineItems: RefundLineItem[];
  refundShipping?: boolean;
  reason?: string;
  notify?: boolean;
  skipRefund?: boolean;
}

interface ActionContext {
  params: ActionParams;
  api: any;
  logger: any;
  connections: any;
}

export const run = async ({ params, api, logger, connections }: ActionContext) => {
  try {
    const {
      orderId,
      shopId,
      lineItems,
      refundShipping = false,
      reason = "Customer return",
      notify = true,
      skipRefund = false
    } = params;

    logger.info('Processing return for order', { orderId, lineItems: lineItems.length, skipRefund });

    // Validate required parameters
    if (!orderId || !shopId || !lineItems || lineItems.length === 0) {
      return {
        success: false,
        error: "Missing required parameters: orderId, shopId, and lineItems are required"
      };
    }

    // First, calculate the refund to validate everything (unless skipping refund)
    let calculationResult;
    if (!skipRefund) {
      calculationResult = await api.calculateRefund({
        orderId,
        shopId,
        lineItems,
        refundShipping,
        reason
      });

      if (!calculationResult.success) {
        return calculationResult;
      }
    } else {
      // For skip refund, we still need basic order info for sheets update
      // We need to get the actual order data to get SKUs and order name
      logger.info('Skipping refund calculation for payment pending order, but getting order data for sheets update', { orderId });

      // Get the shop to ensure we have access
      const shop = await api.shopifyShop.findFirst({
        filter: { id: { equals: shopId } }
      });

      if (!shop) {
        return {
          success: false,
          error: "Shop not found or access denied"
        };
      }

      // Use Shopify GraphQL API to get order data
      const shopifyApi = await connections.shopify.forShopId(shopId);

      // Get order data using GraphQL to get SKUs and order name
      const orderQuery = `
        query GetOrder($id: ID!) {
          order(id: $id) {
            id
            name
            lineItems(first: 50) {
              edges {
                node {
                  id
                  name
                  quantity
                  sku
                  variant {
                    id
                    sku
                    price
                  }
                }
              }
            }
          }
        }
      `;

      const orderResponse = await shopifyApi.graphql(orderQuery, {
        id: `gid://shopify/Order/${orderId}`
      });

      if (!orderResponse || !orderResponse.order) {
        logger.error('Failed to get order data for payment pending order', { orderId });
        return {
          success: false,
          error: "Failed to get order data for payment pending order"
        };
      }

      const orderData = orderResponse.order;
      const orderLineItems = orderData.lineItems.edges.map((edge: any) => edge.node);

      // Create calculation result with actual order data
      const calculationLineItems = lineItems.map(refundItem => {
        const orderLineItem = orderLineItems.find((item: any) =>
          item.id === `gid://shopify/LineItem/${refundItem.lineItemId}` ||
          item.id === refundItem.lineItemId
        );

        return {
          lineItemId: refundItem.lineItemId,
          quantity: refundItem.quantity,
          name: orderLineItem?.name || 'Returned Item',
          sku: orderLineItem?.sku || orderLineItem?.variant?.sku || '',
          unitPrice: 0,
          totalPrice: 0
        };
      });

      calculationResult = {
        success: true,
        calculation: {
          orderId,
          orderName: orderData.name,
          currency: 'MAD', // Default currency for payment pending
          lineItems: calculationLineItems,
          totalRefundAmount: 0,
          orderTotal: 0,
          existingRefunds: 0,
          remainingRefundable: 0
        }
      };

      logger.info('Created calculation result for payment pending order', {
        orderId,
        orderName: orderData.name,
        lineItemsCount: calculationLineItems.length,
        lineItemsWithSKU: calculationLineItems.filter(item => item.sku).length
      });
    }

    const calculation = calculationResult.calculation;

    // Use Shopify GraphQL API to create the refund
    const shopifyApi = await connections.shopify.forShopId(shopId);

    // Get location information using the exact same approach as testLocationQuery.ts
    logger.info('Getting location from order fulfillment data', { orderId, shopId });

    let primaryLocationId = null;

    try {
      // Call the testLocationQuery action directly to get the location ID
      primaryLocationId = await testLocationQuery.run({
        params: { orderId, shopId },
        connections,
        logger
      });

      if (primaryLocationId) {
        logger.info('Successfully found location using testLocationQuery action', {
          locationId: primaryLocationId,
          orderId,
          shopId
        });
      } else {
        logger.warn('No location found using testLocationQuery action', {
          orderId,
          shopId
        });
      }

    } catch (error) {
      logger.error('Error getting location from testLocationQuery action', {
        error: error instanceof Error ? error.message : String(error),
        orderId,
        shopId
      });
    }

    // Require location for processing (no NO_RESTOCK option)
    if (!primaryLocationId) {
      logger.error('No location found for restocking - cannot process return', {
        orderId,
        shopId
      });
      return {
        success: false,
        error: "Cannot process return: No location found for restocking. Please ensure the order has fulfillment location data."
      };
    }

    logger.info('Will use location for automatic restocking', {
      locationId: primaryLocationId,
      orderId,
      shopId
    });

    let createdRefund = null;
    let actualRefundAmount = 0;

    if (!skipRefund) {
      // Since shopify-api-node doesn't support REST, use fetch directly for REST API
      logger.info('Creating refund using direct REST API call', {
        orderId,
        refundAmount: calculation.totalRefundAmount,
        lineItemsCount: calculation.lineItems.length
      });

      // Get the access token from the shopify connection
      const accessToken = shopifyApi.accessToken || shopifyApi.options?.accessToken;
      const shopDomain = shopifyApi.shopName || shopifyApi.options?.shopName;

      if (!accessToken || !shopDomain) {
        logger.error('Missing Shopify credentials for REST API call', {
          hasAccessToken: !!accessToken,
          hasShopDomain: !!shopDomain
        });
        return {
          success: false,
          error: "Missing Shopify credentials for refund processing"
        };
      }

      // Get the original payment transaction for the refund
      logger.info('Getting original payment transaction for refund', { orderId });

      const orderResponse = await fetch(`https://${shopDomain}/admin/api/2024-04/orders/${orderId}/transactions.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        logger.error('Failed to get order transactions', {
          status: orderResponse.status,
          errorText
        });
        return {
          success: false,
          error: `Failed to get order transactions: ${orderResponse.status} - ${errorText}`
        };
      }

      const orderTransactions = await orderResponse.json();
      const originalTransaction = orderTransactions.transactions?.find((t: any) =>
        (t.kind === 'sale' || t.kind === 'capture') && t.status === 'success'
      );

      if (!originalTransaction) {
        logger.error('No original payment transaction found for refund', {
          orderId,
          availableTransactions: orderTransactions.transactions?.map((t: any) => ({
            id: t.id,
            kind: t.kind,
            status: t.status
          })) || []
        });
        return {
          success: false,
          error: "Cannot process refund: No original payment transaction found"
        };
      }

      // Prepare REST API refund data with parent transaction
      const refundPayload: any = {
        refund: {
          currency: calculation.currency,
          notify: notify,
          note: reason,
          refund_line_items: calculation.lineItems.map((item: any) => ({
            line_item_id: item.lineItemId.replace('gid://shopify/LineItem/', ''),
            quantity: item.quantity,
            restock_type: "return",
            location_id: primaryLocationId.replace('gid://shopify/Location/', '')
          })),
          transactions: [
            {
              parent_id: originalTransaction.id,
              amount: calculation.totalRefundAmount.toFixed(2),
              currency: calculation.currency,
              kind: "refund",
              gateway: originalTransaction.gateway
            }
          ]
        }
      };

      // Add shipping refund if requested
      if (refundShipping && calculation.shippingRefund && calculation.shippingRefund.amount > 0) {
        refundPayload.refund.shipping = {
          full_refund: true
        };
      }

      logger.info('Making direct REST API call to Shopify', {
        orderId,
        shopDomain,
        refundAmount: calculation.totalRefundAmount,
        payload: JSON.stringify(refundPayload, null, 2)
      });

      // Make direct REST API call
      const response = await fetch(`https://${shopDomain}/admin/api/2024-04/orders/${orderId}/refunds.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify(refundPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('REST API refund failed', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        return {
          success: false,
          error: `Shopify API error: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();

      logger.info('REST API refund response received', {
        hasResult: !!result,
        hasRefund: !!result?.refund,
        resultKeys: result ? Object.keys(result) : [],
        fullResponse: JSON.stringify(result, null, 2)
      });

      // Check for REST API errors
      if (!result) {
        return {
          success: false,
          error: "No REST API response received for refund creation"
        };
      }

      if (!result.refund) {
        logger.error('No refund returned from Shopify REST API', {
          result: JSON.stringify(result, null, 2),
          orderId
        });
        return {
          success: false,
          error: "Failed to create refund - no refund data returned from Shopify"
        };
      }

      // REST API returns the refund wrapped in a refund property
      createdRefund = result.refund;

      // Get the actual refund amount from REST API response
      try {
        if (createdRefund.amount) {
          actualRefundAmount = parseFloat(createdRefund.amount);
        }

        // If REST API doesn't return amount correctly, use our calculated amount
        if (actualRefundAmount === 0 || isNaN(actualRefundAmount)) {
          actualRefundAmount = calculation.totalRefundAmount;
          logger.warn('Using calculated amount as REST API response amount was invalid', {
            restApiAmount: createdRefund.amount,
            calculatedAmount: calculation.totalRefundAmount
          });
        }
      } catch (error) {
        // Fallback to calculated amount
        actualRefundAmount = calculation.totalRefundAmount;
        logger.warn('Error parsing REST API refund amount, using calculated amount', {
          error: error instanceof Error ? error.message : String(error),
          calculatedAmount: calculation.totalRefundAmount
        });
      }

      logger.info('Refund created - comparing amounts', {
        orderId,
        refundId: createdRefund.id,
        expectedAmount: calculation.totalRefundAmount,
        actualAmount: actualRefundAmount,
        difference: actualRefundAmount - calculation.totalRefundAmount,
        currency: calculation.currency
      });
    } else {
      // For payment pending orders, we still need to restock items but without monetary refund
      logger.info('Processing restock-only for payment pending order', { orderId });

      // Get the access token from the shopify connection for restocking
      const accessToken = shopifyApi.accessToken || shopifyApi.options?.accessToken;
      const shopDomain = shopifyApi.shopName || shopifyApi.options?.shopName;

      if (!accessToken || !shopDomain) {
        logger.error('Missing Shopify credentials for restock processing', {
          hasAccessToken: !!accessToken,
          hasShopDomain: !!shopDomain
        });
        return {
          success: false,
          error: "Missing Shopify credentials for restock processing"
        };
      }

      // Create a restock-only refund (no monetary refund, just restocking)
      const restockPayload: any = {
        refund: {
          currency: calculation.currency,
          notify: false, // Don't notify for restock-only
          note: `${reason} (Payment Pending - Restock Only)`,
          refund_line_items: calculation.lineItems.map((item: any) => ({
            line_item_id: item.lineItemId.replace('gid://shopify/LineItem/', ''),
            quantity: item.quantity,
            restock_type: "return",
            location_id: primaryLocationId.replace('gid://shopify/Location/', '')
          })),
          // No transactions array for restock-only
        }
      };

      logger.info('Making restock-only REST API call to Shopify', {
        orderId,
        shopDomain,
        payload: JSON.stringify(restockPayload, null, 2)
      });

      // Make direct REST API call for restock-only
      const response = await fetch(`https://${shopDomain}/admin/api/2024-04/orders/${orderId}/refunds.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify(restockPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('REST API restock failed', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        return {
          success: false,
          error: `Shopify restock API error: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();
      logger.info('REST API restock response received', {
        hasResult: !!result,
        hasRefund: !!result?.refund,
        resultKeys: result ? Object.keys(result) : []
      });

      if (result && result.refund) {
        createdRefund = result.refund;
      }

      actualRefundAmount = 0; // No monetary refund for payment pending
      logger.info('Restock completed for payment pending order', { orderId });
    }

    // Update Google Sheets with return information
    try {
      logger.info('Starting Google Sheets update', {
        orderName: calculation.orderName,
        lineItems: calculation.lineItems.map((item: any) => ({
          lineItemId: item.lineItemId,
          name: item.name,
          quantity: item.quantity
        })),
        shopId
      });

      await updateGoogleSheetsWithReturn(
        calculation.orderName,
        calculation.lineItems,
        shopId,
        api,
        logger
      );
      logger.info('Successfully updated Google Sheets with return information', {
        orderName: calculation.orderName,
        returnedItems: calculation.lineItems.length
      });
    } catch (sheetsError) {
      logger.error('Failed to update Google Sheets with return information', {
        error: sheetsError instanceof Error ? sheetsError.message : String(sheetsError),
        stack: sheetsError instanceof Error ? sheetsError.stack : undefined,
        orderName: calculation.orderName,
        shopId
      });
      // Don't fail the entire return process if sheets update fails
    }

    return {
      success: true,
      message: skipRefund
        ? `Return processed successfully without refund (payment pending). Items have been automatically restocked to inventory.`
        : `Refund of ${actualRefundAmount.toFixed(2)} ${calculation.currency} processed successfully. Items have been automatically restocked to inventory.`,
      refund: createdRefund ? {
        id: createdRefund.id,
        orderId,
        orderName: calculation.orderName,
        amount: actualRefundAmount,
        currency: calculation.currency,
        lineItems: (createdRefund.refund_line_items || []).map((item: any) => ({
          id: item.id,
          lineItemId: item.line_item_id,
          quantity: item.quantity
        })),
        reason,
        createdAt: createdRefund.created_at || new Date().toISOString()
      } : {
        id: null,
        orderId,
        orderName: calculation.orderName,
        amount: 0,
        currency: calculation.currency,
        lineItems: calculation.lineItems.map((item: any) => ({
          id: null,
          lineItemId: item.lineItemId,
          quantity: item.quantity
        })),
        reason,
        createdAt: new Date().toISOString()
      }
    };

  } catch (error) {
    logger.error('Error processing return', { 
      error: error instanceof Error ? error.message : String(error),
      orderId: params.orderId 
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while processing the return"
    };
  }
};

export const params = {
  orderId: {
    type: "string",
    required: true
  },
  shopId: {
    type: "string",
    required: true
  },
  lineItems: {
    type: "array",
    required: true,
    items: {
      type: "object",
      properties: {
        lineItemId: { type: "string" },
        quantity: { type: "number" },
        reason: { type: "string" }
      }
    }
  },
  refundShipping: {
    type: "boolean",
    required: false
  },
  reason: {
    type: "string",
    required: false
  },
  notify: {
    type: "boolean",
    required: false
  },
  skipRefund: {
    type: "boolean",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
