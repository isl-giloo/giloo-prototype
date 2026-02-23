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

// Hero Intersection Observer for Sticky CTA
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const appContainer = document.getElementById('appContainer');

    if (heroSection && appContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If hero is completely out of view (intersection ratio is 0)
                if (!entry.isIntersecting) {
                    appContainer.classList.add('is-hero-hidden');
                } else {
                    appContainer.classList.remove('is-hero-hidden');
                }
            });
        }, {
            root: null, // viewport
            threshold: 0 // trigger as soon as even 1px is visible/hidden
        });
        
        observer.observe(heroSection);
    }
});

// Ask AI Chat Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');
    const chatClear = document.getElementById('chatClear');

    const BOT_RESPONSE_TEXT = "我收到你的問題了，下一步可以串接模型";
    const INITIAL_MESSAGE = "我可以幫你整理本片資訊、解釋名詞，或推薦相似作品";

    if (!chatInput || !chatSend || !chatBody) return;

    function addMessage(text, isUser = false) {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble');
        bubble.classList.add(isUser ? 'bubble-user' : 'bubble-bot');
        bubble.textContent = text;

        chatBody.appendChild(bubble);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        addMessage(text, true);
        chatInput.value = '';

        // Mock Bot Response
        setTimeout(() => {
            addMessage(BOT_RESPONSE_TEXT, false);
        }, 600);
    }

    // Event Listeners
    chatSend.addEventListener('click', handleSend);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    if (chatClear) {
        chatClear.addEventListener('click', () => {
            chatBody.innerHTML = '';
            // Restore initial message
            addMessage(INITIAL_MESSAGE, false);
        });
    }

    // AI Chat Panel Toggle Logic
    const aiToggleBtn = document.getElementById('aiToggleBtn');
    const appContainer = document.getElementById('appContainer');
    const aiSidePanel = document.getElementById('aiSidePanel');

    let isChatOpen = false;

    if (aiToggleBtn && appContainer && aiSidePanel) {
        aiToggleBtn.addEventListener('click', () => {
            isChatOpen = !isChatOpen;

            if (isChatOpen) {
                appContainer.classList.add('chat-open');
                aiSidePanel.classList.add('open');
                aiToggleBtn.classList.add('active');
                if (chatInput) chatInput.focus();
            } else {
                appContainer.classList.remove('chat-open');
                aiSidePanel.classList.remove('open');
                aiToggleBtn.classList.remove('active');
            }
        });
    }
});
