/**
 * Test Sendit Connection Action
 * Tests the connection to Sendit API using provided credentials
 */

import { ActionOptions } from "gadget-server";
import { authenticateSendit, SenditCredentials } from "../utils/senditAuth";

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    publicKey: string;
    secretKey: string;
    saveToPersistent?: boolean;
  },
  api: any, 
  logger: any
}) => Promise<any>;

// Main action function
export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    // Validate parameters
    if (!params.publicKey || !params.publicKey.trim()) {
      throw new Error("Public key is required");
    }
    
    if (!params.secretKey || !params.secretKey.trim()) {
      throw new Error("Secret key is required");
    }
    
    logger.info('Testing Sendit connection', {
      saveCredentials: !!params.saveToPersistent,
      apiUrl: process.env.SENDIT_API_URL || 'https://app.sendit.ma/api/v1'
    });
    
    // Prepare credentials
    const credentials: SenditCredentials = {
      publicKey: params.publicKey.trim(),
      secretKey: params.secretKey.trim()
    };
    
    // For debugging only - log masked credentials
    logger.info('Credentials being used', {
      publicKeyLength: credentials.publicKey.length,
      publicKeyStart: credentials.publicKey.substring(0, 4) + '...',
      secretKeyLength: credentials.secretKey.length,
      secretKeyStart: credentials.secretKey.substring(0, 4) + '...'
    });
    
    // Attempt to authenticate with Sendit API
    const authResponse = await authenticateSendit(credentials, logger);
    
    // Log the auth response for debugging (without sensitive info)
    logger.info('Authentication response received', {
      success: authResponse.success,
      hasToken: !!authResponse.token,
      tokenLength: authResponse.token ? authResponse.token.length : 0,
      name: authResponse.name
    });
    
    // If authentication successful and user wants to save credentials
    if (authResponse.success && params.saveToPersistent && authResponse.token) {
      try {
        // Get the current shop
        const shop = await api.shopifyShop.findFirst();
        
        if (!shop) {
          throw new Error("Could not find shop");
        }
        
        logger.info('Found shop', { id: shop.id });
        
        // Try to find an existing Sendit config for this shop
        let existingConfig = null;
        try {
          existingConfig = await api.senditConfig.findFirst({
            filter: { shop: { equals: shop.id } }
          });
          
          logger.info('Existing config check result', { 
            found: !!existingConfig,
            configId: existingConfig?.id
          });
        } catch (findError) {
          logger.warn('Error finding Sendit config - it might not exist yet', {
            error: findError instanceof Error ? findError.message : String(findError)
          });
        }
        
        if (existingConfig) {
          // Update the existing config directly with field values (not nested)
          await api.senditConfig.update(existingConfig.id, {
            publicKey: credentials.publicKey,
            secretKey: credentials.secretKey,
            token: authResponse.token,
            name: authResponse.name,
            lastAuthenticated: new Date().toISOString()
          });
          
          logger.info('Updated existing Sendit config', { configId: existingConfig.id });
          
          return {
            ...authResponse,
            savedCredentials: true,
            configId: existingConfig.id,
            isNew: false
          };
        } else {
          // Create a new config with direct field values (not nested)
          const newConfig = await api.senditConfig.create({
            publicKey: credentials.publicKey,
            secretKey: credentials.secretKey,
            token: authResponse.token,
            name: authResponse.name,
            lastAuthenticated: new Date().toISOString(),
            shop: { _link: shop.id }
          });
          
          logger.info('Created new Sendit config', { configId: newConfig.id });
          
          return {
            ...authResponse,
            savedCredentials: true,
            configId: newConfig.id,
            isNew: true
          };
        }
      } catch (configError: unknown) {
        logger.error('Failed to save Sendit credentials', { 
          error: configError instanceof Error ? configError.message : String(configError),
          stack: configError instanceof Error ? configError.stack : undefined
        });
        
        // Return success for the connection test but indicate saving failed
        return {
          ...authResponse,
          savedCredentials: false,
          saveError: configError instanceof Error ? configError.message : "Failed to save credentials"
        };
      }
    }
    
    // Return authentication response
    return authResponse;
  } catch (error: unknown) {
    // Central error handling
    logger.error("Error testing Sendit connection", { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// Helper function to get stored credentials (can be used by other actions)
export async function getSavedSenditCredentials(api: any, logger: any): Promise<SenditCredentials | null> {
  try {
    // Try to get from senditConfig model
    const shop = await api.shopifyShop.findFirst();
    
    if (!shop) {
      logger.warn('No shop found when trying to get Sendit credentials');
      return null;
    }
    
    const config = await api.senditConfig.findFirst({
      filter: { shop: { equals: shop.id } }
    });
    
    if (config && config.publicKey && config.secretKey) {
      logger.info('Found saved Sendit credentials in model', { configId: config.id });
      return {
        publicKey: config.publicKey,
        secretKey: config.secretKey
      };
    }
    
    // As fallback, try environment variables
    if (process.env.SENDIT_PUBLIC_KEY && process.env.SENDIT_SECRET_KEY) {
      logger.info('Found saved Sendit credentials in environment variables');
      return {
        publicKey: process.env.SENDIT_PUBLIC_KEY,
        secretKey: process.env.SENDIT_SECRET_KEY
      };
    }
    
    logger.info('No saved Sendit credentials found');
    return null;
  } catch (error) {
    logger.error('Error getting saved Sendit credentials', {
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}

export const params = {
  publicKey: {
    type: "string",
    required: true
  },
  secretKey: {
    type: "string",
    required: true
  },
  saveToPersistent: {
    type: "boolean",
    required: false
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
}; 