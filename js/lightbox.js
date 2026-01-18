document.addEventListener('DOMContentLoaded', function() {
    const lightboxHTML = `
        <div class="lightbox-overlay" id="lightbox">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <div class="lightbox-controls">
                <button class="zoom-btn" id="zoom-in" aria-label="Zoom in">+</button>
                <button class="zoom-btn" id="zoom-out" aria-label="Zoom out">−</button>
                <button class="zoom-btn" id="zoom-reset" aria-label="Reset zoom">⟲</button>
            </div>
            <div class="lightbox-image-wrapper" id="lightbox-wrapper">
                <img src="" alt="" class="lightbox-image" id="lightbox-img">
            </div>
            <div class="lightbox-caption" id="lightbox-caption"></div>
            <div class="lightbox-hint">Scroll to zoom • Drag to pan</div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxWrapper = document.getElementById('lightbox-wrapper');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;


    const clickableImages = document.querySelectorAll('.project-hero-image, .meta-image, .process-image, .full-width-image');


    clickableImages.forEach(img => {

        const hint = document.createElement('div');
        hint.className = 'image-hint';
        hint.textContent = 'Click to enlarge';
        img.parentElement.appendChild(hint);

        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxCaption.textContent = this.alt || 'Image';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetZoom();
        });
    });


    function updateTransform() {
        lightboxImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        lightboxImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    }

    function resetZoom() {
        scale = 1;
        posX = 0;
        posY = 0;
        updateTransform();
    }

    function zoomIn() {
        scale = Math.min(scale + 0.3, 5);
        updateTransform();
    }

    function zoomOut() {
        scale = Math.max(scale - 0.3, 1);
        if (scale === 1) {
            posX = 0;
            posY = 0;
        }
        updateTransform();
    }


    lightboxWrapper.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }, { passive: false });


    let initialDistance = 0;
    let initialScale = 1;

    lightboxWrapper.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            initialScale = scale;
        }
    }, { passive: false });

    lightboxWrapper.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            scale = Math.max(1, Math.min(5, initialScale * (currentDistance / initialDistance)));
            updateTransform();
        }
    }, { passive: false });


    lightboxImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            lightboxImg.style.cursor = 'grabbing';
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateTransform();
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        if (scale > 1) {
            lightboxImg.style.cursor = 'grab';
        }
    });


    let touchStartX = 0;
    let touchStartY = 0;

    lightboxImg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1 && scale > 1) {
            touchStartX = e.touches[0].clientX - posX;
            touchStartY = e.touches[0].clientY - posY;
        }
    });

    lightboxImg.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1 && scale > 1) {
            e.preventDefault();
            posX = e.touches[0].clientX - touchStartX;
            posY = e.touches[0].clientY - touchStartY;
            updateTransform();
        }
    }, { passive: false });


    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    zoomResetBtn.addEventListener('click', resetZoom);


    lightboxImg.addEventListener('click', function(e) {
        if (scale === 1) {
            e.stopPropagation();
            zoomIn();
        }
    });


    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});