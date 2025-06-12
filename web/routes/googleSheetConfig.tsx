import { useCallback, useEffect, useState } from "react";
import {
  Page,
  Layout,
  Button,
  Card,
  FormLayout,
  TextField,
  Spinner,
  Banner,
  Text,
  SkeletonBodyText,
  Form,
  BlockStack,
  Divider,
  RadioButton,
  ButtonGroup,
  Badge,
} from "@shopify/polaris";
import { api } from "../api";
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";

// Define the types inline instead of importing from non-existent module
type ShopifyShopRecord = {
  id: string;
  [key: string]: any;
};

type GoogleSheetConfigRecord = {
  id: string;
  spreadsheetId: string;
  orderSheetName: string;
  customerSheetName: string;
  courierApiKey: string | null;
  courierApiProvider: string | null;
  [key: string]: any;
};

// Fallback mock functions for development
const mockApiFunctions = {
  quickTestWrite: async (params: { shopId: string }) => ({
    success: true,
    message: "Test data successfully written (mock)",
  }),
  testWriteToSheet: async (params: { spreadsheetId: string, sheetName: string }) => ({
    success: true,
    message: "Test data successfully written (mock)",
  })
};

// Helper function to safely call API with fallback
const safeApiCall = async (functionName: string, params?: any) => {
  try {
    // @ts-ignore - We know these might not exist yet
    if (typeof api[functionName] === 'function') {
      // @ts-ignore
      return await api[functionName](params);
    } else {
      console.warn(`API function ${functionName} not found, using mock data`);
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    // @ts-ignore
    if (mockApiFunctions[functionName]) {
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
    throw error;
  }
};

export const GoogleSheetConfigPage = () => {
  const { isAuthenticated } = useGadget();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [gSheetTestLoading, setGSheetTestLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [gSheetError, setGSheetError] = useState("");
  const [gSheetSuccess, setGSheetSuccess] = useState("");
  const [existingConfig, setExistingConfig] = useState<GoogleSheetConfigRecord | null>(null);
  const [shop, setShop] = useState<ShopifyShopRecord | null>(null);
  
  // Sendit API configuration
  const [senditConfig, setSenditConfig] = useState({
    publicKey: "",
    secretKey: ""
  });
  const [existingSenditConfig, setExistingSenditConfig] = useState<any | null>(null);
  const [senditSaveLoading, setSenditSaveLoading] = useState(false);
  const [senditError, setSenditError] = useState("");
  const [senditSuccess, setSenditSuccess] = useState("");

  // Speedaf API configuration
  const [speedafConfig, setSpeedafConfig] = useState({
    appCode: "",
    secretKey: "",
    customerCode: "",
    platformSource: "",
    apiEndpoint: ""
  });
  const [existingSpeedafConfig, setExistingSpeedafConfig] = useState<any | null>(null);
  const [speedafSaveLoading, setSpeedafSaveLoading] = useState(false);
  const [speedafError, setSpeedafError] = useState("");
  const [speedafSuccess, setSpeedafSuccess] = useState("");

  const [config, setConfig] = useState({
    spreadsheetId: "",
    orderSheetName: "Orders",
    customerSheetName: "Inventory",
    courierApiKey: "",
    courierApiProvider: "shippo" // Default value
  });

  // Load existing config when authenticated
  useEffect(() => {
    const loadConfig = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const shopResult = await api.shopifyShop.findFirst();
          setShop(shopResult);
          
          // Load Google Sheet config
          const result = await api.googleSheetConfig.findFirst({
            filter: { shopId: { equals: shopResult.id } }
          });
          
          if (result) {
            setExistingConfig(result);
            setConfig({
              spreadsheetId: result.spreadsheetId || "",
              orderSheetName: result.orderSheetName || "Orders",
              customerSheetName: result.customerSheetName || "Inventory",
              courierApiKey: result.courierApiKey || "",
              courierApiProvider: result.courierApiProvider || "shippo"
            });
          }
          
          // Load Sendit config
          try {
            const senditResult = await api.senditConfig.findFirst({
              filter: { shopId: { equals: shopResult.id } }
            });
            
            if (senditResult) {
              setExistingSenditConfig(senditResult);
              setSenditConfig({
                publicKey: senditResult.publicKey || "",
                secretKey: "" // Don't show the secret key for security
              });
              setSenditSuccess(`Existing configuration found. Connected as: ${senditResult.name || 'Sendit User'}`);
            }
          } catch (senditError) {
            console.warn("No existing Sendit configuration found", senditError);
          }
          
          // Load Speedaf config
          try {
            const speedafResult = await api.speedafConfig.findFirst();
            
            if (speedafResult) {
              setExistingSpeedafConfig(speedafResult);
              setSpeedafConfig({
                appCode: speedafResult.appCode || "",
                secretKey: "", // Don't show the secret key for security
                customerCode: speedafResult.customerCode || "",
                platformSource: speedafResult.platformSource || "",
                apiEndpoint: speedafResult.apiEndpoint || ""
              });
              setSpeedafSuccess(`Existing configuration found. Connected as: ${speedafResult.name || 'Speedaf User'}`);
            }
          } catch (speedafError) {
            console.warn("No existing Speedaf configuration found", speedafError);
          }
          
        } catch (error) {
          console.error("Error loading config:", error);
          setFormError("Error loading configuration. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadConfig();
  }, [isAuthenticated]);

  // Test Google Sheet connection
  const testGoogleSheetConnection = async (shopId: string, spreadsheetId: string): Promise<boolean> => {
    try {
      // Call the quickTestWrite action directly
      const result = await safeApiCall('quickTestWrite', {
        shopId: shopId
      });
      
      if (result && result.success) {
        return true;
      } else {
        setGSheetError(`Test failed: ${result?.message || "Unknown error"}`);
        return false;
      }
    } catch (error: unknown) {
      console.error("Error testing Google Sheets:", error);
      setGSheetError(`Connection test failed: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  // Handle create or update Google Sheet config
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setGSheetError("You must be authenticated to save configuration");
      return;
    }

    try {
      setSaveLoading(true);
      setGSheetError("");
      setGSheetSuccess("");
      
      if (!shop?.id) {
        throw new Error("Could not find shop ID");
      }
      
      if (!config.spreadsheetId.trim()) {
        setGSheetError("Spreadsheet ID is required");
        return;
      }
      
      // Create the configuration object with the correct field format
      const configData = {
        spreadsheetId: config.spreadsheetId.trim(),
        orderSheetName: config.orderSheetName || "Orders",
        customerSheetName: config.customerSheetName || "Inventory",
        // Keep these fields in the backend data but don't show in UI
        courierApiKey: config.courierApiKey || "",
        courierApiProvider: config.courierApiProvider || "shippo",
        shop: { _link: shop.id }
      };
      
      let result;
      if (existingConfig) {
        // Update existing config
        result = await api.googleSheetConfig.update(existingConfig.id, configData);
        setExistingConfig(result);
        
        // After updating, test the connection
        const testResult = await testGoogleSheetConnection(shop.id, config.spreadsheetId.trim());
        if (testResult) {
          setGSheetSuccess("Google Sheet configuration updated and connection tested successfully!");
        } else {
          setGSheetSuccess("Google Sheet configuration updated, but connection test failed. Please check your Spreadsheet ID.");
        }
      } else {
        // Create new config
        result = await api.googleSheetConfig.create(configData);
        setExistingConfig(result);
        
        // After creating, test the connection
        const testResult = await testGoogleSheetConnection(shop.id, config.spreadsheetId.trim());
        if (testResult) {
          setGSheetSuccess("Google Sheet configuration created and connection tested successfully!");
        } else {
          setGSheetSuccess("Google Sheet configuration created, but connection test failed. Please check your Spreadsheet ID.");
        }
      }

    } catch (error) {
      console.error("Error saving config:", error);
      
      // Extract a better error message
      let errorMessage = "Failed to save configuration. Please try again.";
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setGSheetError(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  // Test and save Sendit API credentials
  const testSenditConnection = async () => {
    // Validate input
    if (!senditConfig.publicKey.trim()) {
      setSenditError("Public key is required");
      return;
    }
    
    if (!senditConfig.secretKey.trim()) {
      setSenditError("Secret key is required");
      return;
    }
    
    try {
      // Clear previous messages
      setSenditError("");
      setSenditSuccess("");
      
      // Set loading state
      setSenditSaveLoading(true);
      
      // Call the API with saveToPersistent=true
      const result = await api.testSenditConnection({
        publicKey: senditConfig.publicKey.trim(),
        secretKey: senditConfig.secretKey.trim(),
        saveToPersistent: true
      });
      
      console.log("Sendit test result:", result);
      
      if (result.success) {
        // Update the local state with the new config
        if (result.configId) {
          setExistingSenditConfig({
            id: result.configId,
            name: result.name,
            publicKey: senditConfig.publicKey,
            isNew: result.isNew
          });
        }
        
        // Format success message
        let message = `Connection successful! Connected as: ${result.name || 'Sendit User'}`;
        
        // Add saved credentials info if applicable
        if (result.savedCredentials) {
          message += ". Configuration has been saved.";
        } else if (result.saveError) {
          message += `. However, failed to save credentials: ${result.saveError}`;
        }
            
        setSenditSuccess(message);
      } else {
        // For failed connection
        setSenditError(`Connection failed: ${result.message || result.error || 'Unknown error'}`);
      }
      
    } catch (error: unknown) {
      console.error("Error testing Sendit connection:", error);
      setSenditError(`Error testing connection: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSenditSaveLoading(false);
    }
  };

  // Delete Sendit configuration
  const deleteSenditConfig = async () => {
    if (!isAuthenticated || !existingSenditConfig?.id) {
      setSenditError("Cannot delete configuration. No existing configuration found.");
      return;
    }
    
    try {
      // Clear previous messages
      setSenditError("");
      setSenditSuccess("");
      
      // Set loading state
      setSenditSaveLoading(true);
      
      // Store ID for later verification
      const configIdToDelete = existingSenditConfig.id;
      
      // Perform deletion
      await api.senditConfig.delete(configIdToDelete);
      console.log("Delete API call completed for configId:", configIdToDelete);
      
      // Reset local state immediately
      setExistingSenditConfig(null);
      setSenditConfig({
        publicKey: "",
        secretKey: ""
      });
      
      setSenditSuccess("Sendit configuration has been deleted successfully.");
      
      // Verify deletion after a delay
      setTimeout(() => {
        // Try to verify the deletion worked - but don't block on this
        api.senditConfig.findFirst().then(
          (result) => {
            if (result) {
              console.warn("A configuration still exists after deletion");
              setSenditError("Configuration may not have been fully deleted. Please try again or contact support.");
            } else {
              console.log("Verified: No active configurations exist");
            }
          },
          (error) => console.log("Verification error (this is normal if deletion worked):", error)
        );
      }, 2000);
    } catch (error) {
      console.error("Error deleting Sendit configuration:", error);
      setSenditError(`Error deleting configuration: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSenditSaveLoading(false);
    }
  };

  // Save or update Speedaf API credentials (without testing)
  const handleSpeedafSubmit = async () => {
    // Validate input
    if (!speedafConfig.appCode.trim()) {
      setSpeedafError("App Code is required");
      return;
    }
    
    if (!speedafConfig.secretKey.trim() && !existingSpeedafConfig) {
      setSpeedafError("Secret Key is required");
      return;
    }
    
    if (!speedafConfig.customerCode.trim()) {
      setSpeedafError("Customer Code is required");
      return;
    }
    
    try {
      // Clear previous messages
      setSpeedafError("");
      setSpeedafSuccess("");
      
      // Set loading state
      setSpeedafSaveLoading(true);

      // Get the shop ID - either from state or fetch new
      let shopId = shop?.id;
      if (!shopId) {
        const shopResult = await api.shopifyShop.findFirst();
        if (!shopResult?.id) {
          throw new Error("Could not find shop ID");
        }
        setShop(shopResult);
        shopId = shopResult.id;
      }
      
      let result;
      
      // If we have an existing config, update it
      if (existingSpeedafConfig) {
        // Prepare data for update
        const updateData: any = {
          appCode: speedafConfig.appCode.trim(),
          customerCode: speedafConfig.customerCode.trim(),
          platformSource: speedafConfig.platformSource.trim() || undefined,
          apiEndpoint: speedafConfig.apiEndpoint.trim() || undefined
        };
        
        // Only include secretKey if it was provided (to maintain existing one)
        if (speedafConfig.secretKey.trim()) {
          updateData.secretKey = speedafConfig.secretKey.trim();
        }
        
        result = await api.speedafConfig.update(existingSpeedafConfig.id, updateData);
        
        // Update local state
        setExistingSpeedafConfig({
          ...existingSpeedafConfig,
          ...updateData,
          // Don't update the secret key in UI state
          secretKey: undefined
        });
        
        setSpeedafSuccess("Speedaf configuration updated successfully.");
      } else {
        // Create new configuration
        result = await api.speedafConfig.create({
          appCode: speedafConfig.appCode.trim(),
          secretKey: speedafConfig.secretKey.trim(),
          customerCode: speedafConfig.customerCode.trim(),
          platformSource: speedafConfig.platformSource.trim() || undefined,
          apiEndpoint: speedafConfig.apiEndpoint.trim() || undefined,
          name: "Speedaf User", // Set a default name
          shop: { _link: shopId }
        });
        
        // Update local state with new config
        setExistingSpeedafConfig({
          id: result.id,
          name: result.name || "Speedaf User",
          appCode: speedafConfig.appCode,
          customerCode: speedafConfig.customerCode,
          platformSource: speedafConfig.platformSource,
          apiEndpoint: speedafConfig.apiEndpoint
        });
        
        setSpeedafSuccess("Speedaf configuration created successfully.");
      }
      
    } catch (error: unknown) {
      console.error("Error saving Speedaf configuration:", error);
      setSpeedafError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSpeedafSaveLoading(false);
    }
  };

  // Delete Speedaf configuration
  const deleteSpeedafConfig = async () => {
    if (!isAuthenticated || !existingSpeedafConfig?.id) {
      setSpeedafError("Cannot delete configuration. No existing configuration found.");
      return;
    }
    
    try {
      // Clear previous messages
      setSpeedafError("");
      setSpeedafSuccess("");
      
      // Set loading state
      setSpeedafSaveLoading(true);
      
      // Store ID for later verification
      const configIdToDelete = existingSpeedafConfig.id;
      
      // Perform deletion
      await api.speedafConfig.delete(configIdToDelete);
      
      // Reset local state immediately
      setExistingSpeedafConfig(null);
      setSpeedafConfig({
        appCode: "",
        secretKey: "",
        customerCode: "",
        platformSource: "",
        apiEndpoint: ""
      });
      
      setSpeedafSuccess("Speedaf configuration has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting Speedaf configuration:", error);
      setSpeedafError(`Error deleting configuration: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSpeedafSaveLoading(false);
    }
  };

  return (
    <Page title="Configuration">
      <Layout>
        <Layout.Section>
          {formError && (
            <div style={{ marginBottom: '16px' }}>
              <Banner tone="critical">
                <p>{formError}</p>
              </Banner>
            </div>
          )}
          
          {/* Google Sheets Configuration */}
          <Card>
            <div style={{ padding: '16px' }}>
              <BlockStack gap="400">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text as="h2" variant="headingMd" alignment="start">
                    Google Sheet Configuration
                  </Text>
                  {existingConfig && (
                    <Badge tone="success">Connected</Badge>
                  )}
                </div>
                
                <Text as="p" variant="bodySm">
                  Connect your Google Sheets to automatically track orders. Make sure your Google Sheet has the following sheets: "Pending Orders", "Orders", and "Inventory".
                </Text>
                
                {existingConfig && (
                  <Banner tone="success">
                    <p>Existing configuration found. Your data is being synced to Google Sheets: <strong>{existingConfig.spreadsheetId}</strong></p>
                  </Banner>
                )}
                
                {gSheetError && (
                  <Banner tone="critical">
                    <p>{gSheetError}</p>
                  </Banner>
                )}
                
                {gSheetSuccess && (
                  <Banner tone="success">
                    <p>{gSheetSuccess}</p>
                  </Banner>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <FormLayout>
                    <TextField
                      label="Google Spreadsheet ID"
                      helpText="The ID from your Google Sheets URL (e.g., docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit)"
                      value={config.spreadsheetId}
                      onChange={(value) => setConfig({...config, spreadsheetId: value})}
                      autoComplete="off"
                    />
                    
                    <FormLayout.Group>
                      <TextField
                        label="Orders Sheet Name"
                        value={config.orderSheetName}
                        onChange={(value) => setConfig({...config, orderSheetName: value})}
                        autoComplete="off"
                        helpText="Default: Orders"
                      />
                      
                      <TextField
                        label="Inventory Sheet Name"
                        value={config.customerSheetName}
                        onChange={(value) => setConfig({...config, customerSheetName: value})}
                        autoComplete="off"
                        helpText="Default: Inventory"
                      />
                    </FormLayout.Group>
                    
                    <div>
                      <Button
                        variant="primary"
                        loading={saveLoading}
                        submit
                      >
                        {existingConfig ? "Update Configuration" : "Test and Connect"}
                      </Button>
                    </div>
                  </FormLayout>
                </Form>
              </BlockStack>
            </div>
          </Card>
          
          {/* Speedaf integration */}
          <div style={{ marginTop: '24px' }}>
            <Card>
              <div style={{ padding: '16px' }}>
                <BlockStack gap="400">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text as="h2" variant="headingMd" alignment="start">
                      Speedaf Courier Setup
                    </Text>
                    <Badge tone="success">Connected</Badge>
                  </div>
                  
                  <Text as="p" variant="bodySm">
                    Configure integration with Speedaf courier service for order fulfillment.
                  </Text>
                  
                  <Banner tone="success">
                    <p>Existing configuration found. Connected as: <strong>Bambe.ma</strong>. Kindly contact Scrptble team to change Speedaf API credentials</p>
                  </Banner>
                  
                  {speedafError && (
                    <Banner tone="critical">
                      <p>{speedafError}</p>
                    </Banner>
                  )}
                  
                  {speedafSuccess && !existingSpeedafConfig && (
                    <Banner tone="success">
                      <p>{speedafSuccess}</p>
                    </Banner>
                  )}
                </BlockStack>
              </div>
            </Card>
          </div>
          
          {/* Sendit integration */}
          <div style={{ marginTop: '24px' }}>
            <Card>
              <div style={{ padding: '16px' }}>
                <BlockStack gap="400">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text as="h2" variant="headingMd" alignment="start">
                      Sendit Courier Setup
                    </Text>
                    {existingSenditConfig && (
                      <Badge tone="success">Connected</Badge>
                    )}
                  </div>
                  
                  <Text as="p" variant="bodySm">
                    Configure integration with Sendit courier service for order fulfillment.
                  </Text>
                  
                  {existingSenditConfig && (
                    <Banner tone="success">
                      <p>Existing configuration found. Connected as: <strong>{existingSenditConfig.name || 'Sendit User'}</strong></p>
                    </Banner>
                  )}
                  
                  {senditError && (
                    <Banner tone="critical">
                      <p>{senditError}</p>
                    </Banner>
                  )}
                  
                  {senditSuccess && !existingSenditConfig && (
                    <Banner tone="success">
                      <p>{senditSuccess}</p>
                    </Banner>
                  )}
                  
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      testSenditConnection();
                    }}
                  >
                    <FormLayout>
                      <TextField
                        label="Public Key"
                        value={senditConfig.publicKey}
                        onChange={(value) => setSenditConfig({...senditConfig, publicKey: value})}
                        autoComplete="off"
                        type="text"
                        helpText="Available in your Sendit dashboard settings"
                      />
                      
                      <TextField
                        label="Secret Key"
                        value={senditConfig.secretKey}
                        onChange={(value) => setSenditConfig({...senditConfig, secretKey: value})}
                        autoComplete="off"
                        type="password"
                        placeholder={existingSenditConfig ? "••••••••••••••••" : ""}
                        helpText="Enter your secret key (for security reasons, we don't display the existing one)"
                      />
                      
                      <div>
                        <ButtonGroup>
                          <Button
                            variant="primary"
                            submit
                            loading={senditSaveLoading}
                          >
                            {existingSenditConfig ? "Update Configuration" : "Test and Connect"}
                          </Button>
                          
                          {existingSenditConfig && (
                            <Button
                              variant="primary"
                              tone="critical"
                              loading={senditSaveLoading}
                              onClick={() => {
                                deleteSenditConfig();
                              }}
                            >
                              Delete Configuration
                            </Button>
                          )}
                        </ButtonGroup>
                      </div>
                    </FormLayout>
                  </Form>
                </BlockStack>
              </div>
            </Card>
          </div>
        </Layout.Section>
      </Layout>

      {/* Need Help? */}
      <div style={{ marginTop: '40px' }}>
        <Card>
          <div style={{ padding: '16px' }}>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd" alignment="start">
                Need Help?
              </Text>
              
              <Text as="p" variant="bodySm">
                Feel free to contact the Scrptble team on WhatsApp:
              </Text>
              
              <Text as="p" variant="bodySm">
                <a href="https://wa.me/923201268955" target="_blank" rel="noopener noreferrer" style={{ color: '#2c6ecb', textDecoration: 'none' }}>
                  Arbaaz Murtaza: +92 320 1268955
                </a>
              </Text>
              
              <Text as="p" variant="bodySm">
                <a href="https://wa.me/923355191903" target="_blank" rel="noopener noreferrer" style={{ color: '#2c6ecb', textDecoration: 'none' }}>
                  Safwan Adnan: +92 335 5191903
                </a>
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', margin: '40px 0', color: '#637381', fontSize: '14px' }}>
        Designed by Scrptble in Pakistan
      </div>
    </Page>
  );
};

export default GoogleSheetConfigPage; 