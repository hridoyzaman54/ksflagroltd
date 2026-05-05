const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div style="position: absolute; top: 0; right: 12%; width: 300px; max-width: 30%;"><img src="./assets/ksfl-hero-logo-v3.png" alt="KSFL Agro Limited" style="width: 100%; height: auto; object-fit: contain; border-radius: 12px; filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));"></div>`;

if (html.includes(target)) {
    html = html.replace(target, '');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Successfully removed the logo from the about us section.");
} else {
    console.log("Could not find the target logo div in index.html");
}
