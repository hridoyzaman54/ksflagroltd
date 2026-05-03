const fs = require('fs');

const files = ["about.html", "blogs.html", "extracted_products_subpage.html", "index.html", "preview.html", "products.html", "seeds.html", "site/index.html"];

files.forEach(f => {
    const path = "e:/greenspout/" + f;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/199 Oakway Lane, Woodland Hills, CA 91303/g, "1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh");
    content = content.replace(/১৯৯ ওকওয়ে লেন, উডল্যান্ড হিলস, সিএ ৯১৩০৩/g, "১২৪০/৭ কাজীপাড়া মিরপুর, ১০, ঢাকা, বাংলাদেশ");
    content = content.replace(/\(347\) 438-7215/g, "+8801715249371");
    content = content.replace(/\(৩৪৭\) ৪৩৮-৭২১৫/g, "+৮৮০১৭১৫২৪৯৩৭১");
    fs.writeFileSync(path, content, 'utf8');
});
console.log('All files successfully updated with Node!');
