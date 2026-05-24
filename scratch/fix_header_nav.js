/**
 * MEGA MENU v4 - FINAL FIX
 * - Stable positioning (no jumping)
 * - Hover bridge (menu stays visible while moving mouse to it)
 * - All tabs visible in both EN and BN
 * - Premium colors/styling
 * - Works on ALL pages, ALL devices
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
/* HIDE original kirki dropdown */
.kirki-s220-dpi8cdrc { display: none !important; }
/* Hamburger hidden on desktop */
.kirki-s220-dpjglwhg { display: none !important; }

/* ===== MEGA MENU WRAPPER ===== */
.ksfl-mega-wrapper {
  position: relative !important;
}
/* Invisible hover bridge so menu doesn't vanish */
.ksfl-mega-wrapper::after {
  content: '';
  display: none;
  position: absolute;
  top: 100%;
  left: -40px;
  right: -40px;
  height: 20px;
  z-index: 99998;
}
.ksfl-mega-wrapper:hover::after,
.ksfl-mega-wrapper.ksfl-open::after {
  display: block;
}

/* ===== MEGA MENU PANEL ===== */
.ksfl-mega-menu {
  display: none;
  position: absolute;
  top: calc(100% + 14px);
  right: -120px;
  width: 640px;
  background: linear-gradient(145deg, #1a2b14 0%, #243a1a 40%, #1f3118 100%);
  border-radius: 20px;
  border: 1px solid rgba(253,226,81,0.12);
  box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 2px rgba(253,226,81,0.08) inset;
  padding: 0;
  z-index: 99999;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  overflow: hidden;
}
.ksfl-mega-wrapper:hover .ksfl-mega-menu,
.ksfl-mega-wrapper.ksfl-open .ksfl-mega-menu {
  display: block;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
/* Triangle pointer */
.ksfl-mega-arrow {
  position: absolute;
  top: -8px;
  left: 160px;
  width: 16px;
  height: 8px;
  overflow: hidden;
}
.ksfl-mega-arrow::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 2px;
  width: 12px;
  height: 12px;
  background: #1a2b14;
  border: 1px solid rgba(253,226,81,0.12);
  transform: rotate(45deg);
}

/* ===== TOP NAV TABS ===== */
.ksfl-mega-tabs {
  display: flex;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(253,226,81,0.08);
}
.ksfl-mega-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.1px;
  color: rgba(255,255,255,0.55);
  text-decoration: none !important;
  cursor: pointer;
  transition: all 0.25s ease;
  border-right: 1px solid rgba(255,255,255,0.04);
  white-space: nowrap;
}
.ksfl-mega-tab:last-child { border-right: none; }
.ksfl-mega-tab:hover {
  color: rgba(255,255,255,0.9);
  background: rgba(253,226,81,0.05);
}
.ksfl-mega-tab.ksfl-tab-active {
  color: #FDE251;
  background: rgba(253,226,81,0.08);
}
.ksfl-mega-tab .ksfl-tab-icon { font-size: 14px; line-height: 1; }
.ksfl-mega-tab .ksfl-chev {
  display: inline-flex;
  transition: transform 0.3s ease;
  opacity: 0.6;
}
.ksfl-mega-tab.ksfl-tab-active .ksfl-chev {
  transform: rotate(180deg);
  opacity: 1;
}

/* ===== CROPS GRID PANEL ===== */
.ksfl-crops-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
  padding: 0 24px;
}
.ksfl-crops-panel.ksfl-panel-open {
  max-height: 500px;
  padding: 20px 24px 18px;
}
.ksfl-crops-label {
  font-family: 'Roboto', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: rgba(253,226,81,0.45);
  margin: 0 0 14px 2px;
}
.ksfl-crops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px 8px;
}
.ksfl-crop-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  text-decoration: none !important;
  color: rgba(255,255,255,0.78) !important;
  font-family: 'Roboto', sans-serif;
  font-size: 13.5px;
  font-weight: 400;
  letter-spacing: -0.2px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.ksfl-crop-link:hover {
  background: rgba(253,226,81,0.08);
  color: #FDE251 !important;
  transform: translateX(3px);
}
.ksfl-crop-link .ci { font-size: 15px; line-height: 1; flex-shrink: 0; }

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
  .kirki-s220-dp425u34.ksfl-mobile-open { display: flex !important; }
  .kirki-s220-dplwwalk {
    width: 100% !important;
    padding: 14px 28px !important;
    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
  }
  .kirki-s220-dpich0g0 {
    font-size: 20px !important;
    color: rgba(255,255,255,0.9) !important;
  }
  /* Mobile mega menu */
  .ksfl-mega-wrapper::after { display: none !important; }
  .ksfl-mega-menu {
    position: static !important;
    width: 100% !important;
    border-radius: 14px !important;
    margin: 8px 0 0 !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
    transform: none !important;
    right: auto !important;
  }
  .ksfl-mega-wrapper:hover .ksfl-mega-menu {
    display: none;
    opacity: 0;
    pointer-events: none;
  }
  .ksfl-mega-wrapper.ksfl-open .ksfl-mega-menu {
    display: block !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }
  .ksfl-mega-arrow { display: none; }
  .ksfl-mega-tabs { flex-direction: column; }
  .ksfl-mega-tab {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 14px 20px;
    justify-content: flex-start;
    font-size: 15px;
  }
  .ksfl-crops-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2px 4px !important; }
  .ksfl-crop-link { font-size: 12.5px !important; padding: 8px 10px !important; }
}
@media (max-width: 575px) {
  .kirki-s220-dp425u34 {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
    inset: 56px 0 0 0 !important;
  }
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

    // Products li
    var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
    if (!productsLi) return;
    productsLi.classList.add('ksfl-mega-wrapper');

    var bp = '${basePath}';
    var mm = document.createElement('div');
    mm.className = 'ksfl-mega-menu';
    mm.innerHTML =
      '<div class="ksfl-mega-arrow"></div>' +
      '<div class="ksfl-mega-tabs">' +
        '<div class="ksfl-mega-tab ksfl-tab-active ksfl-crops-btn">' +
          '<span class="ksfl-tab-icon">🌾</span> <span class="en-text">Our Crops</span><span class="bn-text">আমাদের ফসল</span>' +
          ' <span class="ksfl-chev"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="2,4 6,8 10,4"/></svg></span>' +
        '</div>' +
        '<a class="ksfl-mega-tab" href="' + bp + 'seeds.html">' +
          '<span class="ksfl-tab-icon">🌱</span> <span class="en-text">Seeds & Farm Goods</span><span class="bn-text">বীজ ও কৃষি পণ্য</span>' +
        '</a>' +
        '<a class="ksfl-mega-tab" href="' + bp + 'products.html">' +
          '<span class="ksfl-tab-icon">🧪</span> <span class="en-text">Micronutrients</span><span class="bn-text">মাইক্রোনিউট্রিয়েন্ট</span>' +
        '</a>' +
      '</div>' +
      '<div class="ksfl-crops-panel ksfl-panel-open">' +
        '<div class="ksfl-crops-label">ALL CROPS</div>' +
        '<div class="ksfl-crops-grid">' +
          '<a href="' + bp + 'our-crops/rice/" class="ksfl-crop-link"><span class="ci">🌾</span><span class="en-text">Rice</span><span class="bn-text">ধান</span></a>' +
          '<a href="' + bp + 'our-crops/bottle-gourd/" class="ksfl-crop-link"><span class="ci">🫛</span><span class="en-text">Bottle Gourd</span><span class="bn-text">লাউ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-pumpkin/" class="ksfl-crop-link"><span class="ci">🎃</span><span class="en-text">Sweet Pumpkin</span><span class="bn-text">মিষ্টি কুমড়া</span></a>' +
          '<a href="' + bp + 'our-crops/cucumber/" class="ksfl-crop-link"><span class="ci">🥒</span><span class="en-text">Cucumber</span><span class="bn-text">শসা</span></a>' +
          '<a href="' + bp + 'our-crops/radish/" class="ksfl-crop-link"><span class="ci">🥕</span><span class="en-text">Radish</span><span class="bn-text">মূলা</span></a>' +
          '<a href="' + bp + 'our-crops/pointed-gourd/" class="ksfl-crop-link"><span class="ci">🌿</span><span class="en-text">Pointed Gourd</span><span class="bn-text">পটল</span></a>' +
          '<a href="' + bp + 'our-crops/okra/" class="ksfl-crop-link"><span class="ci">🌱</span><span class="en-text">Okra</span><span class="bn-text">ঢেঁড়স</span></a>' +
          '<a href="' + bp + 'our-crops/bitter-gourd/" class="ksfl-crop-link"><span class="ci">🥬</span><span class="en-text">Bitter Gourd</span><span class="bn-text">করলা</span></a>' +
          '<a href="' + bp + 'our-crops/eggplant/" class="ksfl-crop-link"><span class="ci">🍆</span><span class="en-text">Eggplant</span><span class="bn-text">বেগুন</span></a>' +
          '<a href="' + bp + 'our-crops/potato/" class="ksfl-crop-link"><span class="ci">🥔</span><span class="en-text">Potato</span><span class="bn-text">গোল আলু</span></a>' +
          '<a href="' + bp + 'our-crops/paddy-seeds/" class="ksfl-crop-link"><span class="ci">🌱</span><span class="en-text">Paddy Seeds</span><span class="bn-text">ধানের বীজ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-potato-seeds/" class="ksfl-crop-link"><span class="ci">🍠</span><span class="en-text">Sweet Potato</span><span class="bn-text">মিষ্টি আলু</span></a>' +
        '</div>' +
      '</div>';

    productsLi.appendChild(mm);

    // Sync Bangla - check if page is in BN mode and apply
    function syncLang() {
      var isBn = document.body.classList.contains('bn-active');
      mm.querySelectorAll('.en-text').forEach(function(el) { el.style.display = isBn ? 'none' : ''; });
      mm.querySelectorAll('.bn-text').forEach(function(el) { el.style.display = isBn ? '' : 'none'; });
    }
    syncLang();
    // Watch for class changes on body
    var obs = new MutationObserver(syncLang);
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Toggle crops panel
    var cropsBtn = mm.querySelector('.ksfl-crops-btn');
    var cropsPanel = mm.querySelector('.ksfl-crops-panel');
    cropsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      cropsBtn.classList.toggle('ksfl-tab-active');
      cropsPanel.classList.toggle('ksfl-panel-open');
    });

    // Mobile toggle
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
    if (chevronSvg) { chevronSvg.style.cursor = 'pointer'; chevronSvg.addEventListener('click', toggleMobile); }

    // Close mobile nav on outside click
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('ksfl-mobile-open') && !nav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
        nav.classList.remove('ksfl-mobile-open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click (mobile)
    mm.querySelectorAll('a[href]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
          setTimeout(function() { nav.classList.remove('ksfl-mobile-open'); document.body.style.overflow = ''; }, 150);
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
  if (bodyEnd === -1) { console.log(`  ERROR: ${path.relative(ROOT, p)}`); return; }
  content = content.substring(0, bodyEnd) + code + content.substring(bodyEnd);
  fs.writeFileSync(p, content, 'utf8');
  console.log(`  OK: ${path.relative(ROOT, p)}`);
  ok++;
});
console.log(`\n✅ ${ok} pages updated with v4 mega-menu.`);
