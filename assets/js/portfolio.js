// Portfolio Management JavaScript

// Sample data for portfolio
const portfolioData = {
    holdings: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            shares: 50,
            purchasePrice: 150.00,
            currentPrice: 173.50,
            purchaseDate: '2023-01-15'
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            shares: 25,
            purchasePrice: 2100.00,
            currentPrice: 2287.50,
            purchaseDate: '2023-02-20'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corp.',
            shares: 40,
            purchasePrice: 280.00,
            currentPrice: 295.75,
            purchaseDate: '2023-03-10'
        },
        {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            shares: 15,
            purchasePrice: 650.00,
            currentPrice: 712.25,
            purchaseDate: '2023-04-05'
        },
        {
            symbol: 'NVDA',
            name: 'NVIDIA Corp.',
            shares: 30,
            purchasePrice: 420.00,
            currentPrice: 487.60,
            purchaseDate: '2023-05-12'
        }
    ],
    performanceData: {
        '1D': [245750, 243890, 245120, 244380, 245750],
        '1W': [240000, 242000, 244000, 243000, 245000, 244500, 245750],
        '1M': Array.from({length: 30}, (_, i) => 200000 + Math.random() * 50000),
        '3M': Array.from({length: 90}, (_, i) => 180000 + Math.random() * 70000),
        '1Y': Array.from({length: 365}, (_, i) => 150000 + Math.random() * 100000),
        'ALL': Array.from({length: 1000}, (_, i) => 100000 + Math.random() * 150000)
    }
};

let portfolioChart = null;
let allocationChart = null;

// Initialize portfolio page
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initPortfolioCharts();
    renderHoldings();
    initModalHandlers();
    initTimeRangeButtons();
    animateHeroStats();
    initPortfolioAnimations();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update charts for new theme
        setTimeout(() => {
            initPortfolioCharts();
        }, 100);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize Charts
function initPortfolioCharts() {
    initPortfolioChart();
    initAllocationChart();
}

function initPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (portfolioChart) {
        portfolioChart.destroy();
    }
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    portfolioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: portfolioData.performanceData['1D'].map((_, i) => `${i + 1}D`),
            datasets: [{
                label: 'Portfolio Value',
                data: portfolioData.performanceData['1D'],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor,
                        borderColor: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    grid: {
                        color: gridColor,
                        borderColor: gridColor
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initAllocationChart() {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (allocationChart) {
        allocationChart.destroy();
    }
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#1e293b';
    
    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Bonds', 'Cash'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Time Range Button Handlers
function initTimeRangeButtons() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart data
            const range = this.getAttribute('data-range');
            updatePortfolioChart(range);
        });
    });
}

function updatePortfolioChart(range) {
    if (!portfolioChart) return;
    
    const data = portfolioData.performanceData[range];
    const labels = data.map((_, i) => {
        switch(range) {
            case '1D': return `${i + 1}H`;
            case '1W': return `Day ${i + 1}`;
            case '1M': return `${i + 1}D`;
            case '3M': return `${Math.floor(i/30) + 1}M`;
            case '1Y': return `${Math.floor(i/30) + 1}M`;
            case 'ALL': return `Y${Math.floor(i/365) + 1}`;
            default: return `${i + 1}`;
        }
    });
    
    portfolioChart.data.labels = labels;
    portfolioChart.data.datasets[0].data = data;
    portfolioChart.update('active');
}

// Render Holdings Table
function renderHoldings() {
    const holdingsList = document.getElementById('holdings-list');
    if (!holdingsList) return;
    
    holdingsList.innerHTML = '';
    
    portfolioData.holdings.forEach(holding => {
        const currentValue = holding.shares * holding.currentPrice;
        const totalReturn = currentValue - (holding.shares * holding.purchasePrice);
        const returnPercentage = (totalReturn / (holding.shares * holding.purchasePrice)) * 100;
        const dayChange = (Math.random() - 0.5) * 10; // Simulated day change
        const dayChangePercent = (dayChange / holding.currentPrice) * 100;
        
        const row = document.createElement('div');
        row.className = 'holding-row';
        row.innerHTML = `
            <div class="table-cell">
                <div class="holding-asset">
                    <div class="asset-icon">${holding.symbol.charAt(0)}</div>
                    <div class="asset-info">
                        <h4>${holding.symbol}</h4>
                        <p>${holding.name}</p>
                    </div>
                </div>
            </div>
            <div class="table-cell">${holding.shares}</div>
            <div class="table-cell">$${holding.currentPrice.toFixed(2)}</div>
            <div class="table-cell">$${currentValue.toLocaleString()}</div>
            <div class="table-cell ${dayChange >= 0 ? 'change-positive' : 'change-negative'}">
                ${dayChange >= 0 ? '+' : ''}$${Math.abs(dayChange).toFixed(2)} (${dayChangePercent.toFixed(2)}%)
            </div>
            <div class="table-cell ${totalReturn >= 0 ? 'change-positive' : 'change-negative'}">
                ${totalReturn >= 0 ? '+' : ''}$${totalReturn.toFixed(2)} (${returnPercentage.toFixed(2)}%)
            </div>
            <div class="table-cell">
                <div class="action-buttons">
                    <button class="action-btn" onclick="editHolding('${holding.symbol}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteHolding('${holding.symbol}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        holdingsList.appendChild(row);
    });
}

// Modal Handlers
function initModalHandlers() {
    const modal = document.getElementById('add-investment-modal');
    const addBtn = document.getElementById('add-holding-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('add-investment-form');
    
    // Open modal
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            anime({
                targets: modal.querySelector('.modal-content'),
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutExpo'
            });
        });
    }
    
    // Close modal handlers
    [cancelBtn, closeBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                closeModal();
            });
        }
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewInvestment();
        });
    }
}

function closeModal() {
    const modal = document.getElementById('add-investment-modal');
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInExpo',
        complete: function() {
            modal.style.display = 'none';
            document.getElementById('add-investment-form').reset();
        }
    });
}

function addNewInvestment() {
    const formData = new FormData(document.getElementById('add-investment-form'));
    const newHolding = {
        symbol: formData.get('symbol').toUpperCase(),
        name: formData.get('symbol').toUpperCase() + ' Corp.',
        shares: parseInt(formData.get('shares')),
        purchasePrice: parseFloat(formData.get('purchase-price')),
        currentPrice: parseFloat(formData.get('purchase-price')) * (1 + (Math.random() - 0.5) * 0.2),
        purchaseDate: formData.get('purchase-date')
    };
    
    portfolioData.holdings.push(newHolding);
    renderHoldings();
    closeModal();
    
    // Show success message
    showNotification('Investment added successfully!', 'success');
}

function editHolding(symbol) {
    // Implementation for editing holdings
    showNotification('Edit functionality coming soon!', 'info');
}

function deleteHolding(symbol) {
    if (confirm(`Are you sure you want to delete ${symbol} from your portfolio?`)) {
        portfolioData.holdings = portfolioData.holdings.filter(h => h.symbol !== symbol);
        renderHoldings();
        showNotification('Investment removed successfully!', 'success');
    }
}

// Animate Hero Stats
function animateHeroStats() {
    const stats = document.querySelectorAll('.hero-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: index * 200,
                    easing: 'easeOutExpo'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Portfolio Page Animations
function initPortfolioAnimations() {
    // Animate portfolio cards
    const cards = document.querySelectorAll('.portfolio-card, .analytics-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: index * 100,
                    easing: 'easeOutExpo'
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => cardObserver.observe(card));
    
    // Animate holdings table
    const holdingsTable = document.querySelector('.holdings-table');
    if (holdingsTable) {
        const tableObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    tableObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        tableObserver.observe(holdingsTable);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functionality
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportPortfolioData();
        });
    }
});

function exportPortfolioData() {
    const data = portfolioData.holdings.map(holding => ({
        Symbol: holding.symbol,
        Name: holding.name,
        Shares: holding.shares,
        'Purchase Price': holding.purchasePrice,
        'Current Price': holding.currentPrice,
        'Purchase Date': holding.purchaseDate,
        'Current Value': (holding.shares * holding.currentPrice).toFixed(2),
        'Total Return': ((holding.shares * holding.currentPrice) - (holding.shares * holding.purchasePrice)).toFixed(2)
    }));
    
    const csv = convertToCSV(data);
    downloadCSV(csv, 'portfolio-data.csv');
    
    showNotification('Portfolio data exported successfully!', 'success');
}

function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
} 