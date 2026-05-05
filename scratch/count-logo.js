const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');
const count = (html.match(/ksfl-hero-logo\.png/g) || []).length;
console.log(`ksfl-hero-logo.png found ${count} times.`);
