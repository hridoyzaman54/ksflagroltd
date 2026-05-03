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

const headerReplacement = `<div style="display: inline-flex; align-items: center; gap: 10px; vertical-align: middle;">` +
  `<img src="./assets/logo.png" alt="KSFL Agro Ltd." style="height: 48px; width: auto; max-width: 100%; object-fit: contain; display: inline-block;">` +
  `<span style="color: #FDE251; font-family: Roboto, sans-serif; font-weight: bold; font-size: 22px; line-height: 1; white-space: nowrap;">KSFL Agro Ltd.</span>` +
  `</div>`;

const footerReplacement = `<div style="display: inline-flex; align-items: center; gap: 15px; vertical-align: middle;">` +
  `<img src="./assets/logo.png" alt="KSFL Agro Ltd." style="height: 80px; width: auto; max-width: 100%; object-fit: contain; display: inline-block;">` +
  `<span style="color: #FDE251; font-family: Roboto, sans-serif; font-weight: bold; font-size: 56px; line-height: 1; white-space: nowrap;">KSFL Agro Ltd.</span>` +
  `</div>`;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Replace header/navbar img with the new inline-flex containing both logo and text
  content = content.replace(/<img src="\.\/assets\/logo\.png" alt="KSFL Agro Ltd\." style="height:\s*48px;[^>]*>/gi, headerReplacement);

  // Replace footer img with the new inline-flex containing both logo and text
  content = content.replace(/<img src="\.\/assets\/logo\.png" alt="KSFL Agro Ltd\." style="height:\s*80px;[^>]*>/gi, footerReplacement);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated ${file}`);
});
