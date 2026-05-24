/**
 * AGGRESSIVE "Others" / "Terms of Service" REMOVAL from ALL HTML files
 * Uses multiple patterns to catch all variations.
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'e:\\greenspout';

function getAllHtmlFiles(dir) {
  const files = [];
  fs.readdirSync(dir).forEach(item => {
    const full = path.join(dir, item);
    if (['.git', 'node_modules', 'scratch'].includes(item)) return;
    if (fs.statSync(full).isDirectory()) {
      files.push(...getAllHtmlFiles(full));
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  });
  return files;
}

const htmlFiles = getAllHtmlFiles(ROOT);
console.log(`Scanning ${htmlFiles.length} HTML files...\n`);

let fixed = 0;
htmlFiles.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  const original = content;
  
  // Pattern 1: The entire Others div block from dpjh2nl5 to the closing </div></div>
  // This is: <div class="kirki-s219-dpnjm05m" data-kirki="dpjh2nl5">..Others..Terms of Service..</div></div>
  content = content.replace(/<div\s+class="kirki-s219-dpnjm05m"\s+data-kirki="dpjh2nl5">.*?<\/div>\s*<\/div>/gs, '');
  
  // Pattern 2: catch any remaining dpjh2nl5 blocks
  content = content.replace(/<div[^>]*data-kirki="dpjh2nl5"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '');
  
  // Pattern 3: If "Others" heading still exists in a footer column, remove the whole column
  // Match the pattern: <p ...>Others</p><div ...><a ...>Terms of Service</a></div>
  content = content.replace(/<p[^>]*>Others<\/p>\s*<div[^>]*>[\s\S]*?Terms of Service[\s\S]*?<\/div>/g, '');
  
  // Pattern 4: Bangla version - অন্যান্য
  content = content.replace(/<p[^>]*>অন্যান্য<\/p>\s*<div[^>]*>[\s\S]*?<\/div>/g, '');
  
  // Also remove translation entries for "Others" and "Terms of Service"
  content = content.replace(/"Others"\s*:\s*"অন্যান্য"\s*,?/g, '');
  content = content.replace(/"Terms of Service"\s*:\s*"সেবার শর্তাবলী"\s*,?/g, '');
  
  if (content !== original) {
    fs.writeFileSync(p, content, 'utf8');
    console.log(`  FIXED: ${path.relative(ROOT, p)}`);
    fixed++;
  }
});

console.log(`\n✅ Fixed ${fixed} files.`);

// Verify
console.log('\nVerifying...');
let remaining = 0;
getAllHtmlFiles(ROOT).forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('dpjh2nl5') || (content.includes('>Others<') && content.includes('Terms of Service'))) {
    console.log(`  STILL HAS IT: ${path.relative(ROOT, p)}`);
    remaining++;
  }
});
console.log(remaining === 0 ? '✅ All clean!' : `⚠️ ${remaining} files still have remnants`);
