const fs = require('fs');
const path = require('path');

const dirs = ['e:/greenspout', 'e:/greenspout/site'];
let count = 0;

const translationInjection = `
<!-- AI TRANSLATOR ENGINE & PREMIUM UI TOGGLE -->
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
<div id="google_translate_element" style="display:none;"></div>
<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,bn', autoDisplay: false}, 'google_translate_element');
}
</script>
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

<div class="ai-lang-toggle" style="position: fixed; bottom: 30px; right: 30px; z-index: 99999; display: flex; align-items: center; background-color: var(--premade_template_dpw2cmzz, #5A6D3F); border-radius: 50px; padding: 5px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(253, 226, 81, 0.4); cursor: pointer; transition: transform 0.3s ease;">
    <div id="btn-en" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: Roboto, sans-serif; color: #293920; background-color: #FDE251; transition: all 0.3s ease;">EN</div>
    <div id="btn-bn" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: Roboto, sans-serif; color: #fff; background-color: transparent; transition: all 0.3s ease;">BN</div>
</div>

<style>
/* Hide Google Translate Default Overlays */
body { top: 0px !important; position: static !important; }
.skiptranslate iframe, .goog-te-banner-frame { display: none !important; }
.goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
.ai-lang-toggle:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }

/* Fix broken Bangla rendering */
body.lang-bn, 
body.lang-bn *,
body.lang-bn span,
body.lang-bn p,
body.lang-bn h1,
body.lang-bn h2,
body.lang-bn h3,
body.lang-bn h4,
body.lang-bn h5,
body.lang-bn h6,
body.lang-bn div,
body.lang-bn a,
body.lang-bn li,
body.lang-bn button {
    font-family: 'Hind Siliguri', Arial, sans-serif !important;
    letter-spacing: 0px !important;
    word-spacing: normal !important;
    text-transform: none !important;
    line-height: 1.4 !important;
}
body.lang-bn i, 
body.lang-bn [class*="icon"], 
body.lang-bn svg {
    font-family: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector('.ai-lang-toggle');
    if (!toggle) return;
    
    // Fall back to localStorage because local file:// protocol disables cookies entirely
    let savedLang = localStorage.getItem('ai-site-lang') || 'en';
    
    function setToggleUI(lang) {
        if (lang === 'bn') {
            document.querySelector('#btn-en').style.backgroundColor = 'transparent';
            document.querySelector('#btn-en').style.color = '#fff';
            document.querySelector('#btn-bn').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-bn').style.color = '#293920';
            document.body.classList.add('lang-bn');
            
            // Translate SVG Header & Footer logos dynamically
            document.querySelectorAll('svg text').forEach(el => {
                if (el.textContent.trim().toLowerCase() === 'ksfl agro ltd.') {
                    el.dataset.origText = el.textContent;
                    el.textContent = 'কেএসএফএল এগ্রো লিঃ';
                }
            });
        } else {
            document.querySelector('#btn-bn').style.backgroundColor = 'transparent';
            document.querySelector('#btn-bn').style.color = '#fff';
            document.querySelector('#btn-en').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-en').style.color = '#293920';
            document.body.classList.remove('lang-bn');
            
            // Revert SVG Header & Footer logos dynamically
            document.querySelectorAll('svg text').forEach(el => {
                if (el.textContent.trim() === 'কেএসএফএল এগ্রো লিঃ' || el.dataset.origText) {
                    el.textContent = el.dataset.origText || 'KSFL Agro Ltd.';
                }
            });
        }
    }
    
    setToggleUI(savedLang);
    
    // Check and trigger language combo on initial load
    if (savedLang === 'bn') {
        let attempts = 0;
        const checkExist = setInterval(function() {
            let select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = 'bn';
                select.dispatchEvent(new Event('change'));
                clearInterval(checkExist);
            }
            if (++attempts > 50) clearInterval(checkExist);
        }, 100);
    }

    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isEn = document.querySelector('#btn-en').style.backgroundColor !== 'transparent';
        const targetLang = isEn ? 'bn' : 'en';
        
        setToggleUI(targetLang);
        localStorage.setItem('ai-site-lang', targetLang);
        
        let select = document.querySelector('.goog-te-combo');
        if (select) {
            if (targetLang === 'bn') {
                select.value = 'bn';
            } else {
                select.value = '';
                if (select.value !== '') select.selectedIndex = 0;
            }
            select.dispatchEvent(new Event('change'));
        }
    });
});
</script>
<!-- END TOGGLE -->
</body>`;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove previous injections if any
        const oldRegex = /<!-- AI TRANSLATOR ENGINE & PREMIUM UI TOGGLE -->.*?<!-- END TOGGLE -->/gs;
        content = content.replace(oldRegex, '');
        
        // Inject before </body>
        content = content.replace(/<\/body>/i, translationInjection);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Injected translator into: ' + filePath);
        count++;
    });
});

console.log('Translation feature injection complete. Modified ' + count + ' files.');
