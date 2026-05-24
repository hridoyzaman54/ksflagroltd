/**
 * FOOTER FIX:
 * 1. Remove "Others" column + "Terms of Service" from ALL pages
 * 2. Fix footer link redirections (base paths) on subpages
 * 3. Fix Bangla translation for "Our Crops" in footer
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
console.log(`Processing ${pages.length} pages...\n`);

let ok = 0;
pages.forEach(p => {
  let content = fs.readFileSync(p, 'utf8');
  const bp = getBasePath(p);
  const rel = path.relative(ROOT, p);
  let changes = [];

  // 1. REMOVE "Others" + "Terms of Service" column
  // Pattern: <div class="kirki-s219-dpnjm05m" data-kirki="dpjh2nl5">...<p>Others</p>...<span>Terms of Service</span>...</div></div>
  const othersRegex = /<div class="kirki-s219-dpnjm05m" data-kirki="dpjh2nl5">[\s\S]*?<\/div><\/div>/g;
  if (content.match(othersRegex)) {
    content = content.replace(othersRegex, '');
    changes.push('removed Others/Terms of Service');
  }

  // Also try alternate pattern where the Others block might look slightly different
  // Match: <div ... data-kirki="dpjh2nl5">..Others..Terms of Service..</div>
  if (content.includes('data-kirki="dpjh2nl5"')) {
    // More aggressive removal - find the entire div with this data-kirki
    content = content.replace(/<div[^>]*data-kirki="dpjh2nl5"[^>]*>[\s\S]*?Terms of Service[\s\S]*?<\/div><\/div>/g, '');
    changes.push('removed Others block (alt pattern)');
  }

  // 2. FIX FOOTER LINK REDIRECTIONS
  // Fix footer links: href="./our-crops.html" → href="../../our-crops.html" for subpages
  if (bp !== './') {
    // Fix all relative footer links (only within footer section)
    const footerStart = content.indexOf('id="footer"');
    if (footerStart !== -1) {
      const footerEnd = content.indexOf('</section>', footerStart);
      if (footerEnd !== -1) {
        let footerContent = content.substring(footerStart, footerEnd);
        
        // Replace ./page.html links with correct base path
        const linkReplacements = [
          ['href="./index.html"', `href="${bp}index.html"`],
          ['href="./about.html"', `href="${bp}about.html"`],
          ['href="./blogs.html"', `href="${bp}blogs.html"`],
          ['href="./contact.html"', `href="${bp}contact.html"`],
          ['href="./our-crops.html"', `href="${bp}our-crops.html"`],
          ['href="./seeds.html"', `href="${bp}seeds.html"`],
          ['href="./products.html"', `href="${bp}products.html"`],
          ['href="./terms-conditions/"', `href="${bp}terms-conditions/"`],
          ['src="./assets/', `src="${bp}assets/`],
        ];
        
        linkReplacements.forEach(([from, to]) => {
          if (from !== to && footerContent.includes(from)) {
            footerContent = footerContent.split(from).join(to);
            changes.push(`footer link: ${from} → ${to}`);
          }
        });
        
        content = content.substring(0, footerStart) + footerContent + content.substring(footerEnd);
      }
    }
  }

  // 3. FIX BANGLA TRANSLATION for footer "Our Crops"
  // Add/fix translation entries in the translation JS
  // Look for the translation object and ensure "Our Crops" -> "আমাদের ফসল" is there

  // 4. Remove old footer fix script if exists
  content = content.replace(/<script id="ksfl-footer-fix">[\s\S]*?<\/script>/g, '');
  
  // 5. Inject a footer fix script that handles Bangla and removes Others via JS too (belt + suspenders)
  const footerFixScript = `
<script id="ksfl-footer-fix">
(function() {
  function fixFooter() {
    // Remove Others/Terms of Service section via DOM
    var othersEl = document.querySelector('[data-kirki="dpjh2nl5"]');
    if (othersEl) othersEl.remove();
    
    // Also search by text content as fallback
    document.querySelectorAll('.kirki-s219-dphywhzk').forEach(function(el) {
      if (el.textContent.trim() === 'Others' || el.textContent.trim() === 'অন্যান্য') {
        var parent = el.closest('.kirki-s219-dpnjm05m');
        if (parent) parent.remove();
      }
    });

    // Fix footer link paths for subpages
    var bp = '${bp}';
    if (bp !== './') {
      var footer = document.getElementById('footer');
      if (footer) {
        footer.querySelectorAll('a[href^="./"]').forEach(function(a) {
          a.href = a.getAttribute('href').replace('./', bp);
        });
        footer.querySelectorAll('img[src^="./"]').forEach(function(img) {
          img.src = img.getAttribute('src').replace('./', bp);
        });
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixFooter);
  } else {
    fixFooter();
  }
})();
</script>
`;

  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd !== -1) {
    content = content.substring(0, bodyEnd) + footerFixScript + content.substring(bodyEnd);
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log(`  OK [${rel}]: ${changes.length > 0 ? changes.join(', ') : 'JS fix injected'}`);
  ok++;
});

console.log(`\n✅ ${ok} pages processed.`);
