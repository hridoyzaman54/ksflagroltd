/**
 * NUCLEAR FOOTER FIX for about.html
 * 
 * Problem: Two style blocks define the same kirki classes:
 *   1. Lines 67-135: "ksfl-footer-fix" - has correct colors (gold, white, dark green bg)  
 *   2. Line 190: kirki inline styles - overrides with wrong colors (dark green text on dark bg)
 * Since #2 comes AFTER #1 in the document, #2 wins = broken footer.
 * 
 * Solution: REMOVE the ksfl-footer-fix from <head> and RE-INJECT it at the very END
 * of <body> so it comes AFTER the kirki styles and wins the cascade.
 */
const fs = require('fs');

let about = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// 1. Extract the ksfl-footer-fix style block
const fixStart = about.indexOf('<style id="ksfl-footer-fix">');
const fixEnd = about.indexOf('</style>', fixStart) + '</style>'.length;
const fixBlock = about.substring(fixStart, fixEnd);
console.log('Extracted ksfl-footer-fix style block:', fixBlock.length, 'chars');

// 2. Remove it from its current position in <head>
about = about.substring(0, fixStart) + about.substring(fixEnd);
console.log('Removed from <head>');

// 3. Also remove any old force-footer scripts
about = about.replace(/<script id="ksfl-force-footer">[\s\S]*?<\/script>/g, '');
about = about.replace(/<style id="ksfl-footer-bg">[\s\S]*?<\/style>/g, '');

// 4. Inject the style block right BEFORE </body> so it loads LAST and overrides everything
const bodyEnd = about.lastIndexOf('</body>');
about = about.substring(0, bodyEnd) + '\n' + fixBlock + '\n' + about.substring(bodyEnd);
console.log('Re-injected at end of <body> (after all kirki styles)');

fs.writeFileSync('e:\\greenspout\\about.html', about, 'utf8');
console.log('✅ about.html saved - footer fix now loads LAST, overriding kirki');
