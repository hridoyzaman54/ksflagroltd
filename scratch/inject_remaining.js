/**
 * Inject nav-footer-enhancer.js into homepage, about, blogs, contact, seeds, products pages
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = 'nav-footer-enhancer.js';

const pages = [
  { file: path.join(ROOT, 'index.html'), src: './assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'about.html'), src: './assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'blogs.html'), src: './assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'contact.html'), src: './assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'seeds.html'), src: './assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'products.html'), src: './assets/js/nav-footer-enhancer.js' },
];

let ok = 0, skip = 0;
for (const p of pages) {
  if (!fs.existsSync(p.file)) {
    console.log(`SKIP (not found): ${path.relative(ROOT, p.file)}`);
    skip++;
    continue;
  }
  let content = fs.readFileSync(p.file, 'utf8');
  if (content.includes(MARKER)) {
    console.log(`SKIP (exists): ${path.relative(ROOT, p.file)}`);
    skip++;
    continue;
  }
  const tag = `\n<script src="${p.src}" defer></script>\n`;
  const idx = content.lastIndexOf('</body>');
  if (idx === -1) { console.error(`NO </body>: ${p.file}`); continue; }
  content = content.substring(0, idx) + tag + content.substring(idx);
  fs.writeFileSync(p.file, content, 'utf8');
  console.log(`OK: ${path.relative(ROOT, p.file)}`);
  ok++;
}
console.log(`Done. ${ok} updated, ${skip} skipped.`);
