// Language switching functionality
let currentLanguage = 'en';

const translations = {
    en: {
        // Contact info
        whatsapp: '+79509559966',
        telegram: '@boristikhonov',
        // CTA messages
        whatsapp_message: 'Hi! I\'m interested in the Dragon Soul retreat. Can you tell me more about the next dates?',
        telegram_message: 'Hi! I\'m interested in the Dragon Soul retreat. Can you tell me more about the next dates?'
    },
    ru: {
        // Contact info
        whatsapp: '+79509559966',
        telegram: '@boristikhonov',
        // CTA messages
        whatsapp_message: 'Привет! Меня интересует ретрит Dragon Soul. Можете рассказать больше о ближайших датах?',
        telegram_message: 'Привет! Меня интересует ретрит Dragon Soul. Можете рассказать больше о ближайших датах?'
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageSwitcher();
    initializeCTAButtons();
    initializeTestimonialSlider();
    initializeScrollAnimations();
    initializeScrollIndicator();
});

// Language switching
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newLang = this.dataset.lang;
            if (newLang !== currentLanguage) {
                switchLanguage(newLang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('[data-en]').forEach(element => {
        const enText = element.getAttribute('data-en');
        const ruText = element.getAttribute('data-ru');
        
        if (lang === 'en') {
            element.textContent = enText;
        } else {
            element.textContent = ruText;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// CTA Button functionality
function initializeCTAButtons() {
    // WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('#main-cta, #whatsapp-cta');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
    
    // Telegram buttons
    const telegramButtons = document.querySelectorAll('#telegram-cta');
    telegramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openTelegram();
        });
    });
}

function openWhatsApp() {
    const phone = translations[currentLanguage].whatsapp;
    const message = encodeURIComponent(translations[currentLanguage].whatsapp_message);
    const url = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${message}`;
    
    // Track conversion
    trackConversion('whatsapp');
    
    // Open WhatsApp
    window.open(url, '_blank');
}

function openTelegram() {
    const username = translations[currentLanguage].telegram.replace('@', '');
    const message = encodeURIComponent(translations[currentLanguage].telegram_message);
    const url = `https://t.me/${username}?text=${message}`;
    
    // Track conversion
    trackConversion('telegram');
    
    // Open Telegram
    window.open(url, '_blank');
}

// Testimonial slider
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe individual elements
    document.querySelectorAll('.problem-item, .master-card, .program-category').forEach(item => {
        observer.observe(item);
    });
}

// Scroll indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const problemSection = document.querySelector('.problem');
            if (problemSection) {
                problemSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Conversion tracking
function trackConversion(type) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'event_category': 'CTA',
            'event_label': type,
            'value': 3200
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            value: 3200,
            currency: 'USD',
            content_name: 'Dragon Soul Retreat',
            content_category: 'retreat'
        });
    }
    
    // Console log for debugging
    console.log(`Conversion tracked: ${type}`);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add animation classes for CSS
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-in.delay-1 {
        animation-delay: 0.2s;
    }
    
    .animate-in.delay-2 {
        animation-delay: 0.4s;
    }
    
    .animate-in.delay-3 {
        animation-delay: 0.6s;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .problem-item,
    .master-card,
    .program-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .problem-item.animate-in,
    .master-card.animate-in,
    .program-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        './extracted_content/webp_images/image_000.webp',
        './extracted_content/webp_images/image_001.webp',
        './extracted_content/webp_images/image_002.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
preloadImages();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add viewport height fix for mobile
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Add touch device detection
function detectTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
}

detectTouchDevice();

// Add advanced CTA button effects
function addCTAEffects() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
}

addCTAEffects();

// Add urgency timer (optional)
function addUrgencyTimer() {
    const urgencyElements = document.querySelectorAll('.urgency-box');
    
    urgencyElements.forEach(element => {
        const originalText = element.textContent;
        let spotsLeft = 5; // Dynamic spots counter
        
        setInterval(() => {
            if (Math.random() > 0.7 && spotsLeft > 1) {
                spotsLeft--;
                element.innerHTML = `<i class="fas fa-clock"></i> Only ${spotsLeft} spots remaining!`;
            }
        }, 30000); // Every 30 seconds
    });
}

// Uncomment to enable urgency timer
// addUrgencyTimer();

// Add exit-intent popup (optional)
function addExitIntentPopup() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentPopup();
        }
    });
}

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Wait! Don't Miss Out</h3>
            <p>Limited spots available for the next retreat</p>
            <button onclick="openWhatsApp()" class="cta-btn primary">
                <i class="fab fa-whatsapp"></i> Book Now
            </button>
            <button onclick="this.parentElement.parentElement.remove()" class="close-popup">×</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add popup styles
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
        .exit-intent-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .popup-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            position: relative;
            max-width: 400px;
            margin: 20px;
        }
        
        .close-popup {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
    `;
    document.head.appendChild(popupStyle);
}

// Uncomment to enable exit-intent popup
// addExitIntentPopup(); 