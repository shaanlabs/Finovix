// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Theme Management
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    themeToggle.addEventListener('click', toggleTheme);
};

// Toast Notifications
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// === Real-Time Currency Exchange Widget ===
const EXCHANGE_API = 'https://open.er-api.com/v6/latest/USD';
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR'];

async function fetchExchangeRates() {
    try {
        const res = await fetch(EXCHANGE_API);
        const data = await res.json();
        if (data && data.rates) {
            return CURRENCIES.map(cur => ({
                currency: cur,
                rate: data.rates[cur]
            }));
        }
    } catch (e) {
        // fallback dummy data
        return [
            { currency: 'USD', rate: 1 },
            { currency: 'EUR', rate: 0.92 },
            { currency: 'GBP', rate: 0.79 },
            { currency: 'INR', rate: 83.1 }
        ];
    }
}

function renderExchangeWidget(rates) {
    const el = document.getElementById('exchangeWidget');
    if (!el) return;
    el.innerHTML = '<i class="fas fa-coins"></i> <span style="font-weight:600">Live Exchange Rates</span>' +
        rates.map(r =>
            `<span class="rate"><span class="currency">${r.currency}</span> <span>=</span> <span>${r.rate}</span></span>`
        ).join('');
}

async function updateExchangeWidget() {
    const rates = await fetchExchangeRates();
    renderExchangeWidget(rates);
}

// === Stock Market Ticker ===
const STOCKS = [
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'GOOGL', name: 'Google' },
    { symbol: 'AMZN', name: 'Amazon' }
];

async function fetchStockPrices() {
    // Use Yahoo Finance unofficial API for demo (public CORS)
    try {
        const symbols = STOCKS.map(s => s.symbol).join(',');
        const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`);
        const data = await res.json();
        if (data && data.quoteResponse && data.quoteResponse.result) {
            return data.quoteResponse.result.map(q => ({
                symbol: q.symbol,
                price: q.regularMarketPrice,
                change: q.regularMarketChange,
                name: STOCKS.find(s => s.symbol === q.symbol)?.name || q.symbol
            }));
        }
    } catch (e) {
        // fallback dummy data
        return [
            { symbol: 'AAPL', price: 192.3, change: +1.2, name: 'Apple' },
            { symbol: 'MSFT', price: 334.5, change: -0.8, name: 'Microsoft' },
            { symbol: 'TSLA', price: 255.1, change: +2.5, name: 'Tesla' },
            { symbol: 'GOOGL', price: 138.7, change: +0.4, name: 'Google' },
            { symbol: 'AMZN', price: 129.2, change: -1.1, name: 'Amazon' }
        ];
    }
}

function renderStockTicker(stocks) {
    const el = document.getElementById('stockTicker');
    if (!el) return;
    const items = stocks.map(s =>
        `<span class="ticker-item">
            <span class="ticker-symbol">${s.symbol}</span>
            <span class="ticker-price">${s.price}</span>
            <span class="${s.change >= 0 ? 'ticker-up' : 'ticker-down'}">
                ${s.change >= 0 ? '+' : ''}${s.change}
            </span>
        </span>`
    ).join('');
    // Repeat for smooth scroll
    el.innerHTML = `<div class="ticker-track">${items + items}</div>`;
}

async function updateStockTicker() {
    const stocks = await fetchStockPrices();
    renderStockTicker(stocks);
}

// Main JavaScript for Finovix Finance Solutions
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initAnimations();
    initMobileNav();
    initChatWidget();
    initStatsCounter();
    initFormValidation();
    
    // Anime.js Animations
    function initAnimations() {
        // Hero section animations
        anime.timeline({
            easing: 'easeOutExpo'
        })
        .add({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000
        })
        .add({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=600')
        .add({
            targets: '.hero-buttons',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=400')
        .add({
            targets: '.floating-cards .card',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200)
        }, '-=800');

        // Feature cards animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            });
        }, observerOptions);

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });

        // Floating cards continuous animation
        anime({
            targets: '.floating-cards .card',
            translateY: [-10, 10],
            duration: 3000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    }

    // Mobile Navigation
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('open');
                
                // Animate hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                anime({
                    targets: bars,
                    rotate: hamburger.classList.contains('active') ? 
                        [0, 45, 0, -45] : [45, 0, -45, 0],
                    duration: 300,
                    easing: 'easeInOutQuad'
                });
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // Chat Widget
    function initChatWidget() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatMessages = document.getElementById('chatMessages');

        if (chatToggle && chatContainer) {
            chatToggle.addEventListener('click', () => {
                chatContainer.style.display = 'flex';
                anime({
                    targets: chatContainer,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutBack'
                });
            });

            chatClose.addEventListener('click', () => {
                anime({
                    targets: chatContainer,
                    scale: [1, 0.8],
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeInBack',
                    complete: () => {
                        chatContainer.style.display = 'none';
                    }
                });
            });

            // Send message functionality
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message
                    addMessage(message, 'user');
                    chatInput.value = '';

                    // Simulate AI response
                    setTimeout(() => {
                        const responses = [
                            "I can help you with investment strategies, budgeting tips, or financial planning. What specific area would you like to explore?",
                            "Based on your question, I'd recommend checking our AI-powered investment tools. They can provide personalized insights for your financial goals.",
                            "Great question! Our platform offers real-time market analysis and personalized financial recommendations. Would you like to learn more about our services?",
                            "I understand your concern. Our team of financial experts is available 24/7 to provide personalized guidance and support."
                        ];
                        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        addMessage(randomResponse, 'bot');
                    }, 1000);
                }
            }

            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}-message`;
                messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Animate new message
                anime({
                    targets: messageDiv,
                    translateX: sender === 'user' ? [50, 0] : [-50, 0],
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }

            chatSend.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // Stats Counter Animation
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const suffix = entry.target.textContent.includes('Million') ? 'M' : 
                                 entry.target.textContent.includes('%') ? '%' : '';
                    
                    anime({
                        targets: entry.target,
                        innerHTML: [0, target],
                        duration: 2000,
                        easing: 'easeOutExpo',
                        round: 1,
                        update: function(anim) {
                            entry.target.textContent = Math.floor(anim.animations[0].currentValue) + suffix;
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Form Validation
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const inputs = form.querySelectorAll('input, textarea');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#ef4444';
                        
                        // Animate error
                        anime({
                            targets: input,
                            translateX: [-10, 10, -10, 10, 0],
                            duration: 400,
                            easing: 'easeInOutQuad'
                        });
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    successMessage.style.cssText = `
                        background: #10b981;
                        color: white;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        margin-top: 1rem;
                        text-align: center;
                    `;
                    
                    form.appendChild(successMessage);
                    
                    // Animate success message
                    anime({
                        targets: successMessage,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeOutBack'
                    });
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        successMessage.remove();
                    }, 3000);
                }
            });
        });
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

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('btn-secondary')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = '';
                }, 2000);
            }
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg-animation');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .service-card, .team-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // === INIT ON HOMEPAGE ===
    if (document.getElementById('exchangeWidget')) {
        updateExchangeWidget();
        setInterval(updateExchangeWidget, 60000);
    }
    if (document.getElementById('stockTicker')) {
        updateStockTicker();
        setInterval(updateStockTicker, 60000);
    }

    console.log('Finovix Finance Solutions - JavaScript initialized successfully!');
});

// AI Chat Widget
class AIChat {
    constructor() {
        this.widget = document.getElementById('chatWidget');
        this.initializeWidget();
    }

    initializeWidget() {
        // Chat widget implementation
    }
}

// Initialize chat widget
new AIChat();

// Export utilities
window.utils = {
    showToast,
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
};
