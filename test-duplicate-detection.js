// Test the improved duplicate detection logic
const DEFAULT_SPEEDAF_CITIES = [
  "SEMARA, essemara, MAA04356, MAC00099",
  "RAHMA, Nouaceur, MAA04355, MAC00059",
  "ROCHE NOIR, casablanca, MAA04354, MAC00070",
  "VILLE IBN BATOUTA, Tanger, MAA03547, MAC00036",
  "SOUQ KHEMIS SAHEL, Tanger, MAA03499, MAC00036",
  "Rue Choukri Mostapha Pitchou, casablanca, MAA04353, MAC00070",
];

const DEFAULT_SENDIT_CITIES = [
  "SEMARA, essemara, MAA04356, MAC00099",
  "RAHMA, Nouaceur, MAA04355, MAC00059",
  "ROCHE NOIR, casablanca, MAA04354, MAC00070",
];

const DEFAULT_MOROCCAN_CITIES = [
  "Agadir", "Tanger", "Casablanca", "Rabat", "Fes", "Marrakech"
];

function getDefaultCitiesForCourierType(courierType) {
  switch (courierType) {
    case 'speedaf':
      return DEFAULT_SPEEDAF_CITIES;
    case 'sendit':
      return DEFAULT_SENDIT_CITIES;
    case 'general':
      return DEFAULT_MOROCCAN_CITIES;
    default:
      return DEFAULT_SENDIT_CITIES;
  }
}

function checkCityExistsInLegacyList(cityName, courierType) {
  const defaultCities = getDefaultCitiesForCourierType(courierType);
  const normalizedInputCity = cityName.toLowerCase().trim();
  
  console.log(`🔍 Checking legacy cities for "${cityName}" in ${courierType}:`);
  
  const isFound = defaultCities.some((city) => {
    if (courierType === 'speedaf' || courierType === 'sendit') {
      // For speedaf/sendit, check all parts of the comma-separated string
      const parts = city.split(',').map(part => part.toLowerCase().trim());
      const match = parts.some(part => part === normalizedInputCity);
      if (match) {
        console.log(`✅ Found match in legacy list: "${city}" contains "${normalizedInputCity}"`);
      }
      return match;
    } else {
      // For general courier, simple case-insensitive match
      const match = city.toLowerCase().trim() === normalizedInputCity;
      if (match) {
        console.log(`✅ Found match in legacy list: "${city}" matches "${normalizedInputCity}"`);
      }
      return match;
    }
  });
  
  console.log(`City "${cityName}" ${isFound ? '✅ FOUND' : '❌ NOT FOUND'} in ${courierType} legacy cities`);
  
  return isFound;
}

// Test cases
console.log('=== Testing duplicate detection logic ===\n');

console.log('Testing "Tanger" in speedaf cities:');
checkCityExistsInLegacyList('Tanger', 'speedaf');

console.log('\nTesting "casablanca" in speedaf cities:');
checkCityExistsInLegacyList('casablanca', 'speedaf');

console.log('\nTesting "SEMARA" in speedaf cities:');
checkCityExistsInLegacyList('SEMARA', 'speedaf');

console.log('\nTesting "essemara" in speedaf cities:');
checkCityExistsInLegacyList('essemara', 'speedaf');

console.log('\nTesting "Tanger" in general cities:');
checkCityExistsInLegacyList('Tanger', 'general');

console.log('\nTesting "NonExistentCity" in speedaf cities:');
checkCityExistsInLegacyList('NonExistentCity', 'speedaf');
