const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');
const lines = content.split('\n');

const keyword = 'Dairy: Freshness to Your Home';
lines.forEach((line, idx) => {
  if (line.includes(keyword)) {
    console.log(`Matched line ${idx+1}`);
    // Print 35 lines before and after to get the entire blog item structure
    for (let i = Math.max(0, idx - 25); i <= Math.min(lines.length - 1, idx + 25); i++) {
      console.log(`L${i+1}: ${lines[i].trim().substring(0, 300)}`);
    }
  }
});
