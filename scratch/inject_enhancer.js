/**
 * Inject nav-footer-enhancer.js script tag into our-crops.html
 * and all 12 crop detail pages.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = 'nav-footer-enhancer.js';

// Pages to update
const pages = [
  {
    file: path.join(ROOT, 'our-crops.html'),
    scriptSrc: './assets/js/nav-footer-enhancer.js'
  }
];

// Add all crop detail pages
const cropsDir = path.join(ROOT, 'our-crops');
const cropFolders = fs.readdirSync(cropsDir).filter(f => {
  return fs.statSync(path.join(cropsDir, f)).isDirectory();
});

for (const folder of cropFolders) {
  const indexPath = path.join(cropsDir, folder, 'index.html');
  if (fs.existsSync(indexPath)) {
    pages.push({
      file: indexPath,
      scriptSrc: '../../assets/js/nav-footer-enhancer.js'
    });
  }
}

console.log(`Found ${pages.length} pages to update:`);
pages.forEach(p => console.log(`  - ${path.relative(ROOT, p.file)}`));

let successCount = 0;
let skipCount = 0;

for (const page of pages) {
  let content = fs.readFileSync(page.file, 'utf8');
  
  // Check if already injected
  if (content.includes(MARKER)) {
    console.log(`SKIP (already injected): ${path.relative(ROOT, page.file)}`);
    skipCount++;
    continue;
  }
  
  // Build the script tag
  const scriptTag = `\n<script src="${page.scriptSrc}" defer></script>\n`;
  
  // Insert before </body>
  const bodyCloseIdx = content.lastIndexOf('</body>');
  if (bodyCloseIdx === -1) {
    console.error(`ERROR: No </body> found in ${path.relative(ROOT, page.file)}`);
    continue;
  }
  
  content = content.substring(0, bodyCloseIdx) + scriptTag + content.substring(bodyCloseIdx);
  
  fs.writeFileSync(page.file, content, 'utf8');
  console.log(`OK: Injected into ${path.relative(ROOT, page.file)}`);
  successCount++;
}

console.log(`\nDone. ${successCount} updated, ${skipCount} skipped.`);
