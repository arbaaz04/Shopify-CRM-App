import { ActionOptions } from "gadget-server";

/**
 * Test function to verify the extractOriginalCity functionality
 * This action can be called to test if the original city extraction is working correctly
 */
export const run: ActionOptions = async ({ params, logger, api, connections }) => {
  try {
    logger.info("Testing Original City extraction functionality");

    // Test data that matches your JSON format
    const testOrderData = {
      noteAttributes: [
        {
          "name": "Original City",
          "value": "casa"
        },
        {
          "name": "Original Phone",
          "value": "060051100"
        },
        {
          "name": "Original Email",
          "value": "060051100@bambe.ma"
        }
      ]
    };

    // Extract Original City function (copied from extractOrderSKUs.ts)
    function extractOriginalCity(orderData: any): string {
      try {
        if (!orderData || !orderData.noteAttributes) {
          return '';
        }

        // Handle both array and object formats
        let noteAttributes = orderData.noteAttributes;
        if (!Array.isArray(noteAttributes)) {
          return '';
        }

        // Look for the "Original City" name in noteAttributes
        const originalCityAttribute = noteAttributes.find((attr: any) =>
          attr && typeof attr === 'object' && attr.name === 'Original City'
        );

        return originalCityAttribute?.value || '';
      } catch (error) {
        console.error('Error extracting original city:', error);
        return '';
      }
    }

    // Test the extraction
    const extractedCity = extractOriginalCity(testOrderData);
    
    logger.info("Test results", {
      testData: testOrderData.noteAttributes,
      extractedCity: extractedCity,
      success: extractedCity === 'casa'
    });

    return {
      success: true,
      message: "Original City extraction test completed",
      testData: testOrderData.noteAttributes,
      extractedCity: extractedCity,
      testPassed: extractedCity === 'casa',
      expectedValue: 'casa',
      actualValue: extractedCity
    };

  } catch (error) {
    logger.error("Error in test", { error });
    return {
      success: false,
      error: error.message,
      message: "Test failed with error"
    };
  }
};

export const options = {
  actionType: "custom"
};
