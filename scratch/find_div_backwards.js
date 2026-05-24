const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const h2Idx = content.indexOf('The Journey of Farm-to-Table Dairy: Freshness to Your Home');
if (h2Idx !== -1) {
  let pos = h2Idx;
  // Let's print the 2000 characters before h2Idx to inspect
  console.log(content.substring(h2Idx - 2000, h2Idx));
}
