import { OpenAI } from "openai";
import { getAllStandardCities } from "./utils/cityStandardization";

// Define types for the request and response
interface Request {
  method: string;
  body: {
    cityName?: string;
  };
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

/**
 * API endpoint for standardizing Moroccan city names using OpenAI
 * This endpoint is used by the frontend to standardize city names
 */
export default async function handler(req: Request, res: Response) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      error: "Method not allowed", 
      result: "" 
    });
  }

  try {
    // Get request body
    const { cityName } = req.body || {};

    if (!cityName) {
      return res.status(400).json({ 
        success: false, 
        error: "City name is required", 
        result: "" 
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get the list of standard Moroccan cities
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

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Moroccan city name standardization assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    // Extract result
    const result = response.choices[0]?.message?.content?.trim() || "";

    // Return standardized city
    return res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("Error standardizing city:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error in city standardization",
      result: ""
    });
  }
} 