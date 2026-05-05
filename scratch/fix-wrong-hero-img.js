const fs = require('fs');
let html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

const regex = /<img[^>]*?src="\.\/assets\/wp-content\/uploads\/2025\/11\/ksfl-logo-1\.png"[^>]*?>/g;
const replacement = `<img class="kirki-image" data-kirki="dpp3q7hr" src="./assets/ksfl-hero-logo.png" alt="KSFL Agro Ltd." style="width: 100%; max-width: 500px; height: auto; display: block; margin: 0 auto; object-fit: contain;">`;

if (html.match(regex)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('e:/greenspout/about.html', html, 'utf8');
    console.log("Replaced ksfl-logo-1.png in about.html");
} else {
    console.log("ksfl-logo-1.png not found in about.html");
}

// Check index.html just in case?
let indexHtml = fs.readFileSync('e:/greenspout/index.html', 'utf8');
if (indexHtml.match(regex)) {
    indexHtml = indexHtml.replace(regex, replacement);
    fs.writeFileSync('e:/greenspout/index.html', indexHtml, 'utf8');
    console.log("Replaced ksfl-logo-1.png in index.html");
}

let contactHtml = fs.readFileSync('e:/greenspout/contact.html', 'utf8');
if (contactHtml.match(regex)) {
    contactHtml = contactHtml.replace(regex, replacement);
    fs.writeFileSync('e:/greenspout/contact.html', contactHtml, 'utf8');
    console.log("Replaced ksfl-logo-1.png in contact.html");
}
