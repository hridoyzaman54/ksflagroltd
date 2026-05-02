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
        
        // 1. Replace GreenSprout (CamelCase brand) -> KSFL Agro Ltd.
        content = content.split('GreenSprout').join('KSFL Agro Ltd.');
        
        // 2. Replace Greensprout (TitleCase brand) -> KSFL Agro Ltd.
        content = content.split('Greensprout').join('KSFL Agro Ltd.');
        
        // 3. Replace greensprout (lowercase code/variables/classes/urls) -> ksfl-agro
        content = content.split('greensprout').join('ksfl-agro');
        
        if (content.length !== originalLength || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
            count++;
        }
    });
});

console.log(`Branding update complete. Modified ${count} files.`);
