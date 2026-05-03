const fs = require('fs');
const path = require('path');

const files = [
  'E:/greenspout/about.html',
  'E:/greenspout/blogs.html',
  'E:/greenspout/contact.html',
  'E:/greenspout/extracted_products_subpage.html',
  'E:/greenspout/index.html',
  'E:/greenspout/preview.html',
  'E:/greenspout/products.html',
  'E:/greenspout/seeds.html',
  'E:/greenspout/site/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // 1. Replace the header/navbar SVG logo with img
  content = content.replace(/<svg[^>]*viewBox="0 0 209 32"[^>]*>[\s\S]*?KSFL Agro Ltd\.[\s\S]*?<\/svg>/gi, 
    `<img src="./assets/logo.png" alt="KSFL Agro Ltd." style="height: 48px; width: auto; max-width: 100%; object-fit: contain; display: inline-block; vertical-align: middle;">`
  );

  // 2. Replace the footer SVG logo with img
  content = content.replace(/<svg[^>]*viewBox="0 0 1324 203"[^>]*>[\s\S]*?KSFL Agro Ltd\.[\s\S]*?<\/svg>/gi,
    `<img src="./assets/logo.png" alt="KSFL Agro Ltd." style="height: 80px; width: auto; max-width: 100%; object-fit: contain; display: inline-block; vertical-align: middle;">`
  );

  // 3. Add the Facebook link next to the copyright text
  const fbLink = ` | <a href="https://www.facebook.com/share/1CiLQmp3z2/" target="_blank" style="color: #FDE251; text-decoration: underline; font-weight: bold; margin-left: 5px;">Follow us on Facebook</a>`;
  
  if (!content.includes('https://www.facebook.com/share/1CiLQmp3z2/')) {
    content = content.replace(/(©KSFL Agro Ltd\. 2026\. All rights reserved\.)/gi, `$1${fbLink}`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated ${file}`);
});
