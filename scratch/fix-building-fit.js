const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, '..', 'contact.html');
if (!fs.existsSync(contactPath)) {
  console.error('contact.html does not exist.');
  process.exit(1);
}

let html = fs.readFileSync(contactPath, 'utf8');

// 1. Update the inline style on the image tag
const oldInline = 'style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"';
const newInline = 'style="object-fit: contain; width: 100%; height: 100%; border-radius: 16px; background-color: rgba(90, 109, 63, 0.05);"';

if (html.includes(oldInline)) {
  html = html.replace(oldInline, newInline);
  console.log('Updated inline style to object-fit: contain.');
} else {
  console.warn('Old inline style target not found.');
}

// 2. Update the stylesheet rule for .dp8a0rr7 to also be contain
const oldClassStyle = '.kirki-image.dp8a0rr7{object-fit:cover;min-height:100%;}';
const newClassStyle = '.kirki-image.dp8a0rr7{object-fit:contain;min-height:100%;background-color:rgba(90, 109, 63, 0.05);}';

if (html.includes(oldClassStyle)) {
  html = html.replace(oldClassStyle, newClassStyle);
  console.log('Updated stylesheet class dp8a0rr7 to object-fit: contain.');
} else {
  console.warn('Old class style rule not found.');
}

fs.writeFileSync(contactPath, html, 'utf8');
console.log('Successfully completed contact.html formatting updates.');
