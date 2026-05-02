const fs = require('fs');
const path = require('path');

const aboutPath = 'e:/greenspout/about.html';
let content = fs.readFileSync(aboutPath, 'utf8');

// 1. REMOVE PREVIOUS INJECTION
const oldSectionRegex = /<!-- OUR TEAM SECTION INJECTED BY AI -->.*?<!-- END OUR TEAM SECTION -->\s*/gs;
content = content.replace(oldSectionRegex, '');

// 2. PREPARE PREMIUM HTML WITH ANIMATIONS AND HOVER EFFECTS
const teamHTML = `
<!-- OUR TEAM SECTION INJECTED BY AI -->
<style>
    #our-team {
        padding: 80px 0;
        background-color: var(--premade_template_dphdxhps);
        font-family: var(--premade_template_dpteta8s);
        overflow: hidden;
    }
    .team-header-badge {
        color: var(--premade_template_dpw2cmzz);
        text-align: center;
        font-size: 16px;
        border-radius: 100px;
        padding: 8px 16px;
        border: 1px solid var(--premade_template_dp8lt4p6);
        display: inline-block;
        margin-bottom: 15px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .team-header-title {
        color: var(--premade_template_dprt5n21);
        margin-top: 10px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.1s;
    }
    .team-ceo-card {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.05);
        margin-bottom: 40px;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
        cursor: pointer;
    }
    .team-ceo-card:hover {
        transform: translateY(25px) scale(1.01);
        box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    }
    .team-ceo-card.visible, .team-header-title.visible, .team-header-badge.visible, .team-member-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .team-ceo-card.visible:hover {
        transform: translateY(-5px);
    }
    .team-member-card {
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.04);
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        cursor: pointer;
    }
    .team-member-card:nth-child(1) { transition-delay: 0.3s; }
    .team-member-card:nth-child(2) { transition-delay: 0.4s; }
    .team-member-card:nth-child(3) { transition-delay: 0.5s; }
    
    .team-member-card:hover {
        box-shadow: 0 15px 35px rgba(0,0,0,0.08);
    }
    .team-member-card.visible:hover {
        transform: translateY(-8px);
    }
    .team-member-img-wrap {
        overflow: hidden;
        height: 350px;
    }
    .team-member-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.6s ease;
    }
    .team-ceo-card:hover .team-member-img, .team-member-card:hover .team-member-img {
        transform: scale(1.05);
    }
</style>

<section id="our-team">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Section Header -->
        <div style="text-align: center; margin-bottom: 60px;" class="team-anim-group">
            <div class="team-header-badge">Our Team</div>
            <h2 class="h3 center team-header-title">The People Behind KSFL Agro Ltd.</h2>
        </div>

        <!-- CEO Spotlight -->
        <div class="team-ceo-card">
            <div style="flex: 1 1 400px; min-width: 300px;" class="team-member-img-wrap">
                <img src="./assets/wp-content/uploads/team/team_ceo.png" alt="CEO" class="team-member-img">
            </div>
            <div style="flex: 1 1 500px; padding: 60px 40px; display: flex; flex-direction: column; justify-content: center;">
                <h3 style="font-size: 32px; color: var(--premade_template_dprt5n21); margin: 0 0 10px 0;">Jonathan Reynolds</h3>
                <span style="color: #FDE251; font-weight: bold; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px; display: inline-block; background-color: var(--premade_template_dprt5n21); padding: 5px 15px; border-radius: 5px; width: fit-content;">Chief Executive Officer</span>
                <p style="color: #4a5d4e; font-size: 18px; line-height: 1.6; margin: 0;">Jonathan is a visionary leader with over 20 years of experience in sustainable agriculture. He believes that the future of farming lies in the perfect balance of traditional wisdom and modern innovation. Under his guidance, KSFL Agro Ltd. has expanded its reach globally while maintaining its core commitment to organic, eco-friendly farming practices that nourish both people and the planet.</p>
            </div>
        </div>

        <!-- Team Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            
            <!-- Team Member 1 -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_agronomist.png" alt="Agronomist" class="team-member-img">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Elena Rostova</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Lead Agronomist</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Elena ensures our crops thrive naturally by developing cutting-edge organic soil management strategies.</p>
                </div>
            </div>

            <!-- Team Member 2 -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_operations.png" alt="Operations" class="team-member-img">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">David Chen</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Head of Farm Operations</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">David oversees daily logistics, ensuring our sustainable harvesting processes are as efficient as possible.</p>
                </div>
            </div>

            <!-- Team Member 3 -->
            <div class="team-member-card">
                <div class="team-member-img-wrap">
                    <img src="./assets/wp-content/uploads/team/team_sustainability.png" alt="Sustainability" class="team-member-img">
                </div>
                <div style="padding: 30px;">
                    <h4 style="font-size: 22px; color: var(--premade_template_dprt5n21); margin: 0 0 5px 0;">Sarah Jenkins</h4>
                    <span style="color: var(--premade_template_dprt5n21); font-weight: bold; font-size: 14px; display: block; margin-bottom: 15px; background-color: #FDE251; padding: 4px 10px; border-radius: 4px; width: fit-content;">Director of Sustainability</span>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">Sarah spearheads our zero-waste initiatives, continually reducing our carbon footprint across all operations.</p>
                </div>
            </div>

        </div>
    </div>
</section>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.team-header-badge, .team-header-title, .team-ceo-card, .team-member-card').forEach(el => {
            observer.observe(el);
        });
    });
</script>
<!-- END OUR TEAM SECTION -->
`;

// 3. INJECT HTML IN THE CORRECT PLACE
const targetClass = '<div class="kirki-s219-dps6xd5x"';

if (content.includes(targetClass)) {
    content = content.replace(targetClass, teamHTML + '\n' + targetClass);
    fs.writeFileSync(aboutPath, content, 'utf8');
    console.log('Successfully repositioned Our Team section in about.html');
} else {
    console.error('Could not find the target class in about.html to reposition the section.');
}
