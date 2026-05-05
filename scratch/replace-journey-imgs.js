const fs = require('fs');

const files = [
  'e:/greenspout/about.html'
];

const replacements = [
  { old: 'about-img-4.webp', new: './assets/ABOUT%20USS%20(1).png' },
  { old: 'about-img-3.webp', new: './assets/ABOUT%20USS%20(2).png' },
  { old: 'about-img-5.webp', new: './assets/ABOUT%20USS%20(3).png' },
  { old: 'about-img-6.webp', new: './assets/ABOUT%20USS%20(1).jpg' }
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  replacements.forEach(r => {
    // Regex to match the img tag with the specific src
    const regex = new RegExp('<img[^>]*src="[^"]*' + r.old + '"[^>]*>', 'g');
    
    // We replace it with a clean img tag using the new src
    // We add object-fit: cover and height/width 100% to fill the container perfectly
    html = html.replace(regex, (match) => {
      // Extract data-kirki and class if possible to maintain structure
      const kirkiMatch = match.match(/data-kirki="([^"]+)"/);
      const classMatch = match.match(/class="([^"]+)"/);
      const altMatch = match.match(/alt="([^"]+)"/);
      const sizesMatch = match.match(/sizes="([^"]+)"/);
      
      const kirki = kirkiMatch ? kirkiMatch[0] : '';
      const classes = classMatch ? classMatch[1] : 'kirki-image img';
      const alt = altMatch ? altMatch[1] : 'our journey img';
      const sizes = sizesMatch ? sizesMatch[0] : '';

      return `<img class="${classes}" ${kirki} src="${r.new}" alt="${alt}" ${sizes} style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
    });
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
