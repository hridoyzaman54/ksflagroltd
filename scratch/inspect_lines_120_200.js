const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

for (let i = 120; i < 200; i++) {
  console.log(`L${i+1}: ${lines[i].trim().substring(0, 200)}`);
}
