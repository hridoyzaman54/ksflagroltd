const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];
let count = 0;

const translationInjection = `
<!-- AI MANUAL TRANSLATOR & PREMIUM UI TOGGLE -->
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
<div class="ai-lang-toggle" style="position: fixed; bottom: 30px; right: 30px; z-index: 999999; display: flex; align-items: center; background-color: var(--premade_template_dpw2cmzz, #5A6D3F); border-radius: 50px; padding: 5px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(253, 226, 81, 0.4); cursor: pointer; transition: transform 0.3s ease;">
    <div id="btn-en" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: 'Roboto', sans-serif; color: #293920; background-color: #FDE251; transition: all 0.3s ease;">EN</div>
    <div id="btn-bn" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: 'Hind Siliguri', sans-serif; color: #fff; background-color: transparent; transition: all 0.3s ease;">BN</div>
</div>

<style>
/* Specially Reset and Fix Bangla word/character scrambling issues completely */
html body.lang-bn, 
html body.lang-bn *,
html body.lang-bn span,
html body.lang-bn p,
html body.lang-bn a,
html body.lang-bn div,
html body.lang-bn h1,
html body.lang-bn h2,
html body.lang-bn h3,
html body.lang-bn h4,
html body.lang-bn h5,
html body.lang-bn h6 {
    font-family: 'Hind Siliguri', 'Noto Serif Bengali', Arial, sans-serif !important;
    letter-spacing: normal !important;
    letter-spacing: 0px !important;
    word-spacing: normal !important;
    word-spacing: 0px !important;
    text-transform: none !important;
    font-style: normal !important;
    line-height: 1.5 !important;
}
.ai-lang-toggle:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
</style>

<script>
window.addEventListener("DOMContentLoaded", function() {
    const dict = {
        "About &#8211; KSFL Agro Ltd.": "আমাদের সম্পর্কে – কেএসএফএল এগ্রো লিঃ",
        "KSFL Agro Ltd.": "কেএসএফএল এগ্রো লিঃ",
        "Home": "হোম",
        "Our Story": "আমাদের কথা",
        "Our Products": "আমাদের পণ্যসমূহ",
        "Farm Experiences &#038; Kits": "খামারের অভিজ্ঞতা ও কিটস",
        "Seeds &#038; Farm Goods": "বীজ এবং খামারের পণ্য",
        "Herbal &#038; Wellness Products": "ভেষজ ও সুস্থতা পণ্য",
        "Dairy &#038; Animal Products": "দুগ্ধ ও প্রাণীজ পণ্য",
        "Natural Pantry Items": "প্রাকৃতিক খাদ্যসামগ্রী",
        "Blogs": "ব্লগ",
        "Contact us": "যোগাযোগ করুন",
        "About Us": "আমাদের সম্পর্কে",
        "We envision a future where innovation nourishes the earth and enhances sustainable agriculture. By integrating technology with traditional methods.": "আমরা এমন এক ভবিষ্যতের কল্পনা করি যেখানে উদ্ভাবন পৃথিবীকে পুষ্ট করে এবং টেকসই কৃষিকে উন্নত করে। ঐতিহ্যবাহী পদ্ধতির সাথে প্রযুক্তির সংমিশ্রণে আমরা পরিবেশকে সাহায্য করতে চাই।",
        "Farmers supported": "সহায়তাপ্রাপ্ত কৃষক",
        "Organic crops": "জৈব ফসল",
        "Years of expertise": "অভিজ্ঞতার বছর",
        "Mission": "আমাদের লক্ষ্য",
        "To inspire and educate our community by sharing the values and practices of sustainable organic farming, empowering individuals to live healthier and more eco-friendly lives.": "টেকসই জৈব চাষের মূল্যবোধ এবং অনুশীলনগুলি ভাগ করে নেওয়ার মাধ্যমে আমাদের সমাজকে অনুপ্রাণিত ও শিক্ষিত করা, যাতে ব্যক্তিরা স্বাস্থ্যকর এবং পরিবেশ-বান্ধব জীবনযাপন করতে পারে।",
        "Vision": "আমাদের ভিশন",
        "To be a leading source of knowledge and inspiration for organic agriculture, fostering a healthier planet and a connected community through hands-on experiences, quality products, and shared learning.": "জৈব কৃষির জ্ঞান এবং অনুপ্রেরণার একটি প্রধান উৎস হওয়া, স্বাস্থ্যকর পৃথিবী এবং একটি সংযুক্ত সমাজ গড়ে তোলা।",
        "Goal": "আমাদের উদ্দেশ্য",
        "To provide accessible resources, workshops, and products that make organic living practical, enjoyable, and impactful—for every home, family, and future generation.": "সহজে পাওয়া যায় এমন সম্পদ, কর্মশালা এবং পণ্য সরবরাহ করা যা জৈব জীবনযাপনকে প্রতিটি ঘর, পরিবার এবং ভবিষ্যত প্রজন্মের জন্য ব্যবহারিক, উপভোগ্য এবং কার্যকরী করে তোলে।",
        "We uncover market opportunities and tailor strategies for growth.": "আমরা বাজারের সুযোগগুলি উন্মোচন করি এবং প্রবৃদ্ধির জন্য কৌশলগুলি তৈরি করি।",
        "Trusted by top agro-companies": "শীর্ষস্থানীয় কৃষি কোম্পানিগুলোর বিশ্বস্ত",
        "Our Journey": "আমাদের পথচলা",
        "We envision a future where innovation nourishes": "আমরা এমন এক ভবিষ্যতের কল্পনা করি যেখানে উদ্ভাবন পৃথিবীকে পুষ্ট করবে",
        "KSFL Agro Ltd. began as a humble family venture and has blossomed into a flourishing organic farm, showcasing a deep-rooted commitment. KSFL Agro Ltd. began as a humble family venture and has blossomed.": "কেএসএফএল এগ্রো লিঃ একটি সাধারণ পারিবারিক উদ্যোগ হিসেবে যাত্রা শুরু করেছিল এবং তা আজ একটি সমৃদ্ধ জৈব খামারে পরিণত হয়েছে।",
        "Since 2012": "২০১২ সাল থেকে",
        "Explore Our Farm And Organically Produced Products": "আমাদের খামার এবং জৈব পণ্যসমূহ অন্বেষণ করুন",
        "We envision a future where innovation nourishes the earth and enhances sustainable agriculture.": "আমরা এমন এক ভবিষ্যতের কল্পনা করি যেখানে উদ্ভাবন পৃথিবীকে পুষ্ট করে এবং টেকসই কৃষিকে উন্নত করে।",
        "Our Team": "আমাদের দল",
        "The People Behind KSFL Agro Ltd.": "কেএসএফএল এগ্রো লিঃ এর পেছনের মানুষ",
        "Jonathan Reynolds": "জনাথন রেনল্ডস",
        "Chief Executive Officer": "প্রধান নির্বাহী কর্মকর্তা",
        "Jonathan is a visionary leader with over 20 years of experience in sustainable agriculture. He believes that the future of farming lies in the perfect balance of traditional wisdom and modern innovation. Under his guidance, KSFL Agro Ltd. has expanded its reach globally while maintaining its core commitment to organic, eco-friendly farming practices that nourish both people and the planet.": "জনাথন একজন দূরদর্শী নেতা যার টেকসই কৃষি ক্ষেত্রে ২০ বছরেরও বেশি অভিজ্ঞতা রয়েছে। তিনি বিশ্বাস করেন যে কৃষির ভবিষ্যৎ ঐতিহ্যগত জ্ঞান এবং আধুনিক উদ্ভাবনের নিখুঁত ভারসাম্যের মধ্যে নিহিত রয়েছে।",
        "Elena Rostova": "এলেনা রোস্তোভা",
        "Lead Agronomist": "প্রধান কৃষিবিদ",
        "Elena ensures our crops thrive naturally by developing cutting-edge organic soil management strategies.": "এলেনা আমাদের ফসলকে প্রাকৃতিকভাবে বাড়ানোর জন্য আধুনিক জৈব মাটি ব্যবস্থাপনা কৌশল তৈরি করেন।",
        "David Chen": "ডেভিড চেন",
        "Head of Farm Operations": "খামার কার্যক্রম প্রধান",
        "David oversees daily logistics, ensuring our sustainable harvesting processes are as efficient as possible.": "ডেভিড প্রতিদিনের সরবরাহ তদারকি করেন এবং আমাদের টেকসই ফসল তোলার প্রক্রিয়া সচল রাখেন।",
        "Sarah Jenkins": "সারাহ জেনকিন্স",
        "Director of Sustainability": "টেকসই উন্নয়ন পরিচালক",
        "Sarah spearheads our zero-waste initiatives, continually reducing our carbon footprint across all operations.": "সারাহ আমাদের শূন্য-বর্জ্য উদ্যোগের নেতৃত্ব দেন এবং কার্বন ফুটপ্রিন্ট কমিয়ে আনেন।",
        "Let’s grow healthier together": "চলুন একসাথে স্বাস্থ্যকরভাবে গড়ে উঠি",
        "Contact Us": "যোগাযোগ করুন",
        "Quick Links": "প্রয়োজনীয় লিঙ্ক",
        "About": "সম্পর্কে",
        "Contact": "যোগাযোগ",
        "Products": "পণ্যসমূহ",
        "Others": "অন্যান্য",
        "Terms of Service": "শর্তাবলী",
        "Subscribe": "সাবস্ক্রাইব করুন",
        "Successfully submitted": "সফলভাবে জমা দেওয়া হয়েছে",
        "Submit failed": "জমা দেওয়া ব্যর্থ হয়েছে",
        "©KSFL Agro Ltd. 2026. All rights reserved.": "©কেএসএফএল এগ্রো লিঃ ২০২৬। সর্বস্বত্ব সংরক্ষিত।",
        "Blogs &#8211; KSFL Agro Ltd.": "ব্লগ – কেএসএফএল এগ্রো লিঃ",
        "Blogs Articles": "ব্লগ ও নিবন্ধ",
        "News & Insight": "সংবাদ ও অন্তর্দৃষ্টি",
        "Subscribe to learn about new product features, the latest in technology, solutions, and updates.": "নতুন পণ্যের ফিচার, সর্বশেষ প্রযুক্তি, সমাধান এবং আপডেট সম্পর্কে জানতে সাবস্ক্রাইব করুন।",
        "Featured Blog": "নির্বাচিত ব্লগ",
        "November 14, 2025": "১৪ নভেম্বর, ২০২৫",
        "Gardening Tips": "বাগান করার টিপস",
        "Eco-Friendly Habits: Small Changes for a Greener Life": "পরিবেশ-বান্ধব অভ্যাস: সবুজ জীবনের জন্য ছোট পরিবর্তন",
        "Read More": "আরও পড়ুন",
        "All Blogs": "সব ব্লগ",
        "Organic Farming": "জৈব কৃষি",
        "Farm Life": "খামার জীবন",
        "Herbal Wellness": "ভেষজ সুস্থতা",
        "Sustainable Living": "টেকসই জীবনযাপন",
        "KSFL Agro Ltd.’s Guide to ZeroWaste Farming": "কেএসএফএল এগ্রো লিঃ এর শূন্য-বর্জ্য চাষ নির্দেশিকা",
        "The Journey of Farm-to-Table Dairy: Freshness to Your Home": "খামার থেকে ঘরে দুগ্ধজাত পণ্যের যাত্রা",
        "Starting Your First Organic Garden: A Beginner’s Guide": "আপনার প্রথম জৈব বাগান শুরু করা: নতুনদের নির্দেশিকা",
        "November 13, 2025": "১৩ নভেম্বর, ২০২৫",
        "Top 5 Lessons Learned from Our Organic Farming Workshops": "আমাদের জৈব কৃষি কর্মশালা থেকে শেখা সেরা ৫টি শিক্ষা",
        "Contact &#8211; KSFL Agro Ltd.": "যোগাযোগ – কেএসএফএল এগ্রো লিঃ",
        "If you want to connect with us, feel free to reach out! We&#039;re eager to hear your thoughts and ideas.": "আপনি যদি আমাদের সাথে যুক্ত হতে চান, নিঃসঙ্কোচে যোগাযোগ করুন! আমরা আপনার মতামত ও চিন্তাভাবনা জানতে আগ্রহী।",
        "Phone": "ফোন",
        "(347) 438-7215": "(৩৪৭) ৪৩৮-৭২১৫",
        "Email": "ইমেইল",
        "By proceeding, you agree to KSFL Agro Ltd. Terms of Use and acknowledge that we use personal information as outlined in our Privacy Policy.": "এগিয়ে যাওয়ার মাধ্যমে আপনি ব্যবহারের শর্তাবলীতে সম্মত হচ্ছেন এবং স্বীকার করছেন যে আমরা আপনার ব্যক্তিগত তথ্য ব্যবহার করি।",
        "Submit": "জমা দিন",
        "Location": "অবস্থান",
        "Visit us in our farm and get to know more about our organic productions": "আমাদের খামারে আসুন এবং আমাদের জৈব উৎপাদন সম্পর্কে আরও জানুন",
        "Address": "ঠিকানা",
        "199 Oakway Lane, Woodland Hills, CA 91303": "১৯৯ ওকওয়ে লেন, উডল্যান্ড হিলস, সিএ ৯১৩০৩",
        "Visiting days": "পরিদর্শনের দিন",
        "Everyday from 9:00am to 11:00pm": "প্রতিদিন সকাল ৯:০০ থেকে রাত ১১:০০ পর্যন্ত",
        "See location": "অবস্থান দেখুন",
        "Open Google Map": "গুগল ম্যাপ ওপেন করুন",
        "Farm Experiences &#038; Kits &#8211; KSFL Agro Ltd.": "খামারের অভিজ্ঞতা ও কিটস – কেএসএফএল এগ্রো লিঃ",
        "Farm tours, workshops, and DIY kits — learn, grow, and experience real organic living.": "খামার পরিদর্শন, কর্মশালা এবং ডিআইওয়াই কিটস — শিখুন, চাষ করুন এবং প্রকৃত জৈব জীবনের অভিজ্ঞতা নিন।",
        "Product Details": "পণ্যের বিবরণ",
        "We make every pantry item from our own organic farm": "আমরা আমাদের নিজস্ব জৈব খামার থেকে প্রতিটি পণ্য তৈরি করি",
        "From pure honey to homemade jams and infused oils, everything is crafted in small batches using fresh, natural ingredients — just the way we make it at home.": "খাঁটি মধু থেকে শুরু করে ঘরে তৈরি জ্যাম এবং তেল, তাজা প্রাকৃতিক উপাদান ব্যবহার করে ছোট ছোট ব্যাচে সবকিছু তৈরি করা হয়।",
        "How it&#039;s made": "কিভাবে তৈরি হয়",
        "Sustainable Steps: How We Cultivate Organically": "টেকসই পদক্ষেপ: আমরা যেভাবে জৈবভাবে চাষ করি",
        "KSFL Agro Ltd. began as a humble family venture and has blossomed into a flourishing organic farm": "কেএসএফএল এগ্রো লিঃ একটি সাধারণ পারিবারিক উদ্যোগ হিসেবে শুরু হয়েছিল এবং তা আজ একটি সমৃদ্ধ জৈব খামারে পরিণত হয়েছে।",
        "Step 1": "ধাপ ১",
        "Grown the Natural Way": "প্রাকৃতিক উপায়ে চাষ",
        "Our ingredients come from pesticide-free farms where everything grows naturally — just sunshine, soil, and care.": "আমাদের উপাদান কীটনাশক-মুক্ত খামার থেকে আসে যেখানে সবকিছু প্রাকৃতিকভাবে জন্মে — শুধু রোদ, মাটি এবং যত্ন।",
        "Step 2": "ধাপ ২",
        "Handpicked with Care": "যত্ন সহকারে সংগৃহীত",
        "Fruits, seeds, and flowers are carefully harvested at their freshest to lock in full flavor and nutrients.": "ফল, বীজ এবং ফুল তাদের সতেজ অবস্থায় যত্ন সহকারে সংগ্রহ করা হয় যাতে সম্পূর্ণ স্বাদ ও পুষ্টি বজায় থাকে।",
        "Step 3": "ধাপ ৩",
        "Purely Processed": "বিশুদ্ধ প্রক্রিয়াজাতকরণ",
        "We use gentle, traditional methods, no additives or chemicals — to preserve the natural taste.": "আমরা প্রাকৃতিক স্বাদ সংরক্ষণের জন্য কোনো রাসায়নিক ছাড়া কোমল ঐতিহ্যবাহী পদ্ধতি ব্যবহার করি।",
        "Step 4": "ধাপ ৪",
        "Packed for You": "আপনার জন্য প্যাক করা",
        "Each jar and bottle is freshly sealed with love, ready to bring organic purity straight to your pantry.": "প্রতিটি জার এবং বোতল সতেজভাবে সিল করা হয়, যা সরাসরি আপনার কাছে পৌঁছে দেওয়ার জন্য প্রস্তুত।",
        "Behind the scene": "পেছনের দৃশ্য",
        "Witness the Pure Process Behind Our Golden Honey": "আমাদের সোনালী মধুর পেছনের বিশুদ্ধ প্রক্রিয়াটি দেখুন",
        "Explore our fresh goods": "আমাদের সতেজ পণ্যসমূহ অন্বেষণ করুন",
        "Explore our collection of organic pantry essentials, made fresh from our own farm.": "আমাদের নিজস্ব খামারের তাজা জৈব খাদ্যসামগ্রীর সংগ্রহ দেখুন।",
        "Testimonials": "প্রশংসাপত্র",
        "What People Say About Us": "আমাদের সম্পর্কে মানুষ যা বলেন",
        "The KSFL Agro Ltd. workshop inspired us with organic gardening. We took home seeds and compost to apply in our garden.": "কেএসএফএল এগ্রো লিঃ এর কর্মশালা আমাদের অনুপ্রাণিত করেছে। আমরা আমাদের বাগানের জন্য বীজ ও সার নিয়ে এসেছি।",
        "Lina Carter": "লিনা কার্টার",
        "Their kits are fantastic! I now have a thriving herb garden on my balcony.": "তাদের কিটস অসাধারণ! আমার বারান্দায় এখন একটি সুন্দর ভেষজ বাগান আছে।",
        "Marcus Lee": "মার্কাস লি",
        "I enjoyed KSFL Agro Ltd.'s herbal tea! The chamomile and mint blend was calming.": "আমি তাদের ভেষজ চা খুব উপভোগ করেছি! বিশেষ করে ক্যামোমাইল ও পুদিনা চা দারুণ শান্তিদায়ক।",
        "Noah Kim": "নোহ কিম",
        "Farm Experiences & Kits": "খামারের অভিজ্ঞতা ও কিটস",
        "Seeds & Farm Goods": "বীজ এবং খামারের পণ্য",
        "Herbal & Wellness Products": "ভেষজ ও সুস্থতা পণ্য",
        "Dairy & Animal Products": "দুগ্ধ ও প্রাণীজ পণ্য",
        "Sustainable, organic, and farm-grown, bringing nature’s best straight to you.": "টেকসই, জৈব এবং খামারে উৎপাদিত, প্রকৃতির সেরা উপহার সরাসরি আপনার কাছে নিয়ে আসা।",
        "Supporting healthy soil, happy farmers, and a greener tomorrow, one crop at a time.": "সুস্থ মাটি, সুখী কৃষক এবং একটি সবুজ ভবিষ্যতের জন্য একবারে একটি ফসল।",
        "We believe real food starts with real farming, pure soil, happy plants, and mindful care.": "আমরা বিশ্বাস করি আসল খাবারের শুরু হয় আসল চাষাবাদ, বিশুদ্ধ মাটি, সুখী উদ্ভিদ এবং যত্নশীল পরিচর্যা থেকে।",
        "We believe in cultivating a future where innovation nourishes the earth": "আমরা এমন এক ভবিষ্যতে বিশ্বাস করি যেখানে উদ্ভাবন পৃথিবীকে পুষ্ট করবে",
        "We envision a future where innovation nourishes the earth and enhances sustainable agriculture. By integrating technology with traditional methods, we aim to support the environment.": "আমরা এমন এক ভবিষ্যতের কল্পনা করি যেখানে উদ্ভাবন পৃথিবীকে পুষ্ট করে এবং টেকসই কৃষিকে উন্নত করে। ঐতিহ্যবাহী পদ্ধতির সাথে প্রযুক্তির সংমিশ্রণে আমরা পরিবেশকে সাহায্য করতে চাই।",
        "To be a leading source of knowledge and inspiration for organic agriculture, fostering a healthier planet and a connected community through hands-on experiences, quality products, and shared learning.eco-friendly lives.": "জৈব কৃষির জ্ঞান এবং অনুপ্রেরণার একটি প্রধান উৎস হওয়া, একটি সংযুক্ত সমাজ গড়ে তোলা।",
        "Learn More About Us": "আমাদের সম্পর্কে আরও জানুন",
        "Acknowledgement": "স্বীকৃতি",
        "Awards & Recognition": "পুরস্কার ও স্বীকৃতি",
        "We envision a future where innovation enhances sustainable agriculture and supports the environment.": "আমরা এমন এক ভবিষ্যতের কল্পনা করি যেখানে উদ্ভাবন টেকসই কৃষিকে উন্নত করে এবং পরিবেশকে সাহায্য করে।",
        "GreenTech Innovation Award 2024": "গ্রিনটেক ইনোভেশন অ্যাওয়ার্ড ২০২৪",
        "Our products": "আমাদের পণ্যসমূহ",
        "Our product is grown naturally, with sustainable, organic principles": "আমাদের পণ্য প্রাকৃতিকভাবে এবং টেকসই, জৈব নীতি মেনে উৎপাদিত হয়।",
        "Organic seeds, compost, and gardening kits — perfect for home growers and eco-hobbyists.": "জৈব বীজ, সার এবং বাগান করার কিট — বাড়ির চাষি এবং পরিবেশ-প্রেমীদের জন্য নিখুঁত।",
        "Herbal teas, dried herbs, and natural extracts — crafted for wellness and a balanced lifestyle.": "ভেষজ চা, শুকনো ভেষজ এবং প্রাকৃতিক নির্যাস — সুস্থতা এবং ভারসাম্যপূর্ণ জীবনযাপনের জন্য তৈরি।",
        "Milk, butter, cheese, and eggs — made with care from healthy animals.": "দুধ, মাখন, পনির এবং ডিম — সুস্থ পশু থেকে অত্যন্ত যত্নে উৎপাদিত।",
        "Organic honey, jams, oils, and grains — staples for healthy living.": "জৈব মধু, জ্যাম, তেল এবং শস্য — স্বাস্থ্যকর জীবনযাপনের প্রধান খাদ্য।",
        "How we work": "আমরা যেভাবে কাজ করি",
        "See Our Work Process": "আমাদের কাজের প্রক্রিয়া দেখুন",
        "Natural Cultivation": "প্রাকৃতিক চাষ",
        "Crops are grown using organic seeds, bio-fertilizers, and natural pest control methods like neem spray or companion planting — keeping the ecosystem balanced.": "জৈব বীজ, জৈব সার এবং নিমের স্প্রে বা সাথী রোপণের মতো প্রাকৃতিক কীটপতঙ্গ নিয়ন্ত্রণ পদ্ধতি ব্যবহার করে ফসল ফলানো হয়।",
        "Packaging & Direct Delivery": "প্যাকেজিং ও সরাসরি ডেলিভারি",
        "Products are packed in eco-friendly materials and delivered directly to local markets or customers — ensuring freshness and transparency from farm to table.": "পণ্য পরিবেশ-বান্ধব উপাদানে প্যাক করে সরাসরি স্থানীয় বাজার বা গ্রাহকদের কাছে পৌঁছে দেওয়া হয় — যা খামার থেকে টেবিলে সতেজতা ও স্বচ্ছতা নিশ্চিত করে।",
        "Sustainable Agriculture": "টেকসই কৃষি",
        "We're growing a greener tomorrow, rooted in innovation and nurtured by nature.": "আমরা প্রকৃতির স্নেহে এবং উদ্ভাবনে ভর করে একটি সবুজ আগামী গড়ে তুলছি।",
        "Discover how our farm-to-table practices bring nature's bounty to you.": "আমাদের খামার থেকে টেবিলের অনুশীলনগুলি কীভাবে প্রকৃতির সেরা উপহার আপনার কাছে নিয়ে আসে তা আবিষ্কার করুন।",
        "Discover our farming insights": "আমাদের কৃষি অন্তর্দৃষ্টি আবিষ্কার করুন",
        "August 16, 2024": "১৬ আগস্ট, ২০২৪",
        "Explore More Blogs": "আরও ব্লগ দেখুন",
        "Discover the next evolution of organic farming": "জৈব কৃষির পরবর্তী অগ্রগতি আবিষ্কার করুন",
        "Seeds &#038; Farm Goods &#8211; KSFL Agro Ltd.": "বীজ এবং খামারের পণ্য – কেএসএফএল এগ্রো লিঃ",
        "Organic seeds, handmade goods, and farming essentials — directly from our sustainable farm.": "জৈব বীজ, হস্তনির্মিত পণ্য এবং চাষের প্রয়োজনীয় উপকরণ — সরাসরি আমাদের টেকসই খামার থেকে।",
        "Quality seeds and essential farm goods for the grower": "চাষির জন্য উচ্চ মানের বীজ এবং খামারের প্রয়োজনীয় সামগ্রী",
        "From non-GMO seeds to natural tools and fertilizers, our collections support healthy, vibrant, and rewarding organic farming journeys.": "নন-জিএমও বীজ থেকে শুরু করে প্রাকৃতিক সরঞ্জাম এবং সার, আমাদের সংগ্রহ স্বাস্থ্যকর, প্রাণবন্ত এবং ফলপ্রসূ জৈব চাষে সহায়তা করে।",
        "We provide heirloom, non-GMO seeds and high-quality farm supplies for optimal growth.": "আমরা সর্বোত্তম বৃদ্ধির জন্য ঐতিহ্যবাহী, নন-জিএমও বীজ এবং উচ্চ মানের খামার সামগ্রী সরবরাহ করি।",
        "Gathered Naturally": "প্রাকৃতিকভাবে সংগৃহীত",
        "Our seeds are gathered from the healthiest heirloom crops, completely free of any pesticide exposure.": "আমাদের বীজ স্বাস্থ্যকর ঐতিহ্যবাহী ফসল থেকে সংগৃহীত, যা কীটনাশকের সংস্পর্শ থেকে সম্পূর্ণ মুক্ত।",
        "Tested for Vitality": "জীবনীশক্তি পরীক্ষা",
        "Every seed batch undergoes strict germination tests to ensure high vitality and healthy sprouting.": "প্রতিটি বীজের ব্যাচ উচ্চ জীবনীশক্তি এবং স্বাস্থ্যকর অঙ্কুরোদগম নিশ্চিত করার জন্য কঠোর পরীক্ষা অতিক্রম করে।",
        "Traditional Methods": "ঐতিহ্যবাহী পদ্ধতি",
        "We dry, sort, and store our seeds using traditional methods without chemicals to keep them viable.": "আমরা বীজ কার্যকর রাখতে রাসায়নিক ছাড়াই ঐতিহ্যবাহী পদ্ধতিতে শুকাই, বাছাই করি এবং সংরক্ষণ করি।",
        "Sealed for Growth": "বৃদ্ধির জন্য সিল করা",
        "Each packet is sealed to lock out moisture, ready to start a beautiful and sustainable harvest.": "প্রতিটি প্যাকেট আর্দ্রতা দূর করার জন্য সিল করা হয়েছে, যা একটি সুন্দর ও টেকসই ফসল শুরু করার জন্য প্রস্তুত।",
        "Witness the Pure Process Behind Our Farm Goods": "আমাদের খামারের পণ্যের পেছনের বিশুদ্ধ প্রক্রিয়াটি দেখুন",
        "The KSFL Agro Ltd. seeds inspired us to start a backyard patch. We've seen incredible germination rates!": "কেএসএফএল এগ্রো লিঃ এর বীজ আমাদের বাড়ির পেছনে চাষ শুরু করতে অনুপ্রাণিত করেছে। আমরা অসাধারণ অঙ্কুরোদগম হার দেখেছি!",
        "Their seeds are fantastic! I now have a thriving vegetable garden on my balcony.": "তাদের বীজগুলি অসাধারণ! আমার বারান্দায় এখন একটি সুন্দর সবজির বাগান আছে।",
        "I loved their seeds & farm tools. High quality materials that made my urban farming very simple.": "আমি তাদের বীজ ও খামারের সরঞ্জাম খুব পছন্দ করেছি। উচ্চ মানের উপকরণ যা আমার শহুরে চাষাবাদকে সহজ করেছে।",
        "Green Sprout": "গ্রিন স্প্রাউট"
    };

    function decodeEntities(str) {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    // Sort keys by length
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
    const sortedDict = {};
    for (const k of sortedKeys) {
        sortedDict[k] = dict[k];
    }

    const toggle = document.querySelector('.ai-lang-toggle');
    if (!toggle) return;

    let savedLang = localStorage.getItem('ai-site-lang') || 'en';

    function translateDOM(toLang) {
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let n;
        while (n = walk.nextNode()) {
            if (n.parentNode && n.parentNode.nodeName !== 'SCRIPT' && n.parentNode.nodeName !== 'STYLE') {
                if (n.originalText === undefined) {
                    n.originalText = n.textContent;
                }
                if (toLang === 'bn') {
                    const orig = decodeEntities(n.originalText.trim().replace(/\\s+/g, ' '));
                    if (sortedDict[orig]) {
                        n.textContent = sortedDict[orig];
                    } else {
                        let translated = orig;
                        for (const [en, bn] of Object.entries(sortedDict)) {
                            const decodedEn = decodeEntities(en);
                            if (decodedEn.length > 3 && translated.includes(decodedEn)) {
                                translated = translated.replace(new RegExp(decodedEn, 'g'), bn);
                            }
                        }
                        if (translated !== orig) {
                            n.textContent = translated;
                        }
                    }
                } else {
                    n.textContent = n.originalText;
                }
            }
        }
    }

    function setToggleUI(lang) {
        if (lang === 'bn') {
            document.querySelector('#btn-en').style.backgroundColor = 'transparent';
            document.querySelector('#btn-en').style.color = '#fff';
            document.querySelector('#btn-bn').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-bn').style.color = '#293920';
            document.body.classList.add('lang-bn');
            translateDOM('bn');
        } else {
            document.querySelector('#btn-bn').style.backgroundColor = 'transparent';
            document.querySelector('#btn-bn').style.color = '#fff';
            document.querySelector('#btn-en').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-en').style.color = '#293920';
            document.body.classList.remove('lang-bn');
            translateDOM('en');
        }
    }

    setToggleUI(savedLang);

    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentLang = localStorage.getItem('ai-site-lang') || 'en';
        const targetLang = currentLang === 'en' ? 'bn' : 'en';
        
        localStorage.setItem('ai-site-lang', targetLang);
        setToggleUI(targetLang);
    });
});
</script>
<!-- END TOGGLE -->
</body>`;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove ANY previous translator or manual translator injections
        const oldRegex1 = /<!-- AI TRANSLATOR ENGINE & PREMIUM UI TOGGLE -->.*?<!-- END TOGGLE -->/gs;
        const oldRegex2 = /<!-- AI MANUAL TRANSLATOR & PREMIUM UI TOGGLE -->.*?<!-- END TOGGLE -->/gs;
        content = content.replace(oldRegex1, '').replace(oldRegex2, '');
        
        // Inject before </body>
        content = content.replace(/<\/body>/i, translationInjection);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Injected high-quality manual translator into: ' + filePath);
        count++;
    });
});

console.log('Translation complete. Injected into ' + count + ' files.');
