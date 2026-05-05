const fs = require('fs');

const files = [
  'e:/greenspout/products.html',
  'e:/greenspout/seeds.html',
  'e:/greenspout/extracted_products_subpage.html'
];

const updates = [
  {
    oldName: 'Lina Carter',
    newName: 'Nahid Begum',
    newImg: './assets/FEMALE%20FARMER.png',
    oldBn: 'লিনা কার্টার',
    newBn: 'নাহিদ বেগম'
  },
  {
    oldName: 'Marcus Lee',
    newName: 'Tuhin',
    newImg: './assets/535583a8-ed30-45f0-8bcf-3d11cb4fd117.jpg',
    oldBn: 'মার্কাস লি',
    newBn: 'তুহিন'
  },
  {
    oldName: 'Noah Kim',
    newName: 'Kamal Hossain',
    newImg: './assets/FARMER.png',
    oldBn: 'নোহ কিম',
    newBn: 'কামাল হোসেন'
  }
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // We need to match the blocks to ensure we replace the correct image for the correct name
  // The structure is roughly: <div class="kirki-slide-item ...">...<img ...>...<p ...>Name</p>...</div>
  
  // Actually, I can use a simpler approach: replace the names first, 
  // and then replace the images by searching for the slide item that contains the NEW name.
  
  updates.forEach(u => {
    // Replace HTML name
    html = html.replace(new RegExp(u.oldName, 'g'), u.newName);
    // Replace JSON name
    html = html.replace(`"${u.oldName}": "${u.oldBn}"`, `"${u.newName}": "${u.newBn}"`);
  });

  // Now replace images based on proximity to the new names in the HTML
  // We'll search for each name and find the preceding <img> tag within a reasonable distance
  updates.forEach(u => {
    const nameIdx = html.indexOf(u.newName);
    if (nameIdx !== -1) {
        // Find the <img tag before this name index
        const imgStart = html.lastIndexOf('<img', nameIdx);
        if (imgStart !== -1 && nameIdx - imgStart < 2000) { // Safety check for proximity
            const imgEnd = html.indexOf('>', imgStart) + 1;
            const imgTag = html.substring(imgStart, imgEnd);
            const newTag = imgTag.replace(/src="[^"]*"/, `src="${u.newImg}"`)
                                 .replace(/srcset="[^"]*"/, '')
                                 .replace(/style="[^"]*"/, 'style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"');
            html = html.substring(0, imgStart) + newTag + html.substring(imgEnd);
        }
    }
  });

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
});
