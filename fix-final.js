const fs = require('fs');

// Read as binary to preserve all bytes
const buf = fs.readFileSync('e:/greenspout/index.html');
// Decode as latin1 (preserves raw bytes 1:1)
let html = buf.toString('latin1');

// Now re-encode: sequences of bytes that form UTF-8 multibyte chars
// were stored as latin1 single bytes. We need to find and fix them.

// Common UTF-8 sequences that appear as latin1:
// U+2019 (right single quote) = UTF-8: E2 80 99 = latin1: â€™
// U+2013 (en dash) = UTF-8: E2 80 93 = latin1: â€"  
// U+2014 (em dash) = UTF-8: E2 80 94 = latin1: â€"
// U+201C (left double quote) = UTF-8: E2 80 9C = latin1: â€œ
// U+201D (right double quote) = UTF-8: E2 80 9D = latin1: â€
// U+00A0 (non-breaking space) = UTF-8: C2 A0 = latin1: Â followed by nbsp
// U+2026 (ellipsis) = UTF-8: E2 80 A6 = latin1: â€¦

// Replace mojibake patterns with correct Unicode chars
const replacements = [
  ['\xE2\x80\x99', '\u2019'],  // right single quote '
  ['\xE2\x80\x98', '\u2018'],  // left single quote '
  ['\xE2\x80\x9C', '\u201C'],  // left double quote "
  ['\xE2\x80\x9D', '\u201D'],  // right double quote "
  ['\xE2\x80\x93', '\u2013'],  // en dash –
  ['\xE2\x80\x94', '\u2014'],  // em dash —
  ['\xE2\x80\xA6', '\u2026'],  // ellipsis …
  ['\xC2\xA0', '\u00A0'],      // non-breaking space (keep as proper nbsp)
];

for (const [search, replace] of replacements) {
  while (html.includes(search)) {
    html = html.split(search).join(replace);
  }
}

// Also fix stray Â (0xC2) that appears before regular spaces or letters
// This happens when a 2-byte UTF-8 sequence C2 XX gets partially decoded
html = html.replace(/\xC2(?=\s)/g, '');
html = html.replace(/\xC2(?=[A-Z])/g, '');
html = html.replace(/\xC2(?=[a-z])/g, '');
html = html.replace(/\xC2(?=[0-9])/g, '');

// Fix asset paths
html = html.replace(/\.\.\/\.\.\/greensprout\.kirki\.io\//g, './greensprout.kirki.io/');

// Add Google Fonts
const fontTag = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">';
html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n\t' + fontTag);

// Write as UTF-8
fs.writeFileSync('e:/greenspout/preview.html', html, { encoding: 'utf8' });

// Verification
const check = fs.readFileSync('e:/greenspout/preview.html', 'utf8');
const problems = [];
if (check.includes('\u00E2\u0080')) problems.push('Found raw E2 80 sequences');
if (check.includes('\u00C2 ')) problems.push('Found stray C2 before space');
if (/\u00C2[A-Z]/.test(check)) problems.push('Found stray C2 before letter');

if (problems.length === 0) {
  console.log('All encoding issues fixed successfully!');
} else {
  problems.forEach(p => console.log('WARNING:', p));
}
console.log('File written to preview.html');
