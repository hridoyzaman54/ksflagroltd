const fs = require('fs');

const files = ['e:/greenspout/index.html', 'e:/greenspout/about.html'];

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Fix Tuhin's image if on about.html
  if (file.endsWith('about.html')) {
    const oldTuhin = './assets/wp-content/uploads/team/651141141_122098048281025059_3407779733275887259_n.jpg';
    const newTuhin = './assets/651141141_122098048281025059_3407779733275887259_n.jpg';
    if (html.includes(oldTuhin)) {
      html = html.replace(oldTuhin, newTuhin);
      changed = true;
    }
    // Also ensure the image has good styling
    html = html.replace(/class="team-member-img"/g, 'class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;"');
  }

  // 2. Enlarge Gallery Carousel
  // Find the CSS block for .discover-slider and .discover-slider-img-wrapper
  const oldWrapperCSS = '.discover-slider-img-wrapper{min-width:auto;width:100%;}';
  const newWrapperCSS = '.discover-slider-img-wrapper{min-width:480px;width:100%;}';
  
  const oldSliderCSS = '.discover-slider{display:flex;justify-content:flex-start;align-items:center;min-width:350%;column-gap:24px;}';
  const newSliderCSS = '.discover-slider{display:flex;justify-content:flex-start;align-items:center;min-width:fit-content;column-gap:32px;}';

  if (html.includes(oldWrapperCSS)) {
    html = html.replace(oldWrapperCSS, newWrapperCSS);
    changed = true;
  }
  if (html.includes(oldSliderCSS)) {
    html = html.replace(oldSliderCSS, newSliderCSS);
    changed = true;
  }

  // Also handle the tablet/mobile overrides if they exist
  const oldTabletSliderCSS = '.discover-slider{min-width:500%;column-gap:16px;}';
  const newTabletSliderCSS = '.discover-slider{min-width:fit-content;column-gap:24px;}';
  if (html.includes(oldTabletSliderCSS)) {
    html = html.replace(oldTabletSliderCSS, newTabletSliderCSS);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
  }
});
