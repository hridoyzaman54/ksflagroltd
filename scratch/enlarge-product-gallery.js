const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // We find the style tag that defines .dp1ltnoh and change its width/min-width
  // Current: .dp1ltnoh{max-width:none;width:30vw;min-width:auto;aspect-ratio:524/476;overflow:hidden;border-radius:24px;}
  // We'll change width to 480px and min-width to 480px
  
  html = html.replace(/\.dp1ltnoh\{([^}]*)\}/g, (match, content) => {
    if (content.includes('width')) {
      return '.dp1ltnoh{max-width:none;width:480px;min-width:480px;aspect-ratio:524/476;overflow:hidden;border-radius:24px;}';
    }
    return match;
  });

  // Also ensure our inline style on the images is correct
  // We'll update the images in the gallery to have the same aspect ratio and object-fit
  html = html.replace(/<div class="dp1ltnoh"><img[^>]*>/g, (match) => {
    return match.replace(/style="[^"]*"/, 'style="aspect-ratio: 524 / 476; object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"');
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
