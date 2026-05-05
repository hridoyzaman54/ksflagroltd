const fs = require('fs');

const files = [
  'e:/greenspout/index.html',
  'e:/greenspout/preview.html',
  'e:/greenspout/site/index.html'
];

const newImages = [
  "./assets/GALLERY/gallery%20homepage%20(1).jpeg",
  "./assets/GALLERY/gallery%20homepage%20(1).jpg",
  "./assets/GALLERY/gallery%20homepage%20(1).png",
  "./assets/GALLERY/gallery%20homepage%20(2).jpeg",
  "./assets/GALLERY/gallery%20homepage%20(2).jpg",
  "./assets/GALLERY/gallery%20homepage%20(2).png",
  "./assets/GALLERY/gallery%20homepage%20(3).jpg",
  "./assets/GALLERY/gallery%20homepage%20(3).png",
  "./assets/GALLERY/gallery%20homepage%20(4).png",
  "./assets/GALLERY/gallery%20homepage%20(5).png"
];

const allImages = [...newImages, ...newImages];

let newInnerHtml = allImages.map((src, index) => {
  return `<div class="discover-slider-img-wrapper"><img class="discover-img-infinity" style="aspect-ratio: 524 / 476; object-fit: cover; width: 100%; height: auto; border-radius: 16px;" src="${src}" alt="Gallery image ${index + 1}" loading="lazy" width="auto" height="auto"></div>`;
}).join('');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  const startMarker = 'class="discover-slider"';
  const startIdx = html.indexOf(startMarker);
  
  if (startIdx !== -1) {
    const tagEnd = html.indexOf('>', startIdx) + 1;
    let curr = tagEnd;
    
    // Original homepage gallery had 20 items (6 items repeated, then I previously updated to 10 items repeated)
    // We search for the end of the discover-slider content block.
    // Since we just updated it recently, it should have discover-slider-img-wrapper divs.
    
    let count = 0;
    while (true) {
      const nextWrapper = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
      if (nextWrapper === -1 || nextWrapper > curr + 200) break;
      curr = html.indexOf('</div>', nextWrapper) + 6;
      count++;
    }
    
    if (count > 0) {
      const before = html.substring(0, tagEnd);
      const after = html.substring(curr);
      fs.writeFileSync(file, before + newInnerHtml + after);
      console.log(`Updated ${file} with consistent gallery sizing`);
    }
  }
});
