const fs = require('fs');

const cssLink = '  <link rel="stylesheet" href="./assets/css/our-crops.css">';

const cropsHTML = `
<!-- START CROPS SHOWCASE SECTION -->
<section class="crops-showcase-section" id="our-grown-crops" data-reveal="true">
  <div class="showcase-header">
    <h2 class="h2 font-primary2" style="font-size: 42px; font-weight: 800; color: var(--ksfl-forest); margin: 0;">
      <span class="en-text">Our Grown Crops</span>
      <span class="bn-text">আমাদের উৎপাদিত ফসল</span>
    </h2>
    <p class="showcase-subtitle">
      <span class="en-text">High-yield, healthy crops grown organically at our Mirpur agro farm, ready for commercial and premium home use.</span>
      <span class="bn-text">আমাদের মিরপুর এগ্রো ফার্মে প্রাকৃতিকভাবে উৎপাদিত উচ্চ ফলনশীল ও স্বাস্থ্যকর ফসল, যা বাণিজ্যিক এবং প্রিমিয়াম পারিবারিক ব্যবহারের জন্য প্রস্তুত।</span>
    </p>
  </div>
  
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
</section>
<!-- END CROPS SHOWCASE SECTION -->
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Link stylesheet in head
  if (!content.includes('our-crops.css')) {
    const headMarker = '</head>';
    content = content.replace(headMarker, `${cssLink}\n${headMarker}`);
  }
  
  // 2. Insert showcase section
  if (!content.includes('id="our-grown-crops"')) {
    const targetSection = '</section><section class="dpuvy876" data-kirki="dpk9t8ru" id="work-process">';
    const replacement = `</section>\n${cropsHTML}\n<section class="dpuvy876" data-kirki="dpk9t8ru" id="work-process">`;
    content = content.replace(targetSection, replacement);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Showcase inserted into: ${filePath}`);
}

processFile('e:\\greenspout\\index.html');
processFile('e:\\greenspout\\preview.html');
processFile('e:\\greenspout\\site\\index.html');
console.log('Homepage showcase injection complete!');
