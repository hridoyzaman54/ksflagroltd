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
  return `<div class="discover-slider-img-wrapper"><img class="discover-img-infinity" src="${src}" alt="Gallery image ${index + 1}" loading="lazy" width="auto" height="auto"></div>`;
}).join('');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  const startMarker = 'class="discover-slider"';
  const startIdx = html.indexOf(startMarker);
  
  if (startIdx !== -1) {
    const tagEnd = html.indexOf('>', startIdx) + 1;
    let curr = tagEnd;
    
    // Skip 20 image wrappers
    for(let i=0; i<20; i++) {
       const wrapperStart = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
       if (wrapperStart !== -1) {
           curr = html.indexOf('</div>', wrapperStart) + 6;
       }
    }
    
    const before = html.substring(0, tagEnd);
    const after = html.substring(curr);
    
    fs.writeFileSync(file, before + newInnerHtml + after);
    console.log(`Updated ${file}`);
  }
});
