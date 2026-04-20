/* ============================================
   iPhone Ultra — Scroll-Linked Animation Engine
   ============================================ */

(function () {
    'use strict';

    // ---- Configuration ----
    const CONFIG = {
        heroImages: [
            'assets/images/iphone-hero.png',
            'assets/images/iphone-mid-explode.png',
            'assets/images/iphone-exploded.png',
        ],
        bgColor: '#000000',
        scrollSmoothing: 0.08,
        revealThreshold: 0.15,
    };

    // ---- State ----
    const state = {
        images: [],
        imagesLoaded: 0,
        totalImages: CONFIG.heroImages.length,
        currentFrame: 0,
        targetFrame: 0,
        animationFrame: null,
        scrollY: 0,
        isLoaded: false,
    };

    // ---- DOM References ----
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const canvas = $('#hero-canvas');
    const ctx = canvas.getContext('2d');
    const loader = $('#loader');
    const loaderProgress = $('#loader-progress');
    const heroOverlay = $('#hero-overlay');
    const scrollTexts = [
        $('#scroll-text-1'),
        $('#scroll-text-2'),
        $('#scroll-text-3'),
    ];
    const navbar = $('#navbar');
    const hamburger = $('#nav-hamburger');
    const mobileMenu = $('#mobile-menu');
    const navLinks = $$('.nav-link');
    const mobileLinks = $$('.mobile-link');

    // ---- Image Preloader ----
    function preloadImages() {
        return new Promise((resolve) => {
            let loaded = 0;

            CONFIG.heroImages.forEach((src, index) => {
                const img = new Image();
                img.onload = () => {
                    state.images[index] = img;
                    loaded++;
                    const progress = Math.round((loaded / state.totalImages) * 100);
                    if (loaderProgress) {
                        loaderProgress.textContent = `Loading ${progress}%`;
                    }

                    if (loaded === state.totalImages) {
                        state.isLoaded = true;
                        resolve();
                    }
                };
                img.onerror = () => {
                    // Still count as loaded to avoid hanging
                    loaded++;
                    console.warn(`Failed to load: ${src}`);
                    if (loaded === state.totalImages) {
                        state.isLoaded = true;
                        resolve();
                    }
                };
                img.src = src;
            });
        });
    }

    // ---- Canvas ----
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        drawFrame(state.currentFrame);
    }

    function drawFrame(frameIndex) {
        const img = state.images[frameIndex];
        if (!img) return;

        const cw = window.innerWidth;
        const ch = window.innerHeight;

        // Clear with matching background
        ctx.fillStyle = CONFIG.bgColor;
        ctx.fillRect(0, 0, cw, ch);

        // Contain fit — image fills ~75% of viewport
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cw / ch;

        let drawW, drawH, drawX, drawY;

        if (imgAspect > canvasAspect) {
            drawW = cw * 0.72;
            drawH = drawW / imgAspect;
        } else {
            drawH = ch * 0.72;
            drawW = drawH * imgAspect;
        }

        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // ---- Scroll Animation Engine ----
    function getScrollProgress() {
        const heroSection = $('#hero');
        if (!heroSection) return 0;

        const rect = heroSection.getBoundingClientRect();
        const sectionHeight = heroSection.offsetHeight - window.innerHeight;

        if (sectionHeight <= 0) return 0;

        const scrolled = -rect.top;
        return Math.max(0, Math.min(1, scrolled / sectionHeight));
    }

    function updateScrollAnimation() {
        const progress = getScrollProgress();
        const totalFrames = state.totalImages;

        // Map scroll progress to frame index
        // 0-0.5: assembled → mid-explode → exploded
        // 0.5-1.0: exploded → mid-explode → assembled (reverse)
        let frameProgress;

        if (progress <= 0.5) {
            // Forward: exploding
            frameProgress = progress * 2; // 0 to 1
        } else {
            // Reverse: reassembling
            frameProgress = (1 - progress) * 2; // 1 to 0
        }

        const frameIndex = Math.min(
            Math.round(frameProgress * (totalFrames - 1)),
            totalFrames - 1
        );

        state.targetFrame = frameIndex;

        // Update hero overlay opacity
        if (heroOverlay) {
            const fadeOut = Math.max(0, 1 - progress * 5);
            heroOverlay.style.opacity = fadeOut;
        }

        // Update scroll text overlays
        updateScrollTexts(progress);
    }

    function updateScrollTexts(progress) {
        // Tighter timings for 200vh runway
        // Text 1: appears at 10%-25%
        const t1Start = 0.08, t1Peak = 0.15, t1End = 0.25;
        // Text 2: appears at 30%-50%
        const t2Start = 0.30, t2Peak = 0.38, t2End = 0.50;
        // Text 3: appears at 65%-85%
        const t3Start = 0.60, t3Peak = 0.72, t3End = 0.88;

        const ranges = [
            { el: scrollTexts[0], start: t1Start, peak: t1Peak, end: t1End },
            { el: scrollTexts[1], start: t2Start, peak: t2Peak, end: t2End },
            { el: scrollTexts[2], start: t3Start, peak: t3Peak, end: t3End },
        ];

        ranges.forEach(({ el, start, peak, end }) => {
            if (!el) return;
            let opacity = 0;

            if (progress >= start && progress <= peak) {
                opacity = (progress - start) / (peak - start);
            } else if (progress > peak && progress <= end) {
                opacity = 1 - (progress - peak) / (end - peak);
            }

            el.style.opacity = Math.max(0, Math.min(1, opacity));
        });
    }

    // Smooth frame interpolation
    function animationLoop() {
        if (state.currentFrame !== state.targetFrame) {
            state.currentFrame = state.targetFrame;
            drawFrame(state.currentFrame);
        }

        state.animationFrame = requestAnimationFrame(animationLoop);
    }

    // ---- Scroll Reveal ----
    function initRevealObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');

                        // Animate metric bars
                        if (entry.target.classList.contains('metric')) {
                            const fill = entry.target.querySelector('.metric-fill');
                            if (fill) {
                                const width = fill.dataset.width || 0;
                                entry.target.style.setProperty('--fill-width', width + '%');
                            }
                        }

                        // Animate count-up numbers
                        const countEl = entry.target.querySelector('[data-count]');
                        if (countEl) {
                            animateCount(countEl);
                        }
                    }
                });
            },
            {
                threshold: CONFIG.revealThreshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        $$('[data-reveal]').forEach((el) => observer.observe(el));
    }

    function animateCount(el) {
        const target = parseFloat(el.dataset.count);
        const duration = 1500;
        const start = performance.now();
        const isFloat = target % 1 !== 0;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = target * eased;

            el.textContent = isFloat ? current.toFixed(1) : Math.round(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ---- Navigation ----
    function initNavigation() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });

        // Hamburger menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Active nav link on scroll
        const sections = $$('.section[id]');
        const observerNav = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach((link) => {
                            link.classList.toggle('active', link.dataset.page === id);
                        });
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-40% 0px -40% 0px' }
        );

        sections.forEach((section) => observerNav.observe(section));

        // Smooth scroll for nav links
        [...navLinks, ...mobileLinks].forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ---- Parallax micro effects ----
    function initParallaxEffects() {
        const chipHero = $('.chip-hero img');
        const displayHero = $('.display-hero img');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Subtle float effect on chip
            if (chipHero) {
                const chipSection = $('.performance-section');
                if (chipSection) {
                    const rect = chipSection.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + chipSection.offsetHeight);
                        chipHero.style.transform = `translateY(${(progress - 0.5) * -30}px)`;
                    }
                }
            }

            // Subtle float effect on display
            if (displayHero) {
                const displaySection = $('.display-section');
                if (displaySection) {
                    const rect = displaySection.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + displaySection.offsetHeight);
                        displayHero.style.transform = `translateY(${(progress - 0.5) * -20}px)`;
                    }
                }
            }
        }, { passive: true });
    }

    // ---- Init ----
    async function init() {
        // Preload images
        await preloadImages();

        // Setup canvas
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Draw first frame
        drawFrame(0);

        // Start scroll listener
        window.addEventListener('scroll', updateScrollAnimation, { passive: true });
        updateScrollAnimation();

        // Start animation loop
        animationLoop();

        // Init other features
        initRevealObserver();
        initNavigation();
        initParallaxEffects();

        // Hide loader
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 400);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
