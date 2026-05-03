const fs = require('fs');
const files = ['e:/greenspout/index.html', 'e:/greenspout/about.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Add translation to the dictionary
    const regex = /};(\s+)function decodeEntities\(str\) {/g;
    const newDictEntry = `,\n        "Address: 1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh | Call to know more: +8801715249371 (9 am-10 pm)": "ঠিকানা: ১২৪০/৭ কাজীপাড়া মিরপুর, ১০, ঢাকা, বাংলাদেশ | আরও জানতে কল করুন: +৮৮০ ১৭১৫ ২৪৯৩৭১ (সকাল ৯টা - রাত ১০টা)"\n    };$1function decodeEntities(str) {`;
    
    if (!content.includes('1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh"')) {
        content = content.replace(regex, newDictEntry);
        console.log(`Added translation to ${file}`);
    } else {
        console.log(`Translation already added to ${file}`);
    }

    fs.writeFileSync(file, content, 'utf8');
});
