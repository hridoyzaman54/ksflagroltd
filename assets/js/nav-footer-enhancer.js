/**
 * KSFL Agro Ltd. — Nav & Footer Enhancer
 * Adds: Premium "Our Crops" mega-menu dropdown + footer CSS fixes
 * Pages: our-crops.html, all crop detail pages (our-crops/*/index.html)
 */
(function () {
  'use strict';

  /* =============================
     0. PATH AUTO-DETECTION
     ============================= */
  const path = window.location.pathname;
  let basePath = './';
  if (/\/our-crops\/[^/]+\/(index\.html)?$/i.test(path) || /\/our-crops\/[^/]+\/?$/i.test(path)) {
    basePath = '../../';
  } else if (/\/our-crops\.html$/i.test(path) || /\/our-crops\/?$/i.test(path)) {
    basePath = './';
  }
  // Also handle local file:// paths  
  const loc = window.location.href;
  if (loc.includes('/our-crops/') && (loc.endsWith('/index.html') || loc.match(/\/our-crops\/[^/]+\/?$/))) {
    basePath = '../../';
  }

  /* =============================
     1. CROP DATA
     ============================= */
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
    { name: 'Sweet Potato Seeds', bn: 'মিষ্টি আলুর বীজ', icon: '🍠', slug: 'sweet-potato-seeds' }
  ];

  function cropHref(slug) {
    return basePath + 'our-crops/' + slug + '/';
  }

  /* =============================
     2. INJECT CSS
     ============================= */
  function injectCSS() {
    if (document.getElementById('ksfl-nav-footer-enhancer-css')) return;
    const style = document.createElement('style');
    style.id = 'ksfl-nav-footer-enhancer-css';
    style.textContent = `
/* ===== MEGA-MENU STYLES ===== */
.ksfl-megamenu-wrapper {
  position: relative;
}

/* Suppress Old Buggy Submenu Expansion */
.ksfl-megamenu-wrapper .kirki-s220-dpi8cdrc,
.ksfl-megamenu-wrapper .dpi8cdrc {
  display: none !important;
}

.ksfl-megamenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  max-width: 90vw;
  background: rgba(41, 57, 32, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(253, 226, 81, 0.15);
  box-shadow: 0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset;
  padding: 28px 32px;
  z-index: 99999;
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
  transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1);
  pointer-events: none;
}

.ksfl-megamenu.ksfl-megamenu-visible {
  display: block;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.ksfl-megamenu-title {
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #FDE251;
  margin: 0 0 18px 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(253, 226, 81, 0.15);
}

.ksfl-megamenu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.ksfl-megamenu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none !important;
  color: rgba(255,255,255,0.88) !important;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.25s ease;
  line-height: 1.3;
}

.ksfl-megamenu-item:hover {
  background: rgba(253, 226, 81, 0.12);
  color: #FDE251 !important;
  transform: translateX(4px);
}

.ksfl-megamenu-item .ksfl-crop-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 28px;
  text-align: center;
}

.ksfl-megamenu-item .ksfl-crop-name {
  display: flex;
  flex-direction: column;
}

.ksfl-megamenu-item .ksfl-crop-name .en-text {
  font-size: 14px;
  font-weight: 500;
}

.ksfl-megamenu-item .ksfl-crop-name .bn-text {
  font-size: 12px;
  opacity: 0.6;
  font-weight: 300;
}

/* Sub-category links row */
.ksfl-megamenu-categories {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(253, 226, 81, 0.12);
  flex-wrap: wrap;
}

.ksfl-megamenu-cat-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 50px;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none !important;
  color: #293920 !important;
  background: #FDE251;
  transition: all 0.3s ease;
}

.ksfl-megamenu-cat-link:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ksfl-megamenu-cat-link svg {
  width: 14px;
  height: 14px;
}

/* Desktop: show on hover */
@media (min-width: 992px) {
  .ksfl-megamenu-wrapper:hover .ksfl-megamenu,
  .ksfl-megamenu-wrapper.ksfl-hover .ksfl-megamenu {
    display: block;
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }
}

/* Mobile: full-width, inline expansion */
@media (max-width: 991px) {
  .ksfl-megamenu {
    position: static !important;
    width: 100% !important;
    max-width: 100% !important;
    transform: none !important;
    border-radius: 12px !important;
    margin: 8px 0 !important;
    padding: 16px !important;
    background: rgba(41, 57, 32, 0.95) !important;
    border: 1px solid rgba(253, 226, 81, 0.1) !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  .ksfl-megamenu.ksfl-megamenu-visible {
    opacity: 1;
    transform: none;
  }
  .ksfl-megamenu-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 4px !important;
  }
  .ksfl-megamenu-item {
    padding: 8px 10px !important;
    font-size: 13px !important;
  }
  .ksfl-megamenu-categories {
    flex-direction: column;
    gap: 8px;
  }
  .ksfl-megamenu-cat-link {
    justify-content: center;
  }
}

@media (max-width: 575px) {
  .ksfl-megamenu-grid {
    grid-template-columns: 1fr !important;
  }
}

/* ===== FOOTER CSS FIXES ===== */
/* Inject the footer styles that are missing on crop pages */
.kirki-s219-dpbrehze {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.kirki-s219-dps6xd5x {
  border-bottom-color: rgba(255,255,255,0.4);
  position: relative;
  z-index: 1;
  padding: 0 24px;
  border-width: 0 0 1px 0;
  border-style: none none solid none;
}
.kirki-s219-dp6c8s2r {
  width: 100%;
  max-width: 1620px;
  position: relative;
  padding: 0 24px;
  margin: 0 auto;
}
.kirki-s219-dp6c8s2r.kirki-s219-dpgjydqc {
  border-right-color: rgba(243,240,235,1);
  border-left-color: rgba(243,240,235,1);
  border-width: 0 1px 0 1px;
  border-style: none solid none solid;
}
.kirki-s219-dp3tddhy {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  align-items: center;
  width: 100%;
  max-width: 983px;
  padding: 246px 0;
  margin: 0 auto;
}
.kirki-s219-dptldnyq {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
}
.kirki-s219-dp87431g {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  align-items: center;
}
.kirki-s219-dpk590pv {
  color: #FDE251;
  font-family: 'Roboto', sans-serif;
  font-size: 86px;
  font-weight: 500;
  line-height: 1em;
  letter-spacing: -4px;
}
.kirki-s219-dpk590pv.kirki-s219-dpo2pb78 {
  text-align: center;
}
.kirki-s219-dpkr8zeb {
  max-width: 474px;
}
.kirki-s219-dp8uxjnw {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 1.44em;
  letter-spacing: -0.4px;
  color: rgba(255,255,255,0.85);
}
.kirki-s219-dp8uxjnw.kirki-s219-dpo2pb78 {
  text-align: center;
}
.kirki-s219-dplr6hng {
  overflow: hidden;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  border-radius: 50px;
  background-color: #FDE251;
  display: flex;
  column-gap: 8px;
  align-items: center;
  width: fit-content;
  padding: 12px 12px 12px 20px;
  transition: all 0.3s ease;
}
.kirki-s219-dplr6hng:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(253,226,81,0.3);
}
.kirki-s219-dpzn1un8 {
  display: flex;
  flex-direction: column;
  height: 18px;
  overflow: hidden;
}
.kirki-s219-dpgarj7g {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1em;
  letter-spacing: -0.3px;
}
.kirki-s219-dpgarj7g.kirki-s219-dpclh94s {
  color: #293920;
}
.kirki-s219-dpv5h2iw {
  width: 18px;
  min-width: 18px;
  height: 18px;
}
.kirki-s219-dp0evq34 {
  padding: 0 24px;
}
.kirki-s219-dpfnjtmn {
  display: flex;
  flex-direction: column;
  row-gap: 140px;
  align-items: center;
  padding: 64px 0 0;
}
.kirki-s219-dp7tb1f4 {
  width: 100%;
  display: flex;
  column-gap: 48px;
  justify-content: space-between;
  max-width: 1492px;
  flex-wrap: wrap;
  row-gap: 48px;
}
.kirki-s219-dp5ekf8m {
  width: auto;
  display: flex;
  column-gap: 48px;
}
.kirki-s219-dpnjm05m {
  min-width: 184px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
.kirki-s219-dphywhzk {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1em;
  letter-spacing: -0.3px;
}
.kirki-s219-dphywhzk.kirki-s219-dpw94s95 {
  color: #FDE251 !important;
}
.kirki-s219-dpgjvbot {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.kirki-s219-dpf3ou08 {
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
}
.kirki-s219-dpgx9dvt {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.25em;
}
.kirki-s219-dpgx9dvt.kirki-s219-dpksu24y {
  color: rgba(255,255,255,1);
  transition: all 300ms ease-out;
}
.kirki-s219-dpgx9dvt.kirki-s219-dpksu24y:hover {
  color: rgba(220,231,182,1);
}
.kirki-s219-dpgx9dvt.kirki-s219-dpo2pb78 {
  text-align: center;
}
.kirki-s219-dpv862q9 {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  width: 100%;
  padding: 0 148px 24px;
}
.kirki-s219-dpw3e732 {
  width: 100%;
  max-height: 202px;
}
/* Also ensure non-prefixed footer link classes work */
.dpgx9dvt {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.25em;
}
.dpgx9dvt.dpksu24y {
  color: rgba(255,255,255,1);
  transition: all 300ms ease-out;
}
.dpgx9dvt.dpksu24y:hover {
  color: rgba(220,231,182,1);
}
.dpf3ou08 {
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
}

/* Footer responsive */
@media (max-width: 991px) {
  .kirki-s219-dp3tddhy { max-width: 414px; padding: 150px 0; }
  .kirki-s219-dp87431g { row-gap: 16px; }
  .kirki-s219-dpk590pv { font-size: 56px; letter-spacing: -3px; }
  .kirki-s219-dp8uxjnw { font-size: 16px; }
  .kirki-s219-dpfnjtmn { row-gap: 155px; }
  .kirki-s219-dp7tb1f4 { row-gap: 48px; flex-direction: column; align-items: flex-end; }
  .kirki-s219-dp5ekf8m { justify-content: space-between; column-gap: 24px; width: 100%; }
  .kirki-s219-dpnjm05m { min-width: auto; width: 100%; }
  .kirki-s219-dphywhzk { font-size: 16px; line-height: 1.12em; letter-spacing: -0.4px; }
  .kirki-s219-dpgx9dvt { font-size: 14px; }
  .dpgx9dvt { font-size: 14px; }
  .kirki-s219-dpv862q9 { row-gap: 16px; }
  .kirki-s219-dps6xd5x { padding: 0 32px; }
  .kirki-s219-dp6c8s2r { padding: 0 32px; }
  .kirki-s219-dp0evq34 { padding: 0 32px; }
}

@media (max-width: 575px) {
  .kirki-s219-dp3tddhy { max-width: 300px; padding: 86px 0 100px; }
  .kirki-s219-dpk590pv { font-size: 40px; letter-spacing: -2px; }
  .kirki-s219-dp8uxjnw { font-size: 14px; }
  .kirki-s219-dplr6hng { justify-content: center; width: 100%; }
  .kirki-s219-dpfnjtmn { row-gap: 86px; padding: 48px 0 0; }
  .kirki-s219-dp7tb1f4 { column-gap: 0; flex-direction: row; }
  .kirki-s219-dp5ekf8m { flex-direction: row; row-gap: 48px; column-gap: 0; flex-wrap: wrap; }
  .kirki-s219-dpnjm05m { order: 0; width: 50%; }
  .kirki-s219-dpnjm05m.kirki-s219-dpbbmjqz { order: 1; width: 100%; }
  .kirki-s219-dpv862q9 { row-gap: 8px; padding: 0 0 16px; }
  .kirki-s219-dps6xd5x { padding: 0 16px; }
  .kirki-s219-dp6c8s2r { padding: 0 16px; }
  .kirki-s219-dp0evq34 { padding: 0 16px; }
}

/* ===== HEADER NAV FIX ===== */
/* Make nav bar sticky with good styling */
#navbar-1, [id*="navbar"] {
  position: sticky !important;
  top: 0 !important;
  z-index: 9999 !important;
}

/* Products nav item needs to be the mega-menu wrapper */
li[data-kirki="dpkzemwd"] {
  position: relative;
}
`;
    document.head.appendChild(style);
  }

  /* =============================
     3. INJECT MEGA-MENU
     ============================= */
  function injectMegaMenu() {
    // Find the "Our Products" nav item
    const productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
    if (!productsLi) return;

    // Check if already injected
    if (productsLi.querySelector('.ksfl-megamenu')) return;

    // Add wrapper class
    productsLi.classList.add('ksfl-megamenu-wrapper');

    // Build mega-menu HTML
    const mega = document.createElement('div');
    mega.className = 'ksfl-megamenu';
    mega.innerHTML = `
      <p class="ksfl-megamenu-title">
        <span class="en-text">🌱 Our Grown Crops</span>
        <span class="bn-text">🌱 আমাদের উৎপাদিত ফসল</span>
      </p>
      <div class="ksfl-megamenu-grid">
        ${crops.map(c => `
          <a class="ksfl-megamenu-item" href="${cropHref(c.slug)}">
            <span class="ksfl-crop-icon">${c.icon}</span>
            <span class="ksfl-crop-name">
              <span class="en-text">${c.name}</span>
              <span class="bn-text">${c.bn}</span>
            </span>
          </a>
        `).join('')}
      </div>
      <div class="ksfl-megamenu-categories">
        <a class="ksfl-megamenu-cat-link" href="${basePath}our-crops.html">
          <span class="en-text">🌾 All Crops</span>
          <span class="bn-text">🌾 সকল ফসল</span>
        </a>
        <a class="ksfl-megamenu-cat-link" href="${basePath}seeds.html">
          <span class="en-text">🌱 Pesticides</span>
          <span class="bn-text">🌱 কীটনাশক</span>
        </a>
        <a class="ksfl-megamenu-cat-link" href="${basePath}products.html">
          <span class="en-text">🧪 Micronutrients</span>
          <span class="bn-text">🧪 মাইক্রোনিউট্রিয়েন্টস</span>
        </a>
      </div>
    `;

    productsLi.appendChild(mega);

    // Desktop: hover logic with delay
    let hoverTimeout;
    productsLi.addEventListener('mouseenter', function () {
      clearTimeout(hoverTimeout);
      mega.classList.add('ksfl-megamenu-visible');
    });
    productsLi.addEventListener('mouseleave', function () {
      hoverTimeout = setTimeout(function () {
        mega.classList.remove('ksfl-megamenu-visible');
      }, 200);
    });

    // Mobile: toggle on click of "Our Products" link
    const productsLink = productsLi.querySelector('a[data-kirki="dpx02odk"]') ||
                         productsLi.querySelector('.kirki-s220-dpjf4k6u > a');
    if (productsLink) {
      productsLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();
          mega.classList.toggle('ksfl-megamenu-visible');
        }
      });
    }

    // Also handle the chevron/arrow click on mobile
    const chevron = productsLi.querySelector('svg[data-kirki="dp6tu2j0"]') ||
                    productsLi.querySelector('.kirki-s220-dpjmen6g');
    if (chevron) {
      chevron.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          e.stopPropagation();
          mega.classList.toggle('ksfl-megamenu-visible');
        }
      });
    }
  }

  /* =============================
     4. INIT
     ============================= */
  function init() {
    injectCSS();
    injectMegaMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
