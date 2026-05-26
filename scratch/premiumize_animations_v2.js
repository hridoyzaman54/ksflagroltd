const fs = require('fs');
const path = require('path');

const filePath = 'e:\\greenspout\\about.html';
const content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to avoid Windows CRLF discrepancy
const normalizedContent = content.replace(/\r\n/g, '\n');

// Targets
const oldStyleBlock = `    <style>
        .team-member-card {
            opacity: 0;
            transform: translateY(120px) scale(0.88) rotate(-1.5deg);
            transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) !important, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) !important, box-shadow 0.3s ease !important;
            will-change: opacity, transform;
        }
        .team-member-card.revealed {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        .team-member-card.revealed:hover {
            transform: translateY(-10px) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .team-member-card:hover .team-member-img-wrap img {
            transform: scale(1.05) !important;
        }
        @media screen and (max-width: 991px) {
            .team-grid-top, .team-grid-bottom {
                flex-direction: column;
                align-items: center;
                gap: 30px;
            }
            .team-member-card {
                width: 100% !important;
                max-width: 450px !important;
            }
            .team-member-img-wrap {
                height: 400px !important;
            }
        }
    </style>`.replace(/\r\n/g, '\n');

const newStyleBlock = `    <style>
        .team-member-card {
            opacity: 0;
            transform: translateY(160px) scale(0.78) rotate(-4.5deg);
            transition: opacity 1.3s cubic-bezier(0.34, 1.6, 0.64, 1) !important, 
                        transform 1.3s cubic-bezier(0.34, 1.6, 0.64, 1) !important, 
                        box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
            will-change: opacity, transform;
        }
        .team-member-card.revealed {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        .team-member-card.hover-ready {
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important, 
                        box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important,
                        opacity 0.4s ease !important;
        }
        .team-member-card.revealed:hover {
            transform: translateY(-16px) scale(1.04) rotate(1deg) !important;
            box-shadow: 0 30px 60px rgba(41, 57, 32, 0.16) !important;
        }
        .team-member-card:hover .team-member-img-wrap img {
            transform: scale(1.08) !important;
        }
        @media screen and (max-width: 991px) {
            .team-grid-top, .team-grid-bottom {
                flex-direction: column;
                align-items: center;
                gap: 30px;
            }
            .team-member-card {
                width: 100% !important;
                max-width: 450px !important;
            }
            .team-member-img-wrap {
                height: 400px !important;
            }
        }
    </style>`.replace(/\r\n/g, '\n');

const oldScriptBlock = `    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelectorAll(".team-member-card");
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            visibleEntries.forEach((entry, index) => {
                const card = entry.target;
                card.style.transitionDelay = \`\${index * 160}ms\`;
                card.classList.add("revealed");
                observer.unobserve(card);
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    });
    </script>`.replace(/\r\n/g, '\n');

const newScriptBlock = `    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelectorAll(".team-member-card");
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.05
        };

        let revealQueue = [];
        let revealTimeout = null;

        function processQueue() {
            if (revealQueue.length === 0) return;
            
            revealQueue.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transitionDelay = '0ms';
                    card.classList.add("revealed");
                    
                    // Allow hover interaction to be snappy after animation completes
                    setTimeout(() => {
                        card.classList.add("hover-ready");
                    }, 1400);
                }, index * 220); // Dynamic stagger spacing of 220ms for ultra premium rhythmic cascade!
            });
            
            revealQueue = [];
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    if (!card.classList.contains("revealed") && !revealQueue.includes(card)) {
                        revealQueue.push(card);
                        observer.unobserve(card);
                    }
                }
            });

            if (revealQueue.length > 0) {
                if (revealTimeout) clearTimeout(revealTimeout);
                revealTimeout = setTimeout(processQueue, 50);
            }
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    });
    </script>`.replace(/\r\n/g, '\n');

if (normalizedContent.includes(oldStyleBlock)) {
    let updatedContent = normalizedContent.replace(oldStyleBlock, newStyleBlock);
    
    if (updatedContent.includes(oldScriptBlock)) {
        updatedContent = updatedContent.replace(oldScriptBlock, newScriptBlock);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log("SUCCESS: Both style block and script block replaced successfully!");
    } else {
        console.error("ERROR: Script block was not matched, style block matched though.");
    }
} else {
    console.error("ERROR: Style block was not matched.");
    // Let's do some debugging to see where it differed
    const idxStyle = normalizedContent.indexOf('.team-member-card {');
    if (idxStyle !== -1) {
        console.log("Style context around .team-member-card:\n", normalizedContent.substring(idxStyle - 100, idxStyle + 300));
    }
    const idxScript = normalizedContent.indexOf('const cards = document.querySelectorAll(".team-member-card");');
    if (idxScript !== -1) {
        console.log("Script context around cards select:\n", normalizedContent.substring(idxScript - 100, idxScript + 300));
    }
}
