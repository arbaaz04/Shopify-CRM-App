/**
 * Google Sheets Service
 * 
 * Provides optimized functions for interacting with Google Sheets API
 * with proper caching, batch operations, and error handling.
 */

import * as crypto from "crypto";
import { google } from "googleapis";
import { standardizeMoroccanCitySync } from "../utils/cityStandardization";

// Define interfaces for Google Sheets API responses
interface SheetValues {
  values?: any[][];
}

// Simple in-memory cache for sheet data
// In a production environment, consider using a distributed cache like Redis
interface SheetCache {
  [key: string]: {
    data: SheetValues;
    timestamp: number;
    expiryMs: number;
  };
}

// Global cache instance
const sheetCache: SheetCache = {};

/**
 * Create a JWT token for Google API authentication
 * @param credentials Google service account credentials
 */
export function createJWT(credentials: any): string {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hour expiry
  
  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: credentials.private_key_id
  };
  
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: expiry,
    iat: now
  };
  
  const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64url');
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signatureInput = `${headerBase64}.${payloadBase64}`;
  const signature = crypto.createSign('RSA-SHA256')
    .update(signatureInput)
    .sign(credentials.private_key, 'base64url');
  
  return `${signatureInput}.${signature}`;
}

/**
 * Get an access token from Google OAuth2 service
 * @param credentials Google service account credentials
 * @param logger Logger instance
 */
export async function getAccessToken(credentials: any, logger: any): Promise<string> {
  try {
    const jwt = createJWT(credentials);
    
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get OAuth token: ${error}`);
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    logger.error("Error getting access token", { error });
    throw error;
  }
}

/**
 * Invalidate cache for a sheet
 * @param spreadsheetId Spreadsheet ID
 * @param sheetRange Sheet range or null to invalidate all ranges for this spreadsheet
 */
export function invalidateSheetCache(spreadsheetId: string, sheetRange: string | null = null) {
  if (sheetRange) {
    const cacheKey = `${spreadsheetId}:${sheetRange}`;
    delete sheetCache[cacheKey];
  } else {
    // Invalidate all cache entries for this spreadsheet
    Object.keys(sheetCache).forEach(key => {
      if (key.startsWith(`${spreadsheetId}:`)) {
        delete sheetCache[key];
      }
    });
  }
}

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param retries Number of retries
 * @param delay Initial delay in ms
 * @param logger Logger instance
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  logger: any
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    logger.warn(`Operation failed, retrying in ${delay}ms...`, { error });
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2, logger);
  }
}

/**
 * Get cached sheet data or fetch and cache new data
 * @param spreadsheetId Spreadsheet ID
 * @param sheetRange Sheet range (e.g. "Sheet1!A:Z")
 * @param accessToken Google API access token
 * @param logger Logger instance
 * @param expiryMs Cache expiry time in milliseconds (default: 30 seconds)
 */
export async function getCachedSheetData(
  spreadsheetId: string,
  sheetRange: string,
  accessToken: string,
  logger: any,
  expiryMs = 30000
): Promise<SheetValues> {
  const cacheKey = `${spreadsheetId}:${sheetRange}`;
  const now = Date.now();
  
  // Check cache
  if (sheetCache[cacheKey] && (now - sheetCache[cacheKey].timestamp) < sheetCache[cacheKey].expiryMs) {
    logger.debug(`Using cached data for ${sheetRange}`);
    return sheetCache[cacheKey].data;
  }
  
  // Fetch fresh data
  logger.debug(`Fetching fresh data for ${sheetRange}`);
  const response = await retryWithBackoff(
    () => fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetRange}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    ),
    3,
    1000,
    logger
  );
  
  if (!response.ok) {
    throw new Error(`Failed to get ${sheetRange} data: ${await response.text()}`);
  }
  
  const data = await response.json() as SheetValues;
  
  // Cache the data
  sheetCache[cacheKey] = {
    data,
    timestamp: now,
    expiryMs
  };
  
  return data;
}

/**
 * Check if a sheet exists in the spreadsheet
 * @param spreadsheetId Spreadsheet ID
 * @param sheetTitle Sheet title to check
 * @param accessToken Google API access token or JWT auth object
 * @param logger Logger instance
 */
export async function sheetExists(
  spreadsheetId: string,
  sheetTitle: string,
  accessToken: string | any, // Allow JWT object
  logger: any
): Promise<boolean> {
  logger.debug(`Checking if sheet "${sheetTitle}" exists in spreadsheet ${spreadsheetId}`);
  
  try {
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    const authHeader = typeof accessToken === 'string' ? { 'Authorization': `Bearer ${accessToken}` } : undefined;
    
    // Create the appropriate fetch options
    const fetchOptions: any = {
      headers: {
        ...(authHeader || {})
      }
    };
    
    // If using JWT object, create a sheets client
    if (auth) {
      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: 'sheets.properties.title'
      });
      
      const sheets_data = response.data.sheets || [];
      return sheets_data.some((sheet: any) => 
        sheet.properties && sheet.properties.title === sheetTitle
      );
    } else {
      // Use fetch with access token if JWT not provided
      const response = await retryWithBackoff(
        () => fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`,
          fetchOptions
        ),
        3,
        1000,
        logger
      );
      
      if (!response.ok) {
        throw new Error(`Failed to get spreadsheet info: ${await response.text()}`);
      }
      
      const data = await response.json();
      const sheets = data.sheets || [];
      
      return sheets.some((sheet: any) => 
        sheet.properties && sheet.properties.title === sheetTitle
      );
    }
  } catch (error) {
    logger.error(`Error checking if sheet exists: ${sheetTitle}`, { error });
    throw error;
  }
}

/**
 * Create a new sheet in the spreadsheet
 * @param spreadsheetId Spreadsheet ID
 * @param sheetTitle Sheet title to create
 * @param accessToken Google API access token or JWT auth object
 * @param headers Optional header row values
 * @param logger Logger instance
 */
export async function createSheet(
  spreadsheetId: string,
  sheetTitle: string,
  accessToken: string | any, // Allow JWT object
  headers: string[] | null = null,
  logger: any
): Promise<void> {
  logger.info(`Creating new sheet "${sheetTitle}" in spreadsheet ${spreadsheetId}`);
  
  try {
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    const authHeader = typeof accessToken === 'string' ? { 'Authorization': `Bearer ${accessToken}` } : undefined;
    
    if (auth) {
      // Use sheets API directly with JWT
      const sheets = google.sheets({ version: 'v4', auth });
      
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle
                }
              }
            }
          ]
        }
      });
      
      // Add headers if provided
      if (headers && headers.length > 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetTitle}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          }
        });
      }
    } else {
      // Create the sheet using fetch with access token
      const createResponse = await retryWithBackoff(
        () => fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
          {
            method: 'POST',
            headers: {
              ...authHeader,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requests: [
                {
                  addSheet: {
                    properties: {
                      title: sheetTitle
                    }
                  }
                }
              ]
            })
          }
        ),
        3,
        1000,
        logger
      );
      
      if (!createResponse.ok) {
        throw new Error(`Failed to create sheet: ${await createResponse.text()}`);
      }
      
      // Add headers if provided
      if (headers && headers.length > 0) {
        const updateResponse = await retryWithBackoff(
          () => fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetTitle}!A1:${String.fromCharCode(65 + headers.length - 1)}1?valueInputOption=USER_ENTERED`,
            {
              method: 'PUT',
              headers: {
                ...authHeader,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                values: [headers]
              })
            }
          ),
          3,
          1000,
          logger
        );
        
        if (!updateResponse.ok) {
          logger.warn(`Failed to add headers to sheet: ${await updateResponse.text()}`);
          // Continue even if header update fails
        }
      }
    }
    
    logger.info(`Successfully created sheet "${sheetTitle}"`);
  } catch (error) {
    logger.error(`Error creating sheet: ${sheetTitle}`, { error });
    throw error;
  }
}

/**
 * Ensure a sheet exists, creating it if necessary
 * @param spreadsheetId Spreadsheet ID
 * @param sheetTitle Sheet title to ensure
 * @param accessToken Google API access token or JWT auth object
 * @param headers Optional header row values to use if sheet is created
 * @param logger Logger instance
 */
export async function ensureSheetExists(
  spreadsheetId: string,
  sheetTitle: string,
  accessToken: string | any, // Allow JWT object
  headers: string[] | null = null,
  logger: any
): Promise<void> {
  try {
    // If accessToken is a JWT object, use it directly with Google APIs
    const authHeader = typeof accessToken === 'string' 
      ? `Bearer ${accessToken}` 
      : undefined;
    
    // Check if the sheet exists
    const exists = await sheetExists(spreadsheetId, sheetTitle, accessToken, logger);
    
    if (!exists) {
      await createSheet(spreadsheetId, sheetTitle, accessToken, headers, logger);
    } else {
      logger.debug(`Sheet "${sheetTitle}" already exists`);
    }
  } catch (error) {
    logger.error(`Error ensuring sheet exists: ${sheetTitle}`, { error });
    throw error;
  }
}

/**
 * Append rows to a sheet
 * @param spreadsheetId Spreadsheet ID
 * @param sheetTitle Sheet title
 * @param rows Array of rows to append
 * @param accessToken Google API access token or JWT auth object
 * @param logger Logger instance
 */
export async function appendRows(
  spreadsheetId: string,
  sheetTitle: string,
  rows: any[][],
  accessToken: string | any, // Allow JWT object
  logger: any
): Promise<void> {
  if (rows.length === 0) {
    logger.debug(`No rows to append to sheet "${sheetTitle}"`);
    return;
  }
  
  logger.info(`Appending ${rows.length} rows to sheet "${sheetTitle}"`, { 
    spreadsheetId,
    sheetTitle,
    rowCount: rows.length,
    sampleRow: rows[0]
  });
  
  try {
    // Ensure the sheet exists before attempting to append
    await ensureSheetExists(spreadsheetId, sheetTitle, accessToken, null, logger);
    
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    const authHeader = typeof accessToken === 'string' ? { 'Authorization': `Bearer ${accessToken}` } : undefined;
    
    if (auth) {
      // Use sheets API directly with JWT
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetTitle}!A:Z`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: rows
        }
      });
    } else {
      // Use fetch with access token
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A:Z:append?valueInputOption=USER_ENTERED`;
      
      logger.debug(`Sending request to ${url}`);
      
      const response = await retryWithBackoff(
        async () => {
          try {
            const resp = await fetch(url, {
              method: 'POST',
              headers: {
                ...authHeader,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                values: rows
              })
            });
            
            if (!resp.ok) {
              const errorText = await resp.text();
              logger.error(`API error: ${resp.status} ${resp.statusText}`, { errorText });
              throw new Error(`Failed to append rows: ${resp.status} ${resp.statusText} - ${errorText}`);
            }
            
            return resp;
          } catch (fetchError) {
            logger.error(`Fetch error in appendRows`, { fetchError });
            throw fetchError;
          }
        },
        3,
        1000,
        logger
      );
    }
    
    // Since we're using the retryWithBackoff function, if we get here, the response is ok
    logger.info(`Successfully appended ${rows.length} rows to sheet "${sheetTitle}"`);
    
    // Invalidate cache for this sheet
    invalidateSheetCache(spreadsheetId, `${sheetTitle}!A:Z`);
  } catch (error) {
    logger.error(`Error appending rows to sheet: ${sheetTitle}`, { 
      error: error instanceof Error ? { 
        message: error.message, 
        stack: error.stack,
        name: error.name
      } : String(error),
      spreadsheetId,
      sheetTitle
    });
    throw error;
  }
}

/**
 * Find row index by value in a specific column
 * @param spreadsheetId Spreadsheet ID
 * @param sheetTitle Sheet title
 * @param columnIndex Column index (0-based)
 * @param value Value to search for
 * @param accessToken Google API access token or JWT auth object
 * @param logger Logger instance
 */
export async function findRowByColumnValue(
  spreadsheetId: string,
  sheetTitle: string,
  columnIndex: number,
  value: string,
  accessToken: string | any, // Allow JWT object
  logger: any
): Promise<number> {
  logger.debug(`Finding row with value "${value}" in column ${columnIndex} of sheet "${sheetTitle}"`);
  
  try {
    // Get all data in the specified column
    const columnLetter = String.fromCharCode(65 + columnIndex);
    const range = `${sheetTitle}!${columnLetter}:${columnLetter}`;
    
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    
    let values: any[][] = [];
    
    if (auth) {
      // Use sheets API directly with JWT
      const sheets = google.sheets({ version: 'v4', auth });
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      });
      
      values = response.data.values || [];
    } else {
      // Use cached data with access token
      const data = await getCachedSheetData(spreadsheetId, range, accessToken as string, logger);
      values = data.values || [];
    }
    
    // Find the row index (1-based) where the value matches
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === value) {
        return i + 1; // Convert to 1-based index
      }
    }
    
    // Value not found
    return -1;
  } catch (error) {
    logger.error(`Error finding row by column value: ${value}`, { error });
    throw error;
  }
}

/**
 * Execute batch update operations on a Google Sheet
 * @param spreadsheetId Spreadsheet ID
 * @param operations Array of operations with range and values
 * @param accessToken Google API access token or JWT auth object
 * @param logger Logger instance
 */
export async function batchUpdateSheet(
  spreadsheetId: string,
  operations: Array<{ range: string, values: any[][] }>,
  accessToken: string | any, // Allow JWT object
  logger: any
): Promise<void> {
  if (operations.length === 0) {
    logger.debug("No operations to perform in batch update");
    return;
  }
  
  logger.debug(`Performing batch update with ${operations.length} operations`);
  
  try {
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    const authHeader = typeof accessToken === 'string' ? { 'Authorization': `Bearer ${accessToken}` } : undefined;
    
    if (auth) {
      // Use sheets API directly with JWT
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        requestBody: {
          valueInputOption: "USER_ENTERED",
          data: operations.map(op => ({
            range: op.range,
            values: op.values
          }))
        }
      });
    } else {
      // Use fetch with access token
      const response = await retryWithBackoff(
        () => fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
          {
            method: 'POST',
            headers: {
              ...authHeader,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              valueInputOption: "USER_ENTERED",
              data: operations.map(op => ({
                range: op.range,
                values: op.values
              }))
            })
          }
        ),
        3,
        1000,
        logger
      );
      
      if (!response.ok) {
        throw new Error(`Failed to perform batch update: ${await response.text()}`);
      }
    }
    
    logger.info(`Successfully performed batch update with ${operations.length} operations`);
    
    // Invalidate cache for affected ranges
    operations.forEach(op => {
      const sheetName = op.range.split('!')[0];
      invalidateSheetCache(spreadsheetId, `${sheetName}!A:Z`);
    });
  } catch (error) {
    logger.error("Error performing batch update", { error });
    throw error;
  }
}

/**
 * Update a specific cell in a sheet
 * @param spreadsheetId Spreadsheet ID
 * @param range Cell range (e.g. "Sheet1!A1")
 * @param value Value to set
 * @param accessToken Google API access token or JWT auth object
 * @param logger Logger instance
 */
export async function updateCell(
  spreadsheetId: string,
  range: string,
  value: any,
  accessToken: string | any, // Allow JWT object
  logger: any
): Promise<void> {
  logger.debug(`Updating cell ${range} to value "${value}"`);
  
  try {
    // Use JWT object directly with Google API if provided
    const auth = typeof accessToken === 'object' ? accessToken : undefined;
    const authHeader = typeof accessToken === 'string' ? { 'Authorization': `Bearer ${accessToken}` } : undefined;
    
    if (auth) {
      // Use sheets API directly with JWT
      const sheets = google.sheets({ version: 'v4', auth });
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[value]]
        }
      });
    } else {
      // Use fetch with access token
      const response = await retryWithBackoff(
        () => fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: {
              ...authHeader,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              values: [[value]]
            })
          }
        ),
        3,
        1000,
        logger
      );
      
      if (!response.ok) {
        throw new Error(`Failed to update cell: ${await response.text()}`);
      }
    }
    
    logger.info(`Successfully updated cell ${range}`);
    
    // Invalidate cache for this sheet
    const sheetName = range.split('!')[0];
    invalidateSheetCache(spreadsheetId, `${sheetName}!A:Z`);
  } catch (error) {
    logger.error(`Error updating cell: ${range}`, { error });
    throw error;
  }
}

/**
 * Extract spreadsheet ID from a Google Sheets URL
 * @param input A Google Sheets URL or ID
 * @returns The extracted spreadsheet ID
 */
export function extractSpreadsheetId(input: string): string {
  if (!input) return input;
  
  // Remove @ symbol if present at the beginning
  if (input.startsWith('@')) {
    input = input.substring(1);
  }
  
  // If it's already just an ID (no slashes or spaces), return as is
  if (!input.includes('/') && !input.includes(' ')) {
    return input;
  }
  
  // Extract from various Google Sheets URL formats
  const patterns = [
    /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?/,
    /https:\/\/drive\.google\.com\/(?:file\/d|open\?id=)\/([a-zA-Z0-9_-]+)(?:\/.*)?/
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // If no match, return the original
  return input;
}

/**
 * Validate if a spreadsheet ID appears to be valid
 * @param spreadsheetId The ID to validate
 * @returns boolean indicating if the ID appears valid
 */
export function validateSpreadsheetId(spreadsheetId: string): boolean {
  if (!spreadsheetId) return false;
  
  // Typical spreadsheet IDs are at least 25 characters, alphanumeric with occasional dashes or underscores
  if (spreadsheetId.length < 25) return false;
  
  // Basic regex pattern for Google Spreadsheet IDs
  const validPattern = /^[a-zA-Z0-9_-]{25,}$/;
  return validPattern.test(spreadsheetId);
}

/**
 * Format Moroccan phone numbers to a standard format
 * @param phone Phone number to format
 */
export function formatMoroccanPhoneNumber(phone: string): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "");
  
  // If number starts with 212 (country code), remove it
  if (digits.startsWith("212")) {
    digits = digits.substring(3);
  }
  
  // If number starts with 0, keep it
  if (digits.startsWith("0")) {
    return digits;
  }
  
  // If number starts with 6 or 5 (mobile), add 0
  if (digits.startsWith("6") || digits.startsWith("5")) {
    return "0" + digits;
  }
  
  // If number starts with 2 (landline), add 0
  if (digits.startsWith("2")) {
    return "0" + digits;
  }
  
  // If we get here, return the cleaned number
  return digits;
}

/**
 * Helper function to calculate Levenshtein distance between two strings
 */
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1      // insertion
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Standardize Moroccan city names to ensure consistency
 * @param city City name to standardize
 */
export function standardizeMoroccanCity(city: string): string {
  return standardizeMoroccanCitySync(city);
} 