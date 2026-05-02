const fs = require('fs');
const path = require('path');

const dir = 'e:/greenspout';
if (!fs.existsSync(dir)) {
    console.error('Workspace directory does not exist');
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacementFunction = `    function fixBanglaStyles() {
        const all = document.querySelectorAll('body, body *');
        all.forEach(el => {
            if (el.textContent && /[\\u0980-\\u09FF]/.test(el.textContent)) {
                el.style.setProperty('letter-spacing', 'normal', 'important');
                el.style.setProperty('letter-spacing', '0px', 'important');
                el.style.setProperty('word-spacing', 'normal', 'important');
                el.style.setProperty('text-transform', 'none', 'important');
                el.style.setProperty('font-family', "'Hind Siliguri', 'Noto Sans Bengali', Arial, sans-serif", 'important');
                el.style.setProperty('font-feature-settings', '"kern" 0, "liga" 1, "calt" 1', 'important');
            }
        });
    }

    function setToggleUI(lang) {
        if (lang === 'bn') {
            document.querySelector('#btn-en').style.backgroundColor = 'transparent';
            document.querySelector('#btn-en').style.color = '#fff';
            document.querySelector('#btn-bn').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-bn').style.color = '#293920';
            document.body.classList.add('lang-bn');
            translateDOM('bn');
            fixBanglaStyles();
            if (window.aiFixInterval) clearInterval(window.aiFixInterval);
            window.aiFixInterval = setInterval(fixBanglaStyles, 500);
        } else {
            document.querySelector('#btn-bn').style.backgroundColor = 'transparent';
            document.querySelector('#btn-bn').style.color = '#fff';
            document.querySelector('#btn-en').style.backgroundColor = '#FDE251';
            document.querySelector('#btn-en').style.color = '#293920';
            document.body.classList.remove('lang-bn');
            translateDOM('en');
            if (window.aiFixInterval) clearInterval(window.aiFixInterval);
            const all = document.querySelectorAll('body, body *');
            all.forEach(el => {
                if (el.style) {
                    el.style.removeProperty('letter-spacing');
                    el.style.removeProperty('word-spacing');
                    el.style.removeProperty('text-transform');
                    el.style.removeProperty('font-family');
                    el.style.removeProperty('font-feature-settings');
                }
            });
        }
    }`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /function setToggleUI[\s\S]*?translateDOM\('en'\);\s*\}\s*\}/;
    
    if (regex.test(content)) {
        content = content.replace(regex, replacementFunction);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated translator function in: ${file}`);
    } else {
        console.log(`Pattern not found in: ${file}`);
    }
});

console.log('Done.');
