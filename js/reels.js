/* =========================================================
   SIVARRA — reels.js (Moments & Video Controls)
   1. Tap-to-unmute for moment video cards
   2. Prev/Next smooth scroll buttons for moments strip
   3. Mute/unmute toggle button for about section video
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. Moment card tap-to-unmute --- */
    document.querySelectorAll('.reel-card').forEach(card => {
        const btn = card.querySelector('.play-icon');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const video = card.querySelector('video');
            if (!video) return;
            if (video.muted) {
                video.muted = false;
                video.play().catch(() => {});
            } else {
                video.muted = true;
            }
        });
    });

    /* --- 2. Prev/Next navigation for moments strip --- */
    const strip = document.getElementById('momentsStrip') || document.querySelector('.reels-strip');
    const prevBtn = document.getElementById('momentsPrev');
    const nextBtn = document.getElementById('momentsNext');

    if (strip && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstCard = strip.querySelector('.reel-card');
            return firstCard ? firstCard.offsetWidth + 20 : 300;
        };

        prevBtn.addEventListener('click', () => {
            strip.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            strip.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    /* --- 3. About section video mute/unmute toggle --- */
    const aboutVideo = document.getElementById('aboutVideo');
    const aboutMuteBtn = document.getElementById('aboutMuteBtn');

    if (aboutVideo && aboutMuteBtn) {
        const iconMuted = aboutMuteBtn.querySelector('.icon-muted');
        const iconUnmuted = aboutMuteBtn.querySelector('.icon-unmuted');

        aboutMuteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (aboutVideo.muted) {
                aboutVideo.muted = false;
                aboutVideo.play().catch(() => {});
                if (iconMuted) iconMuted.style.display = 'none';
                if (iconUnmuted) iconUnmuted.style.display = 'block';
                aboutMuteBtn.setAttribute('aria-label', 'Mute video');
            } else {
                aboutVideo.muted = true;
                if (iconMuted) iconMuted.style.display = 'block';
                if (iconUnmuted) iconUnmuted.style.display = 'none';
                aboutMuteBtn.setAttribute('aria-label', 'Unmute video');
            }
        });
    }
});
