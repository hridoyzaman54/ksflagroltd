const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/index.html', 'utf8');
const start = html.indexOf('<section class="kirki-s219-dpbrehze"');
const end = html.indexOf('</section>', start);
console.log(html.substring(start, end+10));
