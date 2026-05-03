const fs = require('fs');
const path = require('path');

const files = [
  'E:/greenspout/about.html',
  'E:/greenspout/blogs.html',
  'E:/greenspout/contact.html',
  'E:/greenspout/extracted_products_subpage.html',
  'E:/greenspout/index.html',
  'E:/greenspout/preview.html',
  'E:/greenspout/products.html',
  'E:/greenspout/seeds.html',
  'E:/greenspout/site/index.html'
];

const mobileStyle = `
<!-- START MOBILE OPTIMIZATIONS -->
<style>
@media screen and (max-width: 768px) {
    /* Prevent any horizontal scrolling */
    html, body {
        overflow-x: hidden !important;
        max-width: 100vw !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    
    /* Container constraint to avoid overflowing */
    .container, .row-wrapper, .row {
        max-width: 100% !important;
        width: 100% !important;
        box-sizing: border-box !important;
        margin: 0 auto !important;
        padding-left: 15px !important;
        padding-right: 15px !important;
    }

    /* Team & CEO Spotlight Section stack fix */
    .team-ceo-card {
        flex-direction: column !important;
        padding: 20px 10px !important;
        display: flex !important;
    }
    .team-ceo-card > div {
        flex: 1 1 auto !important;
        width: 100% !important;
        min-width: 100% !important;
        padding: 20px 10px !important;
    }
    .team-ceo-card .team-member-img-wrap {
        height: auto !important;
        max-height: 400px !important;
    }
    .team-member-card {
        margin-bottom: 20px !important;
    }

    /* Premium typography scaling on mobile */
    h1, .h1 { font-size: 30px !important; line-height: 1.2 !important; }
    h2, .h2 { font-size: 24px !important; line-height: 1.25 !important; }
    h3, .h3 { font-size: 20px !important; line-height: 1.3 !important; }
    p, span, a { font-size: 15px !important; line-height: 1.5 !important; }
}
</style>
<!-- END MOBILE OPTIMIZATIONS -->`;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping non-existent file: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Check if styles already inserted
  if (!content.includes('START MOBILE OPTIMIZATIONS')) {
    content = content.replace(
      /<meta name="viewport" content="width=device-width, initial-scale=1">/i,
      `<meta name="viewport" content="width=device-width, initial-scale=1">${mobileStyle}`
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Successfully added mobile optimizations to ${file}`);
  } else {
    console.log(`Already optimized ${file}`);
  }
});
