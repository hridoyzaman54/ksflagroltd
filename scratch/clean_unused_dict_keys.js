const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\greenspout';

const targets = [
  /["']Herbal & Wellness Products["']:\s*["']ভেষজ ও সুস্থতা পণ্য["'],?/g,
  /["']Dairy & Animal Products["']:\s*["']দুগ্ধ ও প্রাণীজ পণ্য["'],?/g,
  /["']Herbal &#038; Wellness Products["']:\s*["']ভেষজ ও সুস্থতা পণ্য["'],?/g,
  /["']Dairy &#038; Animal Products["']:\s*["']দুগ্ধ ও প্রাণীজ পণ্য["'],?/g,
  /["']Herbal Wellness["']:\s*["']ভেষজ সুস্থতা["'],?/g,
  /["']Herbal teas, dried herbs, and natural extracts — crafted for wellness and a balanced lifestyle\.["']:\s*["']ভেষজ চা, শুকনো ভেষজ এবং প্রাকৃতিক নির্যাস — সুস্থতা এবং ভারসাম্যপূর্ণ জীবনযাপনের জন্য তৈরি।["'],?/g,
  /["']Milk, butter, cheese, and eggs — made with care from healthy animals\.["']:\s*["']দুধ, মাখন, পনির এবং ডিম — সুস্থ পশু থেকে অত্যন্ত যত্নে উৎপাদিত।["'],?/g
];

function cleanUnusedKeys(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  targets.forEach(regex => {
    content = content.replace(regex, '');
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned dictionary keys in: ${filePath}`);
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
      cleanUnusedKeys(fullPath);
    }
  });
}

traverse(rootDir);
console.log('Obsolete dictionary keys cleaning complete!');
