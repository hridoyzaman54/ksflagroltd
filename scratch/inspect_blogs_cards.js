const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');
const lines = content.split('\n');

for (let i = 319; i < 390; i++) {
  console.log(`L${i+1}: ${lines[i].trim().substring(0, 500)}`);
}
