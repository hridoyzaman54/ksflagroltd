const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');
const lines = content.split('\n');

for (let i = 340; i <= 360; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
