import { google } from "googleapis";
import { ActionOptions } from "gadget-server";
import { standardizeMoroccanCitySync } from "../utils/cityStandardization";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  try {
    // Get the service account credentials from environment variables
    const serviceAccountCredentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}");
    
    // Log the start of the operation
    logger.info("Starting to write test data to Google Sheet", { 
      spreadsheetId: params.spreadsheetId,
      sheetName: params.sheetName
    });
    
    // Create JWT client using service account
    const auth = new google.auth.JWT({
      email: serviceAccountCredentials.client_email,
      key: serviceAccountCredentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    // Create the Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Create test data - current timestamp plus some sample fields
    const today = new Date();
    const formattedDate = [
      String(today.getDate()).padStart(2, '0'),
      String(today.getMonth() + 1).padStart(2, '0'),
      today.getFullYear()
    ].join('/');

    // Function to format Moroccan phone numbers
    function formatMoroccanPhoneNumber(phone: string): string {
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
    
    // Test order data
    const testOrder = {
      id: "test-order-123",
      lineItems: [{
        sku: "TEST-SKU-123"
      }],
      shippingAddress: {
        firstName: "Test",
        lastName: "Customer",
        address1: "123 Test Street",
        address2: "Apt 4B",
        city: "Casablanca",
        province: "Grand Casablanca",
        zip: "20000",
        country: "Morocco",
        phone: "+212 6-07-71-81-35"
      }
    };
    
    // Use the imported function instead
    standardizeMoroccanCitySync(testOrder.shippingAddress?.city || "")
    
    // Format the order data (using the same ID as Orders sheet)
    const orderData = [
      formattedDate, // Date in DD/MM/YYYY format
      "", // Order Code (empty until posted)
      "FALSE", // Post checkbox (unchecked)
      testOrder.lineItems?.[0]?.sku || "", // SKU
      `${testOrder.shippingAddress?.firstName || ""} ${testOrder.shippingAddress?.lastName || ""}`.trim(), // Full name
      [
        testOrder.shippingAddress?.address1 || "",
        testOrder.shippingAddress?.address2 || "",
        testOrder.shippingAddress?.city || "",
        testOrder.shippingAddress?.province || "",
        testOrder.shippingAddress?.zip || "",
        testOrder.shippingAddress?.country || ""
      ].filter(Boolean).join(", "), // Address
      formatMoroccanPhoneNumber(testOrder.shippingAddress?.phone || ""), // Phone (formatted for Morocco)
      standardizeMoroccanCitySync(testOrder.shippingAddress?.city || "") // City (standardized)
    ];
    
    // Check if the sheet exists first
    try {
      logger.info("Checking if sheet exists");
      const sheetMetadata = await sheets.spreadsheets.get({
        spreadsheetId: params.spreadsheetId,
        fields: 'sheets.properties.title'
      });
      
      const existingSheets = sheetMetadata.data.sheets?.map(sheet => sheet.properties?.title);
      logger.info(`Existing sheets: ${existingSheets?.join(", ")}`); 
      
      // If the sheet doesn't exist, create it
      if (!existingSheets?.includes(params.sheetName)) {
        logger.info(`Sheet '${params.sheetName}' doesn't exist, creating it...`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: params.spreadsheetId,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: params.sheetName
                }
              }
            }]
          }
        });
        logger.info(`Created new sheet: ${params.sheetName}`);
      }
    } catch (error) {
      logger.error("Error checking/creating sheet", { error });
      throw new Error(`Failed to check or create sheet: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    // Get the current data to find the next available row
    const getValuesResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: params.spreadsheetId,
      range: `${params.sheetName}!B:B` // Check column B instead of A to find empty rows
    });
    
    const values = getValuesResponse.data.values || [];
    
    // Find the first empty row in column B (Date column)
    // Start from row 6 (after headers at row 5)
    let nextRow = 6;
    for (let i = 5; i < values.length; i++) { // Start from index 5 (row 6)
      if (!values[i] || !values[i][0] || values[i][0].trim() === '') {
        nextRow = i + 1; // Convert to 1-based row number
        break;
      }
    }
    
    // If we didn't find an empty row, use the next row after the last one
    if (nextRow === 6 && values.length > 5) {
      nextRow = values.length + 1;
    }
    
    logger.info("Found empty row for new data", { 
      nextRow,
      totalRows: values.length
    });
    
    // Write the data to the spreadsheet (columns B through I)
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: params.spreadsheetId,
      range: `${params.sheetName}!B${nextRow}:I${nextRow}`, // Write to columns B-I
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [orderData]
      }
    });
    
    // Get the sheet ID first
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: params.spreadsheetId,
      ranges: [`${params.sheetName}!A1`],
      includeGridData: false
    });
    
    const sheetId = spreadsheet.data.sheets?.find(sheet => sheet.properties?.title === params.sheetName)?.properties?.sheetId;
    
    if (!sheetId) {
      throw new Error(`Could not find sheet ID for sheet: ${params.sheetName}`);
    }
    
    // Set the checkbox format for column D (Post column)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: params.spreadsheetId,
      requestBody: {
        requests: [{
          repeatCell: {
            range: {
              sheetId: sheetId,
              startRowIndex: nextRow - 1, // Convert to 0-based index
              endRowIndex: nextRow,
              startColumnIndex: 3, // Column D (0-based)
              endColumnIndex: 4
            },
            cell: {
              userEnteredValue: {
                boolValue: false
              },
              dataValidation: {
                condition: {
                  type: 'BOOLEAN'
                }
              }
            },
            fields: 'userEnteredValue,dataValidation'
          }
        }]
      }
    });
    
    logger.info("Successfully wrote test data to Google Sheet", { 
      updatedRange: response.data.updatedRange,
      updatedCells: response.data.updatedCells
    });
    
    // Test function for city standardization
    function testCityStandardization() {
      const testCases = [
        "casa",
        "Dar el beida",
        "casablanca",
        "Casblanca",
        "CASABLANCA",
        "Rbat",
        "Rabát",
        "marrakech",
        "Marrakesh"
      ];
      
      testCases.forEach(input => {
        const result = standardizeMoroccanCitySync(input);
        logger.info(`Standardized city: ${input} -> ${result}`);
      });
    }

    // Run the test
    testCityStandardization();
    
    return {
      success: true,
      message: "Test data successfully written",
      details: {
        updatedRange: response.data.updatedRange,
        updatedCells: response.data.updatedCells
      }
    };
  } catch (error) {
    logger.error("Error writing test data to Google Sheet", { error });
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      details: error
    };
  }
};

export const params = {
  spreadsheetId: {
    type: "string",
    // Using a placeholder - you should replace with your actual test spreadsheet ID
    default: "1dtL5HecSxi2wbNE8g-0BKYgFv47H30AWYI_QLPLCcK4"
  },
  sheetName: {
    type: "string",
    default: "TestSheet"
  }
};

export const options: ActionOptions = {
  triggers: { api: true },
  returnType: true
};