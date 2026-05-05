const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('à¦') || content.includes('à§')) {
        console.log(`Fixing corruption in ${file}...`);
        
        // Convert the string to bytes by taking the low byte of each char
        let bytes = [];
        for (let i = 0; i < content.length; i++) {
            bytes.push(content.charCodeAt(i) & 0xFF);
        }
        let fixed = Buffer.from(bytes).toString('utf8');
        
        // Also perform the name fixes
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
    }
});
