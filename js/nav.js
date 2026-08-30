/* =========================================================
   SIVARRA — nav.js
   Sticky navigation background on scroll + mobile hamburger
   menu toggle. No dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    /* --- Sticky nav state --- */
    const nav = document.getElementById('nav');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 30) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* --- Mobile menu --- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        const toggleMenu = (e) => {
            if (e) e.preventDefault();
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        };

        navToggle.addEventListener('click', toggleMenu);

        // Close menu when any link is clicked
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

