const fs = require('fs');

const htmlContent = `
<section class="team-section" style="padding: 80px 20px; background-color: #F3F0EB; text-align: center;">
    <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 class="h2 center" style="color: #293920; margin-bottom: 50px; font-size: 48px; font-weight: 500;">Our Team</h2>
        
        <!-- Top 2 -->
        <div class="team-grid-top" style="display: flex; justify-content: center; gap: 40px; margin-bottom: 40px; flex-wrap: wrap;">
            <!-- MD MONWAR HOSSAIN -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(50% - 20px); max-width: 450px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 450px; overflow: hidden;">
                    <img src="./assets/images/team/monwar-hossain.jpg" alt="Md Monwar Hossain" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                </div>
                <div class="team-member-info" style="padding: 30px; text-align: center;">
                    <h3 style="color: #293920; margin: 0 0 8px 0; font-size: 24px; font-weight: 500;">Md Monwar Hossain</h3>
                    <p style="color: #657B46; font-weight: 500; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Chairman</p>
                    <div style="font-size: 15px; color: #555; display: flex; flex-direction: column; gap: 8px;">
                        <p style="margin: 0;"><strong>E-mail:</strong> <a href="mailto:monwar.hossain371@gmail.com" style="color: inherit; text-decoration: none;">monwar.hossain371@gmail.com</a></p>
                        <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:01715249371" style="color: inherit; text-decoration: none;">01715-249371</a></p>
                    </div>
                </div>
            </div>
            
            <!-- MD. SHOHEL AKTEAR PK -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(50% - 20px); max-width: 450px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 450px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(1).jpg" alt="Md. Shohel Aktear Pk" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                </div>
                <div class="team-member-info" style="padding: 30px; text-align: center;">
                    <h3 style="color: #293920; margin: 0 0 8px 0; font-size: 24px; font-weight: 500;">Md. Shohel Aktear Pk</h3>
                    <p style="color: #657B46; font-weight: 500; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Managing Director</p>
                    <div style="font-size: 15px; color: #555; display: flex; flex-direction: column; gap: 8px;">
                        <p style="margin: 0;"><strong>E-mail:</strong> <a href="mailto:shohelakter@gmail.com" style="color: inherit; text-decoration: none;">shohelakter@gmail.com</a></p>
                        <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:01580371162" style="color: inherit; text-decoration: none;">01580-371162</a></p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Bottom 3 -->
        <div class="team-grid-bottom" style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
            <!-- MD. KAISAR ALAM -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(33.333% - 20px); max-width: 380px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 380px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(2).jpeg" alt="Md. Kaisar Alam" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                </div>
                <div class="team-member-info" style="padding: 24px; text-align: center;">
                    <h3 style="color: #293920; margin: 0 0 8px 0; font-size: 20px; font-weight: 500;">Md. Kaisar Alam</h3>
                    <p style="color: #657B46; font-weight: 500; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Marketing Director</p>
                    <div style="font-size: 14px; color: #555; display: flex; flex-direction: column; gap: 6px;">
                        <p style="margin: 0;"><strong>E-mail:</strong> <a href="mailto:welcome.tuhin1234@gmail.com" style="color: inherit; text-decoration: none;">welcome.tuhin1234@gmail.com</a></p>
                        <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:01711076636" style="color: inherit; text-decoration: none;">01711-076636</a></p>
                    </div>
                </div>
            </div>
            
            <!-- MD ASADUZZAMAN -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(33.333% - 20px); max-width: 380px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 380px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(4).png" alt="Md Asaduzzaman" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                </div>
                <div class="team-member-info" style="padding: 24px; text-align: center;">
                    <h3 style="color: #293920; margin: 0 0 8px 0; font-size: 20px; font-weight: 500;">Md Asaduzzaman</h3>
                    <p style="color: #657B46; font-weight: 500; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Director</p>
                    <div style="font-size: 14px; color: #555; display: flex; flex-direction: column; gap: 6px;">
                        <p style="margin: 0;"><strong>E-mail:</strong> <a href="mailto:asadzaman665@gmail.com" style="color: inherit; text-decoration: none;">asadzaman665@gmail.com</a></p>
                        <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:01761302602" style="color: inherit; text-decoration: none;">01761-302602</a></p>
                    </div>
                </div>
            </div>

            <!-- MD NURZAMAN -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(33.333% - 20px); max-width: 380px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 380px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(5).png" alt="Md Nurzaman" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                </div>
                <div class="team-member-info" style="padding: 24px; text-align: center;">
                    <h3 style="color: #293920; margin: 0 0 8px 0; font-size: 20px; font-weight: 500;">Md Nurzaman</h3>
                    <p style="color: #657B46; font-weight: 500; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Finance Director</p>
                    <div style="font-size: 14px; color: #555; display: flex; flex-direction: column; gap: 6px;">
                        <p style="margin: 0;"><strong>E-mail:</strong> <a href="mailto:zamankbd@gmail.com" style="color: inherit; text-decoration: none;">zamankbd@gmail.com</a></p>
                        <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:01796930738" style="color: inherit; text-decoration: none;">01796-930738</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .team-member-card:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .team-member-card:hover .team-member-img-wrap img {
            transform: scale(1.05) !important;
        }
        @media screen and (max-width: 991px) {
            .team-grid-top, .team-grid-bottom {
                flex-direction: column;
                align-items: center;
                gap: 30px;
            }
            .team-member-card {
                width: 100% !important;
                max-width: 450px !important;
            }
            .team-member-img-wrap {
                height: 400px !important;
            }
        }
    </style>
</section>
`;

let aboutContent = fs.readFileSync('about.html', 'utf8');

// The marker to insert above
const marker = '<div class="kirki-default-container container" data-kirki="dpa7w8uo"><div class="dpsutauw" data-kirki="dpv4j9rq"><h2 class="h3 center" data-kirki="dpae9tht">Explore Our Farm And Organically Produced Products</h2>';

// Make sure we are inserting before the section container, maybe there's a wrapper.
// Let's look for this marker.
const idx = aboutContent.indexOf(marker);

if (idx !== -1) {
    // Insert right before
    aboutContent = aboutContent.substring(0, idx) + htmlContent + aboutContent.substring(idx);
    fs.writeFileSync('about.html', aboutContent, 'utf8');
    console.log("Successfully injected Our Team section.");
} else {
    console.error("Could not find the insertion marker.");
}
