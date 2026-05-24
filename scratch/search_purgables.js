const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\greenspout';

function searchFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const results = [];
  
  lines.forEach((line, idx) => {
    let matched = false;
    if (line.includes('Herbal') || line.includes('Dairy') || line.includes('Pantry') || line.includes('Experiences')) {
      results.push({ lineNum: idx + 1, content: line.trim() });
    }
  });
  
  if (results.length > 0) {
    console.log(`\n=== File: ${filePath} ===`);
    results.slice(0, 30).forEach(res => {
      console.log(`L${res.lineNum}: ${res.content.substring(0, 150)}`);
    });
    if (results.length > 30) {
      console.log(`... and ${results.length - 30} more matches`);
    }
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules' && file !== 'assets') {
        traverse(fullPath);
      }
    } else if (file.endsWith('.html')) {
      searchFile(fullPath);
    }
  });
}

traverse(rootDir);
console.log('\nSearch complete!');
