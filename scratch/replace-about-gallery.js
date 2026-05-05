const fs = require('fs');

const file = 'e:/greenspout/about.html';

const newImages = [
  "./assets/GALLERY/gallery%20homepage%20(3).jpg",
  "./assets/GALLERY/gallery%20homepage%20(3).png",
  "./assets/GALLERY/gallery%20homepage%20(4).png",
  "./assets/GALLERY/gallery%20homepage%20(5).png",
  "./assets/GALLERY/gallery%20homepage%20(1).jpeg",
  "./assets/GALLERY/gallery%20homepage%20(1).jpg",
  "./assets/GALLERY/gallery%20homepage%20(1).png",
  "./assets/GALLERY/gallery%20homepage%20(2).jpeg",
  "./assets/GALLERY/gallery%20homepage%20(2).jpg",
  "./assets/GALLERY/gallery%20homepage%20(2).png"
];

// Combine them twice for infinite scroll like before
const allImages = [...newImages, ...newImages];

// We add the aspect-ratio and object-fit: cover to force uniform sizing
let newInnerHtml = allImages.map((src, index) => {
  return `<div class="discover-slider-img-wrapper"><img class="discover-img-infinity" style="aspect-ratio: 524 / 476; object-fit: cover; width: 100%; height: auto; border-radius: 16px;" src="${src}" alt="Gallery image ${index + 1}" loading="lazy" width="auto" height="auto"></div>`;
}).join('');

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');
  
  const startMarker = 'class="discover-slider"';
  const startIdx = html.indexOf(startMarker);
  
  if (startIdx !== -1) {
    const tagEnd = html.indexOf('>', startIdx) + 1;
    let curr = tagEnd;
    
    // In about.html, let's count how many images exist first.
    let count = 0;
    while (true) {
      const wrapperStart = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
      if (wrapperStart === -1 || wrapperStart > curr + 150) break;
      const wrapperEnd = html.indexOf('</div>', wrapperStart) + 6;
      curr = wrapperEnd;
      count++;
    }
    
    console.log(`Found ${count} wrappers in ${file}`);
    if (count > 0) {
      const before = html.substring(0, tagEnd);
      const after = html.substring(curr);
      
      fs.writeFileSync(file, before + newInnerHtml + after);
      console.log(`Updated gallery in ${file}`);
    }
  }
}
