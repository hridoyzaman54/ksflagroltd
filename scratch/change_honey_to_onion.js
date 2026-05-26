const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'about.html',
  'blogs.html',
  'contact.html',
  'extracted_products_subpage.html',
  'index.html',
  'preview.html',
  'products.html',
  'seeds.html',
  'site/index.html'
];

const basePath = 'e:\\greenspout';

filesToUpdate.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace English occurrences
  const originalEnglish = 'Witness the Pure Process Behind Our Golden Honey';
  const newEnglish = 'Witness the Pure Process Behind Our Onions';

  // Replace Bangla occurrences (both standard spelling variation of 'প্রক্রিয়া' and 'প্রক্রিয়া')
  const originalBangla1 = 'আমাদের সোনালী মধুর পেছনের বিশুদ্ধ প্রক্রিয়াটি দেখুন';
  const originalBangla2 = 'আমাদের সোনালী মধুর পেছনের বিশুদ্ধ প্রক্রিয়াটি দেখুন';
  const newBangla = 'আমাদের পেঁয়াজের পেছনের বিশুদ্ধ প্রক্রিয়াটি দেখুন';

  let replaced = false;

  if (content.includes(originalEnglish)) {
    content = content.split(originalEnglish).join(newEnglish);
    replaced = true;
  }

  if (content.includes(originalBangla1)) {
    content = content.split(originalBangla1).join(newBangla);
    replaced = true;
  }

  if (content.includes(originalBangla2)) {
    content = content.split(originalBangla2).join(newBangla);
    replaced = true;
  }

  if (replaced) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated: ${file}`);
  } else {
    console.log(`No changes needed in: ${file}`);
  }
});
