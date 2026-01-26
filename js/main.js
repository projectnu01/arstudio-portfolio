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
function initVideoShowcase() {
    const videoData = [
        {
            src: 'assets/images/portfolio/videos/MR AND MISS DALGMCI 2025.mov',
            title: 'Mr & Miss DALGMCI 2025',
            desc: 'Event & Pageant Highlights'
        },
        {
            src: 'assets/images/portfolio/videos/7th Bigkasin AVP.mp4',
            title: '7th Bigkasin AVP',
            desc: 'Audio Visual Presentation'
        },
        {
            src: 'assets/images/portfolio/videos/Cuts by Darren.mp4',
            title: 'Cuts by Darren',
            desc: 'Stylized Editing Showcase'
        },
        {
            src: 'assets/images/portfolio/videos/ICSLIS 2023 GENERAL ASSEMBLY SDE .mp4',
            title: 'ICSLIS 2023 General Assembly',
            desc: 'Same Day Edit Highlights'
        },
        {
            src: 'assets/images/portfolio/videos/ICSLIS CHRISTMAS DECOR.mp4',
            title: 'ICSLIS Christmas Decor',
            desc: 'Event Coverage & Highlights'
        },
        {
            src: 'assets/images/portfolio/videos/ICSLIS DAYS 2024 SDE .mp4',
            title: 'ICSLIS Days 2024',
            desc: 'Same Day Edit Cinematic'
        },
        {
            src: 'assets/images/portfolio/videos/LUPANG HINIRANG AVP SFD.mp4',
            title: 'Lupang Hinirang AVP',
            desc: 'SFD Presentation'
        },
        {
            src: 'assets/images/portfolio/videos/MR AND MISS FINAL OUTPUT.mp4',
            title: 'Mr & Miss ICSLIS 2024 ',
            desc: 'Production Output'
        },
        {
            src: 'assets/images/portfolio/videos/PSI-SDG.mp4',
            title: 'PSI-SDG Project',
            desc: 'Proverbsville INC. SDG Project'
        },
        {
            src: 'assets/images/portfolio/videos/SDE - MISTER AND MISS DALGMCI .mov',
            title: 'SDE: Mr & Miss DALGMCI',
            desc: 'DALGMCI 2025 SDE'
        },
        {
            src: 'assets/images/portfolio/videos/SDE RY AND JO THE WEDDING.mp4',
            title: 'Ry & Jo Wedding',
            desc: 'RYAN AND JO WEDDING SDE'
        },
        {
            src: 'assets/images/portfolio/videos/SFD SDE FINAL.mp4',
            title: 'SFD Event SDE',
            desc: 'Software Freedom Day 2023 SDE'
        },
        {
            src: 'assets/images/portfolio/videos/National book Week 2025 (NBW 2025).mov',
            title: 'NBW 2025',
            desc: 'National Book Week 2025 SDE'
        }
    ];

    let currentIndex = 0;
    const videoPlayer = document.getElementById('showcaseVideo');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const currentNum = document.getElementById('videoCurrent');
    const title = document.getElementById('videoTitle');
    const desc = document.getElementById('videoDesc');

    if (!videoPlayer) return;

    // Load initial video data
    function loadInitial() {
        const data = videoData[0];
        // Don't auto-set src here to avoid double loading if HTML has it, 
        // but we want to sync title/desc
        title.textContent = data.title;
        desc.textContent = data.desc;

        // Error handling for video
        videoPlayer.addEventListener('error', () => {
            // Fallback or user notification could go here
            console.log("Video source not found: " + videoPlayer.src);
        }, true);
    }
    loadInitial();

    function updateVideo(index) {
        const data = videoData[index];
        videoPlayer.src = data.src;
        title.textContent = data.title;
        desc.textContent = data.desc;
        currentNum.textContent = index + 1;

        // Auto play on switch? Maybe not to be intrusive, but user clicked next so maybe yes
        videoPlayer.load();
        videoPlayer.play().catch(e => console.log('Autoplay prevented', e));
    }

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = videoData.length - 1;
        updateVideo(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= videoData.length) currentIndex = 0;
        updateVideo(currentIndex);
    });
}
