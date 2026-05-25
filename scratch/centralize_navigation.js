const fs = require('fs');
const path = require('path');

const ROOT = 'e:\\greenspout';

// 1. Recursive finder to catch all HTML files in greenspout workspace
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Ignore heavy non-code directories
    if (stat.isDirectory()) {
      if (!['.git', 'node_modules', 'assets', 'scratch', 'site'].includes(file)) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (stat.isFile() && file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = findHtmlFiles(ROOT);
console.log(`Found ${htmlFiles.length} HTML files to clean up.`);

// 2. Define Regex cleaners
const styleFixRegex = /<style id="ksfl-header-nav-fix">[\s\S]*?<\/style>/gi;
const jsFixRegex = /<script id="ksfl-header-nav-fix-js">[\s\S]*?<\/script>/gi;
const footerFixRegex = /<script id="ksfl-footer-fix">[\s\S]*?<\/script>/gi;

// Competing top-of-body inline mobile toggle scripts
const inlineHamburgerRegex = /<script>\s*document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*function\(\)\s*\{\s*var\s+hamburgerBtn\s*=\s*document\.querySelector\(\s*['"]\.kirki-s220-dpjglwhg['"]\s*\);[\s\S]*?<\/script>/gi;

// Deprecated mobile-header.js tags
const mobileHeaderJsRegex = /<script[^>]*src=["'][^"']*mobile-header\.js[^"']*["'][^>]*>\s*<\/script>/gi;

let updatedCount = 0;

htmlFiles.forEach(filePath => {
  const relativePath = path.relative(ROOT, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Perform cleanses
  content = content.replace(styleFixRegex, '');
  content = content.replace(jsFixRegex, '');
  content = content.replace(footerFixRegex, '');
  content = content.replace(inlineHamburgerRegex, '');
  content = content.replace(mobileHeaderJsRegex, '');

  // 3. Cache-busting for nav-footer-enhancer.js and mobile-fix.css
  // Update '?v=XXXXX' to '?v=20260525_clean' to completely bypass browser caching
  content = content.replace(/(nav-footer-enhancer\.js\?v=)[a-zA-Z0-9_]+/gi, '$120260525_clean');
  content = content.replace(/(nav-footer-enhancer\.js)(?!["']?\?)/gi, '$1?v=20260525_clean');
  
  content = content.replace(/(mobile-fix\.css\?v=)[a-zA-Z0-9_]+/gi, '$120260525_clean');
  content = content.replace(/(mobile-fix\.css)(?!["']?\?)/gi, '$1?v=20260525_clean');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned & Updated: ${relativePath}`);
    updatedCount++;
  } else {
    console.log(`No changes needed: ${relativePath}`);
  }
});

console.log(`\nSuccess: Centralized and cleaned navigation across ${updatedCount} HTML pages.`);
