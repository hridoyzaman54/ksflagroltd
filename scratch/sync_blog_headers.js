const fs = require('fs');
const path = require('path');

const root = 'e:\\greenspout';

// 1. Extract standard header from index.html
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const headerStartIdx = indexHtml.indexOf('<section class="kirki-s220-dp3o6qiv"');
const headerEndIdx = indexHtml.indexOf('</section>', headerStartIdx);

if (headerStartIdx === -1 || headerEndIdx === -1) {
  console.error('Error: Could not find standard header in index.html');
  process.exit(1);
}

const standardHeader = indexHtml.substring(headerStartIdx, headerEndIdx + '</section>'.length);
console.log('Successfully extracted standard header from index.html');

// 2. Define the 4 blog subpages
const blogSubpages = [
  'eco-friendly-habits-small-changes-for-a-greener-life/index.html',
  'ksfl-agros-guide-to-zerowaste-farming/index.html',
  'starting-your-first-organic-garden-a-beginners-guide/index.html',
  'top-5-lessons-learned-from-our-organic-farming-workshops/index.html'
];

// 3. For each subpage, adjust relative paths in header and replace
for (const subpage of blogSubpages) {
  const filePath = path.join(root, subpage);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing file: ${subpage}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Adjust standard header relative paths: "./" becomes "../" for subpages in folders
  // e.g. href="./index.html" -> href="../index.html"
  // e.g. src="./assets/logo.png" -> src="../assets/logo.png"
  const adjustedHeader = standardHeader
    .replace(/href="\.\//g, 'href="../')
    .replace(/src="\.\//g, 'src="../');

  // Find and replace <header>...</header>
  const headerStart = content.indexOf('<header>');
  const headerEnd = content.indexOf('</header>');

  if (headerStart === -1 || headerEnd === -1) {
    console.log(`Warning: Could not find <header> tag in ${subpage}`);
    continue;
  }

  // Find and replace <!-- Mobile Drawer --> ... <div class="mobile-menu-drawer"...>...</div>
  const drawerStart = content.indexOf('<div class="mobile-menu-drawer"');
  let drawerEnd = -1;
  if (drawerStart !== -1) {
    // Find the closing </div> of the mobile drawer
    // The drawer contains <ul><li>...</li></ul>, so let's find the closing </div> after </ul>
    const ulEnd = content.indexOf('</ul>', drawerStart);
    if (ulEnd !== -1) {
      drawerEnd = content.indexOf('</div>', ulEnd);
    }
  }

  if (drawerStart === -1 || drawerEnd === -1) {
    console.log(`Warning: Could not find mobile-menu-drawer in ${subpage}`);
    continue;
  }

  // Remove the hamburger toggle script block
  // Format:
  // // Hamburger toggle
  // const toggleBtn = document.getElementById('hamburger-toggle');
  // ...
  // }
  let scriptBlockStart = content.indexOf('// Hamburger toggle');
  let scriptBlockEnd = -1;
  if (scriptBlockStart !== -1) {
    // Find the enclosing <script> and </script> or just the lines of toggle
    const prevScriptTag = content.lastIndexOf('<script>', scriptBlockStart);
    const nextScriptEndTag = content.indexOf('</script>', scriptBlockStart);
    if (prevScriptTag !== -1 && nextScriptEndTag !== -1) {
      // Let's check if the script tag only contains hamburger toggle
      const scriptContent = content.substring(prevScriptTag, nextScriptEndTag + 9);
      if (scriptContent.includes('hamburger-toggle') && !scriptContent.includes('Translation')) {
        scriptBlockStart = prevScriptTag;
        scriptBlockEnd = nextScriptEndTag + 9;
      } else {
        // Just remove the hamburger lines inside the script
        scriptBlockEnd = content.indexOf('}', scriptBlockStart) + 1;
      }
    }
  }

  // Perform surgical replacement
  let newContent = content.substring(0, headerStart) + adjustedHeader + content.substring(headerEnd + 9);
  
  // Recalculate positions after header replacement
  const newDrawerStart = newContent.indexOf('<div class="mobile-menu-drawer"');
  let newDrawerEnd = -1;
  if (newDrawerStart !== -1) {
    const ulEnd = newContent.indexOf('</ul>', newDrawerStart);
    if (ulEnd !== -1) {
      newDrawerEnd = newContent.indexOf('</div>', ulEnd);
    }
  }

  if (newDrawerStart !== -1 && newDrawerEnd !== -1) {
    newContent = newContent.substring(0, newDrawerStart) + newContent.substring(newDrawerEnd + 6);
  }

  // Recalculate script positions and remove hamburger toggle logic
  const newScriptStart = newContent.indexOf('// Hamburger toggle');
  if (newScriptStart !== -1) {
    // Find closing brace of the toggle block
    const closingBrace = newContent.indexOf('}', newScriptStart);
    if (closingBrace !== -1) {
      // Let's remove from the start of toggleBtn declaration to closingBrace
      const startOfDecl = newContent.lastIndexOf('const toggleBtn', newScriptStart);
      if (startOfDecl !== -1) {
        newContent = newContent.substring(0, startOfDecl) + newContent.substring(closingBrace + 1);
      }
    }
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Successfully synchronized header and removed mobile-drawer/hamburger-toggle in: ${subpage}`);
}
