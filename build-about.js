const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadImage(url, destPath) {
  try {
    const dir = path.dirname(destPath);
    fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(destPath)) {
      console.log('  Already exists:', path.basename(destPath));
      return true;
    }
    const data = await fetchUrl(url);
    fs.writeFileSync(destPath, data);
    console.log('  Downloaded:', path.basename(destPath));
    return true;
  } catch (e) {
    console.log('  FAILED:', path.basename(destPath), e.message);
    return false;
  }
}

async function main() {
  console.log('1. Fetching About page HTML...');
  const htmlBuf = await fetchUrl('https://greensprout.kirki.io/about/');
  let html = htmlBuf.toString('utf8');
  console.log('   Fetched', (html.length/1024).toFixed(0), 'KB');

  // 2. Find all image URLs referenced in the HTML
  console.log('\n2. Finding image URLs...');
  const imgRegex = /https?:\/\/greensprout\.kirki\.io\/wp-content\/[^"'\s)]+/g;
  const allUrls = [...new Set(html.match(imgRegex) || [])];
  console.log('   Found', allUrls.length, 'asset URLs');

  // 3. Download all assets
  console.log('\n3. Downloading assets...');
  const baseDir = 'e:/greenspout/greensprout.kirki.io';
  for (const url of allUrls) {
    const relPath = url.replace('https://greensprout.kirki.io/', '');
    const destPath = path.join(baseDir, relPath);
    await downloadImage(url, destPath);
  }

  // 4. Fix HTML paths and encoding
  console.log('\n4. Fixing paths and encoding...');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/wp-content\//g, './greensprout.kirki.io/wp-content/');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/wp-includes\//g, './greensprout.kirki.io/wp-includes/');
  
  // Fix navigation links to point to local pages
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/about\/?/g, './about.html');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/contact\/?/g, './contact.html');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/blogs\/?/g, './blogs.html');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/product\/farm-experiences-kits\/?/g, './products.html#farm-experiences');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/product\/seeds-farm-goods\/?/g, './products.html#seeds');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/product\/herbal-wellness-products\/?/g, './products.html#herbal');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/product\/dairy-animal-products\/?/g, './products.html#dairy');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/product\/natural-pantry-items\/?/g, './products.html#pantry');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/terms-conditions\/?/g, './terms.html');
  html = html.replace(/https:\/\/greensprout\.kirki\.io\/?(?=["'])/g, './preview.html');

  // Add Google Fonts
  const fontTag = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">';
  html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n\t' + fontTag);

  // 5. Write the About page
  console.log('\n5. Writing about.html...');
  fs.writeFileSync('e:/greenspout/about.html', html, 'utf8');
  console.log('   Done! about.html written.');

  // 6. Also update preview.html (homepage) to fix navigation links
  console.log('\n6. Updating homepage links...');
  let homepage = fs.readFileSync('e:/greenspout/preview.html', 'utf8');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/about\/?/g, './about.html');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/contact\/?/g, './contact.html');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/blogs\/?/g, './blogs.html');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/product\/farm-experiences-kits\/?/g, './products.html#farm-experiences');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/product\/seeds-farm-goods\/?/g, './products.html#seeds');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/product\/herbal-wellness-products\/?/g, './products.html#herbal');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/product\/dairy-animal-products\/?/g, './products.html#dairy');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/product\/natural-pantry-items\/?/g, './products.html#pantry');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/terms-conditions\/?/g, './terms.html');
  homepage = homepage.replace(/https:\/\/greensprout\.kirki\.io\/?(?=["'])/g, './preview.html');
  fs.writeFileSync('e:/greenspout/preview.html', homepage, 'utf8');
  console.log('   Homepage links updated!');

  console.log('\n✅ All done!');
}

main().catch(console.error);
