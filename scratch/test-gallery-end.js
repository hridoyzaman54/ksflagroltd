const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/index.html', 'utf8');

const startMarker = 'class="discover-slider"';
const startIdx = html.indexOf(startMarker);
const tagEnd = html.indexOf('>', startIdx) + 1;

let curr = tagEnd;
for(let i=0; i<12; i++) {
  // find the start of the next wrapper
  const wrapperStart = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
  const wrapperEnd = html.indexOf('</div>', wrapperStart) + 6;
  curr = wrapperEnd;
}

console.log(html.substring(curr, curr + 50));
