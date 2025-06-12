/**
* A map from configuration value name to value all the configuration values and secrets in bambe-crm-app.
* __Note__: Any encrypted configuration values are decrypted and ready for use in this map.
*/
export interface AppConfiguration {
  GADGET_ENV: string | undefined;
  GADGET_APP: string | undefined;
  /**
  * The value for the NODE_ENV environment variable set in the Gadget Environment Variables settings section. 
  */
  NODE_ENV: string | undefined;
  /**
  * The value for the GOOGLE_SERVICE_ACCOUNT_KEY environment variable set in the Gadget Environment Variables settings section. 
  */
  GOOGLE_SERVICE_ACCOUNT_KEY: string | undefined;
  /**
  * The value for the SHOPIFY_WEBHOOK_SECRET environment variable set in the Gadget Environment Variables settings section. Decrypted from the encrypted value for use here.
  */
  SHOPIFY_WEBHOOK_SECRET: string | undefined;
  /**
  * The value for the SENDIT_API_KEY environment variable set in the Gadget Environment Variables settings section. 
  */
  SENDIT_API_KEY: string | undefined;
  /**
  * The value for the NODE_OPTIONS environment variable set in the Gadget Environment Variables settings section. 
  */
  NODE_OPTIONS: string | undefined;
  /**
  * The value for the OPENAI_API_KEY environment variable set in the Gadget Environment Variables settings section. 
  */
  OPENAI_API_KEY: string | undefined;
};


declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppConfiguration {
    }
  }
}
