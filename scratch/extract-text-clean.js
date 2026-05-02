const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];
const textStrings = new Set();

// Regular expression to match any string between > and <
// We can use a simpler approach: extract everything between tags
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Remove style, script tags
        const cleaned = content.replace(/<(script|style)[^>]*>([\s\S]*?)<\/\1>/gi, '');
        
        // Match tag contents
        const regex = />([^<]+)</g;
        let match;
        while ((match = regex.exec(cleaned)) !== null) {
            const text = match[1].trim();
            if (text.length > 1 && !/^[0-9\-\.\s]+$/.test(text) && !text.includes('window.') && !text.startsWith('var ') && !text.includes('{')) {
                textStrings.add(text);
            }
        }
    });
});

fs.writeFileSync('e:/greenspout/scratch/extracted_strings.json', JSON.stringify(Array.from(textStrings), null, 2), 'utf8');
console.log('Extracted ' + textStrings.size + ' unique text strings.');
