const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];
const textStrings = new Set();

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Match anything between tags that is not script or style or meta
        // A simple regex to extract potential text strings
        const regex = />\s*([^<>&]+?)\s*</g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            const text = match[1].trim();
            // Filter out empty text, numbers, long strings, css, etc.
            if (text.length > 2 && !/^[0-9\-\.\s]+$/.test(text) && !text.includes('{') && !text.includes('}')) {
                textStrings.add(text);
            }
        }
    });
});

console.log(JSON.stringify(Array.from(textStrings), null, 2));
