// Film Page Interactive Functions
const videoModal = document.getElementById('videoModal');

function playVideo() {
    if (videoModal) {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(8px)';
    } else {
        header.style.backgroundColor = 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)';
        header.style.backdropFilter = 'none';
    }
});

