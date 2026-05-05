const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/products.html', 'utf8');

const targetText = 'We make every pantry item';
const startIdx = html.indexOf(targetText);
if (startIdx !== -1) {
  // Look for images in the surrounding section
  const sectionStart = html.lastIndexOf('<section', startIdx);
  const sectionEnd = html.indexOf('</section>', startIdx);
  const sub = html.substring(sectionStart, sectionEnd);
  const tags = sub.match(/<img[^>]*>/gi);
  console.log('Images in the "We make every pantry item" section:');
  console.log(tags);
}
