const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Remove startTime and endTime attributes from the video tag
  html = html.replace(/<video([^>]*)>/gi, (match, attrs) => {
    let newAttrs = attrs.replace(/startTime="[^"]*"/gi, '')
                        .replace(/endTime="[^"]*"/gi, '')
                        .replace(/startTime=[^\s>]*/gi, '')
                        .replace(/endTime=[^\s>]*/gi, '');
    return `<video${newAttrs}>`;
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
