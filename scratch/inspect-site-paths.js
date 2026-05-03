const fs = require('fs');
const content = fs.readFileSync('E:/greenspout/site/index.html', 'utf8');
const srcMatches = content.match(/src="[^"]*"/gi) || [];
console.log('Total src attributes found in site/index.html:', srcMatches.length);
console.log('Sample matches:', srcMatches.slice(0, 10));
