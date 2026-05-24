/**
 * MEGA MENU v5 - FIX BANGLA VISIBILITY
 * Root cause: our-crops.css has `body:not(.lang-bn) .bn-text { display: none !important; }`
 * which overrides inline styles. Fix: use !important in JS + sync with both bn-active AND lang-bn classes.
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

function getMegaMenuJS(basePath) {
  // Only the JS portion - the CSS is already injected, we just need to fix the syncLang function
  return `
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

    // Remove any existing mega menu
    var existing = productsLi.querySelector('.ksfl-mega-menu');
    if (existing) existing.remove();

    var bp = '${basePath}';
    var mm = document.createElement('div');
    mm.className = 'ksfl-mega-menu';
    mm.innerHTML =
      '<div class="ksfl-mega-arrow"></div>' +
      '<div class="ksfl-mega-tabs">' +
        '<div class="ksfl-mega-tab ksfl-tab-active ksfl-crops-btn">' +
          '<span class="ksfl-tab-icon">🌾</span> <span class="ksfl-mega-en">Our Crops</span><span class="ksfl-mega-bn" style="display:none">আমাদের ফসল</span>' +
          ' <span class="ksfl-chev"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="2,4 6,8 10,4"/></svg></span>' +
        '</div>' +
        '<a class="ksfl-mega-tab" href="' + bp + 'seeds.html">' +
          '<span class="ksfl-tab-icon">🌱</span> <span class="ksfl-mega-en">Seeds & Farm Goods</span><span class="ksfl-mega-bn" style="display:none">বীজ ও কৃষি পণ্য</span>' +
        '</a>' +
        '<a class="ksfl-mega-tab" href="' + bp + 'products.html">' +
          '<span class="ksfl-tab-icon">🧪</span> <span class="ksfl-mega-en">Micronutrients</span><span class="ksfl-mega-bn" style="display:none">মাইক্রোনিউট্রিয়েন্ট</span>' +
        '</a>' +
      '</div>' +
      '<div class="ksfl-crops-panel ksfl-panel-open">' +
        '<div class="ksfl-crops-label"><span class="ksfl-mega-en">ALL CROPS</span><span class="ksfl-mega-bn" style="display:none">সকল ফসল</span></div>' +
        '<div class="ksfl-crops-grid">' +
          '<a href="' + bp + 'our-crops/rice/" class="ksfl-crop-link"><span class="ci">🌾</span><span class="ksfl-mega-en">Rice</span><span class="ksfl-mega-bn" style="display:none">ধান</span></a>' +
          '<a href="' + bp + 'our-crops/bottle-gourd/" class="ksfl-crop-link"><span class="ci">🫛</span><span class="ksfl-mega-en">Bottle Gourd</span><span class="ksfl-mega-bn" style="display:none">লাউ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-pumpkin/" class="ksfl-crop-link"><span class="ci">🎃</span><span class="ksfl-mega-en">Sweet Pumpkin</span><span class="ksfl-mega-bn" style="display:none">মিষ্টি কুমড়া</span></a>' +
          '<a href="' + bp + 'our-crops/cucumber/" class="ksfl-crop-link"><span class="ci">🥒</span><span class="ksfl-mega-en">Cucumber</span><span class="ksfl-mega-bn" style="display:none">শসা</span></a>' +
          '<a href="' + bp + 'our-crops/radish/" class="ksfl-crop-link"><span class="ci">🥕</span><span class="ksfl-mega-en">Radish</span><span class="ksfl-mega-bn" style="display:none">মূলা</span></a>' +
          '<a href="' + bp + 'our-crops/pointed-gourd/" class="ksfl-crop-link"><span class="ci">🌿</span><span class="ksfl-mega-en">Pointed Gourd</span><span class="ksfl-mega-bn" style="display:none">পটল</span></a>' +
          '<a href="' + bp + 'our-crops/okra/" class="ksfl-crop-link"><span class="ci">🌱</span><span class="ksfl-mega-en">Okra</span><span class="ksfl-mega-bn" style="display:none">ঢেঁড়স</span></a>' +
          '<a href="' + bp + 'our-crops/bitter-gourd/" class="ksfl-crop-link"><span class="ci">🥬</span><span class="ksfl-mega-en">Bitter Gourd</span><span class="ksfl-mega-bn" style="display:none">করলা</span></a>' +
          '<a href="' + bp + 'our-crops/eggplant/" class="ksfl-crop-link"><span class="ci">🍆</span><span class="ksfl-mega-en">Eggplant</span><span class="ksfl-mega-bn" style="display:none">বেগুন</span></a>' +
          '<a href="' + bp + 'our-crops/potato/" class="ksfl-crop-link"><span class="ci">🥔</span><span class="ksfl-mega-en">Potato</span><span class="ksfl-mega-bn" style="display:none">গোল আলু</span></a>' +
          '<a href="' + bp + 'our-crops/paddy-seeds/" class="ksfl-crop-link"><span class="ci">🌱</span><span class="ksfl-mega-en">Paddy Seeds</span><span class="ksfl-mega-bn" style="display:none">ধানের বীজ</span></a>' +
          '<a href="' + bp + 'our-crops/sweet-potato-seeds/" class="ksfl-crop-link"><span class="ci">🍠</span><span class="ksfl-mega-en">Sweet Potato</span><span class="ksfl-mega-bn" style="display:none">মিষ্টি আলু</span></a>' +
        '</div>' +
      '</div>';

    productsLi.appendChild(mm);

    // FIXED: Sync language using !important to override any CSS rules
    function syncLang() {
      var isBn = document.body.classList.contains('bn-active') || document.body.classList.contains('lang-bn');
      mm.querySelectorAll('.ksfl-mega-en').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'none' : 'inline', 'important');
      });
      mm.querySelectorAll('.ksfl-mega-bn').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'inline' : 'none', 'important');
      });
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

function cleanOldJS(content) {
  // Remove old JS injection (keep CSS as is)
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
  content = cleanOldJS(content);
  const bp = getBasePath(p);
  const code = getMegaMenuJS(bp);
  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd === -1) { console.log(`  SKIP: ${path.relative(ROOT, p)}`); return; }
  content = content.substring(0, bodyEnd) + code + content.substring(bodyEnd);
  fs.writeFileSync(p, content, 'utf8');
  console.log(`  OK: ${path.relative(ROOT, p)}`);
  ok++;
});
console.log(`\n✅ ${ok} pages updated with v5 mega-menu JS (Bangla visibility fix).`);
