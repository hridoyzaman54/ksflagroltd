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

const newTranslations = `,
        "Soil Prep & Composting": "মাটি প্রস্তুতি ও কম্পোস্টিং",
        "1. Soil Prep & Composting": "১. মাটি প্রস্তুতি ও কম্পোস্টিং",
        "1. Soil Prep & Composting": "১. মাটি প্রস্তুতি ও কম্পোস্টিং",
        "We begin by testing and preparing the soil using organic compost, green manure, and crop residue. This step ensures the soil stays healthy and fertile without synthetic inputs.": "আমরা জৈব সার, সবুজ সার এবং ফসলের অবশিষ্টাংশ ব্যবহার করে মাটি পরীক্ষা এবং প্রস্তুত করার মাধ্যমে শুরু করি। এই পদক্ষেপটি কোনো কৃত্রিম উপাদান ছাড়াই মাটিকে সুস্থ এবং উর্বর রাখতে নিশ্চিত করে।",
        "Harvesting & Sorting": "ফসল সংগ্রহ ও বাছাইকরণ",
        "3. Harvesting & Sorting": "৩. ফসল সংগ্রহ ও বাছাইকরণ",
        "3. Harvesting & Sorting": "৩. ফসল সংগ্রহ ও বাছাইকরণ",
        "Once crops mature, they’re hand-harvested carefully to avoid damage. Fresh produce is then sorted and cleaned naturally — no wax or preservatives.": "ফসল পরিপক্ক হয়ে গেলে ক্ষতি এড়াতে সাবধানে হাতে সংগ্রহ করা হয়। এরপর তাজা শাকসবজি বাছাই করা হয় এবং প্রাকৃতিকভাবে পরিষ্কার করা হয় - কোনো মোম বা প্রিজারভেটিভ ছাড়া।",
        "Once crops mature, they're hand-harvested carefully to avoid damage. Fresh produce is sorted and cleaned naturally — no wax or preservatives.": "ফসল পরিপক্ক হয়ে গেলে ক্ষতি এড়াতে সাবধানে হাতে সংগ্রহ করা হয়। এরপর তাজা শাকসবজি বাছাই করা হয় এবং প্রাকৃতিকভাবে পরিষ্কার করা হয় - কোনো মোম বা প্রিজারভেটিভ ছাড়া।",
        "Once crops mature, they’re hand-harvested carefully to avoid damage. Fresh produce is sorted and cleaned naturally — no wax or preservatives.": "ফসল পরিপক্ক হয়ে গেলে ক্ষতি এড়াতে সাবধানে হাতে সংগ্রহ করা হয়। এরপর তাজা শাকসবজি বাছাই করা হয় এবং প্রাকৃতিকভাবে পরিষ্কার করা হয় - কোনো মোম বা প্রিজারভেটিভ ছাড়া।"`;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // 1. Sanitize the non-breaking space in the HTML itself to a normal space
  content = content.replace(/1\.\s+Soil Prep & Composting/gi, '1. Soil Prep & Composting');
  content = content.replace(/1\. Soil Prep & Composting/gi, '1. Soil Prep & Composting');
  content = content.replace(/3\.\s+Harvesting & Sorting/gi, '3. Harvesting & Sorting');
  content = content.replace(/3\. Harvesting & Sorting/gi, '3. Harvesting & Sorting');

  // Also clean the paragraph text in step 3 to match straight or curly apostrophes perfectly
  content = content.replace(/they’re/g, "they're");
  content = content.replace(/they're/g, "they're");

  // 2. Append new translations into the dict
  if (!content.includes('মাটি প্রস্তুতি ও কম্পোস্টিং')) {
    content = content.replace(/("Green Sprout": "গ্রিন স্প্রাউট")/g, `$1${newTranslations}`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Successfully updated ${file}`);
});
