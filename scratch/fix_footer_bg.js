const fs = require('fs');

let about = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// The issue: line 69 has a style block (id="ksfl-footer-fix") that defines 
// .kirki-s219-dpbrehze{position:relative;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}
// This OVERRIDES the kirki inline style that has the actual background-image.
// Fix: Add the background-image and background-color to this rule.

const oldRule = '.kirki-s219-dpbrehze{position:relative;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}';
const newRule = '.kirki-s219-dpbrehze{position:relative;background-image:url(./assets/wp-content/uploads/2025/11/footer-img.webp);background-size:cover;background-repeat:no-repeat;background-position:50% 50%;background-color:#293920}';

if (about.includes(oldRule)) {
  about = about.replace(oldRule, newRule);
  console.log('✅ Fixed footer bg in ksfl-footer-fix style block');
} else {
  console.log('Old rule not found, searching alternatives...');
}

// Also the heading color in the footer CTA "Let's grow healthier together" should be gold/white not dark
// Fix: .kirki-s219-dpk590pv color should be #FDE251 in footer context
// Check: the rule says color:var(--premade_template_dprt5n21) which is dark green (#293920) - that's wrong for dark bg
// In the kirki-element-styles block at line 192, it correctly sets color to dprt5n21 but for the FOOTER
// the heading should be FDE251 (gold). Let me check what homepage does...
// Actually the homepage kirki style has: .kirki-s219-dpk590pv{color:#FDE251} for the footer
// But about.html has: .kirki-s219-dpk590pv{color:var(--premade_template_dprt5n21)} 
// The var resolves to #293920 (dark green) = invisible on dark bg!

// Fix the heading color in the ksfl-footer-fix style
const oldHeadingRule = ".kirki-s219-dpk590pv{color:#FDE251;font-family:'Roboto',sans-serif;font-size:86px;font-weight:500;line-height:1em;letter-spacing:-4px}";
if (about.includes(oldHeadingRule)) {
  console.log('Heading color already gold');
} else {
  // Check what we have
  const headingMatch = about.match(/\.kirki-s219-dpk590pv\{[^}]*\}/);
  if (headingMatch) {
    console.log('Current heading rule:', headingMatch[0].substring(0, 80) + '...');
  }
}

// Remove duplicate ksfl-footer-bg if it exists
about = about.replace(/<style id="ksfl-footer-bg">[\s\S]*?<\/style>/g, '');
console.log('Removed duplicate footer-bg style');

fs.writeFileSync('e:\\greenspout\\about.html', about, 'utf8');
console.log('✅ about.html saved');
