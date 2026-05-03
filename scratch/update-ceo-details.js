const fs = require('fs');
const path = require('path');

const files = [
  'E:/greenspout/about.html',
  'E:/greenspout/blogs.html',
  'E:/greenspout/contact.html',
  'E:/greenspout/extracted_products_subpage.html',
  'E:/greenspout/index.html',
  'E:/greenspout/preview.html',
  'E:/greenspout/products.html',
  'E:/greenspout/seeds.html',
  'E:/greenspout/site/index.html'
];

// 1. Update HTML in about.html
let aboutContent = fs.readFileSync('E:/greenspout/about.html', 'utf8');

aboutContent = aboutContent.replace(
  /<h3 style="font-size: 32px; color: var\(--premade_template_dprt5n21\); margin: 0 0 10px 0;">Jonathan Reynolds<\/h3>/,
  '<h3 style="font-size: 32px; color: var(--premade_template_dprt5n21); margin: 0 0 10px 0;">Monwar Hossain</h3>'
);

aboutContent = aboutContent.replace(
  /<p style="color: #4a5d4e; font-size: 18px; line-height: 1.6; margin: 0;">Jonathan is a visionary leader/,
  '<p style="color: #4a5d4e; font-size: 18px; line-height: 1.6; margin: 0;">Monwar is a visionary leader'
);

fs.writeFileSync('E:/greenspout/about.html', aboutContent, 'utf8');
console.log('HTML updated in about.html successfully.');

// 2. Update all 9 HTML files' dictionary mappings
files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Update Jonathan Reynolds string
  content = content.replace(
    /"Jonathan Reynolds":\s*"জনাথন রেনল্ডস",?/g,
    '"Monwar Hossain": "মনোয়ার হোসেন",'
  );

  // Update Jonathan is a visionary leader string
  const oldParaKey = `"Jonathan is a visionary leader with over 20 years of experience in sustainable agriculture. He believes that the future of farming lies in the perfect balance of traditional wisdom and modern innovation. Under his guidance, KSFL Agro Ltd. has expanded its reach globally while maintaining its core commitment to organic, eco-friendly farming practices that nourish both people and the planet.": "জনাথন একজন দূরদর্শী নেতা যার টেকসই কৃষি ক্ষেত্রে ২০ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি বিশ্বাস করেন যে কৃষির ভবিষ্যৎ ঐতিহ্যগত জ্ঞান এবং আধুনিক উদ্ভাবনের নিখুঁত ভারসাম্যের মধ্যে নিহিত রয়েছে।",`;

  const newParaKey = `"Monwar is a visionary leader with over 20 years of experience in sustainable agriculture. He believes that the future of farming lies in the perfect balance of traditional wisdom and modern innovation. Under his guidance, KSFL Agro Ltd. has expanded its reach globally while maintaining its core commitment to organic, eco-friendly farming practices that nourish both people and the planet.": "মনোয়ার একজন দূরদর্শী নেতা যার টেকসই কৃষি ক্ষেত্রে ২০ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি বিশ্বাস করেন যে কৃষির ভবিষ্যৎ ঐতিহ্যগত জ্ঞান এবং আধুনিক উদ্ভাবনের নিখুঁত ভারসাম্যের মধ্যে নিহিত রয়েছে।",`;

  content = content.replace(oldParaKey, newParaKey);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated dictionary in ${file}`);
});
