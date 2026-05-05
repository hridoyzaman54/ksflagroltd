const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

if (html.includes('ksfl-logo-1.png')) {
    console.log("WARNING: ksfl-logo-1.png is still in the file!");
} else {
    console.log("Good: ksfl-logo-1.png is NOT in the file.");
}

const match = html.match(/<img[^>]*?src="\.\/assets\/ksfl-hero-logo\.png"[^>]*?>/g);
if (match) {
    console.log("Found ksfl-hero-logo.png tags:", match);
} else {
    console.log("WARNING: ksfl-hero-logo.png NOT FOUND in the file!");
}
