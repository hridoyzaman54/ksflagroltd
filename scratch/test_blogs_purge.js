const fs = require('fs');
let content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

// Regex matching the slide block containing dairy blog post
const regex = /<div[^>]*class="[^"]*slider-item[^"]*"[^>]*>.*?href="[^"]*the-journey-of-farm-to-table-dairy-freshness-to-your-home[^"]*".*?<\/script>/gs;

if (regex.test(content)) {
  console.log('Match found!');
  content = content.replace(regex, '');
  console.log('Successfully replaced!');
  fs.writeFileSync('e:\\greenspout\\scratch\\blogs_test_purged.html', content, 'utf8');
} else {
  console.log('No match found. Let\'s try a broader regex.');
  // Broader search: search for the text itself and find its parent div
  const idx = content.indexOf('The Journey of Farm-to-Table Dairy: Freshness to Your Home');
  if (idx !== -1) {
    console.log('Found h2 index:', idx);
  }
}
