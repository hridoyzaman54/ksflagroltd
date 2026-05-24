const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

const imgToFind = 'product-img-';
lines.forEach((line, idx) => {
  if (line.includes(imgToFind)) {
    console.log(`L${idx+1}: ${line.trim().substring(0, 300)}`);
    // Print 10 lines before and after
    console.log('\n--- context ---');
    for (let i = Math.max(0, idx - 10); i <= Math.min(lines.length - 1, idx + 10); i++) {
      console.log(`L${i+1}: ${lines[i].trim().substring(0, 180)}`);
    }
    console.log('---------------\n');
  }
});
