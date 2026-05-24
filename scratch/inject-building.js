const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, '..', 'contact.html');
if (!fs.existsSync(contactPath)) {
  console.error('contact.html does not exist.');
  process.exit(1);
}

let html = fs.readFileSync(contactPath, 'utf8');

// 1. Replace the generic image placeholder with the real building photo path
const oldImg = 'src="./assets/Gemini_Generated_Image_lgqtg3lgqtg3lgqt.png"';
const newImg = 'src="./assets/ksfl%20building.png"';

if (html.includes(oldImg)) {
  html = html.replace(oldImg, newImg);
  console.log('Successfully replaced placeholder image with ksfl building.');
} else {
  console.warn('Old contact image placeholder not found. Check if already updated.');
}

// 2. Replace the Address markup with Head Office titles and the warm invitation text
const oldAddress = '<h3 class="tag-1_-medium font-black" data-kirki="dp4m8vus">Address</h3><p class="p2 font-heading" data-kirki="dp98nmrr">1240/7 Kazipara Mirpur, 10, Dhaka, Bangladesh</p>';
const newAddress = '<h3 class="tag-1_-medium font-black" data-kirki="dp4m8vus">KSFL Agro Ltd. Head Office</h3><p class="p2 font-heading" data-kirki="dp98nmrr">Address: Mirpur 10, Dhaka, Bangladesh (1240/7 Kazipara Mirpur 10)</p><p class="p2" style="margin-top: 8px; font-size: 15px; line-height: 1.5; color: var(--premade_template_dpw2cmzz);">You are welcome anytime! We warmly invite you to visit us to check out all our products firsthand, inspect the seed quality, or discuss any queries with our team.</p>';

if (html.includes(oldAddress)) {
  html = html.replace(oldAddress, newAddress);
  console.log('Successfully updated Head Office address markup & invitation text.');
} else {
  console.warn('Old address markup not found. Check if already updated.');
}

// 3. Update the translation dictionary so switching to Bangla renders perfectly
const oldDictLine = '        "Address": "ঠিকানা",';
const newDictLines = `        "Address": "ঠিকানা",
        "KSFL Agro Ltd. Head Office": "কেএসএফএল এগ্রো লিঃ এর প্রধান কার্যালয়",
        "Address: Mirpur 10, Dhaka, Bangladesh (1240/7 Kazipara Mirpur 10)": "ঠিকানা: মিরপুর ১০, ঢাকা, বাংলাদেশ (১২৪০/৭ কাজীপাড়া মিরপুর ১০)",
        "You are welcome anytime! We warmly invite you to visit us to check out all our products firsthand, inspect the seed quality, or discuss any queries with our team.": "আপনি যে কোনো সময় আমন্ত্রিত! আমাদের সমস্ত পণ্য নিজে দেখতে, বীজের গুণমান যাচাই করতে অথবা আমাদের টিমের সাথে যে কোনো প্রশ্ন নিয়ে আলোচনা করতে আমাদের প্রধান কার্যালয় পরিদর্শনে আপনাকে সাদর আমন্ত্রণ।",`;

if (html.includes(oldDictLine) && !html.includes('KSFL Agro Ltd. Head Office": "কেএসএফএল')) {
  html = html.replace(oldDictLine, newDictLines);
  console.log('Successfully added Bangla translations to dictionary.');
} else {
  console.warn('Bangla translations already injected or dictionary target not found.');
}

fs.writeFileSync(contactPath, html, 'utf8');
console.log('Finished processing contact.html');
