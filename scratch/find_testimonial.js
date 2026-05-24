const fs = require('fs');
const path = require('path');

function searchFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Kamal') || content.includes('herbal tea') || content.includes('হোসনে আর') || content.includes('কামাল')) {
    console.log(`Found match in ${filePath}`);
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('Kamal') || line.includes('tea') || line.includes('কামাল')) {
        console.log(`  L${idx+1}: ${line.trim().substring(0, 150)}`);
      }
    });
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

traverse('e:\\greenspout');
