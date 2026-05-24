/**
 * DEFINITIVE HEADER MEGA-MENU FIX v3
 * 
 * REPLACES the entire kirki Products dropdown with a self-contained mega-menu.
 * No dependency on kirki JS rendering.
 * Works identically on ALL pages.
 * Includes 3-column crops submenu, proper colors, mobile support, Bangla translation.
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

function getMegaMenuCode(basePath) {
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
  min-height: unset !important;
  background: transparent !important;
  flex-direction: row !important;
  column-gap: 16px !important;
  align-items: center !important;
  overflow: visible !important;
  border: none !important;
  inset: unset !important;
  padding: 0 !important;
  margin: 0 !important;
}
.kirki-s220-dph9mfsm {
  display: flex !important;
  visibility: visible !important;
  overflow: visible !important;
}
/* HIDE original kirki dropdown completely - we replace it */
.kirki-s220-dpi8cdrc {
  display: none !important;
}
/* Hamburger hidden on desktop */
.kirki-s220-dpjglwhg { display: none !important; }

/* ===== MEGA MENU ===== */
.ksfl-mega-wrapper {
  position: relative;
}
.ksfl-mega-menu {
  display: none;
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 620px;
  background: rgba(41, 57, 32, 0.97);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(253,226,81,0.12);
  box-shadow: 0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  padding: 0;
  z-index: 99999;
  animation: ksflSlideIn 0.25s ease;
  overflow: hidden;
}
@keyframes ksflSlideIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
/* Triangle pointer */
.ksfl-mega-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 8px solid rgba(41, 57, 32, 0.97);
}
.ksfl-mega-wrapper:hover .ksfl-mega-menu,
.ksfl-mega-wrapper.ksfl-open .ksfl-mega-menu {
  display: block;
}

/* Top nav links (Our Crops, Seeds, Micronutrients) */
.ksfl-mega-nav {
  display: flex;
  border-bottom: 1px solid rgba(253,226,81,0.1);
}
.ksfl-mega-nav-item {
  flex: 1;
  padding: 16px 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: rgba(255,255,255,0.8);
  text-decoration: none !important;
  text-align: center;
  transition: all 0.2s ease;
  border-right: 1px solid rgba(253,226,81,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}
.ksfl-mega-nav-item:last-child { border-right: none; }
.ksfl-mega-nav-item:hover,
.ksfl-mega-nav-item.ksfl-active {
  background: rgba(253,226,81,0.08);
  color: #FDE251;
}
.ksfl-mega-nav-item .ksfl-chevron {
  display: inline-flex;
  width: 14px; height: 14px;
  align-items: center; justify-content: center;
  transition: transform 0.3s ease;
}
.ksfl-mega-nav-item.ksfl-active .ksfl-chevron {
  transform: rotate(180deg);
}

/* Crops grid panel */
.ksfl-crops-panel {
  display: none;
  padding: 20px 24px 16px;
}
.ksfl-crops-panel.ksfl-visible { display: block; }
.ksfl-crops-heading {
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(253,226,81,0.6);
  margin: 0 0 12px 4px;
}
.ksfl-crops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px 6px;
}
.ksfl-crop-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none !important;
  color: rgba(255,255,255,0.85) !important;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.2px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ksfl-crop-link:hover {
  background: rgba(253,226,81,0.1);
  color: #FDE251 !important;
  transform: translateX(2px);
}
.ksfl-crop-link .ksfl-ci { font-size: 14px; line-height: 1; flex-shrink: 0; }
.ksfl-crop-link .ksfl-cn-bn { display: none; }

/* Bangla mode */
body.bn-active .ksfl-crop-link .ksfl-cn-en { display: none; }
body.bn-active .ksfl-crop-link .ksfl-cn-bn { display: inline; }
body.bn-active .ksfl-mega-nav-item .en-text { display: none; }
body.bn-active .ksfl-mega-nav-item .bn-text { display: inline; }
.ksfl-mega-nav-item .bn-text { display: none; }

/* ===== MOBILE ===== */
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
    left: 0 !important; right: 0 !important;
    width: 100% !important;
    height: calc(100vh - 72px) !important;
    background: rgba(41,57,32,0.98) !important;
    backdrop-filter: blur(20px) !important;
    flex-direction: column !important;
    padding: 20px 0 !important;
    overflow-y: auto !important;
    z-index: 9998 !important;
    border-top: 1px solid rgba(253,226,81,0.15) !important;
    inset: 72px 0 0 0 !important;
  }
  .kirki-s220-dp425u34.ksfl-mobile-open {
    display: flex !important;
  }
  .kirki-s220-dplwwalk {
    width: 100% !important;
    padding: 14px 28px !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
  }
  .kirki-s220-dpich0g0 {
    font-size: 20px !important;
    color: rgba(255,255,255,0.9) !important;
    letter-spacing: -0.5px !important;
  }
  /* Mobile mega menu */
  .ksfl-mega-menu {
    position: static !important;
    transform: none !important;
    width: 100% !important;
    border-radius: 12px !important;
    margin: 8px 0 0 0 !important;
    box-shadow: none !important;
    border: 1px solid rgba(253,226,81,0.08) !important;
    animation: none !important;
  }
  .ksfl-mega-menu::before { display: none; }
  .ksfl-mega-wrapper:hover .ksfl-mega-menu { display: none; }
  .ksfl-mega-wrapper.ksfl-open .ksfl-mega-menu { display: block; }
  .ksfl-mega-nav { flex-direction: column; }
  .ksfl-mega-nav-item {
    border-right: none;
    border-bottom: 1px solid rgba(253,226,81,0.06);
    padding: 14px 20px;
    justify-content: flex-start;
    font-size: 16px;
  }
  .ksfl-crops-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 2px 4px !important;
  }
  .ksfl-crop-link { font-size: 12px !important; padding: 7px 8px !important; }
}
@media (max-width: 575px) {
  .kirki-s220-dp425u34 {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
    inset: 56px 0 0 0 !important;
  }
  .ksfl-crops-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
</style>

<script id="ksfl-header-nav-fix-js">
(function() {
  function initMegaMenu() {
    var nav = document.querySelector('.kirki-s220-dp425u34');
    if (!nav) return;
    nav.removeAttribute('kirki-navigation-type');

    // Hamburger
    var hamburger = document.querySelector('.kirki-s220-dpjglwhg');
    if (hamburger) {
      hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('ksfl-mobile-open');
        document.body.style.overflow = nav.classList.contains('ksfl-mobile-open') ? 'hidden' : '';
      });
    }

    // Find the "Our Products" li
    var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
    if (!productsLi) return;

    // Add mega wrapper class
    productsLi.classList.add('ksfl-mega-wrapper');

    // Create mega menu HTML
    var bp = '${basePath}';
    var megaMenu = document.createElement('div');
    megaMenu.className = 'ksfl-mega-menu';
    megaMenu.innerHTML =
      '<div class="ksfl-mega-nav">' +
        '<div class="ksfl-mega-nav-item ksfl-crops-toggle ksfl-active" data-panel="crops">' +
          '<span class="en-text">🌾 Our Crops</span><span class="bn-text">🌾 আমাদের ফসল</span>' +
          '<span class="ksfl-chevron"><svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="2,4 6,8 10,4"/></svg></span>' +
        '</div>' +
        '<a class="ksfl-mega-nav-item" href="' + bp + 'seeds.html"><span class="en-text">🌱 Seeds & Farm Goods</span><span class="bn-text">🌱 বীজ ও কৃষি পণ্য</span></a>' +
        '<a class="ksfl-mega-nav-item" href="' + bp + 'products.html"><span class="en-text">🧪 Micronutrients</span><span class="bn-text">🧪 মাইক্রোনিউট্রিয়েন্ট</span></a>' +
      '</div>' +
      '<div class="ksfl-crops-panel ksfl-visible">' +
        '<div class="ksfl-crops-heading">ALL CROPS</div>' +
        '<div class="ksfl-crops-grid">' +
          '<a href="' + bp + 'our-crops/rice/" class="ksfl-crop-link"><span class="ksfl-ci">🌾</span><span class="ksfl-cn-en">Rice</span><span class="ksfl-cn-bn">ধান</span></a>' +
          '<a href="' + bp + 'our-crops/bottle-gourd/" class="ksfl-crop-link"><span class="ksfl-ci">🫛</span><span class="ksfl-cn-en">Bottle Gourd</span><span class="ksfl-cn-bn">লাউ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-pumpkin/" class="ksfl-crop-link"><span class="ksfl-ci">🎃</span><span class="ksfl-cn-en">Sweet Pumpkin</span><span class="ksfl-cn-bn">মিষ্টি কুমড়া</span></a>' +
          '<a href="' + bp + 'our-crops/cucumber/" class="ksfl-crop-link"><span class="ksfl-ci">🥒</span><span class="ksfl-cn-en">Cucumber</span><span class="ksfl-cn-bn">শসা</span></a>' +
          '<a href="' + bp + 'our-crops/radish/" class="ksfl-crop-link"><span class="ksfl-ci">🥕</span><span class="ksfl-cn-en">Radish</span><span class="ksfl-cn-bn">মূলা</span></a>' +
          '<a href="' + bp + 'our-crops/pointed-gourd/" class="ksfl-crop-link"><span class="ksfl-ci">🌿</span><span class="ksfl-cn-en">Pointed Gourd</span><span class="ksfl-cn-bn">পটল</span></a>' +
          '<a href="' + bp + 'our-crops/okra/" class="ksfl-crop-link"><span class="ksfl-ci">🌱</span><span class="ksfl-cn-en">Okra</span><span class="ksfl-cn-bn">ঢেঁড়স</span></a>' +
          '<a href="' + bp + 'our-crops/bitter-gourd/" class="ksfl-crop-link"><span class="ksfl-ci">🥬</span><span class="ksfl-cn-en">Bitter Gourd</span><span class="ksfl-cn-bn">করলা</span></a>' +
          '<a href="' + bp + 'our-crops/eggplant/" class="ksfl-crop-link"><span class="ksfl-ci">🍆</span><span class="ksfl-cn-en">Eggplant</span><span class="ksfl-cn-bn">বেগুন</span></a>' +
          '<a href="' + bp + 'our-crops/potato/" class="ksfl-crop-link"><span class="ksfl-ci">🥔</span><span class="ksfl-cn-en">Potato</span><span class="ksfl-cn-bn">গোল আলু</span></a>' +
          '<a href="' + bp + 'our-crops/paddy-seeds/" class="ksfl-crop-link"><span class="ksfl-ci">🌱</span><span class="ksfl-cn-en">Paddy Seeds</span><span class="ksfl-cn-bn">ধানের বীজ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-potato-seeds/" class="ksfl-crop-link"><span class="ksfl-ci">🍠</span><span class="ksfl-cn-en">Sweet Potato</span><span class="ksfl-cn-bn">মিষ্টি আলু</span></a>' +
        '</div>' +
      '</div>';
    
    productsLi.appendChild(megaMenu);

    // Toggle crops panel
    var cropsToggle = megaMenu.querySelector('.ksfl-crops-toggle');
    var cropsPanel = megaMenu.querySelector('.ksfl-crops-panel');
    cropsToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      cropsToggle.classList.toggle('ksfl-active');
      cropsPanel.classList.toggle('ksfl-visible');
    });

    // Our Crops nav item click -> go to our-crops.html on desktop
    cropsToggle.addEventListener('dblclick', function() {
      window.location.href = bp + 'our-crops.html';
    });

    // Mobile: click "Our Products" text to toggle
    var productsLink = productsLi.querySelector('[data-kirki="dpx02odk"]');
    var chevronSvg = productsLi.querySelector('[data-kirki="dp6tu2j0"]');
    function toggleMobile(e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        productsLi.classList.toggle('ksfl-open');
      }
    }
    if (productsLink) productsLink.addEventListener('click', toggleMobile);
    if (chevronSvg) {
      chevronSvg.style.cursor = 'pointer';
      chevronSvg.addEventListener('click', toggleMobile);
    }

    // Viewport clamp for desktop
    productsLi.addEventListener('mouseenter', function() {
      if (window.innerWidth > 991) {
        var rect = productsLi.getBoundingClientRect();
        var menuW = 620;
        var center = rect.left + rect.width / 2;
        var left = center - menuW / 2;
        if (left + menuW > window.innerWidth - 16) left = window.innerWidth - menuW - 16;
        if (left < 16) left = 16;
        megaMenu.style.left = (left - rect.left) + 'px';
        megaMenu.style.transform = 'none';
      }
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('ksfl-mobile-open') && !nav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
        nav.classList.remove('ksfl-mobile-open');
        document.body.style.overflow = '';
      }
    });

    // Close nav on link click (mobile)
    megaMenu.querySelectorAll('a[href]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
          setTimeout(function() {
            nav.classList.remove('ksfl-mobile-open');
            document.body.style.overflow = '';
          }, 150);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMegaMenu);
  } else {
    initMegaMenu();
  }
})();
</script>
`;
}

// Clean up ALL old injections
function cleanOldInjections(content) {
  content = content.replace(/<style id="ksfl-header-nav-fix">[\s\S]*?<\/style>/g, '');
  content = content.replace(/<script id="ksfl-header-nav-fix-js">[\s\S]*?<\/script>/g, '');
  return content;
}

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
console.log(`Processing ${pages.length} pages...`);

let ok = 0;
pages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  content = cleanOldInjections(content);

  const bp = getBasePath(p);
  const code = getMegaMenuCode(bp);

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

console.log(`\n✅ ${ok} pages updated with v3 mega-menu.`);
