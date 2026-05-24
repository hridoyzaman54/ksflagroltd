const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Helper function to slice HTML at </main>
function sliceAtMain(content) {
  const mainEndIdx = content.indexOf('</main>');
  if (mainEndIdx === -1) {
    throw new Error('Could not find </main> in content');
  }
  return content.substring(0, mainEndIdx + 7);
}

// 2. CSS for the Category Grid in index.html
const categoryGridStyle = `
<style>
.category-grid-mask {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 32px;
  box-sizing: border-box;
}

.category-card {
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--ksfl-white, #ffffff);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.category-card .dpoc0gmd img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.category-card:hover .dpoc0gmd img {
  transform: scale(1.1) rotate(-2deg);
}

.category-card .dplil849 {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.category-card:hover .dplil849 {
  transform: rotate(-45deg);
}

.category-card .dpq68e8t {
  padding: 24px;
}

body.dark-mode .category-card {
  background-color: #1A2417 !important;
  border: 1px solid rgba(220, 231, 182, 0.1);
}

body.dark-mode .category-card .dpq68e8t p {
  color: #BAC7B5 !important;
}

@media (max-width: 991px) {
  .category-grid-mask {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .category-grid-mask {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
`;

// 3. Category Grid HTML for index.html
const categoryGridHtml = `
${categoryGridStyle}
<div class="category-grid-mask">
  <!-- Card 1: Our Crops -->
  <a class="category-card dpnj0cpl" href="./our-crops.html">
    <div class="dpoc0gmd">
      <img class="kirki-image img" alt="Our Crops" loading="lazy" src="./assets/pomelli_photoshoot_image_9_16_0505.png" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" />
      <div class="dp2rkksm">
        <div class="dp0v6kh3">
          <span class="h4 font-primary2">
            <span class="en-text">Our Crops</span>
            <span class="bn-text">আমাদের ফসল</span>
          </span>
          <div class="dplil849">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="22" fill="#FDE251"></rect>
              <path d="M28.5 22H15" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M24 27C24 27 30 23.3176 30 22C30 20.6823 24 17 24 17" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="dpn5c10y"></div>
    </div>
    <div class="dpq68e8t">
      <p class="p1_regular font-text-2">
        <span class="en-text">Freshly harvested organic grains, seasonal vegetables, and premium pumpkins directly from our fields.</span>
        <span class="bn-text">আমাদের মাঠ থেকে সরাসরি তাজা জৈব শস্য, ঋতুভিত্তিক শাকসবজি এবং প্রিমিয়াম মিষ্টি কুমড়া।</span>
      </p>
    </div>
  </a>

  <!-- Card 2: Seeds & Farm Goods -->
  <a class="category-card dpnj0cpl" href="./seeds.html">
    <div class="dpoc0gmd">
      <img class="kirki-image img" alt="Seeds & Farm Goods" loading="lazy" src="./assets/wp-content/uploads/2025/11/product-img-4-1.webp" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" />
      <div class="dp2rkksm">
        <div class="dp0v6kh3">
          <span class="h4 font-primary2">
            <span class="en-text">Seeds & Farm Goods</span>
            <span class="bn-text">বীজ এবং খামারের পণ্য</span>
          </span>
          <div class="dplil849">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="22" fill="#FDE251"></rect>
              <path d="M28.5 22H15" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M24 27C24 27 30 23.3176 30 22C30 20.6823 24 17 24 17" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="dpn5c10y"></div>
    </div>
    <div class="dpq68e8t">
      <p class="p1_regular font-text-2">
        <span class="en-text">Organic seeds, compost, and gardening kits — perfect for home growers and eco-hobbyists.</span>
        <span class="bn-text">জৈব বীজ, কম্পোস্ট এবং বাগান তৈরির সরঞ্জাম - ছাদ বাগান এবং পরিবেশপ্রেমীদের জন্য আদর্শ।</span>
      </p>
    </div>
  </a>

  <!-- Card 3: Micronutrients -->
  <a class="category-card dpnj0cpl" href="./products.html">
    <div class="dpoc0gmd">
      <img class="kirki-image img" alt="Micronutrients" loading="lazy" src="./assets/wp-content/uploads/2025/11/product-img-1-1.webp" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" />
      <div class="dp2rkksm">
        <div class="dp0v6kh3">
          <span class="h4 font-primary2">
            <span class="en-text">Micronutrients</span>
            <span class="bn-text">মাইক্রোনিউট্রিয়েন্টস</span>
          </span>
          <div class="dplil849">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="44" height="44" rx="22" fill="#FDE251"></rect>
              <path d="M28.5 22H15" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M24 27C24 27 30 23.3176 30 22C30 20.6823 24 17 24 17" stroke="#181818" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="dpn5c10y"></div>
    </div>
    <div class="dpq68e8t">
      <p class="p1_regular font-text-2">
        <span class="en-text">Premium organic crop supplements and micronutrients to maximize yield and plant vitality naturally.</span>
        <span class="bn-text">প্রাকৃতিকভাবে ফলন বৃদ্ধি এবং উদ্ভিদের সতেজতা নিশ্চিত করতে প্রিমিয়াম জৈব সম্পূরক এবং মাইক্রোনিউট্রিয়েন্টস।</span>
      </p>
    </div>
  </a>
</div>
</div></div>
`;

// 4. Clean standardized related-crops scripts and footer generator
function generateSubpageFooterAndScript(relPath) {
  return `
    <!-- Custom Accordion + Bulletproof Crops Carousel script -->
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
          
          // Layout-healing safe init
          this.updateSizes();
          this.jumpToIndex(this.clonesCount);
          
          setTimeout(() => {
            this.updateSizes();
            this.jumpToIndex(this.clonesCount);
          }, 150);
          
          this.initEvents();
          this.startAutoPlay();
        }
        
        initClones() {
          if (this.track.querySelector('.carousel-clone')) return; // already cloned
          
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
          
          let parentWidth = viewport.getBoundingClientRect().width;
          
          // Healing: If layout hasn't painted yet, query metrics or fallback to standard dimensions
          if (!parentWidth || parentWidth <= 0) {
            parentWidth = viewport.clientWidth || viewport.offsetWidth || 0;
          }
          if (!parentWidth || parentWidth <= 0) {
            const containerWidth = this.container.getBoundingClientRect().width;
            if (containerWidth > 120) {
              parentWidth = containerWidth - 120;
            }
          }
          if (!parentWidth || parentWidth <= 0) {
            if (window.innerWidth <= 600) {
              parentWidth = window.innerWidth - 20;
            } else if (window.innerWidth <= 1024) {
              parentWidth = window.innerWidth - 120;
            } else {
              parentWidth = 1080; // Standard 1200px max-width container default
            }
          }
          
          let cardsVisible = 3;
          if (window.innerWidth <= 600) {
            cardsVisible = 1;
          } else if (window.innerWidth <= 1024) {
            cardsVisible = 2;
          }
          
          this.cardWidth = (parentWidth - (this.gap * (cardsVisible - 1))) / cardsVisible;
          
          // rigid styling assignment to guarantee render correctness
          this.allCards.forEach(card => {
            card.style.width = this.cardWidth + 'px';
            card.style.flex = '0 0 ' + this.cardWidth + 'px';
          });
        }
        
        jumpToIndex(index) {
          this.currentIndex = index;
          const offset = -index * (this.cardWidth + this.gap);
          this.track.style.transition = 'none';
          this.track.style.transform = 'translateX(' + offset + 'px)';
        }
        
        slideToIndex(index) {
          this.currentIndex = index;
          const offset = -index * (this.cardWidth + this.gap);
          this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          this.track.style.transform = 'translateX(' + offset + 'px)';
          
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
        

    <!-- Start Footer Section -->
    <section class="kirki-s219-dpbrehze" data-kirki="dpg8ljjj" id="footer" style="position: relative; background-image: url('${relPath}assets/wp-content/uploads/2025/11/footer-img.webp'); background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
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
              <a class="kirki-s219-dplr6hng kirki-inline-element" href="${relPath}contact.html">
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
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}index.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Home</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}about.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">About</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}blogs.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Blogs</span></a>
                    <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}contact.html"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Contact</span></a>
                  </div>
                 </div>
                 <div class="kirki-s219-dpnjm05m kirki-s219-dpbbmjqz">
                   <p class="kirki-s219-dphywhzk kirki-s219-dpw94s95" style="color: #FDE251;">Products</p>
                   <div class="kirki-s219-dpgjvbot">
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}our-crops.html"><span class="dpgx9dvt dpksu24y">Our Crops</span></a>
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}seeds.html"><span class="dpgx9dvt dpksu24y">Seeds & Farm Goods</span></a>
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}products.html"><span class="dpgx9dvt dpksu24y">Micronutrients</span></a>
                   </div>
                 </div>
                 <div class="kirki-s219-dpnjm05m">
                   <p class="kirki-s219-dphywhzk kirki-s219-dpw94s95" style="color: #FDE251;">Others</p>
                   <div class="kirki-s219-dpgjvbot">
                     <a class="kirki-s219-dpf3ou08 kirki-inline-element" href="${relPath}terms-conditions/"><span class="kirki-s219-dpgx9dvt kirki-s219-dpksu24y">Terms of Service</span></a>
                   </div>
                 </div>
               </div>
             </div>
             <div class="kirki-s219-dpv862q9">
               <a class="kirki-s219-dpv862q9 kirki-inline-element" href="${relPath}index.html" style="display: flex; flex-direction: column; align-items: center;">
                 <div style="display: inline-flex; align-items: center; gap: 15px; vertical-align: middle;">
                   <img src="${relPath}assets/logo.png" alt="KSFL Agro Ltd." style="height: 80px; width: auto; max-width: 100%; object-fit: contain; display: inline-block;">
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
            "Explore Grown Crops": "আমাদের উৎপাদিত ফসল",
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
  </body>
</html>
  `;
}

// 5. Run Truncate + Cleanup on our-crops.html
console.log('Fixing our-crops.html...');
const ourCropsPath = path.join(rootDir, 'our-crops.html');
if (fs.existsSync(ourCropsPath)) {
  let content = fs.readFileSync(ourCropsPath, 'utf8');
  content = sliceAtMain(content);
  content += generateSubpageFooterAndScript('./');
  fs.writeFileSync(ourCropsPath, content, 'utf8');
  console.log('our-crops.html successfully truncated and rebuilt!');
} else {
  console.error('our-crops.html not found!');
}

// 6. Run Replace on index.html (Category Showcase Slider to static Grid)
console.log('Fixing index.html category showcase slider...');
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Find where the kirki-slider starts
  const sliderStartIdx = content.indexOf('<div class="kirki-slider dp1qv9gu"');
  if (sliderStartIdx !== -1) {
    // Find the end tag: </svg></div>\t</div></div></div> (wait, tab may not be exact tab character, let's search for </svg></div> and the next </div></div></div>)
    const endStrStartIdx = content.indexOf('</svg></div>', sliderStartIdx);
    if (endStrStartIdx !== -1) {
      const endStrEndIdx = content.indexOf('</div></div></div>', endStrStartIdx);
      if (endStrEndIdx !== -1) {
        const fullEndIdx = endStrEndIdx + '</div></div></div>'.length;
        
        const beforeSlider = content.substring(0, sliderStartIdx);
        const afterSlider = content.substring(fullEndIdx);
        
        const newIndexContent = beforeSlider + categoryGridHtml + afterSlider;
        fs.writeFileSync(indexHtmlPath, newIndexContent, 'utf8');
        console.log('index.html category showcase slider replaced with gorgeous static grid!');
      } else {
        console.error('Could not find closing divs for slider in index.html');
      }
    } else {
      console.error('Could not find </svg></div> inside products slider in index.html');
    }
  } else {
    console.error('Could not find kirki-slider start in index.html');
  }
} else {
  console.error('index.html not found!');
}

// 7. Run Truncate + Cleanup on all 10 subpages under our-crops/
console.log('Fixing all individual crop detail pages under our-crops/...');
const ourCropsDir = path.join(rootDir, 'our-crops');
if (fs.existsSync(ourCropsDir)) {
  const cropSubdirs = fs.readdirSync(ourCropsDir).filter(name => {
    return fs.statSync(path.join(ourCropsDir, name)).isDirectory();
  });
  
  cropSubdirs.forEach(subdirName => {
    const subpagePath = path.join(ourCropsDir, subdirName, 'index.html');
    if (fs.existsSync(subpagePath)) {
      console.log(`Processing subpage: our-crops/${subdirName}/index.html...`);
      let content = fs.readFileSync(subpagePath, 'utf8');
      
      try {
        content = sliceAtMain(content);
        content += generateSubpageFooterAndScript('../../');
        fs.writeFileSync(subpagePath, content, 'utf8');
        console.log(`Successfully rewrote and secured: our-crops/${subdirName}/index.html`);
      } catch (err) {
        console.error(`Error processing our-crops/${subdirName}/index.html:`, err.message);
      }
    } else {
      console.warn(`No index.html found under our-crops/${subdirName}`);
    }
  });
  console.log('All individual crops detail pages are fixed and standardized!');
} else {
  console.error('our-crops/ folder not found!');
}

console.log('Master fixes apply completed!');
