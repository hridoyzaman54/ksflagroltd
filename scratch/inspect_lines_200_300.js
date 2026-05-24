const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

for (let i = 200; i < 300; i++) {
  console.log(`L${i+1}: ${lines[i].trim().substring(0, 200)}`);
}
