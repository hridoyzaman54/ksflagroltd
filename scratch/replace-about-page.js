const fs = require('fs');

const files = [
  'e:/greenspout/about.html',
  'e:/greenspout/site/about.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Replace the video
  html = html.replace(
    /<source[^>]*data-src="[^"]*About-page\.mp4"[^>]*>/g,
    '<source data-src="./assets/OU%20STORY.mp4" type="video/mp4">'
  );

  // Replace about-img-1
  html = html.replace(
    /<img[^>]*src="[^"]*about-img-1\.webp"[^>]*>/g,
    '<img class="kirki-image dp8ypcl2" data-kirki="dpp3q7hr" src="./assets/images%20our%20story%20(1).jpg" alt="about-img-1" sizes="(max-width: 1334px) 100vw, 1334px" loading="lazy" width="auto" height="auto" />'
  );

  // Replace about-img-2
  html = html.replace(
    /<img[^>]*src="[^"]*about-img-2\.webp"[^>]*>/g,
    '<img class="kirki-image dp8ypcl2" data-kirki="dp8kxhra" src="./assets/images%20our%20story%20(2).jpg" alt="about img 2" sizes="(max-width: 1046px) 100vw, 1046px" loading="lazy" width="auto" height="auto" />'
  );

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
