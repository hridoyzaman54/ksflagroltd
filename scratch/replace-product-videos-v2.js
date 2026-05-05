const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

const newVideo = './assets/Agro_company_working_farmers_music_202605052039.mp4';

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace video sources and ensure audio is hearable
  // We match the video tag and the source tag inside it
  html = html.replace(/<video([^>]*)>([\s\S]*?)<\/video>/gi, (match, videoAttrs, innerHtml) => {
    // Replace the source tag(s) inside
    let newInner = innerHtml.replace(/<source([^>]*)(data-src|src)="[^"]*"([^>]*)>/gi, (sMatch, p1, attr, p2) => {
       return `<source ${p1}${attr}="${newVideo}"${p2}>`;
    });

    // Remove muted attribute from the video tag
    let newAttrs = videoAttrs.replace(/muted(="[^"]*")?/gi, '');
    // Ensure playsinline is there (good for mobile)
    if (!newAttrs.includes('playsinline')) newAttrs += ' playsinline';
    
    return `<video${newAttrs}>${newInner}</video>`;
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
