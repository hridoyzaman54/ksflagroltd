/**
 * COMPLETE HEADER NAV FIX + 3-COLUMN CROPS SUBMENU
 * 
 * Replaces the kirki-dependent nav with a standalone implementation
 * that works without the kirki JS framework.
 * Also adds 3-column crops submenu under "Our Crops" in the Products dropdown.
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'e:\\greenspout';

// Detect base path from file location
function getBasePath(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (rel.match(/^our-crops\/[^/]+\/index\.html$/)) return '../../';
  if (rel.match(/^[^/]+\/index\.html$/)) return '../';
  return './';
}

// The nav fix CSS + JS to inject
function getNavFixCode(basePath) {
  const crops = [
    { name: 'Rice', bn: 'ধান', icon: '🌾', slug: 'rice' },
    { name: 'Bottle Gourd', bn: 'লাউ', icon: '🫛', slug: 'bottle-gourd' },
    { name: 'Sweet Pumpkin', bn: 'মিষ্টি কুমড়া', icon: '🎃', slug: 'sweet-pumpkin' },
    { name: 'Cucumber', bn: 'শসা', icon: '🥒', slug: 'cucumber' },
    { name: 'Radish', bn: 'মূলা', icon: '🥕', slug: 'radish' },
    { name: 'Pointed Gourd', bn: 'পটল', icon: '🌿', slug: 'pointed-gourd' },
    { name: 'Okra', bn: 'ঢেঁড়স', icon: '🌱', slug: 'okra' },
    { name: 'Bitter Gourd', bn: 'করলা', icon: '🥬', slug: 'bitter-gourd' },
    { name: 'Eggplant', bn: 'বেগুন', icon: '🍆', slug: 'eggplant' },
    { name: 'Potato', bn: 'গোল আলু', icon: '🥔', slug: 'potato' },
    { name: 'Paddy Seeds', bn: 'ধানের বীজ', icon: '🌱', slug: 'paddy-seeds' },
    { name: 'Sweet Potato', bn: 'মিষ্টি আলু', icon: '🍠', slug: 'sweet-potato-seeds' }
  ];

  const cropLinks = crops.map(c => 
    `<a href="${basePath}our-crops/${c.slug}/" class="ksfl-crop-link"><span class="ksfl-crop-icon">${c.icon}</span><span class="ksfl-crop-text"><span class="en-text">${c.name}</span></span></a>`
  ).join('\n            ');

  return `
<style id="ksfl-header-nav-fix">
/* ===== FORCE NAV VISIBLE ===== */
.kirki-s220-dp425u34 {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  transform: none !important;
  position: static !important;
  width: auto !important;
  height: auto !important;
  max-height: none !important;
  background: transparent !important;
  flex-direction: row !important;
  column-gap: 16px !important;
  align-items: center !important;
  overflow: visible !important;
}
.kirki-s220-dph9mfsm {
  display: flex !important;
  visibility: visible !important;
}
/* Products dropdown: visible on hover */
.kirki-s220-dpi8cdrc {
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease;
}
li[data-kirki="dpkzemwd"]:hover .kirki-s220-dpi8cdrc,
li[data-kirki="dpkzemwd"].submenu-open .kirki-s220-dpi8cdrc {
  height: auto;
  overflow: visible;
}
/* Hamburger hidden on desktop */
.kirki-s220-dpjglwhg { display: none !important; }
/* ===== MOBILE NAV OVERRIDES ===== */
@media (max-width: 991px) {
  .kirki-s220-dpjglwhg { display: block !important; cursor: pointer; z-index: 999; }
  .kirki-s220-dp425u34 {
    display: none !important;
    position: fixed !important;
    top: 72px !important;
    left: 0 !important;
    width: 100% !important;
    height: calc(100vh - 72px) !important;
    background: rgba(41,57,32,0.98) !important;
    flex-direction: column !important;
    padding: 20px 0 !important;
    overflow-y: auto !important;
    z-index: 9998 !important;
  }
  .kirki-s220-dp425u34.ksfl-mobile-open {
    display: flex !important;
  }
  .kirki-s220-dplwwalk {
    width: 100% !important;
    padding: 12px 32px !important;
  }
  .kirki-s220-dpich0g0 {
    font-size: 20px !important;
    color: rgba(255,255,255,0.9) !important;
  }
  .kirki-s220-dpi8cdrc {
    position: static !important;
    width: 100% !important;
  }
  li[data-kirki="dpkzemwd"]:hover .kirki-s220-dpi8cdrc {
    height: 0px;
    overflow: hidden;
  }
  li[data-kirki="dpkzemwd"].submenu-open .kirki-s220-dpi8cdrc {
    height: auto;
    overflow: visible;
  }
}
@media (max-width: 575px) {
  .kirki-s220-dp425u34 { top: 56px !important; height: calc(100vh - 56px) !important; }
}

/* ===== 3-COLUMN CROPS SUBMENU ===== */
.ksfl-crops-submenu {
  display: none;
  background: rgba(41, 57, 32, 0.97);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(253,226,81,0.12);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  padding: 20px 24px;
  margin-top: 8px;
  position: absolute;
  left: 0;
  top: 100%;
  width: 520px;
  max-width: 90vw;
  z-index: 99999;
}
.ksfl-crops-submenu.ksfl-visible { display: block; }
.ksfl-crops-submenu-title {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #FDE251;
  margin: 0 0 14px 4px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(253,226,81,0.12);
}
.ksfl-crops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
.ksfl-crop-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  text-decoration: none !important;
  color: rgba(255,255,255,0.85) !important;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  transition: all 0.2s ease;
}
.ksfl-crop-link:hover {
  background: rgba(253,226,81,0.12);
  color: #FDE251 !important;
  transform: translateX(3px);
}
.ksfl-crop-icon { font-size: 16px; flex-shrink: 0; }
.ksfl-crop-text { line-height: 1.2; }
.ksfl-crops-bottom {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(253,226,81,0.1);
  flex-wrap: wrap;
}
.ksfl-crops-bottom a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 50px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none !important;
  color: #293920 !important;
  background: #FDE251;
  transition: all 0.3s ease;
}
.ksfl-crops-bottom a:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Desktop: show crops submenu when hovering "Our Crops" link */
@media (min-width: 992px) {
  .ksfl-crops-trigger { position: relative; }
  .ksfl-crops-trigger:hover .ksfl-crops-submenu { display: block; }
}
/* Mobile: inline submenu */
@media (max-width: 991px) {
  .ksfl-crops-submenu {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 12px !important;
    margin: 8px 0 !important;
    padding: 12px !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  .ksfl-crops-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .ksfl-crop-link { font-size: 12px !important; padding: 6px 8px !important; }
}
@media (max-width: 575px) {
  .ksfl-crops-grid { grid-template-columns: 1fr !important; }
}
</style>

<script id="ksfl-header-nav-fix-js">
document.addEventListener('DOMContentLoaded', function() {
  // 1. Fix nav visibility
  var nav = document.querySelector('.kirki-s220-dp425u34');
  if (!nav) return;
  
  // Remove close state
  nav.removeAttribute('kirki-navigation-type');
  
  // 2. Fix hamburger toggle for mobile
  var hamburger = document.querySelector('.kirki-s220-dpjglwhg');
  if (hamburger) {
    hamburger.style.display = '';
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('ksfl-mobile-open');
    });
  }
  
  // 3. Fix Products submenu toggle
  var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
  if (productsLi) {
    var productsLink = productsLi.querySelector('[data-kirki="dpx02odk"]');
    var chevron = productsLi.querySelector('[data-kirki="dp6tu2j0"]');
    
    // Desktop hover handled by CSS
    // Mobile: click toggle
    if (productsLink) {
      productsLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          productsLi.classList.toggle('submenu-open');
        }
      });
    }
    if (chevron) {
      chevron.style.cursor = 'pointer';
      chevron.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        productsLi.classList.toggle('submenu-open');
      });
    }
    
    // 4. Inject 3-column crops submenu into the "Our Crops" link within the products dropdown
    var ourCropsLink = productsLi.querySelector('a[href*="our-crops"]');
    if (ourCropsLink) {
      var parent = ourCropsLink.parentElement;
      parent.classList.add('ksfl-crops-trigger');
      parent.style.position = 'relative';
      
      var submenu = document.createElement('div');
      submenu.className = 'ksfl-crops-submenu';
      submenu.innerHTML = \`
        <p class="ksfl-crops-submenu-title">🌱 Our Grown Crops</p>
        <div class="ksfl-crops-grid">
          ${cropLinks}
        </div>
        <div class="ksfl-crops-bottom">
          <a href="${basePath}our-crops.html">🌾 View All Crops</a>
          <a href="${basePath}seeds.html">🌱 Seeds & Farm Goods</a>
          <a href="${basePath}products.html">🧪 Micronutrients</a>
        </div>
      \`;
      parent.appendChild(submenu);
      
      // Mobile: toggle on click of "Our Crops" text
      ourCropsLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          submenu.classList.toggle('ksfl-visible');
        }
      });
    }
  }

  // 5. Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('ksfl-mobile-open')) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('ksfl-mobile-open');
      }
    }
  });
});
</script>
`;
}

const NAV_MARKER = 'ksfl-header-nav-fix';

// All pages that need the fix
function getAllPages() {
  const pages = [];
  
  // Root pages
  ['index.html', 'our-crops.html', 'about.html', 'blogs.html', 'contact.html', 'seeds.html', 'products.html'].forEach(f => {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) pages.push(p);
  });
  
  // Crop detail pages
  const cropsDir = path.join(ROOT, 'our-crops');
  if (fs.existsSync(cropsDir)) {
    fs.readdirSync(cropsDir).forEach(folder => {
      const idx = path.join(cropsDir, folder, 'index.html');
      if (fs.existsSync(idx)) pages.push(idx);
    });
  }
  
  // Blog pages
  fs.readdirSync(ROOT).forEach(item => {
    const idx = path.join(ROOT, item, 'index.html');
    if (item !== 'our-crops' && item !== 'site' && item !== 'scratch' && item !== 'node_modules' && fs.existsSync(idx)) {
      pages.push(idx);
    }
  });
  
  return pages;
}

const pages = getAllPages();
console.log(`Found ${pages.length} pages to fix`);

let ok = 0, skip = 0;
pages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  
  // Remove old marker if exists (to re-inject updated version)
  if (content.includes(NAV_MARKER)) {
    // Remove old injected CSS block
    content = content.replace(/<style id="ksfl-header-nav-fix">[\s\S]*?<\/style>/g, '');
    content = content.replace(/<script id="ksfl-header-nav-fix-js">[\s\S]*?<\/script>/g, '');
  }
  
  const bp = getBasePath(p);
  const code = getNavFixCode(bp);
  
  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd === -1) {
    console.log(`  ERROR: no </body> in ${path.relative(ROOT, p)}`);
    return;
  }
  
  content = content.substring(0, bodyEnd) + code + content.substring(bodyEnd);
  fs.writeFileSync(p, content, 'utf8');
  console.log(`  OK: ${path.relative(ROOT, p)}`);
  ok++;
});

console.log(`\n✅ Done. ${ok} pages updated.`);
