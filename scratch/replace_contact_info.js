const fs = require('fs');
const filePath = 'e:\\greenspout\\contact.html';
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = `<div class="dpyo66ee" data-kirki="dpofy1go"><p class="p1_regular font-heading" data-kirki="dphgnhli">Phone</p><a class="dp9zqq93 kirki-inline-element" data-kirki="dptcmcge"  target="" href="tel:+8801715249371" ><span class="p2 font-p1" data-kirki="dpxrhbbh">+8801715249371</span></a></div><div class="dpyo66ee" data-kirki="dpszu5i9"><p class="p1_regular font-heading" data-kirki="dptbok3k">Email</p><a class="dp9zqq93 kirki-inline-element" data-kirki="dpmtrn17" target="" href="/cdn-cgi/l/email-protection#b5968ac6c0d7dfd0d6c188c0dbd1d0d3dcdbd0d1"><span class="p2 font-p1" data-kirki="dpf7hg8d"><span class="__cf_email__" data-cfemail="711c10181d311409101c011d145f121e1c">[email&#160;protected]</span></span></a></div>`;

const replacementStr = `<div class="dpyo66ee" data-kirki="dpofy1go"><p class="p1_regular font-heading" data-kirki="dphgnhli">Phone</p><div style="display: flex; flex-direction: column; gap: 4px;"><a class="dp9zqq93 kirki-inline-element" data-kirki="dptcmcge" href="tel:+8801715249371" style="display: inline-block;"><span class="p2 font-p1" data-kirki="dpxrhbbh">+8801715249371</span></a><a class="dp9zqq93 kirki-inline-element" data-kirki="dptcmcge" href="tel:01580-371162" style="display: inline-block;"><span class="p2 font-p1" data-kirki="dpxrhbbh">01580-371162</span></a></div></div><div class="dpyo66ee" data-kirki="dpszu5i9"><p class="p1_regular font-heading" data-kirki="dptbok3k">Email</p><a class="dp9zqq93 kirki-inline-element" data-kirki="dpmtrn17" target="" href="mailto:shohelakter@gmail.com"><span class="p2 font-p1" data-kirki="dpf7hg8d">shohelakter@gmail.com</span></a></div>`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');
const normalizedReplacement = replacementStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log("SUCCESS: Contact info updated successfully!");
} else {
    console.error("ERROR: Target contact block not found in contact.html.");
}
