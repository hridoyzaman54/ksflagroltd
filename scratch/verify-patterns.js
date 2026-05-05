const fs = require('fs');
const files = ['blogs.html', 'contact.html', 'extracted_products_subpage.html', 'preview.html', 'products.html', 'seeds.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const count = (content.match(/©KSFL Agro Ltd\. 2026\. All rights reserved\./g) || []).length;
        const count2 = (content.match(/function decodeEntities/g) || []).length;
        console.log(`${file}: Footer matches? ${count > 0}. Dict matches? ${count2 > 0}`);
    }
});
