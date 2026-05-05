const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const targetStr = "Our latest venture dedicated to seed";
const pos = html.indexOf(targetStr);
if (pos !== -1) {
    const start = html.lastIndexOf('<div', pos);
    const end = html.indexOf('</div>', pos);
    console.log(html.substring(start, end + 6));
} else {
    console.log("String not found");
}
