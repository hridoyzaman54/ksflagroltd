const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const targetStr = 'the-journey-of-farm-to-table-dairy-freshness-to-your-home';
const targetIdx = content.indexOf(targetStr);

if (targetIdx !== -1) {
  console.log('Found target string at index:', targetIdx);
  // Scan backwards for '<div' and forwards for '</div>' or '</script>' to find the bounds
  // Let's find the nearest <div class="kirki-slide-item before targetIdx
  const subBefore = content.substring(0, targetIdx);
  const slideClassIdx = subBefore.lastIndexOf('kirki-slide-item');
  console.log('Class kirki-slide-item index backwards:', slideClassIdx);
  if (slideClassIdx !== -1) {
    const divStart = subBefore.lastIndexOf('<div', slideClassIdx);
    console.log('Found <div start index:', divStart);
  } else {
    // Let's search for the first '<div class="kirki-slider-item' or '<div' that contains a custom slide-item class backwards
    const lastDiv = subBefore.lastIndexOf('<div class="kirki-slide-item');
    console.log('Last <div class="kirki-slide-item index:', lastDiv);
  }
}
