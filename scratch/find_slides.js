const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const lines = content.split('\n');

let maskIdx = -1;
lines.forEach((line, idx) => {
  if (line.includes('kirki-slider-mask')) {
    maskIdx = idx;
  }
});

if (maskIdx !== -1) {
  console.log(`Found slider mask on line ${maskIdx + 1}`);
  // Let's search inside the next few lines for slider items
  for (let i = maskIdx; i < maskIdx + 30; i++) {
    console.log(`L${i+1}: ${lines[i].trim().substring(0, 500)}`);
  }
}
