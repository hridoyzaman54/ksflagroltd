const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div style="max-width: 68%; min-width: 300px;"><h2 class="h3" data-kirki="dp7zhfz1">We envision a future where innovation nourishes the earth and enhances sustainable agriculture. By integrating technology with traditional methods, we aim to support the environment.</h2><p class="p2" style="color: var(--premade_template_dpw2cmzz); margin-top: 16px; font-weight: 400; max-width: 780px;">KSFL Agro Limited: Our latest venture dedicated to seed production and processing, along with high-quality pesticides, micronutrients, and eco-friendly agro-based solutions.</p></div>`;

const restored = `<div style="max-width: 100%; min-width: 300px;"><h2 class="h3" data-kirki="dp7zhfz1">We envision a future where innovation nourishes the earth and enhances sustainable agriculture. By integrating technology with traditional methods, we aim to support the environment.</h2><p class="p2" style="color: var(--premade_template_dpw2cmzz); margin-top: 16px; font-weight: 400; max-width: 780px;">KSFL Agro Limited: Our latest venture dedicated to seed production and processing, along with high-quality pesticides, micronutrients, and eco-friendly agro-based solutions.</p></div>`;

if (html.includes(target)) {
    html = html.replace(target, restored);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Successfully restored width alignment in index.html");
} else {
    console.log("Target string not found in index.html");
}
