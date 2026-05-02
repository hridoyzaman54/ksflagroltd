const fs = require('fs');
const path = require('path');

// Setup image directory
const targetDir = 'e:/greenspout/assets/wp-content/uploads/team';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Map of source images (using the actual paths)
const images = [
    { src: 'C:/Users/HP/.gemini/antigravity/brain/95bbefc1-ecb5-4fb1-969c-3839d4caa017/team_ceo_1777671102449.png', dest: 'team_ceo.png' },
    { src: 'C:/Users/HP/.gemini/antigravity/brain/95bbefc1-ecb5-4fb1-969c-3839d4caa017/team_agronomist_1777671115805.png', dest: 'team_agronomist.png' },
    { src: 'C:/Users/HP/.gemini/antigravity/brain/95bbefc1-ecb5-4fb1-969c-3839d4caa017/team_operations_1777671129750.png', dest: 'team_operations.png' },
    { src: 'C:/Users/HP/.gemini/antigravity/brain/95bbefc1-ecb5-4fb1-969c-3839d4caa017/team_sustainability_1777671146243.png', dest: 'team_sustainability.png' }
];

// Copy images
images.forEach(img => {
    fs.copyFileSync(img.src, path.join(targetDir, img.dest));
});

console.log('Images copied successfully.');

// Prepare HTML content for the Team section
const teamHTML = `
<!-- OUR TEAM SECTION INJECTED BY AI -->
<section id="our-team" style="padding: 80px 0; background-color: var(--premade_template_dphdxhps);">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; font-family: var(--premade_template_dpteta8s);">
        
        <!-- Section Header -->
        <div style="text-align: center; margin-bottom: 60px;">
            <div style="color: var(--premade_template_dpw2cmzz); text-align: center; font-size: 16px; border-radius: 100px; padding: 8px 16px; border: 1px solid var(--premade_template_dp8lt4p6); display: inline-block; margin-bottom: 15px; font-weight: 500;">
                Our Team
            </div>
            <h2 class="h3 center" style="color: var(--premade_template_dprt5n21); margin-top: 10px;">The People Behind KSFL Agro Ltd.</h2>
        </div>

        <!-- CEO Spotlight -->
        <div style="display: flex; flex-wrap: wrap; background-color: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); margin-bottom: 40px;">
            <div style="flex: 1 1 400px; min-width: 300px;">
                <img src="./assets/wp-content/uploads/team/team_ceo.png" alt="CEO" style="width: 100%; height: 100%; object-fit: cover; min-height: 400px; display: block;">
            </div>
            <div style="flex: 1 1 500px; padding: 60px 40px; display: flex; flex-direction: column; justify-content: center;">
                <h3 style="font-size: 32px; color: var(--premade_template_dprt5n21); margin: 0 0 10px 0;">Jonathan Reynolds</h3>
                <span style="color: #FDE251; font-weight: bold; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px; display: inline-block; background-color: var(--premade_template_dprt5n21); padding: 5px 15px; border-radius: 5px;">Chief Executive Officer</span>
                <p style="color: #4a5d4e; font-size: 18px; line-height: 1.6; margin: 0;">Jonathan is a visionary leader with over 20 years of experience in sustainable agriculture. He believes that the future of farming lies in the perfect balance of traditional wisdom and modern innovation. Under his guidance, KSFL Agro Ltd. has expanded its reach globally while maintaining its core commitment to organic, eco-friendly farming practices that nourish both people and the planet.</p>
            </div>
        </div>

        <!-- Team Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            
            <!-- Team Member 1 -->
            <div style="background-color: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.04); transition: transform 0.3s ease;">
                <img src="./assets/wp-content/uploads/team/team_agronomist.png" alt="Agronomist" style="width: 100%; height: 350px; object-fit: cover; display: block;">
                <div style="padding: 25px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Elena Rostova</h4>
                    <span style="color: var(--premade_template_dpuu8y8d); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px;">Lead Agronomist</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 0;">Elena ensures our crops thrive naturally by developing cutting-edge organic soil management strategies.</p>
                </div>
            </div>

            <!-- Team Member 2 -->
            <div style="background-color: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.04); transition: transform 0.3s ease;">
                <img src="./assets/wp-content/uploads/team/team_operations.png" alt="Operations" style="width: 100%; height: 350px; object-fit: cover; display: block;">
                <div style="padding: 25px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">David Chen</h4>
                    <span style="color: var(--premade_template_dpuu8y8d); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px;">Head of Farm Operations</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 0;">David oversees daily logistics, ensuring our sustainable harvesting processes are as efficient as possible.</p>
                </div>
            </div>

            <!-- Team Member 3 -->
            <div style="background-color: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.04); transition: transform 0.3s ease;">
                <img src="./assets/wp-content/uploads/team/team_sustainability.png" alt="Sustainability" style="width: 100%; height: 350px; object-fit: cover; display: block;">
                <div style="padding: 25px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Sarah Jenkins</h4>
                    <span style="color: var(--premade_template_dpuu8y8d); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px;">Director of Sustainability</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.5; margin: 0;">Sarah spearheads our zero-waste initiatives, continually reducing our carbon footprint across all operations.</p>
                </div>
            </div>

        </div>
    </div>
</section>
<!-- END OUR TEAM SECTION -->
`;

// Read about.html
const aboutPath = 'e:/greenspout/about.html';
let content = fs.readFileSync(aboutPath, 'utf8');

// Find the insertion point: right before the footer wrapper.
// The footer wrapper starts with `<div class="kirki-s219-dpv862q9"` in about.html.
const insertTarget = '<div class="kirki-s219-dpv862q9"';

if (content.includes(insertTarget)) {
    // If we've already injected it, remove the old one first to be safe
    const oldSectionRegex = /<!-- OUR TEAM SECTION INJECTED BY AI -->.*?<!-- END OUR TEAM SECTION -->/gs;
    content = content.replace(oldSectionRegex, '');
    
    // Inject the new HTML
    content = content.replace(insertTarget, teamHTML + '\n' + insertTarget);
    
    fs.writeFileSync(aboutPath, content, 'utf8');
    console.log('Successfully injected Our Team section into about.html');
} else {
    console.error('Could not find the insertion target in about.html');
}
