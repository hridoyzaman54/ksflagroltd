const fs = require('fs');
const html = fs.readFileSync('e:/greenspout/about.html', 'utf8');

// Find the video source
const videoSourceMatch = html.match(/<source[^>]*>/g);
console.log('Video sources found:');
if (videoSourceMatch) {
  videoSourceMatch.forEach(src => console.log(src));
}

// Find the images
const imgMatches = html.match(/<img[^>]*>/g);
console.log('\nImages found:');
if (imgMatches) {
  imgMatches.forEach(img => {
    const srcMatch = img.match(/src="([^"]+)"/);
    if (srcMatch) {
      console.log(srcMatch[1]);
    }
  });
}
