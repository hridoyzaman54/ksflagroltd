const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const searchText = "We envision a future where innovation";
const pos = html.indexOf(searchText);
if (pos !== -1) {
    const context = html.substring(pos - 2000, pos + 2000);
    const images = context.match(/<img[^>]+>/g);
    console.log("Images near text:", images);
} else {
    console.log("Could not find text");
}
