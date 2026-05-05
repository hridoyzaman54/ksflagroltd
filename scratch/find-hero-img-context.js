const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const searchText = "আমরা এমন এক ভবিষ্যতের কল্পনা করি";
const pos = html.indexOf(searchText);
if (pos !== -1) {
    const nextImgPos = html.indexOf('<img', pos);
    if (nextImgPos !== -1) {
        console.log("Found img after text:");
        console.log(html.substring(nextImgPos, nextImgPos + 200));
    } else {
        console.log("No img found after text");
    }
} else {
    // maybe it's in english: "We imagine a future where innovation"
    const enText = "We imagine a future where innovation";
    const pos2 = html.indexOf(enText);
    if (pos2 !== -1) {
        const nextImgPos2 = html.indexOf('<img', pos2);
        console.log("Found img after EN text:");
        console.log(html.substring(nextImgPos2, nextImgPos2 + 200));
    } else {
        console.log("Could not find text");
    }
}
