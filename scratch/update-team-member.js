const fs = require('fs');

const file = 'e:/greenspout/about.html';

const updates = {
  name: { old: 'Elena Rostova', new: 'Tuhin', bn: 'তুহিন' },
  role: { old: 'Lead Agronomist', new: 'Managing Director of KSFL Agro Ltd', bn: 'কেএসএফএল এগ্রো লিঃ এর ব্যবস্থাপনা পরিচালক' },
  details: { 
    old: 'Elena ensures our crops thrive naturally by developing cutting-edge organic soil management strategies.', 
    new: 'Over decades of immense experience and hands on experience with farming, seed and crop production', 
    bn: 'কৃষিকাজ, বীজ এবং ফসল উৎপাদনে কয়েক দশকের বিশাল অভিজ্ঞতা এবং হাতে-কলমে অভিজ্ঞতা।'
  },
  img: { old: 'team_agronomist.png', new: '651141141_122098048281025059_3407779733275887259_n.jpg' }
};

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');

  // 1. Update HTML
  html = html.replace(updates.name.old, updates.name.new);
  html = html.replace(updates.role.old, updates.role.new);
  html = html.replace(updates.details.old, updates.details.new);
  html = html.replace(updates.img.old, updates.img.new);

  // 2. Update JSON translations
  // Format: "Key": "Value"
  // Name
  html = html.replace(`"${updates.name.old}": "এলেনা রোস্তোভা"`, `"${updates.name.new}": "${updates.name.bn}"`);
  // Role
  html = html.replace(`"${updates.role.old}": "প্রধান কৃষিবিদ"`, `"${updates.role.new}": "${updates.role.bn}"`);
  // Details
  html = html.replace(`"${updates.details.old}": "এলেনা আমাদের ফসলকে প্রাকৃতিকভাবে বাড়ানোর জন্য আধুনিক জৈব মাটি ব্যবস্থাপনা কৌশল তৈরি করেন।"`, `"${updates.details.new}": "${updates.details.bn}"`);

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
}
