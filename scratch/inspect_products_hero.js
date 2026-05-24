const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\products.html', 'utf8');
const lines = content.split('\n');

for (let i = 280; i < 292; i++) {
  console.log(`L${i+1}: ${lines[i].trim().substring(0, 300)}`);
}
