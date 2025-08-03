// DOM Manipulation and Event Handling Implementation
class DynamicPortal {
    constructor() {
        this.currentSlide = 0;
        this.slideInterval = null;
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.initTheme();
        this.initSlider();
        this.initFAQ();
        this.initEventListeners();
        this.initPopups();
        this.initNotifications();
        this.addFadeInAnimations();
    }

    // Theme Management
    initTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        themeToggle.classList.add('pulse');
        setTimeout(() => themeToggle.classList.remove('pulse'), 600);
    }

    // Slider Implementation
    initSlider() {
        const slider = document.getElementById('imageSlider');
        const dotsContainer = document.getElementById('sliderDots');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Create dots
        sliderData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Event listeners
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        // Auto-play
        this.startSlideShow();

        // Pause on hover
        slider.addEventListener('mouseenter', () => this.stopSlideShow());
        slider.addEventListener('mouseleave', () => this.startSlideShow());
    }

    goToSlide(index) {
        const slider = document.getElementById('imageSlider');
        const dots = document.querySelectorAll('.dot');
        
        this.currentSlide = index;
        slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % sliderData.length;
        this.goToSlide(this.currentSlide);
    }

    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? sliderData.length - 1 : this.currentSlide - 1;
        this.goToSlide(this.currentSlide);
    }

    startSlideShow() {
        this.slideInterval = setInterval(() => this.nextSlide(), 4000);
    }

    stopSlideShow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    // FAQ Implementation
    initFAQ() {
        const faqContainer = document.getElementById('faqContainer');
        
        faqData.forEach((faq, index) => {
            const faqItem = this.createFAQItem(faq, index);
            faqContainer.appendChild(faqItem);
        });
    }

    createFAQItem(faq, index) {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <button class="faq-question" data-faq="${index}">
                <span>${faq.question}</span>
                <span class="faq-icon">▼</span>
            </button>
            <div class="faq-answer" id="faq-${index}">
                <div class="faq-answer-content">
                    ${faq.answer}
                </div>
            </div>
        `;

        const question = faqItem.querySelector('.faq-question');
        question.addEventListener('click', () => this.toggleFAQ(index));

        return faqItem;
    }

    toggleFAQ(index) {
        const faqItem = document.querySelector(`[data-faq="${index}"]`).parentElement;
        const faqAnswer = document.getElementById(`faq-${index}`);
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
            faqAnswer.classList.add('active');
        }
    }

    // Event Listeners for Interactive Elements
    initEventListeners() {
        // Card interactions
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const popupId = card.getAttribute('data-popup');
                this.showPopup(popupId);
                card.classList.add('pulse');
                setTimeout(() => card.classList.remove('pulse'), 600);
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Notification buttons
        document.getElementById('showSuccessNotification').addEventListener('click', () => {
            this.showNotification(eventData[0].message, 'success');
        });

        document.getElementById('showWarningNotification').addEventListener('click', () => {
            this.showNotification(eventData[1].message, 'warning');
        });

        document.getElementById('showErrorNotification').addEventListener('click', () => {
            this.showNotification(eventData[2].message, 'error');
        });

        document.getElementById('showInfoNotification').addEventListener('click', () => {
            this.showNotification(eventData[3].message, 'info');
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllPopups();
                this.hideNotification();
            }
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            }
            if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    // Popup Management
    initPopups() {
        const popupOverlays = document.querySelectorAll('.popup-overlay');
        popupOverlays.forEach(popup => {
            const closeBtn = popup.querySelector('.popup-close');
            closeBtn.addEventListener('click', () => this.hidePopup(popup.id));
            
            // Close on overlay click
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.hidePopup(popup.id);
                }
            });
        });
    }

    showPopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.classList.remove('hidden');
        setTimeout(() => popup.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }

    hidePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.classList.remove('show');
        setTimeout(() => {
            popup.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    closeAllPopups() {
        const popups = document.querySelectorAll('.popup-overlay.show');
        popups.forEach(popup => {
            this.hidePopup(popup.id);
        });
    }

    // Notification System
    initNotifications() {
        const closeBtn = document.getElementById('closeNotification');
        closeBtn.addEventListener('click', () => this.hideNotification());

        // Auto-hide notifications after 5 seconds
        this.notificationTimer = null;
    }

    showNotification(message, type = 'info') {
        const banner = document.getElementById('notificationBanner');
        const text = document.getElementById('notificationText');
        
        // Clear existing timer
        if (this.notificationTimer) {
            clearTimeout(this.notificationTimer);
        }

        // Set notification content and type
        text.textContent = message;
        banner.className = `notification-banner show ${type}`;
        banner.classList.remove('hidden');

        // Auto-hide after 5 seconds
        this.notificationTimer = setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    hideNotification() {
        const banner = document.getElementById('notificationBanner');
        banner.classList.remove('show');
        
        if (this.notificationTimer) {
            clearTimeout(this.notificationTimer);
        }

        setTimeout(() => {
            banner.classList.add('hidden');
        }, 300);
    }

    // Animation Effects
    addFadeInAnimations() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Testing Methods for Dynamic Modules
    testDynamicModules() {
        console.log('Testing FAQ Module...');
        this.toggleFAQ(0);
        setTimeout(() => this.toggleFAQ(0), 1000);

        console.log('Testing Slider Module...');
        this.nextSlide();
        setTimeout(() => this.previousSlide(), 1000);

        console.log('Testing Notification Module...');
        this.showNotification('Testing notification system', 'info');

        console.log('Testing Popup Module...');
        setTimeout(() => this.showPopup('popup1'), 2000);
        setTimeout(() => this.hidePopup('popup1'), 4000);

        console.log('All dynamic modules tested successfully!');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portal = new DynamicPortal();
    
    // Make portal instance globally available for testing
    window.portalApp = portal;
    
    // Log initialization
    console.log('Dynamic Portal initialized successfully!');
    console.log('Available test method: portalApp.testDynamicModules()');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});