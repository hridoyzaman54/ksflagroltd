const fs = require('fs');
const path = require('path');

// 1. Fix about.html team section
let about = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// Find and replace the team section between <!-- CEO Spotlight --> and the closing grid div
const startMarker = '<!-- CEO Spotlight -->';
const endMarker = '<!-- END OUR TEAM SECTION -->';
const startIdx = about.indexOf(startMarker);
const endIdx = about.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('ERROR: Could not find team markers', startIdx, endIdx);
  // Try alternative approach - look for Monwar Hossain
  const altStart = about.indexOf('team-ceo-card');
  const altEnd = about.indexOf('</section>', altStart);
  console.log('Alt markers:', altStart, altEnd);
}

// The new team HTML
const newTeamHTML = `<!-- TEAM MEMBERS -->
        <style>
        .ksfl-team-grid { display: grid; gap: 24px; }
        .ksfl-team-row-2 { grid-template-columns: repeat(2, 1fr); }
        .ksfl-team-row-3 { grid-template-columns: repeat(3, 1fr); }
        .ksfl-team-card {
            background: #fff; border-radius: 20px; overflow: hidden;
            box-shadow: 0 4px 24px rgba(41,57,32,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ksfl-team-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(41,57,32,0.15); }
        .ksfl-team-avatar {
            width: 90px; height: 90px; border-radius: 50%;
            background: linear-gradient(135deg, #293920, #3d5a2e);
            display: flex; align-items: center; justify-content: center;
            font-family: 'Roboto', sans-serif; font-size: 28px; font-weight: 700;
            color: #FDE251; letter-spacing: 1px; margin: 0 auto 16px;
            box-shadow: 0 4px 16px rgba(41,57,32,0.2);
        }
        .ksfl-team-body { padding: 32px 28px; text-align: center; }
        .ksfl-team-name { font-family: 'Roboto', sans-serif; font-size: 20px; font-weight: 600; color: var(--premade_template_dprt5n21, #293920); margin: 0 0 10px; letter-spacing: -0.5px; }
        .ksfl-team-badge { display: inline-block; background: #FDE251; color: var(--premade_template_dprt5n21, #293920); font-family: 'Roboto', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
        .ksfl-team-contact { display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .ksfl-team-contact a { display: flex; align-items: center; gap: 8px; color: #5a6d3f; font-family: 'Roboto', sans-serif; font-size: 13px; text-decoration: none; transition: color 0.2s; }
        .ksfl-team-contact a:hover { color: #293920; }
        .ksfl-team-contact svg { width: 15px; height: 15px; flex-shrink: 0; }
        @media (max-width: 991px) { .ksfl-team-row-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 575px) { .ksfl-team-row-2, .ksfl-team-row-3 { grid-template-columns: 1fr; } .ksfl-team-body { padding: 24px 20px; } .ksfl-team-avatar { width: 72px; height: 72px; font-size: 22px; } }
        </style>

        <div class="ksfl-team-grid ksfl-team-row-2">
            <div class="ksfl-team-card team-member-card"><div class="ksfl-team-body">
                <div class="ksfl-team-avatar">MH</div>
                <h4 class="ksfl-team-name">Md Monwar Hossain</h4>
                <span class="ksfl-team-badge"><span class="en-text">Chairman</span><span class="bn-text" style="display:none">\u099A\u09C7\u09AF\u09BC\u09BE\u09B0\u09AE\u09CD\u09AF\u09BE\u09A8</span></span>
                <div class="ksfl-team-contact">
                    <a href="mailto:monwar.hossain371@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg> monwar.hossain371@gmail.com</a>
                    <a href="tel:+8801715249371"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 01715-249371</a>
                </div>
            </div></div>
            <div class="ksfl-team-card team-member-card"><div class="ksfl-team-body">
                <div class="ksfl-team-avatar">SA</div>
                <h4 class="ksfl-team-name">Md. Shohel Aktear Pk</h4>
                <span class="ksfl-team-badge"><span class="en-text">Managing Director</span><span class="bn-text" style="display:none">\u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u0995</span></span>
                <div class="ksfl-team-contact">
                    <a href="mailto:shohelakter@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg> shohelakter@gmail.com</a>
                    <a href="tel:+8801580371162"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 01580-371162</a>
                </div>
            </div></div>
        </div>

        <div class="ksfl-team-grid ksfl-team-row-3" style="margin-top: 24px;">
            <div class="ksfl-team-card team-member-card"><div class="ksfl-team-body">
                <div class="ksfl-team-avatar">KA</div>
                <h4 class="ksfl-team-name">Md. Kaisar Alam</h4>
                <span class="ksfl-team-badge"><span class="en-text">Marketing Director</span><span class="bn-text" style="display:none">\u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u0995</span></span>
                <div class="ksfl-team-contact">
                    <a href="mailto:welcome.tuhin1234@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg> welcome.tuhin1234@gmail.com</a>
                    <a href="tel:+8801711076636"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 01711-076636</a>
                </div>
            </div></div>
            <div class="ksfl-team-card team-member-card"><div class="ksfl-team-body">
                <div class="ksfl-team-avatar">MA</div>
                <h4 class="ksfl-team-name">Md Asaduzzaman</h4>
                <span class="ksfl-team-badge"><span class="en-text">Director</span><span class="bn-text" style="display:none">\u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u0995</span></span>
                <div class="ksfl-team-contact">
                    <a href="mailto:asadzaman665@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg> asadzaman665@gmail.com</a>
                    <a href="tel:+8801761302602"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 01761-302602</a>
                </div>
            </div></div>
            <div class="ksfl-team-card team-member-card"><div class="ksfl-team-body">
                <div class="ksfl-team-avatar">MN</div>
                <h4 class="ksfl-team-name">Md Nurzaman</h4>
                <span class="ksfl-team-badge"><span class="en-text">Finance Director</span><span class="bn-text" style="display:none">\u0985\u09B0\u09CD\u09A5 \u09AA\u09B0\u09BF\u099A\u09BE\u09B2\u0995</span></span>
                <div class="ksfl-team-contact">
                    <a href="mailto:zamankbd@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg> zamankbd@gmail.com</a>
                    <a href="tel:+8801796930738"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 01796-930738</a>
                </div>
            </div></div>
        </div>

        <script>
        (function(){
          function syncTeamLang(){
            var bn=document.body.classList.contains('bn-active');
            document.querySelectorAll('.ksfl-team-card .en-text').forEach(function(e){e.style.display=bn?'none':'';});
            document.querySelectorAll('.ksfl-team-card .bn-text').forEach(function(e){e.style.display=bn?'':'none';});
          }
          syncTeamLang();
          new MutationObserver(syncTeamLang).observe(document.body,{attributes:true,attributeFilter:['class']});
        })();
        </script>
`;

// Replace old team section
about = about.substring(0, startIdx) + newTeamHTML + about.substring(endIdx);

// Also add translation entries for team titles
const teamTranslations = {
  "Chairman": "চেয়ারম্যান",
  "Managing Director": "ব্যবস্থাপনা পরিচালক",
  "Marketing Director": "মার্কেটিং পরিচালক",
  "Director": "পরিচালক",
  "Finance Director": "অর্থ পরিচালক",
  "Chief Executive Officer": "প্রধান নির্বাহী কর্মকর্তা",
  "Monwar Hossain": "মনোয়ার হোসেন",
  "Md Monwar Hossain": "মো. মনোয়ার হোসেন",
  "Md. Shohel Aktear Pk": "মো. শোহেল আক্তার পিকে",
  "Md. Kaisar Alam": "মো. কায়সার আলম",
  "Md Asaduzzaman": "মো. আসাদুজ্জামান",
  "Md Nurzaman": "মো. নুরজামান"
};

// Find the translation object in about.html and add team translations
const transMarker = '"Monwar Hossain": "মনোয়ার হোসেন"';
if (about.includes(transMarker)) {
  let replacement = transMarker;
  for (const [en, bn] of Object.entries(teamTranslations)) {
    if (en !== "Monwar Hossain" && !about.includes(`"${en}": "${bn}"`)) {
      replacement += `,\n        "${en}": "${bn}"`;
    }
  }
  about = about.replace(transMarker, replacement);
  console.log('Added team translations');
}

fs.writeFileSync('e:\\greenspout\\about.html', about, 'utf8');
console.log('✅ about.html team section updated');

// 2. Fix homepage products bug - delete kirkiInteractions for dpkzemwd
const ROOT = 'e:\\greenspout';
const pages = [
  'index.html', 'our-crops.html', 'about.html', 'blogs.html', 'contact.html', 'seeds.html', 'products.html'
];

// Add all crop detail pages
const cropsDir = path.join(ROOT, 'our-crops');
if (fs.existsSync(cropsDir)) {
  fs.readdirSync(cropsDir).forEach(f => {
    const idx = path.join(cropsDir, f, 'index.html');
    if (fs.existsSync(idx)) pages.push(path.relative(ROOT, idx).replace(/\\/g, '/'));
  });
}
// Blog pages
fs.readdirSync(ROOT).forEach(item => {
  if (!['our-crops','site','scratch','node_modules','assets','.git'].includes(item)) {
    const idx = path.join(ROOT, item, 'index.html');
    if (fs.existsSync(idx)) pages.push(path.relative(ROOT, idx).replace(/\\/g, '/'));
  }
});

let fixedProducts = 0;
[...new Set(pages)].forEach(rel => {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  
  // Remove old products fix script
  content = content.replace(/<script id="ksfl-products-fix">[\s\S]*?<\/script>/g, '');
  
  // Add script to neutralize kirki products dropdown animation
  const productsFixScript = `
<script id="ksfl-products-fix">
// Prevent kirki from animating the old products dropdown
(function(){
  function killKirkiDropdown(){
    if(window.kirkiInteractions&&window.kirkiInteractions.dpkzemwd){
      delete window.kirkiInteractions.dpkzemwd;
    }
    // Also force-hide the original kirki dropdown
    var dd=document.querySelector('.kirki-s220-dpi8cdrc');
    if(dd){dd.style.cssText='display:none!important;height:0!important;overflow:hidden!important;pointer-events:none!important';}
  }
  killKirkiDropdown();
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',killKirkiDropdown);}
  setTimeout(killKirkiDropdown,500);
  setTimeout(killKirkiDropdown,2000);
})();
</script>
`;
  
  const bodyEnd = content.lastIndexOf('</body>');
  if (bodyEnd !== -1) {
    content = content.substring(0, bodyEnd) + productsFixScript + content.substring(bodyEnd);
    fs.writeFileSync(p, content, 'utf8');
    fixedProducts++;
  }
});

console.log(`✅ ${fixedProducts} pages: kirki products dropdown neutralized`);
