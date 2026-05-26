/**
 * KSFL Agro Ltd. — Centralized Navigation & Footer Enhancer v2.0
 * ==============================================================
 * Single source of truth for header navigation on ALL pages.
 *
 * Features:
 * 1. Detects depth (root, 1-deep, 2-deep) for relative paths
 * 2. Replaces the Kirki Products dropdown with a premium tabbed mega-menu
 * 3. Fixes all nav link hrefs and labels to be consistent
 * 4. Manages mobile hamburger open/close with body scroll lock
 * 5. Handles Products submenu expand/collapse on mobile
 * 6. Fixes footer links on subpages
 * 7. Language toggle sync
 * 8. Hero slideshow
 * 9. Gallery/Video keepalive
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
     3. FIX ALL NAV LINKS — Ensure consistent hrefs and labels across pages
     ========================================================================= */
  function fixNavLinks() {
    var bp = basePath;

    // Fix logo link — should always go to index.html
    var logoLink = document.querySelector('[data-kirki="dp321gpx"]');
    if (logoLink) {
      logoLink.setAttribute('href', bp + 'index.html');
    }

    // Fix Home link
    var homeLink = document.querySelector('[data-kirki="dpp2fc2o"]');
    if (homeLink) {
      homeLink.setAttribute('href', bp + 'index.html');
      homeLink.textContent = 'Home';
    }

    // Fix Our Story link
    var storyLink = document.querySelector('[data-kirki="dp41kxod"]');
    if (storyLink) {
      storyLink.setAttribute('href', bp + 'about.html');
      storyLink.textContent = 'Our Story';
    }

    // Fix Blogs link
    var blogsLink = document.querySelector('[data-kirki="dpec2r3z"]');
    if (blogsLink) {
      blogsLink.setAttribute('href', bp + 'blogs.html');
      blogsLink.textContent = 'Blogs';
    }

    // Fix Contact link
    var contactLink = document.querySelector('[data-kirki="dpogns08"]');
    if (contactLink) {
      contactLink.setAttribute('href', bp + 'contact.html');
    }
    // Fix contact button text
    var contactText = document.querySelector('[data-kirki="dppaxh2l"]');
    if (contactText) {
      contactText.textContent = 'Contact us';
    }
  }

  /* =========================================================================
     4. KILL KIRKI'S PRODUCTS DROPDOWN ANIMATIONS
     ========================================================================= */
  function killKirkiDropdown() {
    // Remove kirki interaction data that causes buggy animations
    if (window.kirkiInteractions && window.kirkiInteractions.dpkzemwd) {
      delete window.kirkiInteractions.dpkzemwd;
    }
    // Force-hide the original kirki dropdown container
    var dd = document.querySelector('.kirki-s220-dpi8cdrc');
    if (dd) {
      dd.style.cssText = 'display:none!important;height:0!important;overflow:hidden!important;pointer-events:none!important;';
    }
  }

  /* =========================================================================
     5. INJECT PREMIUM TABBED MEGA-MENU
     ========================================================================= */
  function injectMegaMenu() {
    var productsLi = document.querySelector('li[data-kirki="dpkzemwd"]');
    if (!productsLi) return;

    // Clone and replace to strip all of Kirki's buggy click/hover event listeners
    var newProductsLi = productsLi.cloneNode(true);
    productsLi.parentNode.replaceChild(newProductsLi, productsLi);
    productsLi = newProductsLi;


    // Remove any existing mega menus (prevent duplicates)
    var existing = productsLi.querySelector('.ksfl-mega-menu');
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
        '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(253,226,81,0.15);padding-bottom:8px;margin-bottom:12px;">' +
          '<span class="ksfl-crops-label"><span class="ksfl-mega-en">ALL CROPS</span><span class="ksfl-mega-bn" style="display:none">সকল ফসল</span></span>' +
          '<a href="' + bp + 'our-crops.html" class="ksfl-view-all-link">' +
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
      mm.querySelectorAll('.ksfl-mega-en').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'none' : 'inline', 'important');
      });
      mm.querySelectorAll('.ksfl-mega-bn').forEach(function(el) {
        el.style.setProperty('display', isBn ? 'inline' : 'none', 'important');
      });
    }
    syncLang();

    // Watch for language toggles on body classes
    var obs = new MutationObserver(syncLang);
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Toggle crops panel (both desktop click and mobile)
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

    // Mobile: click "Our Products" text or chevron to toggle mega-menu
    var productsTextLink = productsLi.querySelector('[data-kirki="dpx02odk"]');
    var chevronSvg = productsLi.querySelector('[data-kirki="dp6tu2j0"]') || productsLi.querySelector('.kirki-s220-dpjmen6g');
    var productsTrigger = productsLi.querySelector('.kirki-s220-dpjf4k6u');

    function toggleMobileProducts(e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = productsLi.classList.contains('ksfl-open');
        productsLi.classList.toggle('ksfl-open');
        // Rotate chevron
        if (chevronSvg) {
          chevronSvg.style.transform = isOpen ? 'rotateZ(180deg)' : 'rotateZ(0deg)';
        }
      }
    }

    // Attach to the entire trigger row (text + chevron) for reliable mobile taps
    if (productsTrigger) {
      productsTrigger.addEventListener('click', toggleMobileProducts);
    } else {
      if (productsTextLink) productsTextLink.addEventListener('click', toggleMobileProducts);
      if (chevronSvg) {
        chevronSvg.style.cursor = 'pointer';
        chevronSvg.addEventListener('click', toggleMobileProducts);
      }
    }
  }

  /* =========================================================================
     6. UNIFIED MOBILE HAMBURGER MENU
     ========================================================================= */
  function initMobileMenu() {
    var nav = document.querySelector('.kirki-s220-dp425u34');
    var hamburger = document.querySelector('.kirki-s220-dpjglwhg');
    if (!hamburger || !nav) return;

    // Clone and replace to strip all of Kirki's buggy mobile menu event listeners
    var newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    hamburger = newHamburger;


    // Remove kirki's navigation-type attribute that interferes
    nav.removeAttribute('kirki-navigation-type');

    // Track scroll position for body lock
    var scrollY = 0;

    function openMenu() {
      scrollY = window.scrollY;
      nav.classList.add('ksfl-mobile-open');
      hamburger.classList.add('ksfl-hamburger-active');
      document.body.classList.add('ksfl-nav-open');
      document.body.style.top = '-' + scrollY + 'px';
    }

    function closeMenu() {
      nav.classList.remove('ksfl-mobile-open');
      hamburger.classList.remove('ksfl-hamburger-active');
      document.body.classList.remove('ksfl-nav-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);

      // Also close products submenu
      var productsLi = document.querySelector('.ksfl-mega-wrapper');
      if (productsLi) {
        productsLi.classList.remove('ksfl-open');
        var chev = productsLi.querySelector('.kirki-s220-dpjmen6g');
        if (chev) chev.style.transform = 'rotateZ(180deg)';
      }
    }

    function isMenuOpen() {
      return nav.classList.contains('ksfl-mobile-open');
    }

    // Hamburger click — toggle open/close
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking outside the nav drawer
    document.addEventListener('click', function(e) {
      if (isMenuOpen() && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close when clicking a navigation link (except products toggle)
    nav.querySelectorAll('a[href]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
          setTimeout(closeMenu, 100);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        closeMenu();
      }
    });

    // Handle orientation change — close menu
    window.addEventListener('orientationchange', function() {
      if (isMenuOpen()) closeMenu();
    });

    // Handle resize crossing mobile/desktop breakpoint
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 991 && isMenuOpen()) {
          closeMenu();
        }
      }, 150);
    });
  }

  /* =========================================================================
     7. FOOTER SUBPAGE RELATIVE PATH & LAYOUT RESOLUTION
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
          a.href = a.getAttribute('href').replace('./', basePath);
        });
        footer.querySelectorAll('img[src^="./"]').forEach(function(img) {
          img.src = img.getAttribute('src').replace('./', basePath);
        });
      }
    }
  }

  /* =========================================================================
     8. CONTEXT-AWARE TRANSLATOR HARMONIZATION
     ========================================================================= */
  function optimizeLangToggle() {
    var btnEn = document.getElementById('btn-en');
    var btnBn = document.getElementById('btn-bn');
    if (btnEn) { btnEn.style.pointerEvents = 'auto'; btnEn.style.cursor = 'pointer'; }
    if (btnBn) { btnBn.style.pointerEvents = 'auto'; btnBn.style.cursor = 'pointer'; }
  }

  /* =========================================================================
     9. HERO SLIDESHOW — Auto-rotating background images + text paragraphs
     ========================================================================= */
  function initHeroSlideshow() {
    var wrapper = document.querySelector('.hero-image-wrapper');
    if (!wrapper) return;

    var images = wrapper.querySelectorAll('.dpvmj3vk');
    var paragraphs = document.querySelectorAll('.hero-paragraph');
    var circleNavs = document.querySelectorAll('.custom-circle-nav');
    var dividers = document.querySelectorAll('.custom-slide-divider');
    var totalSlides = images.length;
    if (totalSlides === 0) return;

    var currentSlide = 0;
    var autoTimer = null;
    var INTERVAL = 5000;

    function goToSlide(index) {
      currentSlide = index;
      images.forEach(function(img, i) {
        img.style.setProperty('opacity', i === index ? '1' : '0', 'important');
        img.style.setProperty('z-index', i === index ? '3' : '1', 'important');
      });
      paragraphs.forEach(function(p, i) {
        p.classList.toggle('active-para', i === index);
      });
      circleNavs.forEach(function(circle, i) {
        circle.classList.toggle('active-circle', i === index);
      });
      dividers.forEach(function(div, i) {
        var fill = div.querySelector('.active-nav-color');
        if (i === index) {
          div.classList.add('active-divider-nav');
          if (fill) {
            fill.style.transition = 'none';
            fill.style.height = '0%';
            void fill.offsetHeight;
            fill.style.transition = 'height ' + (INTERVAL / 1000) + 's linear';
            fill.style.height = '100%';
          }
        } else {
          div.classList.remove('active-divider-nav');
          if (fill) { fill.style.transition = 'none'; fill.style.height = '0%'; }
        }
      });
    }

    function nextSlide() { goToSlide((currentSlide + 1) % totalSlides); }
    function startAutoplay() { stopAutoplay(); autoTimer = setInterval(nextSlide, INTERVAL); }
    function stopAutoplay() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

    circleNavs.forEach(function(circle, i) {
      circle.style.cursor = 'pointer';
      circle.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); goToSlide(i); startAutoplay(); });
    });
    dividers.forEach(function(div, i) {
      div.style.cursor = 'pointer';
      div.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); goToSlide(i); startAutoplay(); });
    });

    goToSlide(0);
    startAutoplay();
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });
  }

  /* =========================================================================
     10. GALLERY CAROUSEL KEEPALIVE
     ========================================================================= */
  function initGalleryCarouselKeepAlive() {
    var carousels = document.querySelectorAll('.discover-slider, .premade_template_infinity-slide-items, .carousel-track');
    if (!carousels.length) return;
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            var anim = getComputedStyle(el).animationName;
            if (anim && anim !== 'none') {
              el.style.animationPlayState = 'running';
            } else {
              el.style.animation = 'none';
              void el.offsetHeight;
              el.style.animation = '';
            }
          }
        });
      }, { threshold: 0.1 });
      carousels.forEach(function(c) { observer.observe(c); });
    }
  }

  /* =========================================================================
     11. AUTOPLAY VIDEO KEEPALIVE
     ========================================================================= */
  function initAutoplayVideoKeepAlive() {
    var videos = document.querySelectorAll('video[autoplay]');
    if (!videos.length) return;
    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && entry.target.paused) {
            entry.target.play().catch(function() {});
          }
        });
      }, { threshold: 0.2 });
      videos.forEach(function(v) { videoObserver.observe(v); });
    }
  }

  /* =========================================================================
     12. INITIALIZATION
     ========================================================================= */
  function init() {
    killKirkiDropdown();
    fixNavLinks();
    injectMegaMenu();
    initMobileMenu();
    fixFooter();
    optimizeLangToggle();
    initHeroSlideshow();
    initGalleryCarouselKeepAlive();
    initAutoplayVideoKeepAlive();

    // Re-kill kirki dropdown after a delay (kirki may reinit)
    setTimeout(killKirkiDropdown, 500);
    setTimeout(killKirkiDropdown, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
