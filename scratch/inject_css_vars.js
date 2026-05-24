/**
 * INJECT CSS VARIABLES (from homepage) into ALL pages that need them.
 * This fixes the header font color, Contact button yellow bg, etc.
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'e:\\greenspout';

// These are the CSS custom properties from the homepage (line 299 of index.html)
const CSS_VARS = `
<style id="ksfl-css-variables">
:root {
  --premade_template_dpw2cmzz: rgba(90, 109, 63, 1.00);
  --premade_template_dpuu8y8d: rgba(240, 208, 19, 1.00);
  --premade_template_dphdxhps: rgba(243, 240, 235, 1.00);
  --premade_template_dprt5n21: rgba(41, 57, 32, 1.00);
  --premade_template_dp8lt4p6: rgba(184, 197, 149, 1.00);
  --premade_template_dpr6ma7w: rgba(220, 231, 182, 1.00);
  --dptshojw: rgba(255, 255, 255, 0.4);
  --premade_template_dpao3w1d: rgba(197, 201, 183, 1.00);
  --premade_template_dp0jl7mf: rgba(255, 255, 255, 1);
  --premade_template_dpd6mm8p: #000000;
  --premade_template_dpteta8s: Roboto;
  --premade_template_dp3di1m8: Roboto;
}
</style>
`;

const MARKER = 'ksfl-css-variables';

function getAllPages() {
  const pages = [];
  ['our-crops.html', 'about.html', 'blogs.html', 'contact.html', 'seeds.html', 'products.html'].forEach(f => {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) pages.push(p);
  });
  const cropsDir = path.join(ROOT, 'our-crops');
  if (fs.existsSync(cropsDir)) {
    fs.readdirSync(cropsDir).forEach(folder => {
      const idx = path.join(cropsDir, folder, 'index.html');
      if (fs.existsSync(idx)) pages.push(idx);
    });
  }
  fs.readdirSync(ROOT).forEach(item => {
    const idx = path.join(ROOT, item, 'index.html');
    if (!['our-crops','site','scratch','node_modules','assets','.git'].includes(item) && fs.existsSync(idx)) {
      pages.push(idx);
    }
  });
  return [...new Set(pages)];
}

const pages = getAllPages();
console.log(`Found ${pages.length} pages to check`);

let injected = 0, skipped = 0;
pages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  
  // Check if the page already has the kirki-variables-global style
  if (content.includes('kirki-variables-global')) {
    console.log(`  SKIP (has kirki vars): ${path.relative(ROOT, p)}`);
    skipped++;
    return;
  }
  
  // Remove old injection if exists
  if (content.includes(MARKER)) {
    content = content.replace(/<style id="ksfl-css-variables">[\s\S]*?<\/style>/g, '');
  }
  
  // Inject after <head> or before first <style>
  const headIdx = content.indexOf('</head>');
  if (headIdx === -1) {
    console.log(`  ERROR: no </head> in ${path.relative(ROOT, p)}`);
    return;
  }
  
  // Insert right after opening <head> or at beginning of head
  const headStart = content.indexOf('<head');
  const headEnd = content.indexOf('>', headStart) + 1;
  content = content.substring(0, headEnd) + CSS_VARS + content.substring(headEnd);
  
  fs.writeFileSync(p, content, 'utf8');
  console.log(`  OK: ${path.relative(ROOT, p)}`);
  injected++;
});

console.log(`\n✅ Done. Injected: ${injected}, Skipped: ${skipped}`);
