const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const h2Idx = content.indexOf('The Journey of Farm-to-Table Dairy: Freshness to Your Home');
if (h2Idx !== -1) {
  const sub = content.substring(0, h2Idx);
  const slideIdx = sub.lastIndexOf('kirki-slide-item');
  if (slideIdx !== -1) {
    const startOfDiv = sub.lastIndexOf('<div', slideIdx);
    console.log('Start of slide div:');
    console.log(content.substring(startOfDiv, h2Idx));
  }
}
