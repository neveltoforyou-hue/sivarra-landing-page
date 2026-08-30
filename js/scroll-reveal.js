/* =========================================================
   SIVARRA — scroll-reveal.js
   IntersectionObserver-based scroll reveal. Elements with
   class "reveal" fade-in/slide-up when they enter the
   viewport. Respects prefers-reduced-motion automatically
   (the CSS in animations.css overrides the transition).
   ========================================================= */

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
} else {
    // Older browsers: just show everything
    reveals.forEach(el => el.classList.add('in'));
}
