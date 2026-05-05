const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

const updates = [
  { old: 'Gallery-img-13.webp', new: './assets/pomelli_photoshoot_image_9_16_0505.png' },
  { old: 'Gallery-img-14.webp', new: './assets/images%20our%20story%20(1).jpg' },
  { old: 'Gallery-img-15.webp', new: './assets/images%20our%20story%20(2).jpg' }
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  updates.forEach(u => {
    // Replace the image and apply consistent styling
    const regex = new RegExp('<img[^>]*src="[^"]*' + u.old + '"[^>]*>', 'gi');
    html = html.replace(regex, (match) => {
        const kirki = match.match(/data-kirki="[^"]*"/)?.[0] || '';
        const classes = match.match(/class="[^"]*"/)?.[0] || '';
        
        return `<img ${classes} ${kirki} src="${u.new}" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
    });
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
