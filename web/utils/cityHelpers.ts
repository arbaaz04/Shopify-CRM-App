// City-related utility functions

// Helper function to check if a city is Tanger
export const isTangerCity = (city: string): boolean => {
  if (!city) return false;
  const lowerCity = city.toLowerCase();
  return lowerCity.includes('tanger') || lowerCity.includes('tangier');
};

// Function to get the district ID from Sendit API
export const getSenditDistrictId = async (cityName: string, token: string): Promise<string> => {
  try {
    console.log(`Fetching district ID for city: ${cityName}`);
    const encodedCity = encodeURIComponent(cityName);
    const url = `https://app.sendit.ma/api/v1/districts?querystring=${encodedCity}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRF-TOKEN': ''
      }
    });
    
    const responseData = await response.json();
    console.log(`District API response for ${cityName}:`, responseData);
    
    if (responseData.success && responseData.data && responseData.data.length > 0) {
      // If there's only one result, use it
      if (responseData.data.length === 1) {
        const districtId = responseData.data[0].id.toString();
        console.log(`Found single district ID ${districtId} for city ${cityName}`);
        return districtId;
      }
      
      // If there are multiple results, find the closest match
      console.log(`Found ${responseData.data.length} districts for city ${cityName}, finding best match`);
      
      // Calculate similarity score for each result (lower score is better)
      let bestMatch = responseData.data[0];
      let bestMatchScore = Infinity;
      
      responseData.data.forEach((district: {id: number|string, name?: string, ville?: string}) => {
        const districtName = district.name || district.ville || '';
        // Simple case-insensitive similarity check - exact match gets priority
        if (districtName.toLowerCase() === cityName.toLowerCase()) {
          bestMatch = district;
          bestMatchScore = 0; // Perfect match
          console.log(`Perfect match found: ${districtName}`);
        } else if (bestMatchScore > 0) {
          // Calculate Levenshtein distance as a similarity metric
          const score = levenshteinDistance(districtName.toLowerCase(), cityName.toLowerCase());
          console.log(`District "${districtName}" has similarity score ${score}`);
          
          if (score < bestMatchScore) {
            bestMatch = district;
            bestMatchScore = score;
          }
        }
      });
      
      const districtId = bestMatch.id.toString();
      console.log(`Selected best matching district ID ${districtId} for "${bestMatch.name || bestMatch.ville}" (requested: "${cityName}")`);
      return districtId;
    } else {
      // Instead of returning a default district ID, throw an error
      throw new Error(`No district found for city: ${cityName}`);
    }
  } catch (error) {
    console.error(`Error fetching district ID for ${cityName}:`, error);
    // Propagate the error instead of using a fallback
    throw new Error(`Failed to find district ID for city: ${cityName}`);
  }
};

// Helper function to calculate Levenshtein distance between two strings
// This measures how different two strings are (lower is more similar)
export const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// Format Speedaf city entries to only show area and city (not the codes)
export const formatSpeedafCityForDisplay = (cityEntry: string): string => {
  if (!cityEntry) return '';
  const parts = cityEntry.split(', ');
  if (parts.length < 2) return cityEntry;
  return `${parts[0]}, ${parts[1]}`;
};
