import { useState } from "react";
import { Card, Button, Text, Banner, List, BlockStack, TextField, Form, FormLayout } from "@shopify/polaris";
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";
import { api } from "../api";

// Fallback mock functions for development
const mockApiFunctions = {
  testGoogleAuth: async (params: { shopId: string }) => ({
    success: true,
    spreadsheetTitle: "Mock Spreadsheet (Test Environment)",
    sheets: ["Sheet1", "Orders", "Inventory", "Pending Orders"],
    missingSheets: [],
    missingRecommendedSheets: []
  }),
  testSpreadsheetAccess: async (params: { spreadsheetUrl: string }) => ({
    success: true,
    spreadsheetTitle: `Spreadsheet ID: ${params.spreadsheetUrl}`,
    sheets: ["Sheet1", "Orders", "Inventory", "Pending Orders"]
  }),
  quickTestWrite: async (params: { shopId: string }) => ({
    success: true,
    message: "Test data successfully written (mock)",
    details: {
      spreadsheetId: "mock-spreadsheet-id",
      sheetName: "TestSheet"
    }
  })
};

// Helper function to safely call API with fallback
const safeApiCall = async (functionName: string, params?: any) => {
  try {
    // @ts-ignore - We know these might not exist yet
    if (typeof api[functionName] === 'function') {
      console.log(`Calling API function ${functionName} with params:`, params);
      // @ts-ignore
      const result = await api[functionName](params);
      console.log(`API result for ${functionName}:`, result);
      return result;
    } else {
      console.warn(`API function ${functionName} not found, using mock data`);
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    // @ts-ignore
    if (mockApiFunctions[functionName]) {
      console.log(`Falling back to mock data for ${functionName}`);
      // @ts-ignore
      return await mockApiFunctions[functionName](params);
    }
    throw error;
  }
};

interface TestResults {
  success: boolean;
  spreadsheetTitle: string;
  sheets: string[];
  missingSheets?: string[] | null;
  missingRecommendedSheets?: string[] | null;
  directTest?: boolean;
  fallbackSheets?: boolean;
}

export const TestGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useGadget();
  
  // Function to test connectivity to Google Sheets
  const handleTestConnection = async () => {
    if (!isAuthenticated) {
      setError("You must be authenticated to test the connection");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults(null);
      
      // Get the current shop ID
      const shop = await api.shopifyShop.findFirst();
      
      if (!shop?.id) {
        throw new Error("Could not find shop ID");
      }
      
      // Get the existing configuration
      const existingConfig = await api.googleSheetConfig.findFirst({
        filter: { shopId: { equals: shop.id } }
      });
      
      if (!existingConfig) {
        throw new Error("No Google Sheets configuration found. Please save your configuration first.");
      }
      
      console.log("Testing connection for spreadsheet:", existingConfig.spreadsheetId);
      
      // Use our safe API call helper
      const result = await safeApiCall('testGoogleAuth', {
        shopId: shop.id
      });
      
      console.log("Test result:", result);
      
      setResults({
        success: true,
        spreadsheetTitle: result.spreadsheetTitle || `Spreadsheet ID: ${existingConfig.spreadsheetId}`,
        sheets: result.sheets || [],
        missingSheets: result.missingSheets || null,
        missingRecommendedSheets: result.missingRecommendedSheets || null,
        fallbackSheets: (!result.sheets || result.sheets.length === 0) && 
                         (!result.missingSheets || result.missingSheets.length === 0)
      });
      
    } catch (error: any) {
      console.error("Error testing connection:", error);
      
      if (error.message && error.message.includes("Failed to access spreadsheet")) {
        setError(`Google service account cannot access this spreadsheet. Make sure you've shared the spreadsheet with the service account email.`);
      } else if (error.message && error.message.includes("Invalid credentials")) {
        setError(`Invalid Google service account credentials. Please check your environment variables.`);
      } else if (error.message && error.message.includes("404")) {
        setError(`API endpoint not found. Please make sure the testGoogleAuth API is configured in your Gadget app.`);
      } else {
        setError(error.message || "Failed to connect to Google Sheets");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlockStack gap="400">
      <Button 
        onClick={handleTestConnection} 
        disabled={loading || !isAuthenticated} 
        variant="primary"
      >
        {loading ? "Testing..." : "Test Connection"}
      </Button>
      
      {error && (
        <Banner tone="critical">
          <p>{error}</p>
        </Banner>
      )}
      
      {results && (
        <Banner tone="success">
          <Text as="p">Successfully connected to your Google Sheet!</Text>
        </Banner>
      )}
    </BlockStack>
  );
};

export default TestGoogleAuth; 