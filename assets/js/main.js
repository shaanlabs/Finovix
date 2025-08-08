// Main JavaScript for Nextomic Finance Solutions

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
        console.log('Using fallback exchange rates');
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
    
    const ratesHtml = rates.map(r => 
        `<span class="rate">
            <span class="currency">${r.currency}</span> 
            <span>=</span> 
            <span>${r.rate.toFixed(2)}</span>
        </span>`
    ).join('');
    
    el.innerHTML = `
        <i class="fas fa-coins"></i> 
        <span style="font-weight:600">Live Exchange Rates</span>
        ${ratesHtml}
    `;
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
        console.log('Using fallback stock data');
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
            <span class="ticker-price">$${s.price.toFixed(2)}</span>
            <span class="${s.change >= 0 ? 'ticker-up' : 'ticker-down'}">
                ${s.change >= 0 ? '+' : ''}${s.change.toFixed(2)}
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

// === Animations ===
function initAnimations() {
    // Hero animations
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 600,
        easing: 'easeOutExpo'
    });

    // Feature cards animation with intersection observer
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && entry.target.style.opacity !== '1') {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    delay: index * 200,
                    easing: 'easeOutExpo'
                });
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    featureCards.forEach(card => {
        // Remove no-js class and set initial state to visible
        card.classList.remove('no-js');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        featureObserver.observe(card);
    });

    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-cards .card');
    floatingCards.forEach((card, index) => {
        anime({
            targets: card,
            translateY: [0, -20],
            duration: 2000,
            delay: index * 0.5,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    });
}

// === Mobile Navigation ===
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }
}

// === Chat Widget ===
function initChatWidget() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.toggle('open');
        });

        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatContainer.classList.remove('open');
            });
        }

        if (chatSend && chatInput) {
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage(message, 'user');
                    chatInput.value = '';
                    
                    // Simulate AI response
                    setTimeout(() => {
                        const responses = [
                            "I can help you with that! What specific financial question do you have?",
                            "That's a great question about finance. Let me provide you with some insights.",
                            "I understand your concern. Here's what I recommend based on your situation.",
                            "Thank you for asking. Here's some helpful financial advice for you."
                        ];
                        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        addMessage(randomResponse, 'bot');
                    }, 1000);
                }
            }

            chatSend.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

// === Stats Counter Animation ===
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                
                anime({
                    targets: target,
                    innerHTML: [0, finalValue],
                    duration: 2000,
                    easing: 'easeOutExpo',
                    round: 1,
                    update: function(anim) {
                        target.textContent = anim.animations[0].currentValue;
                    }
                });
                
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// === Form Validation ===
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Sent Successfully!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });
}

// === Smooth Scrolling ===
function initSmoothScrolling() {
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
}

// === Button Loading States ===
function initButtonLoading() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('btn-loading')) {
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                }, 2000);
            }
        });
    });
}

// === Card Hover Effects ===
function initCardHoverEffects() {
    document.querySelectorAll('.feature-card, .service-card, .ai-tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -10,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
    });
}

// === Parallax Effect ===
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// === AI Chat Class ===
class AIChat {
    constructor() {
        this.messages = [];
    }

    initializeWidget() {
        // Initialize chat widget functionality
        console.log('AI Chat widget initialized');
    }
}

// === AI Insights Dashboard ===
function initAIInsights() {
    // Animate AI insight cards on scroll with staggered effect
    const aiCards = document.querySelectorAll('.ai-insight-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for each card
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Animate chart bars with delay
                    const chartBar = entry.target.querySelector('.chart-bar');
                    if (chartBar) {
                        const height = chartBar.style.height;
                        chartBar.style.height = '0%';
                        setTimeout(() => {
                            anime({
                                targets: chartBar,
                                height: [0, height],
                                duration: 1500,
                                easing: 'easeOutExpo'
                            });
                        }, 300);
                    }
                    
                    // Animate risk bars with shimmer effect
                    const riskFill = entry.target.querySelector('.risk-fill');
                    if (riskFill) {
                        const width = riskFill.style.width;
                        riskFill.style.width = '0%';
                        setTimeout(() => {
                            anime({
                                targets: riskFill,
                                width: [0, width],
                                duration: 1200,
                                easing: 'easeOutExpo'
                            });
                        }, 500);
                    }
                    
                    // Animate recommendation items
                    const recommendationItems = entry.target.querySelectorAll('.recommendation-item');
                    recommendationItems.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, 800 + (itemIndex * 200));
                    });
                    
                }, index * 200); // Stagger each card by 200ms
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    aiCards.forEach(card => observer.observe(card));
    
    // Add hover effects for cards
    aiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
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
    
    // Update AI insights periodically with smooth transitions
    updateAIInsights();
    setInterval(updateAIInsights, 30000); // Update every 30 seconds
}

function updateAIInsights() {
    // Simulate real-time AI updates with enhanced animations
    const sentimentScores = document.querySelectorAll('.sentiment-score .score');
    const riskLevels = document.querySelectorAll('.risk-level');
    const predictionStats = document.querySelectorAll('.prediction-stats .value');
    
    // Update sentiment scores with realistic variations and smooth animations
    sentimentScores.forEach((score, index) => {
        const currentValue = parseInt(score.textContent);
        const variation = Math.random() * 10 - 5; // ±5% variation
        const newValue = Math.max(0, Math.min(100, currentValue + variation));
        
        setTimeout(() => {
            anime({
                targets: score,
                innerHTML: [currentValue, Math.round(newValue)],
                duration: 1500,
                easing: 'easeOutExpo',
                round: 1,
                update: function(anim) {
                    score.textContent = anim.animations[0].currentValue + '%';
                }
            });
        }, index * 200);
    });
    
    // Update prediction stats with enhanced animations
    predictionStats.forEach((stat, index) => {
        if (stat.classList.contains('positive')) {
            const currentValue = parseFloat(stat.textContent.replace('+', '').replace('%', ''));
            const variation = (Math.random() * 2 - 1); // ±1% variation
            const newValue = Math.max(0, currentValue + variation);
            
            setTimeout(() => {
                anime({
                    targets: stat,
                    innerHTML: [currentValue, newValue],
                    duration: 1200,
                    easing: 'easeOutExpo',
                    round: 1,
                    update: function(anim) {
                        stat.textContent = '+' + anim.animations[0].currentValue.toFixed(1) + '%';
                    }
                });
            }, index * 300);
        }
    });
    
    // Add pulse animation to risk levels
    riskLevels.forEach((level, index) => {
        setTimeout(() => {
            anime({
                targets: level.querySelector('.level'),
                scale: [1, 1.05, 1],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        }, index * 400);
    });
}

// === Enhanced AI Chat with Real Responses ===
function initEnhancedAIChat() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput && chatSend) {
        const aiResponses = {
            'investment': [
                "Based on current market conditions, I recommend diversifying your portfolio with 60% stocks, 30% bonds, and 10% alternative investments.",
                "Consider dollar-cost averaging to reduce market timing risk. Start with index funds for broad market exposure.",
                "Your risk tolerance suggests a moderate growth strategy. Focus on quality companies with strong fundamentals."
            ],
            'budget': [
                "I suggest following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
                "Track your expenses for 30 days to identify spending patterns. Use our AI spending analyzer for deeper insights.",
                "Set up automatic transfers to savings accounts. Start with 10% of your income and increase gradually."
            ],
            'savings': [
                "Aim to save 3-6 months of expenses for your emergency fund. Then focus on retirement and specific goals.",
                "Consider high-yield savings accounts for emergency funds and tax-advantaged accounts for retirement.",
                "Automate your savings to make it effortless. Start small and increase contributions over time."
            ],
            'debt': [
                "Focus on high-interest debt first (credit cards). Consider debt consolidation if it reduces your overall interest rate.",
                "The snowball method (smallest debts first) or avalanche method (highest interest first) can help you stay motivated.",
                "Avoid taking on new debt while paying off existing balances. Create a realistic repayment timeline."
            ],
            'retirement': [
                "Start early and take advantage of compound interest. Contribute enough to get any employer match.",
                "Consider a mix of traditional and Roth accounts for tax diversification in retirement.",
                "Review your retirement plan annually and adjust contributions based on life changes and market conditions."
            ]
        };
        
        function getAIResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            if (message.includes('invest') || message.includes('stock') || message.includes('portfolio')) {
                return aiResponses.investment[Math.floor(Math.random() * aiResponses.investment.length)];
            } else if (message.includes('budget') || message.includes('spend') || message.includes('expense')) {
                return aiResponses.budget[Math.floor(Math.random() * aiResponses.budget.length)];
            } else if (message.includes('save') || message.includes('emergency') || message.includes('fund')) {
                return aiResponses.savings[Math.floor(Math.random() * aiResponses.savings.length)];
            } else if (message.includes('debt') || message.includes('loan') || message.includes('credit')) {
                return aiResponses.debt[Math.floor(Math.random() * aiResponses.debt.length)];
            } else if (message.includes('retirement') || message.includes('401k') || message.includes('ira')) {
                return aiResponses.retirement[Math.floor(Math.random() * aiResponses.retirement.length)];
            } else {
                return "I can help you with investment strategies, budgeting, savings goals, debt management, and retirement planning. What specific area would you like to explore?";
            }
        }
        
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Show typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot-message typing';
                typingIndicator.innerHTML = '<div class="message-content"><i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i></div>';
                chatMessages.appendChild(typingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate AI thinking time
                setTimeout(() => {
                    chatMessages.removeChild(typingIndicator);
                    const aiResponse = getAIResponse(message);
                    addMessage(aiResponse, 'bot');
                }, 1500);
            }
        }
        
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// === Smart Portfolio Recommendations ===
function initSmartPortfolio() {
    const portfolioRecommendations = [
        {
            type: 'Conservative',
            allocation: { stocks: 30, bonds: 50, cash: 20 },
            description: 'Low risk, stable returns suitable for near-term goals'
        },
        {
            type: 'Moderate',
            allocation: { stocks: 60, bonds: 30, cash: 10 },
            description: 'Balanced approach for medium-term financial goals'
        },
        {
            type: 'Aggressive',
            allocation: { stocks: 80, bonds: 15, cash: 5 },
            description: 'Higher risk for long-term growth potential'
        }
    ];
    
    // Add portfolio recommendation cards to AI tools page
    const aiToolsSection = document.querySelector('.ai-tools-section');
    if (aiToolsSection) {
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'ai-tool-card';
        portfolioCard.innerHTML = `
            <div class="tool-header">
                <div class="tool-icon">
                    <i class="fas fa-chart-pie"></i>
                </div>
                <h3>Smart Portfolio Builder</h3>
                <p>AI-powered portfolio recommendations based on your risk profile and goals.</p>
            </div>
            <div class="tool-features">
                <span class="feature-tag">Risk Assessment</span>
                <span class="feature-tag">Asset Allocation</span>
                <span class="feature-tag">Goal-Based Planning</span>
                <span class="feature-tag">Rebalancing Alerts</span>
            </div>
            <div class="portfolio-recommendations">
                <div class="portfolio-option">
                    <h4>Conservative</h4>
                    <div class="allocation-chart">
                        <div class="allocation-segment" style="width: 30%; background: #3b82f6;">Stocks 30%</div>
                        <div class="allocation-segment" style="width: 50%; background: #10b981;">Bonds 50%</div>
                        <div class="allocation-segment" style="width: 20%; background: #f59e0b;">Cash 20%</div>
                    </div>
                </div>
            </div>
            <a href="contact.html" class="btn btn-secondary">Get Portfolio</a>
        `;
        
        // Insert the portfolio card
        const aiToolsGrid = aiToolsSection.querySelector('.ai-tools-grid');
        if (aiToolsGrid) {
            aiToolsGrid.appendChild(portfolioCard);
        }
    }
}

// === Main Initialization ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nextomic Finance Solutions - JavaScript initialized successfully!');
    
    // Initialize all components
    initAnimations();
    initMobileNav();
    initChatWidget();
    initStatsCounter();
    initFormValidation();
    initSmoothScrolling();
    initButtonLoading();
    initCardHoverEffects();
    initParallaxEffect();
    
    // Initialize AI Chat
    const aiChat = new AIChat();
    aiChat.initializeWidget();
    
    // Initialize AI Insights
    initAIInsights();
    initEnhancedAIChat();
    initSmartPortfolio();
    
    // === INIT REAL-TIME WIDGETS ON HOMEPAGE ===
    if (document.getElementById('exchangeWidget')) {
        updateExchangeWidget();
        setInterval(updateExchangeWidget, 60000); // Update every minute
    }
    
    if (document.getElementById('stockTicker')) {
        updateStockTicker();
        setInterval(updateStockTicker, 60000); // Update every minute
    }
    
    console.log('All components initialized successfully!');
});
