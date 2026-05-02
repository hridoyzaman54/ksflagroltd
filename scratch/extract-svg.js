const fs = require('fs');

const content = fs.readFileSync('e:/greenspout/index.html', 'utf8');

// Find small logo (header)
const smallRegex = /<svg[^>]+viewBox="0 0 209 32"[^>]*>.*?<\/svg>/gs;
const smallMatches = content.match(smallRegex);
console.log(`Small matches: ${smallMatches ? smallMatches.length : 0}`);
if (smallMatches) {
    fs.writeFileSync('e:/greenspout/scratch/small_logo.txt', smallMatches[0]);
}

// Find large logo (footer)
const largeRegex = /<svg[^>]+viewBox="0 0 1324 203"[^>]*>.*?<\/svg>/gs;
const largeMatches = content.match(largeRegex);
console.log(`Large matches: ${largeMatches ? largeMatches.length : 0}`);
if (largeMatches) {
    fs.writeFileSync('e:/greenspout/scratch/large_logo.txt', largeMatches[0]);
}
