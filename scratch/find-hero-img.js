const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');
const start = html.indexOf('<div class="kirki-s219-dp0g5jil"'); // Or something near the hero
const sectionEnd = html.indexOf('</section>', html.indexOf('id="hero"')); 
if(sectionEnd !== -1) {
   console.log(html.substring(html.indexOf('<section class="dp0g5jil" data-kirki="kirki-s-69f4c58641a27" id="hero"'), sectionEnd));
} else {
   // Let's just find the first section in about.html which is the hero
   const firstSectionStart = html.indexOf('<section');
   const firstSectionEnd = html.indexOf('</section>', firstSectionStart);
   console.log("FIRST SECTION:", html.substring(firstSectionStart, firstSectionEnd+10));
}
