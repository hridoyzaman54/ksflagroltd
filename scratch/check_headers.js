const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
        getHtmlFiles(fullPath, files);
      }
    } else if (file.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const root = 'e:\\greenspout';
const files = getHtmlFiles(root);

console.log(`Found ${files.length} HTML files to inspect:\n`);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const navbarMatches = content.match(/<section[^>]*class="[^"]*kirki-s220-dp3o6qiv[^"]*"[^>]*>/i);
  const productsLiMatches = content.match(/<li[^>]*data-kirki="dpkzemwd"[^>]*>/i);
  const enhancerLinked = content.includes('nav-footer-enhancer.js');
  const mobileFixLinked = content.includes('mobile-fix.css');
  
  const relPath = path.relative(root, file);
  console.log(`${relPath}:`);
  console.log(`  Navbar section found: ${navbarMatches ? 'Yes' : 'NO'}`);
  console.log(`  Products Li (dpkzemwd) found: ${productsLiMatches ? 'Yes' : 'NO'}`);
  console.log(`  Enhancer linked: ${enhancerLinked ? 'Yes' : 'NO'}`);
  console.log(`  mobile-fix.css linked: ${mobileFixLinked ? 'Yes' : 'NO'}`);
}
