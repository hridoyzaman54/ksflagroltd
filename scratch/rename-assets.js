const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];
const oldDirName = 'greensprout.kirki.io';
const newDirName = 'assets';

let modifiedCount = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes(oldDirName)) {
        content = content.split(oldDirName).join(newDirName);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
        modifiedCount++;
      }
    }
  }
}

console.log(`Updated ${modifiedCount} HTML files.`);
