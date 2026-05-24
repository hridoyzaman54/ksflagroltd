const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MARKER = 'nav-footer-enhancer.js';

const blogPages = [
  { file: path.join(ROOT, 'eco-friendly-habits-small-changes-for-a-greener-life', 'index.html'), src: '../assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'ksfl-agros-guide-to-zerowaste-farming', 'index.html'), src: '../assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'starting-your-first-organic-garden-a-beginners-guide', 'index.html'), src: '../assets/js/nav-footer-enhancer.js' },
  { file: path.join(ROOT, 'top-5-lessons-learned-from-our-organic-farming-workshops', 'index.html'), src: '../assets/js/nav-footer-enhancer.js' },
];

let ok = 0, skip = 0;
for (const p of blogPages) {
  if (!fs.existsSync(p.file)) { console.log(`SKIP (not found): ${p.file}`); skip++; continue; }
  let content = fs.readFileSync(p.file, 'utf8');
  if (content.includes(MARKER)) { console.log(`SKIP (exists): ${path.basename(path.dirname(p.file))}`); skip++; continue; }
  const tag = `\n<script src="${p.src}" defer></script>\n`;
  const idx = content.lastIndexOf('</body>');
  if (idx === -1) { console.error(`NO </body>: ${p.file}`); continue; }
  content = content.substring(0, idx) + tag + content.substring(idx);
  fs.writeFileSync(p.file, content, 'utf8');
  console.log(`OK: ${path.basename(path.dirname(p.file))}`);
  ok++;
}
console.log(`Done. ${ok} updated, ${skip} skipped.`);
