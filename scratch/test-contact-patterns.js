const fs = require('fs');
const content = fs.readFileSync('contact.html', 'utf8');

const regex1 = /©KSFL Agro Ltd\. 2026\. All rights reserved\./g;
console.log("Found copyright match?", content.match(regex1) !== null);

const regex2 = /function decodeEntities/g;
console.log("Found decodeEntities match?", content.match(regex2) !== null);

const testStr = '©KSFL Agro Ltd. 2026. All rights reserved.';
const idx = content.indexOf(testStr);
if (idx !== -1) {
    console.log(content.substring(idx - 200, idx + 200));
}
