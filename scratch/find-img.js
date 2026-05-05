const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');
const regex = /<img[^>]+>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[0].substring(0, 100));
}
