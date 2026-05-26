const fs = require('fs');
const filePath = 'e:\\greenspout\\about.html';
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = `            <!-- MD. SHOHEL AKTEAR PK -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(50% - 20px); max-width: 450px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 450px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(1).jpg"`;

const replacementStr = `            <!-- MD. SHOHEL AKTEAR PK -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(50% - 20px); max-width: 450px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 450px; overflow: hidden;">
                    <img src="./assets/images/team/shohel-akter.jpg"`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');
const normalizedReplacement = replacementStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log("SUCCESS: Shohel Aktear image path successfully updated to ./assets/images/team/shohel-akter.jpg!");
} else {
    console.error("ERROR: Target Shohel Aktear block not found in about.html.");
}
