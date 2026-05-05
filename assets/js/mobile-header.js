/* 
    Mobile Header Navigation Interactivity 
    Extracted from index.html (Source of Truth)
*/

document.addEventListener("DOMContentLoaded", function() {
    var hamburgerBtn = document.querySelector('.kirki-s220-dpjglwhg');
    var navContainer = document.querySelector('.kirki-s220-dp425u34');
    var productsLinkWrapper = document.querySelector('.kirki-s220-dpc2yp2a');
    var productsSubmenu = document.querySelector('.kirki-s220-dpi8cdrc');

    if (hamburgerBtn && navContainer) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navContainer.classList.toggle('kirki-mobile-open');
            hamburgerBtn.classList.toggle('kirki-hamburger-active');
        });
    }

    if (productsLinkWrapper && productsSubmenu) {
        productsLinkWrapper.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                if (productsSubmenu.contains(e.target)) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                productsSubmenu.classList.toggle('submenu-active');
                var chevron = productsLinkWrapper.querySelector('.kirki-s220-dpjmen6g');
                if (chevron) {
                    chevron.style.transform = productsSubmenu.classList.contains('submenu-active') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            }
        });
    }
});
