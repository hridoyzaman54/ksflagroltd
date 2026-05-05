const fs = require('fs');

const files = [
  'e:/greenspout/index.html',
  'e:/greenspout/preview.html',
  'e:/greenspout/site/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace work process img 3 (Harvesting & Sorting)
  html = html.replace(
    /<img class="kirki-image img"[^>]*src="[^"]*work-process-img-3\.webp"[^>]*>/g,
    '<img class="kirki-image img" data-kirki="dp3rinb5" src="./assets/Harvesting%20&%20Sorting.png" alt="Harvesting and Sorting" sizes="(max-width: 1048px) 100vw, 1048px" loading="lazy" width="auto" height="auto">'
  );

  // Replace work process img 4 (Packaging & Direct Delivery)
  html = html.replace(
    /<img class="kirki-image img"[^>]*src="[^"]*work-process-img-4\.webp"[^>]*>/g,
    '<img class="kirki-image img" data-kirki="dpfjcuga" src="./assets/Packaging.png" alt="Packaging" sizes="(max-width: 1048px) 100vw, 1048px" loading="lazy" width="auto" height="auto">'
  );
  
  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
