const fs = require('fs');
const path = require('path');

const dir = 'e:/greenspout';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix known hardcoded absolute navigation links
  content = content.replace(/https:\/\/greensprout\.kirki\.io\/about\//g, './about.html');
  content = content.replace(/https:\/\/greensprout\.kirki\.io\/contact\//g, './contact.html');
  content = content.replace(/https:\/\/greensprout\.kirki\.io\/blogs\//g, './blogs.html');
  content = content.replace(/https:\/\/greensprout\.kirki\.io\/product\/seeds-farm-goods\//g, './seeds.html');
  content = content.replace(/https:\/\/greensprout\.kirki\.io\/product\/[^\/]+\//g, './products.html');
  
  // Replace the homepage link. Note we might have target="" or class="" around it.
  content = content.replace(/href="https:\/\/greensprout\.kirki\.io\/"/g, 'href="./index.html"');

  // URLs embedded in URL query parameters (e.g. oembed)
  // url=https%3A%2F%2Fgreensprout.kirki.io%2F
  content = content.replace(/https%3A%2F%2Fgreensprout\.kirki\.io/g, '.');

  // Replace all other occurrences of the live URL with a relative path
  // Since it's often used as https://greensprout.kirki.io/wp-json/ we replace with ./
  // Wait, if it is "https://greensprout.kirki.io" without trailing slash, it becomes "."
  content = content.replace(/https:\/\/greensprout\.kirki\.io\//g, './');
  content = content.replace(/https:\/\/greensprout\.kirki\.io/g, '.');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated links in ${file}`);
}

// We should also check the "site" directory if it's there
const siteDir = path.join(dir, 'site');
if (fs.existsSync(siteDir)) {
    const siteFiles = fs.readdirSync(siteDir).filter(f => f.endsWith('.html'));
    for (const file of siteFiles) {
        const filePath = path.join(siteDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        content = content.replace(/https:\/\/greensprout\.kirki\.io\/about\//g, './about.html');
        content = content.replace(/https:\/\/greensprout\.kirki\.io\/contact\//g, './contact.html');
        content = content.replace(/https:\/\/greensprout\.kirki\.io\/blogs\//g, './blogs.html');
        content = content.replace(/https:\/\/greensprout\.kirki\.io\/product\/seeds-farm-goods\//g, './seeds.html');
        content = content.replace(/https:\/\/greensprout\.kirki\.io\/product\/[^\/]+\//g, './products.html');
        content = content.replace(/href="https:\/\/greensprout\.kirki\.io\/"/g, 'href="./index.html"');
        content = content.replace(/https%3A%2F%2Fgreensprout\.kirki\.io/g, '.');
        content = content.replace(/https:\/\/greensprout\.kirki\.io\//g, './');
        content = content.replace(/https:\/\/greensprout\.kirki\.io/g, '.');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated links in site/${file}`);
    }
}

console.log('Finished removing live website URLs.');
