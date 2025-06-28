// Performance comparison test for the optimized duplicate detection
const { performance } = require('perf_hooks');

// Simulate the old O(n*m) approach
function oldSlowCheck(cityName, cities) {
  const normalizedInput = cityName.toLowerCase().trim();
  return cities.some(city => {
    const normalizedCity = city.toLowerCase().trim();
    return normalizedCity === normalizedInput;
  });
}

// Simulate the new O(1) approach
function newFastCheck(cityName, citySet) {
  const normalizedInput = cityName.toLowerCase().trim();
  return citySet.has(normalizedInput);
}

// Create test data
const testCities = [];
for (let i = 0; i < 10000; i++) {
  testCities.push(`TestCity${i}`);
}

// Create the Set for fast lookup
const citySet = new Set(testCities.map(city => city.toLowerCase().trim()));

// Test cities to check (some exist, some don't)
const citiesToCheck = [
  'TestCity1', 'TestCity5000', 'TestCity9999', 
  'NonExistent1', 'NonExistent2', 'TestCity100'
];

console.log('🚀 PERFORMANCE COMPARISON TEST');
console.log('================================\n');

console.log(`Testing with ${testCities.length} cities in database`);
console.log(`Checking ${citiesToCheck.length} cities for duplicates\n`);

// Test the old slow method
console.log('📈 OLD METHOD (O(n*m) complexity):');
const oldStart = performance.now();

for (let i = 0; i < 1000; i++) { // Run multiple times to get reliable timing
  citiesToCheck.forEach(city => {
    oldSlowCheck(city, testCities);
  });
}

const oldEnd = performance.now();
const oldTime = oldEnd - oldStart;

console.log(`Time taken: ${oldTime.toFixed(2)}ms`);
console.log(`Average per lookup: ${(oldTime / (1000 * citiesToCheck.length)).toFixed(4)}ms\n`);

// Test the new fast method
console.log('⚡ NEW METHOD (O(1) complexity):');
const newStart = performance.now();

for (let i = 0; i < 1000; i++) { // Run multiple times to get reliable timing
  citiesToCheck.forEach(city => {
    newFastCheck(city, citySet);
  });
}

const newEnd = performance.now();
const newTime = newEnd - newStart;

console.log(`Time taken: ${newTime.toFixed(2)}ms`);
console.log(`Average per lookup: ${(newTime / (1000 * citiesToCheck.length)).toFixed(4)}ms\n`);

// Calculate improvement
const improvement = (oldTime / newTime).toFixed(1);
const speedupPercentage = (((oldTime - newTime) / oldTime) * 100).toFixed(1);

console.log('================================');
console.log('📊 PERFORMANCE RESULTS:');
console.log(`🎯 Speed improvement: ${improvement}x faster`);
console.log(`📉 Time reduction: ${speedupPercentage}% faster`);
console.log(`⚡ Memory efficiency: Pre-computed Sets use O(n) space for O(1) lookups`);

if (improvement > 10) {
  console.log('🎉 EXCELLENT: Massive performance improvement achieved!');
} else if (improvement > 5) {
  console.log('✅ GOOD: Significant performance improvement achieved!');
} else {
  console.log('ℹ️  MODERATE: Some performance improvement achieved');
}

console.log('\n📝 OPTIMIZATIONS APPLIED:');
console.log('✅ Pre-computed normalized Sets for O(1) city lookups');
console.log('✅ Eliminated O(n*m) array.some() operations');
console.log('✅ Reduced API delay from 25ms to 10ms per request');
console.log('✅ Success messages show counts only (not all city names)');
console.log('✅ Development-only logging to reduce production overhead');
console.log('✅ TypeScript optimizations with proper Set<string> typing');

console.log('\n🔧 BULK IMPORT IMPACT:');
console.log(`For importing 100 cities:`);
console.log(`- Old method: ~${(oldTime / 1000 * 100).toFixed(1)}ms for duplicate checking`);
console.log(`- New method: ~${(newTime / 1000 * 100).toFixed(1)}ms for duplicate checking`);
console.log(`- Net time saved: ~${((oldTime - newTime) / 1000 * 100).toFixed(1)}ms per bulk import`);
