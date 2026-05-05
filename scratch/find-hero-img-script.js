const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const heroMatch = html.match(/id="hero"[^>]*>([\s\S]*?)<\/section>/i);
if (heroMatch) {
    const heroContent = heroMatch[1];
    const imgMatch = heroContent.match(/<img[^>]+>/gi);
    if (imgMatch) {
        console.log("Hero Images Found:");
        imgMatch.forEach(img => console.log(img));
    } else {
        console.log("No images found in hero section");
    }
} else {
    // maybe it is a div id="hero"?
    const heroDiv = html.match(/id="hero"[^>]*>([\s\S]*?)<\/div>/i);
    if (heroDiv) {
        console.log("Found div hero");
        const imgMatch = heroDiv[1].match(/<img[^>]+>/gi);
        if (imgMatch) {
            imgMatch.forEach(img => console.log(img));
        }
    } else {
        console.log("Could not find hero section");
    }
}
