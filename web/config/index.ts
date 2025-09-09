/**
 * Environment Configuration
 * Centralized configuration management for the application
 */

interface AppConfig {
  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
  
  // API Configuration
  api: {
    senditBaseUrl: string;
    speedafBaseUrl: string;
    shopifyStoreUrl: string;
    timeout: number;
  };
  
  // Tracking URLs
  tracking: {
    senditBaseUrl: string;
    speedafBaseUrl: string;
  };
  
  // UI Configuration
  ui: {
    defaultPageSize: number;
    maxPageSize: number;
    toastDuration: number;
  };
  
  // Feature Flags
  features: {
    enableDebugMode: boolean;
    enableAdvancedLogging: boolean;
    enableCityAutoCorrection: boolean;
  };
}

const createConfig = (): AppConfig => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  return {
    // Environment
    isDevelopment,
    isProduction: !isDevelopment,
    
    // API Configuration
    api: {
      senditBaseUrl: process.env.SENDIT_API_URL || 'https://api.sendit.ma',
      speedafBaseUrl: process.env.SPEEDAF_API_URL || 'https://api.speedaf.com',
      shopifyStoreUrl: 'https://bambe-1.myshopify.com/admin',
      timeout: 30000, // 30 seconds
    },
    
    // Tracking URLs
    tracking: {
      senditBaseUrl: 'https://sendit.ma/tracking',
      speedafBaseUrl: 'https://speedaf.com/tracking',
    },
    
    // UI Configuration
    ui: {
      defaultPageSize: 10,
      maxPageSize: 50,
      toastDuration: 5000, // 5 seconds
    },
    
    // Feature Flags
    features: {
      enableDebugMode: isDevelopment,
      enableAdvancedLogging: isDevelopment,
      enableCityAutoCorrection: true,
    },
  };
};

// Export singleton config
export const config = createConfig();

// Type-safe config access helpers
export const getApiConfig = () => config.api;
export const getTrackingConfig = () => config.tracking;
export const getUIConfig = () => config.ui;
export const getFeatureFlags = () => config.features;

// Environment checks
export const isDev = () => config.isDevelopment;
export const isProd = () => config.isProduction;
