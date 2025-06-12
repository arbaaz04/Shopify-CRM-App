/**
 * Simple utility to standardize Moroccan city names
 * This is a fallback when API methods are not available
 */

// Basic map of common misspellings and variations
const CITY_VARIATIONS: Record<string, string> = {
  // Casablanca variations
  "casablanca": "Casablanca",
  "casa": "Casablanca",
  "casa blanca": "Casablanca",
  "dar el beida": "Casablanca",
  "dar beida": "Casablanca",
  "dar albayda": "Casablanca",
  "الدار البيضاء": "Casablanca",
  
  // Rabat variations
  "rabat": "Rabat",
  "rbat": "Rabat",
  "الرباط": "Rabat",
  
  // Marrakech variations
  "marrakech": "Marrakech",
  "marrakesh": "Marrakech",
  "marrakeck": "Marrakech",
  "marakech": "Marrakech",
  "marakesh": "Marrakech",
  "مراكش": "Marrakech",
  
  // Fes variations
  "fes": "Fes",
  "fez": "Fes",
  "fas": "Fes",
  "فاس": "Fes",
  
  // Tangier variations
  "tangier": "Tangier",
  "tanger": "Tangier",
  "tanja": "Tangier",
  "طنجة": "Tangier",
  
  // Agadir variations
  "agadir": "Agadir",
  "agadeer": "Agadir",
  "أكادير": "Agadir",
  
  // Meknes variations
  "meknes": "Meknes",
  "meknas": "Meknes",
  "مكناس": "Meknes",
  
  // Other cities
  "oujda": "Oujda",
  "وجدة": "Oujda",
  "kenitra": "Kenitra",
  "القنيطرة": "Kenitra",
  "tetouan": "Tetouan",
  "تطوان": "Tetouan",
  "safi": "Safi",
  "آسفي": "Safi",
  "mohammedia": "Mohammedia",
  "المحمدية": "Mohammedia",
  "el jadida": "El Jadida",
  "الجديدة": "El Jadida",
  "beni mellal": "Beni Mellal",
  "بني ملال": "Beni Mellal",
  "essaouira": "Essaouira",
  "الصويرة": "Essaouira",
  "sale": "Salé",
  "سلا": "Salé",
  "sala el jadida": "Sala El Jadida",
  "سلا الجديدة": "Sala El Jadida"
};

// List of major Moroccan cities for reference
const MAJOR_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Safi",
  "Mohammedia",
  "El Jadida",
  "Beni Mellal"
];

/**
 * Simple function to standardize Moroccan city names
 * This is a basic implementation that handles common variations
 * 
 * @param cityName The city name to standardize
 * @returns The standardized city name, or the original if no match
 */
export function standardizeCity(cityName: string): string {
  if (!cityName) return "";
  
  // Normalize input: lowercase, trim
  const normalizedInput = cityName.toLowerCase().trim();
  
  // Direct lookup in variations map
  if (CITY_VARIATIONS[normalizedInput]) {
    return CITY_VARIATIONS[normalizedInput];
  }
  
  // Try to match by checking if the input contains a known city name
  for (const [variant, standardName] of Object.entries(CITY_VARIATIONS)) {
    if (normalizedInput.includes(variant)) {
      return standardName;
    }
  }
  
  // Basic fuzzy matching - check if input approximately matches a major city
  // Just look for the first few characters matching
  for (const cityName of MAJOR_CITIES) {
    const lowerCity = cityName.toLowerCase();
    // Match if first 4 characters match (or whole string if shorter)
    const minLength = Math.min(4, lowerCity.length);
    
    if (normalizedInput.substring(0, minLength) === lowerCity.substring(0, minLength)) {
      return cityName;
    }
  }
  
  // If all else fails, capitalize the first letter of each word
  return cityName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Check if a string contains Arabic text
 * @param text The text to check
 * @returns True if the text contains Arabic characters
 */
export function containsArabic(text: string): boolean {
  // Arabic Unicode range
  return /[\u0600-\u06FF]/.test(text);
} 