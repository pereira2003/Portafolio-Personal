/* ===================================================================
 *
 *  NATHON ABRAHAN NAVARRO PEREIRA — REBRANDING ANIMATIONS
 *  Versión 2.0
 *
 * =================================================================== */

(function() {
    'use strict';


    /* --- Custom Cursor
    * -------------------------------------------- */
    const rbCursor = function() {
        const cursor = document.getElementById('rb-cursor');
        const ring = document.getElementById('rb-cursor-ring');
        if (!cursor || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let rafId = null;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            rafId = requestAnimationFrame(animateRing);
        }
        animateRing();

        // Grow on interactive elements
        document.querySelectorAll('a, button, .portfolio-item__link, .btn, .info-card').forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.opacity = '0.8';
                ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
                ring.style.borderColor = 'var(--rb-gold-light)';
            });
            el.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
                ring.style.transform = 'translate(-50%, -50%) scale(1)';
                ring.style.borderColor = 'var(--rb-gold)';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            ring.style.opacity = '0.5';
        });
    };


    /* --- Floating Particles
    * -------------------------------------------- */
    const rbParticles = function() {
        const container = document.getElementById('rb-particles');
        if (!container) return;

        const count = 18;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('rb-particle');

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random animation delay and duration
            const delay = Math.random() * 6;
            const duration = 6 + Math.random() * 8;
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            container.appendChild(particle);
        }
    };


    /* --- Typewriter Hero Name
    * -------------------------------------------- */
    const rbTypewriter = function() {
        const nameEl = document.getElementById('rb-hero-name');
        if (!nameEl) return;

        const fullText = nameEl.textContent.trim();
        nameEl.textContent = '';

        // Append cursor
        const cursorEl = document.createElement('span');
        cursorEl.classList.add('rb-typewriter-cursor');
        nameEl.parentNode.insertBefore(cursorEl, nameEl.nextSibling);

        let i = 0;
        let started = false;

        function startTyping() {
            if (started) return;
            started = true;

            function type() {
                if (i < fullText.length) {
                    nameEl.textContent += fullText.charAt(i);
                    i++;
                    setTimeout(type, 60 + Math.random() * 40);
                } else {
                    // Cursor stays blinking after typing completes
                    setTimeout(function() {
                        cursorEl.style.display = 'none';
                    }, 3000);
                }
            }
            type();
        }

        // Start after preloader is done 
        window.addEventListener('load', function() {
            setTimeout(startTyping, 1200);
        });
    };


    /* --- Scroll Reveal
    * -------------------------------------------- */
    const rbScrollReveal = function() {
        const revealEls = document.querySelectorAll('[data-rb-reveal], [data-rb-stagger]');
        if (!revealEls.length) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(function(el) {
            observer.observe(el);
        });
    };


    /* --- Count-Up Animation for Stats
    * -------------------------------------------- */
    const rbCountUp = function() {
        const stats = document.querySelectorAll('.stat-item__value[data-target]');
        if (!stats.length) return;

        const ease = function(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateCount = function(el) {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = ease(progress);
                const current = Math.round(easedProgress * target);
                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function(stat) {
            observer.observe(stat);
        });
    };


    /* --- Section Dividers Parallax
    * -------------------------------------------- */
    const rbParallax = function() {
        const intro = document.querySelector('.s-intro');
        if (!intro) return;

        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            const grid = document.querySelector('.rb-hero-grid');
            if (grid) {
                grid.style.transform = 'translateY(' + scrollY * 0.3 + 'px)';
            }
        }, { passive: true });
    };


    /* --- Header Active-Color Update
    * -------------------------------------------- */
    const rbHeaderAccent = function() {
        const header = document.querySelector('.s-header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 80) {
                header.classList.add('is-visible');
            } else {
                header.classList.remove('is-visible');
            }
        }, { passive: true });
    };


    /* --- Hover Magnetic Effect for Buttons
    * -------------------------------------------- */
    const rbMagnetic = function() {
        const magnets = document.querySelectorAll('.btn, .header-brand__link');

        magnets.forEach(function(el) {
            el.addEventListener('mousemove', function(e) {
                const rect = el.getBoundingClientRect();
                const xPos = e.clientX - rect.left - rect.width / 2;
                const yPos = e.clientY - rect.top - rect.height / 2;
                el.style.transform = 'translate(' + xPos * 0.15 + 'px, ' + yPos * 0.15 + 'px)';
            });

            el.addEventListener('mouseleave', function() {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
                setTimeout(function() {
                    el.style.transition = '';
                }, 500);
            });
        });
    };


    /* --- Info card tilt effect
    * -------------------------------------------- */
    const rbCardTilt = function() {
        const cards = document.querySelectorAll('.info-card, .stat-item');

        cards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = 
                    'translateY(-4px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
                card.style.transition = 'transform 0.1s linear, box-shadow 0.3s, border-color 0.3s';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.3s';
            });
        });
    };


    /* --- Portfolio Items — Stagger Reveal
    * -------------------------------------------- */
    const rbPortfolioReveal = function() {
        const items = document.querySelectorAll('.portfolio-item');
        if (!items.length) return;

        items.forEach(function(item, i) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.transitionDelay = (i * 0.1) + 's';
        });

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        items.forEach(function(item) {
            observer.observe(item);
        });
    };


    /* --- Footer reveal with glow
    * -------------------------------------------- */
    const rbFooterReveal = function() {
        const footer = document.querySelector('.s-footer');
        if (!footer) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    footer.style.opacity = '1';
                    observer.unobserve(footer);
                }
            });
        }, { threshold: 0.1 });

        footer.style.opacity = '0';
        footer.style.transition = 'opacity 1s ease';
        observer.observe(footer);
    };


    /* --- Golden line drawing on section title hover
    * -------------------------------------------- */
    const rbSectionTitleEffect = function() {
        const titles = document.querySelectorAll('.section-title');

        titles.forEach(function(title) {
            title.addEventListener('mouseenter', function() {
                title.style.textShadow = '0 0 40px rgba(201,168,76,0.15)';
            });
            title.addEventListener('mouseleave', function() {
                title.style.textShadow = 'none';
            });
        });
    };


    /* --- Initialize all
    * -------------------------------------------- */
    (function rbInit() {
        // Run immediately
        // rbParticles(); // Disabled: too flashy
        // rbTypewriter(); // Disabled: subtle design
        rbHeaderAccent();

        // Run after DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            // rbCursor(); // Disabled: custom cursor removed
            rbScrollReveal();
            rbCountUp();
            // rbParallax(); // Disabled: too flashy
            // rbMagnetic(); // Disabled: too flashy
            // rbCardTilt(); // Disabled: too flashy
            rbPortfolioReveal();
            rbFooterReveal();
            // rbSectionTitleEffect(); // Disabled: too flashy
        });
    })();

}());
