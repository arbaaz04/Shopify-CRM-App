/**
 * Speedaf API Utilities
 * Provides functions for common Speedaf API operations
 */

// Define interfaces for credential objects
export interface SpeedafCredentials {
  appCode: string;
  secretKey: string;
  customerCode: string;
  platformSource?: string;
  apiEndpoint?: string;
}

/**
 * Gets the saved Speedaf credentials from the database or environment
 * 
 * @param api API client object
 * @param logger Logger object
 * @returns Credentials object or null if not found
 */
export async function getSavedSpeedafCredentials(api: any, logger: any): Promise<SpeedafCredentials | null> {
  try {
    // Try to get from speedafConfig model
    const shop = await api.shopifyShop.findFirst();
    
    if (!shop) {
      logger.warn('No shop found when trying to get Speedaf credentials');
      return null;
    }
    
    const config = await api.speedafConfig.findFirst({
      filter: { shop: { equals: shop.id } }
    });
    
    if (config && config.appCode && config.secretKey && config.customerCode) {
      logger.info('Found saved Speedaf credentials in model', { configId: config.id });
      return {
        appCode: config.appCode,
        secretKey: config.secretKey,
        customerCode: config.customerCode,
        platformSource: config.platformSource || '',
        apiEndpoint: config.apiEndpoint || ''
      };
    }
    
    // As fallback, try environment variables
    if (process.env.SPEEDAF_APP_CODE && process.env.SPEEDAF_SECRET_KEY && process.env.SPEEDAF_CUSTOMER_CODE) {
      logger.info('Found saved Speedaf credentials in environment variables');
      return {
        appCode: process.env.SPEEDAF_APP_CODE,
        secretKey: process.env.SPEEDAF_SECRET_KEY,
        customerCode: process.env.SPEEDAF_CUSTOMER_CODE,
        platformSource: process.env.SPEEDAF_PLATFORM_SOURCE || '',
        apiEndpoint: process.env.SPEEDAF_API_ENDPOINT || ''
      };
    }
    
    logger.info('No saved Speedaf credentials found');
    return null;
  } catch (error) {
    logger.error('Error getting saved Speedaf credentials', {
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
} 