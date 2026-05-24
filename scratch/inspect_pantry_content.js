const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\products.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('pantry') || line.includes('Pantry') || line.includes('Experiences') || line.includes('experiences')) {
    console.log(`L${idx+1}: ${line.trim().substring(0, 180)}`);
  }
});
