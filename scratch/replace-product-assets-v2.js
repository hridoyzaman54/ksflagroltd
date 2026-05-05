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
  return `<div class="dp1ltnoh"><img class="dpg8cb8r dpscurvx" style="aspect-ratio: 524 / 476; object-fit: cover; width: 100%; height: auto; border-radius: 16px;" src="${src}" alt="Gallery image ${index + 1}" loading="lazy" width="auto" height="auto"></div>`;
}).join('\n');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // 1. Testimonial Images (Ensuring they are set)
  html = html.replace(/<img[^>]*src="[^"]*Testimonial-img-4\.webp"[^>]*>/gi, (match) => {
    return `<img class="dpg8cb8r dp4ei1lu" data-kirki="kirki-s-69f4f884da767" src="./assets/FEMALE%20FARMER.png" alt="Testimonial img 1" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
  });
  html = html.replace(/<img[^>]*src="[^"]*Testimonial-img-3\.webp"[^>]*>/gi, (match) => {
    return `<img class="dpg8cb8r dp4ei1lu" data-kirki="kirki-s-69f4f884da88c" src="./assets/FARMER.png" alt="Testimonial img 1" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
  });

  // 2. Gallery Carousel
  const marqueeMatch = html.match(/product-marquee-img-25\.webp/);
  if (marqueeMatch) {
    // Find the start of the first dp1ltnoh div before the image
    const imgIdx = html.indexOf('product-marquee-img-25.webp');
    const startIdx = html.lastIndexOf('<div class="dp1ltnoh"', imgIdx);
    
    // Find the end of the last dp1ltnoh div
    let lastImgIdx = html.indexOf('product-marquee-img-30.webp');
    if (lastImgIdx === -1) lastImgIdx = html.lastIndexOf('<div class="dp1ltnoh"');
    
    const endIdx = html.indexOf('</div>', html.indexOf('</div>', lastImgIdx) + 1) + 6; 
    // This logic is a bit brittle, let's refine.
    
    // Better: search for all dp1ltnoh divs in a row.
    let curr = startIdx;
    let count = 0;
    while(true) {
        const next = html.indexOf('<div class="dp1ltnoh"', curr + 1);
        if (next === -1 || next > curr + 1000) break; // Should be close
        curr = next;
        count++;
    }
    const actualEndIdx = html.indexOf('</div>', html.indexOf('>', curr)) + 6;
    
    const before = html.substring(0, startIdx);
    const after = html.substring(actualEndIdx);
    
    html = before + galleryHtml + after;
    console.log(`Updated gallery in ${file} (found ${count+1} items)`);
  }

  fs.writeFileSync(file, html);
  console.log(`Saved ${file}`);
});
