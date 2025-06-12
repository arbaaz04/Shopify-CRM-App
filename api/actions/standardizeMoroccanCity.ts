import { ActionRun } from "gadget-server";
import OpenAI from "openai";
import { getAllStandardCities } from "../utils/cityStandardization";

// Get the configured OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define parameters interface
interface StandardizeCityParams {
  cityName?: string;
}

/**
 * Action to standardize Moroccan city names using GPT-4o-mini
 * This action is designed to be called from the frontend
 */
export const run: ActionRun = async ({ params, logger }) => {
  const { cityName } = params as StandardizeCityParams;
  
  // If no city name is provided, return early
  if (!cityName) {
    return { 
      result: "", 
      success: false, 
      error: "No city name provided" 
    };
  }

  try {
    // Get the list of all standard Moroccan cities to use as our mapping
    const mappingList = getAllStandardCities();
    
    // Create our specialized prompt for city name normalization
    const prompt = `
You are a specialized assistant for standardizing Moroccan city names.

TASK: Analyze the following Moroccan city name and match it to the correct standardized version from the provided list.

CITY NAME: "${cityName}"

STANDARD CITY NAMES:
${mappingList.join('\n')}

RULES:
1. Match the input to the closest standard city name.
2. Handle spelling variations, typos, and transliterations.
3. Convert Arabic names to their standard English/French versions (e.g., "الدار البيضاء" → "Casablanca").
4. If the input matches a neighborhood within a larger city, return the city with the neighborhood 
   (e.g., "Sbata in Casablanca" → "Casablanca - Sbata").
5. If no match is found, return the most likely standardized form.

Return ONLY the standardized city name with no additional text or explanation.`;

    // Call OpenAI API with our specialized prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the specified model
      messages: [
        { role: "system", content: "You are a Moroccan city name standardization assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3, // Lower temperature for more consistent results
    });

    // Extract the result
    const result = response.choices[0]?.message?.content?.trim() || "";
    
    // Return the standardized city name
    return { 
      result,
      success: true 
    };

  } catch (error) {
    logger.error("Error in city standardization:", error);
    
    // Return error information for debugging
    return { 
      result: "", 
      success: false,
      error: error instanceof Error ? error.message : "Unknown error during city standardization"
    };
  }
}; 