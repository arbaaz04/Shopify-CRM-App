// Test the corrected duplicate detection logic with proper formats
console.log('🧪 CORRECTED DUPLICATE DETECTION TEST');
console.log('=====================================\n');

// Corrected city lists
const DEFAULT_SENDIT_CITIES = [
  "Agadir", "Casablanca", "Rabat", "Marrakech", "Fes", "Tanger", "Meknes", 
  "Oujda", "Kenitra", "Tetouan", "Safi", "Mohammedia", "El Jadida", "Beni Mellal"
];

const DEFAULT_SPEEDAF_CITIES = [
  "SEMARA, essemara, MAA04356, MAC00099",
  "RAHMA, Nouaceur, MAA04355, MAC00059", 
  "ROCHE NOIR, casablanca, MAA04354, MAC00070",
  "VILLE IBN BATOUTA, Tanger, MAA03547, MAC00036",
  "SOUQ KHEMIS SAHEL, Tanger, MAA03499, MAC00036",
  "Rue Choukri Mostapha Pitchou, casablanca, MAA04353, MAC00070",
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
    if (courierType === 'speedaf') {
      // For speedaf only, check all parts of the comma-separated string
      const parts = city.split(',').map(part => part.toLowerCase().trim());
      const match = parts.some(part => part === normalizedInputCity);
      if (match) {
        console.log(`✅ Found match in speedaf legacy list: "${city}" contains "${normalizedInputCity}"`);
      }
      return match;
    } else {
      // For sendit and general couriers, simple case-insensitive match
      const match = city.toLowerCase().trim() === normalizedInputCity;
      if (match) {
        console.log(`✅ Found match in ${courierType} legacy list: "${city}" matches "${normalizedInputCity}"`);
      }
      return match;
    }
  });
  
  console.log(`City "${cityName}" ${isFound ? '✅ FOUND' : '❌ NOT FOUND'} in ${courierType} legacy cities\n`);
  
  return isFound;
}

// Test cases
const testCases = [
  // Sendit tests (simple format)
  { cityName: 'Tanger', courierType: 'sendit', expectedFound: true, description: 'Tanger in sendit (simple format)' },
  { cityName: 'Casablanca', courierType: 'sendit', expectedFound: true, description: 'Casablanca in sendit (simple format)' },
  { cityName: 'Fes', courierType: 'sendit', expectedFound: true, description: 'Fes in sendit (simple format)' },
  { cityName: 'NonExistentCity', courierType: 'sendit', expectedFound: false, description: 'Non-existent city in sendit' },
  
  // Speedaf tests (complex format)
  { cityName: 'Tanger', courierType: 'speedaf', expectedFound: true, description: 'Tanger in speedaf (found in complex string)' },
  { cityName: 'casablanca', courierType: 'speedaf', expectedFound: true, description: 'casablanca in speedaf (found in complex string)' },
  { cityName: 'SEMARA', courierType: 'speedaf', expectedFound: true, description: 'SEMARA in speedaf (first position)' },
  { cityName: 'essemara', courierType: 'speedaf', expectedFound: true, description: 'essemara in speedaf (second position)' },
  { cityName: 'nouaceur', courierType: 'speedaf', expectedFound: true, description: 'nouaceur in speedaf (second position)' },
  { cityName: 'FakeCity', courierType: 'speedaf', expectedFound: false, description: 'Non-existent city in speedaf' },
  
  // General tests (simple format)
  { cityName: 'Tanger', courierType: 'general', expectedFound: true, description: 'Tanger in general (simple format)' },
  { cityName: 'Casablanca', courierType: 'general', expectedFound: true, description: 'Casablanca in general (simple format)' },
  { cityName: 'MadeUpPlace', courierType: 'general', expectedFound: false, description: 'Non-existent city in general' }
];

console.log('Running tests...\n');

let passedTests = 0;
let failedTests = 0;

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`  Input: "${testCase.cityName}" in ${testCase.courierType}`);
  console.log(`  Expected: ${testCase.expectedFound ? '✅ FOUND' : '❌ NOT FOUND'}`);
  
  const result = checkCityExistsInLegacyList(testCase.cityName, testCase.courierType);
  const passed = result === testCase.expectedFound;
  
  if (passed) {
    console.log(`  Result: ✅ PASSED\n`);
    passedTests++;
  } else {
    console.log(`  Result: ❌ FAILED - Expected ${testCase.expectedFound}, got ${result}\n`);
    failedTests++;
  }
});

console.log('=====================================');
console.log(`📊 TEST SUMMARY: ${passedTests}/${testCases.length} tests passed`);

if (failedTests === 0) {
  console.log('🎉 All tests passed! The corrected duplicate detection is working perfectly.');
  console.log('\n📝 CORRECTIONS APPLIED:');
  console.log('✅ Sendit cities now use simple format (like "Tanger")');
  console.log('✅ Speedaf cities use complex format (like "VILLE IBN BATOUTA, Tanger, MAA03547, MAC00036")');
  console.log('✅ Only speedaf cities check all parts of comma-separated strings');
  console.log('✅ Sendit and general cities use simple string matching');
} else {
  console.log(`⚠️  ${failedTests} tests failed. Please review the implementation.`);
}
