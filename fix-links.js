const fs = require('fs');
const path = require('path');

const files = ['blogs.html', 'contact.html'];

for (const file of files) {
  const filePath = path.join('e:/greenspout', file);
  if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Fix stylesheet URLs
    html = html.replace(/kirki\.min\.css\?ver=6\.0\.0/g, 'kirki.min_ver=6.0.0.css');
    html = html.replace(/style\.min\.css\?ver=1777476781/g, 'style.min_ver=1777476781.css');
    html = html.replace(/kirki\.min\.js\?ver=6\.0\.0/g, 'kirki.min_ver=6.0.0.js');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated assets paths in ${file}`);
  }
}
console.log('✅ Local paths fixed!');
