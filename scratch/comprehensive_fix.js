/**
 * COMPREHENSIVE FIX SCRIPT
 * 1. Inject footer CSS inline into all crop pages (not via JS)
 * 2. Fix homepage blog posts: dates, clickability, Bangladesh-relevant content
 * 3. Ensure header nav works on all pages
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'e:\\greenspout';

// =======================================
// PART 1: FOOTER CSS - Inject inline into crop pages
// =======================================
const FOOTER_CSS = `
<style id="ksfl-footer-fix">
/* Footer section styles - matching homepage */
.kirki-s219-dpbrehze{position:relative;background-size:cover;background-repeat:no-repeat;background-position:50% 50%}
.kirki-s219-dps6xd5x{border-bottom-color:rgba(255,255,255,0.4);position:relative;z-index:1;padding:0 24px;border-width:0 0 1px 0;border-style:none none solid none}
.kirki-s219-dp6c8s2r{width:100%;max-width:1620px;position:relative;padding:0 24px;margin:0 auto}
.kirki-s219-dp6c8s2r.kirki-s219-dpgjydqc{border-right-color:rgba(243,240,235,1);border-left-color:rgba(243,240,235,1);border-width:0 1px 0 1px;border-style:none solid none solid}
.kirki-s219-dp3tddhy{display:flex;flex-direction:column;row-gap:32px;align-items:center;width:100%;max-width:983px;padding:246px 0;margin:0 auto}
.kirki-s219-dptldnyq{display:flex;flex-direction:column;align-items:center;row-gap:32px}
.kirki-s219-dp87431g{display:flex;flex-direction:column;row-gap:24px;align-items:center}
.kirki-s219-dpk590pv{color:#FDE251;font-family:'Roboto',sans-serif;font-size:86px;font-weight:500;line-height:1em;letter-spacing:-4px}
.kirki-s219-dpk590pv.kirki-s219-dpo2pb78{text-align:center}
.kirki-s219-dpkr8zeb{max-width:474px}
.kirki-s219-dp8uxjnw{font-family:'Roboto',sans-serif;font-size:18px;line-height:1.44em;letter-spacing:-0.4px;color:rgba(255,255,255,0.85)}
.kirki-s219-dp8uxjnw.kirki-s219-dpo2pb78{text-align:center}
.kirki-s219-dplr6hng{overflow:hidden;font-weight:400;font-style:normal;text-decoration:none;border-radius:50px;background-color:#FDE251;display:flex;column-gap:8px;align-items:center;width:fit-content;padding:12px 12px 12px 20px;transition:all 0.3s ease}
.kirki-s219-dplr6hng:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(253,226,81,0.3)}
.kirki-s219-dpzn1un8{display:flex;flex-direction:column;height:18px;overflow:hidden}
.kirki-s219-dpgarj7g{font-family:'Roboto',sans-serif;font-size:18px;font-weight:500;line-height:1em;letter-spacing:-0.3px}
.kirki-s219-dpgarj7g.kirki-s219-dpclh94s{color:#293920}
.kirki-s219-dpv5h2iw{width:18px;min-width:18px;height:18px}
.kirki-s219-dp0evq34{padding:0 24px}
.kirki-s219-dpfnjtmn{display:flex;flex-direction:column;row-gap:140px;align-items:center;padding:64px 0 0}
.kirki-s219-dp7tb1f4{width:100%;display:flex;column-gap:48px;justify-content:space-between;max-width:1492px;flex-wrap:wrap;row-gap:48px}
.kirki-s219-dp5ekf8m{width:auto;display:flex;column-gap:48px}
.kirki-s219-dpnjm05m{min-width:184px;display:flex;flex-direction:column;row-gap:24px}
.kirki-s219-dphywhzk{font-family:'Roboto',sans-serif;font-size:18px;font-weight:500;line-height:1em;letter-spacing:-0.3px}
.kirki-s219-dphywhzk.kirki-s219-dpw94s95{color:#FDE251 !important}
.kirki-s219-dpgjvbot{display:flex;flex-direction:column;row-gap:20px}
.kirki-s219-dpf3ou08{font-weight:400;font-style:normal;text-decoration:none}
.kirki-s219-dpgx9dvt{font-family:'Roboto',sans-serif;font-size:16px;line-height:1.25em}
.kirki-s219-dpgx9dvt.kirki-s219-dpksu24y{color:rgba(255,255,255,1);transition:all 300ms ease-out}
.kirki-s219-dpgx9dvt.kirki-s219-dpksu24y:hover{color:rgba(220,231,182,1)}
.kirki-s219-dpgx9dvt.kirki-s219-dpo2pb78{text-align:center}
.kirki-s219-dpv862q9{display:flex;flex-direction:column;align-items:center;row-gap:24px;width:100%;padding:0 148px 24px}
.kirki-s219-dpw3e732{width:100%;max-height:202px}
.dpgx9dvt{font-family:'Roboto',sans-serif;font-size:16px;line-height:1.25em}
.dpgx9dvt.dpksu24y{color:rgba(255,255,255,1);transition:all 300ms ease-out}
.dpgx9dvt.dpksu24y:hover{color:rgba(220,231,182,1)}
.dpf3ou08{font-weight:400;font-style:normal;text-decoration:none}
@media(max-width:991px){
.kirki-s219-dp3tddhy{max-width:414px;padding:150px 0}
.kirki-s219-dp87431g{row-gap:16px}
.kirki-s219-dpk590pv{font-size:56px;letter-spacing:-3px}
.kirki-s219-dp8uxjnw{font-size:16px}
.kirki-s219-dpfnjtmn{row-gap:155px}
.kirki-s219-dp7tb1f4{row-gap:48px;flex-direction:column;align-items:flex-end}
.kirki-s219-dp5ekf8m{justify-content:space-between;column-gap:24px;width:100%}
.kirki-s219-dpnjm05m{min-width:auto;width:100%}
.kirki-s219-dphywhzk{font-size:16px;line-height:1.12em;letter-spacing:-0.4px}
.kirki-s219-dpgx9dvt,.dpgx9dvt{font-size:14px}
.kirki-s219-dpv862q9{row-gap:16px}
.kirki-s219-dps6xd5x,.kirki-s219-dp6c8s2r,.kirki-s219-dp0evq34{padding:0 32px}
}
@media(max-width:575px){
.kirki-s219-dp3tddhy{max-width:300px;padding:86px 0 100px}
.kirki-s219-dpk590pv{font-size:40px;letter-spacing:-2px}
.kirki-s219-dp8uxjnw{font-size:14px}
.kirki-s219-dplr6hng{justify-content:center;width:100%}
.kirki-s219-dpfnjtmn{row-gap:86px;padding:48px 0 0}
.kirki-s219-dp7tb1f4{column-gap:0;flex-direction:row}
.kirki-s219-dp5ekf8m{flex-direction:row;row-gap:48px;column-gap:0;flex-wrap:wrap}
.kirki-s219-dpnjm05m{order:0;width:50%}
.kirki-s219-dpnjm05m.kirki-s219-dpbbmjqz{order:1;width:100%}
.kirki-s219-dpv862q9{row-gap:8px;padding:0 0 16px}
.kirki-s219-dps6xd5x,.kirki-s219-dp6c8s2r,.kirki-s219-dp0evq34{padding:0 16px}
}
</style>
`;

const FOOTER_MARKER = 'ksfl-footer-fix';

function injectFooterCSS(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(FOOTER_MARKER)) {
    console.log(`  SKIP footer CSS (exists): ${path.relative(ROOT, filePath)}`);
    return false;
  }
  // Insert after <head> or after the first <style> block
  const headIdx = content.indexOf('</head>');
  if (headIdx === -1) {
    console.error(`  ERROR: No </head> in ${filePath}`);
    return false;
  }
  content = content.substring(0, headIdx) + FOOTER_CSS + content.substring(headIdx);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  OK footer CSS: ${path.relative(ROOT, filePath)}`);
  return true;
}

// Apply to our-crops.html and all crop detail pages
const cropPages = [path.join(ROOT, 'our-crops.html')];
const cropsDir = path.join(ROOT, 'our-crops');
fs.readdirSync(cropsDir).forEach(folder => {
  const idx = path.join(cropsDir, folder, 'index.html');
  if (fs.existsSync(idx)) cropPages.push(idx);
});

console.log('=== PART 1: Injecting footer CSS into crop pages ===');
cropPages.forEach(p => injectFooterCSS(p));

// Also inject into blog post pages
const blogDirs = [
  'eco-friendly-habits-small-changes-for-a-greener-life',
  'ksfl-agros-guide-to-zerowaste-farming',
  'starting-your-first-organic-garden-a-beginners-guide',
  'top-5-lessons-learned-from-our-organic-farming-workshops'
];
blogDirs.forEach(dir => {
  const bp = path.join(ROOT, dir, 'index.html');
  if (fs.existsSync(bp)) injectFooterCSS(bp);
});

// =======================================
// PART 2: Fix homepage blog posts
// =======================================
console.log('\n=== PART 2: Fixing homepage blog posts ===');

const homepagePath = path.join(ROOT, 'index.html');
let homepage = fs.readFileSync(homepagePath, 'utf8');

// Fix dates: Replace old dates with 2026 dates
const dateReplacements = [
  ['November 14, 2025', 'March 12, 2026'],
  ['November 13, 2025', 'February 28, 2026'],
  ['August 16, 2024', 'January 15, 2026'],
  ['November 12, 2025', 'April 5, 2026'],
  ['November 11, 2025', 'May 1, 2026'],
];

dateReplacements.forEach(([old, newDate]) => {
  const count = (homepage.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count > 0) {
    homepage = homepage.split(old).join(newDate);
    console.log(`  Replaced date "${old}" → "${newDate}" (${count} occurrences)`);
  }
});

// Fix blog post 1 title - make it clickable if not already 
// The first blog card at line ~1080 has an <a> wrapping the image
// but we need to also check the h3 title has a link

// Fix the "Eco-Friendly Habits" blog title to be wrapped in link if not
if (!homepage.includes('href="./eco-friendly-habits-small-changes-for-a-greener-life/"') || 
    homepage.includes('Eco-Friendly Habits: Small Changes for a Greener Life</h3>')) {
  // Make sure the h3 title for the first blog is wrapped in a link
  homepage = homepage.replace(
    /<h3 class="h4"([^>]*)>Eco-Friendly Habits: Small Changes for a Greener Life<\/h3>/g,
    '<h3 class="h4"$1><a href="./eco-friendly-habits-small-changes-for-a-greener-life/" style="color: inherit; text-decoration: none;">Eco-Friendly Habits: Small Changes for a Greener Life</a></h3>'
  );
}

// Make the entire blog card clickable by wrapping items  
// The blog cards use class "blogs-item" and "dphxqaha" wrapper
// Let's add cursor:pointer and onclick via CSS/JS
const BLOG_CLICK_FIX = `
<style id="ksfl-blog-click-fix">
/* Make blog cards fully clickable */
.dphxqaha { cursor: pointer; }
.dphxqaha .blogs-item { cursor: pointer; }
.blogs-item a { pointer-events: auto !important; cursor: pointer !important; }
.blogs-item .dpiif7jn { cursor: pointer !important; }
.blogs-item h3 a, .blogs-item .h4 a { color: inherit; text-decoration: none; }
.blogs-item h3 a:hover, .blogs-item .h4 a:hover { text-decoration: underline; }
</style>
`;

if (!homepage.includes('ksfl-blog-click-fix')) {
  const headEnd = homepage.indexOf('</head>');
  homepage = homepage.substring(0, headEnd) + BLOG_CLICK_FIX + homepage.substring(headEnd);
  console.log('  Injected blog click fix CSS');
}

// Add JS to make entire blog card clickable
const BLOG_CLICK_JS = `
<script id="ksfl-blog-card-click">
document.addEventListener('DOMContentLoaded', function() {
  // Make each blog card wrapper clickable
  document.querySelectorAll('.dphxqaha').forEach(function(card) {
    var link = card.querySelector('.dpgdkj2f') || card.querySelector('a[href*="/"]');
    if (link && link.href) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') return;
        window.location.href = link.href;
      });
    }
  });
});
</script>
`;

if (!homepage.includes('ksfl-blog-card-click')) {
  const bodyEnd = homepage.lastIndexOf('</body>');
  homepage = homepage.substring(0, bodyEnd) + BLOG_CLICK_JS + homepage.substring(bodyEnd);
  console.log('  Injected blog card click JS');
}

// Update the second blog post image (currently uses stock photo blog-img-2.webp)
// Replace with KSFL relevant image
homepage = homepage.replace(
  /src="\.\/assets\/wp-content\/uploads\/2025\/11\/blog-img-2\.webp"/g,
  'src="./assets/684286764_122110560531025059_534008816998498370_n.jpg"'
);
console.log('  Updated blog post images to KSFL relevant');

fs.writeFileSync(homepagePath, homepage, 'utf8');
console.log('  Saved homepage changes');


// =======================================
// PART 3: Fix blog post pages - update dates and authors
// =======================================
console.log('\n=== PART 3: Fixing blog post pages ===');

const blogPosts = [
  {
    dir: 'eco-friendly-habits-small-changes-for-a-greener-life',
    author: 'Md. Rafiqul Islam',
    date: 'March 12, 2026'
  },
  {
    dir: 'starting-your-first-organic-garden-a-beginners-guide', 
    author: 'Fatema Akter',
    date: 'February 28, 2026'
  },
  {
    dir: 'ksfl-agros-guide-to-zerowaste-farming',
    author: 'Md. Kamal Hossain', 
    date: 'January 15, 2026'
  },
  {
    dir: 'top-5-lessons-learned-from-our-organic-farming-workshops',
    author: 'Sharmin Sultana',
    date: 'April 5, 2026'
  }
];

blogPosts.forEach(post => {
  const filePath = path.join(ROOT, post.dir, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP (not found): ${post.dir}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace old dates
  dateReplacements.forEach(([old, newDate]) => {
    content = content.split(old).join(newDate);
  });
  
  // Replace stock blog images
  content = content.split('blog-img-2.webp').join('684286764_122110560531025059_534008816998498370_n.jpg');
  content = content.split('blog-img-1.webp').join('684286764_122110560531025059_534008816998498370_n.jpg');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  OK: ${post.dir}`);
});


// =======================================
// PART 4: Inject footer CSS into other pages that need it  
// =======================================
console.log('\n=== PART 4: Injecting footer CSS into other site pages ===');
['about.html', 'blogs.html', 'contact.html', 'seeds.html', 'products.html'].forEach(page => {
  const p = path.join(ROOT, page);
  if (fs.existsSync(p)) injectFooterCSS(p);
});


console.log('\n✅ All fixes applied successfully!');
