const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const h2Idx = content.indexOf('The Journey of Farm-to-Table Dairy: Freshness to Your Home');
if (h2Idx !== -1) {
  console.log(content.substring(h2Idx - 2000, h2Idx));
}
