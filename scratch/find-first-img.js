const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const imgMatch = html.match(/<img[^>]+>/i);
if (imgMatch) {
    const pos = html.indexOf(imgMatch[0]);
    console.log(html.substring(pos - 300, pos + 300));
}
