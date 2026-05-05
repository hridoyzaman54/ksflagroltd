const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

const newVideo = './assets/Agro_company_working_farmers_music_202605052039.mp4';

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace the source data-src or src
  // The regex matches <source ...>
  html = html.replace(/<source[^>]*data-src="[^"]*"[^>]*>/gi, `<source data-src="${newVideo}" type="video/mp4">`);
  html = html.replace(/<source[^>]*src="[^"]*"[^>]*>/gi, `<source src="${newVideo}" type="video/mp4">`);

  // Ensure the video is not muted
  html = html.replace(/muted="true"/gi, 'muted="false"');
  html = html.replace(/muted=true/gi, 'muted=false');
  // If it doesn't have muted, that's fine too.

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
