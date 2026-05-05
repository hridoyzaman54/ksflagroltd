const fs = require('fs');
const content = fs.readFileSync('contact.html', 'utf8');
let idx = content.indexOf('Kazipara');
while (idx !== -1) {
    console.log(content.substring(idx - 100, idx + 100));
    idx = content.indexOf('Kazipara', idx + 1);
}
