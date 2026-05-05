const fs = require('fs');
const files = ['blogs.html', 'contact.html', 'extracted_products_subpage.html', 'preview.html', 'products.html', 'seeds.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add HTML contact info in footer
    const originalFooterP = '<p class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y kirki-s219-dpo2pb78" data-kirki="dptgnajs">©KSFL Agro Ltd. 2026. All rights reserved.';
    const newContactHTML = `<p class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y kirki-s219-dpo2pb78" style="margin-bottom: 15px; color: #FDE251; text-align: center;">Address: 1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh | Call to know more: +8801715249371 (9 am-10 pm)</p>\n` + originalFooterP;
    
    if (content.includes(originalFooterP) && !content.includes('1240/7 Kazipara Mirpur')) {
        content = content.replace(originalFooterP, newContactHTML);
        console.log(`Added contact info to footer in ${file}`);
    }

    // 2. Add translation to the dictionary
    const regex = /};(\s+)function decodeEntities\(str\) {/g;
    const newDictEntry = `,\n        "Address: 1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh | Call to know more: +8801715249371 (9 am-10 pm)": "ঠিকানা: ১২৪০/৭ কাজীপাড়া মিরপুর, ১০, ঢাকা, বাংলাদেশ | আরও জানতে কল করুন: +৮৮০ ১৭১৫ ২৪৯৩৭১ (সকাল ৯টা - রাত ১০টা)"\n    };$1function decodeEntities(str) {`;
    
    if (!content.includes('1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh"')) {
        content = content.replace(regex, newDictEntry);
        console.log(`Added translation to ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});
