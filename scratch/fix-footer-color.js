const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];

let count = 0;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let originalLength = content.length;
        
        // 1. Fix footer color to exact yellow hex (#FDE251) and header logo color just in case
        content = content.replace(/<text x="0" y="160" fill="currentColor"/g, '<text x="0" y="160" fill="#FDE251"');
        content = content.replace(/<text x="0" y="24" fill="currentColor"/g, '<text x="0" y="24" fill="#FDE251"');
        
        // 2. Fix copyright symbol (using regex to catch any weird encodings before it)
        // Let's replace any variant of Â©KSFL or ©KSFL or AcKSFL
        // We will just match anything before "KSFL Agro Ltd. 2025. All rights reserved." up to the paragraph tag
        content = content.replace(/(?:Â©|©|Ac|A©)?KSFL Agro Ltd\. 2025\. All rights reserved\./g, '©KSFL Agro Ltd. 2026. All rights reserved.');
        
        if (content.length !== originalLength || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer and copyright in: ${filePath}`);
            count++;
        }
    });
});

console.log(`Update complete. Modified ${count} files.`);
