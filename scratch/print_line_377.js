const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\products.html', 'utf8');
const lines = content.split('\n');
console.log(lines[376].substring(0, 2000));
