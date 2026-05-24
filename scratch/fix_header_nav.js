/**
 * HEADER NAV FIX v2 - Fixes:
 * 1. Crops submenu clipping/overflow on right side
 * 2. Add chevron indicator to "Our Crops" showing it's expandable
 * 3. Better positioning of submenu within viewport
 * 4. Premium quality across all screen sizes
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'e:\\greenspout';

function getBasePath(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (rel.match(/^our-crops\/[^/]+\/index\.html$/)) return '../../';
  if (rel.match(/^[^/]+\/index\.html$/)) return '../';
  return './';
}

function getNavFixCode(basePath) {
  const crops = [
    { name: 'Rice', icon: '🌾', slug: 'rice' },
    { name: 'Bottle Gourd', icon: '🫛', slug: 'bottle-gourd' },
    { name: 'Sweet Pumpkin', icon: '🎃', slug: 'sweet-pumpkin' },
    { name: 'Cucumber', icon: '🥒', slug: 'cucumber' },
    { name: 'Radish', icon: '🥕', slug: 'radish' },
    { name: 'Pointed Gourd', icon: '🌿', slug: 'pointed-gourd' },
    { name: 'Okra', icon: '🌱', slug: 'okra' },
    { name: 'Bitter Gourd', icon: '🥬', slug: 'bitter-gourd' },
    { name: 'Eggplant', icon: '🍆', slug: 'eggplant' },
    { name: 'Potato', icon: '🥔', slug: 'potato' },
    { name: 'Paddy Seeds', icon: '🌱', slug: 'paddy-seeds' },
    { name: 'Sweet Potato', icon: '🍠', slug: 'sweet-potato-seeds' }
  ];

  const cropLinks = crops.map(c =>
    `<a href="${basePath}our-crops/${c.slug}/" class="ksfl-crop-link"><span class="ksfl-crop-icon">${c.icon}</span><span class="ksfl-crop-name">${c.name}</span></a>`
  ).join('\n            ');

  return `
<style id="ksfl-header-nav-fix">
/* ===== FORCE NAV LINKS VISIBLE ON DESKTOP ===== */
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
  border: none !important;
  inset: unset !important;
  min-height: unset !important;
}
.kirki-s220-dph9mfsm {
  display: flex !important;
  visibility: visible !important;
  overflow: visible !important;
}
/* Products dropdown: visible on hover */
.kirki-s220-dpi8cdrc {
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}
li[data-kirki="dpkzemwd"]:hover .kirki-s220-dpi8cdrc,
li[data-kirki="dpkzemwd"].submenu-open .kirki-s220-dpi8cdrc {
  height: auto;
  overflow: visible;
  opacity: 1;
}
/* Hamburger hidden on desktop */
.kirki-s220-dpjglwhg { display: none !important; }

/* ===== MOBILE NAV ===== */
@media (max-width: 991px) {
  .kirki-s220-dpjglwhg {
    display: block !important;
    cursor: pointer;
    z-index: 999;
    position: relative;
  }
  .kirki-s220-dp425u34 {
    display: none !important;
    position: fixed !important;
    top: 72px !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: calc(100vh - 72px) !important;
    background: rgba(41,57,32,0.98) !important;
    backdrop-filter: blur(20px) !important;
    flex-direction: column !important;
    padding: 24px 0 !important;
    overflow-y: auto !important;
    z-index: 9998 !important;
    border-top: 1px solid rgba(253,226,81,0.2) !important;
    inset: 72px 0 0 0 !important;
  }
  .kirki-s220-dp425u34.ksfl-mobile-open {
    display: flex !important;
  }
  .kirki-s220-dplwwalk {
    width: 100% !important;
    padding: 14px 32px !important;
    border-bottom: 1px solid rgba(255,255,255,0.06) !important;
  }
  .kirki-s220-dpich0g0 {
    font-size: 20px !important;
    color: rgba(255,255,255,0.9) !important;
    letter-spacing: -0.5px !important;
  }
  .kirki-s220-dpi8cdrc {
    position: static !important;
    width: 100% !important;
  }
  li[data-kirki="dpkzemwd"]:hover .kirki-s220-dpi8cdrc {
    height: 0px;
    overflow: hidden;
    opacity: 0;
  }
  li[data-kirki="dpkzemwd"].submenu-open .kirki-s220-dpi8cdrc {
    height: auto;
    overflow: visible;
    opacity: 1;
  }
  /* Hide kirki triangle SVG on mobile */
  .kirki-s220-dp5akxy5 { display: none !important; }
  /* Products submenu container */
  .kirki-s220-dp3xu5yf {
    background: rgba(0,0,0,0.15) !important;
    border-radius: 12px !important;
    margin: 8px 0 0 0 !important;
    padding: 16px !important;
    box-shadow: none !important;
  }
}
@media (max-width: 575px) {
  .kirki-s220-dp425u34 {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
    inset: 56px 0 0 0 !important;
  }
  .kirki-s220-dplwwalk {
    padding: 12px 20px !important;
  }
  .kirki-s220-dpich0g0 {
    font-size: 18px !important;
  }
}

/* ===== "OUR CROPS" EXPANDABLE INDICATOR ===== */
.ksfl-crops-trigger {
  position: relative !important;
}
.ksfl-crops-trigger > a {
  display: flex !important;
  align-items: center;
  gap: 6px;
}
.ksfl-expand-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(253,226,81,0.15);
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-left: 4px;
}
.ksfl-expand-chevron svg {
  width: 10px;
  height: 10px;
  transition: transform 0.3s ease;
  fill: none;
  stroke: #FDE251;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ksfl-crops-trigger:hover .ksfl-expand-chevron,
.ksfl-crops-trigger.ksfl-expanded .ksfl-expand-chevron {
  background: rgba(253,226,81,0.3);
  transform: scale(1.1);
}
.ksfl-crops-trigger:hover .ksfl-expand-chevron svg,
.ksfl-crops-trigger.ksfl-expanded .ksfl-expand-chevron svg {
  transform: rotate(180deg);
}

/* ===== 3-COLUMN CROPS SUBMENU ===== */
.ksfl-crops-submenu {
  display: none;
  background: linear-gradient(135deg, rgba(41, 57, 32, 0.98), rgba(35, 50, 27, 0.98));
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(253,226,81,0.15);
  box-shadow: 0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset;
  padding: 22px 26px 18px;
  margin-top: 10px;
  z-index: 99999;
  width: 560px;
  animation: ksflFadeIn 0.25s ease;
}
@keyframes ksflFadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
.ksfl-crops-submenu.ksfl-visible { display: block !important; }

/* Desktop: absolute + auto-position via JS */
@media (min-width: 992px) {
  .ksfl-crops-submenu {
    position: fixed;
  }
  .ksfl-crops-trigger:hover .ksfl-crops-submenu {
    display: block !important;
  }
}

.ksfl-crops-submenu-title {
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #FDE251;
  margin: 0 0 16px 2px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(253,226,81,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}
.ksfl-crops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px 8px;
}
.ksfl-crop-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  text-decoration: none !important;
  color: rgba(255,255,255,0.88) !important;
  font-family: 'Roboto', sans-serif;
  font-size: 13.5px;
  font-weight: 400;
  letter-spacing: -0.2px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ksfl-crop-link:hover {
  background: rgba(253,226,81,0.1);
  color: #FDE251 !important;
  transform: translateX(3px);
}
.ksfl-crop-icon {
  font-size: 15px;
  flex-shrink: 0;
  line-height: 1;
}
.ksfl-crop-name {
  overflow: hidden;
  text-overflow: ellipsis;
}
.ksfl-crops-bottom {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(253,226,81,0.08);
  flex-wrap: wrap;
}
.ksfl-crops-bottom a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 50px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  text-decoration: none !important;
  color: #293920 !important;
  background: #FDE251;
  transition: all 0.3s ease;
  white-space: nowrap;
}
.ksfl-crops-bottom a:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.18);
}

/* ===== MOBILE CROPS SUBMENU ===== */
@media (max-width: 991px) {
  .ksfl-crops-submenu {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 14px !important;
    margin: 10px 0 4px !important;
    padding: 16px 18px 14px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
    backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(253,226,81,0.1) !important;
  }
  .ksfl-crops-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 2px 6px !important;
  }
  .ksfl-crop-link {
    font-size: 13px !important;
    padding: 8px 10px !important;
  }
  .ksfl-crops-bottom {
    gap: 6px !important;
  }
  .ksfl-crops-bottom a {
    font-size: 11px !important;
    padding: 6px 12px !important;
  }
}
@media (max-width: 575px) {
  .ksfl-crops-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 2px 4px !important;
  }
  .ksfl-crop-link {
    font-size: 12px !important;
    padding: 7px 8px !important;
    gap: 6px !important;
  }
  .ksfl-crop-icon { font-size: 13px !important; }
  .ksfl-crops-bottom { flex-direction: column !important; }
  .ksfl-crops-bottom a { justify-content: center; }
}
</style>

<script id="ksfl-header-nav-fix-js">
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('.kirki-s220-dp425u34');
  if (!nav) return;

  // Remove close state so CSS can take over
  nav.removeAttribute('kirki-navigation-type');

  // === Hamburger toggle ===
  var hamburger = document.querySelector('.kirki-s220-dpjglwhg');
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('ksfl-mobile-open');
      document.body.style.overflow = nav.classList.contains('ksfl-mobile-open') ? 'hidden' : '';
    });
  }

  // === Products dropdown ===
  var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
  if (productsLi) {
    var productsLink = productsLi.querySelector('[data-kirki="dpx02odk"]');
    var chevron = productsLi.querySelector('[data-kirki="dp6tu2j0"]');

    // Toggle for mobile
    function toggleProducts(e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        productsLi.classList.toggle('submenu-open');
      }
    }
    if (productsLink) productsLink.addEventListener('click', toggleProducts);
    if (chevron) {
      chevron.style.cursor = 'pointer';
      chevron.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        productsLi.classList.toggle('submenu-open');
      });
    }

    // === Inject 3-column crops submenu ===
    var ourCropsLink = productsLi.querySelector('a[href*="our-crops"]');
    if (ourCropsLink) {
      var parent = ourCropsLink.parentElement;
      parent.classList.add('ksfl-crops-trigger');

      // Add expand chevron indicator to "Our Crops" link
      var chevronIndicator = document.createElement('span');
      chevronIndicator.className = 'ksfl-expand-chevron';
      chevronIndicator.innerHTML = '<svg viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg>';
      ourCropsLink.appendChild(chevronIndicator);

      // Create submenu
      var submenu = document.createElement('div');
      submenu.className = 'ksfl-crops-submenu';
      submenu.innerHTML = \`
        <div class="ksfl-crops-submenu-title">🌱 Our Grown Crops</div>
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

      // Desktop: position submenu within viewport on hover
      parent.addEventListener('mouseenter', function() {
        if (window.innerWidth > 991) {
          var rect = parent.getBoundingClientRect();
          submenu.style.top = (rect.bottom + 4) + 'px';
          // Try to center under the link, but clamp within viewport
          var left = rect.left;
          var menuW = 560;
          if (left + menuW > window.innerWidth - 16) {
            left = window.innerWidth - menuW - 16;
          }
          if (left < 16) left = 16;
          submenu.style.left = left + 'px';
        }
      });

      // Mobile: toggle on click
      ourCropsLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          submenu.classList.toggle('ksfl-visible');
          parent.classList.toggle('ksfl-expanded');
        }
      });
    }
  }

  // === Close mobile nav on outside click ===
  document.addEventListener('click', function(e) {
    if (nav && nav.classList.contains('ksfl-mobile-open')) {
      if (!nav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
        nav.classList.remove('ksfl-mobile-open');
        document.body.style.overflow = '';
      }
    }
  });

  // Close mobile nav on link click
  nav.querySelectorAll('a[href]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 991 && link.getAttribute('href') && link.getAttribute('href') !== '#') {
        setTimeout(function() {
          nav.classList.remove('ksfl-mobile-open');
          document.body.style.overflow = '';
        }, 100);
      }
    });
  });
});
</script>
`;
}

const NAV_MARKER_CSS = '<style id="ksfl-header-nav-fix">';
const NAV_MARKER_JS = '<script id="ksfl-header-nav-fix-js">';

function getAllPages() {
  const pages = [];
  ['index.html', 'our-crops.html', 'about.html', 'blogs.html', 'contact.html', 'seeds.html', 'products.html'].forEach(f => {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) pages.push(p);
  });
  const cropsDir = path.join(ROOT, 'our-crops');
  if (fs.existsSync(cropsDir)) {
    fs.readdirSync(cropsDir).forEach(folder => {
      const idx = path.join(cropsDir, folder, 'index.html');
      if (fs.existsSync(idx)) pages.push(idx);
    });
  }
  fs.readdirSync(ROOT).forEach(item => {
    const idx = path.join(ROOT, item, 'index.html');
    if (!['our-crops','site','scratch','node_modules','assets','.git'].includes(item) && fs.existsSync(idx)) {
      pages.push(idx);
    }
  });
  return [...new Set(pages)];
}

const pages = getAllPages();
console.log(`Found ${pages.length} pages`);

let ok = 0;
pages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');

  // Strip old injections completely
  content = content.replace(/<style id="ksfl-header-nav-fix">[\s\S]*?<\/style>/g, '');
  content = content.replace(/<script id="ksfl-header-nav-fix-js">[\s\S]*?<\/script>/g, '');

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

console.log(`\n✅ Done. ${ok} pages updated with v2 nav fix.`);
