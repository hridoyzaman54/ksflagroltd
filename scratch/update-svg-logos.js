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
        
        // 1. Replace Small Logo (Header)
        content = content.replace(/(<svg[^>]+viewBox="0 0 209 32"[^>]*>).*?<\/svg>/gs, 
            '$1<text x="0" y="24" fill="currentColor" font-family="Roboto, sans-serif" font-weight="bold" font-size="22">KSFL Agro Ltd.</text></svg>'
        );
        
        // 2. Replace Large Logo (Footer)
        content = content.replace(/(<svg[^>]+viewBox="0 0 1324 203"[^>]*>).*?<\/svg>/gs, 
            '$1<text x="0" y="160" fill="currentColor" font-family="Roboto, sans-serif" font-weight="bold" font-size="180">KSFL Agro Ltd.</text></svg>'
        );
        
        if (content.length !== originalLength || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated logos in: ${filePath}`);
            count++;
        }
    });
});

console.log(`Logo update complete. Modified ${count} files.`);
