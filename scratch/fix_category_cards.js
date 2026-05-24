const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// The CSS we want to inject - a complete overhaul of the category cards section
// to make it premium, equal-sized, and properly laid out
const premiumCategoryCSS = `
<style id="category-cards-premium-fix">
/* ====================================================
   PREMIUM CATEGORY CARDS – Complete Layout Fix
   3 equal-width cards, fixed image height, no overlap
   ==================================================== */

/* Section wrapper */
.category-grid-mask {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 28px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
  align-items: stretch !important;
}

/* Each card is a flex column */
.category-card {
  display: flex !important;
  flex-direction: column !important;
  background-color: #ffffff !important;
  border-radius: 24px !important;
  overflow: hidden !important;
  border: 1px solid rgba(90, 109, 63, 0.12) !important;
  box-shadow: 0 8px 32px rgba(41, 57, 32, 0.08) !important;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s ease !important;
  position: relative !important;
  min-height: 0 !important;
}

.category-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 24px 60px rgba(41, 57, 32, 0.14) !important;
  border-color: rgba(90, 109, 63, 0.35) !important;
}

/* IMAGE CONTAINER - fixed height, enforced aspect ratio */
.category-card .dpoc0gmd {
  position: relative !important;
  width: 100% !important;
  height: 300px !important;
  min-height: 300px !important;
  max-height: 300px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
  border-radius: 0 !important;
  display: block !important;
}

/* Image itself fills the container perfectly */
.category-card .dpoc0gmd > .kirki-image,
.category-card .dpoc0gmd > img {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  border-radius: 0 !important;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  min-width: unset !important;
  min-height: unset !important;
}

.category-card:hover .dpoc0gmd > .kirki-image,
.category-card:hover .dpoc0gmd > img {
  transform: scale(1.06) !important;
}

/* REMOVE the old overlay that caused text to float on top of image */
.category-card .dp2rkksm {
  display: none !important;
}

/* Also hide the gradient overlay that was part of the old design */
.category-card .dpn5c10y {
  display: none !important;
}

/* TEXT CONTENT BLOCK - below the image, clean and readable */
.category-card .dpq68e8t {
  padding: 28px 28px 32px 28px !important;
  flex-grow: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  background-color: #ffffff !important;
  position: relative !important;
  overflow: visible !important;
}

/* Category title - show prominently in text area */
.category-card .dpq68e8t::before {
  content: attr(data-card-title) !important;
}

/* We'll inject the title into the dpq68e8t area via a separate approach */

/* Description text */
.category-card .dpq68e8t p,
.category-card .dpq68e8t .p1_regular {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: rgba(70, 70, 70, 1) !important;
  margin: 0 0 24px 0 !important;
  letter-spacing: -0.2px !important;
}

/* Card title (injected via JS below) */
.category-card-title-injected {
  font-family: 'Roboto', sans-serif !important;
  font-size: 26px !important;
  font-weight: 700 !important;
  color: #293920 !important;
  margin: 0 0 12px 0 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
}

/* Arrow button */
.category-card-arrow {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 48px !important;
  height: 48px !important;
  background-color: #FDE251 !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 14px rgba(253, 226, 81, 0.35) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  flex-shrink: 0 !important;
  align-self: flex-start !important;
}

.category-card:hover .category-card-arrow {
  background-color: #293920 !important;
  box-shadow: 0 4px 14px rgba(41, 57, 32, 0.3) !important;
}

.category-card-arrow svg {
  width: 22px !important;
  height: 22px !important;
  stroke: #293920 !important;
  transition: stroke 0.4s ease !important;
}

.category-card:hover .category-card-arrow svg {
  stroke: #FDE251 !important;
  transform: rotate(-45deg) !important;
}

/* Dark mode */
body.dark-mode .category-card {
  background-color: #1A2417 !important;
  border-color: rgba(220, 231, 182, 0.1) !important;
}

body.dark-mode .category-card .dpq68e8t {
  background-color: #1A2417 !important;
}

body.dark-mode .category-card .dpq68e8t p,
body.dark-mode .category-card .dpq68e8t .p1_regular {
  color: #BAC7B5 !important;
}

body.dark-mode .category-card-title-injected {
  color: #DCE7B6 !important;
}

/* Responsive */
@media (max-width: 991px) {
  .category-grid-mask {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 20px !important;
    padding: 0 16px !important;
  }
  .category-card .dpoc0gmd {
    height: 240px !important;
    min-height: 240px !important;
    max-height: 240px !important;
  }
  .category-card-title-injected {
    font-size: 22px !important;
  }
}

@media (max-width: 767px) {
  .category-grid-mask {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
  }
  .category-card .dpoc0gmd {
    height: 260px !important;
    min-height: 260px !important;
    max-height: 260px !important;
  }
}
</style>

<script id="category-cards-title-injector">
// Inject card titles into the text area so they appear below the image
(function() {
  var cardData = [
    { href: 'our-crops.html',  titleEn: 'Our Crops',          titleBn: 'আমাদের ফসল' },
    { href: 'seeds.html',      titleEn: 'Seeds & Farm Goods', titleBn: 'বীজ এবং খামারের পণ্য' },
    { href: 'products.html',   titleEn: 'Micronutrients',     titleBn: 'মাইক্রোনিউট্রিয়েন্টস' }
  ];

  function injectTitles() {
    var cards = document.querySelectorAll('.category-card');
    cards.forEach(function(card, i) {
      var textBlock = card.querySelector('.dpq68e8t');
      if (!textBlock) return;
      // Avoid double injection
      if (textBlock.querySelector('.category-card-title-injected')) return;

      var data = cardData[i];
      if (!data) return;

      var titleEl = document.createElement('p');
      titleEl.className = 'category-card-title-injected';

      var enSpan = document.createElement('span');
      enSpan.className = 'en-text';
      enSpan.textContent = data.titleEn;

      var bnSpan = document.createElement('span');
      bnSpan.className = 'bn-text';
      bnSpan.textContent = data.titleBn;

      titleEl.appendChild(enSpan);
      titleEl.appendChild(bnSpan);

      // Also add the arrow button
      var arrowDiv = document.createElement('div');
      arrowDiv.className = 'category-card-arrow';
      arrowDiv.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

      textBlock.insertBefore(titleEl, textBlock.firstChild);
      textBlock.appendChild(arrowDiv);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTitles);
  } else {
    injectTitles();
  }
})();
</script>
`;

// Find the section just before the category-grid-mask div and inject our CSS there
// We'll inject right before <div class="category-grid-mask">
const TARGET = '<div class="category-grid-mask">';
const targetIdx = content.indexOf(TARGET);

if (targetIdx === -1) {
  console.error('ERROR: Could not find <div class="category-grid-mask">');
  process.exit(1);
}

// Check if already injected
if (content.includes('category-cards-premium-fix')) {
  console.log('Premium fix already injected. Removing old injection first...');
  // Remove between <!-- CATEGORY-CARDS-FIX-START --> and <!-- CATEGORY-CARDS-FIX-END -->
  content = content.replace(/<style id="category-cards-premium-fix">[\s\S]*?<\/style>\s*<script id="category-cards-title-injector">[\s\S]*?<\/script>\s*/g, '');
  console.log('Old injection removed.');
}

// Inject right before the grid div
const before = content.substring(0, targetIdx);
const after = content.substring(targetIdx);
const fixed = before + premiumCategoryCSS + after;

fs.writeFileSync(indexPath, fixed, 'utf8');
console.log('SUCCESS: Premium category cards CSS + JS injected into index.html');
console.log('Verification - category-cards-premium-fix found:', fixed.includes('category-cards-premium-fix'));
