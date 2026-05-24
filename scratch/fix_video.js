const fs = require('fs');
let html = fs.readFileSync('e:\\greenspout\\index.html', 'utf8');

// Fix video element issues:
// 1. Remove #t=0,0 from source (tells browser to play 0 seconds)
// 2. Add autoplay attribute  
// 3. Fix playsinline (not playinline)
// 4. Fix boolean attributes

const oldVideo = `<video name="video" type="video\\/mp4" loop="true" muted="true" playbackrate="1" starttime="0" endtime="0" lazy="false" playinline="false" style="object-fit: fill; aspect-ratio: 16 / 9;" poster="">`;
const oldSource = `<source src="./assets/wp-content/uploads/2025/11/Home-video-1-1.mp4#t=0,0" type="video/mp4">`;

const newVideo = `<video name="video" type="video/mp4" loop muted autoplay playsinline preload="auto" style="object-fit: cover; width: 100%; height: 100%;" poster="">`;
const newSource = `<source src="./assets/wp-content/uploads/2025/11/Home-video-1-1.mp4" type="video/mp4">`;

if (html.includes(oldVideo)) {
  html = html.replace(oldVideo, newVideo);
  console.log('✅ Fixed video attributes');
} else {
  // Try alternate matching
  html = html.replace(
    /(<video[^>]*?)loop="true"([^>]*?)muted="true"([^>]*?)playinline="false"([^>]*?)>/,
    '$1loop muted autoplay playsinline preload="auto"$2$3$4 style="object-fit: cover; width: 100%; height: 100%;">'
  );
  console.log('✅ Fixed video via regex');
}

if (html.includes(oldSource)) {
  html = html.replace(oldSource, newSource);
  console.log('✅ Removed #t=0,0 from source URL');
} else {
  html = html.replace(
    /Home-video-1-1\.mp4#t=0,0/g,
    'Home-video-1-1.mp4'
  );
  console.log('✅ Removed #t=0,0 via fallback');
}

// Also add an IntersectionObserver script to force play when visible
const videoFixScript = `
<script id="ksfl-video-autoplay">
(function(){
  function forcePlay(){
    var videos = document.querySelectorAll('#video-section video');
    videos.forEach(function(v){
      v.removeAttribute('playinline');
      v.setAttribute('playsinline','');
      v.setAttribute('autoplay','');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.style.objectFit = 'cover';
      v.style.width = '100%';
      v.style.height = '100%';
      // Remove the #t=0,0 fragment that stops playback
      var src = v.querySelector('source');
      if(src && src.src.includes('#t=0,0')){
        src.src = src.src.replace('#t=0,0','');
        v.load();
      }
      v.play().catch(function(){});
    });

    // IntersectionObserver to play/pause on visibility
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          var v = e.target.querySelector('video');
          if(!v) return;
          if(e.isIntersecting){
            v.play().catch(function(){});
          }
        });
      }, {threshold: 0.2});
      var section = document.getElementById('video-section');
      if(section) obs.observe(section);
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',forcePlay);
  } else {
    forcePlay();
  }
  window.addEventListener('load',forcePlay);
})();
</script>
`;

// Remove old script if exists
html = html.replace(/<script id="ksfl-video-autoplay">[\s\S]*?<\/script>/g, '');

const bodyEnd = html.lastIndexOf('</body>');
html = html.substring(0, bodyEnd) + videoFixScript + html.substring(bodyEnd);

fs.writeFileSync('e:\\greenspout\\index.html', html, 'utf8');
console.log('✅ index.html video fixed and autoplay script added');
