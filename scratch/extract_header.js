const fs = require('fs');
const path = require('path');

const root = 'e:\\greenspout';

function extractHeader(file) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const startIdx = content.indexOf('<section class="kirki-s220-dp3o6qiv"');
  if (startIdx === -1) return 'NOT FOUND';
  
  // Find the end of the section by matching closing tag (approximate)
  const endIdx = content.indexOf('</section>', startIdx);
  if (endIdx === -1) return 'NO END TAG';
  
  return content.substring(startIdx, endIdx + 10);
}

console.log('--- INDEX.HTML HEADER ---');
const idxHeader = extractHeader('index.html');
console.log(idxHeader.substring(0, 300) + '...');
console.log(`Length: ${idxHeader.length}`);

console.log('\n--- ABOUT.HTML HEADER ---');
const abHeader = extractHeader('about.html');
console.log(abHeader.substring(0, 300) + '...');
console.log(`Length: ${abHeader.length}`);
