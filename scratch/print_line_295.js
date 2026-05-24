const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');
console.log(lines[294]);
