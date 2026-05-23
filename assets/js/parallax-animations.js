/**
 * Premium Parallax & Mouse Navigation Animations Controller
 * Built with performance-optimized vanilla JS utilizing IntersectionObserver,
 * MutationObserver, requestAnimationFrame, and hardware-accelerated translations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 1. Auto-attach triggers to existing and dynamically added elements
  autoAttachTriggers();
  
  // 2. Initialize Controllers
  initReveals();
  
  if (!isTouch) {
    initScrollParallax();
    initMouseParallax();
    init3DTilts();
    
    // Set up MutationObserver to watch for dynamic Kirki renders
    const observer = new MutationObserver((mutations) => {
      let needsReinit = false;
      for (let mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          needsReinit = true;
          break;
        }
      }
      if (needsReinit) {
        autoAttachTriggers();
        initReveals();
        init3DTilts();
        initMouseParallax();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    initMobileTaptics();
  }

  // ----------------------------------------------------
  // Auto-Attach Animation Triggers
  // ----------------------------------------------------
  function autoAttachTriggers() {
    // A. Reveal-on-scroll elements:
    const revealSelectors = [
      '.dpvxn4ux', // Category badges
      'h2.h3', 'h2', 'h3', '.h3', '.h4', // Headings
      '.awwards-item', // Award items
      '.work-process-img', // Work process images
      '.blogs-item', // Blog list items
      '.team-header-badge', '.team-header-title', '.team-ceo-card', '.team-member-card', // Team section on about page
      '.contact-info-card', '.contact-form-container' // Contact details
    ];
    
    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', 'true');
          // Add staggered classes based on order for an organic feel
          if (index % 3 === 1) {
            el.classList.add('parallax-slide-up');
          } else if (index % 3 === 2) {
            el.classList.add('parallax-slide-up');
          } else {
            el.classList.add('parallax-reveal');
          }
        }
      });
    });

    // B. 3D Tilt Hover elements:
    const tiltSelectors = [
      '.awwards-item', 
      '.blogs-item', 
      '.team-ceo-card', 
      '.team-member-card', 
      '.work-process-img',
      '.contact-info-card'
    ];
    
    tiltSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.hasAttribute('data-tilt')) {
          el.setAttribute('data-tilt', 'true');
          el.setAttribute('data-tilt-max', '6'); // Subtle tilt limit for premium visual aesthetic
        }
      });
    });

    // C. Scroll Parallax elements:
    const parallaxSelectors = [
      '.dpos4xf4 img', // Homepage hero images
      '.team-ceo-card .team-member-img', // CEO spotlight photo
      '.work-process-img img', // Process diagrams
      '.discover-img-infinity', // Portfolio images
      '.hero-bg-parallax'
    ];
    
    parallaxSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        if (!el.hasAttribute('data-parallax-speed')) {
          // Staggered speed factors for complex depth stacking
          const speed = 0.06 + (index % 3) * 0.03;
          el.setAttribute('data-parallax-speed', speed.toString());
        }
      });
    });

    // D. Mouse-parallax containers & layers:
    document.querySelectorAll('.dpos4xf4').forEach(container => {
      if (!container.hasAttribute('data-mouse-parallax-container')) {
        container.setAttribute('data-mouse-parallax-container', 'true');
        // Make images inside translate on hover
        container.querySelectorAll('.dpbmlwbf, .kirki-image').forEach((layer, index) => {
          layer.classList.add('mouse-parallax-layer');
          if (!layer.hasAttribute('data-mouse-depth')) {
            layer.setAttribute('data-mouse-depth', (12 + index * 8).toString());
          }
        });
      }
    });
  }
  
  // ----------------------------------------------------
  // 1. Reveal-on-Scroll Animations (IntersectionObserver)
  // ----------------------------------------------------
  function initReveals() {
    const revealElements = document.querySelectorAll('[data-reveal]:not(.parallax-reveal-inited)');
    if (revealElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('parallax-active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.classList.add('parallax-reveal', 'parallax-reveal-inited');
      observer.observe(el);
    });
  }

  // ----------------------------------------------------
  // 2. Scroll Parallax (Hardware Accelerated Lerping)
  // ----------------------------------------------------
  function initScrollParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax-speed]');
    if (parallaxItems.length === 0) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    const lerpFactor = 0.1; // Smooth interpolation speed

    window.addEventListener('scroll', () => {
      targetScrollY = window.scrollY;
    }, { passive: true });

    function updateParallax() {
      currentScrollY += (targetScrollY - currentScrollY) * lerpFactor;
      const viewportHeight = window.innerHeight;

      parallaxItems.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.1;
        const rect = item.getBoundingClientRect();
        
        const topOfItem = rect.top + window.scrollY;
        const offset = currentScrollY + (viewportHeight / 2) - (topOfItem + rect.height / 2);
        
        const translateY = offset * speed * -0.25;
        item.style.setProperty('--scroll-parallax', `${translateY}px`);
      });

      requestAnimationFrame(updateParallax);
    }

    requestAnimationFrame(updateParallax);
  }

  // ----------------------------------------------------
  // 3. Mouse Move Parallax (Multi-layered Depth Effects)
  // ----------------------------------------------------
  function initMouseParallax() {
    const containers = document.querySelectorAll('[data-mouse-parallax-container]:not(.mouse-parallax-inited)');
    if (containers.length === 0) return;

    containers.forEach(container => {
      container.classList.add('mouse-parallax-inited');
      const layers = container.querySelectorAll('[data-mouse-depth]');
      if (layers.length === 0) return;

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      const lerp = 0.08;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      });

      container.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
      });

      function render() {
        mouseX += (targetX - mouseX) * lerp;
        mouseY += (targetY - mouseY) * lerp;

        layers.forEach(layer => {
          const depth = parseFloat(layer.getAttribute('data-mouse-depth')) || 20;
          const translateX = mouseX * depth;
          const translateY = mouseY * depth;
          layer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });

        requestAnimationFrame(render);
      }
      
      requestAnimationFrame(render);
    });
  }

  // ----------------------------------------------------
  // 4. 3D Card Hover & Tilting Animation
  // ----------------------------------------------------
  function init3DTilts() {
    const tiltCards = document.querySelectorAll('[data-tilt]:not(.tilt-inited)');
    if (tiltCards.length === 0) return;

    tiltCards.forEach(card => {
      card.classList.add('tilt-container', 'tilt-inited');
      
      const child = card.firstElementChild;
      if (!child) return;
      child.classList.add('tilt-element');

      const maxRotate = parseFloat(card.getAttribute('data-tilt-max')) || 8;
      let rotateX = 0;
      let rotateY = 0;
      let targetRotateX = 0;
      let targetRotateY = 0;
      const lerp = 0.15;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const percentX = mouseX / rect.width;
        const percentY = mouseY / rect.height;

        targetRotateX = (0.5 - percentY) * maxRotate * 2;
        targetRotateY = (percentX - 0.5) * maxRotate * 2;
      });

      card.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
      });

      function animate() {
        rotateX += (targetRotateX - rotateX) * lerp;
        rotateY += (targetRotateY - rotateY) * lerp;

        child.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    });
  }

  // ----------------------------------------------------
  // 5. Mobile Tactile & Tap Feedback (Taptic-style response)
  // ----------------------------------------------------
  function initMobileTaptics() {
    const buttons = document.querySelectorAll('.kirki-s220-dpeid32n, [kirki-navigation="nav-item"] a, .product-link, a.kirki-inline-element, button');
    buttons.forEach(btn => {
      if (!btn.hasAttribute('data-taptic')) {
        btn.setAttribute('data-taptic', 'true');
      }
    });
  }
});
