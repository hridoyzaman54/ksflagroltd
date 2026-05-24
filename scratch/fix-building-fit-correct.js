const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, '..', 'contact.html');
if (!fs.existsSync(contactPath)) {
  console.error('contact.html does not exist.');
  process.exit(1);
}

let html = fs.readFileSync(contactPath, 'utf8');

// 1. Restore the first image (contac us.png) back to cover if it was changed
const oldTopInline = 'src="./assets/contac us.png" alt="contact-page-img" sizes="(max-width: 1482px) 100vw, 1482px" style="object-fit: contain; width: 100%; height: 100%; border-radius: 16px; background-color: rgba(90, 109, 63, 0.05);"';
const restoreTopInline = 'src="./assets/contac us.png" alt="contact-page-img" sizes="(max-width: 1482px) 100vw, 1482px" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"';

if (html.includes(oldTopInline)) {
  html = html.replace(oldTopInline, restoreTopInline);
  console.log('Restored top banner image back to cover style.');
}

// 2. Target specifically the building image and apply contain with a transparent-tinted background
const targetImgTag = 'src="./assets/ksfl%20building.png" alt="contact-page-img-2" sizes="(max-width: 2144px) 100vw, 2144px" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"';
const replacementImgTag = 'src="./assets/ksfl%20building.png" alt="contact-page-img-2" sizes="(max-width: 2144px) 100vw, 2144px" style="object-fit: contain; width: 100%; height: 100%; border-radius: 16px; background-color: rgba(90, 109, 63, 0.03);"';

if (html.includes(targetImgTag)) {
  html = html.replace(targetImgTag, replacementImgTag);
  console.log('Successfully set building image style to object-fit: contain.');
} else {
  console.error('Could not locate target building image tag in contact.html');
}

fs.writeFileSync(contactPath, html, 'utf8');
console.log('Finished processing contact.html');
