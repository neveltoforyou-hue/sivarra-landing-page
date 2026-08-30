/* =========================================================
   SIVARRA — nav.js
   Sticky navigation background on scroll + mobile hamburger
   menu toggle. No dependencies.
   ========================================================= */

/* --- Sticky nav state --- */
const nav = document.getElementById('nav');
const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* --- Mobile menu --- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});
// Close menu when any link is clicked
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});
