import { applyParams, save, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";
import { authenticateSendit } from "../../../utils/senditAuth";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

export const onSuccess: ActionOnSuccess = async ({ params, record, logger, api, connections }) => {
  try {
    // Check if this fulfillment has been cancelled and has Sendit tracking
    if (record.status === 'cancelled' && record.trackingCompany?.toLowerCase() === 'sendit') {
      logger.info("Detected cancelled Sendit fulfillment, attempting to delete from Sendit records", {
        fulfillmentId: record.id,
        orderId: record.orderId,
        status: record.status,
        trackingCompany: record.trackingCompany,
        trackingNumbers: record.trackingNumbers
      });

      // Get the order ID and shop ID
      const orderId = record.orderId;
      const shopId = record.shopId;

      if (orderId && shopId && record.trackingNumbers) {
        try {
          // Get Sendit configuration
          const senditConfig = await api.senditConfig.findFirst({
            filter: { shop: { id: { equals: shopId } } }
          });

          if (!senditConfig) {
            logger.warn("Sendit configuration not found for shop", { shopId });
            return;
          }

          // Authenticate with Sendit API
          const authResult = await authenticateSendit(
            {
              publicKey: senditConfig.publicKey,
              secretKey: senditConfig.secretKey
            },
            logger
          );

          if (!authResult.success || !authResult.token) {
            logger.error("Sendit authentication failed", { error: authResult.message });
            return;
          }

          const token = authResult.token;
          const trackingNumbers = Array.isArray(record.trackingNumbers) ? record.trackingNumbers : [record.trackingNumbers];
          
          // Delete each tracking number from Sendit
          for (const trackingCode of trackingNumbers) {
            if (trackingCode && typeof trackingCode === 'string') {
              try {
                logger.info("Deleting Sendit record", { trackingCode });

                const apiUrl = process.env.SENDIT_API_URL || 'https://app.sendit.ma/api/v1';
                const deleteUrl = `${apiUrl}/deliveries/${encodeURIComponent(trackingCode)}`;

                const response = await fetch(deleteUrl, {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': ''
                  }
                });

                const responseData = await response.json();

                if (response.ok && responseData.success) {
                  logger.info("Successfully deleted Sendit record", { 
                    trackingCode, 
                    message: responseData.message 
                  });
                  
                  // After successful Sendit deletion, delete the corresponding Google Sheets rows
                  try {
                    logger.info("Attempting to delete Google Sheets rows for tracking number", { trackingCode });
                    
                    // Initialize Google Sheets client
                    const { google } = require('googleapis');
                    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}";
                    let credentials;

                    try {
                      credentials = JSON.parse(serviceAccountKey);
                    } catch (e) {
                      throw new Error("Invalid Google service account key format");
                    }

                    if (credentials.client_email && credentials.private_key) {
                      const auth = new google.auth.JWT(
                        credentials.client_email,
                        undefined,
                        credentials.private_key,
                        ['https://www.googleapis.com/auth/spreadsheets']
                      );

                      const sheets = google.sheets({ version: 'v4', auth });

                      // Get the Google Sheets configuration
                      const sheetConfig = await api.googleSheetConfig.findFirst({
                        filter: { shop: { id: { equals: shopId } } }
                      });

                      if (sheetConfig && sheetConfig.spreadsheetId) {
                        const spreadsheetId = sheetConfig.spreadsheetId;
                        
                        // Get the Orders sheet
                        const spreadsheetInfo = await sheets.spreadsheets.get({
                          spreadsheetId,
                          fields: 'sheets.properties'
                        });

                        const ordersSheet = spreadsheetInfo.data.sheets?.find(
                          (sheet: any) => sheet.properties?.title === 'Orders'
                        );

                        if (ordersSheet) {
                          const ordersSheetId = ordersSheet.properties.sheetId;
                          
                          // Search for rows with this tracking number in column C
                          const trackingColumnResponse = await sheets.spreadsheets.values.get({
                            spreadsheetId,
                            range: 'Orders!C:C',
                          });

                          const trackingColumnValues = trackingColumnResponse.data.values || [];
                          const rowsToDelete: number[] = [];

                          logger.info(`Searching ${trackingColumnValues.length} rows in column C for tracking number: ${trackingCode}`);

                          // Find rows matching the tracking number
                          for (let i = 0; i < trackingColumnValues.length; i++) {
                            const cellValue = trackingColumnValues[i]?.[0];
                            if (cellValue && String(cellValue).trim() === trackingCode) {
                              rowsToDelete.push(i + 1); // +1 because sheets are 1-indexed
                            }
                          }

                          if (rowsToDelete.length > 0) {
                            // Sort in descending order to prevent index shifting
                            rowsToDelete.sort((a, b) => b - a);

                            // Delete rows
                            const deleteRequests = rowsToDelete.map(rowIndex => ({
                              deleteDimension: {
                                range: {
                                  sheetId: ordersSheetId,
                                  dimension: 'ROWS',
                                  startIndex: rowIndex - 1,
                                  endIndex: rowIndex
                                }
                              }
                            }));

                            await sheets.spreadsheets.batchUpdate({
                              spreadsheetId,
                              requestBody: {
                                requests: deleteRequests
                              }
                            });

                            logger.info("Successfully deleted Google Sheets rows for tracking number", {
                              trackingCode,
                              deletedRows: rowsToDelete.length
                            });
                          } else {
                            logger.info("No Google Sheets rows found for tracking number", { trackingCode });
                          }
                        } else {
                          logger.warn("Orders sheet not found in spreadsheet");
                        }
                      } else {
                        logger.warn("Google Sheets configuration not found for shop");
                      }
                    } else {
                      logger.warn("Google Sheets credentials not available");
                    }
                  } catch (sheetsError) {
                    logger.error("Error deleting Google Sheets rows for tracking number", {
                      trackingCode,
                      error: sheetsError instanceof Error ? sheetsError.message : String(sheetsError)
                    });
                  }
                } else {
                  logger.warn("Failed to delete Sendit record", { 
                    trackingCode, 
                    error: responseData.message || `HTTP ${response.status}`
                  });
                }
              } catch (error) {
                logger.error("Error deleting Sendit record", { 
                  trackingCode, 
                  error: error instanceof Error ? error.message : String(error)
                });
              }
            }
          }

        } catch (deleteError) {
          logger.error("Error in Sendit deletion process", {
            fulfillmentId: record.id,
            orderId,
            error: deleteError instanceof Error ? deleteError.message : String(deleteError)
          });
        }
      } else {
        logger.warn("Missing required data for cancelled Sendit fulfillment", {
          fulfillmentId: record.id,
          orderId,
          shopId,
          hasTrackingNumbers: !!record.trackingNumbers
        });
      }
    }
  } catch (error) {
    logger.error("Error in shopifyFulfillment onSuccess handler", {
      fulfillmentId: record.id,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const options: ActionOptions = { actionType: "update" };
