const fs = require('fs');
const path = require('path');

const cropsDir = path.join(__dirname, '..', 'our-crops');

const allCrops = [
  {
    id: 'rice',
    titleEn: 'Rice',
    titleBn: 'ধান',
    scientific: 'Oryza sativa',
    descEn: 'High-yield organic long grain rice, locally harvested with pure organic care at our agro farm.',
    descBn: 'আমাদের এগ্রো ফার্মে সম্পূর্ণ জৈব পদ্ধতিতে যত্নে উৎপাদিত উচ্চ ফলনশীল ও পুষ্টিকর আমন ও বোরো ধান।'
  },
  {
    id: 'bottle-gourd',
    titleEn: 'Bottle Gourd',
    titleBn: 'লাউ',
    scientific: 'Lagenaria siceraria',
    descEn: 'Tender, water-rich bottle gourds grown in natural conditions.',
    descBn: 'ভিটামিন সমৃদ্ধ তাজা কচি লাউ সরাসরি আমাদের খামার থেকে।'
  },
  {
    id: 'sweet-pumpkin',
    titleEn: 'Sweet Pumpkin',
    titleBn: 'মিষ্টি কুমড়া',
    scientific: 'Cucurbita moschata',
    descEn: 'Vibrant orange organic pumpkins packed with vitamin A.',
    descBn: 'অত্যন্ত পুষ্টিকর এবং মিষ্টি স্বাদের তাজা মিষ্টি কুমড়া।'
  },
  {
    id: 'cucumber',
    titleEn: 'Cucumber',
    titleBn: 'শসা',
    scientific: 'Cucumis sativus',
    descEn: 'Crunchy, refreshing organic cucumbers for daily health.',
    descBn: 'অত্যন্ত সতেজ এবং ক্রাঞ্চি ও সুস্বাদু সালাদ শসা।'
  },
  {
    id: 'radish',
    titleEn: 'Radish',
    titleBn: 'মূলা',
    scientific: 'Raphanus sativus',
    descEn: 'Crisp, organically cultivated white radishes full of minerals.',
    descBn: 'খনিজ সমৃদ্ধ ও হজমে সাহায্যকারী সতেজ সাদা মূলা।'
  },
  {
    id: 'pointed-gourd',
    titleEn: 'Pointed Gourd',
    titleBn: 'পটল',
    scientific: 'Trichosanthes dioica',
    descEn: 'Delicious green pointed gourds, a staple Bangladeshi vegetable.',
    descBn: 'দেশীয় ঐতিহ্যবাহী ও সুস্বাদু সতেজ পটল।'
  },
  {
    id: 'okra',
    titleEn: 'Okra',
    titleBn: 'ঢেঁড়স',
    scientific: 'Abelmoschus esculentus',
    descEn: 'Fresh organic lady fingers, rich in fiber and vitamins.',
    descBn: 'ভিটামিন ও ফাইবার সমৃদ্ধ তাজা ও পুষ্টিকর ঢেঁড়স।'
  },
  {
    id: 'bitter-gourd',
    titleEn: 'Bitter Gourd',
    titleBn: 'করলা',
    scientific: 'Momordica charantia',
    descEn: 'Nutrient-dense organic bitter gourds, excellent for wellness.',
    descBn: 'পুষ্টিগুণে ভরপুর এবং ডায়াবেটিস নিয়ন্ত্রণে সাহায্যকারী তাজা করলা।'
  },
  {
    id: 'eggplant',
    titleEn: 'Eggplant',
    titleBn: 'বেগুন',
    scientific: 'Solanum melongena',
    descEn: 'Rich, glossy purple eggplants grown using bio-fertilizers.',
    descBn: 'সম্পূর্ণ জৈব সার ব্যবহারে উৎপাদিত মসৃণ ও তাজা গোল বেগুন।'
  },
  {
    id: 'potato',
    titleEn: 'Potato',
    titleBn: 'গোল আলু',
    scientific: 'Solanum tuberosum',
    descEn: 'Healthy, organic round potatoes loaded with complex carbs.',
    descBn: 'প্রতিদিনের প্রয়োজনীয় ও স্বাস্থ্যকর তাজা গোল আলু।'
  },
  {
    id: 'paddy-seeds',
    titleEn: 'Paddy Seeds',
    titleBn: 'ধানের বীজ',
    scientific: 'Oryza sativa (Seeds)',
    descEn: 'Premium organic paddy seeds selected for high germination rate and yield.',
    descBn: 'উচ্চ অঙ্কুরোদগম ও ফলনশীল প্রিমিয়াম ঐতিহ্যবাহী ধানের বীজ।'
  },
  {
    id: 'sweet-potato-seeds',
    titleEn: 'Sweet Potato Seeds',
    titleBn: 'মিষ্টি আলুর বীজ',
    scientific: 'Ipomoea batatas',
    descEn: 'Disease-free organic sweet potato vines and seed tubers for healthy roots.',
    descBn: 'রোগমুক্ত প্রিমিয়াম মিষ্টি আলুর লতা ও বীজ আলু।'
  }
];

// Helper to normalize line endings
const norm = (str) => str.replace(/\r\n/g, '\n');

// 1. Create paddy-seeds directory and page
const paddyDir = path.join(cropsDir, 'paddy-seeds');
if (!fs.existsSync(paddyDir)) {
  fs.mkdirSync(paddyDir, { recursive: true });
}

console.log('Generating Paddy Seeds page...');
let paddyContent = fs.readFileSync(path.join(cropsDir, 'rice', 'index.html'), 'utf8');
paddyContent = norm(paddyContent);

// Replace page title & hero content
paddyContent = paddyContent.replace(/<title>KSFL Agro Ltd.<\/title>/g, '<title>Paddy Seeds - KSFL Agro Ltd.</title>');
paddyContent = paddyContent.replace(/rice\.png/g, 'paddy-seeds.png');
paddyContent = paddyContent.replace(/alt="Rice"/g, 'alt="Paddy Seeds"');
paddyContent = paddyContent.replace(/alt="Rice"/g, 'alt="Paddy Seeds"');

// Replace Hero text L289-290
paddyContent = paddyContent.replace(
  `<span class="en-text">Rice</span>\n          <span class="bn-text">ধান</span>`,
  `<span class="en-text">Paddy Seeds</span>\n          <span class="bn-text">ধানের বীজ</span>`
);
paddyContent = paddyContent.replace(
  `&gt; \n          <span class="en-text">Rice</span><span class="bn-text">ধান</span>`,
  `&gt; \n          <span class="en-text">Paddy Seeds</span><span class="bn-text">ধানের বীজ</span>`
);

// Overview Section replacements
paddyContent = paddyContent.replace(
  `<span class="crop-scientific" style="font-size: 18px; display: block; margin-bottom: 10px;">Oryza sativa</span>`,
  `<span class="crop-scientific" style="font-size: 18px; display: block; margin-bottom: 10px;">Oryza sativa (Seeds)</span>`
);
paddyContent = paddyContent.replace(
  `<td class="val" style="font-style: italic;">Oryza sativa</td>`,
  `<td class="val" style="font-style: italic;">Oryza sativa (Seeds)</td>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">High-yield organic long grain rice, locally harvested with pure organic care at our agro farm. It is a staple food in Bangladesh, rich in energy and carbohydrates, grown with zero chemical pesticides or artificial growth agents.</span>`,
  `<span class="en-text">Premium organic paddy seeds selected for high germination rate and yield. Grown using local traditional methods combined with organic micronutrients for superior stress tolerance.</span>`
);
paddyContent = paddyContent.replace(
  `<span class="bn-text">আমাদের এগ্রো ফার্মে সম্পূর্ণ জৈব পদ্ধতিতে যত্নে উৎপাদিত উচ্চ ফলনশীল ও পুষ্টিকর আমন ও বোরো ধান। এটি আমাদের দেশের প্রধান খাদ্যশস্য, যা শূন্য রাসায়নিক কীটনাশক এবং জৈব সারের নিখুঁত সমন্বয়ে অত্যন্ত স্বাস্থ্যকর উপায়ে উৎপাদিত হয়।</span>`,
  `<span class="bn-text">উচ্চ অঙ্কুরোদগম ও ফলনশীল প্রিমিয়াম ঐতিহ্যবাহী ধানের বীজ। প্রাকৃতিক পদ্ধতিতে উৎপাদিত রোগমুক্ত ও গুণগত মানসম্পন্ন বীজ যা চমৎকার ফলন নিশ্চিত করে।</span>`
);

// Quick Facts Section replacements
paddyContent = paddyContent.replace(
  `<span class="en-text">Nov - Dec (Boro), May - June (Aman)</span>\n            <span class="bn-text">নভেম্বর - ডিসেম্বর (বোরো), মে - জুন (আমন)</span>`,
  `<span class="en-text">Nov - Jan (Boro), June - July (Aman)</span>\n            <span class="bn-text">নভেম্বর - জানুয়ারি (বোরো), জুন - জুলাই (আমন)</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">April - May (Boro), Nov - Dec (Aman)</span>\n            <span class="bn-text">এপ্রিল - মে (বোরো), নভেম্বর - ডিসেম্বর (আমন)</span>`,
  `<span class="en-text">April - May (Boro), Nov - Dec (Aman)</span>\n            <span class="bn-text">এপ্রিল - মে (বোরো), নভেম্বর - ডিসেম্বর (আমন)</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">140 - 150 days</span>\n            <span class="bn-text">১৪০ - ১৫০ দিন</span>`,
  `<span class="en-text">130 - 145 days</span>\n            <span class="bn-text">১৩০ - ১৪৫ দিন</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">2 - 2.5 Tons</span>\n            <span class="bn-text">২ - ২.৫ টন</span>`,
  `<span class="en-text">2.5 - 3.5 Tons</span>\n            <span class="bn-text">২.৫ - ৩.৫ টন</span>`
);

// Cultivation Guide updates (Accordion)
paddyContent = paddyContent.replace(
  `<span class="en-text">Plow the land 4 to 5 times deeply and apply laddering to retain standing water. Apply organic compost and well-decomposed cow dung uniformly during the final plowing.</span>`,
  `<span class="en-text">Plow nursery beds deeply and mix organic compost. Soil should be loose, rich in nutrients, and well-leveled to support tender root development.</span>`
);
paddyContent = paddyContent.replace(
  `<span class="bn-text">জমি ৪ থেকে ৫ বার গভীর চাষ দিয়ে মই দিয়ে কাদা ও সমান করতে হবে যাতে পানি ধরে রাখা যায়। শেষ চাষের সময় জৈব কম্পোস্ট এবং ভালোভাবে পচানো গোবর সার সমানভাবে প্রয়োগ করুন।</span>`,
  `<span class="bn-text">বীজতলা বা নার্সারি বেড গভীরভাবে চাষ করুন এবং প্রচুর জৈব সার মেশান। মাটি আলগা, পুষ্টিসমৃদ্ধ এবং সমান হওয়া আবশ্যক যাতে শিকড় সহজে ছড়াতে পারে।</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">Sow seeds in well-prepared nursery beds. Transplant 25-30 days old healthy seedlings into the main muddy field with a spacing of 20cm x 15cm.</span>`,
  `<span class="en-text">Soak seeds in clean water for 24 hours, then keep in a warm place to sprout. Sow sprouted seeds uniformly in the nursery bed. Keep moist but not flooded.</span>`
);
paddyContent = paddyContent.replace(
  `<span class="bn-text">ভালোভাবে প্রস্তুত বীজতলায় বীজ বপন করুন। ২৫-৩০ দিন বয়সী সুস্থ চারা মূল কাদাময় জমিতে ২০ সেমি x ১৫ সেমি দূরত্ব বজায় রেখে রোপণ করুন।</span>`,
  `<span class="bn-text">বীজ ২৪ ঘণ্টা পরিষ্কার পানিতে ভিজিয়ে রাখুন, তারপর চট বা উষ্ণ স্থানে রেখে অঙ্কুরিত করুন। অঙ্কুরিত বীজ সমানভাবে বীজতলায় বুনে দিন এবং আর্দ্রতা বজায় রাখুন।</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">Maintain a constant water depth of 2-5cm during the early vegetative and flowering stages. Drain out water 10-12 days before the scheduled harvest.</span>`,
  `<span class="en-text">Apply light watering to keep seedbeds damp. Avoid excessive flooding to prevent seed rot, ensuring adequate drainage for seedling vigor.</span>`
);
paddyContent = paddyContent.replace(
  `<span class="bn-text">চারার প্রাথমিক বৃদ্ধি এবং ফুল আসার সময় জমিতে ২-৫ সেমি গভীরতা পানি ধরে রাখুন। ফসল কাটার ১০-১২ দিন আগে মাঠের পানি নিষ্কাশন করে দিন।</span>`,
  `<span class="bn-text">বীজতলা হালকা আর্দ্র রাখতে নিয়মিত অল্প পানি সেচ দিন। বীজ পচন রোধে অতিরিক্ত পানি জমতে দেবেন না এবং সুনিষ্কাশন ব্যবস্থা রাখুন।</span>`
);

paddyContent = paddyContent.replace(
  `<span class="en-text">Install bamboo perches (Parching method) to attract insectivorous birds. Spray fresh neem seed kernel extract to deter stem borers and leaf folders.</span>`,
  `<span class="en-text">Use bio-fungicides to protect young seedlings from damping-off disease. Spray diluted organic neem oil if early leaf-eating pests appear.</span>`
);
paddyContent = paddyContent.replace(
  `<span class="bn-text">পোকাখেকো পাখি বসার জন্য জমিতে বাঁশের খুঁটি (পার্চিং পদ্ধতি) স্থাপন করুন। মাজরা পোকা এবং পাতা মোড়ানো পোকা দমনে তাজা নিম পাতার নির্যাস স্প্রে করুন।</span>`,
  `<span class="bn-text">চারা গাছের ড্যাম্পিং-অফ রোগ প্রতিরোধে জৈব ছত্রাকনাশক ব্যবহার করুন। প্রাথমিক অবস্থায় পোকা দেখা দিলে নিম তেল স্প্রে করুন।</span>`
);

// Nutritional Value Section
// Paddy seeds has different nutrients, let's keep the nutrient table simple and positive
paddyContent = paddyContent.replace(
  `<span class="en-text">Energy</span>\n          <span class="bn-text">শক্তি</span>\n        </td>\n        <td>\n          <span class="en-text">130 kcal</span>\n          <span class="bn-text">১৩০ কিলোক্যালরি</span>`,
  `<span class="en-text">Germination Rate</span>\n          <span class="bn-text">অঙ্কুরোদগম হার</span>\n        </td>\n        <td>\n          <span class="en-text">90% +</span>\n          <span class="bn-text">৯০% +</span>`
);
paddyContent = paddyContent.replace(
  `<span class="en-text">Carbohydrates</span>\n          <span class="bn-text">শর্করা</span>\n        </td>\n        <td>\n          <span class="en-text">28 g</span>\n          <span class="bn-text">২৮ গ্রাম</span>`,
  `<span class="en-text">Moisture Content</span>\n          <span class="bn-text">আর্দ্রতা পরিমাণ</span>\n        </td>\n        <td>\n          <span class="en-text">12% Max</span>\n          <span class="bn-text">১২% সর্বোচ্চ</span>`
);
paddyContent = paddyContent.replace(
  `<span class="en-text">Protein</span>\n          <span class="bn-text">আমিষ</span>\n        </td>\n        <td>\n          <span class="en-text">2.7 g</span>\n          <span class="bn-text">২.৭ গ্রাম</span>`,
  ` <span class="en-text">Purity</span>\n          <span class="bn-text">বীজের বিশুদ্ধতা</span>\n        </td>\n        <td>\n          <span class="en-text">98% +</span>\n          <span class="bn-text">৯৮% +</span>`
);
paddyContent = paddyContent.replace(
  `<span class="en-text">Fat</span>\n          <span class="bn-text">চর্বি</span>\n        </td>\n        <td>\n          <span class="en-text">0.3 g</span>\n          <span class="bn-text">০.৩ গ্রাম</span>`,
  `<span class="en-text">Organic Compost Mix</span>\n          <span class="bn-text">জৈব সারের মিশ্রণ</span>\n        </td>\n        <td>\n          <span class="en-text">Yes</span>\n          <span class="bn-text">হ্যাঁ</span>`
);

// Clean up remaining iron/calcium rows
paddyContent = paddyContent.replace(
  `      <tr>\n        <td style="font-weight: bold; color: var(--ksfl-green-accent);">\n          <span class="en-text">Iron</span>\n          <span class="bn-text">আয়রন</span>\n        </td>\n        <td>\n          <span class="en-text">1.2 mg</span>\n          <span class="bn-text">১.২ মিলিগ্রাম</span>\n        </td>\n      </tr>\n    \n      <tr>\n        <td style="font-weight: bold; color: var(--ksfl-green-accent);">\n          <span class="en-text">Calcium</span>\n          <span class="bn-text">ক্যালসিয়াম</span>\n        </td>\n        <td>\n          <span class="en-text">10 mg</span>\n          <span class="bn-text">১০ মিলিগ্রাম</span>\n        </td>\n      </tr>`,
  ''
);

// We need to register the custom terms in the page-specific dictionary at the bottom.
const paddyDictExtra = `
            "Paddy Seeds": "ধানের বীজ",
            "Oryza sativa (Seeds)": "ওরাইজা সেটিভা (বীজ)",
            "Premium organic paddy seeds selected for high germination rate and yield. Grown using local traditional methods combined with organic micronutrients for superior stress tolerance.": "উচ্চ অঙ্কুরোদগম ও ফলনশীল প্রিমিয়াম ঐতিহ্যবাহী ধানের বীজ। প্রাকৃতিক পদ্ধতিতে উৎপাদিত রোগমুক্ত ও গুণগত মানসম্পন্ন বীজ যা চমৎকার ফলন নিশ্চিত করে।",
            "Germination Rate": "অঙ্কুরোদগম হার",
            "Moisture Content": "আর্দ্রতা পরিমাণ",
            "Purity": "বীজের বিশুদ্ধতা",
            "Organic Compost Mix": "জৈব সারের মিশ্রণ",
            "Yes": "হ্যাঁ",
            "12% Max": "১২% সর্বোচ্চ",
            "98% +": "৯৮% +",
            "90% +": "৯০% +",
            "Nov - Jan (Boro), June - July (Aman)": "নভেম্বর - জানুয়ারি (বোরো), জুন - জুলাই (আমন)",
            "130 - 145 days": "১৩০ - ১৪৫ দিন",
            "2.5 - 3.5 Tons": "২.৫ - ৩.৫ টন",
            "Plow nursery beds deeply and mix organic compost. Soil should be loose, rich in nutrients, and well-leveled to support tender root development.": "বীজতলা বা নার্সারি বেড গভীরভাবে চাষ করুন এবং প্রচুর জৈব সার মেশান। মাটি আলগা, পুষ্টিসমৃদ্ধ এবং সমান হওয়া আবশ্যক যাতে শিকড় সহজে ছড়াতে পারে।",
            "Soak seeds in clean water for 24 hours, then keep in a warm place to sprout. Sow sprouted seeds uniformly in the nursery bed. Keep moist but not flooded.": "বীজ ২৪ ঘণ্টা পরিষ্কার পানিতে ভিজিয়ে রাখুন, তারপর চট বা উষ্ণ স্থানে রেখে অঙ্কুরিত করুন। অঙ্কুরিত বীজ সমানভাবে বীজতলায় বুনে দিন এবং আর্দ্রতা বজায় রাখুন।",
            "Apply light watering to keep seedbeds damp. Avoid excessive flooding to prevent seed rot, ensuring adequate drainage for seedling vigor.": "বীজতলা হালকা আর্দ্র রাখতে নিয়মিত অল্প পানি সেচ দিন। বীজ পচন রোধে অতিরিক্ত পানি জমতে দেবেন না এবং সুনিষ্কাশন ব্যবস্থা রাখুন।",
            "Use bio-fungicides to protect young seedlings from damping-off disease. Spray diluted organic neem oil if early leaf-eating pests appear.": "চারা গাছের ড্যাম্পিং-অফ রোগ প্রতিরোধে জৈব ছত্রাকনাশক ব্যবহার করুন। প্রাথমিক অবস্থায় পোকা দেখা দিলে নিম তেল স্প্রে করুন।",
`;

paddyContent = paddyContent.replace(
  `"Our Crops": "আমাদের ফসল",`,
  `"Our Crops": "আমাদের ফসল",${paddyDictExtra}`
);

fs.writeFileSync(path.join(paddyDir, 'index.html'), paddyContent, 'utf8');
console.log('-> Created paddy-seeds/index.html successfully!');



// 2. Create sweet-potato-seeds directory and page
const sweetPotatoDir = path.join(cropsDir, 'sweet-potato-seeds');
if (!fs.existsSync(sweetPotatoDir)) {
  fs.mkdirSync(sweetPotatoDir, { recursive: true });
}

console.log('Generating Sweet Potato Seeds page...');
let sweetPotatoContent = fs.readFileSync(path.join(cropsDir, 'potato', 'index.html'), 'utf8');
sweetPotatoContent = norm(sweetPotatoContent);

// Replace page title & hero content
sweetPotatoContent = sweetPotatoContent.replace(/<title>KSFL Agro Ltd.<\/title>/g, '<title>Sweet Potato Seeds - KSFL Agro Ltd.</title>');
sweetPotatoContent = sweetPotatoContent.replace(/potato\.png/g, 'sweet-potato-seeds.png');
sweetPotatoContent = sweetPotatoContent.replace(/alt="Potato"/g, 'alt="Sweet Potato Seeds"');
sweetPotatoContent = sweetPotatoContent.replace(/alt="Potato"/g, 'alt="Sweet Potato Seeds"');

// Replace Hero text
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Potato</span>\n          <span class="bn-text">গোল আলু</span>`,
  `<span class="en-text">Sweet Potato Seeds</span>\n          <span class="bn-text">মিষ্টি আলুর বীজ</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `&gt; \n          <span class="en-text">Potato</span><span class="bn-text">গোল আলু</span>`,
  `&gt; \n          <span class="en-text">Sweet Potato Seeds</span><span class="bn-text">মিষ্টি আলুর বীজ</span>`
);

// Overview Section replacements
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="crop-scientific" style="font-size: 18px; display: block; margin-bottom: 10px;">Solanum tuberosum</span>`,
  `<span class="crop-scientific" style="font-size: 18px; display: block; margin-bottom: 10px;">Ipomoea batatas</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<td class="val" style="font-style: italic;">Solanum tuberosum</td>`,
  `<td class="val" style="font-style: italic;">Ipomoea batatas</td>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Healthy, organic round potatoes loaded with complex carbs, minerals, and vitamin C. Locally grown with purely organic inputs at our eco farm, free from sprout inhibitors or toxic preservatives.</span>`,
  `<span class="en-text">Disease-free organic sweet potato vines and seed tubers for healthy roots. Specially selected from elite lines for high starch quality, sweet taste, and high yield potential.</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="bn-text">প্রতিদিনের প্রয়োজনীয় ও স্বাস্থ্যকর তাজা গোল আলু। আমাদের নিজস্ব খামারে রাসায়নিক কীটনাশক ও কৃত্রিম প্রিজারভেটিভ ছাড়া সম্পূর্ণ পুষ্টিকর ও অর্গানিক উপায়ে উৎপাদিত যা পুষ্টি ও শক্তির দারুণ উৎস।</span>`,
  `<span class="bn-text">রোগমুক্ত প্রিমিয়াম মিষ্টি আলুর লতা ও বীজ আলু। আমাদের বিশেষ জাতের মিষ্টি আলু যা চমৎকার স্বাদ ও উচ্চ পুষ্টিমানের নিশ্চয়তা প্রদান করে।</span>`
);

// Quick Facts Section replacements
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Nov - Dec</span>\n            <span class="bn-text">নভেম্বর - ডিসেম্বর</span>`,
  `<span class="en-text">Oct - Nov (Rabi), March - April (Kharif)</span>\n            <span class="bn-text">অক্টোবর - নভেম্বর (রবি), মার্চ - এপ্রিল (খরিপ)</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Feb - March</span>\n            <span class="bn-text">ফেব্রুয়ারি - মার্চ</span>`,
  `<span class="en-text">Feb - March (Rabi), July - August (Kharif)</span>\n            <span class="bn-text">ফেব্রুয়ারি - মার্চ (রবি), জুলাই - আগস্ট (খরিপ)</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">90 - 110 days</span>\n            <span class="bn-text">৯০ - ১১০ দিন</span>`,
  `<span class="en-text">110 - 130 days</span>\n            <span class="bn-text">১১০ - ১৩০ দিন</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">12 - 15 Tons</span>\n            <span class="bn-text">১২ - ১৫ টন</span>`,
  `<span class="en-text">8 - 10 Tons</span>\n            <span class="bn-text">৮ - ১০ টন</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Sandy loamy soil</span>\n            <span class="bn-text">বেলে দোআঁশ মাটি</span>`,
  `<span class="en-text">Sandy loamy or well-drained fertile soils</span>\n            <span class="bn-text">বেলে দোআঁশ বা সুনিষ্কাশিত উর্বর মাটি</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">15°C - 25°C</span>\n            <span class="bn-text">১৫°সে - ২৫°সে</span>`,
  `<span class="en-text">22°C - 32°C</span>\n            <span class="bn-text">২২°সে - ৩২°সে</span>`
);

// Cultivation Guide updates (Accordion)
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Plow the soil 3 to 4 times deeply to a fine tilth. Incorporate well-rotted organic compost and ash uniformly to enrich potash.</span>`,
  `<span class="en-text">Prepare raised ridges or mounds 30cm high. The soil should be well-pulverized and rich in organic manure for loose, unrestricted root expansion.</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="bn-text">জমি ৩ থেকে ৪ বার গভীরভাবে চাষ ও মই দিয়ে মাটি ঝুরঝুরে করতে হবে। পটাশিয়াম বৃদ্ধির জন্য পর্যাপ্ত পচানো গোবর ও ছাই মাটির সাথে ভালোভাবে মিশিয়ে দিন।</span>`,
  `<span class="bn-text">৩০ সেমি উচু লম্বা আইল বা ঢিবি তৈরি করুন। মিষ্টি আলুর শিকড় সহজে বড় হওয়ার জন্য মাটি ঝুরঝুরে এবং উর্বর হওয়া প্রয়োজন।</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Plant certified disease-free seed tubers at a depth of 5-8cm with a spacing of 60cm between rows and 25cm between plants.</span>`,
  `<span class="en-text">Plant healthy vine cuttings (30cm long) or seed tubers on the ridges. Keep 30cm distance between vines. Press the lower half of cuttings into the soil.</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="bn-text">৫-৮ সেমি গভীরতায় বীজ আলু রোপণ করুন। সারি থেকে সারির দূরত্ব ৬০ সেমি এবং বীজ আলু থেকে আলুর দূরত্ব ২৫ সেমি বজায় রাখা আবশ্যক।</span>`,
  `<span class="bn-text">সুস্থ লতা (৩০ সেমি দীর্ঘ) বা বীজ আলু ঢিবিতে রোপণ করুন। লতা থেকে লতার দূরত্ব ৩০ সেমি রাখুন। লতার নিচের অর্ধেক অংশ মাটির নিচে চেপে দিন।</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Irrigate immediately after planting. Maintain moderate moisture during tuber initiation (20-30 days) and avoid heavy watering near harvest.</span>`,
  `<span class="en-text">Water moderately after planting to establish roots. Sweet potatoes are relatively drought-tolerant but require uniform moisture during tuber bulk-up.</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="bn-text">রোপণের পরপরই হালকা সেচ দিন। গুটি গঠনের সময় (২০-৩০ দিন) মাঝারি আর্দ্রতা বজায় রাখুন এবং ফসল কাটার নিকটবর্তী সময়ে অতিরিক্ত সেচ পরিহার করুন।</span>`,
  `<span class="bn-text">রোপণের পর শেকড় গজানোর জন্য মাঝারি সেচ দিন। মিষ্টি আলু খরা সহনশীল হলেও আলু বড় হওয়ার সময়ে নিয়মিত হালকা সেচ প্রয়োজন।</span>`
);

sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Earthing up should be done twice at 25 and 50 days. Spray fermented neem juice to control potato tuber moth and aphids naturally.</span>`,
  `<span class="en-text">Lift vine runners periodically to prevent rooting at nodes. Use organic pheromone traps to control sweet potato weevils, the major pest.</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="bn-text">রোপণের ২৫ এবং ৫০ দিন পর দুইবার গোড়ায় মাটি তুলে দিতে হবে। আলু মথ ও জাব পোকা দমনে গাঁজানো নিমের রস স্প্রে করুন।</span>`,
  `<span class="bn-text">লতা নিয়মিত উপরে তুলে দিন যাতে অন্য কোথাও নতুন করে শেকড় না গজায়। মিষ্টি আলুর প্রধান শত্রু উইভিল বা পোকা দমনে জৈব ফেরোমন ফাঁদ ব্যবহার করুন।</span>`
);

// Nutritional Value Section
// Sweet Potato has Vitamin A and Beta-carotene
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Energy</span>\n          <span class="bn-text">শক্তি</span>\n        </td>\n        <td>\n          <span class="en-text">77 kcal</span>\n          <span class="bn-text">৭৭ কিলোক্যালরি</span>`,
  `<span class="en-text">Energy</span>\n          <span class="bn-text">শক্তি</span>\n        </td>\n        <td>\n          <span class="en-text">86 kcal</span>\n          <span class="bn-text">৮৬ কিলোক্যালরি</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Carbohydrates</span>\n          <span class="bn-text">শর্করা</span>\n        </td>\n        <td>\n          <span class="en-text">17 g</span>\n          <span class="bn-text">১৭ গ্রাম</span>`,
  `<span class="en-text">Carbohydrates</span>\n          <span class="bn-text">শর্করা</span>\n        </td>\n        <td>\n          <span class="en-text">20 g</span>\n          <span class="bn-text">২০ গ্রাম</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Vitamin C</span>\n          <span class="bn-text">ভিটামিন সি</span>\n        </td>\n        <td>\n          <span class="en-text">19.7 mg</span>\n          <span class="bn-text">১৯.৭ মিলিগ্রাম</span>`,
  `<span class="en-text">Vitamin A</span>\n          <span class="bn-text">ভিটামিন এ</span>\n        </td>\n        <td>\n          <span class="en-text">14,187 IU</span>\n          <span class="bn-text">১৪,১৮৭ আইইউ</span>`
);
sweetPotatoContent = sweetPotatoContent.replace(
  `<span class="en-text">Potassium</span>\n          <span class="bn-text">পটাশিয়াম</span>\n        </td>\n        <td>\n          <span class="en-text">421 mg</span>\n          <span class="bn-text">৪২১ মিলিগ্রাম</span>`,
  `<span class="en-text">Beta-Carotene</span>\n          <span class="bn-text">বিটা-ক্যারোটিন</span>\n        </td>\n        <td>\n          <span class="en-text">8,509 mcg</span>\n          <span class="bn-text">৮,৫০৯ মাইক্রোগ্রাম</span>`
);

// We need to register the custom terms in the page-specific dictionary at the bottom.
const sweetDictExtra = `
            "Sweet Potato Seeds": "মিষ্টি আলুর বীজ",
            "Ipomoea batatas": "আইপোমিয়া বাটাতাস",
            "Disease-free organic sweet potato vines and seed tubers for healthy roots. Specially selected from elite lines for high starch quality, sweet taste, and high yield potential.": "রোগমুক্ত প্রিমিয়াম মিষ্টি আলুর লতা ও বীজ আলু। আমাদের বিশেষ জাতের মিষ্টি আলু যা চমৎকার স্বাদ ও উচ্চ পুষ্টিমানের নিশ্চয়তা প্রদান করে।",
            "Vitamin A": "ভিটামিন এ",
            "Beta-Carotene": "বিটা-ক্যারোটিন",
            "14,187 IU": "১৪,১৮৭ আইইউ",
            "8,509 mcg": "৮,৫০৯ মাইক্রোগ্রাম",
            "Oct - Nov (Rabi), March - April (Kharif)": "অক্টোবর - নভেম্বর (রবি), মার্চ - এপ্রিল (খরিপ)",
            "Feb - March (Rabi), July - August (Kharif)": "ফেব্রুয়ারি - মার্চ (রবি), জুলাই - আগস্ট (খরিপ)",
            "8 - 10 Tons": "৮ - ১০ টন",
            "Sandy loamy or well-drained fertile soils": "বেলে দোআঁশ বা সুনিষ্কাশিত উর্বর মাটি",
            "22°C - 32°C": "২২°সে - ৩২°সে",
            "Prepare raised ridges or mounds 30cm high. The soil should be well-pulverized and rich in organic manure for loose, unrestricted root expansion.": "৩০ সেমি উচু লম্বা আইল বা ঢিবি তৈরি করুন। মিষ্টি আলুর শিকড় সহজে বড় হওয়ার জন্য মাটি ঝুরঝুরে এবং উর্বর হওয়া প্রয়োজন।",
            "Plant healthy vine cuttings (30cm long) or seed tubers on the ridges. Keep 30cm distance between vines. Press the lower half of cuttings into the soil.": "সুস্থ লতা (৩০ সেমি দীর্ঘ) বা বীজ আলু ঢিবিতে রোপণ করুন। লতা থেকে লতার দূরত্ব ৩০ সেমি রাখুন। লতার নিচের অর্ধেক অংশ মাটির নিচে চেপে দিন।",
            "Water moderately after planting to establish roots. Sweet potatoes are relatively drought-tolerant but require uniform moisture during tuber bulk-up.": "রোপণের পর শেকড় গজানোর জন্য মাঝারি সেচ দিন। মিষ্টি আলু খরা সহনশীল হলেও আলু বড় হওয়ার সময়ে নিয়মিত হালকা সেচ প্রয়োজন।",
            "Lift vine runners periodically to prevent rooting at nodes. Use organic pheromone traps to control sweet potato weevils, the major pest.": "লতা নিয়মিত উপরে তুলে দিন যাতে অন্য কোথাও নতুন করে শেকড় না গজায়। মিষ্টি আলুর প্রধান শত্রু উইভিল বা পোকা দমনে জৈব ফেরোমন ফাঁদ ব্যবহার করুন।",
`;

sweetPotatoContent = sweetPotatoContent.replace(
  `"Our Crops": "আমাদের ফসল",`,
  `"Our Crops": "আমাদের ফসল",${sweetDictExtra}`
);

fs.writeFileSync(path.join(sweetPotatoDir, 'index.html'), sweetPotatoContent, 'utf8');
console.log('-> Created sweet-potato-seeds/index.html successfully!');



// 3. Now let's update all 12 crops details pages to have the perfect 11-crop related carousel!
console.log('Generating related crops carousels...');

allCrops.forEach((currentCrop) => {
  const currentCropPath = path.join(cropsDir, currentCrop.id, 'index.html');
  if (!fs.existsSync(currentCropPath)) {
    console.log(`WARNING: Path ${currentCropPath} does not exist. Skipping.`);
    return;
  }

  console.log(`Updating carousel in ${currentCrop.id}...`);
  let content = fs.readFileSync(currentCropPath, 'utf8');
  content = norm(content);

  // Generate the carousel items for the other 11 crops
  let carouselHtml = '';
  allCrops.forEach((otherCrop) => {
    if (otherCrop.id === currentCrop.id) return; // Skip self

    carouselHtml += `      <a class="crop-card" href="../${otherCrop.id}/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="../../assets/crops/${otherCrop.img || otherCrop.id + '.png'}" alt="${otherCrop.titleEn}" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">${otherCrop.scientific}</span>
            <h3 class="crop-title">
              <span class="en-text">${otherCrop.titleEn}</span>
              <span class="bn-text">${otherCrop.titleBn}</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">${otherCrop.descEn}</span>
              <span class="bn-text">${otherCrop.descBn}</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>\n`;
  });

  // Let's replace the carousel track
  // The carousel track is enclosed between <div class="carousel-track"> and </div> before Left/Right arrows end.
  const carouselStartTag = '<div class="carousel-track">';
  const carouselEndTag = '</div>\n            </div>\n            \n            <!-- Right Arrow -->';

  const startIndex = content.indexOf(carouselStartTag);
  const endIndex = content.indexOf(carouselEndTag);

  if (startIndex !== -1 && endIndex !== -1) {
    const preCarousel = content.substring(0, startIndex + carouselStartTag.length);
    const postCarousel = content.substring(endIndex);
    content = preCarousel + '\n' + carouselHtml + '              ' + postCarousel;
    fs.writeFileSync(currentCropPath, content, 'utf8');
    console.log(`-> Successfully updated carousel track in ${currentCrop.id}/index.html!`);
  } else {
    console.log(`-> ERROR: Carousel track boundaries not found in ${currentCrop.id}/index.html!`);
    console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
  }
});

console.log('All crop subpage creations and carousel updates complete!');
