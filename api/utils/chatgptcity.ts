/**
 * ChatGPT integration for standardizing Moroccan city names
 * Uses direct HTTP requests to OpenAI API
 */

// Simple in-memory cache for GPT results to avoid redundant API calls
const gptCache: Record<string, string> = {};

/**
 * Helper for consistent log formatting
 */
function logDebug(context: string, message: string): void {
  console.log(`[GPT-DEBUG][${context}] ${message}`);
}

function logError(context: string, message: string, error?: any): void {
  console.error(`[GPT-ERROR][${context}] ${message}`);
  if (error) {
    console.error(`[GPT-ERROR][${context}] Error details:`, error);
    if (error.stack) {
      console.error(`[GPT-ERROR][${context}] Stack trace:`, error.stack);
    }
  }
}

/**
 * Standardize a city name using OpenAI API with direct HTTP request
 * @param cityName The city name to standardize
 * @param mappingList List of valid city names to match against
 * @returns The standardized city name from OpenAI or null if API call fails
 */
export async function standardizeWithGPT(
  cityName: string, 
  mappingList: string[]
): Promise<string | null> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  logDebug(requestId, `Starting standardization for city: "${cityName}"`);
  logDebug(requestId, `Mapping list contains ${mappingList.length} cities`);
  
  try {
    // Basic validation
    if (!cityName || typeof cityName !== 'string') {
      logError(requestId, `Invalid city name provided: ${typeof cityName}, value: ${cityName}`);
      return null;
    }

    const trimmedCityName = cityName.trim();
    logDebug(requestId, `Trimmed city name: "${trimmedCityName}"`);
    
    // Check cache first
    if (gptCache[trimmedCityName]) {
      logDebug(requestId, `Using cached result for "${trimmedCityName}": "${gptCache[trimmedCityName]}"`);
      return gptCache[trimmedCityName];
    }
    
    // If no OpenAI API key is set, return null
    if (!process.env.OPENAI_API_KEY) {
      logError(requestId, `OpenAI API key not set. Unable to standardize "${trimmedCityName}"`);
      return null;
    }
    
    // Log if the city contains Arabic characters
    const containsArabic = /[\u0600-\u06FF]/.test(trimmedCityName);
    logDebug(requestId, `City "${trimmedCityName}" contains Arabic: ${containsArabic}`);
    
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    logDebug(requestId, `Will call OpenAI API at: ${apiUrl}`);
    
    // Enhanced prompt with special handling for Arabic
    const prompt = `You are a data cleaning and normalization assistant for Moroccan cities.

TASK: Standardize the following Moroccan city name and match it to the closest city from the provided mapping list.

CITY: "${trimmedCityName}"

MAPPING LIST:
${mappingList.join('\n')}

RULES:
1. Find the most accurate match from the mapping list.
2. Handle spelling variations and typos.
3. Normalize names (e.g., "سلا" → "Salé", "الدار البيضاء" → "Casablanca", "سيدي بنور" → "Sidi Bennour").
4. Handle Arabic and French transliterations.
5. Match case sensitivity and exact spacing from the mapping list.
6. If the city exists in different regions (like "Casablanca - Anfa" and "Casablanca - Maarif"), return the base city name.
7. IMPORTANT: For Arabic names, ensure you translate them to their English equivalents found in the mapping list.

Return ONLY the standardized city name with no additional text or explanation.`;

    // Prepare the payload
    const payload = {
      'model': 'gpt-4o-mini',
      'messages': [
        {'role': 'system', 'content': 'You are a city name standardization assistant for Moroccan addresses.'},
        {'role': 'user', 'content': prompt}
      ],
      'max_tokens': 100,
      'temperature': 0.2
    };

    logDebug(requestId, `Prepared OpenAI request with prompt length: ${prompt.length} characters`);
    logDebug(requestId, `Using model: ${payload.model}, temperature: ${payload.temperature}`);
    
    const startTime = Date.now();
    logDebug(requestId, `Starting API call at ${new Date(startTime).toISOString()}`);
    
    try {
      // Make the API call using fetch
      logDebug(requestId, `Sending HTTP request to OpenAI API...`);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      
      const endTime = Date.now();
      const durationSec = (endTime - startTime) / 1000;
      logDebug(requestId, `API call completed in ${durationSec.toFixed(2)} seconds with status: ${response.status}`);
      
      // Try to parse the response as JSON
      let json;
      let responseBody = '';
      
      try {
        // First save the raw response text
        responseBody = await response.text();
        logDebug(requestId, `Raw response body (first 200 chars): ${responseBody.substring(0, 200)}`);
        
        // Then try to parse it as JSON
        json = JSON.parse(responseBody);
        logDebug(requestId, `Successfully parsed response as JSON with keys: ${Object.keys(json).join(', ')}`);
      } catch (parseError) {
        logError(requestId, `Failed to parse response as JSON`, parseError);
        logDebug(requestId, `Raw response body: ${responseBody}`);
        return null;
      }
      
      // Check for errors
      if (!response.ok || json.error) {
        const errorMessage = json.error?.message || `HTTP error! status: ${response.status}`;
        logError(requestId, `OpenAI API error: ${errorMessage}`);
        if (json.error) {
          logDebug(requestId, `Full error object: ${JSON.stringify(json.error)}`);
        }
        return null;
      }
      
      // Extract the result with robust checking
      if (!json.choices || !json.choices.length) {
        logError(requestId, `Unexpected response format - no choices array in response`);
        logDebug(requestId, `Response structure: ${JSON.stringify(json)}`);
        return null;
      }
      
      logDebug(requestId, `Received ${json.choices.length} choices in response`);
      
      const rawContent = json.choices[0]?.message?.content;
      logDebug(requestId, `Raw content from first choice: "${rawContent}"`);
      
      const result = rawContent?.trim() || null;
      
      if (result) {
        logDebug(requestId, `Standardized city result: "${result}" for input "${trimmedCityName}"`);
        
        // Special case for Arabic names: check if result seems valid
        if (containsArabic && (!result || result === "Unknown")) {
          logDebug(requestId, `Potential issue with Arabic name "${trimmedCityName}" - got "${result}"`);
          
          // Fallback for known Arabic cities
          if (trimmedCityName === "سيدي بنور") {
            const fallbackResult = "Sidi Bennour";
            logDebug(requestId, `Using fallback for "${trimmedCityName}" → "${fallbackResult}"`);
            gptCache[trimmedCityName] = fallbackResult;
            return fallbackResult;
          }
        }
        
        // Store in cache for future use
        logDebug(requestId, `Caching result "${result}" for city "${trimmedCityName}"`);
        gptCache[trimmedCityName] = result;
        return result;
      } else {
        logError(requestId, `No valid content received for "${trimmedCityName}"`);
        logDebug(requestId, `Full response: ${JSON.stringify(json)}`);
        return null;
      }
    } catch (fetchError) {
      logError(requestId, `Network or fetch error during API call`, fetchError);
      return null;
    }
  } catch (error) {
    logError(requestId, `Unexpected error in standardization process for "${cityName}"`, error);
    return null;
  }
}

/**
 * Get the cache of previously standardized cities
 * Useful for debugging or exporting cache data
 */
export function getGPTCache(): Record<string, string> {
  console.log(`[GPT] Current cache contains ${Object.keys(gptCache).length} entries`);
  return { ...gptCache };
}

/**
 * Common Arabic city names mapping
 * Used as a fallback when the API fails
 */
const ARABIC_CITY_FALLBACKS: Record<string, string> = {
  "سيدي بنور": "Sidi Bennour",
  "الدار البيضاء": "Casablanca",
  "سلا": "Sale",
  "سلا الجديدة": "Sala El Jadida",
  "الرباط": "Rabat",
  "مراكش": "Marrakech",
  "فاس": "Fes",
  "مكناس": "Meknes",
  "طنجة": "Tanger"
}; 