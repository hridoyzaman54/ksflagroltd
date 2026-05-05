const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');
const bodyStart = html.indexOf('<body');
console.log(html.substring(bodyStart, bodyStart + 4000));
