const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('dairy-freshness-to-your-home') || line.includes('Herbal Wellness')) {
    console.log(`L${idx+1}: ${line.trim().substring(0, 400)}`);
    console.log('--- context ---');
    for (let i = Math.max(0, idx - 8); i <= Math.min(lines.length - 1, idx + 8); i++) {
      console.log(`L${i+1}: ${lines[i].trim().substring(0, 180)}`);
    }
    console.log('---------------\n');
  }
});
