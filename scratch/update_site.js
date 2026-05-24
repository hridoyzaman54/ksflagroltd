const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const ourCropsHtmlPath = path.join(__dirname, '..', 'our-crops.html');

console.log('Reading index.html...');
let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('Reading our-crops.html...');
let ourCropsContent = fs.readFileSync(ourCropsHtmlPath, 'utf8');

// Helper to normalize line endings
const norm = (str) => str.replace(/\r\n/g, '\n');

indexContent = norm(indexContent);
ourCropsContent = norm(ourCropsContent);

// --- 1. Fix blogs card 1 (Eco-Friendly Habits) clickability ---
console.log('Modifying Blog Card 1...');
const card1ImgOld = '<div class="dpiif7jn" data-kirki="kirki-s-69f4c586407e3"><img class="kirki-image img" data-kirki="kirki-s-69f4c586407e5" alt="blog img 2" src="./assets/684286764_122110560531025059_534008816998498370_n.jpg" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" /></div>';
const card1ImgNew = '<a class="dpiif7jn" data-kirki="kirki-s-69f4c586407e3" href="./eco-friendly-habits-small-changes-for-a-greener-life/" style="display: block; text-decoration: none;"><img class="kirki-image img" data-kirki="kirki-s-69f4c586407e5" alt="blog img 2" src="./assets/684286764_122110560531025059_534008816998498370_n.jpg" style="object-fit: cover; width: 100%; height: 100%; border-radius: 16px;" loading="lazy" width="auto" height="auto" /></a>';

if (indexContent.includes(card1ImgOld)) {
    indexContent = indexContent.replace(card1ImgOld, card1ImgNew);
    console.log('-> Wrapped Blog Card 1 image successfully!');
} else {
    console.log('-> WARNING: Blog Card 1 image pattern not found!');
}

const card1TitleOld = '<h3 class="h4" data-kirki="kirki-s-69f4c5864081a">Eco-Friendly Habits: Small Changes for a Greener Life</h3>';
const card1TitleNew = '<h3 class="h4" data-kirki="kirki-s-69f4c5864081a"><a href="./eco-friendly-habits-small-changes-for-a-greener-life/" style="color: inherit; text-decoration: none;">Eco-Friendly Habits: Small Changes for a Greener Life</a></h3>';

if (indexContent.includes(card1TitleOld)) {
    indexContent = indexContent.replace(card1TitleOld, card1TitleNew);
    console.log('-> Wrapped Blog Card 1 title successfully!');
} else {
    console.log('-> WARNING: Blog Card 1 title pattern not found!');
}


// --- 2. Fix Blog Card 2 (Zero-Waste Farming -> Organic Garden) ---
console.log('Modifying Blog Card 2 (Middle slot)...');

// Let's replace the individual parts of Card 2 for robust replacement.
const card2DateOld = '<p data-kirki="kirki-s-69f4c5864107b">November 14, 2025</p>';
const card2DateNew = '<p data-kirki="kirki-s-69f4c5864107b">November 13, 2025</p>';
if (indexContent.includes(card2DateOld)) {
    indexContent = indexContent.replace(card2DateOld, card2DateNew);
    console.log('-> Fixed Card 2 Date successfully!');
}

const card2TagOld = '<p class="tag-2" data-kirki="kirki-s-69f4c586412b3">Organic Farming</p>';
const card2TagNew = '<p class="tag-2" data-kirki="kirki-s-69f4c586412b3">Gardening Tips</p>';
if (indexContent.includes(card2TagOld)) {
    indexContent = indexContent.replace(card2TagOld, card2TagNew);
    console.log('-> Fixed Card 2 Tag successfully!');
}

const card2ImgOld = '<div class="dpiif7jn" data-kirki="kirki-s-69f4c5864107d"><img class="kirki-image img" data-kirki="kirki-s-69f4c5864107e" alt="blog img 2" loading="lazy" width="auto" height="auto" src="./assets/wp-content/uploads/2025/11/blog-img-56.webp"></div>';
const card2ImgNew = '<a class="dpiif7jn" data-kirki="kirki-s-69f4c5864107d" href="./starting-your-first-organic-garden-a-beginners-guide/" style="display: block; text-decoration: none;"><img class="kirki-image img" data-kirki="kirki-s-69f4c5864107e" alt="blog img 2" loading="lazy" width="auto" height="auto" src="./assets/wp-content/uploads/2025/11/blog-img-2.webp"></a>';
if (indexContent.includes(card2ImgOld)) {
    indexContent = indexContent.replace(card2ImgOld, card2ImgNew);
    console.log('-> Fixed and wrapped Card 2 image successfully!');
} else {
    console.log('-> WARNING: Card 2 image pattern not found!');
}

const card2TitleOld = '<h3 class="h4" data-kirki="kirki-s-69f4c58641090">KSFL Agro Ltd.’s Guide to ZeroWaste Farming</h3>';
const card2TitleNew = '<h3 class="h4" data-kirki="kirki-s-69f4c58641090"><a href="./starting-your-first-organic-garden-a-beginners-guide/" style="color: inherit; text-decoration: none;">Starting Your First Organic Garden: A Beginner’s Guide</a></h3>';
if (indexContent.includes(card2TitleOld)) {
    indexContent = indexContent.replace(card2TitleOld, card2TitleNew);
    console.log('-> Fixed and wrapped Card 2 title successfully!');
} else {
    console.log('-> WARNING: Card 2 title pattern not found!');
}

const card2LinkOld = '<a class="dpgdkj2f kirki-inline-element" data-kirki="kirki-s-69f4c58641093" target="" href="./ksfl-agros-guide-to-zerowaste-farming/">';
const card2LinkNew = '<a class="dpgdkj2f kirki-inline-element" data-kirki="kirki-s-69f4c58641093" target="" href="./starting-your-first-organic-garden-a-beginners-guide/">';
if (indexContent.includes(card2LinkOld)) {
    indexContent = indexContent.replace(card2LinkOld, card2LinkNew);
    console.log('-> Fixed Card 2 Read More link successfully!');
}


// --- 3. Fix Blog Card 3 (Zero-Waste Farming) clickability ---
console.log('Modifying Blog Card 3...');
const card3ImgOld = '<div class="dpiif7jn" data-kirki="kirki-s-69f4c586417e8"><img class="kirki-image img" data-kirki="kirki-s-69f4c586417e9" alt="blog img 2" loading="lazy" width="auto" height="auto" src="./assets/wp-content/uploads/2025/11/blog-img-4.webp"></div>';
const card3ImgNew = '<a class="dpiif7jn" data-kirki="kirki-s-69f4c586417e8" href="./ksfl-agros-guide-to-zerowaste-farming/" style="display: block; text-decoration: none;"><img class="kirki-image img" data-kirki="kirki-s-69f4c586417e9" alt="blog img 2" loading="lazy" width="auto" height="auto" src="./assets/wp-content/uploads/2025/11/blog-img-4.webp"></a>';

if (indexContent.includes(card3ImgOld)) {
    indexContent = indexContent.replace(card3ImgOld, card3ImgNew);
    console.log('-> Wrapped Blog Card 3 image successfully!');
} else {
    console.log('-> WARNING: Blog Card 3 image pattern not found!');
}

const card3TitleOld = '<h3 class="h4" data-kirki="kirki-s-69f4c586417fb"><a href="./ksfl-agros-guide-to-zerowaste-farming/" style="color: inherit; text-decoration: none;">KSFL Agro\'s Guide to Zero-Waste Farming</a></h3>';
// Note: card3Title is already wrapped in some previous run/edit. Let's make sure it is correct or wrap if it was a plain H3 before.
const card3TitlePlainOld = '<h3 class="h4" data-kirki="kirki-s-69f4c586417fb">KSFL Agro\'s Guide to Zero-Waste Farming</h3>';
if (indexContent.includes(card3TitlePlainOld)) {
    indexContent = indexContent.replace(card3TitlePlainOld, card3TitleOld);
    console.log('-> Wrapped Blog Card 3 title successfully!');
}


// --- 4. Add new crops (Paddy Seeds & Sweet Potato Seeds) cards to index.html ---
console.log('Adding Paddy Seeds and Sweet Potato Seeds cards to index.html...');
const cropCard10Old = `    <!-- 10. Potato -->
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
    </a>`;

// Wait, let's see if cropCard10Old is already updated or not.
const cropCard10AndNewCrops = `    <!-- 10. Potato -->
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

    <!-- 11. Paddy Seeds -->
    <a class="crop-card" href="./our-crops/paddy-seeds/index.html" data-tilt="true">
      <div class="crop-image-wrapper">
        <img src="./assets/crops/paddy-seeds.png" alt="Paddy Seeds" loading="lazy">
      </div>
      <div class="crop-info">
        <div>
          <span class="crop-scientific">Oryza sativa (Seeds)</span>
          <h3 class="crop-title">
            <span class="en-text">Paddy Seeds</span>
            <span class="bn-text">ধানের বীজ</span>
          </h3>
          <p class="crop-desc">
            <span class="en-text">Premium organic paddy seeds selected for high germination rate and yield.</span>
            <span class="bn-text">উচ্চ অঙ্কুরোদগম ও ফলনশীল প্রিমিয়াম ঐতিহ্যবাহী ধানের বীজ।</span>
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

    <!-- 12. Sweet Potato Seeds -->
    <a class="crop-card" href="./our-crops/sweet-potato-seeds/index.html" data-tilt="true">
      <div class="crop-image-wrapper">
        <img src="./assets/crops/sweet-potato-seeds.png" alt="Sweet Potato Seeds" loading="lazy">
      </div>
      <div class="crop-info">
        <div>
          <span class="crop-scientific">Ipomoea batatas</span>
          <h3 class="crop-title">
            <span class="en-text">Sweet Potato Seeds</span>
            <span class="bn-text">মিষ্টি আলুর বীজ</span>
          </h3>
          <p class="crop-desc">
            <span class="en-text">Disease-free organic sweet potato vines and seed tubers for healthy roots.</span>
            <span class="bn-text">রোগমুক্ত প্রিমিয়াম মিষ্টি আলুর লতা ও বীজ আলু।</span>
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

if (indexContent.includes(cropCard10Old)) {
    indexContent = indexContent.replace(cropCard10Old, cropCard10AndNewCrops);
    console.log('-> Added new crops to index.html successfully!');
} else {
    console.log('-> WARNING: cropCard10Old not found in index.html (already updated or pattern changed)!');
}

// --- 5. Add new crops (Paddy Seeds & Sweet Potato Seeds) cards to our-crops.html ---
console.log('Adding Paddy Seeds and Sweet Potato Seeds cards to our-crops.html...');
const cropCard10OurCropsOld = `      <!-- 10. Potato -->
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
      </a>`;

const cropCard10OurCropsNew = `      <!-- 10. Potato -->
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

      <!-- 11. Paddy Seeds -->
      <a class="crop-card" href="./our-crops/paddy-seeds/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/paddy-seeds.png" alt="Paddy Seeds" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Oryza sativa (Seeds)</span>
            <h3 class="crop-title">
              <span class="en-text">Paddy Seeds</span>
              <span class="bn-text">ধানের বীজ</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Premium organic paddy seeds selected for high germination rate and yield.</span>
              <span class="bn-text">উচ্চ অঙ্কুরোদগম ও ফলনশীল প্রিমিয়াম ঐতিহ্যবাহী ধানের বীজ।</span>
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

      <!-- 12. Sweet Potato Seeds -->
      <a class="crop-card" href="./our-crops/sweet-potato-seeds/index.html" data-tilt="true">
        <div class="crop-image-wrapper">
          <img src="./assets/crops/sweet-potato-seeds.png" alt="Sweet Potato Seeds" loading="lazy">
        </div>
        <div class="crop-info">
          <div>
            <span class="crop-scientific">Ipomoea batatas</span>
            <h3 class="crop-title">
              <span class="en-text">Sweet Potato Seeds</span>
              <span class="bn-text">মিষ্টি আলুর বীজ</span>
            </h3>
            <p class="crop-desc">
              <span class="en-text">Disease-free organic sweet potato vines and seed tubers for healthy roots.</span>
              <span class="bn-text">রোগমুক্ত প্রিমিয়াম মিষ্টি আলুর লতা ও বীজ আলু।</span>
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

if (ourCropsContent.includes(cropCard10OurCropsOld)) {
    ourCropsContent = ourCropsContent.replace(cropCard10OurCropsOld, cropCard10OurCropsNew);
    console.log('-> Added new crops to our-crops.html successfully!');
} else {
    console.log('-> WARNING: cropCard10OurCropsOld not found in our-crops.html!');
}

// --- Save Files ---
console.log('Saving modified files...');
fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
fs.writeFileSync(ourCropsHtmlPath, ourCropsContent, 'utf8');
console.log('Done!');
