const fs = require('fs');
let html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const regex = /<img[^>]*?src="[^"]*?about-img-1[^>]*?>/g;
const replacement = `<img class="kirki-image" data-kirki="dpp3q7hr" src="./assets/ksfl-hero-logo.png" alt="KSFL Agro Ltd." style="width: 100%; max-width: 500px; height: auto; display: block; margin: 0 auto; object-fit: contain;">`;

if (html.match(regex)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('e:/greenspout/about.html', html, 'utf8');
    console.log("Image replaced successfully.");
} else {
    console.log("Image not found.");
}
