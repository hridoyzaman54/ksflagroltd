const fs = require('fs');
const path = require('path');

const rootDir = 'e:\\greenspout';

function cleanHtml(content, isSub) {
  // 1. Purge Herbal and Dairy nav elements in header & footer
  // Match any div wrapping products.html#herbal or products.html#dairy
  content = content.replace(/<div[^>]*>\s*<a[^>]*href="[^"]*products\.html#herbal"[^>]*>.*?<\/a>\s*<\/div>/gs, '');
  content = content.replace(/<div[^>]*>\s*<a[^>]*href="[^"]*products\.html#dairy"[^>]*>.*?<\/a>\s*<\/div>/gs, '');

  // Also remove from translation config JSON (inside textarea) if necessary, but simple regex replaces it in HTML
  
  // 2. Update Farm Experiences -> Our Crops
  content = content.replace(/products\.html#farm-experiences/g, 'our-crops.html');
  content = content.replace(/Farm Experiences & Kits/g, 'Our Crops');
  content = content.replace(/Farm Experiences &amp; Kits/g, 'Our Crops');
  content = content.replace(/Farm Experiences &#038; Kits/g, 'Our Crops');
  
  // 3. Update Natural Pantry Items -> Micronutrients
  content = content.replace(/products\.html#pantry/g, 'products.html');
  content = content.replace(/Natural Pantry Items/g, 'Micronutrients');
  
  // 4. Testimonial swap
  content = content.replace(
    /I enjoyed KSFL Agro Ltd\.'s herbal tea! The chamomile and mint blend was calming\./g,
    "I highly recommend KSFL Agro Ltd.'s organic seeds and crops! Outstanding quality and yields."
  );
  content = content.replace(
    /আমি তাদের ভেষজ চা খুব উপভোগ করেছি! বিশেষ করে ক্যামোমাইল ও পুদিনা মিশ্রণটি বেশ প্রশান্তিদায়ক ছিল।/g,
    "আমি কেএসএফএল এগ্রো লিঃ এর জৈব বীজ এবং ফসলের সুপারিশ করছি! অসাধারণ মান এবং ফলন।"
  );
  
  // 5. Inject Bangla translation dictionary entries
  const dictMarker = 'const dict = {';
  if (content.includes(dictMarker)) {
    const injectedDict = 'const dict = {\n        "Our Crops": "আমাদের ফসল",\n        "Micronutrients": "মাইক্রোনিউট্রিয়েন্টস",\n        "Grown with care at our Mirpur 10, Dhaka farm": "আমাদের মিরপুর ১০, ঢাকা খামারে যত্নে উৎপাদিত",\n        "Rice": "ধান",\n        "Bottle Gourd": "লাউ",\n        "Sweet Pumpkin": "মিষ্টি কুমড়া",\n        "Cucumber": "শসা",\n        "Radish": "মূলা",\n        "Pointed Gourd": "পটল",\n        "Okra": "ঢেঁড়স",\n        "Bitter Gourd": "করলা",\n        "Eggplant": "বেগুন",\n        "Potato": "গোল আলু",';
    content = content.replace(dictMarker, injectedDict);
  }
  
  return content;
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
      const isSub = (dir !== rootDir);
      let content = fs.readFileSync(fullPath, 'utf8');
      const updated = cleanHtml(content, isSub);
      fs.writeFileSync(fullPath, updated, 'utf8');
      console.log(`Processed: ${fullPath}`);
    }
  });
}

traverse(rootDir);
console.log('Global restructuring complete!');
