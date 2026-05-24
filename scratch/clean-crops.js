const fs = require('fs');
const path = require('path');

const cropsDir = path.join(__dirname, '..', 'our-crops');
const catalogPath = path.join(__dirname, '..', 'our-crops.html');

const crops = [
  {
    id: "rice",
    scientific: "Oryza sativa",
    titleEn: "Rice",
    titleBn: "ধান",
    descEn: "High-yield organic long grain rice, locally harvested with care.",
    descBn: "আমাদের খামারে উৎপাদিত উচ্চ ফলনশীল ও পুষ্টিকর ধান।",
    img: "rice.png"
  },
  {
    id: "bottle-gourd",
    scientific: "Lagenaria siceraria",
    titleEn: "Bottle Gourd",
    titleBn: "লাউ",
    descEn: "Tender, water-rich bottle gourds grown in natural conditions.",
    descBn: "ভিটামিন সমৃদ্ধ তাজা কচি লাউ সরাসরি আমাদের খামার থেকে।",
    img: "bottle-gourd.png"
  },
  {
    id: "sweet-pumpkin",
    scientific: "Cucurbita moschata",
    titleEn: "Sweet Pumpkin",
    titleBn: "মিষ্টি কুমড়া",
    descEn: "Vibrant orange organic pumpkins packed with vitamin A.",
    descBn: "অত্যন্ত পুষ্টিকর এবং মিষ্টি স্বাদের তাজা মিষ্টি কুমড়া।",
    img: "sweet-pumpkin.png"
  },
  {
    id: "cucumber",
    scientific: "Cucumis sativus",
    titleEn: "Cucumber",
    titleBn: "শসা",
    descEn: "Crunchy, refreshing organic cucumbers for daily health.",
    descBn: "অত্যন্ত সতেজ এবং ক্রাঞ্চি ও সুস্বাদু সালাদ শসা।",
    img: "cucumber.png"
  },
  {
    id: "radish",
    scientific: "Raphanus sativus",
    titleEn: "Radish",
    titleBn: "মূলা",
    descEn: "Crisp, organically cultivated white radishes full of minerals.",
    descBn: "খনিজ সমৃদ্ধ ও হজমে সাহায্যকারী সতেজ সাদা মূলা।",
    img: "radish.png"
  },
  {
    id: "pointed-gourd",
    scientific: "Trichosanthes dioica",
    titleEn: "Pointed Gourd",
    titleBn: "পটল",
    descEn: "Delicious green pointed gourds, a staple Bangladeshi vegetable.",
    descBn: "দেশীয় ঐতিহ্যবাহী ও সুস্বাদু সতেজ পটল।",
    img: "pointed-gourd.png"
  },
  {
    id: "okra",
    scientific: "Abelmoschus esculentus",
    titleEn: "Okra",
    titleBn: "ঢেঁড়স",
    descEn: "Tender, high-fiber okra pods grown with pure organic manure.",
    descBn: "ফাইবার সমৃদ্ধ অত্যন্ত কচি ও পুষ্টিকর সুস্বাদু ঢেঁড়স।",
    img: "okra.png"
  },
  {
    id: "bitter-gourd",
    scientific: "Momordica charantia",
    titleEn: "Bitter Gourd",
    titleBn: "করলা",
    descEn: "Nutrient-dense bitter gourd, famous for its health benefits.",
    descBn: "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিকারী প্রিমিয়াম করলা।",
    img: "bitter-gourd.png"
  },
  {
    id: "eggplant",
    scientific: "Solanum melongena",
    titleEn: "Eggplant",
    titleBn: "বেগুন",
    descEn: "Plump and glossy organic purple eggplants, perfect for roasting.",
    descBn: "নরম ও আকর্ষণীয় কচি গোল বেগুন সরাসরি বাগান থেকে।",
    img: "eggplant.png"
  },
  {
    id: "potato",
    scientific: "Solanum tuberosum",
    titleEn: "Potato",
    titleBn: "গোল আলু",
    descEn: "Healthy, organic round potatoes loaded with complex carbs.",
    descBn: "প্রতিদিনের প্রয়োজনীয় ও স্বাস্থ্যকর তাজা গোল আলু।",
    img: "potato.png"
  }
];

// Helper to generate the premium carousel HTML for a crop detail page
function generateCarouselHTML(currentCropId) {
  const filteredCrops = crops.filter(c => c.id !== currentCropId);
  let cardsHtml = '';
  
  filteredCrops.forEach(c => {
    cardsHtml += `
      <a class="crop-card" href="../${c.id}/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="../../assets/crops/${c.img}" alt="${c.titleEn}" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">${c.scientific}</span>
            <h3 class="crop-title">
              <span class="en-text">${c.titleEn}</span>
              <span class="bn-text">${c.titleBn}</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">${c.descEn}</span>
              <span class="bn-text">${c.descBn}</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>`;
  });

  return `
        <!-- Related Crops Carousel -->
        <div class="related-section">
          <h2 class="font-primary2" style="text-align: center; margin-bottom: 40px;">
            <span class="en-text">Explore Other Grown Crops</span>
            <span class="bn-text">আমাদের অন্যান্য উৎপাদিত ফসল</span>
          </h2>
          
          <div class="crops-carousel-container">
            <!-- Left Arrow -->
            <button class="carousel-arrow left-arrow" aria-label="Previous crops">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <!-- Viewport -->
            <div class="carousel-viewport">
              <div class="carousel-track">
                ${cardsHtml}
              </div>
            </div>
            
            <!-- Right Arrow -->
            <button class="carousel-arrow right-arrow" aria-label="Next crops">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
  `;
}

// Generate the premium footer HTML with correctly structured relative paths (rootRel)
function generateFooterHTML(rootRel) {
  return `
    <!-- Start Footer Section -->
    <section class="kirki-s219-dpbrehze" data-kirki="dpg8ljjj" id="footer" style="position: relative; background-image: url('${rootRel}assets/wp-content/uploads/2025/11/footer-img.webp'); background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
      <div class="kirki-s219-dps6xd5x">
        <div class="kirki-s219-dp6c8s2r kirki-s219-dpgjydqc">
          <div class="kirki-s219-dp3tddhy">
            <div class="kirki-s219-dptldnyq">
              <div class="kirki-s219-dp87431g">
                <h2 class="kirki-s219-dpk590pv kirki-s219-dpo2pb78" style="color: #FDE251;">Let’s grow healthier together</h2>
                <div class="kirki-s219-dpkr8zeb">
                  <p class="kirki-s219-dp8uxjnw kirki-s219-dpo2pb78" style="color: #FFFFFF;">We envision a future where innovation nourishes the earth and enhances sustainable agriculture.</p>
                </div>
              </div>
              <a class="kirki-s219-dplr6hng kirki-inline-element" href="${rootRel}contact.html">
                <div class="kirki-s219-dpzn1un8">
                  <span class="kirki-s219-dpgarj7g kirki-s219-dpclh94s">Contact Us</span>
                </div>
                <svg class="kirki-s219-dpv5h2iw" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1.6102 7.74994L14.2348 7.74994L11.5675 5.28022C11.2512 4.98732 11.2512 4.51256 11.5675 4.21967C11.8838 3.92678 12.3966 3.92678 12.7129 4.21967L16.7629 7.96967L16.8183 8.0268C17.0777 8.32138 17.0594 8.75563 16.7629 9.03022L12.7129 12.7802C12.3966 13.0731 11.8838 13.0731 11.5675 12.7802C11.2512 12.4873 11.2512 12.0126 11.5675 11.7197L14.2348 9.24994L1.6102 9.24994C1.16285 9.24994 0.800201 8.91416 0.800201 8.49994C0.800201 8.08573 1.16285 7.74994 1.6102 7.74994Z" fill="#293920"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="kirki-s219-dp0evq34">
        <div class="kirki-s219-dp6c8s2r kirki-s219-dpgjydqc">
          <div class="kirki-s219-dpfnjtmn">
            <div class="kirki-s219-dp7tb1f4">
              <div class="kirki-s219-dp5ekf8m">
                <div class="kirki-s219-dpnjm05m">
                  <p class="kirki-s219-dphywhzk kirki-s219-dpw94s95" style="color: #FDE251;">Quick Links</p>
                  <div class="kirki-s219-dpgjvbot">
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}index.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Home</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}about.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">About</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}blogs.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Blogs</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}contact.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Contact</span></a>
                  </div>
                 </div>
                 <div class="kirki-s219-dpnjm05m kirki-s219-dpbbmjqz">
                   <p class="kirki-s219-dphywhzk kirki-s219-dpw94s95" style="color: #FDE251;">Products</p>
                   <div class="kirki-s219-dpgjvbot">
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}our-crops.html"><span class="dpgx9dvt dpksu24y">Our Crops</span></a>
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}seeds.html"><span class="dpgx9dvt dpksu24y">Seeds & Farm Goods</span></a>
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}products.html"><span class="dpgx9dvt dpksu24y">Micronutrients</span></a>
                   </div>
                 </div>
                 <div class="kirki-s219-dpnjm05m">
                   <p class="kirki-s219-dphywhzk kirki-s219-dpw94s95" style="color: #FDE251;">Others</p>
                   <div class="kirki-s219-dpgjvbot">
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${rootRel}terms-conditions/"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Terms of Service</span></a>
                   </div>
                 </div>
               </div>
             </div>
             <div class="kirki-s219-dpv862q9">
               <a class="kirki-s219-dpv862q9 kirki-inline-element" href="${rootRel}index.html" style="display: flex; flex-direction: column; align-items: center;">
                 <div style="display: inline-flex; align-items: center; gap: 15px; vertical-align: middle;">
                   <img src="${rootRel}assets/logo.png" alt="KSFL Agro Ltd." style="height: 80px; width: auto; max-width: 100%; object-fit: contain; display: inline-block;">
                   <span style="color: #FDE251; font-family: Roboto, sans-serif; font-weight: bold; font-size: 56px; line-height: 1; white-space: nowrap;">KSFL Agro Ltd.</span>
                 </div>
               </a>
               <p class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y kirki-s219-dpo2pb78" style="margin-bottom: 15px; color: #FDE251; text-align: center;">Address: 1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh | Call to know more: +8801715249371 (9 am-10 pm)</p>
               <p class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y kirki-s219-dpo2pb78" style="color: #FFFFFF;">©KSFL Agro Ltd. 2026. All rights reserved. | <a href="https://www.facebook.com/share/1CiLQmp3z2/" target="_blank" style="color: #FDE251; text-decoration: underline; font-weight: bold; margin-left: 5px;">Follow us on Facebook</a></p>
             </div>
           </div>
         </div>
       </div>
     </section>
  `;
}

// Generate the translator UI toggle and Javascript block
function generateTranslatorHTML() {
  return `
    <!-- AI MANUAL TRANSLATOR & PREMIUM UI TOGGLE -->
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet">
    <div class="ai-lang-toggle" style="position: fixed; bottom: 30px; right: 30px; z-index: 999999; display: flex; align-items: center; background-color: #5A6D3F; border-radius: 50px; padding: 5px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(253, 226, 81, 0.4); cursor: pointer; touch-action: manipulation;">
        <div id="btn-en" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: 'Roboto', sans-serif; color: #293920; background-color: #FDE251; transition: all 0.3s ease;">EN</div>
        <div id="btn-bn" style="padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: bold; font-family: 'Hind Siliguri', sans-serif; color: #fff; background-color: transparent; transition: all 0.3s ease;">BN</div>
    </div>

    <style>
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
    html body.lang-bn h6 {
        font-family: 'Hind Siliguri', 'Noto Serif Bengali', Arial, sans-serif !important;
        letter-spacing: normal !important;
        letter-spacing: 0px !important;
        word-spacing: normal !important;
        word-spacing: 0px !important;
        text-transform: none !important;
        font-style: normal !important;
        line-height: 1.5 !important;
    }
    .ai-lang-toggle:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }
    </style>

    <script>
    window.addEventListener("DOMContentLoaded", function() {
        const dict = {
            "Our Crops": "আমাদের ফসল",
            "Micronutrients": "মাইক্রোনিউট্রিয়েন্টস",
            "Grown with care at our Mirpur 10, Dhaka farm": "আমাদের মিরপুর ১০, ঢাকা খামারে যত্নে উৎপাদিত",
            "Rice": "ধান",
            "Bottle Gourd": "লাউ",
            "Sweet Pumpkin": "মিষ্টি কুমড়া",
            "Cucumber": "শসা",
            "Radish": "মূলা",
            "Pointed Gourd": "পটল",
            "Okra": "ঢেঁড়স",
            "Bitter Gourd": "করলা",
            "Eggplant": "বেগুন",
            "Potato": "গোল আলু",
            "KSFL Agro Ltd.": "কেএসএফএল এগ্রো লিঃ",
            "Home": "হোম",
            "Our Story": "আমাদের কথা",
            "Our Products": "আমাদের পণ্যসমূহ",
            "Seeds & Farm Goods": "বীজ এবং খামারের পণ্য",
            "Blogs": "ব্লগ",
            "Contact us": "যোগাযোগ করুন",
            "Contact Us": "যোগাযোগ করুন",
            "Explore Other Grown Crops": "আমাদের অন্যান্য উৎপাদিত ফসল",
            "Botanical Name": "উদ্ভিদ বৈজ্ঞানিক নাম",
            "Organic Fertilizer": "জৈব সার প্রয়োগ",
            "Cultivation Method": "চাষের ধরণ",
            "100% Pesticide-Free Natural Growth": "১০০% কীটনাশকমুক্ত প্রাকৃতিক চাষ",
            "Sowing Time": "বপনের সময়",
            "Harvest Period": "ফসল সংগ্রহ",
            "Maturity Days": "পরিপক্কতা",
            "Yield per Acre": "একর প্রতি ফলন",
            "Ideal Temperature": "উপযুক্ত তাপমাত্রা",
            "Soil Suitability": "মাটির ধরণ",
            "Cultivation Guide": "চাষাবাদ নির্দেশিকা",
            "Nutritional Value (Per 100g)": "পুষ্টিগুণ ও উপাদান (প্রতি ১০০ গ্রামে)",
            "Nutrient Element": "পুষ্টি উপাদান",
            "Value Amount": "পরিমাণ",
            "Quick Links": "দ্রুত লিঙ্ক",
            "Others": "অন্যান্য",
            "Terms of Service": "ব্যবহারের শর্তাবলী",
            "Subscribe": "সাবস্ক্রাইব করুন",
            "Successfully submitted": "সফলভাবে জমা দেওয়া হয়েছে",
            "Submit failed": "জমা দিতে ব্যর্থ হয়েছে",
            "Address: 1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh | Call to know more: +8801715249371 (9 am-10 pm)": "ঠিকানা: ১২৪০/৭ কাজীপাড়া মিরপুর, ১০, ঢাকা, বাংলাদেশ | বিস্তারিত জানতে কল করুন: +৮৮০১৭১৫২৪৯৩Nz১ (সকাল ৯ টা - রাত ১০ টা)",
            "©KSFL Agro Ltd. 2026. All rights reserved. | Follow us on Facebook": "©কেএসএফএল এগ্রো লিঃ ২০২৬। সর্বস্বত্ব সংরক্ষিত। | ফেসবুকে আমাদের অনুসরণ করুন"
        };

        const btnEn = document.getElementById("btn-en");
        const btnBn = document.getElementById("btn-bn");
        const toggleContainer = document.querySelector(".ai-lang-toggle");

        function setLanguage(lang) {
            if (lang === "bn") {
                document.body.classList.add("lang-bn");
                btnBn.style.backgroundColor = "#FDE251";
                btnBn.style.color = "#293920";
                btnEn.style.backgroundColor = "transparent";
                btnEn.style.color = "#fff";
                localStorage.setItem("selected-lang", "bn");
                translatePage(true);
            } else {
                document.body.classList.remove("lang-bn");
                btnEn.style.backgroundColor = "#FDE251";
                btnEn.style.color = "#293920";
                btnBn.style.backgroundColor = "transparent";
                btnBn.style.color = "#fff";
                localStorage.setItem("selected-lang", "en");
                translatePage(false);
            }
        }

        function translatePage(toBn) {
            function walk(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    let text = node.nodeValue.trim();
                    if (toBn) {
                        if (dict[text]) {
                            node.nodeValue = node.nodeValue.replace(text, dict[text]);
                        }
                     } else {
                         for (let key in dict) {
                             if (dict[key] === text) {
                                 node.nodeValue = node.nodeValue.replace(text, key);
                             }
                         }
                     }
                } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
                    if (node.placeholder && toBn && dict[node.placeholder]) {
                        node.placeholder = dict[node.placeholder];
                    }
                    node.childNodes.forEach(walk);
                }
            }
            walk(document.body);
        }

        toggleContainer.addEventListener("click", function() {
            const current = localStorage.getItem("selected-lang") || "en";
            setLanguage(current === "en" ? "bn" : "en");
        });

        const savedLang = localStorage.getItem("selected-lang") || "en";
        setLanguage(savedLang);
    });
    </script>
  `;
}

// Find second doctype in content
function extractMainSection(content) {
  const doctypeRegex = /<!DOCTYPE html/gi;
  let match;
  let occurrences = [];
  while ((match = doctypeRegex.exec(content)) !== null) {
    occurrences.push(match.index);
  }

  if (occurrences.length > 1) {
    return content.slice(0, occurrences[1]);
  }
  return content;
}

// 1. Clean up our-crops.html
console.log("Cleaning up our-crops.html...");
if (fs.existsSync(catalogPath)) {
  const content = fs.readFileSync(catalogPath, 'utf8');
  const mainSection = extractMainSection(content);
  
  let cleanedMain = mainSection.trim();
  if (cleanedMain.endsWith('</html>')) cleanedMain = cleanedMain.slice(0, -7).trim();
  if (cleanedMain.endsWith('</body>')) cleanedMain = cleanedMain.slice(0, -7).trim();
  
  const cleanFooter = generateFooterHTML('./');
  const cleanTranslator = generateTranslatorHTML();
  
  const finalContent = cleanedMain + '\n' + cleanFooter + '\n' + cleanTranslator + '\n</body>\n</html>';
  
  fs.writeFileSync(catalogPath, finalContent, 'utf8');
  console.log("Successfully cleaned our-crops.html!");
} else {
  console.log("our-crops.html was not found.");
}

// 2. Clean up every crop detail page under our-crops/
if (fs.existsSync(cropsDir)) {
  const folders = fs.readdirSync(cropsDir);
  
  folders.forEach(folder => {
    const cropIdxPath = path.join(cropsDir, folder, 'index.html');
    if (fs.existsSync(cropIdxPath)) {
      console.log(`Cleaning up crop page: ${folder}/index.html...`);
      const content = fs.readFileSync(cropIdxPath, 'utf8');
      
      const cropBlock = extractMainSection(content);
      
      // Split by related-section or explore-section to completely replace it
      let splitAnchor = '<!-- Related Crops Carousel -->';
      if (!cropBlock.includes(splitAnchor)) {
        splitAnchor = '<div class="related-section">';
      }
      
      if (cropBlock.includes(splitAnchor)) {
        const cropMainParts = cropBlock.split(splitAnchor);
        const topOfPage = cropMainParts[0].trim();
        
        const carouselHtml = generateCarouselHTML(folder);
        const footerHtml = generateFooterHTML('../../');
        const translatorHtml = generateTranslatorHTML();
        
        // Custom CropsCarousel script
        const carouselScript = `
    <!-- Custom Accordion + Crops Carousel script -->
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('.accordion-header').forEach(header => {
          header.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
          });
        });
      });
      
      class CropsCarousel {
        constructor(container) {
          this.container = container;
          this.track = container.querySelector('.carousel-track');
          this.cards = Array.from(this.track.children);
          this.leftBtn = container.querySelector('.left-arrow');
          this.rightBtn = container.querySelector('.right-arrow');
          
          if (this.cards.length === 0) return;
          
          this.currentIndex = 0;
          this.cardWidth = 0;
          this.gap = 30;
          this.autoPlayInterval = null;
          
          this.clonesCount = 4;
          this.initClones();
          this.updateSizes();
          this.jumpToIndex(this.clonesCount);
          
          this.initEvents();
          this.startAutoPlay();
        }
        
        initClones() {
          for (let i = 0; i < this.clonesCount; i++) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('carousel-clone');
            this.track.appendChild(clone);
          }
          for (let i = this.cards.length - 1; i >= this.cards.length - this.clonesCount; i--) {
            const clone = this.cards[i].cloneNode(true);
            clone.classList.add('carousel-clone');
            this.track.insertBefore(clone, this.track.firstChild);
          }
          this.allCards = Array.from(this.track.children);
        }
        
        updateSizes() {
          const viewport = this.container.querySelector('.carousel-viewport');
          if (!viewport) return;
          const parentWidth = viewport.getBoundingClientRect().width;
          let cardsVisible = 3;
          if (window.innerWidth <= 600) {
            cardsVisible = 1;
          } else if (window.innerWidth <= 1024) {
            cardsVisible = 2;
          }
          this.cardWidth = (parentWidth - (this.gap * (cardsVisible - 1))) / cardsVisible;
          this.allCards.forEach(card => {
            card.style.flex = \`0 0 \${this.cardWidth}px\`;
          });
        }
        
        jumpToIndex(index) {
          this.currentIndex = index;
          const offset = -index * (this.cardWidth + this.gap);
          this.track.style.transition = 'none';
          this.track.style.transform = \`translateX(\${offset}px)\`;
        }
        
        slideToIndex(index) {
          this.currentIndex = index;
          const offset = -index * (this.cardWidth + this.gap);
          this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          this.track.style.transform = \`translateX(\${offset}px)\`;
          
          setTimeout(() => {
            const originalCount = this.cards.length;
            if (this.currentIndex >= originalCount + this.clonesCount) {
              this.jumpToIndex(this.clonesCount);
            } else if (this.currentIndex < this.clonesCount) {
              this.jumpToIndex(originalCount + this.currentIndex);
            }
          }, 500);
        }
        
        next() {
          this.slideToIndex(this.currentIndex + 1);
        }
        
        prev() {
          this.slideToIndex(this.currentIndex - 1);
        }
        
        startAutoPlay() {
          this.stopAutoPlay();
          this.autoPlayInterval = setInterval(() => {
            this.next();
          }, 3000);
        }
        
        stopAutoPlay() {
          if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
          }
        }
        
        initEvents() {
          this.rightBtn.addEventListener('click', () => {
            this.next();
            this.startAutoPlay();
          });
          
          this.leftBtn.addEventListener('click', () => {
            this.prev();
            this.startAutoPlay();
          });
          
          this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
          this.container.addEventListener('mouseleave', () => this.startAutoPlay());
          
          window.addEventListener('resize', () => {
            this.updateSizes();
            this.jumpToIndex(this.currentIndex);
          });
        }
      }
      
      document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector('.crops-carousel-container');
        if (container) {
          new CropsCarousel(container);
        }
      });
    </script>
        `;
        
        const finalContent = topOfPage + '\n' + carouselHtml + '\n</div>\n</main>\n' + carouselScript + '\n' + footerHtml + '\n' + translatorHtml + '\n</body>\n</html>';
        
        fs.writeFileSync(cropIdxPath, finalContent, 'utf8');
        console.log(`Successfully cleaned and created carousel on: ${folder}/index.html`);
      } else {
        console.log(`ERROR: Could not find Related Crops Showcase or split anchor in ${folder}/index.html`);
      }
    }
  });
} else {
  console.log("our-crops directory not found.");
}

console.log("Cleanup job done!");
