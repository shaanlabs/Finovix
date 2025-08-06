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

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    AOS.init();
    
    // Check Authentication
    if (window.auth.isLoggedIn()) {
        document.body.classList.add('authenticated');
    }
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
