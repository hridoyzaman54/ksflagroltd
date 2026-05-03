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

  // Replace "See Our Work Process" mapping to just map to its original English text
  content = content.replace(/"See Our Work Process":\s*"আমাদের কাজের প্রক্রিয়া দেখুন",?/g, '"See Our Work Process": "See Our Work Process",');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated ${file}`);
});
