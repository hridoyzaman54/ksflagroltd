const fs = require('fs');

// Read the original file as a buffer to handle encoding properly
const buf = fs.readFileSync('e:/greenspout/index.html');

// Try decoding as UTF-8
let html = buf.toString('utf8');

// Fix common mojibake patterns (UTF-8 bytes interpreted as Latin-1)
const fixes = [
  [/\u00e2\u0080\u0099/g, '\u2019'],  // right single quote '
  [/\u00e2\u0080\u009c/g, '\u201c'],  // left double quote "
  [/\u00e2\u0080\u009d/g, '\u201d'],  // right double quote "
  [/\u00e2\u0080\u0093/g, '\u2013'],  // en dash –
  [/\u00e2\u0080\u0094/g, '\u2014'],  // em dash —
  [/\u00e2\u0080\u00a6/g, '\u2026'],  // ellipsis …
  [/\u00c2\u00a0/g, ' '],             // non-breaking space
  [/\u00c2\u00ab/g, '\u00ab'],        // «
  [/\u00c2\u00bb/g, '\u00bb'],        // »
  [/\u00c3\u00a9/g, '\u00e9'],        // é
  [/\u00c3\u00a8/g, '\u00e8'],        // è
  [/\u00c3\u00b1/g, '\u00f1'],        // ñ
  [/\u00c2(?=\s)/g, ''],              // stray Â before whitespace
  [/\u00c2(?=[A-Z])/g, ''],           // stray Â before uppercase
];

// Also try direct text replacements for common garbled patterns
const textFixes = [
  ['â€™', '\u2019'],
  ['â€œ', '\u201c'],
  ['â€\u009d', '\u201d'],
  ['â€"', '\u2013'],
  ['â€"', '\u2014'],
  ['â€¦', '\u2026'],
  ['Â ', ' '],
  ['Â\u00a0', ' '],
];

for (const [pattern, replacement] of fixes) {
  html = html.replace(pattern, replacement);
}

for (const [search, replacement] of textFixes) {
  while (html.includes(search)) {
    html = html.split(search).join(replacement);
  }
}

// Fix asset paths
html = html.replace(/\.\.\/\.\.\/greensprout\.kirki\.io\//g, './greensprout.kirki.io/');

// Add Google Fonts link after <meta charset>
const fontLink = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">';
html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n\t' + fontLink);

// Write the fixed file
fs.writeFileSync('e:/greenspout/site/index.html', html, 'utf8');
console.log('Done! Fixed encoding, paths, and added Google Fonts.');
console.log('File size:', (html.length / 1024).toFixed(1), 'KB');
