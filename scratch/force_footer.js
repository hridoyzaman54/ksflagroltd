/**
 * FORCE FIX about.html footer to match homepage dark green style.
 * Injects inline JS that sets the footer background directly on the DOM element.
 */
const fs = require('fs');

let about = fs.readFileSync('e:\\greenspout\\about.html', 'utf8');

// Remove ALL previous footer fix attempts
about = about.replace(/<style id="ksfl-footer-bg">[\s\S]*?<\/style>/g, '');
about = about.replace(/<script id="ksfl-force-footer">[\s\S]*?<\/script>/g, '');

// Inject a script that FORCES the footer background via direct DOM style (cannot be overridden)
const forceScript = `
<script id="ksfl-force-footer">
(function(){
  function forceFooter(){
    var f = document.getElementById('footer');
    if(!f) return;
    f.style.setProperty('background-image','url(./assets/wp-content/uploads/2025/11/footer-img.webp)','important');
    f.style.setProperty('background-size','cover','important');
    f.style.setProperty('background-repeat','no-repeat','important');
    f.style.setProperty('background-position','50% 50%','important');
    f.style.setProperty('background-color','#293920','important');
  }
  forceFooter();
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',forceFooter);}
  window.addEventListener('load',forceFooter);
})();
</script>
`;

const bodyEnd = about.lastIndexOf('</body>');
about = about.substring(0, bodyEnd) + forceScript + about.substring(bodyEnd);

fs.writeFileSync('e:\\greenspout\\about.html', about, 'utf8');
console.log('✅ Forced dark footer via DOM inline style on about.html');
