/**
 * Bulk imports blacklisted phone numbers
 * 
 * Parameters:
 * - phoneNumbers: Array of phone numbers to blacklist
 * - shopId: The shop ID to associate the phone numbers with
 */

// Define the action run function type
type ActionRun = (context: { 
  params: { 
    phoneNumbers: string[];
    shopId: string;
  },
  api: any, 
  logger: any
}) => Promise<any>;

// Main action function
export const run: ActionRun = async ({ params, api, logger }) => {
  try {
    // Simple logging first
    logger.info("=== BULK IMPORT START ===");
    logger.info("Raw params received:", params);
    logger.info("Params type:", typeof params);
    logger.info("Params keys:", params ? Object.keys(params) : 'params is null/undefined');
    
    // Extract parameters
    const { phoneNumbers, shopId } = params;
    
    logger.info("Extracted phoneNumbers:", {
      phoneNumbers,
      type: typeof phoneNumbers,
      isArray: Array.isArray(phoneNumbers),
      length: phoneNumbers?.length,
      constructor: phoneNumbers?.constructor?.name
    });
    
    logger.info("Extracted shopId:", shopId);

    // Validate phoneNumbers
    if (phoneNumbers === undefined || phoneNumbers === null) {
      throw new Error("phoneNumbers parameter is missing or null");
    }

    if (!Array.isArray(phoneNumbers)) {
      logger.error("phoneNumbers is not an array!", {
        actual: phoneNumbers,
        type: typeof phoneNumbers,
        stringified: JSON.stringify(phoneNumbers)
      });
      throw new Error(`phoneNumbers must be an array, received ${typeof phoneNumbers}: ${JSON.stringify(phoneNumbers)}`);
    }

    if (phoneNumbers.length === 0) {
      throw new Error("phoneNumbers array is empty");
    }

    if (!shopId) {
      throw new Error("shopId is required");
    }

    // Validate shop exists
    const shop = await api.shopifyShop.findFirst({
      filter: { id: { equals: shopId } }
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    const results = [];
    const errors = [];

    // Process each phone number
    for (const phoneNumber of phoneNumbers) {
      try {
        // Clean phone number for Moroccan format (0XXXXXXXXX)
        let cleanPhone = String(phoneNumber).trim().replace(/[^\d]/g, '');
        
        // Remove country code if present (+212 or 212)
        if (cleanPhone.startsWith('212')) {
          cleanPhone = cleanPhone.substring(3);
        }
        
        // Ensure it starts with 0
        if (!cleanPhone.startsWith('0')) {
          cleanPhone = '0' + cleanPhone;
        }
        
        // Validate length (should be 10 digits for Moroccan numbers)
        if (cleanPhone.length !== 10) {
          errors.push({ phone: phoneNumber, error: "Invalid Moroccan phone number format (should be 10 digits starting with 0)" });
          continue;
        }
        
        if (!cleanPhone) {
          errors.push({ phone: phoneNumber, error: "Invalid phone number format" });
          continue;
        }

        // Check if phone already exists for this shop
        const existingPhone = await api.blacklistedPhone.findFirst({
          filter: {
            phone: { equals: cleanPhone },
            shop: { id: { equals: shopId } }
          }
        });

        if (existingPhone) {
          errors.push({ phone: cleanPhone, error: "Phone number already blacklisted" });
          continue;
        }

        // Create new blacklisted phone
        const blacklistedPhone = await api.blacklistedPhone.create({
          phone: cleanPhone,
          shop: { _link: shopId }
        });

        results.push({
          id: blacklistedPhone.id,
          phone: cleanPhone,
          status: "created"
        });

      } catch (error) {
        logger.error("Error processing phone number", { phoneNumber, error });
        errors.push({ 
          phone: phoneNumber, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }
    }

    logger.info("Bulk import completed", { 
      successful: results.length, 
      failed: errors.length 
    });

    return {
      success: true,
      results,
      errors,
      summary: {
        total: phoneNumbers.length,
        successful: results.length,
        failed: errors.length
      }
    };

  } catch (error) {
    logger.error("Bulk import failed", { error, params });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
