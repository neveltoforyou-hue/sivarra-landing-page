/* =========================================================
   SIVARRA — cms-loader.js
   Progressive content hydration for Decap CMS editable data:
   - Contact & operating hours (data/contact.json)
   - Gallery images & captions (data/gallery.json)
   - Client testimonials (data/reviews.json)
   - Services & signature rituals (data/services.json)

   Fail-safe: If any JSON is missing/slow, the hardcoded HTML
   remains visible with 0ms FOUC and zero layout shift.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Helper for safe non-blocking fetch
    const loadJSON = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
        } catch (e) {
            return null;
        }
    };

    /* --- 1. Contact Info & Hours --- */
    loadJSON('data/contact.json').then(data => {
        if (!data) return;

        // Update phone numbers across buttons and links if specified
        if (data.phone) {
            const cleanPhone = data.phone.replace(/\D/g, '');
            const displayPhone = '+91 ' + cleanPhone.replace(/(\d{5})(\d{5})/, '$1 $2');

            // Location reservations block
            document.querySelectorAll('a[href^="tel:"]').forEach(el => {
                el.href = `tel:+91${cleanPhone}`;
                if (el.classList.contains('value')) {
                    el.textContent = displayPhone;
                }
            });

            // WhatsApp buttons
            document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
                el.href = `https://wa.me/91${cleanPhone}`;
            });
        }

        // Update operating hours
        const hoursList = document.querySelector('.hours-list');
        if (hoursList) {
            const items = hoursList.querySelectorAll('li');
            if (items[0] && data.hours_weekday) {
                const timeEl = items[0].querySelector('.time');
                if (timeEl) timeEl.textContent = data.hours_weekday;
            }
            if (items[1] && data.hours_saturday) {
                const timeEl = items[1].querySelector('.time');
                if (timeEl) timeEl.textContent = data.hours_saturday;
            }
            if (items[2] && data.hours_sunday) {
                const timeEl = items[2].querySelector('.time');
                if (timeEl) timeEl.textContent = data.hours_sunday;
            }
            if (items[3] && data.hours_monday) {
                const timeEl = items[3].querySelector('.time');
                if (timeEl) timeEl.textContent = data.hours_monday;
            }
        }
    });

    /* --- 2. Gallery Images & Captions --- */
    loadJSON('data/gallery.json').then(data => {
        if (!data || !Array.isArray(data.photos)) return;

        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
        data.photos.forEach((photo, idx) => {
            const item = galleryItems[idx];
            if (!item || !photo) return;

            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');

            if (img && photo.image) {
                img.src = photo.image;
                if (photo.alt || photo.caption) img.alt = photo.alt || photo.caption;
            }
            if (caption && photo.caption) {
                caption.textContent = photo.caption;
            }
        });
    });

    /* --- 3. Reviews & Testimonials --- */
    loadJSON('data/reviews.json').then(data => {
        if (!data || !Array.isArray(data.reviews_list)) return;

        const cards = document.querySelectorAll('.testimonials-grid .quote-card');
        data.reviews_list.forEach((rev, idx) => {
            const card = cards[idx];
            if (!card || !rev) return;

            const textEl = card.querySelector('.quote-text');
            const authorEl = card.querySelector('.quote-author');

            if (textEl && rev.quote) {
                textEl.textContent = rev.quote;
            }

            if (authorEl && rev.name) {
                const localeText = rev.locale ? `<span class="locale">${rev.locale}</span>` : '';
                authorEl.innerHTML = `${rev.name}${localeText}`;
            }
        });
    });

    /* --- 4. Services & Rituals --- */
    loadJSON('data/services.json').then(data => {
        if (!data || !Array.isArray(data.categories)) return;

        const serviceCards = document.querySelectorAll('.services-grid .service-card');
        data.categories.forEach((cat, idx) => {
            const card = serviceCards[idx];
            if (!card || !cat) return;

            const nameEl = card.querySelector('.service-name');
            const descEl = card.querySelector('.service-desc');
            const listEl = card.querySelector('.service-list');
            const priceEl = card.querySelector('.price-on-req');

            if (nameEl && cat.name) nameEl.textContent = cat.name;
            if (descEl && cat.description) descEl.textContent = cat.description;
            if (priceEl && cat.price_note) priceEl.textContent = cat.price_note;

            if (listEl && Array.isArray(cat.rituals) && cat.rituals.length > 0) {
                listEl.innerHTML = cat.rituals.map(r => `<li>${typeof r === 'object' && r.item ? r.item : r}</li>`).join('');
            }
        });
    });
});
