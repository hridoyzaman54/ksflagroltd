/**
 * FINAL NUCLEAR FIX: Copy the EXACT footer from index.html into about.html.
 * No more CSS tricks - just replace the entire footer HTML.
 */
const fs = require('fs');

// 1. Read both files
const homepage = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');
const aboutPage = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// 2. Extract the ENTIRE footer from homepage
// The footer starts with the kirki style blocks right before the <section id="footer">
// and ends at the closing </section> just before the kirki JS scripts
// Let's get everything from the font link + footer styles + footer section

// Find the footer section in homepage
const hpFooterStart = homepage.indexOf('<section class="kirki-s219-dpbrehze"');
const hpFooterSectionEnd = homepage.indexOf('</section>', hpFooterStart);
const hpFooterEnd = hpFooterSectionEnd + '</section>'.length;

if (hpFooterStart === -1 || hpFooterSectionEnd === -1) {
  console.log('ERROR: Could not find footer in homepage');
  console.log('hpFooterStart:', hpFooterStart, 'hpFooterSectionEnd:', hpFooterSectionEnd);
  process.exit(1);
}

// But we also need the STYLE BLOCKS that precede the footer section
// These are: <link> for fonts + <style data='kirki-element-styles-md'> + tablet + mobileLandscape + mobile + scroll animation
// Find the font link that precedes the footer
const fontLinkBefore = homepage.lastIndexOf('<link class="kirki-custom-fonts-link"', hpFooterStart);
const stylesAndFooter = homepage.substring(fontLinkBefore !== -1 ? fontLinkBefore : hpFooterStart, hpFooterEnd);

console.log('Extracted homepage footer block:', stylesAndFooter.length, 'chars');
console.log('Starts with:', stylesAndFooter.substring(0, 80));
console.log('Ends with:', stylesAndFooter.substring(stylesAndFooter.length - 40));

// 3. Find and replace the same block in about.html
// In about.html, find the font link before footer section
const abFooterSection = aboutPage.indexOf('<section class="kirki-s219-dpbrehze"');
const abFontLink = aboutPage.lastIndexOf('<link class="kirki-custom-fonts-link"', abFooterSection);
const abFooterSectionEnd = aboutPage.indexOf('</section>', abFooterSection);
const abFooterEnd = abFooterSectionEnd + '</section>'.length;

if (abFooterSection === -1 || abFooterSectionEnd === -1) {
  console.log('ERROR: Could not find footer in about.html');
  process.exit(1);
}

const abStart = abFontLink !== -1 ? abFontLink : abFooterSection;
console.log('\nAbout page footer region: chars', abStart, 'to', abFooterEnd);
console.log('About footer starts with:', aboutPage.substring(abStart, abStart + 80));

// 4. Replace about's footer with homepage's footer
let newAbout = aboutPage.substring(0, abStart) + stylesAndFooter + aboutPage.substring(abFooterEnd);

// 5. Also remove the old ksfl-footer-fix block that we moved to end of body
newAbout = newAbout.replace(/<style id="ksfl-footer-fix">[\s\S]*?<\/style>/g, '');
newAbout = newAbout.replace(/<script id="ksfl-force-footer">[\s\S]*?<\/script>/g, '');
newAbout = newAbout.replace(/<style id="ksfl-footer-bg">[\s\S]*?<\/style>/g, '');

// 6. Save
fs.writeFileSync('e:\\greenspout\\about.html', newAbout, 'utf8');
console.log('\n✅ about.html footer COMPLETELY REPLACED with exact homepage footer HTML + styles');
