const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/index.html', 'utf8');

const startMarker = 'class="discover-slider"';
const startIdx = html.indexOf(startMarker);
const tagEnd = html.indexOf('>', startIdx) + 1;

let curr = tagEnd;
let count = 0;
while (true) {
  const wrapperStart = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
  if (wrapperStart === -1 || wrapperStart > curr + 100) break; // if there are spaces or it stops
  const wrapperEnd = html.indexOf('</div>', wrapperStart) + 6;
  curr = wrapperEnd;
  count++;
}

console.log('Count:', count);
console.log('After:', html.substring(curr, curr + 50));
