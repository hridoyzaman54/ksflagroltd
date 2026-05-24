const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\greenspout';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Replace the English Title in recent blogs card
  content = content.replace(
    /The Journey of Farm-to-Table Dairy: Freshness to Your Home/g,
    "KSFL Agro's Guide to Zero-Waste Farming"
  );
  
  // 2. Replace the links to the deleted dairy directory
  content = content.replace(
    /the-journey-of-farm-to-table-dairy-freshness-to-your-home\//g,
    "ksfl-agros-guide-to-zerowaste-farming/"
  );
  
  // 3. Replace the translation mapping in dict
  content = content.replace(
    /"খামার থেকে ঘরে দুগ্ধজাত পণ্যের যাত্রা"/g,
    '"কেএসএফএল এগ্রো-এর জিরো-ওয়েস্ট ফার্মিং নির্দেশিকা"'
  );
  content = content.replace(
    /খামার থেকে ঘরে দুগ্ধজাত পণ্যের যাত্রা/g,
    'কেএসএফএল এগ্রো-এর জিরো-ওয়েস্ট ফার্মিং নির্দেশিকা'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated footer blog references in: ${filePath}`);
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
      fixFile(fullPath);
    }
  });
}

traverse(rootDir);
console.log('All recent blog references replaced successfully!');
