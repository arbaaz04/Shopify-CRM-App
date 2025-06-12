import OpenAI from "openai";
import { getAllStandardCities } from "../utils/cityStandardization";

// Get the configured OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define parameters interface
interface StandardizeAddressParams {
  address: string;
  city?: string;
}

interface StandardizeAddressResult {
  result: string;
  success: boolean;
  error?: string;
}

/**
 * Global function for normalizing Moroccan addresses using GPT-4o-mini
 * This function takes an address and optional city parameter and returns a standardized version
 */
export default async function standardizeMoroccanAddress(
  params: StandardizeAddressParams
): Promise<StandardizeAddressResult> {
  const { address, city = "" } = params;
  
  // If no address is provided, return early
  if (!address) {
    return { result: "", success: false, error: "No address provided" };
  }

  try {
    // Get the list of all standard Moroccan cities to use as our mapping
    const mappingList = getAllStandardCities();
    
    // Create our specialized prompt for address normalization
    const prompt = `
You are a data cleaning and address normalization assistant for Moroccan addresses.

TASK: Analyze the following Moroccan address and match it to a simplified, human-readable region name based on the provided mapping list.

ADDRESS: "${address}"
CITY: "${city}"

MAPPING LIST:
${mappingList.join('\n')}

RULES:
1. If a match is found in both the address and city, prioritize the most specific match.
2. If only the city matches, return the most likely city from the mapping.
3. Normalize names and spelling (e.g., "سلا" → "Salé", "سلا الجديدة" → "Sala El Jadida").
4. Handle Arabic and French transliterations.
5. Ignore irrelevant words like "Rue", "Avenue", "imm", "lot", "appartement", "résidence", etc.
6. Examples of specific rules:
   * "Sala El Jadida" + contains "Maamoura" → "Sala El Jadida - Maamoura"
   * "Casablanca" + contains "Sbata" → "Casablanca - Sbata"
   * If not found in mapping list but city is "Sala El Jadida" → "Sala El Jadida"

Return ONLY the normalized address with no additional text or explanation.`;

    // Call OpenAI API with our specialized prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the specified model
      messages: [
        { role: "system", content: "You are a Moroccan address normalization assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3, // Lower temperature for more consistent results
    });

    // Extract the result
    const result = response.choices[0]?.message?.content?.trim() || "";
    
    // Return the standardized address
    return { 
      result,
      success: true 
    };

  } catch (error: any) {
    console.error("Error in address normalization:", error);
    
    // Return error information for debugging
    return { 
      result: "", 
      success: false,
      error: error.message || "Unknown error during address normalization" 
    };
  }
}; 