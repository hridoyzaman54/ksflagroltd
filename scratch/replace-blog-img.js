const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules') walk(p, callback);
    } else if (f.endsWith('.html')) {
      callback(p);
    }
  });
};

const newImg = 'assets/684286764_122110560531025059_534008816998498370_n.jpg';
const targetBlogImg = 'blog-img-7.webp';

walk('e:/greenspout', (file) => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Replace <img> tags with blog-img-7.webp
  const imgRegex = new RegExp('<img[^>]*src="[^"]*' + targetBlogImg.replace('.', '\\.') + '"[^>]*>', 'gi');
  if (html.match(imgRegex)) {
    html = html.replace(imgRegex, (match) => {
      changed = true;
      const kirki = match.match(/data-kirki="[^"]*"/)?.[0] || '';
      const classes = match.match(/class="[^"]*"/)?.[0] || '';
      const alt = match.match(/alt="[^"]*"/)?.[0] || 'alt="Eco-Friendly Habits"';
      
      // Determine relative path
      const depth = (file.match(/\\|\//g) || []).length;
      const relPath = depth > 0 ? '../'.repeat(depth - 0) + newImg : './' + newImg;
      // Wait, let's just use absolute-ish path for the assets
      let finalRelPath = './' + newImg;
      if (file.includes('eco-friendly-habits')) finalRelPath = '../' + newImg;
      if (file.includes('site\\index.html') || file.includes('site/index.html')) finalRelPath = '../' + newImg;

      return `<img ${classes} ${kirki} ${alt} src="${finalRelPath}" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" />`;
    });
  }

  // 2. Special case for the blog post's own hero image
  if (file.includes('eco-friendly-habits') && file.includes('index.html')) {
    const heroRegex = /url\('\.\.\/assets\/wp-content\/uploads\/2025\/11\/about-img-1-1024x772\.webp'\)/g;
    if (html.match(heroRegex)) {
      html = html.replace(heroRegex, `url('../${newImg}')`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
  }
});
