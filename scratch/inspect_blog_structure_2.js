const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const h2Idx = content.indexOf('The Journey of Farm-to-Table Dairy: Freshness to Your Home');
if (h2Idx !== -1) {
  // Let's print the 500 characters before h2Idx to see the immediate wrapper
  const sub = content.substring(h2Idx - 1500, h2Idx + 500);
  console.log(sub);
}
