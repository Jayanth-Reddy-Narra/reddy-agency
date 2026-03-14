/* ============================================
   REDDY AGENCY – Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Navbar Scroll Effect ---------- */
    const navbar = document.querySelector('.navbar');
    const handleNavScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* ---------- Mobile Menu Toggle ---------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ---------- Scroll Reveal Animations ---------- */
    const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => revealObserver.observe(el));

    /* ---------- Back to Top Button ---------- */
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Contact Form Handling ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simple validation
            if (!data.name || !data.phone) {
                showFormMessage('Please fill in your name and phone number.', 'error');
                return;
            }

            if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ''))) {
                showFormMessage('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Success feedback (replace with real API call in production)
            showFormMessage('Thank you! We will contact you shortly.', 'success');
            form.reset();
        });
    }

    function showFormMessage(msg, type) {
        let msgEl = document.querySelector('.form-message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'form-message';
            form.appendChild(msgEl);
        }
        msgEl.textContent = msg;
        msgEl.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      animation: fadeIn 0.3s ease;
      background: ${type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
      color: ${type === 'success' ? '#059669' : '#DC2626'};
      border: 1px solid ${type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};
    `;
        setTimeout(() => msgEl.remove(), 5000);
    }

    /* ---------- Smooth scroll for all anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 10;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ---------- Lazy Image Loading (native + fallback) ---------- */
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
    } else {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    lazyObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[loading="lazy"]').forEach(img => lazyObserver.observe(img));
    }

    /* ---------- Dynamic Copyright Year ---------- */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});
