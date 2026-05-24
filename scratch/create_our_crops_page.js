const fs = require('fs');

const indexContent = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');

// We will find the exact boundary points of header and footer in index.html
// The header ends right before the first slider or main body section (e.g., L282/L283)
// Let's find '</nav>' or '</section>' of the navbar: id="navbar-1"
const navbarEndTag = '</section>';
const navbarIndex = indexContent.indexOf('id="navbar-1"');
const headerEndIdx = indexContent.indexOf(navbarEndTag, navbarIndex) + navbarEndTag.length;

const headerHTML = indexContent.substring(0, headerEndIdx);

// The footer starts around: <section class="kirki-s219-dp0evq34"
const footerStartTag = '<section class="kirki-s219-dp0evq34"';
const footerStartIdx = indexContent.indexOf(footerStartTag);

const footerHTML = indexContent.substring(footerStartIdx);

// Now, let's assemble the new our-crops.html
const middleHTML = `
<!-- START CROP LANDING HERO SECTION -->
<div class="crop-detail-hero">
  <img src="./assets/crops/rice.png" alt="Crops Field Background">
  <div class="crop-detail-hero-content">
    <h1 class="font-primary2">
      <span class="en-text">Our Crops</span>
      <span class="bn-text">আমাদের ফসল</span>
    </h1>
    <div class="crop-detail-breadcrumbs">
      <a href="./index.html"><span class="en-text">Home</span><span class="bn-text">হোম</span></a> &gt; 
      <span class="en-text">Our Crops</span><span class="bn-text">আমাদের ফসল</span>
    </div>
  </div>
</div>
<!-- END CROP LANDING HERO SECTION -->

<main class="crop-detail-main">
  <div class="crop-detail-container">
    
    <!-- Info Banner -->
    <div class="nutrition-section" style="margin-bottom: 60px; text-align: center;">
      <h2 class="h3" style="margin-top: 0;">
        <span class="en-text">100% Organically Grown Crops</span>
        <span class="bn-text">১০০% জৈব পদ্ধতিতে উৎপাদিত ফসল</span>
      </h2>
      <p style="font-size: 18px; line-height: 1.6; max-width: 900px; margin: 0 auto; color: #555;" class="crop-desc">
        <span class="en-text">We grow a diverse range of crops at our Mirpur 10, Dhaka agro farm using advanced micronutrients and zero chemical pesticides. Our harvested crops are served fresh to premium homes and commercial partners across Bangladesh.</span>
        <span class="bn-text">আমরা আমাদের মিরপুর ১০, ঢাকা এগ্রো খামারে উন্নত মাইক্রোনিউট্রিয়েন্টস এবং শূন্য রাসায়নিক কীটনাশক ব্যবহার করে বিভিন্ন ধরণের ফসল ফলাই। আমাদের উৎপাদিত তাজা ফসল বাংলাদেশের বিভিন্ন প্রিমিয়াম পরিবার ও বাণিজ্যিক অংশীদারদের কাছে সরাসরি সরবরাহ করা হয়।</span>
      </p>
    </div>

    <!-- Grid Section -->
    <div class="crops-grid">
      <!-- 1. Rice -->
      <a class="crop-card" href="./our-crops/rice/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/rice.png" alt="Rice" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Oryza sativa</span>
            <h3 class="crop-title">
              <span class="en-text">Rice</span>
              <span class="bn-text">ধান</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">High-yield organic long grain rice, locally harvested with care.</span>
              <span class="bn-text">আমাদের খামারে উৎপাদিত উচ্চ ফলনশীল ও পুষ্টিকর ধান।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 2. Bottle Gourd -->
      <a class="crop-card" href="./our-crops/bottle-gourd/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/bottle-gourd.png" alt="Bottle Gourd" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Lagenaria siceraria</span>
            <h3 class="crop-title">
              <span class="en-text">Bottle Gourd</span>
              <span class="bn-text">লাউ</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Tender, water-rich bottle gourds grown in natural conditions.</span>
              <span class="bn-text">ভিটামিন সমৃদ্ধ তাজা কচি লাউ সরাসরি আমাদের খামার থেকে।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 3. Sweet Pumpkin -->
      <a class="crop-card" href="./our-crops/sweet-pumpkin/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/sweet-pumpkin.png" alt="Sweet Pumpkin" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Cucurbita moschata</span>
            <h3 class="crop-title">
              <span class="en-text">Sweet Pumpkin</span>
              <span class="bn-text">মিষ্টি কুমড়া</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Vibrant orange organic pumpkins packed with vitamin A.</span>
              <span class="bn-text">অত্যন্ত পুষ্টিকর এবং মিষ্টি স্বাদের তাজা মিষ্টি কুমড়া।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 4. Cucumber -->
      <a class="crop-card" href="./our-crops/cucumber/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/cucumber.png" alt="Cucumber" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Cucumis sativus</span>
            <h3 class="crop-title">
              <span class="en-text">Cucumber</span>
              <span class="bn-text">শসা</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Crunchy, refreshing organic cucumbers for daily health.</span>
              <span class="bn-text">অত্যন্ত সতেজ এবং ক্রাঞ্চি ও সুস্বাদু সালাদ শসা।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 5. Radish -->
      <a class="crop-card" href="./our-crops/radish/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/radish.png" alt="Radish" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Raphanus sativus</span>
            <h3 class="crop-title">
              <span class="en-text">Radish</span>
              <span class="bn-text">মূলা</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Crisp, organically cultivated white radishes full of minerals.</span>
              <span class="bn-text">খনিজ সমৃদ্ধ ও হজমে সাহায্যকারী সতেজ সাদা মূলা।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 6. Pointed Gourd -->
      <a class="crop-card" href="./our-crops/pointed-gourd/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/pointed-gourd.png" alt="Pointed Gourd" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Trichosanthes dioica</span>
            <h3 class="crop-title">
              <span class="en-text">Pointed Gourd</span>
              <span class="bn-text">পটল</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Delicious green pointed gourds, a staple Bangladeshi vegetable.</span>
              <span class="bn-text">দেশীয় ঐতিহ্যবাহী ও সুস্বাদু সতেজ পটল।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 7. Okra -->
      <a class="crop-card" href="./our-crops/okra/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/okra.png" alt="Okra" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Abelmoschus esculentus</span>
            <h3 class="crop-title">
              <span class="en-text">Okra</span>
              <span class="bn-text">ঢেঁড়স</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Tender, high-fiber okra pods grown with pure organic manure.</span>
              <span class="bn-text">ফাইবার সমৃদ্ধ অত্যন্ত কচি ও পুষ্টিকর সুস্বাদু ঢেঁড়স।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 8. Bitter Gourd -->
      <a class="crop-card" href="./our-crops/bitter-gourd/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/bitter-gourd.png" alt="Bitter Gourd" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Momordica charantia</span>
            <h3 class="crop-title">
              <span class="en-text">Bitter Gourd</span>
              <span class="bn-text">করলা</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Nutrient-dense bitter gourd, famous for its health benefits.</span>
              <span class="bn-text">রোগ প্রতিরোধ ক্ষমতা বৃদ্ধিকারী প্রিমিয়াম করলা।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 9. Eggplant -->
      <a class="crop-card" href="./our-crops/eggplant/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/eggplant.png" alt="Eggplant" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Solanum melongena</span>
            <h3 class="crop-title">
              <span class="en-text">Eggplant</span>
              <span class="bn-text">বেগুন</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Plump and glossy organic purple eggplants, perfect for roasting.</span>
              <span class="bn-text">নরম ও আকর্ষণীয় কচি গোল বেগুন সরাসরি বাগান থেকে।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>

      <!-- 10. Potato -->
      <a class="crop-card" href="./our-crops/potato/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/potato.png" alt="Potato" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Solanum tuberosum</span>
            <h3 class="crop-title">
              <span class="en-text">Potato</span>
              <span class="bn-text">গোল আলু</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Healthy, organic round potatoes loaded with complex carbs.</span>
              <span class="bn-text">প্রতিদিনের প্রয়োজনীয় ও স্বাস্থ্যকর তাজা গোল আলু।</span>
            </p>
          </div>
          <div class="crop-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    </div>
    
  </div>
</main>
`;

const finalHTML = headerHTML + middleHTML + footerHTML;

// Save to workspace
fs.writeFileSync('e:\\greenspout\\our-crops.html', finalHTML, 'utf8');
console.log('Successfully created e:\\greenspout\\our-crops.html landing page!');
