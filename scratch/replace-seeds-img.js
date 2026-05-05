const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules') walk(p, callback);
    } else if (f.endsWith('.html')) {
      callback(p);
    }
  });
};

const newImg = './assets/pomelli_photoshoot_image_9_16_0505.png';
const targets = [
  'product-img-5-1.webp',
  'Product-banner-5.webp',
  'product-img-5.webp'
];

walk('e:/greenspout', (file) => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  targets.forEach(target => {
    const regex = new RegExp('<img[^>]*src="[^"]*' + target.replace('.', '\\.') + '"[^>]*>', 'gi');
    if (html.match(regex)) {
      html = html.replace(regex, (match) => {
        changed = true;
        // Preserve data-kirki, class, alt if they exist
        const kirki = match.match(/data-kirki="[^"]*"/)?.[0] || '';
        const classes = match.match(/class="[^"]*"/)?.[0] || '';
        const alt = match.match(/alt="[^"]*"/)?.[0] || 'alt="Seeds and Farm Goods"';
        
        return `<img ${classes} ${kirki} ${alt} src="${newImg}" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
      });
    }
  });

  if (changed) {
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
  }
});
