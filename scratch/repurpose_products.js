const fs = require('fs');

let content = fs.readFileSync('e:\\greenspout\\products.html', 'utf8');

// Title & Meta
content = content.replace(/<title>Our Crops &#038; Kits &#8211; KSFL Agro Ltd.<\/title>/g, '<title>Micronutrients – KSFL Agro Ltd.</title>');
content = content.replace(/<title>Our Crops & Kits – KSFL Agro Ltd.<\/title>/g, '<title>Micronutrients – KSFL Agro Ltd.</title>');
content = content.replace(/<title>Farm Experiences &#038; Kits &#8211; KSFL Agro Ltd.<\/title>/g, '<title>Micronutrients – KSFL Agro Ltd.</title>');
content = content.replace(/<meta name="description" content="Farm Experiences &amp; Kits" \/>/g, '<meta name="description" content="Premium organic micronutrients and soil supplements by KSFL Agro Ltd." />');

// Hero texts
content = content.replace(/Our Crops<\/p>/g, 'Micronutrients</p>');
content = content.replace(/Farm Experiences &amp; Kits<\/p>/g, 'Micronutrients</p>');
content = content.replace(/Farm Experiences & Kits<\/p>/g, 'Micronutrients</p>');

// Subtitles
content = content.replace(
  /Farm tours, workshops, and DIY kits — learn, grow, and experience real organic living\./g,
  "Organic soil enhancers, natural plant boosters, and mineral supplements for high-yielding crops."
);

// Pantry items -> Micronutrients text replacements
content = content.replace(/We make every pantry item from our own organic farm/g, "We craft every organic micronutrient with premium natural inputs from our farm");
content = content.replace(/Explore our collection of organic pantry essentials, made fresh from our own farm\./g, "Explore our premium organic micronutrients and soil supplements, made fresh from our own farm.");
content = content.replace(/Each jar and bottle is freshly sealed with love, ready to bring organic purity straight to your pantry\./g, "Each package is sealed to lock in potency, ready to bring pure vitality straight to your farm.");

// Bangla translations
content = content.replace(
  /"We craft every organic micronutrient with premium natural inputs from our farm": "আমরা আমাদের খামারের তাজা উপাদান ব্যবহার করে প্রিমিয়াম জৈব মাইক্রোনিউট্রিয়েন্টস তৈরি করি",/g,
  ''
);

// We will also append the custom Bangla translation mappings to the dictionary in the page
const dictMarker = 'const dict = {';
if (content.includes(dictMarker)) {
  const customTranslations = `const dict = {
        "We craft every organic micronutrient with premium natural inputs from our farm": "আমরা আমাদের খামারের তাজা উপাদান ব্যবহার করে প্রিমিয়াম জৈব মাইক্রোনিউট্রিয়েন্টস তৈরি করি",
        "Explore our premium organic micronutrients and soil supplements, made fresh from our own farm.": "আমাদের খামারের প্রিমিয়াম জৈব মাইক্রোনিউট্রিয়েন্টস এবং মাটির পুষ্টি উপাদানের সংগ্রহ দেখুন।",
        "Each package is sealed to lock in potency, ready to bring pure vitality straight to your farm.": "প্রতিটি প্যাকেট পুষ্টি গুণাগুণ ধরে রাখার জন্য সিল করা হয়েছে, যা আপনার খামারে বিশুদ্ধ জীবনীশক্তি আনতে প্রস্তুত।",
        "Organic soil enhancers, natural plant boosters, and mineral supplements for high-yielding crops.": "উচ্চ ফলনশীল ফসলের জন্য জৈব মাটি বৃদ্ধিকারী, প্রাকৃতিক উদ্ভিদ বুস্টার এবং খনিজ পরিপূরক।",
        "Micronutrients – KSFL Agro Ltd.": "মাইক্রোনিউট্রিয়েন্টস – কেএসএফএল এগ্রো লিঃ",`;
  content = content.replace(dictMarker, customTranslations);
}

fs.writeFileSync('e:\\greenspout\\products.html', content, 'utf8');
console.log('Successfully repurposed products.html to Micronutrients page!');
