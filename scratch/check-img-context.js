const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const imgPos = html.indexOf('about-img-1');
if (imgPos !== -1) {
    console.log(html.substring(imgPos - 200, imgPos + 200));
}
