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

    logger.info('Successfully updated Google Sheets with "On Stock" status', {
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
        // If SKU is empty, fall back to matching by order name and line item position/count
        let rowMatches = false;
        
        if (returnedItemSKU && returnedItemSKU.trim()) {
          // Standard SKU matching when we have SKU information
          rowMatches = rowOrderName === orderName &&
                      returnedQuantity > 0 &&
                      rowSKU === returnedItemSKU;
        } else {
          // Fallback matching for cases where SKU is not available (zero-refund scenarios)
          // Match by order name only - this handles cases where SKU retrieval failed
          rowMatches = rowOrderName === orderName &&
                      returnedQuantity > 0 &&
                      rowStatus !== "On Stock"; // Only update rows that aren't already marked
          
          logger.info(`Using fallback matching (no SKU) for row ${i + 1}`, {
            orderName,
            rowOrderName,
            rowSKU,
            returnedItemSKU,
            returnedQuantity
          });
        }

        if (rowMatches) {
          // Always mark returned items as "On Stock" regardless of current status
          // This ensures it stays "On Stock" even if something else tries to change it
          if (rowStatus !== "On Stock") {
              // Update column L to "On Stock"
              updates.push({
                range: `${sheetName}!L${i + 1}`,
                values: [["On Stock"]]
              });

              // Update column C (index 2) to add C- prefix if not already present
              const currentTracking = row[2] || "";
              if (!currentTracking.startsWith("C-")) {
                updates.push({
                  range: `${sheetName}!C${i + 1}`,
                  values: [[`C-${currentTracking}`]]
                });
                logger.info(`Updated tracking code in column C for row ${i + 1}`, {
                  previousTracking: currentTracking,
                  newTracking: `C-${currentTracking}`,
                  orderName,
                  sku: rowSKU
                });
              }

              returnedQuantity--;

              logger.info(`Setting item status to "On Stock" for row ${i + 1}`, {
                orderName,
                sku: rowSKU,
                matchedWith: returnedItemSKU || "(fallback - no SKU)",
                matchType: returnedItemSKU && returnedItemSKU.trim() ? "SKU" : "fallback",
                remainingQuantity: returnedQuantity,
                previousStatus: rowStatus,
                newStatus: "On Stock",
                timestamp: new Date().toISOString(),
                action: "processOrderReturn"
              });
          } else {
            logger.info(`Row ${i + 1} already marked as "On Stock"`, {
              orderName,
              sku: rowSKU,
              currentStatus: rowStatus
            });
            returnedQuantity--; // Still count this as processed
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

      logger.info(`Updated ${updates.length} rows in ${sheetName} with "On Stock" status`);
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
  inventoryOnlyReturn?: boolean;
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
      skipRefund = false,
      inventoryOnlyReturn = false
    } = params;

    logger.info('Processing return for order', { 
      orderId, 
      lineItems: lineItems.length, 
      skipRefund, 
      inventoryOnlyReturn 
    });

    // Validate required parameters
    if (!orderId || !shopId || !lineItems || lineItems.length === 0) {
      return {
        success: false,
        error: "Missing required parameters: orderId, shopId, and lineItems are required"
      };
    }

    // First, calculate the refund to validate everything (unless skipping refund or doing inventory-only return)
    let calculationResult;
    if (!skipRefund && !inventoryOnlyReturn) {
      calculationResult = await api.calculateRefund({
        orderId,
        shopId,
        lineItems,
        refundShipping,
        reason
      });

      if (!calculationResult.success) {
        // If this is an insufficient refund amount error, return structured data for the frontend to handle
        if (calculationResult.error && calculationResult.error.includes('exceeds remaining refundable amount')) {
          // Extract amounts from error message
          const errorMatch = calculationResult.error.match(/Refund amount \(([0-9.]+)\) exceeds remaining refundable amount \(([0-9.]+)\)/);
          if (errorMatch) {
            return {
              success: false,
              error: calculationResult.error,
              errorType: 'INSUFFICIENT_REFUND_AMOUNT',
              orderName: calculationResult.calculation?.orderName || `Order ${orderId}`,
              currency: calculationResult.calculation?.currency || 'MAD',
              refundDetails: {
                requestedAmount: parseFloat(errorMatch[1]),
                availableAmount: parseFloat(errorMatch[2]),
                currency: calculationResult.calculation?.currency || 'MAD'
              }
            };
          }
        }
        return calculationResult;
      }
    } else if (inventoryOnlyReturn) {
      // For inventory-only returns, we need to calculate available refund amount but proceed with limited refund
      logger.info('Processing inventory-only return - calculating available refund amount', { orderId });
      
      const limitedCalculationResult = await api.calculateRefund({
        orderId,
        shopId,
        lineItems,
        refundShipping,
        reason
      });

      if (limitedCalculationResult.success) {
        calculationResult = limitedCalculationResult;
      } else {
        // Even if calculation fails due to insufficient funds, we can still process inventory-only return
        // by using the skipRefund approach with 0 refund amount
        logger.warn('Refund calculation failed for inventory-only return, processing with skipRefund approach', { 
          orderId, 
          error: limitedCalculationResult.error 
        });
        
        // Set calculationResult to null to trigger the skipRefund path below
        calculationResult = null;
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

    // Ensure we have a valid calculation result (except for skipRefund or failed inventory-only returns)
    if (!calculationResult || !calculationResult.calculation) {
      if (skipRefund || inventoryOnlyReturn) {
        logger.info('No calculation result for skipRefund or inventoryOnlyReturn - proceeding with sheets update only', { 
          orderId, 
          skipRefund, 
          inventoryOnlyReturn 
        });
        // We'll handle this case in the sheets update section below
      } else {
        logger.error('No valid calculation result available', { orderId, hasCalculationResult: !!calculationResult });
        return {
          success: false,
          error: "Failed to calculate refund or get order information"
        };
      }
    }

    const calculation = calculationResult?.calculation;

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
    let effectiveRefundAmount = 0;
    let refundNote = reason;
    let shouldSkipRefund = skipRefund;
    let currency = 'MAD'; // Default currency, will be updated from calculation if available
    let refundLineItems: any[] = []; // Will store line items for refund processing
    
    // Extract currency and lineItems from calculation if available
    if (calculation && calculation.currency) {
      currency = calculation.currency;
    }
    if (calculation && calculation.lineItems) {
      refundLineItems = calculation.lineItems;
    } else {
      // For inventory-only returns without calculation, we need to get product names from Shopify
      logger.info('Getting product information for line items from Shopify API', { orderId });
      
      try {
        // Get the shop to ensure we have access
        const shop = await api.shopifyShop.findFirst({
          filter: { id: { equals: shopId } }
        });

        if (shop) {
          // Use Shopify GraphQL API to get line item details
          const shopifyApi = await connections.shopify.forShopId(shopId);

          const orderQuery = `
            query GetOrderLineItems($id: ID!) {
              order(id: $id) {
                lineItems(first: 50) {
                  edges {
                    node {
                      id
                      name
                      sku
                      quantity
                      originalUnitPriceSet {
                        shopMoney {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          `;

          const result = await shopifyApi.graphql(orderQuery, {
            id: `gid://shopify/Order/${orderId}`
          });

          const orderData = result.data?.order || result.body?.data?.order;
          if (orderData && orderData.lineItems) {
            const shopifyLineItems = orderData.lineItems.edges.map((edge: any) => edge.node);
            
            // Map our requested line items to Shopify line items to get names and prices
            refundLineItems = lineItems.map(item => {
              const shopifyItem = shopifyLineItems.find((sItem: any) => 
                sItem.id === item.lineItemId || 
                sItem.id === `gid://shopify/LineItem/${item.lineItemId}`
              );
              
              return {
                lineItemId: item.lineItemId,
                quantity: item.quantity,
                name: shopifyItem?.name || `Unknown Item`,
                sku: shopifyItem?.sku || '',
                unitPrice: shopifyItem?.originalUnitPriceSet?.shopMoney?.amount ? parseFloat(shopifyItem.originalUnitPriceSet.shopMoney.amount) : 0,
                totalAmount: 0 // Will be calculated later
              };
            });

            logger.info('Successfully retrieved line item details from Shopify', {
              orderId,
              lineItemsCount: refundLineItems.length,
              itemsWithNames: refundLineItems.filter(item => item.name !== 'Unknown Item').length
            });
          } else {
            throw new Error('Could not retrieve order line items from Shopify');
          }
        } else {
          throw new Error('Shop not found');
        }
      } catch (error) {
        logger.warn('Failed to get product information from Shopify, using fallback', {
          orderId,
          error: error instanceof Error ? error.message : String(error)
        });
        
        // Create fallback line items from the original request
        refundLineItems = lineItems.map(item => ({
          lineItemId: item.lineItemId,
          quantity: item.quantity,
          name: `Line Item ${item.lineItemId}`,
          sku: '',
          unitPrice: 0,
          totalAmount: 0
        }));
      }
    }

    if (!shouldSkipRefund && !inventoryOnlyReturn) {
      // Normal refund processing
      if (!calculation) {
        return {
          success: false,
          error: "No calculation data available for refund processing"
        };
      }

      // For normal returns, process the full refund
      effectiveRefundAmount = calculation.totalRefundAmount;

      // Since shopify-api-node doesn't support REST, use fetch directly for REST API
      logger.info('Creating refund using direct REST API call', {
        orderId,
        refundAmount: effectiveRefundAmount,
        lineItemsCount: refundLineItems.length
      });
    } else if (inventoryOnlyReturn && calculation) {
      // For inventory-only returns with successful calculation, refund available amount
      effectiveRefundAmount = calculation.remainingRefundable > 0 ? calculation.remainingRefundable : 0;
      refundNote = `${reason} (Inventory-only return: refunded available amount of ${currency} ${effectiveRefundAmount.toFixed(2)})`;
      
      if (effectiveRefundAmount > 0) {
        logger.info('Processing inventory-only return with partial refund', {
          orderId,
          availableAmount: calculation.remainingRefundable,
          effectiveAmount: effectiveRefundAmount
        });

        // Process the partial refund
        logger.info('Creating partial refund for inventory-only return', {
          orderId,
          refundAmount: effectiveRefundAmount,
          lineItemsCount: refundLineItems.length
        });
      } else {
        logger.info('Processing inventory-only return with no refund (no available amount)', {
          orderId,
          availableAmount: calculation.remainingRefundable
        });
        // Skip refund processing but continue with inventory update
        shouldSkipRefund = true;
      }
    } else if (inventoryOnlyReturn && !calculation) {
      // For inventory-only returns without calculation, skip refund but update inventory
      logger.info('Processing inventory-only return without refund (no calculation available)', { orderId });
      shouldSkipRefund = true;
    }

    if (!shouldSkipRefund) {

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
          currency: currency,
          notify: notify,
          note: refundNote,
          refund_line_items: refundLineItems.map((item: any) => ({
            line_item_id: item.lineItemId.replace('gid://shopify/LineItem/', ''),
            quantity: item.quantity,
            restock_type: "return",
            location_id: primaryLocationId.replace('gid://shopify/Location/', '')
          })),
          transactions: [
            {
              parent_id: originalTransaction.id,
              amount: effectiveRefundAmount.toFixed(2),
              currency: currency,
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
        refundAmount: effectiveRefundAmount,
        originalRequestedAmount: calculation.totalRefundAmount,
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

        // If REST API doesn't return amount correctly, use our effective amount
        if (actualRefundAmount === 0 || isNaN(actualRefundAmount)) {
          actualRefundAmount = effectiveRefundAmount;
          logger.warn('Using effective amount as REST API response amount was invalid', {
            restApiAmount: createdRefund.amount,
            effectiveAmount: effectiveRefundAmount,
            originalCalculated: calculation.totalRefundAmount
          });
        }
      } catch (error) {
        // Fallback to effective amount
        actualRefundAmount = effectiveRefundAmount;
        logger.warn('Error parsing REST API refund amount, using effective amount', {
          error: error instanceof Error ? error.message : String(error),
          effectiveAmount: effectiveRefundAmount,
          originalCalculated: calculation.totalRefundAmount
        });
      }

      logger.info('Refund created - comparing amounts', {
        orderId,
        refundId: createdRefund.id,
        expectedAmount: calculation ? calculation.totalRefundAmount : effectiveRefundAmount,
        actualAmount: actualRefundAmount,
        difference: actualRefundAmount - (calculation ? calculation.totalRefundAmount : effectiveRefundAmount),
        currency: currency
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
          currency: currency,
          notify: false, // Don't notify for restock-only
          note: `${reason} (Payment Pending - Restock Only)`,
          refund_line_items: refundLineItems.map((item: any) => ({
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
      // For inventory-only returns without calculation, we need to get basic order info
      let orderName = calculation?.orderName;
      let returnLineItems = calculation?.lineItems;

      if (!orderName || !returnLineItems) {
        // Get basic order information for sheets update
        logger.info('Getting basic order info for sheets update (no calculation available)', { orderId });
        
        const order = await api.shopifyOrder.findFirst({
          filter: { id: { equals: orderId } }
        });

        orderName = order?.name || `Order ${orderId}`;
        
        // For proper Google Sheets update, we need to get SKU information from Shopify
        try {
          const shopifyApi = await connections.shopify.forShopId(shopId);

          const orderQuery = `
            query GetOrderLineItems($id: ID!) {
              order(id: $id) {
                lineItems(first: 50) {
                  edges {
                    node {
                      id
                      name
                      sku
                      variant {
                        id
                        sku
                      }
                    }
                  }
                }
              }
            }
          `;

          const result = await shopifyApi.graphql(orderQuery, {
            id: `gid://shopify/Order/${orderId}`
          });

          const orderData = result.data?.order || result.body?.data?.order;
          const shopifyLineItems = orderData?.lineItems?.edges?.map((edge: any) => edge.node) || [];
          
          // Create line items with proper SKU information for sheets update
          returnLineItems = lineItems.map(refundItem => {
            const shopifyItem = shopifyLineItems.find((sItem: any) => 
              sItem.id === refundItem.lineItemId || 
              sItem.id === `gid://shopify/LineItem/${refundItem.lineItemId}` ||
              sItem.id.endsWith(refundItem.lineItemId)
            );
            
            return {
              lineItemId: refundItem.lineItemId,
              name: shopifyItem?.name || 'Item',
              quantity: refundItem.quantity,
              sku: shopifyItem?.sku || shopifyItem?.variant?.sku || ''
            };
          });

          logger.info('Successfully retrieved SKU information for zero-refund return', {
            orderId,
            lineItemsCount: returnLineItems.length,
            itemsWithSKU: returnLineItems.filter((item: any) => item.sku).length
          });

        } catch (error) {
          logger.warn('Failed to get SKU information from Shopify for zero-refund return, using fallback', {
            orderId,
            error: error instanceof Error ? error.message : String(error)
          });
          
          // Create fallback line items from the original request
          returnLineItems = lineItems.map(refundItem => ({
            lineItemId: refundItem.lineItemId,
            name: 'Item',
            quantity: refundItem.quantity,
            sku: '' // Fallback when SKU retrieval fails
          }));
        }
      }

      logger.info('Starting Google Sheets update with "On Stock" status', {
        orderName,
        lineItems: returnLineItems.map((item: any) => ({
          lineItemId: item.lineItemId,
          name: item.name,
          quantity: item.quantity,
          sku: item.sku
        })),
        shopId,
        timestamp: new Date().toISOString()
      });

      await updateGoogleSheetsWithReturn(
        orderName,
        returnLineItems,
        shopId,
        api,
        logger
      );

      logger.info('Successfully completed Google Sheets update with "On Stock" status', {
        orderName,
        returnedItems: returnLineItems.length,
        timestamp: new Date().toISOString()
      });
    } catch (sheetsError) {
      logger.error('Failed to update Google Sheets with return information', {
        error: sheetsError instanceof Error ? sheetsError.message : String(sheetsError),
        stack: sheetsError instanceof Error ? sheetsError.stack : undefined,
        orderName: calculation?.orderName || `Order ${orderId}`,
        shopId
      });
      // Don't fail the entire return process if sheets update fails
    }

    // Determine final currency and order name
    const finalCurrency = calculation?.currency || 'MAD';
    const finalOrderName = calculation?.orderName || `#${orderId}`;

    return {
      success: true,
      message: shouldSkipRefund
        ? `Return processed successfully. Items have been automatically restocked to inventory.`
        : `Refund of ${actualRefundAmount.toFixed(2)} ${finalCurrency} processed successfully. Items have been automatically restocked to inventory.`,
      isInventoryOnly: inventoryOnlyReturn || (shouldSkipRefund && actualRefundAmount === 0),
      refund: createdRefund ? {
        id: createdRefund.id,
        orderId,
        orderName: finalOrderName,
        amount: actualRefundAmount,
        currency: finalCurrency,
        lineItems: refundLineItems.map((item: any) => ({
          name: item.name || 'Unknown Item',
          sku: item.sku || '',
          quantity: item.quantity,
          price: item.unitPrice || 0,
          lineItemId: item.lineItemId
        })),
        reason,
        createdAt: createdRefund.created_at || new Date().toISOString()
      } : {
        id: null,
        orderId,
        orderName: finalOrderName,
        amount: 0,
        currency: finalCurrency,
        lineItems: calculation?.lineItems?.map((item: any) => ({
          id: null,
          lineItemId: item.lineItemId,
          quantity: item.quantity
        })) || lineItems.map(item => ({
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
  },
  inventoryOnlyReturn: {
    type: "boolean",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
