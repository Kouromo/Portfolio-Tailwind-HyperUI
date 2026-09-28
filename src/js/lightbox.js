document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the lightbox modal already exists. If not, inject it.
    let lightboxOverlay = document.getElementById('lightbox-overlay');
    
    if (!lightboxOverlay) {
        const lightboxHTML = `
            <div id="lightbox-overlay" aria-hidden="true"
                class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out">
                <div id="lightbox-content"
                    class="relative flex max-h-[90vh] max-w-[90vw] scale-95 flex-col items-center transition-transform duration-300 ease-in-out">
                    <button id="lightbox-close" aria-label="Fermer"
                        class="absolute -top-4 -right-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-gray-900/90 text-white shadow-lg shadow-black/50 transition duration-200 hover:scale-105 hover:bg-[#7458C6]">
                        <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img id="lightbox-img" src="" alt=""
                        class="max-h-[80vh] max-w-[90vw] rounded-xl border border-white/15 object-contain shadow-2xl shadow-black/80" />
                    <p id="lightbox-caption"
                        class="mt-3 max-w-[80vw] text-center text-sm font-semibold text-gray-100 drop-shadow-md"></p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        lightboxOverlay = document.getElementById('lightbox-overlay');
    }

    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // Expose openLightbox to the global scope since onClick attributes might be used in the HTML
    window.openLightbox = function(src, alt) {
        if (!lightboxOverlay || !lightboxImg || !lightboxContent) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        if (lightboxCaption) lightboxCaption.textContent = alt || '';
        lightboxOverlay.classList.remove('opacity-0', 'pointer-events-none');
        lightboxOverlay.classList.add('opacity-100', 'pointer-events-auto');
        lightboxContent.classList.remove('scale-95');
        lightboxContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        if (!lightboxOverlay || !lightboxContent) return;
        lightboxOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        lightboxOverlay.classList.add('opacity-0', 'pointer-events-none');
        lightboxContent.classList.remove('scale-100');
        lightboxContent.classList.add('scale-95');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (lightboxOverlay.classList.contains('opacity-0') && lightboxImg) {
                lightboxImg.src = '';
            }
        }, 300);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', window.closeLightbox);
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) window.closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeLightbox();
    });
});
