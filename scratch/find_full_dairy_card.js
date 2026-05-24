const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');
const lines = content.split('\n');

let start = -1;
let end = -1;
lines.forEach((line, idx) => {
  if (line.includes('kirki-s-69f4f5418d86d')) {
    console.log(`Match at line ${idx+1}: ${line.trim().substring(0, 150)}`);
  }
});
