/* ===================================
   ARNIE SANTOS PORTFOLIO - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Preloader
    initPreloader();

    // Navbar scroll effect
    initNavbarScroll();

    // Smooth scrolling for navigation links
    initSmoothScroll();

    // Back to top button
    initBackToTop();

    // Portfolio filter
    initPortfolioFilter();

    // Counter animation
    initCounterAnimation();

    // Navbar active link highlighting
    initActiveNavLink();

    // Video Showcase
    initVideoShowcase();
});

/* ===================================
   PRELOADER
   =================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
        }, 500);
    });
}

/* ===================================
   NAVBAR SCROLL EFFECT
   =================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');

    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
}

/* ===================================
   SMOOTH SCROLLING
   =================================== */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                const navbarHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

/* ===================================
   BACK TO TOP BUTTON
   =================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===================================
   PORTFOLIO FILTER
   =================================== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            if (filterValue === 'all') {
                // Show all items and categories
                portfolioItems.forEach(item => {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                });
                portfolioCategories.forEach(category => {
                    category.style.display = 'block';
                });
            } else {
                // Filter items
                portfolioItems.forEach(item => {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Show/hide categories based on if they have visible items
                portfolioCategories.forEach(category => {
                    const visibleItems = category.querySelectorAll(`.portfolio-item[data-category="${filterValue}"]`);
                    if (visibleItems.length > 0) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            }
        });
    });
}

/* ===================================
   COUNTER ANIMATION
   =================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer to trigger counter animation when visible
    const aboutSection = document.getElementById('about');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

/* ===================================
   ACTIVE NAV LINK HIGHLIGHTING
   =================================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Check initial state
}

/* ===================================
   FADE IN ANIMATION KEYFRAME
   =================================== */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

/* ===================================
   IMAGE LAZY LOADING PLACEHOLDER
   =================================== */
function initPlaceholderImages() {
    // This function will be called when actual images are added
    // For now, placeholders are styled with CSS gradients
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Add error handler for broken images
        img.addEventListener('error', function () {
            this.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
            this.alt = 'Image placeholder';
        });
    });
}

// Initialize placeholder image handling
initPlaceholderImages();

/* ===================================
   OPTIONAL: PARTICLE BACKGROUND
   =================================== */
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');

    if (!particlesContainer) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = 50;

    function resize() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(238, 228, 0, ${p.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
}

// Initialize particle background
initParticleBackground();

/* ===================================
   VIDEO SHOWCASE
   =================================== */
/* ===================================
   VIDEO SHOWCASE (CLOUD STREAMING)
   =================================== */
function initVideoShowcase() {
    // CONFIGURATION: PASTE YOUR DETAILS HERE
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiRlXNQf6Tx7IjHYjXjIAB_wHKVFx2Wrz2eJ1KeCnhZB4KZtELr6_LCw--Bf0Ck13P/exec'; 
    const DRIVE_FOLDER_ID = '1xII4TUaNcpR7grgSRG3gIJxcdlF0ZbWa'; // The ID you provided
    
    // UI Elements
    const videoPlayer = document.getElementById('showcaseVideo');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const currentNum = document.getElementById('videoCurrent');
    const totalNum = document.getElementById('videoTotal');
    const title = document.getElementById('videoTitle');
    const desc = document.getElementById('videoDesc');
    const overlay = document.querySelector('.video-overlay h3'); // Title overlay if visible

    if (!videoPlayer) return;

    let videoData = [];
    let currentIndex = 0;

    // Loading State
    title.textContent = "Loading Videos...";
    desc.textContent = "Fetching playlist from cloud...";
    if (videoPlayer) videoPlayer.style.opacity = '0.5';

    // Fetch Video List from Google Apps Script
    fetch(`${GOOGLE_SCRIPT_URL}?folderId=${DRIVE_FOLDER_ID}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                videoData = data;
                totalNum.textContent = videoData.length;
                
                // Initialize first video
                loadVideo(0);
                
                if (videoPlayer) videoPlayer.style.opacity = '1';
                console.log("Loaded " + data.length + " videos from Drive.");
            } else {
                showError("No videos found in folder.");
            }
        })
        .catch(error => {
            console.error('Error fetching playlist:', error);
            // Fallback to local hardcoded list if cloud fails (Optional)
            // For now, show error to prompt user configuration
            title.textContent = "Setup Required";
            desc.textContent = "Please configure the Google Script URL in js/main.js";
        });

    function loadVideo(index) {
        if (index < 0 || index >= videoData.length) return;
        
        const data = videoData[index];
        currentIndex = index;

        // Update Text
        title.textContent = data.title;
        desc.textContent = data.desc || "Cloud Stream via Drive";
        currentNum.textContent = currentIndex + 1;
        
        // FIX: Use Google Drive Embed/Preview URL for Iframes
        // This is much more reliable than direct streaming links
        let embedUrl = data.src;
        try {
            if (data.src.includes('id=')) {
                const fileId = data.src.split('id=')[1];
                // 'preview' is the mode for embeds
                embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            }
        } catch (e) {
            console.error("Error parsing video ID", e);
        }

        console.log("Loading Embed: " + data.title + " -> " + embedUrl);
        videoPlayer.src = embedUrl; 
    }

    // Controls
    prevBtn.addEventListener('click', () => {
        if (videoData.length === 0) return;
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = videoData.length - 1;
        loadVideo(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        if (videoData.length === 0) return;
        let newIndex = currentIndex + 1;
        if (newIndex >= videoData.length) newIndex = 0;
        loadVideo(newIndex);
    });
}
