const fs = require('fs');
const path = require('path');
const root = path.resolve('e:/greenspout');
const target = 'Seeds & Farm Goods';
const replacement = 'Pesticides';
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(target)) {
        const newContent = content.split(target).join(replacement);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}
walk(root);
console.log('Replacement complete');
