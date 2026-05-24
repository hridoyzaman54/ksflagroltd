const fs = require('fs');

let content = fs.readFileSync('e:\\greenspout\\blogs.html', 'utf8');

// 1. Remove the "Herbal Wellness" tab from blogs.html
const herbalTab = '<div class="kirki-tab blog" data-kirki="dp1g3qzk"><span  data-kirki="dp046pyz">Herbal Wellness</span></div>';
if (content.includes(herbalTab)) {
  content = content.replace(herbalTab, '');
  console.log('Successfully removed Herbal Wellness category tab!');
} else {
  console.log('Herbal Wellness tab not found. Trying flexible replacement.');
  content = content.replace(/<div[^>]*class="[^"]*kirki-tab[^"]*"[^>]*>\s*<span[^>]*>Herbal Wellness<\/span>\s*<\/div>/g, '');
}

// 2. Remove "The Journey of Farm-to-Table Dairy" card
const dairyTitle = 'The Journey of Farm-to-Table Dairy: Freshness to Your Home';
const dairyTitleIdx = content.indexOf(dairyTitle);

if (dairyTitleIdx !== -1) {
  // Find nearest </script> after dairyTitle
  const endIdx = content.indexOf('</script>', dairyTitleIdx) + '</script>'.length;
  // Find nearest </script> before dairyTitle
  const startIdx = content.lastIndexOf('</script>', dairyTitleIdx) + '</script>'.length;
  
  if (startIdx !== -1 && endIdx !== -1) {
    const toRemove = content.substring(startIdx, endIdx);
    content = content.substring(0, startIdx) + content.substring(endIdx);
    console.log('Successfully purged Dairy blog card from blogs.html!');
  } else {
    console.log('Failed to find start or end index for dairy card.');
  }
} else {
  console.log('Dairy blog title not found in blogs.html.');
}

fs.writeFileSync('e:\\greenspout\\blogs.html', content, 'utf8');
console.log('blogs.html cleanup complete!');
