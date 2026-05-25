/**
 * KSFL Agro Ltd. — Centralized Navigation & Footer Enhancer
 * Dynamically injects the premium tabbed "Our Crops" mega-menu on desktop and mobile.
 * Manages unified mobile hamburger toggling, scroll locking, and outside clicks.
 * Cleans up and fixes subpage footer link prefixes dynamically.
 * Works perfectly on all pages and devices.
 */
(function () {
  'use strict';

  /* =========================================================================
     1. DYNAMIC RELATIVE PATH DETECTOR
     ========================================================================= */
  let basePath = './';
  const scriptEl = document.querySelector('script[src*="nav-footer-enhancer.js"]');
  if (scriptEl) {
    const src = scriptEl.getAttribute('src');
    if (src.startsWith('../../')) {
      basePath = '../../';
    } else if (src.startsWith('../')) {
      basePath = '../';
    }
  }

  /* =========================================================================
     2. CROP DATA
     ========================================================================= */
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

  /* =========================================================================
     3. INJECT PREMIUM TABBED MEGA-MENU
     ========================================================================= */
  function injectMegaMenu() {
    var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
    if (!productsLi) return;

    // Remove any existing older mega menus
    var existing = productsLi.querySelector('.ksfl-mega-menu') || productsLi.querySelector('.ksfl-megamenu');
    if (existing) existing.remove();

    productsLi.classList.add('ksfl-mega-wrapper');

    var bp = basePath;
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
          '<span class="ksfl-tab-icon">🌱</span> <span class="ksfl-mega-en">Pesticides</span><span class="ksfl-mega-bn" style="display:none">কীটনাশক</span>' +
        '</a>' +
        '<a class="ksfl-mega-tab" href="' + bp + 'products.html">' +
          '<span class="ksfl-tab-icon">🧪</span> <span class="ksfl-mega-en">Micronutrients</span><span class="ksfl-mega-bn" style="display:none">মাইক্রোনিউট্রিয়েন্ট</span>' +
        '</a>' +
      '</div>' +
      '<div class="ksfl-crops-panel ksfl-panel-open">' +
        '<div class="ksfl-crops-label-wrap" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(253,226,81,0.15); padding-bottom: 8px; margin-bottom: 12px;">' +
          '<span class="ksfl-crops-label" style="margin: 0; font-family: \'Roboto\', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; color: rgba(253,226,81,0.45);"><span class="ksfl-mega-en">ALL CROPS</span><span class="ksfl-mega-bn" style="display:none">সকল ফসল</span></span>' +
          '<a href="' + bp + 'our-crops.html" class="ksfl-view-all-link" style="color: #FDE251 !important; text-decoration: none !important; font-family: \'Roboto\', sans-serif; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 4px; padding-right: 4px;">' +
            '<span class="ksfl-mega-en">View All ➔</span><span class="ksfl-mega-bn" style="display:none">সব দেখুন ➔</span>' +
          '</a>' +
        '</div>' +
        '<div class="ksfl-crops-grid">' +
          crops.map(function(c) {
            return '<a href="' + bp + 'our-crops/' + c.slug + '/" class="ksfl-crop-link">' +
              '<span class="ci">' + c.icon + '</span>' +
              '<span class="ksfl-mega-en">' + c.name + '</span>' +
              '<span class="ksfl-mega-bn" style="display:none">' + c.bn + '</span>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</div>';

    productsLi.appendChild(mm);

    // Sync Bangla/English mode
    function syncLang() {
      var isBn = document.body.classList.contains('bn-active') || document.body.classList.contains('lang-bn');
      mm.querySelectorAll('.ksfl-mega-en, .en-text').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'none' : 'inline', 'important');
      });
      mm.querySelectorAll('.ksfl-mega-bn, .bn-text').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'inline' : 'none', 'important');
      });
    }
    syncLang();

    // Watch for language toggles on body classes
    var obs = new MutationObserver(syncLang);
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Toggle crops panel in mobile view or when crops button is clicked
    var cropsBtn = mm.querySelector('.ksfl-crops-btn');
    var cropsPanel = mm.querySelector('.ksfl-crops-panel');
    if (cropsBtn && cropsPanel) {
      cropsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cropsBtn.classList.toggle('ksfl-tab-active');
        cropsPanel.classList.toggle('ksfl-panel-open');
      });
    }

    // Mobile view chevron and click toggles for Products link
    var productsLink = productsLi.querySelector('[data-kirki="dpx02odk"]') || productsLi.querySelector('a');
    var chevronSvg = productsLi.querySelector('[data-kirki="dp6tu2j0"]') || productsLi.querySelector('.kirki-s220-dpjmen6g');
    
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
  }

  /* =========================================================================
     4. UNIFIED HAMBURGER INTERACTIVE EVENT HANDLERS
     ========================================================================= */
  function initMobileMenu() {
    var nav = document.querySelector('.kirki-s220-dp425u34');
    if (nav) nav.removeAttribute('kirki-navigation-type');

    var hamburger = document.querySelector('.kirki-s220-dpjglwhg');
    if (!hamburger || !nav) return;

    // Bind clean hamburger click event
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      var isOpen = nav.classList.contains('ksfl-mobile-open') || nav.classList.contains('kirki-mobile-open');
      if (isOpen) {
        nav.classList.remove('ksfl-mobile-open', 'kirki-mobile-open');
        hamburger.classList.remove('kirki-hamburger-active');
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open', 'ksfl-nav-open');
      } else {
        nav.classList.add('ksfl-mobile-open', 'kirki-mobile-open');
        hamburger.classList.add('kirki-hamburger-active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('mobile-menu-open', 'ksfl-nav-open');
      }
    });

    // Close mobile nav drawer when clicking outside
    document.addEventListener('click', function (e) {
      if ((nav.classList.contains('ksfl-mobile-open') || nav.classList.contains('kirki-mobile-open'))) {
        if (!nav.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
          nav.classList.remove('ksfl-mobile-open', 'kirki-mobile-open');
          hamburger.classList.remove('kirki-hamburger-active');
          document.body.style.overflow = '';
          document.body.classList.remove('mobile-menu-open', 'ksfl-nav-open');
        }
      }
    });

    // Close mobile nav drawer immediately when navigating through a link
    nav.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 991) {
          setTimeout(function () {
            nav.classList.remove('ksfl-mobile-open', 'kirki-mobile-open');
            hamburger.classList.remove('kirki-hamburger-active');
            document.body.style.overflow = '';
            document.body.classList.remove('mobile-menu-open', 'ksfl-nav-open');
          }, 150);
        }
      });
    });
  }

  /* =========================================================================
     5. FOOTER SUBPAGE RELATIVE PATH & LAYOUT RESOLUTION
     ========================================================================= */
  function fixFooter() {
    // Remove Others/Terms of Service section via DOM
    var othersEl = document.querySelector('[data-kirki="dpjh2nl5"]');
    if (othersEl) othersEl.remove();

    // Remove duplicates or extra Terms links by content
    document.querySelectorAll('.kirki-s219-dphywhzk, .dphywhzk').forEach(function(el) {
      var txt = el.textContent.trim();
      if (txt === 'Others' || txt === 'অন্যান্য' || txt === 'Terms of Service' || txt === 'শর্তাবলী') {
        var parent = el.closest('.kirki-s219-dpnjm05m') || el.closest('[class*="dpnjm05m"]');
        if (parent) parent.remove();
      }
    });

    // Dynamically repair relative link prefixes inside footer on nested subpages
    if (basePath !== './') {
      var footer = document.getElementById('footer') || document.querySelector('footer') || document.querySelector('.kirki-s219-dpbrehze');
      if (footer) {
        footer.querySelectorAll('a[href^="./"]').forEach(function(a) {
          var originalHref = a.getAttribute('href');
          a.href = originalHref.replace('./', basePath);
        });
        footer.querySelectorAll('img[src^="./"]').forEach(function(img) {
          var originalSrc = img.getAttribute('src');
          img.src = originalSrc.replace('./', basePath);
        });
      }
    }
  }

  /* =========================================================================
     6. CONTEXT-AWARE TRANSLATOR HARMONIZATION (Touch Pointer Lock fix)
     ========================================================================= */
  function optimizeLangToggle() {
    const btnEn = document.getElementById('btn-en');
    const btnBn = document.getElementById('btn-bn');
    
    // Fix active pointer events to prevent touch latency / double taps
    if (btnEn) {
      btnEn.style.pointerEvents = 'auto';
      btnEn.style.cursor = 'pointer';
    }
    if (btnBn) {
      btnBn.style.pointerEvents = 'auto';
      btnBn.style.cursor = 'pointer';
    }
  }

  /* =========================================================================
     7. INITIALIZATION
     ========================================================================= */
  function init() {
    injectMegaMenu();
    initMobileMenu();
    fixFooter();
    optimizeLangToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
