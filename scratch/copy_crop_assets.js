const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\1fa47953-83a4-4add-94ef-5ef83ee99e4d';
const destDir = 'e:\\greenspout\\assets\\crops';

// Ensure destDir exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const cropMapping = {
  'crop_rice': 'rice.png',
  'crop_bottle_gourd': 'bottle-gourd.png',
  'crop_sweet_pumpkin': 'sweet-pumpkin.png',
  'crop_cucumber': 'cucumber.png',
  'crop_radish': 'radish.png',
  'crop_pointed_gourd': 'pointed-gourd.png',
  'crop_okra': 'okra.png',
  'crop_bitter_gourd': 'bitter-gourd.png',
  'crop_eggplant': 'eggplant.png',
  'crop_potato': 'potato.png'
};

files.forEach(file => {
  for (const prefix in cropMapping) {
    if (file.startsWith(prefix) && file.endsWith('.png')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, cropMapping[prefix]);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} -> ${cropMapping[prefix]}`);
    }
  }
});

console.log('Copy complete!');
