const fs = require('fs');
const txt = fs.readFileSync('index.html', 'utf8');
const pos = txt.indexOf('ksfl-hero-logo-v3.png');
if (pos !== -1) {
    console.log(txt.substring(pos - 400, pos + 400));
} else {
    console.log("Not found v3");
}
