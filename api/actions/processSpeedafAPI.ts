/**
 * Speedaf API Communication Action
 * Handles all Speedaf API calls, including encryption/decryption and signature generation
 */

import crypto from "crypto"; // This works on the server side
import { ActionOptions } from "gadget-server";

// This is an exact conversion of the Java DES implementation provided by Speedaf
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

  // base64 Encryption method
  public static encodeBase64(bytes: Buffer): string {
    return bytes.toString('base64');
  }

  // base64 Decryption method
  public static decodeBase64(base64String: string): Buffer {
    return Buffer.from(base64String, 'base64');
  }
}

// Common interfaces for the action
interface SpeedafConfig {
  id: string;
  appCode: string;
  secretKey: string;
  customerCode: string;
  apiEndpoint?: string;
  [key: string]: any;
}

interface ApiInstance {
  speedafConfig: {
    findFirst: (options: any) => Promise<SpeedafConfig | null>;
    findMany: () => Promise<SpeedafConfig[]>;
    [key: string]: any;
  };
  [key: string]: any;
}

interface Logger {
  info: (message: string, data?: any) => void;
  error: (message: string, data?: any) => void;
  [key: string]: any;
}

interface ActionParams {
  shopId: string;
  requestData: any;
  testMode?: boolean;
}

// Creates MD5 signature for Speedaf API requests
function createSpeedafSignature(timestamp: string, secretKey: string, data: string, logger?: Logger): string {
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
      logger.error("Error creating Speedaf signature:", error);
    } else {
      console.error("Error creating Speedaf signature:", error);
    }
    throw new Error(`Failed to create signature: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Encrypts data using DES-CBC with PKCS5Padding for Speedaf API
function encryptSpeedafData(data: string, secretKey: string, logger?: Logger): string {
  try {
    if (logger) {
      logger.info('Encrypting with DesUtils', { 
        keyLength: secretKey.length,
        inputDataLength: data.length
      });
    }
    
    // Create the DES utility with the given secret key
    const desUtils = DesUtils.setSecretKey(secretKey);
    
    // Encrypt the data
    const encrypted = desUtils.encode(data);
    
    if (logger) {
      logger.info('DES encryption completed', { 
        inputLength: data.length,
        outputLength: encrypted.length,
        outputPreview: encrypted.substring(0, 20) + '...'
      });
    }
    
    return encrypted;
  } catch (error) {
    if (logger) {
      logger.error("Speedaf encryption error:", error);
    } else {
      console.error("Speedaf encryption error:", error);
    }
    throw new Error(`Failed to encrypt data: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Decrypts DES encrypted data from Speedaf API
function decryptSpeedafData(encryptedData: string, secretKey: string, logger?: Logger): string {
  try {
    if (logger) {
      logger.info('Decrypting with DesUtils', { 
        keyLength: secretKey.length,
        encryptedDataLength: encryptedData.length
      });
    }
    
    // Create the DES utility with the given secret key
    const desUtils = DesUtils.setSecretKey(secretKey);
    
    // Decrypt the data
    const decrypted = desUtils.decode(encryptedData);
    
    if (logger) {
      logger.info('DES decryption completed', {
        inputLength: encryptedData.length,
        outputLength: decrypted.length,
        outputPreview: decrypted.substring(0, 20) + (decrypted.length > 20 ? '...' : '')
      });
    }
    
    return decrypted;
  } catch (error) {
    if (logger) {
      logger.error("Speedaf decryption error:", error);
    } else {
      console.error("Speedaf decryption error:", error);
    }
    throw new Error(`Failed to decrypt data from Speedaf API: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Define the action run type to match Gadget's expected format
type ActionRun = (context: { 
  params: { 
    shopId: string;
    requestData: Record<string, any>;
    testMode?: boolean;
  },
  api: any, 
  logger: any
}) => Promise<any>;

/**
 * Process Speedaf API requests
 * This function handles encryption, signing, and API communication with the Speedaf API
 */
export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    logger.info('Processing Speedaf API request', {
      hasShopId: !!params.shopId,
      hasRequestData: !!params.requestData,
      testMode: !!params.testMode
    });
    
    // Validate required parameters
    if (!params.shopId) {
      throw new Error("shopId is required");
    }
    
    if (!params.requestData) {
      throw new Error("requestData is required");
    }
    
    // Ensure shopId is properly formatted (digits only)
    const cleanShopId = String(params.shopId).replace(/\D/g, '');
    logger.info('Using clean shopId', { original: params.shopId, cleaned: cleanShopId });
    
    // Find the Speedaf config for this shop
    logger.info('Finding Speedaf configuration', { shopId: cleanShopId });
    
    // First get the shop
    const shop = await api.shopifyShop.findFirst({
      filter: { id: { equals: cleanShopId } }
    });
    
    if (!shop) {
      throw new Error(`Shop with ID ${cleanShopId} not found`);
    }
    
    logger.info('Found shop', { id: shop.id });
    
    // Get all Speedaf configs for debugging
    logger.info('Getting all Speedaf configs to debug structure', { shopId: shop.id });
    const allConfigs = await api.speedafConfig.findMany();
    
    logger.info('All speedaf configs available:', {
      count: allConfigs.length,
      firstConfig: allConfigs.length > 0 ? {
        id: allConfigs[0].id,
        fields: Object.keys(allConfigs[0]),
        shopIdValue: allConfigs[0].shopId,
        shopValue: allConfigs[0].shop
      } : null
    });

    // Find matching config manually
    const speedafConfig = allConfigs.find((config: SpeedafConfig) => 
      String(config.shopId) === String(shop.id) || 
      (config.shop && String(config.shop.id) === String(shop.id))
    );
    
    if (!speedafConfig) {
      throw new Error(`Speedaf configuration for shop ${shop.id} not found`);
    }
    
    logger.info('Found Speedaf config', { configId: speedafConfig.id });
    
    // Extract the credentials
    const { appCode, secretKey, customerCode } = speedafConfig;
    
    // Check for missing credentials
    if (!appCode || !secretKey || !customerCode) {
      const missingFields = [];
      if (!appCode) missingFields.push("appCode");
      if (!secretKey) missingFields.push("secretKey");
      if (!customerCode) missingFields.push("customerCode");
      
      throw new Error(`Missing required Speedaf credentials: ${missingFields.join(", ")}`);
    }
    
    // Check for empty credentials (just whitespace)
    if (appCode.trim() === '') {
      throw new Error("The appCode in your Speedaf configuration is empty. Please update it with a valid value.");
    }
    
    if (secretKey.trim() === '') {
      throw new Error("The secretKey in your Speedaf configuration is empty. Please update it with a valid value.");
    }
    
    if (customerCode.trim() === '') {
      throw new Error("The customerCode in your Speedaf configuration is empty. Please update it with a valid value.");
    }
    
    logger.info('Validated Speedaf credentials', { 
      appCodeLength: appCode.length,
      secretKeyLength: secretKey.length,
      customerCodeLength: customerCode.length
    });
    
    // Process the request data
    let processedRequestData: Record<string, any>;
    
    if (typeof params.requestData === 'string') {
      try {
        processedRequestData = JSON.parse(params.requestData);
        logger.info('Parsed requestData from string to object');
      } catch (error) {
        logger.error('Failed to parse requestData string', { error });
        throw new Error('requestData is not a valid JSON string');
      }
    } else if (params.requestData && typeof params.requestData === 'object') {
      processedRequestData = params.requestData;
    } else {
      logger.error('Invalid requestData type', { type: typeof params.requestData });
      throw new Error('requestData must be an object or a valid JSON string');
    }
    
    // Add customer code if needed
    if (customerCode && !processedRequestData.customerCode) {
      processedRequestData.customerCode = customerCode;
    }
    
    // Generate timestamp and prepare data
    const timestamp = Date.now().toString();
    const dataString = JSON.stringify(processedRequestData);
    
    // Generate signature
    const signature = createSpeedafSignature(timestamp, secretKey, dataString, logger);
    
    // STEP 1: Prepare unencrypted JSON body according to Speedaf format
    const unencryptedBody = JSON.stringify({
      data: dataString,
      sign: signature
    });
    
    logger.info('Prepared unencrypted body', { 
      length: unencryptedBody.length 
    });
    
    // STEP 2: Encrypt the entire body using DES and our DesUtils class
    const desUtils = DesUtils.setSecretKey(secretKey);
    const encryptedBody = desUtils.encode(unencryptedBody);
    
    logger.info('Encrypted body', { length: encryptedBody.length });
    
    // Build API URL using the exact format
    const apiBaseUrl = "https://apis.speedaf.com/open-api/express/order/createOrder";
    const apiUrl = `${apiBaseUrl}?appCode=${encodeURIComponent(appCode)}&timestamp=${encodeURIComponent(timestamp)}`;
    
    logger.info('Using API URL', { 
      url: apiUrl,
      appCode,
      timestamp
    });
    
    // Handle test mode
    if (params.testMode) {
      logger.info('Test mode - not making actual API call');
      
      return {
        success: true,
        message: "Test mode - API call simulation successful",
        testData: {
          timestamp,
          appCode,
          apiUrl,
          requestData: processedRequestData,
          signature
        }
      };
    }
    
    // Make the actual API call
    logger.info('Making API call to', { url: apiUrl });
    
    try {
      // Make the API request with text/plain content type as specified in docs
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: encryptedBody
      });
      
      // Check HTTP status
      if (!response.ok) {
        logger.error('API returned HTTP error', { 
          status: response.status,
          statusText: response.statusText
        });
        
        try {
          const errorText = await response.text();
          logger.error('API error response', { 
            bodyPreview: errorText.substring(0, 200) 
          });
          
          return {
            success: false,
            error: `HTTP error: ${response.status} ${response.statusText}`,
            errorDetails: errorText,
            requestData: processedRequestData,
            apiUrl
          };
        } catch (readError) {
          return {
            success: false,
            error: `HTTP error: ${response.status} ${response.statusText}`,
            requestData: processedRequestData,
            apiUrl
          };
        }
      }
      
      // Get response as text first
      const responseText = await response.text();
      logger.info('Received API response text', { 
        length: responseText.length,
        preview: responseText.substring(0, 50) + '...'
      });
      
      // Parse JSON response
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        logger.info('Parsed API response JSON', { success: responseData.success });
      } catch (parseError) {
        logger.error('Failed to parse response as JSON', { 
          error: parseError,
          responseText: responseText.substring(0, 200)
        });
        
        return {
          success: false,
          error: "Failed to parse API response as JSON",
          rawResponse: responseText,
          requestData: processedRequestData,
          apiUrl
        };
      }
      
      // Process API response
      if (responseData.success) {
        // Successfully processed by Speedaf
        let decryptedResponse;
        
        // If we have data to decrypt
        if (typeof responseData.data === 'string' && responseData.data.length > 0) {
          try {
            // Decrypt the response data using our DesUtils class
            const decryptedData = desUtils.decode(responseData.data);
            logger.info('Successfully decrypted response data', { 
              length: decryptedData.length,
              preview: decryptedData.substring(0, 50) + '...'
            });
            
            // Parse the decrypted JSON
            try {
              decryptedResponse = JSON.parse(decryptedData);
            } catch (parseError) {
              logger.error('Failed to parse decrypted data as JSON', { error: parseError });
              decryptedResponse = { error: "Could not parse decrypted data as JSON" };
            }
          } catch (error) {
            logger.error('Failed to decrypt response', { error });
            return {
              success: false,
              error: "Failed to decrypt response data: " + (error instanceof Error ? error.message : String(error)),
              rawResponse: responseData,
              requestData: processedRequestData,
              apiUrl
            };
          }
        } else {
          decryptedResponse = responseData.data;
        }
        
        return {
          success: true,
          trackingCode: decryptedResponse?.waybillCode || decryptedResponse?.trackingNumber,
          decryptedResponse,
          rawResponse: responseData,
          requestData: processedRequestData,
          apiUrl
        };
      } else {
        // API returned an error
        logger.error('API returned error', { 
          message: responseData.error?.message || "Unknown API error"
        });
        
        return {
          success: false,
          error: responseData.error?.message || "Unknown API error",
          rawResponse: responseData,
          requestData: processedRequestData,
          apiUrl
        };
      }
    } catch (fetchError) {
      logger.error('Network or fetch error calling API', { error: fetchError });
      return {
        success: false,
        error: `Network error calling Speedaf API: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`,
        requestData: processedRequestData,
        apiUrl
      };
    }
  } catch (error) {
    logger.error('Error processing Speedaf API request', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const params = {
  shopId: {
    type: "string",
    required: true
  },
  requestData: {
    type: "object",
    required: true,
    properties: {},
    additionalProperties: true
  },
  testMode: {
    type: "boolean",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true }
}; 