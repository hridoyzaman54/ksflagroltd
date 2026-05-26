const fs = require('fs');
const filePath = 'e:\\greenspout\\about.html';
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = `            <!-- MD ASADUZZAMAN -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(33.333% - 20px); max-width: 380px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 380px; overflow: hidden;">
                    <img src="./assets/GALLERY/gallery%20homepage%20(4).png"`;

const replacementStr = `            <!-- MD ASADUZZAMAN -->
            <div class="team-member-card" style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: calc(33.333% - 20px); max-width: 380px; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                <div class="team-member-img-wrap" style="height: 380px; overflow: hidden;">
                    <img src="./assets/images/team/asaduzzaman.jpg"`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');
const normalizedReplacement = replacementStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
    const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log("SUCCESS: Asaduzzaman image path successfully updated to ./assets/images/team/asaduzzaman.jpg!");
} else {
    console.error("ERROR: Target Asaduzzaman block not found in about.html.");
}
