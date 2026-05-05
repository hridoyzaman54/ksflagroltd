const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const translations = {
    "Nahida Begum": "নাহিদা বেগম",
    "Kamal Hossain": "কামাল হোসেন",
    "Tuhin": "তুহিন"
};

walkDir('.', (filePath) => {
    if (!filePath.endsWith('.html')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix Nahid Begum to Nahida Begum in the text
    if (content.includes('Nahid Begum')) {
        content = content.replace(/Nahid Begum/g, 'Nahida Begum');
        changed = true;
    }
    
    // Update translations in the dict
    for (const [en, bn] of Object.entries(translations)) {
        // Look for the entry in the dictionary
        // Case 1: Entry exists (maybe with old translation or broken placeholders)
        const regex = new RegExp(`"${en}":\\s*"[^"]*"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `"${en}": "${bn}"`);
            changed = true;
        } else if (content.includes('const dict = {')) {
            // Case 2: Dictionary exists but entry is missing
            content = content.replace('const dict = {', `const dict = {\n        "${en}": "${bn}",`);
            changed = true;
        }
    }
    
    // Handle specific case for Nahid Begum -> নাহিদা বেগম if it exists as a key
    if (content.includes('"Nahid Begum":')) {
        content = content.replace(/"Nahid Begum":\s*"[^"]*"/g, `"Nahida Begum": "নাহিদা বেগম"`);
        changed = true;
    }

    if (changed) {
        console.log(`Updated: ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
