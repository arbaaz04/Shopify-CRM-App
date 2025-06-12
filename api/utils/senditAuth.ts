/**
 * Sendit API Authentication Utilities
 */

export interface SenditCredentials {
  publicKey: string;
  secretKey: string;
}

export interface SenditAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  name?: string;
  error?: string;
}

/**
 * Authenticate with Sendit API using provided credentials
 */
export async function authenticateSendit(
  credentials: SenditCredentials,
  logger: any
): Promise<SenditAuthResponse> {
  try {
    const apiUrl = process.env.SENDIT_API_URL || 'https://app.sendit.ma/api/v1';
    
    logger.info('Attempting to authenticate with Sendit API');
    
    // Using native fetch instead of axios
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        public_key: credentials.publicKey,
        secret_key: credentials.secretKey
      })
    });
    
    // Parse the JSON response
    const data = await response.json();
    
    if (response.ok && data.success) {
      logger.info('Sendit authentication successful', {
        name: data.data?.name
      });
      
      return {
        success: true,
        message: data.message || 'Authentication successful',
        token: data.data?.token,
        name: data.data?.name
      };
    } else {
      logger.warn('Sendit authentication failed with error response', {
        status: response.status,
        message: data?.message
      });
      
      return {
        success: false,
        message: data?.message || 'Authentication failed'
      };
    }
  } catch (error: unknown) {
    logger.error('Error authenticating with Sendit API', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    // Generic error
    return {
      success: false,
      message: 'Failed to connect to Sendit API',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 