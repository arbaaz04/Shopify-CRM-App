/**
 * Speedaf API Testing Utility
 * 
 * This utility provides functions to test the Speedaf API directly.
 * It includes encryption and signature generation as per Speedaf documentation.
 */

import crypto from "crypto";

/**
 * Interface for Speedaf API configuration
 */
export interface SpeedafApiConfig {
  appCode: string;
  secretKey: string;
  customerCode: string;
  platformSource: string;
  apiEndpoint?: string;
}

/**
 * Interface for API response
 */
export interface SpeedafApiResponse {
  success: boolean;
  trackingCode?: string;
  message?: string;
  error?: string;
  responseData?: any;
  rawResponse?: any;
}

/**
 * Encrypts data using DES-CBC with PKCS5Padding
 * 
 * @param data Data to encrypt
 * @param key Secret key
 * @returns Base64 encoded encrypted data
 */
export function encryptDES(data: string, key: string): string {
  try {
    // Ensure the key is exactly 8 bytes (DES requirement)
    const keyBuffer = Buffer.from(key.substring(0, 8), 'utf8');
    
    // Vector byte array as specified in docs: 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF
    const iv = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]);
    
    // Create cipher with DES mode (not des-cbc which may not be supported in some environments)
    const cipher = crypto.createCipheriv('des', keyBuffer, iv);
    
    // Set padding mode to PKCS5Padding (Node.js uses this by default for DES)
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypts DES encrypted data
 * 
 * @param encryptedData Base64 encoded encrypted data
 * @param key Secret key
 * @returns Decrypted data as string
 */
export function decryptDES(encryptedData: string, key: string): string {
  try {
    // Ensure the key is exactly 8 bytes (DES requirement)
    const keyBuffer = Buffer.from(key.substring(0, 8), 'utf8');
    
    // Vector byte array as specified in docs: 0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF
    const iv = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]);
    
    // Create decipher with DES mode (not des-cbc)
    const decipher = crypto.createDecipheriv('des', keyBuffer, iv);
    
    // Decrypt the data
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
}

/**
 * Creates MD5 signature
 * 
 * @param data Data to create signature for
 * @returns MD5 signature as lowercase hex string
 */
export function createMd5Signature(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex').toLowerCase();
}

/**
 * Tests the Speedaf API with the exact documentation example data
 * 
 * @param config Speedaf API configuration
 * @returns Promise with API response
 */
export async function testSpeedafApiWithDocExample(
  config: SpeedafApiConfig
): Promise<SpeedafApiResponse> {
  console.log("Starting Speedaf API test with exact documentation data");
  
  try {
    if (!config.appCode || !config.secretKey) {
      console.error("Missing required Speedaf configuration");
      return {
        success: false,
        error: "Missing appCode or secretKey in Speedaf configuration"
      };
    }
    
    // Create the exact example request from the documentation
    const requestData = {
      "acceptAddress": "",
      "acceptCitizenType": "174",
      "acceptCitizenId": "78456478965",
      "acceptCityCode": "",
      "acceptCityName": "",
      "acceptCompanyName": "",
      "acceptCountryCode": "NG",
      "acceptCountryName": "Nigeria",
      "acceptDistrictCode": "",
      "acceptDistrictName": "",
      "acceptEmail": "123@Test.com",
      "acceptMobile": "17789222226",
      "acceptName": "Test Customer",
      "acceptPhone": "999999",
      "acceptPostCode": "",
      "acceptProvinceCode": "",
      "acceptProvinceName": "",
      "acceptStreetName": "",
      "codFee": 100,
      "currencyType": "NGN",
      "customOrderNo": "TEST-" + Date.now(),
      "customerCode": config.customerCode,
      "changeLable": 0,
      "deliveryType": "DE01",
      "goodsQTY": 1,
      "goodsWeight": 0,
      "insurePrice": 0,
      "isAllowOpen": 0,
      "itemList": [
        {
          "battery": 0,
          "blInsure": 0,
          "currencyType": "NGN",
          "dutyMoney": 0,
          "goodsHigh": 0,
          "goodsLength": 100,
          "goodsMaterial": "",
          "goodsName": "English goodsName",
          "goodsNameDialect": "",
          "goodsQTY": 2,
          "goodsRemark": "",
          "goodsRule": "",
          "goodsType": "IT02",
          "goodsUnitPrice": 100,
          "goodsValue": 100,
          "goodsVolume": 1.52,
          "goodsWeight": 100,
          "goodsWidth": 100,
          "hsCode": "",
          "makeCountry": "CN",
          "goodsUrl": "",
          "salePath": "",
          "sku": "sku001",
          "unit": "box",
          "blMobile": 1,
          "mobileType": 1,
          "mobileBrand": "TECNO"
        }
      ],
      "packetCenterCode": "",
      "parcelCurrencyType": "NGN",
      "parcelHigh": 100,
      "parcelLength": 100,
      "parcelType": "PT01",
      "parcelVolume": 1.52,
      "parcelWeight": 100,
      "parcelWidth": 100,
      "parcelValue": 10,
      "payMethod": "PA01",
      "pickupBatch": "",
      "pickUpAging": 0,
      "pickupCity": "",
      "pickupCountry": "",
      "pickupDetailAddress": "",
      "pickupDistrict": "",
      "pickupName": "",
      "pickupPhone": "",
      "pickupProvince": "",
      "pickupType": 0,
      "piece": 1,
      "platformSource": config.platformSource,
      "prePickUpTime": "2022-04-12 10:00:00",
      "productService": "",
      "remark": "",
      "sendAddress": "",
      "sendCityCode": "",
      "sendCityName": "",
      "sendCompanyName": "",
      "sendCountryCode": "CN",
      "sendCountryName": "China",
      "sendDistrictCode": "",
      "sendDistrictName": "",
      "sendMail": "",
      "sendMobile": "",
      "sendName": "",
      "sendPhone": "",
      "sendPostCode": "",
      "sendProvinceCode": "",
      "sendProvinceName": "",
      "shipType": "ST01",
      "shippingFee": 0,
      "smallCode": "",
      "threeSectionsCode": "",
      "transportType": "TT02",
      "taxMethod": "DDP",
      "warehouseCode": "GZ01"
    };
    
    return await sendSpeedafApiRequest(requestData, config);
  } catch (error: any) {
    console.error("Error in Speedaf API test:", error);
    return {
      success: false,
      error: `API test error: ${error.message || error}`
    };
  }
}

/**
 * Create mock order data for testing
 * 
 * @param config Speedaf API configuration
 * @returns Mock order data
 */
export function createMockOrderData(config: SpeedafApiConfig) {
  return {
    "acceptAddress": "123 Test Street",
    "acceptCitizenType": "174",
    "acceptCitizenId": "78456478965",
    "acceptCityCode": "",
    "acceptCityName": "Casablanca",
    "acceptCompanyName": "",
    "acceptCountryCode": "MA",
    "acceptCountryName": "Morocco",
    "acceptDistrictCode": "",
    "acceptDistrictName": "",
    "acceptEmail": "test@example.com",
    "acceptMobile": "0600000000",
    "acceptName": "Test Customer",
    "acceptPhone": "0600000000",
    "acceptPostCode": "",
    "acceptProvinceCode": "",
    "acceptProvinceName": "",
    "acceptStreetName": "",
    "codFee": 500,
    "currencyType": "MAD",
    "customOrderNo": "TEST-" + Date.now(),
    "customerCode": config.customerCode,
    "changeLable": 0,
    "deliveryType": "DE01",
    "goodsQTY": 2,
    "goodsWeight": 1,
    "insurePrice": 0,
    "isAllowOpen": 0,
    "itemList": [
      {
        "battery": 0,
        "blInsure": 0,
        "currencyType": "MAD",
        "dutyMoney": 0,
        "goodsHigh": 10,
        "goodsLength": 20,
        "goodsMaterial": "",
        "goodsName": "Test Product",
        "goodsNameDialect": "",
        "goodsQTY": 2,
        "goodsRemark": "",
        "goodsRule": "",
        "goodsType": "IT02",
        "goodsUnitPrice": 250,
        "goodsValue": 500,
        "goodsVolume": 0.5,
        "goodsWeight": 0.5,
        "goodsWidth": 15,
        "hsCode": "",
        "makeCountry": "CN",
        "goodsUrl": "",
        "salePath": "",
        "sku": "TEST-SKU-001",
        "unit": "pcs",
        "blMobile": 0,
        "mobileType": 0,
        "mobileBrand": ""
      }
    ],
    "packetCenterCode": "",
    "parcelCurrencyType": "MAD",
    "parcelHigh": 10,
    "parcelLength": 20,
    "parcelType": "PT01",
    "parcelVolume": 0.5,
    "parcelWeight": 1,
    "parcelWidth": 15,
    "parcelValue": 500,
    "payMethod": "PA01",
    "pickupBatch": "",
    "pickUpAging": 0,
    "pickupCity": "",
    "pickupCountry": "",
    "pickupDetailAddress": "",
    "pickupDistrict": "",
    "pickupName": "",
    "pickupPhone": "",
    "pickupProvince": "",
    "pickupType": 0,
    "piece": 1,
    "platformSource": config.platformSource,
    "prePickUpTime": new Date().toISOString().split('T')[0] + " 10:00:00",
    "productService": "",
    "remark": "Test order",
    "sendAddress": "",
    "sendCityCode": "",
    "sendCityName": "",
    "sendCompanyName": "",
    "sendCountryCode": "CN",
    "sendCountryName": "China",
    "sendDistrictCode": "",
    "sendDistrictName": "",
    "sendMail": "",
    "sendMobile": "",
    "sendName": "",
    "sendPhone": "",
    "sendPostCode": "",
    "sendProvinceCode": "",
    "sendProvinceName": "",
    "shipType": "ST01",
    "shippingFee": 0,
    "smallCode": "",
    "threeSectionsCode": "",
    "transportType": "TT02",
    "taxMethod": "DDP",
    "warehouseCode": "GZ01"
  };
}

/**
 * Sends a request to the Speedaf API
 * 
 * @param requestData Data to send to the API
 * @param config Speedaf API configuration
 * @returns Promise with API response
 */
export async function sendSpeedafApiRequest(
  requestData: any,
  config: SpeedafApiConfig
): Promise<SpeedafApiResponse> {
  try {
    // 1. Prepare request
    console.log("Preparing request to Speedaf API");
    
    // Get current timestamp
    const timestamp = Date.now().toString();
    console.log(`Using timestamp: ${timestamp}`);
    
    // Stringify the request data
    const requestDataString = JSON.stringify(requestData);
    console.log("Request data prepared");
    
    // Create signature: md5(timestamp + secretKey + data)
    const signatureInput = timestamp + config.secretKey + requestDataString;
    const signature = createMd5Signature(signatureInput);
    console.log(`Generated signature: ${signature.substring(0, 8)}...`);
    
    // Create the body object that will be encrypted
    const bodyObject = {
      data: requestDataString,
      sign: signature
    };
    
    // Stringify the body object
    const bodyJson = JSON.stringify(bodyObject);
    
    // Encrypt the body
    const encryptedBody = encryptDES(bodyJson, config.secretKey);
    console.log("Body encrypted successfully");
    
    // Construct the API URL
    const apiEndpoint = config.apiEndpoint || "https://uat-api.speedaf.com/open-api/express/order/createOrder";
    const url = `${apiEndpoint}?timestamp=${encodeURIComponent(timestamp)}&appCode=${encodeURIComponent(config.appCode)}`;
    console.log(`API endpoint URL: ${url}`);
    
    // 2. Send request
    console.log("Sending request to Speedaf API...");
    
    // Set up abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    // Make the API request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // As per Speedaf docs
        "Accept": "*/*"
      },
      body: encryptedBody, // Send the encrypted body
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Log response status
    console.log(`Response status: ${response.status}`);
    
    // Get the response text
    const responseText = await response.text();
    console.log(`Raw API response: ${responseText}`);
    
    try {
      // Parse the response JSON
      const parsedResponse = JSON.parse(responseText);
      console.log("API response parsed successfully");
      
      // Check if the response indicates success
      if (parsedResponse.success) {
        // Try to decrypt the response data if it's a string
        let responseData = parsedResponse.data;
        if (typeof responseData === 'string' && responseData.length > 0) {
          try {
            // Attempt to decrypt the response data
            const decryptedData = decryptDES(responseData, config.secretKey);
            console.log("Response data decrypted successfully");
            try {
              responseData = JSON.parse(decryptedData);
            } catch {
              // If it's not JSON, use the raw decrypted data
              console.log("Decrypted data is not JSON");
              responseData = decryptedData;
            }
          } catch (decryptError) {
            console.error("Failed to decrypt response data:", decryptError);
            // Continue with the original response data
          }
        }
        
        return {
          success: true,
          message: "API request successful",
          trackingCode: responseData?.logisticNo || responseData?.trackingCode || responseData,
          responseData,
          rawResponse: parsedResponse
        };
      } else {
        return {
          success: false,
          error: parsedResponse.error?.message || "Unknown error from Speedaf API",
          rawResponse: parsedResponse
        };
      }
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return {
        success: false,
        error: "Invalid response format from API",
        rawResponse: responseText
      };
    }
  } catch (error: any) {
    // Handle any errors during the request
    console.error("Error during Speedaf API request:", error);
    return { 
      success: false, 
      error: `Error during API request: ${error.message || "Unknown error"}`,
      rawResponse: error
    };
  }
} 