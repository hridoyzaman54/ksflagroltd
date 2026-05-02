const fs = require('fs');
const path = require('path');

const dir = 'e:/greenspout';
if (!fs.existsSync(dir)) {
    console.error('Workspace directory does not exist');
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacementStyle = `<style>
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');

/* Specially Reset and Fix Bangla word/character scrambling issues completely */
html body.lang-bn, 
html body.lang-bn *,
html body.lang-bn span,
html body.lang-bn p,
html body.lang-bn a,
html body.lang-bn div,
html body.lang-bn h1,
html body.lang-bn h2,
html body.lang-bn h3,
html body.lang-bn h4,
html body.lang-bn h5,
html body.lang-bn h6,
html.lang-bn,
html.lang-bn *,
.lang-bn,
.lang-bn *,
body.lang-bn .elementor-heading-title,
body.lang-bn .section-title,
body.lang-bn [class*="title"],
body.lang-bn [id*="title"] {
    font-family: 'Hind Siliguri', 'Noto Sans Bengali', Arial, sans-serif !important;
    letter-spacing: normal !important;
    letter-spacing: 0px !important;
    word-spacing: normal !important;
    word-spacing: 0px !important;
    text-transform: none !important;
    font-style: normal !important;
    line-height: 1.5 !important;
    font-feature-settings: "kern" 0, "liga" 1, "calt" 1 !important;
    -webkit-font-variant-ligatures: common-ligatures !important;
    font-variant-ligatures: common-ligatures !important;
}
.ai-lang-toggle:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
</style>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Match previous injected style completely
    const styleRegex = /<style>\s*\/\* Specially Reset and Fix Bangla word\/character scrambling issues completely \*\/[\s\S]*?<\/style>/;
    
    if (styleRegex.test(content)) {
        content = content.replace(styleRegex, replacementStyle);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated styling in: ${file}`);
    } else {
        console.log(`Style pattern not found in: ${file}`);
    }
});

console.log('All styling fixes applied successfully.');
