const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

const newGalleryImages = [
  "./assets/GALLERY/gallery%20homepage%20(1).jpg",
  "./assets/GALLERY/gallery%20homepage%20(1).png",
  "./assets/GALLERY/gallery%20homepage%20(2).jpeg",
  "./assets/GALLERY/gallery%20homepage%20(2).jpg",
  "./assets/GALLERY/gallery%20homepage%20(2).png",
  "./assets/GALLERY/gallery%20homepage%20(3).jpg",
  "./assets/GALLERY/gallery%20homepage%20(3).png",
  "./assets/GALLERY/gallery%20homepage%20(4).png",
  "./assets/GALLERY/gallery%20homepage%20(5).png",
  "./assets/GALLERY/gallery%20homepage%20(1).jpeg"
];

const allGalleryImages = [...newGalleryImages, ...newGalleryImages];

const galleryHtml = allGalleryImages.map((src, index) => {
  return `<div class="discover-slider-img-wrapper"><img class="discover-img-infinity" style="aspect-ratio: 524 / 476; object-fit: cover; width: 100%; height: auto; border-radius: 16px;" src="${src}" alt="Gallery image ${index + 1}" loading="lazy" width="auto" height="auto"></div>`;
}).join('');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // 1. Replace testimonial images
  // Testimonial-img-4.webp -> FEMALE FARMER.png
  // Testimonial-img-3.webp -> FARMER.png
  html = html.replace(/<img[^>]*src="[^"]*Testimonial-img-4\.webp"[^>]*>/gi, (match) => {
    return match.replace(/src="[^"]*"/, `src="./assets/FEMALE%20FARMER.png"`)
                .replace(/srcset="[^"]*"/, '')
                .replace(/style="[^"]*"/, 'style="object-fit: cover; width: 100%; height: 100%;"');
  });
  html = html.replace(/<img[^>]*src="[^"]*Testimonial-img-3\.webp"[^>]*>/gi, (match) => {
    return match.replace(/src="[^"]*"/, `src="./assets/FARMER.png"`)
                .replace(/srcset="[^"]*"/, '')
                .replace(/style="[^"]*"/, 'style="object-fit: cover; width: 100%; height: 100%;"');
  });

  // 2. Replace gallery carousel
  const startMarker = 'class="discover-slider"';
  const startIdx = html.indexOf(startMarker);
  
  if (startIdx !== -1) {
    const tagEnd = html.indexOf('>', startIdx) + 1;
    let curr = tagEnd;
    
    let count = 0;
    while (true) {
      const nextWrapper = html.indexOf('<div class="discover-slider-img-wrapper"', curr);
      if (nextWrapper === -1 || nextWrapper > curr + 300) break;
      curr = html.indexOf('</div>', nextWrapper) + 6;
      count++;
    }
    
    if (count > 0) {
      const before = html.substring(0, tagEnd);
      const after = html.substring(curr);
      html = before + galleryHtml + after;
    }
  }

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
