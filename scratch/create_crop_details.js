const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');

// Boundaries of header and footer in index.html
const navbarEndTag = '</section>';
const navbarIndex = indexContent.indexOf('id="navbar-1"');
const headerEndIdx = indexContent.indexOf(navbarEndTag, navbarIndex) + navbarEndTag.length;
const baseHeaderHTML = indexContent.substring(0, headerEndIdx);

const footerStartTag = '<section class="kirki-s219-dp0evq34"';
const footerStartIdx = indexContent.indexOf(footerStartTag);
const baseFooterHTML = indexContent.substring(footerStartIdx);

// List of 10 Bangladeshi crops with comprehensive English/Bangla content
const crops = [
  {
    slug: 'rice',
    nameEn: 'Rice',
    nameBn: 'ধান',
    scientific: 'Oryza sativa',
    descEn: 'High-yield organic long grain rice, locally harvested with pure organic care at our agro farm. It is a staple food in Bangladesh, rich in energy and carbohydrates, grown with zero chemical pesticides or artificial growth agents.',
    descBn: 'আমাদের এগ্রো ফার্মে সম্পূর্ণ জৈব পদ্ধতিতে যত্নে উৎপাদিত উচ্চ ফলনশীল ও পুষ্টিকর আমন ও বোরো ধান। এটি আমাদের দেশের প্রধান খাদ্যশস্য, যা শূন্য রাসায়নিক কীটনাশক এবং জৈব সারের নিখুঁত সমন্বয়ে অত্যন্ত স্বাস্থ্যকর উপায়ে উৎপাদিত হয়।',
    overviewEn: 'Organic long grain rice variety designed for high resilience and excellent nutrition.',
    overviewBn: 'উচ্চ ফলনশীল এবং দুর্দান্ত পুষ্টিগুণ সম্পন্ন দেশীয় প্রিমিয়াম চালের ধান।',
    sowingEn: 'Nov - Dec (Boro), May - June (Aman)',
    sowingBn: 'নভেম্বর - ডিসেম্বর (বোরো), মে - জুন (আমন)',
    harvestEn: 'April - May (Boro), Nov - Dec (Aman)',
    harvestBn: 'এপ্রিল - মে (বোরো), নভেম্বর - ডিসেম্বর (আমন)',
    maturityEn: '140 - 150 days',
    maturityBn: '১৪০ - ১৫০ দিন',
    yieldEn: '2.5 - 3.5 tons/acre',
    yieldBn: '২.৫ - ৩.৫ টন (একর প্রতি)',
    tempEn: '20°C - 35°C',
    tempBn: '২০°সে - ৩৫°সে',
    soilEn: 'Clayey loam to Clay',
    soilBn: 'এঁটেল ও এঁটেল দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '130 kcal', valBn: '১৩০ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '28 g', valBn: '২৮ গ্রাম' },
      { nameEn: 'Protein', nameBn: 'আমিষ', valEn: '2.7 g', valBn: '২.৭ গ্রাম' },
      { nameEn: 'Fat', nameBn: 'চর্বি', valEn: '0.3 g', valBn: '০.৩ গ্রাম' },
      { nameEn: 'Iron', nameBn: 'আয়রন', valEn: '1.2 mg', valBn: '১.২ মিলিগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '10 mg', valBn: '১০ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Land Preparation',
        titleBn: 'জমি প্রস্তুতকরণ',
        descEn: 'Plow the land 4 to 5 times deeply and apply laddering to retain standing water. Apply organic compost and well-decomposed cow dung uniformly during the final plowing.',
        descBn: 'জমি ৪ থেকে ৫ বার গভীর চাষ দিয়ে মই দিয়ে কাদা ও সমান করতে হবে যাতে পানি ধরে রাখা যায়। শেষ চাষের সময় জৈব কম্পোস্ট এবং ভালোভাবে পচানো গোবর সার সমানভাবে প্রয়োগ করুন।'
      },
      {
        titleEn: 'Sowing & Transplanting',
        titleBn: 'বীজ বপন ও চারা রোপণ',
        descEn: 'Sow seeds in well-prepared nursery beds. Transplant 25-30 days old healthy seedlings into the main muddy field with a spacing of 20cm x 15cm.',
        descBn: 'ভালোভাবে প্রস্তুত বীজতলায় বীজ বপন করুন। ২৫-৩০ দিন বয়সী সুস্থ চারা মূল কাদাময় জমিতে ২০ সেমি x ১৫ সেমি দূরত্ব বজায় রেখে রোপণ করুন।'
      },
      {
        titleEn: 'Irrigation & Water Management',
        titleBn: 'সেচ ও পানি ব্যবস্থাপনা',
        descEn: 'Maintain a constant water depth of 2-5cm during the early vegetative and flowering stages. Drain out water 10-12 days before the scheduled harvest.',
        descBn: 'চারার প্রাথমিক বৃদ্ধি এবং ফুল আসার সময় জমিতে ২-৫ সেমি গভীরতা পানি ধরে রাখুন। ফসল কাটার ১০-১২ দিন আগে মাঠের পানি নিষ্কাশন করে দিন।'
      },
      {
        titleEn: 'Organic Pest Control',
        titleBn: 'জৈব উপায়ে বালাই ব্যবস্থাপনা',
        descEn: 'Install bamboo perches (Parching method) to attract insectivorous birds. Spray fresh neem seed kernel extract to deter stem borers and leaf folders.',
        descBn: 'পোকাখেকো পাখি বসার জন্য জমিতে বাঁশের খুঁটি (পার্চিং পদ্ধতি) স্থাপন করুন। মাজরা পোকা এবং পাতা মোড়ানো পোকা দমনে তাজা নিম পাতার নির্যাস স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'bottle-gourd',
    nameEn: 'Bottle Gourd',
    nameBn: 'লাউ',
    scientific: 'Lagenaria siceraria',
    descEn: 'Fresh, tender, water-rich bottle gourds organically grown at our agro farm. Rich in essential minerals, dietary fiber, and highly hydrating, making it the perfect vegetable for traditional Bangladeshi dishes and refreshing summer meals.',
    descBn: 'আমাদের খামারে সম্পূর্ণ প্রাকৃতিক উপায়ে উৎপাদিত মিষ্টি ও সতেজ কচি লাউ। এটি পানি ও ফাইবার সমৃদ্ধ একটি অত্যন্ত স্বাস্থ্যকর সবজি, যা হজমে সাহায্য করে এবং শরীরে পুষ্টি জুগিয়ে গ্রীষ্মকালে শরীরকে সতেজ রাখতে দারুণ ভূমিকা পালন করে।',
    overviewEn: 'Premium quality tender bottle gourds grown with natural organic compost.',
    overviewBn: 'উন্নত মানের কচি লাউ যা সম্পূর্ণ জৈব কম্পোস্ট দিয়ে মাচায় ফলানো হয়।',
    sowingEn: 'Oct - Nov (Winter), Feb - March (Summer)',
    sowingBn: 'অক্টোবর - নভেম্বর (শীতকালীন), ফেব্রুয়ারি - মার্চ (গ্রীষ্মকালীন)',
    harvestEn: 'Dec - Feb (Winter), May - July (Summer)',
    harvestBn: 'ডিসেম্বর - ফেব্রুয়ারি (শীতকালীন), মে - জুলাই (গ্রীষ্মকালীন)',
    maturityEn: '60 - 75 days',
    maturityBn: '৬০ - ৭৫ দিন',
    yieldEn: '12 - 15 tons/acre',
    yieldBn: '১২ - ১৫ টন (একর প্রতি)',
    tempEn: '18°C - 30°C',
    tempBn: '১৮°সে - ৩০°সে',
    soilEn: 'Sandy loam to Rich silt loam',
    soilBn: 'বেলে দোআঁশ থেকে উর্বর পলি দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '15 kcal', valBn: '১৫ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '3.4 g', valBn: '৩.৪ গ্রাম' },
      { nameEn: 'Dietary Fiber', nameBn: 'খাদ্য আঁশ', valEn: '1.2 g', valBn: '১.২ গ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '10 mg', valBn: '১০ মিলিগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '26 mg', valBn: '২৬ মিলিগ্রাম' },
      { nameEn: 'Water Content', nameBn: 'পানির পরিমাণ', valEn: '96%', valBn: '৯৬%' }
    ],
    steps: [
      {
        titleEn: 'Pit Preparation',
        titleBn: 'মাদা ও গর্ত তৈরি',
        descEn: 'Dig pits of size 45cm x 45cm x 45cm with 2-meter spacing. Mix 10kg organic compost and 100g ash thoroughly with the soil in each pit 10 days before sowing.',
        descBn: '২ মিটার দূরত্ব বজায় রেখে ৪৫ সেমি x ৪৫ সেমি x ৪৫ সেমি আকারের গর্ত বা মাদা তৈরি করুন। বীজ বপনের ১০ দিন আগে প্রতিটি গর্তে ১০ কেজি জৈব কম্পোস্ট এবং ১০০ গ্রাম ছাই মাটির সাথে মিশিয়ে দিন।'
      },
      {
        titleEn: 'Sowing Seeds',
        titleBn: 'বীজ বপন',
        descEn: 'Sow 3 to 4 seeds per pit at a depth of 2-3cm. Water the pit gently. Retain only the 2 healthiest seedlings after germination.',
        descBn: 'প্রতিটি গর্তে ২-৩ সেমি গভীরে ৩ থেকে ৪টি বীজ বপন করুন। বপন শেষে হালকা পানি সেচ দিন। চারা গজালে সবচেয়ে স্বাস্থ্যকর ২টি চারা রেখে বাকিগুলো তুলে ফেলুন।'
      },
      {
        titleEn: 'Trellis / Bamboo Support',
        titleBn: 'মাচা তৈরি ও বাউনি দেওয়া',
        descEn: 'Construct a sturdy bamboo trellis (Macha) at a height of 1.5-2 meters to allow the vines to climb and bear clean, straight bottle gourds.',
        descBn: 'লতাগুলি সহজে আরোহণের জন্য ১.৫-২ মিটার উচ্চতায় বাঁশের মজবুত মাচা তৈরি করুন। মাচায় লাউ ঝুললে তা পোকামাকড় মুক্ত ও সোজা থাকে।'
      },
      {
        titleEn: 'Pest Management',
        titleBn: 'বালাই ও রোগ ব্যবস্থাপনা',
        descEn: 'Use pheromone traps to control fruit flies. Hand-pick red pumpkin beetles at dawn and apply organic neem seed oil spray if necessary.',
        descBn: 'লাউয়ের প্রধান শত্রু মাছি পোকা দমনের জন্য ফেরোমন ফাঁদ ব্যবহার করুন। ভোরে লাল পাম্পকিন বিটল হাত দিয়ে ধ্বংস করুন এবং প্রয়োজনে নিম তেল স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'sweet-pumpkin',
    nameEn: 'Sweet Pumpkin',
    nameBn: 'মিষ্টি কুমড়া',
    scientific: 'Cucurbita moschata',
    descEn: 'Bright, sweet, and highly nutritious sweet pumpkins grown organically. Rich in Vitamin A, beta-carotene, and dietary fibers, our pumpkins are a flavorful kitchen essential that stores well for extended periods.',
    descBn: 'আমাদের খামারে সম্পূর্ণ জৈব ও প্রাকৃতিক পদ্ধতিতে চাষকৃত সুস্বাদু ও পুষ্টিকর মিষ্টি কুমড়া। এটি প্রচুর পরিমাণে ভিটামিন এ, বিটা-ক্যারোটিন এবং ফাইবার সমৃদ্ধ যা চোখের জ্যোতি বাড়াতে এবং রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিতে অত্যন্ত কার্যকর।',
    overviewEn: 'Fleshy, sweet, organic pumpkins rich in vitamins and natural sweetness.',
    overviewBn: 'তাজা ও অত্যন্ত মিষ্টি স্বাদের জৈব কুমড়া, যা রান্না ও পুষ্টির জন্য সেরা।',
    sowingEn: 'Oct - Dec, Feb - March',
    sowingBn: 'অক্টোবর - ডিসেম্বর, ফেব্রুয়ারি - মার্চ',
    harvestEn: 'Feb - April, May - July',
    harvestBn: 'ফেব্রুয়ারি - এপ্রিল, মে - জুলাই',
    maturityEn: '90 - 100 days',
    maturityBn: '৯০ - ১০০ দিন',
    yieldEn: '10 - 12 tons/acre',
    yieldBn: '১০ - ১২ টন (একর প্রতি)',
    tempEn: '20°C - 32°C',
    tempBn: '২০°সে - ৩২°সে',
    soilEn: 'Sandy loam to Silt loam',
    soilBn: 'বেলে দোআঁশ থেকে পলি দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '26 kcal', valBn: '২৬ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '6.5 g', valBn: '৬.৫ গ্রাম' },
      { nameEn: 'Vitamin A', nameBn: 'ভিটামিন এ', valEn: '8500 IU', valBn: '৮৫০০ আইইউ' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '340 mg', valBn: '৩৪০ মিলিগ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '9 mg', valBn: '৯ মিলিগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '21 mg', valBn: '২১ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Soil & Mound Preparation',
        titleBn: 'মাটি ও মাদা প্রস্তুতি',
        descEn: 'Prepare raised mounds or pits with a distance of 3 meters. Enrich each mound with 15kg of organic compost, bone meal, and ash to provide balanced micronutrients.',
        descBn: '৩ মিটার দূরত্ব বজায় রেখে উঁচু মাদা বা গর্ত প্রস্তুত করুন। প্রতিটি মাদায় ১৫ কেজি জৈব কম্পোস্ট, হাড়ের গুঁড়ো এবং ছাই ভালোভাবে মিশিয়ে দিন।'
      },
      {
        titleEn: 'Seed Sowing',
        titleBn: 'বীজ রোপণ',
        descEn: 'Soak seeds for 12 hours before planting. Plant 3-4 seeds per pit at a depth of 2-3cm and cover with loose soil. Water immediately.',
        descBn: 'বীজ রোপণের আগে ১২ ঘণ্টা ভিজিয়ে রাখুন। প্রতি মাদায় ৩-৪টি বীজ ২-৩ সেমি গভীরে রোপণ করুন এবং আলগা মাটি দিয়ে ঢেকে পানি দিন।'
      },
      {
        titleEn: 'Vine Training & Irrigation',
        titleBn: 'লতা ছড়ানো ও সেচ',
        descEn: 'Train the vines to spread evenly over clean straw beds or a low trellis. Water deeply once a week, avoiding wetting the leaves to prevent fungal infections.',
        descBn: 'লতাগুলিকে শুকনো খড়ের বিছানা বা নিচু মাচায় ছড়িয়ে দিন। সপ্তাহে একবার শিকড়ে গভীরভাবে সেচ দিন। পাতা ভেজানো পরিহার করুন যাতে ছত্রাকের আক্রমণ না হয়।'
      },
      {
        titleEn: 'Fungal & Beetle Control',
        titleBn: 'ছত্রাক ও পোকা দমন',
        descEn: 'Protect crop against Red Pumpkin Beetle. Apply organic wood ash on leaves at dawn or spray organic copper-based liquid soap in case of mildew.',
        descBn: 'রেড পাম্পকিন বিটল দমনে ভোরে পাতার ওপর কাঠের শুকনো ছাই ছিটিয়ে দিন। সাদা গুঁড়ো ছত্রাক (মিলডিউ) দেখা দিলে জৈব সাবান-পানি স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'cucumber',
    nameEn: 'Cucumber',
    nameBn: 'শসা',
    scientific: 'Cucumis sativus',
    descEn: 'Cool, crisp, and refreshing cucumbers perfect for fresh salads and summer hydration. Grown with absolute care under organic micro-climatic conditions using pure organic compost and natural liquid manures.',
    descBn: 'আমাদের খামারে উৎপাদিত অত্যন্ত সতেজ, মচমচে ও সুস্বাদু সালাদ শসা। এটি প্রাকৃতিক উপায়ে জৈব সার ব্যবহার করে উৎপাদিত হয়। এতে প্রচুর পানি ও প্রয়োজনীয় খনিজ উপাদান থাকায় এটি শরীরকে ঠাণ্ডা রাখতে এবং সতেজতা বজায় রাখতে সাহায্য করে।',
    overviewEn: 'Crunchy and refreshing garden cucumbers grown without chemical fertilizers.',
    overviewBn: 'কোনো রাসায়নিক ছাড়াই উৎপাদিত মচমচে ও সতেজ হাইড্রেটিং শসা।',
    sowingEn: 'Feb - March, Aug - Sep',
    sowingBn: 'ফেব্রুয়ারি - মার্চ, আগস্ট - সেপ্টেম্বর',
    harvestEn: 'April - May, Oct - Nov',
    harvestBn: 'এপ্রিল - মে, অক্টোবর - নভেম্বর',
    maturityEn: '45 - 55 days',
    maturityBn: '৪৫ - ৫৫ দিন',
    yieldEn: '8 - 10 tons/acre',
    yieldBn: '৮ - ১০ টন (একর প্রতি)',
    tempEn: '18°C - 35°C',
    tempBn: '১৮°সে - ৩৫°সে',
    soilEn: 'Well-drained sandy loam',
    soilBn: 'সুনিষ্কাশিত বেলে দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '15 kcal', valBn: '১৫ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '3.6 g', valBn: '৩.৬ গ্রাম' },
      { nameEn: 'Water Content', nameBn: 'পানির পরিমাণ', valEn: '95.2%', valBn: '৯৫.২%' },
      { nameEn: 'Vitamin K', nameBn: 'ভিটামিন কে', valEn: '16.4 mcg', valBn: '১৬.৪ মাইক্রোগ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '2.8 mg', valBn: '২.৮ মিলিগ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '147 mg', valBn: '১৪৭ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Bed Preparation',
        titleBn: 'বেড ও নালা প্রস্তুতকরণ',
        descEn: 'Make raised beds of 1-meter width with 30cm wide irrigation drains between beds. Mix well-decomposed organic compost and vermicompost into the soil.',
        descBn: '১ মিটার চওড়া উঁচু বেড তৈরি করুন এবং বেডগুলোর মাঝে ৩০ সেমি চওড়া পানি সেচের নালা রাখুন। মাটির সাথে ভালো পচা গোবর ও কেঁচো সার মিশিয়ে দিন।'
      },
      {
        titleEn: 'Sowing & Spacing',
        titleBn: 'বীজ বপন ও রোপণ দূরত্ব',
        descEn: 'Sow seeds directly on the bed with 60cm distance between plants and 1.2m between rows. Plant at a depth of 1.5cm.',
        descBn: 'বেডের ওপর গাছ থেকে গাছ ৬০ সেমি এবং সারি থেকে সারি ১.২ মিটার দূরত্ব রেখে সরাসরি বীজ বপন করুন। ১.৫ সেমি গভীরে বীজ বপন করতে হবে।'
      },
      {
        titleEn: 'Staking & Irrigation',
        titleBn: 'খুঁটি দেওয়া ও হালকা সেচ',
        descEn: 'Provide trellis or vertical bamboo stakes immediately as vines start spreading. Keep the soil evenly moist with light, frequent drip or channel irrigation.',
        descBn: 'লতা বাড়তে শুরু করলেই জালের মাচা বা সোজা বাঁশের খুঁটি দিন। মাটির আর্দ্রতা বজায় রাখতে নিয়মিত নালায় হালকা বা ড্রিপ সেচ দিন।'
      },
      {
        titleEn: 'Downy Mildew & Pest Control',
        titleBn: 'রোগ ও পোকামাকড় দমন',
        descEn: 'Prevent Downy Mildew by maintaining proper plant spacing for aeration. Spray organic neem seed extract to control aphids and mites.',
        descBn: 'বাতাস চলাচলের উপযুক্ত ব্যবস্থা রেখে ডাউনি মিলডিউ রোগ প্রতিরোধ করুন। জাবপোকা ও মাকড় দমনে নিয়মিত জৈব নিম বীজের নির্যাস স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'radish',
    nameEn: 'Radish',
    nameBn: 'মূলা',
    scientific: 'Raphanus sativus',
    descEn: 'Crisp, crunch, and sharp organic white radishes. Grown in deeply cultivated sandy loam soil, packed with vitamins, digestion-friendly fibers, and essential trace minerals.',
    descBn: 'আমাদের এগ্রো খামারে গভীরভাবে চাষ করা মাটিতে উৎপাদিত অত্যন্ত সতেজ ও ক্রাঞ্চি সাদা মূলা। এটি হজমশক্তি বৃদ্ধিতে দারুণ সাহায্য করে এবং প্রচুর পরিমাণে ভিটামিন সি ও খনিজ উপাদানে সমৃদ্ধ যা স্বাস্থ্যের জন্য দারুণ উপকারী।',
    overviewEn: 'Grown in highly fertile organic soil beds to produce smooth, crunchy, and premium radishes.',
    overviewBn: 'অত্যন্ত উর্বর জৈব বেডে উৎপাদিত নিখুঁত, মসৃণ ও সুস্বাদু সাদা মূলা।',
    sowingEn: 'Sep - Nov (Winter)',
    sowingBn: 'সেপ্টেম্বর - নভেম্বর (শীতকালীন)',
    harvestEn: 'Nov - Jan / ডিসেম্বর - জানুয়ারি',
    harvestBn: 'নভেম্বর - জানুয়ারি',
    maturityEn: '40 - 50 days',
    maturityBn: '৪০ - ৫০ দিন',
    yieldEn: '12 - 15 tons/acre',
    yieldBn: '১২ - ১৫ টন (একর প্রতি)',
    tempEn: '15°C - 25°C',
    tempBn: '১৫°সে - ২৫°সে',
    soilEn: 'Deep loose sandy loam to silt loam',
    soilBn: 'গভীর ও আলগা বেলে দোআঁশ থেকে পলি দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '16 kcal', valBn: '১৬ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '3.4 g', valBn: '৩.৪ গ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '14.8 mg', valBn: '১৪.৮ মিলিগ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '233 mg', valBn: '২৩৩ মিলিগ্রাম' },
      { nameEn: 'Folate', nameBn: 'ফোলেট', valEn: '25 mcg', valBn: '২৫ মাইক্রোগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '25 mg', valBn: '২৫ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Deep Soil Preparation',
        titleBn: 'গভীরভাবে মাটি তৈরি',
        descEn: 'Plow the soil deeply up to 30-40cm to ensure no hard pans or stones remain. Radishes require loose, deeply aerated soil to grow straight and smooth without forkings.',
        descBn: 'জমি ৩০-৪০ সেমি গভীরভাবে চাষ দিয়ে ঝুরঝুরে ও পাথর বা শক্ত মাটির ঢেলামুক্ত করে নিন। মূলা সোজা ও মসৃণ হওয়ার জন্য মাটির গভীর স্তর আলগা হওয়া প্রয়োজন।'
      },
      {
        titleEn: 'Line Sowing',
        titleBn: 'সারিবদ্ধভাবে বীজ বপন',
        descEn: 'Sow seeds in straight lines or ridges spaced 25-30cm apart. Place seeds 1.5cm deep with a plant-to-plant spacing of 5-8cm.',
        descBn: '২৫-৩০ সেমি দূরত্বে তৈরি উঁচু আইল বা সারিতে সোজা করে বীজ বপন করুন। ১.৫ সেমি গভীরে বীজ দিয়ে গাছ থেকে গাছের দূরত্ব ৫-৮ সেমি রাখুন।'
      },
      {
        titleEn: 'Thinning & Earthing Up',
        titleBn: 'চারা পাতলাকরণ ও গোড়ায় মাটি দেওয়া',
        descEn: 'Perform thinning 10 days after sprouting to maintain proper gap. Earth up the soil around the exposed radish shoulders to prevent greening.',
        descBn: 'চারা গজানোর ১০ দিন পর পাতলা করে দিন যাতে প্রতিটি মূলা বড় হওয়ার জায়গা পায়। মূলার উপরিভাগ যাতে রোদে সবুজ না হয় সেজন্য গোড়ায় মাটি তুলে দিন।'
      },
      {
        titleEn: 'Pest Control',
        titleBn: 'কীটপতঙ্গ ও বালাই দমন',
        descEn: 'Control aphids and flea beetles which chew small holes in young leaves by spraying organic neem-garlic emulsion weekly.',
        descBn: 'কচি পাতার রস চুষে খাওয়া জাবপোকা ও ফ্লি বিটল দমনে প্রতি সপ্তাহে একবার অর্গানিক নিম ও রসুনের মিশ্রণ স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'pointed-gourd',
    nameEn: 'Pointed Gourd',
    nameBn: 'পটল',
    scientific: 'Trichosanthes dioica',
    descEn: 'Premium organic pointed gourds (Potol), a high-demand healthy traditional Bangladeshi summer vegetable. Grown using advanced organic farming methods ensuring shiny green skins, tender seeds, and superb taste.',
    descBn: 'আমাদের খামারে সম্পূর্ণ প্রাকৃতিকভাবে উৎপাদিত দেশীয় জনপ্রিয় গ্রীষ্মকালীন সবজি পটল। উন্নত জৈব সার ও প্রাকৃতিক বালাইনাশক ব্যবহার করে উৎপাদিত হওয়ায় এর ত্বক হয় উজ্জ্বল সবুজ, বীজ থাকে অত্যন্ত নরম এবং স্বাদ হয় অতুলনীয়।',
    overviewEn: 'Nutrient-rich traditional summer vegetable cultivated with natural plant foods.',
    overviewBn: 'প্রাকৃতিক পুষ্টি উপাদানে ভরা গ্রীষ্মকালীন পটল যা সতেজ ও পুষ্টিকর।',
    sowingEn: 'Oct - Nov (Winter planting for early crop)',
    sowingBn: 'অক্টোবর - নভেম্বর (শীতকালীন রোপণ)',
    harvestEn: 'March - Sep (Summer - Rainy season)',
    harvestBn: 'মার্চ - সেপ্টেম্বর (গ্রীষ্ম ও বর্ষাকাল)',
    maturityEn: '80 - 90 days from planting',
    maturityBn: '৮০ - ৯০ দিন (চারা রোপণের পর)',
    yieldEn: '6 - 8 tons/acre',
    yieldBn: '৬ - ৮ টন (একর প্রতি)',
    tempEn: '22°C - 35°C',
    tempBn: '২২°সে - ৩৫°সে',
    soilEn: 'Sandy loam to Silt loam with good drainage',
    soilBn: 'সুনিষ্কাশিত বেলে দোআঁশ বা পলি দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '20 kcal', valBn: '২০ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '4 g', valBn: '৪ গ্রাম' },
      { nameEn: 'Vitamin A', nameBn: 'ভিটামিন এ', valEn: '255 IU', valBn: '২৫৫ আইইউ' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '29 mg', valBn: '২৯ মিলিগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '30 mg', valBn: '৩০ মিলিগ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '83 mg', valBn: '৮৩ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Vine Cutting Preparation',
        titleBn: 'কাটিং ও রুট প্রিপারেশন',
        descEn: 'Pointed gourds are vegetatively propagated. Select 1-year old healthy vines, cut them into 60-90cm lengths, and treat with organic root stimulant before planting.',
        descBn: 'পটল সাধারণত কাটিং লতা দিয়ে চাষ করা হয়। ১ বছর বয়সী সুস্থ লতা নির্বাচন করে ৬০-৯০ সেমি লম্বা কাটিং করুন এবং মাটিতে রোপণ করার প্রস্তুতি নিন।'
      },
      {
        titleEn: 'Bed Layout & Planting',
        titleBn: 'বেড ও চারা রোপণ',
        descEn: 'Make raised beds of 1.5m width. Plant vine cuttings in double rings at 1m distance. Maintain a ratio of 9 female plants to 1 male plant for optimal pollination.',
        descBn: '১.৫ মিটার চওড়া উঁচু বেড তৈরি করুন। ১ মিটার দূরত্বে কাটিং লতাগুলো বৃত্তাকার রিং বানিয়ে রোপণ করুন। ভালো পরাগায়নের জন্য ৯টি স্ত্রী গাছের সাথে ১টি পুরুষ গাছ রাখুন।'
      },
      {
        titleEn: 'Trellis Construction',
        titleBn: 'মাচা বা খুঁটি দেওয়া',
        descEn: 'Erect a low horizontal trellis (1 meter height) using bamboo sticks to support the heavy vine creepers, preventing gourds from resting on damp soil.',
        descBn: 'লতাগুলিকে মাটি থেকে ওপরে রাখতে ১ মিটার উচ্চতায় বাঁশের নিচু মাচা বা বাউনি তৈরি করুন। এতে পটলগুলো সতেজ থাকে ও পচে যায় না।'
      },
      {
        titleEn: 'Pollination & Pest Control',
        titleBn: 'কৃত্রিম পরাগায়ন ও রোগ দমন',
        descEn: 'Perform manual hand pollination in early morning to maximize crop yield. Spray organic copper soap to treat powdery mildew or root rot.',
        descBn: 'ফলন বহুগুণ বাড়াতে ভোরে পুরুষ ফুল দিয়ে স্ত্রী ফুলে কৃত্রিম পরাগায়ন করুন। পাউডারি মিলডিউ বা গোড়া পচা রোগে প্রাকৃতিক কপার সাবান-পানি স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'okra',
    nameEn: 'Okra',
    nameBn: 'ঢেঁড়স',
    scientific: 'Abelmoschus esculentus',
    descEn: 'Tender, vibrant green organic Okra (Ladies\' fingers) harvested daily at our agro farm. Exceptionally rich in soluble dietary fiber (mucilage), folate, Vitamin C, and antioxidants, perfect for natural digestion and blood sugar regulation.',
    descBn: 'আমাদের এগ্রো ফার্মে প্রতিদিন সকালে সংগৃহীত সতেজ ও কচি ঢেঁড়স। এটি দ্রবণীয় খাদ্য আঁশ (মিউসিলেজ), ফোলেট, ভিটামিন সি এবং অ্যান্টিঅক্সিডেন্টে অত্যন্ত সমৃদ্ধ, যা কোষ্ঠকাঠিন্য দূর করতে এবং রক্তের শর্করা নিয়ন্ত্রণে অনন্য ভূমিকা পালন করে।',
    overviewEn: 'Tender okra pods grown with 100% natural organic compost and pure well water.',
    overviewBn: 'সম্পূর্ণ জৈব সার ও বিশুদ্ধ গভীর নলকূপের পানিতে উৎপাদিত কচি ঢেঁড়স।',
    sowingEn: 'March - May (Summer-Rainy)',
    sowingBn: 'মার্চ - মে (গ্রীষ্ম ও বর্ষাকাল)',
    harvestEn: 'May - July / মে - জুলাই',
    harvestBn: 'মে - জুলাই',
    maturityEn: '50 - 60 days',
    maturityBn: '৫০ - ৬০ দিন',
    yieldEn: '5 - 6 tons/acre',
    yieldBn: '৫ - ৬ টন (একর প্রতি)',
    tempEn: '20°C - 38°C',
    tempBn: '২০°সে - ৩৮°সে',
    soilEn: 'Loose, well-drained sandy loam to clay loam',
    soilBn: 'ঝুরঝুরে ও সুনিষ্কাশিত বেলে দোআঁশ বা এঁটেল দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '33 kcal', valBn: '৩৩ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '7.5 g', valBn: '৭.৫ গ্রাম' },
      { nameEn: 'Dietary Fiber', nameBn: 'খাদ্য আঁশ', valEn: '3.2 g', valBn: '৩.২ গ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '23 mg', valBn: '২৩ মিলিগ্রাম' },
      { nameEn: 'Folate', nameBn: 'ফোলেট', valEn: '60 mcg', valBn: '৬০ মাইক্রোগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '82 mg', valBn: '৮২ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Land Cultivation',
        titleBn: 'জমি চাষ ও গোবর সার',
        descEn: 'Plow the soil 3-4 times to form a fine tilth. Add 12 tons of well-rotted farmyard manure or organic vermicompost per acre during land preparation.',
        descBn: 'জমি ৩-৪ বার চাষ দিয়ে মাটি ঝুরঝুরে করে নিন। জমি তৈরির সময় একর প্রতি ১০-১২ টন পচা গোবর সার অথবা জৈব কেঁচো সার মাটির সাথে মিশিয়ে দিন।'
      },
      {
        titleEn: 'Seed Sowing & Spacing',
        titleBn: 'বীজ বপন ও দূরত্ব',
        descEn: 'Soak seeds in water for 24 hours to break dormancy. Sow seeds 2cm deep on ridges spaced 60cm apart, keeping a 30cm spacing between plants.',
        descBn: 'বীজের সুপ্ততা ভাঙতে ২৪ ঘণ্টা পানিতে ভিজিয়ে রাখুন। ৬০ সেমি চওড়া সারির মাঝে গাছ থেকে গাছ ৩০ সেমি দূরত্ব রেখে ২ সেমি গভীরতায় বীজ বপন করুন।'
      },
      {
        titleEn: 'Watering & Weeding',
        titleBn: 'সেচ ও নিড়ানি দেওয়া',
        descEn: 'Irrigate every 4-5 days during summer and keep the roots moist. Weed regularly to prevent competition for soil nutrients.',
        descBn: 'গ্রীষ্মকালে প্রতি ৪-৫ দিন পর পর সেচ দিন এবং শিকড়ে আর্দ্রতা বজায় রাখুন। মাটির পুষ্টি বজায় রাখতে নিয়মিত আগাছা পরিষ্কার বা নিড়ানি দিন।'
      },
      {
        titleEn: 'Yellow Mosaic & Pest Control',
        titleBn: 'হলুদ মোজাইক ও পোকা দমন',
        descEn: 'Choose disease-resistant seeds. Control whiteflies (vectors for Yellow Vein Mosaic Virus) by spraying organic soap solution and installing yellow sticky traps.',
        descBn: 'হলুদ মোজাইক ভাইরাস ছড়ানো সাদা মাছি দমনের জন্য হলুদ আঠালো ফাঁদ পাতুন এবং জৈব নিম পাতার সাবান-পানি স্প্রে করুন।'
      }
    ]
  },
  {
    slug: 'bitter-gourd',
    nameEn: 'Bitter Gourd',
    nameBn: 'করলা',
    scientific: 'Momordica charantia',
    descEn: 'Crunchy, organically grown premium Bitter Gourds (Korola). Celebrated worldwide for its profound health benefits, blood purifying properties, and diabetic-friendly compounds, grown with advanced micronutrients.',
    descBn: 'আমাদের খামারে উন্নত প্রাকৃতিক ও জৈব উপায়ে উৎপাদিত পুষ্টিসমৃদ্ধ প্রিমিয়াম করলা। এটি রক্ত পরিষ্কার করতে এবং ডায়াবেটিস নিয়ন্ত্রণে অত্যন্ত কার্যকরী সবজি হিসেবে বিশ্বজুড়ে সমাদৃত, যা আমাদের খামারে সম্পূর্ণ রাসায়নিকহীনভাবে ফলানো হয়।',
    overviewEn: 'Dark-green, healthy bitter gourds cultivated on premium organic trellises.',
    overviewBn: 'উন্নত মানের মাচায় উৎপাদিত গাঢ় সবুজ রঙের রোগ প্রতিরোধকারী করলা।',
    sowingEn: 'Feb - March (Summer), Sep - Oct (Winter)',
    sowingBn: 'ফেব্রুয়ারি - মার্চ (গ্রীষ্মকালীন), সেপ্টেম্বর - অক্টোবর (শীতকালীন)',
    harvestEn: 'April - June, Nov - Jan',
    harvestBn: 'এপ্রিল - জুন, নভেম্বর - জানুয়ারি',
    maturityEn: '55 - 65 days',
    maturityBn: '৫৫ - ৬৫ দিন',
    yieldEn: '7 - 9 tons/acre',
    yieldBn: '৭ - ৯ টন (একর প্রতি)',
    tempEn: '22°C - 35°C',
    tempBn: '২২°সে - ৩৫°সে',
    soilEn: 'Sandy loam to Clayey loam rich in organic matter',
    soilBn: 'উচ্চ জৈব পদার্থসমৃদ্ধ বেলে দোআঁশ থেকে এঁটেল দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '17 kcal', valBn: '১৭ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '3.7 g', valBn: '৩.৭ গ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '84 mg', valBn: '৮৪ মিলিগ্রাম' },
      { nameEn: 'Iron', nameBn: 'আয়রন', valEn: '0.4 mg', valBn: '০.৪ মিলিগ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '296 mg', valBn: '২৯৬ মিলিগ্রাম' },
      { nameEn: 'Calcium', nameBn: 'ক্যালসিয়াম', valEn: '19 mg', valBn: '১৯ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Land & Macha Setup',
        titleBn: 'জমি তৈরি ও মাচা স্থাপন',
        descEn: 'Prepare 1.2m wide beds and enrich them with organic manure. Erect a bamboo trellis (Macha) at a height of 1.8m for the vines to climb.',
        descBn: '১.২ মিটার চওড়া বেড তৈরি করে জৈব সার দিন। লতা বেয়ে ওঠার জন্য ১.৮ মিটার উচ্চতায় বাঁশের মাচা তৈরি করে দিন।'
      },
      {
        titleEn: 'Sowing Seeds',
        titleBn: 'বীজ বপন',
        descEn: 'Soak seeds for 24 hours. Plant seeds 2cm deep on beds with 45cm spacing between plants and 1.5m spacing between beds.',
        descBn: 'বীজ ২৪ ঘণ্টা পানিতে ভিজিয়ে রাখুন। বেডের ওপর ৪৫ সেমি দূরত্বে এবং ২ সেমি গভীরে বীজ বপন করুন।'
      },
      {
        titleEn: 'Irrigation & Fertilization',
        titleBn: 'পানি সেচ ও জৈব খাবার',
        descEn: 'Water the plants every 3-4 days to maintain continuous growth. Feed roots with organic mustard oil cake liquid fertilizer every 2 weeks.',
        descBn: 'গাছের দ্রুত বৃদ্ধির জন্য প্রতি ৩-৪ দিন পর পর সেচ দিন। প্রতি ২ সপ্তাহে একবার খৈল পচা জৈব তরল সার গাছের গোড়ায় দিন।'
      },
      {
        titleEn: 'Fruit Fly Management',
        titleBn: 'ফলের মাছি পোকা দমন',
        descEn: 'Protect young bitter gourds by wrapping them in paper sleeves or mesh bags. Hang organic pheromone traps to capture adult fruit flies.',
        descBn: 'কচি করলাগুলো প্লাস্টিক জাল বা কাগজের প্যাকেট দিয়ে ঢেকে দিন। মাছি পোকার আক্রমণ থেকে রক্ষা করতে ফেরোমন ফাঁদ ঝুলিয়ে দিন।'
      }
    ]
  },
  {
    slug: 'eggplant',
    nameEn: 'Eggplant',
    nameBn: 'বেগুন',
    scientific: 'Solanum melongena',
    descEn: 'Vibrant, glossy, and fleshy organic purple eggplants (Begun). Cultivated using traditional eco-friendly methods and organic compost, our eggplants are tender, low in seeds, and rich in natural antioxidants.',
    descBn: 'আমাদের খামারে সম্পূর্ণ জৈব সারের প্রয়োগে উৎপাদিত আকর্ষণীয় উজ্জ্বল বেগুনি রঙের গোল ও লম্বা বেগুন। ঐতিহ্যবাহী প্রাকৃতিক উপায়ে চাষ করায় এর ভেতরের অংশ হয় অত্যন্ত নরম, বীজ থাকে খুবই কম এবং এটি অ্যান্টিঅক্সিডেন্টে ভরপুর থাকে।',
    overviewEn: 'Tender and seedless glossy eggplants grown with purely organic soil nutrients.',
    overviewBn: 'রাসায়নিক কীটনাশকমুক্ত নরম ও সুস্বাদু কচি বেগুন সরাসরি বাগান থেকে।',
    sowingEn: 'Oct - Nov (Winter), April - May (Summer)',
    sowingBn: 'অক্টোবর - নভেম্বর (শীতকালীন), এপ্রিল - মে (গ্রীষ্মকালীন)',
    harvestEn: 'Jan - March (Winter), July - Sep (Summer)',
    harvestBn: 'জানুয়ারি - মার্চ (শীতকালীন), জুলাই - সেপ্টেম্বর (গ্রীষ্মকালীন)',
    maturityEn: '75 - 85 days',
    maturityBn: '৭৫ - ৮৫ দিন',
    yieldEn: '10 - 15 tons/acre',
    yieldBn: '১০ - ১৫ টন (একর প্রতি)',
    tempEn: '20°C - 30°C',
    tempBn: '২০°সে - ৩০°সে',
    soilEn: 'Silt loam to Clay loam with rich organic nutrients',
    soilBn: 'পুষ্টিসমৃদ্ধ পলি দোআঁশ থেকে কাদা দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '25 kcal', valBn: '২৫ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '6 g', valBn: '৬ গ্রাম' },
      { nameEn: 'Dietary Fiber', nameBn: 'খাদ্য আঁশ', valEn: '3 g', valBn: '৩ গ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '229 mg', valBn: '২২৯ মিলিগ্রাম' },
      { nameEn: 'Vitamin B6', nameBn: 'ভিটামিন বি৬', valEn: '0.1 mg', valBn: '০.১ মিলিগ্রাম' },
      { nameEn: 'Iron', nameBn: 'আয়রন', valEn: '0.2 mg', valBn: '০.২ মিলিগ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Seedling Raising',
        titleBn: 'বীজতলা ও চারা তৈরি',
        descEn: 'Raise seedlings in small coco-peat cups or seedbeds. Transplant 4-week-old healthy seedlings into the main field on a cloudy afternoon.',
        descBn: 'কোকোপিট বা বীজতলায় বীজ বুনে চারা তৈরি করুন। চারা ৪ সপ্তাহ বয়সী বা ৪-৫টি পাতা হলে মেঘলা বিকেলে মূল জমিতে রোপণ করুন।'
      },
      {
        titleEn: 'Spaced Planting',
        titleBn: 'রোপণ ও রোপণ দূরত্ব',
        descEn: 'Make raised beds and plant seedlings with a spacing of 75cm x 60cm. Provide deep watering immediately after transplanting.',
        descBn: 'উঁচু বেড তৈরি করে ৭৫ সেমি x ৬০ সেমি দূরত্ব রেখে চারা রোপণ করুন। চারা রোপণের সাথে সাথে গোড়ায় পর্যাপ্ত পানি দিন।'
      },
      {
        titleEn: 'Staking & Irrigation',
        titleBn: 'বাঁশের খুঁটি ও সেচ',
        descEn: 'Install bamboo stakes to support heavy eggplant branches and prevent them from breaking under the weight of the fruits. Maintain regular soil moisture.',
        descBn: 'বেগুন ধরলে গাছের ডাল যাতে ভেঙে না যায় সেজন্য বাঁশের খুঁটি দিয়ে বেঁধে দিন। মাটির আর্দ্রতা অনুযায়ী নিয়ম মেনে সেচ দিন।'
      },
      {
        titleEn: 'Shoot & Fruit Borer Control',
        titleBn: 'ডগা ও ফল ছিদ্রকারী পোকা দমন',
        descEn: 'Regularly prune infested shoots and discard them. Spray natural neem-garlic extract and install light traps to capture egg-laying moths.',
        descBn: 'আক্রান্ত ডগা ও বেগুন কেটে দূরে ফেলে দিন। ডগা ছিদ্রকারী পোকা দমনে নিম ও রসুনের নির্যাস স্প্রে করুন এবং রাতে আলোর ফাঁদ ব্যবহার করুন।'
      }
    ]
  },
  {
    slug: 'potato',
    nameEn: 'Potato',
    nameBn: 'গোল আলু',
    scientific: 'Solanum tuberosum',
    descEn: 'Premium organic round starchy potatoes grown in fertile sandy soil. Completely free from harmful growth hormones and chemical treatments, loaded with complex carbohydrates and essential minerals.',
    descBn: 'আমাদের খামারে উর্বর বেলে মাটিতে উৎপাদিত অত্যন্ত সতেজ ও স্বাস্থ্যকর গোল আলু। এটি কোনো প্রকার ক্ষতিকর হরমোন বা রাসায়নিক প্রিজারভেটিভ ছাড়াই সম্পূর্ণ প্রাকৃতিক উপায়ে চাষ করা হয়, যা স্বাস্থ্যকর শক্তির প্রধান উৎস।',
    overviewEn: 'Nutrient-rich, starchy premium quality potatoes cultivated organically.',
    overviewBn: 'পুষ্টিসমৃদ্ধ, কার্বোহাইড্রেট সম্পন্ন প্রিমিয়াম আলু যা সম্পূর্ণ জৈব উপায়ে চাষ করা হয়।',
    sowingEn: 'Nov - Dec (Winter)',
    sowingBn: 'নভেম্বর - ডিসেম্বর (শীতকালীন)',
    harvestEn: 'Feb - March (Spring)',
    harvestBn: 'ফেব্রুয়ারি - মার্চ (বসন্তকালীন)',
    maturityEn: '85 - 95 days',
    maturityBn: '৮৫ - ৯৫ দিন',
    yieldEn: '12 - 15 tons/acre',
    yieldBn: '১২ - ১৫ টন (একর প্রতি)',
    tempEn: '15°C - 22°C',
    tempBn: '১৫°সে - ২২°সে',
    soilEn: 'Loose, well-aerated sandy loam',
    soilBn: 'আলগা, সুনিষ্কাশিত বেলে দোআঁশ মাটি',
    nutrients: [
      { nameEn: 'Energy', nameBn: 'শক্তি', valEn: '77 kcal', valBn: '৭৭ কিলোক্যালরি' },
      { nameEn: 'Carbohydrates', nameBn: 'শর্করা', valEn: '17 g', valBn: '১৭ গ্রাম' },
      { nameEn: 'Potassium', nameBn: 'পটাশিয়াম', valEn: '421 mg', valBn: '৪২১ মিলিগ্রাম' },
      { nameEn: 'Vitamin C', nameBn: 'ভিটামিন সি', valEn: '19.7 mg', valBn: '১৯.৭ মিলিগ্রাম' },
      { nameEn: 'Dietary Fiber', nameBn: 'খাদ্য আঁশ', valEn: '2.2 g', valBn: '২.২ গ্রাম' },
      { nameEn: 'Protein', nameBn: 'আমিষ', valEn: '2 g', valBn: '২ গ্রাম' }
    ],
    steps: [
      {
        titleEn: 'Deep Tillage & Furrows',
        titleBn: 'গভীর চাষ ও নালা তৈরি',
        descEn: 'Plow land deeply 5-6 times to make soil loose and fluffy. Construct furrows 60cm apart and enrich them with organic manure and vermicompost.',
        descBn: 'জমি ৫-৬ বার আড়াআড়ি গভীর চাষ দিয়ে ধুলো ও ঝুরঝুরে করে নিন। ৬০ সেমি দূরত্বে নালা তৈরি করে তাতে প্রচুর জৈব সার ও কম্পোস্ট দিন।'
      },
      {
        titleEn: 'Seed Planting',
        titleBn: 'বীজ আলু রোপণ',
        descEn: 'Select healthy, sprouted seed potatoes. Plant them in furrows 5-8cm deep with a spacing of 20-25cm between tubers, keeping sprouts facing upwards.',
        descBn: 'অঙ্কুরিত সুস্থ বীজ আলু নির্বাচন করুন। নালার মধ্যে ৫-৮ সেমি গভীরে ২০-২৫ সেমি দূরে দূরে চোখ বা অঙ্কুর ওপরের দিকে রেখে রোপণ করুন।'
      },
      {
        titleEn: 'Earthing Up / Hilling',
        titleBn: 'মাটি তোলা ও ভেলী তৈরি',
        descEn: 'Perform earthing up (hilling) 25-30 days after planting as plants grow 15cm high. This protects young potato tubers from sun exposure which causes greening.',
        descBn: 'চারা ১৫ সেমি বড় হলে (২৫-৩০ দিন পর) দুই পাশ থেকে মাটি তুলে ভেলী তৈরি করুন। এটি আলুকে সরাসরি রোদের হাত থেকে রক্ষা করে ও ফলন বাড়ায়।'
      },
      {
        titleEn: 'Late Blight & Water Management',
        titleBn: 'নাবী ধসা রোগ ও সেচ',
        descEn: 'Irrigate immediately after hilling. Avoid waterlogging. To prevent Late Blight, apply organic copper fungicide spray if the weather is cold and foggy.',
        descBn: 'মাটি তোলার পর পরই হালকা সেচ দিন। জলাবদ্ধতা পরিহার করুন। নাবী ধসা (লেট ব্লাইট) রোগ দমনে কুয়াশাচ্ছন্ন আবহাওয়ায় প্রাকৃতিক কপার ওষুধ স্প্রে করুন।'
      }
    ]
  }
];

// Helper to get 3 random crops for related carousel (excluding current)
function getRelatedCrops(currentSlug) {
  const filtered = crops.filter(c => c.slug !== currentSlug);
  // shuffle and take 3
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// Generate pages
crops.forEach(crop => {
  const subfolderPath = path.join('e:\\greenspout\\our-crops', crop.slug);
  fs.mkdirSync(subfolderPath, { recursive: true });

  // Modify paths in header & footer to account for 2 levels deep subfolder
  let headerHTML = baseHeaderHTML
    .replace(/href="\.\//g, 'href="../../')
    .replace(/src="\.\//g, 'src="../../')
    .replace(/url\('\.\//g, "url('../../");

  let footerHTML = baseFooterHTML
    .replace(/href="\.\//g, 'href="../../')
    .replace(/src="\.\//g, 'src="../../')
    .replace(/url\('\.\//g, "url('../../");

  // Build facts grid HTML
  const factsHTML = `
    <!-- START QUICK FACTS -->
    <div class="facts-grid">
      <!-- 1. Sowing Time -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Sowing Time</span>
            <span class="bn-text">বপনের সময়</span>
          </h4>
          <p>
            <span class="en-text">${crop.sowingEn}</span>
            <span class="bn-text">${crop.sowingBn}</span>
          </p>
        </div>
      </div>

      <!-- 2. Harvest Period -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Harvest Period</span>
            <span class="bn-text">ফসল সংগ্রহ</span>
          </h4>
          <p>
            <span class="en-text">${crop.harvestEn}</span>
            <span class="bn-text">${crop.harvestBn}</span>
          </p>
        </div>
      </div>

      <!-- 3. Maturity Days -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Maturity Days</span>
            <span class="bn-text">পরিপক্কতা</span>
          </h4>
          <p>
            <span class="en-text">${crop.maturityEn}</span>
            <span class="bn-text">${crop.maturityBn}</span>
          </p>
        </div>
      </div>

      <!-- 4. Yield per Acre -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Yield per Acre</span>
            <span class="bn-text">একর প্রতি ফলন</span>
          </h4>
          <p>
            <span class="en-text">${crop.yieldEn}</span>
            <span class="bn-text">${crop.yieldBn}</span>
          </p>
        </div>
      </div>

      <!-- 5. Climate / Temp -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Ideal Temperature</span>
            <span class="bn-text">উপযুক্ত তাপমাত্রা</span>
          </h4>
          <p>
            <span class="en-text">${crop.tempEn}</span>
            <span class="bn-text">${crop.tempBn}</span>
          </p>
        </div>
      </div>

      <!-- 6. Soil Type -->
      <div class="fact-tile">
        <div class="fact-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
        </div>
        <div class="fact-info">
          <h4>
            <span class="en-text">Soil Suitability</span>
            <span class="bn-text">মাটির ধরণ</span>
          </h4>
          <p>
            <span class="en-text">${crop.soilEn}</span>
            <span class="bn-text">${crop.soilBn}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- END QUICK FACTS -->
  `;

  // Build cultivation steps accordion HTML
  let stepsHTML = '';
  crop.steps.forEach((step, idx) => {
    stepsHTML += `
      <div class="accordion-item">
        <div class="accordion-header">
          <div class="accordion-title">
            <span style="color: var(--ksfl-gold); font-weight: bold; font-size: 22px;">0${idx+1}.</span>
            <span>
              <span class="en-text">${step.titleEn}</span>
              <span class="bn-text">${step.titleBn}</span>
            </span>
          </div>
          <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="accordion-content">
          <p>
            <span class="en-text">${step.descEn}</span>
            <span class="bn-text">${step.descBn}</span>
          </p>
        </div>
      </div>
    `;
  });

  // Build nutrition table rows HTML
  let nutritionRowsHTML = '';
  crop.nutrients.forEach(n => {
    nutritionRowsHTML += `
      <tr>
        <td style="font-weight: bold; color: var(--ksfl-green-accent);">
          <span class="en-text">${n.nameEn}</span>
          <span class="bn-text">${n.nameBn}</span>
        </td>
        <td>
          <span class="en-text">${n.valEn}</span>
          <span class="bn-text">${n.valBn}</span>
        </td>
      </tr>
    `;
  });

  // Build related crops showcase HTML
  const relatedCrops = getRelatedCrops(crop.slug);
  let relatedHTML = '';
  relatedCrops.forEach(rc => {
    relatedHTML += `
      <a class="crop-card" href="../${rc.slug}/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="../../assets/crops/${rc.slug}.png" alt="${rc.nameEn}" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">${rc.scientific}</span>
            <h3 class="crop-title">
              <span class="en-text">${rc.nameEn}</span>
              <span class="bn-text">${rc.nameBn}</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">${rc.overviewEn}</span>
              <span class="bn-text">${rc.overviewBn}</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    `;
  });

  // Middle Content for each crop detail page
  const middleHTML = `
    <!-- START CROP HERO -->
    <div class="crop-detail-hero">
      <img src="../../assets/crops/${crop.slug}.png" alt="${crop.nameEn}">
      <div class="crop-detail-hero-content">
        <h1 class="font-primary2">
          <span class="en-text">${crop.nameEn}</span>
          <span class="bn-text">${crop.nameBn}</span>
        </h1>
        <div class="crop-detail-breadcrumbs">
          <a href="../../index.html"><span class="en-text">Home</span><span class="bn-text">হোম</span></a> &gt; 
          <a href="../../our-crops.html"><span class="en-text">Our Crops</span><span class="bn-text">আমাদের ফসল</span></a> &gt; 
          <span class="en-text">${crop.nameEn}</span><span class="bn-text">${crop.nameBn}</span>
        </div>
      </div>
    </div>
    <!-- END CROP HERO -->

    <main class="crop-detail-main">
      <div class="crop-detail-container">
        
        <!-- Two Column Overview -->
        <div class="crop-overview">
          <div class="crop-overview-img-wrap" data-reveal="true">
            <img src="../../assets/crops/${crop.slug}.png" alt="${crop.nameEn}">
          </div>
          <div class="crop-overview-text">
            <span class="crop-scientific" style="font-size: 18px; display: block; margin-bottom: 10px;">${crop.scientific}</span>
            <h2 class="font-primary2">
              <span class="en-text">Crop Overview</span>
              <span class="bn-text">ফসল পরিচিতি</span>
            </h2>
            <p style="font-size: 17px; line-height: 1.7; color: #555;">
              <span class="en-text">${crop.descEn}</span>
              <span class="bn-text">${crop.descBn}</span>
            </p>
            
            <table class="crop-meta-table">
              <tr>
                <td class="label">
                  <span class="en-text">Botanical Name</span>
                  <span class="bn-text">উদ্ভিদ বৈজ্ঞানিক নাম</span>
                </td>
                <td class="val" style="font-style: italic;">${crop.scientific}</td>
              </tr>
              <tr>
                <td class="label">
                  <span class="en-text">Organic Fertilizer</span>
                  <span class="bn-text">জৈব সার প্রয়োগ</span>
                </td>
                <td class="val">
                  <span class="en-text">KSFL Bio-Compost & Micronutrients</span>
                  <span class="bn-text">কেএসএফএল বায়ো-কম্পোস্ট ও মাইক্রোনিউট্রিয়েন্টস</span>
                </td>
              </tr>
              <tr>
                <td class="label">
                  <span class="en-text">Cultivation Method</span>
                  <span class="bn-text">চাষের ধরণ</span>
                </td>
                <td class="val">
                  <span class="en-text">100% Pesticide-Free Natural Growth</span>
                  <span class="bn-text">১০০% কীটনাশকমুক্ত প্রাকৃতিক চাষ</span>
                </td>
              </tr>
            </table>
          </div>
        </div>

        ${factsHTML}

        <!-- Cultivation Steps Accordion -->
        <div class="cultivation-section">
          <h2 class="font-primary2">
            <span class="en-text">Cultivation Guide</span>
            <span class="bn-text">চাষাবাদ নির্দেশিকা</span>
          </h2>
          <div style="max-width: 900px; margin: 0 auto;">
            ${stepsHTML}
          </div>
        </div>

        <!-- Nutritional Profile Table -->
        <div class="nutrition-section" style="max-width: 800px; margin: 0 auto 80px auto;">
          <h2 class="font-primary2">
            <span class="en-text">Nutritional Value (Per 100g)</span>
            <span class="bn-text">পুষ্টিগুণ ও উপাদান (প্রতি ১০০ গ্রামে)</span>
          </h2>
          <table class="nutrition-table">
            <thead>
              <tr>
                <th>
                  <span class="en-text">Nutrient Element</span>
                  <span class="bn-text">পুষ্টি উপাদান</span>
                </th>
                <th>
                  <span class="en-text">Value Amount</span>
                  <span class="bn-text">পরিমাণ</span>
                </th>
              </tr>
            </thead>
            <tbody>
              ${nutritionRowsHTML}
            </tbody>
          </table>
        </div>

        <!-- Related Crops Carousel -->
        <div class="related-section">
          <h2 class="font-primary2">
            <span class="en-text">Explore Other Grown Crops</span>
            <span class="bn-text">আমাদের অন্যান্য উৎপাদিত ফসল</span>
          </h2>
          <div class="crops-grid">
            ${relatedHTML}
          </div>
        </div>

      </div>
    </main>

    <!-- Custom accordion toggle script -->
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('.accordion-header').forEach(header => {
          header.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
          });
        });
      });
    </script>
  `;

  const finalPageHTML = headerHTML + middleHTML + footerHTML;

  fs.writeFileSync(path.join(subfolderPath, 'index.html'), finalPageHTML, 'utf8');
  console.log(`Successfully generated detail page for: ${crop.slug}`);
});

console.log('All 10 crop details sub-pages generated successfully!');
