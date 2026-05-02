const fs = require('fs');
const path = require('path');

const dir = 'e:/greenspout/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let originalLength = content.length;
    
    // Replace "Green Sprout" (case insensitive)
    content = content.replace(/Green Sprout/ig, 'KSFL Agro Ltd.');
    
    // Replace "Greensprout" (Capital G), but NOT if followed by .kirki.io
    // \b is a word boundary
    content = content.replace(/\bGreensprout\b(?!\.kirki\.io)/g, 'KSFL Agro Ltd.');
    
    if (content.length !== originalLength || content !== fs.readFileSync(filePath, 'utf8')) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
console.log('Branding update complete.');
