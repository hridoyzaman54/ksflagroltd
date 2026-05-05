const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/index.html', 'utf8');
const sliderStart = html.indexOf('class="discover-slider"');
const sliderEnd = html.indexOf('class="hero-slider-wrapper"', sliderStart); // or similar, let's just use regex
const matches = html.match(/<img class="discover-img-infinity"[^>]*>/g);
console.log('Number of discover-img-infinity images:', matches ? matches.length : 0);
if (matches) {
  matches.forEach(m => console.log(m.match(/src="([^"]+)"/)[1]));
}
