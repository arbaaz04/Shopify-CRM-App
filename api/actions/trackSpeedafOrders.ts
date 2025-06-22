import { ActionOptions } from "gadget-server";
import crypto from 'crypto';

/**
 * DES Encryption Utility Class (copied from processSpeedafAPI.ts)
 */
class DesUtils {
  /**
   * Set vector
   */
  private static readonly DES_IV: Buffer = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]);

  /**
   * Parameter interface of encryption algorithm
   */
  private static iv: Buffer = DesUtils.DES_IV;

  private key: Buffer;
  private readonly DES: string = 'des-cbc';

  private constructor(secretKey: string) {
    const desKey = Buffer.from(secretKey, 'utf8');
    // Ensure the key is 8 bytes long for DES
    if (desKey.length < 8) {
      throw new Error('DES key must be at least 8 bytes long');
    }
    this.key = desKey.slice(0, 8); // DES requires an 8-byte key
  }

  /**
   * secretKey is issued by Speedaf secretKey
   */
  public static setSecretKey(secretKey: string): DesUtils {
    return new DesUtils(secretKey);
  }

  /**
   * Return the encrypted result after converting the original data into string
   */
  public encode(data: string): string {
    const cipher = crypto.createCipheriv(this.DES, this.key, DesUtils.iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  /**
   * Parse the encrypted result
   */
  public decode(data: string): string {
    const decipher = crypto.createDecipheriv(this.DES, this.key, DesUtils.iv);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

/**
 * Creates MD5 signature for Speedaf API requests (copied from processSpeedafAPI.ts)
 */
function createSpeedafSignature(timestamp: string, secretKey: string, data: string, logger?: any): string {
  try {
    if (logger) {
      logger.info('Creating signature', {
        timestampLength: timestamp.length,
        secretKeyLength: secretKey.length,
        dataLength: data.length
      });
    }

    // Create signature using MD5(timestamp + secretKey + data)
    const signatureInput = timestamp + secretKey + data;
    const signature = crypto.createHash('md5').update(signatureInput).digest('hex').toLowerCase();

    if (logger) {
      logger.info('Generated signature', {
        length: signature.length,
        firstChars: signature.substring(0, 8) + '...'
      });
    }

    return signature;
  } catch (error) {
    if (logger) {
      logger.error('Error creating signature', { error });
    }
    throw new Error(`Failed to create signature: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Interface for tracking request
 */
interface TrackingRequest {
  mailNoList: string[];
}

/**
 * Interface for tracking response
 */
interface TrackingResponse {
  mailNo: string;
  tracks: Array<{
    mailNo: string;
    action: string;
    subAction: string;
    actionName: string;
    message: string;
    msgEng: string;
    msgLoc: string;
    pictureUrl?: string;
    time: string;
    timezone: number;
  }>;
}

/**
 * Map Speedaf action codes to descriptions
 */
const SPEEDAF_ACTION_CODES: Record<string, string> = {
  '10': 'Ordered',
  '-10': 'Canceled',
  '150': 'Inbound',
  '181': 'Packaged',
  '190': 'Outbound',
  '402': 'Customs declaration',
  '220': 'Flight departed',
  '230': 'Flight landed',
  '360': 'In clearance',
  '401': 'Clearance exception',
  '370': 'Clearance completed',
  '1': 'Picked',
  '2': 'Departed',
  '3': 'Arrived',
  '4': 'In delivery',
  '5': 'Collected',
  '-710': 'Returning',
  '730': 'Returned',
  '18': 'Self collect',
  '16': 'Delivered by franchisee',
  // Additional codes that might be missing
  '-2': 'Delivery Exception',
  '-1': 'Failed Delivery',
  '0': 'Unknown Status',
  '6': 'Delivered',
  '7': 'Delivery Attempted',
  '8': 'Out for Delivery',
  '9': 'Delivery Failed',
  '11': 'Processing',
  '12': 'Shipped',
  '13': 'In Transit',
  '14': 'Delivery Scheduled',
  '15': 'Delivery Rescheduled'
};

/**
 * Interface for order with tracking info
 */
interface OrderWithTracking {
  id: string;
  name: string;
  trackingNumber: string;
  trackingStatus?: TrackingResponse;
  error?: string;
}

/**
 * Track Speedaf orders using their tracking API
 */
export const run = async ({ params, logger, api }: any) => {
  try {
    logger.info("trackSpeedafOrders action called");
    logger.info("Params received:", JSON.stringify(params, null, 2));
    logger.info("Param types:", {
      latestOrderName: typeof params.latestOrderName,
      orderCount: typeof params.orderCount,
      mode: typeof params.mode
    });

    // Extract parameters - support both new format (latestOrderName + orderCount) and old format (mode)
    const { latestOrderName, orderCount, mode } = params;

    let numOrdersToCheck: number;
    let startingOrderName: string;

    if (latestOrderName && orderCount) {
      // New format - use provided parameters
      numOrdersToCheck = parseInt(String(orderCount)) || 50;
      startingOrderName = latestOrderName;
      logger.info(`TRACKING ${numOrdersToCheck} ORDERS starting from ${startingOrderName} (new format)`);
    } else if (mode) {
      // Old format - get latest order ourselves and calculate proper starting point
      numOrdersToCheck = parseInt(String(mode)) || 10;
      logger.info(`TRACKING last ${numOrdersToCheck} ORDERS using old format - finding latest order first`);

      // Get the latest order to calculate starting point
      const latestOrder = await api.shopifyOrder.findFirst({
        select: { name: true },
        sort: [{ createdAt: "Descending" as any }]
      });

      if (!latestOrder?.name) {
        throw new Error("Could not find latest order to start tracking from");
      }

      // Calculate starting point for last N orders
      const latestOrderNumber = parseInt(latestOrder.name.replace(/\D/g, ''));
      const startingOrderNumber = Math.max(1, latestOrderNumber - numOrdersToCheck + 1);
      startingOrderName = `#${startingOrderNumber}`;

      logger.info(`Latest order: ${latestOrder.name} (${latestOrderNumber})`);
      logger.info(`Tracking last ${numOrdersToCheck} orders from: ${startingOrderName} to ${latestOrder.name}`);
    } else {
      throw new Error("Either (latestOrderName + orderCount) or mode parameter is required");
    }

    // Get shop and Speedaf config
    const shopResponse = await api.shopifyShop.findFirst();
    if (!shopResponse) {
      throw new Error("Shop not found");
    }

    const allConfigs = await api.speedafConfig.findMany();
    const speedafConfig = allConfigs.find((config: any) =>
      String(config.shopId) === String(shopResponse.id) ||
      (config.shop && String(config.shop.id) === String(shopResponse.id))
    );

    if (!speedafConfig) {
      throw new Error(`Speedaf configuration not found`);
    }

    const credentials = {
      appCode: speedafConfig.appCode,
      secretKey: speedafConfig.secretKey,
      customerCode: speedafConfig.customerCode
    };

    if (!credentials.appCode || !credentials.secretKey) {
      throw new Error("Speedaf credentials are incomplete");
    }

    // SEQUENTIAL ORDER CHECKING - Generate order names manually
    logger.info(`Generating ${numOrdersToCheck} order names starting from ${startingOrderName}`);

    // Extract numeric part from starting order name (e.g., "1502" from "#1502")
    const startingOrderNumber = parseInt(startingOrderName.replace(/\D/g, ''));
    if (!startingOrderNumber || startingOrderNumber <= 0) {
      throw new Error(`Invalid starting order name format: ${startingOrderName}`);
    }

    // Generate order names sequentially forward (including the starting order)
    const orderNamesToCheck: string[] = [];
    for (let i = 0; i < numOrdersToCheck; i++) {
      const orderNumber = startingOrderNumber + i;
      orderNamesToCheck.push(`#${orderNumber}`);
    }

    logger.info(`Generated order names: ${orderNamesToCheck.slice(0, 5).join(', ')}${orderNamesToCheck.length > 5 ? '...' : ''}`);

    // OPTIMIZED: Batch fetch orders and fulfillments for better performance
    logger.info(`Batch fetching orders and fulfillments for ${orderNamesToCheck.length} order names...`);

    // Batch fetch all orders by name in a single query
    const orders = await api.shopifyOrder.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true
      },
      filter: {
        name: { in: orderNamesToCheck }
      }
    });

    logger.info(`Found ${orders.length} orders out of ${orderNamesToCheck.length} requested`);

    if (orders.length === 0) {
      logger.info("No orders found for the requested order names");
      return {
        success: true,
        message: `No orders found in the ${numOrdersToCheck} orders starting from ${startingOrderName}`,
        orders: [],
        totalOrders: orderNamesToCheck.length,
        speedafOrders: 0
      };
    }

    // Batch fetch all fulfillments for found orders
    const orderIds = orders.map(order => order.id);
    const fulfillments = await api.shopifyFulfillment.findMany({
      select: {
        id: true,
        orderId: true,
        trackingNumbers: true
      },
      filter: {
        orderId: { in: orderIds }
      }
    });

    logger.info(`Found ${fulfillments.length} fulfillments for ${orders.length} orders`);

    // Build a map of orderId to fulfillments for faster lookup
    const fulfillmentsByOrderId = new Map<string, any[]>();
    for (const fulfillment of fulfillments) {
      if (!fulfillmentsByOrderId.has(fulfillment.orderId)) {
        fulfillmentsByOrderId.set(fulfillment.orderId, []);
      }
      fulfillmentsByOrderId.get(fulfillment.orderId)!.push(fulfillment);
    }

    // Find Speedaf orders (tracking numbers starting with "MA")
    const speedafOrders: Array<{
      id: string;
      name: string;
      trackingNumber: string;
      createdAt?: string;
    }> = [];

    for (const order of orders) {
      const orderFulfillments = fulfillmentsByOrderId.get(order.id) || [];

      // Check for Speedaf tracking numbers (starting with "MA")
      for (const fulfillment of orderFulfillments) {
        if (fulfillment.trackingNumbers && Array.isArray(fulfillment.trackingNumbers)) {
          for (const trackingNumber of fulfillment.trackingNumbers) {
            if (trackingNumber && typeof trackingNumber === 'string' && trackingNumber.startsWith('MA')) {
              // Avoid duplicates
              if (!speedafOrders.find(o => o.id === order.id)) {
                speedafOrders.push({
                  id: order.id,
                  name: order.name || `Order ${order.id}`,
                  trackingNumber: trackingNumber,
                  createdAt: order.createdAt
                });
                logger.info(`Found Speedaf order: ${order.name} with tracking: ${trackingNumber}`);
              }
            }
          }
        }
      }
    }

    logger.info(`Found ${speedafOrders.length} Speedaf orders out of ${orderNamesToCheck.length} checked orders`);

    if (speedafOrders.length === 0) {
      const endingOrderNumber = startingOrderNumber + numOrdersToCheck - 1;
      return {
        success: true,
        message: `No Speedaf orders found in the range ${startingOrderName} - #${endingOrderNumber}`,
        orders: [],
        totalOrders: orderNamesToCheck.length,
        speedafOrders: 0
      };
    }

    // Extract tracking numbers
    const trackingNumbers = speedafOrders.map(order => order.trackingNumber);

    // BATCH PROCESSING: Handle Speedaf API limit of 10 orders per request
    const BATCH_SIZE = 10;
    const batches: string[][] = [];

    // Split tracking numbers into batches of 10
    for (let i = 0; i < trackingNumbers.length; i += BATCH_SIZE) {
      batches.push(trackingNumbers.slice(i, i + BATCH_SIZE));
    }

    logger.info(`Processing ${trackingNumbers.length} tracking numbers in ${batches.length} batches of max ${BATCH_SIZE}`);

    // Process all batches and collect results
    let allTrackingData: TrackingResponse[] = [];
    const desUtils = DesUtils.setSecretKey(credentials.secretKey);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      logger.info(`Processing batch ${batchIndex + 1}/${batches.length} with ${batch.length} tracking numbers`);

      try {
        // Prepare tracking request for this batch
        const trackingRequest: TrackingRequest = {
          mailNoList: batch
        };

        // Generate timestamp and prepare data (same as order creation API)
        const timestamp = Date.now().toString();
        const dataString = JSON.stringify(trackingRequest);

        // Generate signature using the same method as order creation
        const signature = createSpeedafSignature(timestamp, credentials.secretKey, dataString, logger);

        // Prepare unencrypted JSON body according to Speedaf format
        const unencryptedBody = JSON.stringify({
          data: dataString,
          sign: signature
        });

        // Encrypt the entire body using DES (same as order creation API)
        const encryptedBody = desUtils.encode(unencryptedBody);

        // Build API URL using the same format as order creation
        const apiUrl = `https://apis.speedaf.com/open-api/express/track/query?appCode=${encodeURIComponent(credentials.appCode)}&timestamp=${encodeURIComponent(timestamp)}`;

        logger.info(`Making tracking API call for batch ${batchIndex + 1}`, {
          url: apiUrl,
          trackingCount: batch.length,
          appCode: credentials.appCode,
          timestamp
        });

        // Make the API request with text/plain content type (same as order creation API)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: encryptedBody
        });

        if (!response.ok) {
          throw new Error(`Speedaf API error for batch ${batchIndex + 1}: ${response.status} ${response.statusText}`);
        }

        // Get response as text first (same as order creation API)
        const responseText = await response.text();
        logger.info(`Received tracking API response for batch ${batchIndex + 1}`, {
          length: responseText.length,
          preview: responseText.substring(0, 50) + '...'
        });

        // Parse JSON response
        let rawTrackingData;
        try {
          rawTrackingData = JSON.parse(responseText);
          logger.info(`Parsed tracking API response JSON for batch ${batchIndex + 1}`, { success: rawTrackingData.success });
        } catch (parseError) {
          logger.error(`Failed to parse tracking response as JSON for batch ${batchIndex + 1}`, {
            error: parseError,
            responseText: responseText.substring(0, 200)
          });
          throw new Error(`Failed to parse tracking API response as JSON for batch ${batchIndex + 1}: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
        }

        // Handle the response (might be encrypted like order creation API)
        let batchTrackingData: TrackingResponse[] = [];

        if (rawTrackingData.success) {
          // Successfully processed by Speedaf - data might be encrypted
          let decryptedResponse;

          if (rawTrackingData.data) {
            try {
              // Try to decrypt the response data
              const decryptedData = desUtils.decode(rawTrackingData.data);
              logger.info(`Decrypted tracking response data for batch ${batchIndex + 1}`, {
                length: decryptedData.length,
                preview: decryptedData.substring(0, 50) + '...'
              });

              decryptedResponse = JSON.parse(decryptedData);
              logger.info(`Parsed decrypted tracking data for batch ${batchIndex + 1}`, {
                type: typeof decryptedResponse,
                isArray: Array.isArray(decryptedResponse)
              });

            } catch (decryptError) {
              logger.error(`Failed to decrypt or parse tracking response data for batch ${batchIndex + 1}`, { error: decryptError });
              // Try to use the raw data as-is
              decryptedResponse = rawTrackingData.data;
            }
          } else {
            // No data field, use the raw response
            decryptedResponse = rawTrackingData;
          }

          // Extract tracking data from the response
          if (Array.isArray(decryptedResponse)) {
            batchTrackingData = decryptedResponse;
          } else if (decryptedResponse && Array.isArray(decryptedResponse.data)) {
            batchTrackingData = decryptedResponse.data;
          } else if (decryptedResponse && typeof decryptedResponse === 'object') {
            // Try to find array in common property names
            const possibleArrays = ['data', 'result', 'results', 'items', 'orders', 'tracks'];
            for (const prop of possibleArrays) {
              if (decryptedResponse[prop] && Array.isArray(decryptedResponse[prop])) {
                batchTrackingData = decryptedResponse[prop];
                break;
              }
            }
          }

          logger.info(`Successfully processed ${batchTrackingData.length} tracking records from batch ${batchIndex + 1}`);

          // Add batch results to overall results
          allTrackingData = allTrackingData.concat(batchTrackingData);

        } else {
          // API returned an error for this batch
          const errorMessage = rawTrackingData.error?.message || rawTrackingData.message || "Unknown tracking API error";
          logger.error(`Speedaf tracking API returned error for batch ${batchIndex + 1}`, {
            error: rawTrackingData.error,
            message: errorMessage
          });

          // Continue with other batches instead of failing completely
          logger.warn(`Continuing with remaining batches despite error in batch ${batchIndex + 1}`);
        }

        // Add a small delay between batches to avoid rate limiting
        if (batchIndex < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }

      } catch (batchError) {
        logger.error(`Error processing batch ${batchIndex + 1}:`, {
          error: batchError instanceof Error ? batchError.message : String(batchError),
          batchSize: batch.length
        });

        // Continue with other batches instead of failing completely
        logger.warn(`Continuing with remaining batches despite error in batch ${batchIndex + 1}`);
      }
    }

    logger.info(`Completed all ${batches.length} batches. Total tracking records: ${allTrackingData.length}`);

    // Use the combined tracking data from all batches
    const trackingData = allTrackingData;

    // Log sample tracking data for debugging
    if (trackingData.length > 0) {
      logger.info(`Sample tracking record:`, {
        mailNo: trackingData[0].mailNo,
        tracksCount: trackingData[0].tracks?.length || 0,
        firstTrack: trackingData[0].tracks?.[0]
      });
    }

    // Combine order data with tracking information
    const ordersWithTrackingStatus: OrderWithTracking[] = speedafOrders.map(order => {
      let trackingInfo = undefined;
      let error = 'No tracking data found';

      if (Array.isArray(trackingData)) {
        trackingInfo = trackingData.find(track => track && track.mailNo === order.trackingNumber);

        if (trackingInfo) {
          // Enhance tracking info with action code descriptions
          if (trackingInfo.tracks && Array.isArray(trackingInfo.tracks)) {
            // Create a new enhanced tracking info object to avoid modifying read-only properties
            trackingInfo = {
              ...trackingInfo,
              tracks: trackingInfo.tracks.map(track => ({
                ...track,
                actionDescription: SPEEDAF_ACTION_CODES[track.action] || `Unknown (${track.action})`,
                actionName: track.actionName || SPEEDAF_ACTION_CODES[track.action] || `Action ${track.action}`
              }))
            };
          }

          logger.info(`Found tracking data for ${order.trackingNumber}:`, {
            mailNo: trackingInfo.mailNo,
            tracksCount: trackingInfo.tracks?.length || 0,
            latestAction: trackingInfo.tracks?.[0]?.action,
            latestActionDesc: SPEEDAF_ACTION_CODES[trackingInfo.tracks?.[0]?.action] || 'Unknown'
          });
        } else {
          error = `No tracking data found for tracking number: ${order.trackingNumber}`;
          logger.warn(`No tracking data found for order ${order.name} with tracking ${order.trackingNumber}`);
        }
      } else {
        error = 'Invalid tracking data format received from Speedaf API';
      }

      return {
        id: order.id,
        name: order.name,
        trackingNumber: order.trackingNumber,
        trackingStatus: trackingInfo,
        error: trackingInfo ? undefined : error
      };
    });

    const successfullyTracked = ordersWithTrackingStatus.filter(order => !order.error).length;

    return {
      success: true,
      message: `Found ${speedafOrders.length} Speedaf orders, successfully tracked ${successfullyTracked}`,
      orders: ordersWithTrackingStatus,
      totalOrders: orderNamesToCheck.length,
      speedafOrders: speedafOrders.length,
      successfullyTracked: successfullyTracked
    };
    
  } catch (error) {
    logger.error("Error in trackSpeedafOrders action:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      orders: [],
      totalOrders: 0,
      speedafOrders: 0
    };
  }
};

export const params = {
  latestOrderName: {
    type: "string",
    required: false
  },
  orderCount: {
    type: "number",
    required: false
  },
  mode: {
    type: "string",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};
