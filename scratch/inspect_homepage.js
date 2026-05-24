const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

console.log('--- Nav Items lines: ---');
lines.forEach((line, idx) => {
  if (idx >= 260 && idx <= 325) {
    console.log(`L${idx+1}: ${line.trim()}`);
  }
});

console.log('\n--- Section around L330 to L380: ---');
lines.forEach((line, idx) => {
  if (idx >= 325 && idx <= 390) {
    console.log(`L${idx+1}: ${line.trim()}`);
  }
});
