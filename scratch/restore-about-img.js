const fs = require('fs');
let html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

// We have two identical replacement strings now:
const replacement = `<img class="kirki-image" data-kirki="dpp3q7hr" src="./assets/ksfl-hero-logo.png" alt="KSFL Agro Ltd." style="width: 100%; max-width: 500px; height: auto; display: block; margin: 0 auto; object-fit: contain;">`;

const parts = html.split(replacement);
if (parts.length === 3) {
    // parts[0] is before the first logo
    // parts[1] is between the first and second logo
    // parts[2] is after the second logo
    
    // The first one was ksfl-logo-1.png which we WANT to be ksfl-hero-logo.png.
    // The second one was about-img-1.webp which we WANT to RESTORE to about-img-1.webp.
    
    // Wait, let's check which is which by looking at context.
    const context1 = parts[0].substring(parts[0].length - 100);
    const context2 = parts[1].substring(parts[1].length - 100);
    console.log("Context 1:", context1);
    console.log("Context 2:", context2);
    
    // Restore the second one
    const restoreAboutImg1 = `<img class="kirki-image dp8ypcl2" data-kirki="dpp3q7hr" src="./assets/wp-content/uploads/2025/11/about-img-1.webp" alt="about-img-1" srcset="./assets/wp-content/uploads/2025/11/about-img-1-300x226.webp 300w, ./assets/wp-content/uploads/2025/11/about-img-1-1024x772.webp 1024w, ./assets/wp-content/uploads/2025/11/about-img-1-768x579.webp 768w, ./assets/wp-content/uploads/2025/11/about-img-1.webp 1334w" sizes="(max-width: 1334px) 100vw, 1334px" loading="lazy" width="auto" height="auto" />`;
    
    html = parts[0] + replacement + parts[1] + restoreAboutImg1 + parts[2];
    fs.writeFileSync('e:/greenspout/about.html', html, 'utf8');
    console.log("Restored about-img-1.webp successfully.");
} else {
    console.log(`Unexpected number of parts: ${parts.length}`);
}
