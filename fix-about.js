const fs = require('fs');

let html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

// Fix CSS/JS paths to use the existing files from homepage extraction
// The homepage crawl saved them with _ver= format, but live site uses ?ver= format
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-content\/plugins\/kirki-pro\/assets\/css\/kirki\.min\.css\?ver=6\.0\.0/g,
  './greensprout.kirki.io/wp-content/plugins/kirki-pro/assets/css/kirki.min_ver=6.0.0.css'
);
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-content\/themes\/kirkibase\/assets\/css\/style\.min\.css\?ver=\d+/g,
  './greensprout.kirki.io/wp-content/themes/kirkibase/assets/css/style.min_ver=1777476781.css'
);
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-content\/plugins\/kirki-pro\/assets\/js\/kirki\.min\.js\?ver=6\.0\.0/g,
  './greensprout.kirki.io/wp-content/plugins/kirki-pro/assets/js/kirki.min_ver=6.0.0.js'
);
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-includes\/js\/dist\/hooks\.min\.js\?ver=[\w]+/g,
  './greensprout.kirki.io/wp-includes/js/dist/hooks.min_ver=dd5603f07f9220ed27f1.js'
);
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-includes\/js\/dist\/i18n\.min\.js\?ver=[\w]+/g,
  './greensprout.kirki.io/wp-includes/js/dist/i18n.min_ver=c26c3dc7bed366793375.js'
);
html = html.replace(
  /\.\/greensprout\.kirki\.io\/wp-includes\/js\/wp-emoji-release\.min\.js\?ver=[\d.]+/g,
  './greensprout.kirki.io/wp-includes/js/wp-emoji-release.min_ver=6.9.4.js'
);

// Fix video file path (downloaded with #t=0,0 suffix)
// Rename the downloaded file
const videoDir = 'e:/greenspout/greensprout.kirki.io/wp-content/uploads/2025/11/';
const badName = videoDir + 'About-page.mp4#t=0,0';
const goodName = videoDir + 'About-page.mp4';
if (fs.existsSync(badName) && !fs.existsSync(goodName)) {
  fs.renameSync(badName, goodName);
  console.log('Renamed video file');
}
// Fix the video reference in HTML
html = html.replace(/About-page\.mp4#t=0,0/g, 'About-page.mp4');

fs.writeFileSync('e:/greenspout/about.html', html, 'utf8');
console.log('Fixed CSS/JS/video paths in about.html');

// Verify key files exist
const checks = [
  'greensprout.kirki.io/wp-content/plugins/kirki-pro/assets/css/kirki.min_ver=6.0.0.css',
  'greensprout.kirki.io/wp-content/themes/kirkibase/assets/css/style.min_ver=1777476781.css',
  'greensprout.kirki.io/wp-content/plugins/kirki-pro/assets/js/kirki.min_ver=6.0.0.js',
  'greensprout.kirki.io/wp-content/uploads/2025/11/about-img-1.webp',
  'greensprout.kirki.io/wp-content/uploads/2025/11/about-img-2.webp',
];
for (const f of checks) {
  const exists = fs.existsSync('e:/greenspout/' + f);
  console.log(exists ? '  ✓' : '  ✗', f.split('/').pop());
}
