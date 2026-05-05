const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/index.html', 'utf8');

const start = html.indexOf('id="products"');
if (start !== -1) {
  const end = html.indexOf('</section>', start);
  const sub = html.substring(start, end);
  const tags = sub.match(/<img[^>]*>/gi);
  console.log('Images in products section:');
  console.log(tags);
}

const seedsIdx = html.indexOf('Seeds');
console.log('\nHTML around "Seeds":');
console.log(html.substring(seedsIdx - 500, seedsIdx + 500));
