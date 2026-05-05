const fs = require('fs');
const content = fs.readFileSync('contact.html', 'utf8');
const originalFooterP = '<p class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y kirki-s219-dpo2pb78" data-kirki="dptgnajs">©KSFL Agro Ltd. 2026. All rights reserved.';
console.log("Includes originalFooterP?", content.includes(originalFooterP));
console.log("Includes Kazipara?", content.includes('1240/7 Kazipara Mirpur'));
