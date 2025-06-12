/**
 * Sendit API Utilities
 * Handles authentication and requests to the Sendit shipping API
 */

import axios from 'axios';

// Types for Sendit API
export interface SenditShipmentRequest {
  // Recipient information
  recipient: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code?: string;
  };
  // Package information
  package: {
    weight: number; // in kg
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    description?: string;
    value?: number;
  };
  // Optional service configuration
  service?: {
    type: string;
    options?: string[];
  };
  reference_id?: string; // Your internal reference ID (order ID)
}

export interface SenditShipmentResponse {
  success: boolean;
  shipment_id?: string;
  tracking_number?: string;
  label_url?: string;
  errors?: string[];
  message?: string;
}

/**
 * Create a new Sendit client for API requests
 */
export function createSenditClient(logger: any) {
  // Get API credentials from environment variables
  const apiPublicKey = process.env.SENDIT_API_PUBLIC_KEY;
  const apiPrivateKey = process.env.SENDIT_API_PRIVATE_KEY;
  const apiUrl = process.env.SENDIT_API_URL || 'https://app.sendit.ma/api';
  
  if (!apiPublicKey || !apiPrivateKey) {
    logger.error('Sendit API credentials not found in environment variables');
    throw new Error('Sendit API credentials not configured');
  }
  
  // Create axios instance with default config
  const client = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-KEY': apiPublicKey
    }
  });
  
  // Request interceptor to handle authentication
  client.interceptors.request.use((config) => {
    // For requests that need the private key signature
    // Note: Adjust this based on actual Sendit API requirements
    if (config.url?.includes('/shipments')) {
      // This is a placeholder for how you might add authentication
      // The actual implementation depends on Sendit's specific requirements
      config.headers['X-API-SIGNATURE'] = apiPrivateKey;
    }
    return config;
  });
  
  return {
    /**
     * Create a new shipment in Sendit
     */
    createShipment: async (data: SenditShipmentRequest): Promise<SenditShipmentResponse> => {
      try {
        logger.info('Creating Sendit shipment', { reference: data.reference_id });
        const response = await client.post('/shipments', data);
        return response.data;
      } catch (error) {
        logger.error('Error creating Sendit shipment', { 
          error: error instanceof Error ? error.message : String(error),
          data 
        });
        
        // Parse error response if available
        if (axios.isAxiosError(error) && error.response?.data) {
          return {
            success: false,
            errors: Array.isArray(error.response.data.errors) 
              ? error.response.data.errors 
              : [String(error.response.data.message || 'Unknown error')],
            message: String(error.response.data.message || 'Failed to create shipment')
          };
        }
        
        // Generic error
        return {
          success: false,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          message: 'Failed to create shipment'
        };
      }
    },
    
    /**
     * Track a shipment by tracking number
     */
    trackShipment: async (trackingNumber: string): Promise<any> => {
      try {
        logger.info('Tracking Sendit shipment', { trackingNumber });
        const response = await client.get(`/tracking/${trackingNumber}`);
        return response.data;
      } catch (error) {
        logger.error('Error tracking Sendit shipment', { 
          error: error instanceof Error ? error.message : String(error),
          trackingNumber 
        });
        throw error;
      }
    }
  };
} 