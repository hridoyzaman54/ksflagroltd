const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

for (let i = 145; i < 325; i++) {
  console.log(`L${i+1}: ${lines[i].trim()}`);
}
