const fs = require('fs');
const content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

const titles = [
  'Eco-Friendly Habits: Small Changes for a Greener Life',
  'KSFL Agro Ltd.’s Guide to ZeroWaste Farming',
  'The Journey of Farm-to-Table Dairy: Freshness to Your Home',
  'Starting Your First Organic Garden: A Beginner’s Guide',
  'Top 5 Lessons Learned from Our Organic Farming Workshops'
];

titles.forEach(title => {
  const idx = content.indexOf(title);
  if (idx !== -1) {
    console.log(`\n=== Title: ${title} ===`);
    // Find the nearest `<div class="kirki-slide-item` or similar before the title
    let before = content.substring(idx - 1500, idx + 500);
    // Find the enclosing div structure
    console.log(before.substring(before.indexOf('<div'), before.indexOf(title) + title.length + 500));
  }
});
