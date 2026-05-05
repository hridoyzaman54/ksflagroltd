const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('à¦')) {
        console.log(`Fixing corruption in ${file}...`);
        // The file is currently UTF-8 but contains characters like à (0xC3 0xA0) 
        // which are the UTF-8 representation of the individual bytes of the original UTF-8 string.
        // So we need to:
        // 1. Encode the string to bytes using a 1-to-1 mapping (like latin1/binary)
        // 2. But wait, if it's already UTF-8, then 'à' is two bytes 0xC3 0xA0.
        // This is "Double UTF-8" encoding.
        
        // Correct way to fix Double UTF-8:
        // Convert the string to bytes as if it were Latin1 (each char -> 1 byte)
        // This will only work if the original UTF-8 bytes were interpreted as Latin1.
        
        let buffer = Buffer.from(content, 'binary'); // 'binary' in Node is alias for 'latin1'
        // However, 'binary' on a UTF-8 string will produce multiple bytes for non-ASCII.
        // We want a buffer where each character in the string is treated as a single byte value.
        
        let rawBytes = [];
        for (let i = 0; i < content.length; i++) {
            rawBytes.push(content.charCodeAt(i) & 0xFF);
        }
        let fixed = Buffer.from(rawBytes).toString('utf8');
        
        // Perform name fixes
        fixed = fixed.replace(/Nahid Begum/g, 'Nahida Begum');
        
        const translations = {
            "Nahida Begum": "নাহিদা বেগম",
            "Kamal Hossain": "কামাল হোসেন",
            "Tuhin": "তুহিন"
        };
        
        for (const [en, bn] of Object.entries(translations)) {
            const regex = new RegExp(`"${en}":\\s*"[^"]*"`, 'g');
            fixed = fixed.replace(regex, `"${en}": "${bn}"`);
        }
        
        fs.writeFileSync(file, fixed, 'utf8');
    } else {
        // Just perform name fixes
        let fixed = content;
        let changed = false;
        if (fixed.includes('Nahid Begum')) {
            fixed = fixed.replace(/Nahid Begum/g, 'Nahida Begum');
            changed = true;
        }
        
        const translations = {
            "Nahida Begum": "নাহিদা বেগম",
            "Kamal Hossain": "কামাল হোসেন",
            "Tuhin": "তুহিন"
        };
        
        for (const [en, bn] of Object.entries(translations)) {
            if (fixed.includes(`"${en}":`)) {
                const regex = new RegExp(`"${en}":\\s*"[^"]*"`, 'g');
                fixed = fixed.replace(regex, `"${en}": "${bn}"`);
                changed = true;
            }
        }
        
        if (changed) {
            console.log(`Updating names in ${file}...`);
            fs.writeFileSync(file, fixed, 'utf8');
        }
    }
});
