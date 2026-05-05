const fs = require('fs');

const files = [
  'e:/greenspout/index.html',
  'e:/greenspout/preview.html',
  'e:/greenspout/site/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace about us img
  html = html.replace(
    /<img class="kirki-image" data-kirki="dpncab5j"[^>]*src="[^"]*img-1\.webp"[^>]*>/g,
    '<img class="kirki-image" data-kirki="dpncab5j" src="./assets/homepage%20about%20us%20image.png" alt="homepage about us image" sizes="(max-width: 3240px) 100vw, 3240px" loading="lazy" width="auto" height="auto">'
  );
  
  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
