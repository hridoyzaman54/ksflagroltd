const fs = require('fs');
const path = require('path');

const targetFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'blogs.html',
  'products.html',
  'seeds.html',
  'preview.html'
];

const cssTag = '  <link rel="stylesheet" href="./assets/css/parallax-animations.css">\n';
const jsTag = '<script src="./assets/js/parallax-animations.js" defer></script>\n';

targetFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${file} does not exist. Skipping...`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Avoid duplicate injection
  if (html.includes('parallax-animations.css') || html.includes('parallax-animations.js')) {
    console.log(`Parallax assets already injected in ${file}. Cleaning first...`);
    html = html.replace(/<link rel="stylesheet" href="\.\/assets\/css\/parallax-animations\.css">\s*/g, '');
    html = html.replace(/<script src="\.\/assets\/js\/parallax-animations\.js" defer><\/script>\s*/g, '');
  }

  // Inject CSS right before </head>
  const headIndex = html.indexOf('</head>');
  if (headIndex !== -1) {
    html = html.slice(0, headIndex) + cssTag + html.slice(headIndex);
  } else {
    console.error(`Could not locate </head> in ${file}`);
    return;
  }

  // Inject JS right before </body>
  const bodyIndex = html.indexOf('</body>');
  if (bodyIndex !== -1) {
    html = html.slice(0, bodyIndex) + jsTag + html.slice(bodyIndex);
  } else {
    console.error(`Could not locate </body> in ${file}`);
    return;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Successfully injected parallax assets into ${file}`);
});
