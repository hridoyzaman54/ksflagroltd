/**
 * RESTORE about.html:
 * 1. Restore team section with original card style + images, just updated names/details
 * 2. Restore footer to dark green style (re-add missing background CSS)
 * Layout: 2 cards on top row (each half width), 3 cards on bottom row
 */
const fs = require('fs');

let about = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// ============================================
// 1. REPLACE TEAM SECTION
// ============================================
// Find the team section markers
const teamStart = about.indexOf('<!-- TEAM MEMBERS -->');
const teamEnd = about.indexOf('<!-- END OUR TEAM SECTION -->');

// If new markers don't exist, try old
let start = teamStart !== -1 ? teamStart : about.indexOf('<!-- CEO Spotlight -->');
let end = teamEnd;

if (start === -1) {
  console.log('ERROR: Cannot find team section start');
  process.exit(1);
}
if (end === -1) {
  console.log('ERROR: Cannot find team section end');
  process.exit(1);
}

const newTeamSection = `<!-- TEAM MEMBERS -->
        <!-- Row 1: 2 cards side by side (Chairman + Managing Director) -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 30px;">
            
            <!-- Card 1: Chairman -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_ceo.png" alt="Chairman" class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Md Monwar Hossain</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Chairman</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Email: monwar.hossain371@gmail.com<br>Phone: 01715-249371</p>
                </div>
            </div>

            <!-- Card 2: Managing Director -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/651141141_122098048281025059_3407779733275887259_n.jpg" alt="Managing Director" class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Md. Shohel Aktear Pk</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Managing Director</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Email: shohelakter@gmail.com<br>Phone: 01580-371162</p>
                </div>
            </div>
        </div>

        <!-- Row 2: 3 cards (Marketing Director + Director + Finance Director) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            
            <!-- Card 3: Marketing Director -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_operations.png" alt="Marketing Director" class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Md. Kaisar Alam</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Marketing Director</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Email: welcome.tuhin1234@gmail.com<br>Phone: 01711-076636</p>
                </div>
            </div>

            <!-- Card 4: Director -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_sustainability.png" alt="Director" class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Md Asaduzzaman</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Director</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Email: asadzaman665@gmail.com<br>Phone: 01761-302602</p>
                </div>
            </div>

            <!-- Card 5: Finance Director -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_ceo.png" alt="Finance Director" class="team-member-img" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Md Nurzaman</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Finance Director</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Email: zamankbd@gmail.com<br>Phone: 01796-930738</p>
                </div>
            </div>

        </div>

        <style>
        @media (max-width: 768px) {
            div[style*="grid-template-columns: repeat(2, 1fr)"] {
                grid-template-columns: 1fr !important;
            }
        }
        </style>
`;

about = about.substring(0, start) + newTeamSection + about.substring(end);
console.log('✅ Team section restored with original card style + images');

// ============================================
// 2. FIX FOOTER - Restore dark green background
// ============================================
// The footer section has class kirki-s219-dpbrehze which needs the dark bg
// Check if the footer CSS rule exists
const footerBgRule = '.kirki-s219-dpbrehze{';
if (!about.includes('background-image:url(./assets/wp-content/uploads/2025/11/footer-img.webp)')) {
  // The footer background style is missing - need to add it 
  // Check if the style block exists
  const footerStyleId = 'id="ksfl-footer-fix"';
  const footerStyleBlock = about.indexOf(footerStyleId);
  
  if (footerStyleBlock !== -1) {
    // Find the start of this style tag
    const styleStart = about.lastIndexOf('<style', footerStyleBlock);
    const styleEnd = about.indexOf('</style>', footerStyleBlock) + '</style>'.length;
    const oldStyle = about.substring(styleStart, styleEnd);
    
    // Check if the dpbrehze rule is in it
    if (!oldStyle.includes('.kirki-s219-dpbrehze')) {
      // Add the background rule
      const newRule = `.kirki-s219-dpbrehze{background-image:url(./assets/wp-content/uploads/2025/11/footer-img.webp);background-size:cover;background-repeat:no-repeat;background-position:50% 50%;background-color:#293920}`;
      const insertPoint = about.indexOf('{', about.indexOf(footerStyleId)) + 1;
      // Actually let's just add it as a separate style
      const headEnd = about.indexOf('</head>');
      if (headEnd !== -1) {
        const footerBgCss = `\n<style id="ksfl-footer-bg">\n.kirki-s219-dpbrehze{background-image:url(./assets/wp-content/uploads/2025/11/footer-img.webp) !important;background-size:cover !important;background-repeat:no-repeat !important;background-position:50% 50% !important;background-color:#293920 !important}\n</style>\n`;
        about = about.substring(0, headEnd) + footerBgCss + about.substring(headEnd);
        console.log('✅ Footer dark background restored');
      }
    }
  }
}

// Also check if the footer bg style already exists somewhere
if (!about.includes('ksfl-footer-bg')) {
  const headEnd = about.indexOf('</head>');
  if (headEnd !== -1) {
    const footerBgCss = `\n<style id="ksfl-footer-bg">\n.kirki-s219-dpbrehze{background-image:url(./assets/wp-content/uploads/2025/11/footer-img.webp) !important;background-size:cover !important;background-repeat:no-repeat !important;background-position:50% 50% !important;background-color:#293920 !important}\n</style>\n`;
    about = about.substring(0, headEnd) + footerBgCss + about.substring(headEnd);
    console.log('✅ Footer dark background CSS added');
  }
}

// Remove any leftover ksfl-team-* CSS that shouldn't be there
about = about.replace(/<style>\s*\.ksfl-team-grid[\s\S]*?<\/style>/g, '');

fs.writeFileSync('e:\\greenspout\\about.html', about, 'utf8');
console.log('✅ about.html saved');
