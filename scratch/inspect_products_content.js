const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\products.html', 'utf8');
const lines = content.split('\n');

console.log('--- Headings and Sections in products.html: ---');
lines.forEach((line, idx) => {
  if (line.includes('<section') || line.includes('<h2') || line.includes('<h1') || line.includes('id=')) {
    if (line.includes('id="') || line.includes('class="h') || line.includes('class="container')) {
      console.log(`L${idx+1}: ${line.trim().substring(0, 200)}`);
    }
  }
});
