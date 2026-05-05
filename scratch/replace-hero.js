const fs = require('fs');

const files = [
  'e:/greenspout/index.html',
  'e:/greenspout/preview.html',
  'e:/greenspout/site/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace hero img 2
  html = html.replace(
    /<img class="dpvmj3vk dasda"[^>]*src="[^"]*hero-img-2\.webp"[^>]*>/g,
    '<img class="dpvmj3vk dasda" data-kirki="dpdr5f0x" src="./assets/Cover%20Photo/Cover%20photo%202.jpeg" alt="hero img 2" sizes="(max-width: 3840px) 100vw, 3840px" width="auto" height="auto">'
  );
  
  // Replace hero img 3
  html = html.replace(
    /<img class="dpvmj3vk fasjfjas"[^>]*src="[^"]*hero-img-3\.webp"[^>]*>/g,
    '<img class="dpvmj3vk fasjfjas" data-kirki="dpqtdbhv" src="./assets/Cover%20Photo/Cover%20Photo%203.jpeg" alt="hero img 3" sizes="(max-width: 3840px) 100vw, 3840px" width="auto" height="auto">'
  );

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
