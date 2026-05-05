const fs = require('fs');

const file = 'e:/greenspout/contact.html';

const replacements = [
  { old: 'contact-page-img-.webp', new: './assets/Gemini_Generated_Image_w953hww953hww953.png' },
  { old: 'contact-page-img-2.webp', new: './assets/Gemini_Generated_Image_lgqtg3lgqtg3lgqt.png' }
];

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');

  replacements.forEach(r => {
    const regex = new RegExp('<img[^>]*src="[^"]*' + r.old + '"[^>]*>', 'g');
    
    html = html.replace(regex, (match) => {
      const kirkiMatch = match.match(/data-kirki="([^"]+)"/);
      const classMatch = match.match(/class="([^"]+)"/);
      const altMatch = match.match(/alt="([^"]+)"/);
      const sizesMatch = match.match(/sizes="([^"]+)"/);
      
      const kirki = kirkiMatch ? kirkiMatch[0] : '';
      const classes = classMatch ? classMatch[1] : 'kirki-image img';
      const alt = altMatch ? altMatch[1] : 'contact page img';
      const sizes = sizesMatch ? sizesMatch[0] : '';

      return `<img class="${classes}" ${kirki} src="${r.new}" alt="${alt}" ${sizes} style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
    });
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
}
