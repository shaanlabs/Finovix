// Expense Tracker JavaScript

// Sample data for expenses and budgets
const expenseData = {
    expenses: [
        { id: 1, amount: 45.50, category: 'food', description: 'Lunch at restaurant', date: '2024-01-15', paymentMethod: 'credit' },
        { id: 2, amount: 85.00, category: 'transportation', description: 'Gas station', date: '2024-01-15', paymentMethod: 'debit' },
        { id: 3, amount: 120.00, category: 'entertainment', description: 'Movie tickets', date: '2024-01-14', paymentMethod: 'credit' },
        { id: 4, amount: 67.80, category: 'shopping', description: 'Groceries', date: '2024-01-14', paymentMethod: 'debit' },
        { id: 5, amount: 250.00, category: 'bills', description: 'Electric bill', date: '2024-01-13', paymentMethod: 'bank-transfer' },
        { id: 6, amount: 35.99, category: 'food', description: 'Coffee shop', date: '2024-01-13', paymentMethod: 'cash' },
        { id: 7, amount: 189.99, category: 'healthcare', description: 'Doctor visit', date: '2024-01-12', paymentMethod: 'credit' },
        { id: 8, amount: 28.50, category: 'transportation', description: 'Bus fare', date: '2024-01-12', paymentMethod: 'cash' },
        { id: 9, amount: 95.00, category: 'entertainment', description: 'Concert tickets', date: '2024-01-11', paymentMethod: 'credit' },
        { id: 10, amount: 156.70, category: 'shopping', description: 'Clothing', date: '2024-01-11', paymentMethod: 'debit' }
    ],
    budgets: {
        food: { allocated: 800, spent: 450 },
        transportation: { allocated: 300, spent: 220 },
        entertainment: { allocated: 200, spent: 180 },
        shopping: { allocated: 400, spent: 350 },
        bills: { allocated: 600, spent: 550 },
        healthcare: { allocated: 300, spent: 190 },
        education: { allocated: 150, spent: 0 },
        other: { allocated: 100, spent: 45 }
    },
    spendingTrend: {
        7: [45, 67, 89, 123, 156, 134, 89],
        30: Array.from({length: 30}, () => Math.floor(Math.random() * 200) + 50),
        90: Array.from({length: 90}, () => Math.floor(Math.random() * 250) + 30),
        365: Array.from({length: 365}, () => Math.floor(Math.random() * 300) + 20)
    }
};

const categoryInfo = {
    food: { name: 'Food & Dining', icon: 'fas fa-utensils', color: '#ef4444' },
    transportation: { name: 'Transportation', icon: 'fas fa-car', color: '#3b82f6' },
    entertainment: { name: 'Entertainment', icon: 'fas fa-film', color: '#8b5cf6' },
    shopping: { name: 'Shopping', icon: 'fas fa-shopping-bag', color: '#f59e0b' },
    bills: { name: 'Bills & Utilities', icon: 'fas fa-file-invoice', color: '#10b981' },
    healthcare: { name: 'Healthcare', icon: 'fas fa-heart', color: '#ec4899' },
    education: { name: 'Education', icon: 'fas fa-graduation-cap', color: '#06b6d4' },
    other: { name: 'Other', icon: 'fas fa-ellipsis-h', color: '#6b7280' }
};

let spendingChart = null;
let categoryChart = null;

// Initialize expense tracker
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initExpenseCharts();
    renderRecentTransactions();
    renderBudgetProgress();
    renderCategoryLegend();
    initModalHandlers();
    initQuickActions();
    updateHeroStats();
    initExpenseAnimations();
    initBudgetCalculator();
});

// Theme Toggle (inherited from portfolio.js but adapted)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        setTimeout(() => {
            initExpenseCharts();
        }, 100);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize Charts
function initExpenseCharts() {
    initSpendingChart();
    initCategoryChart();
}

function initSpendingChart() {
    const ctx = document.getElementById('spendingChart');
    if (!ctx) return;
    
    if (spendingChart) {
        spendingChart.destroy();
    }
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#1e293b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    
    const period = document.getElementById('period-filter')?.value || '30';
    const data = expenseData.spendingTrend[period];
    const labels = data.map((_, i) => {
        if (period === '7') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];
        if (period === '30') return `Day ${i + 1}`;
        if (period === '90') return `Week ${Math.floor(i/7) + 1}`;
        return `Month ${Math.floor(i/30) + 1}`;
    });
    
    spendingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Spending',
                data: data,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
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
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    const categories = Object.keys(expenseData.budgets);
    const amounts = categories.map(cat => expenseData.budgets[cat].spent);
    const colors = categories.map(cat => categoryInfo[cat].color);
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(cat => categoryInfo[cat].name),
            datasets: [{
                data: amounts,
                backgroundColor: colors,
                borderWidth: 0,
                cutout: '65%'
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

// Render Category Legend
function renderCategoryLegend() {
    const legendContainer = document.getElementById('category-legend');
    if (!legendContainer) return;
    
    legendContainer.innerHTML = '';
    const totalSpent = Object.values(expenseData.budgets).reduce((sum, budget) => sum + budget.spent, 0);
    
    Object.entries(expenseData.budgets).forEach(([category, budget]) => {
        const percentage = ((budget.spent / totalSpent) * 100).toFixed(1);
        const categoryData = categoryInfo[category];
        
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${categoryData.color};"></div>
            <div class="legend-info">
                <div class="legend-label">${categoryData.name}</div>
                <div class="legend-amount">$${budget.spent}</div>
            </div>
            <div class="legend-percentage">${percentage}%</div>
        `;
        
        legendContainer.appendChild(legendItem);
    });
}

// Render Recent Transactions
function renderRecentTransactions() {
    const transactionsList = document.getElementById('recent-transactions');
    if (!transactionsList) return;
    
    transactionsList.innerHTML = '';
    const recentExpenses = expenseData.expenses.slice(0, 5);
    
    recentExpenses.forEach(expense => {
        const categoryData = categoryInfo[expense.category];
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const date = new Date(expense.date);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        transactionItem.innerHTML = `
            <div class="transaction-icon category-${expense.category}">
                <i class="${categoryData.icon}"></i>
            </div>
            <div class="transaction-info">
                <div class="transaction-description">${expense.description}</div>
                <div class="transaction-details">${categoryData.name} • ${formattedDate}</div>
            </div>
            <div class="transaction-amount expense">-$${expense.amount.toFixed(2)}</div>
        `;
        
        transactionsList.appendChild(transactionItem);
    });
}

// Render Budget Progress
function renderBudgetProgress() {
    const budgetList = document.getElementById('budget-list');
    if (!budgetList) return;
    
    budgetList.innerHTML = '';
    
    Object.entries(expenseData.budgets).slice(0, 4).forEach(([category, budget]) => {
        const categoryData = categoryInfo[category];
        const percentage = (budget.spent / budget.allocated) * 100;
        const remaining = budget.allocated - budget.spent;
        
        let statusClass = '';
        if (percentage > 90) statusClass = 'danger';
        else if (percentage > 70) statusClass = 'warning';
        
        const budgetItem = document.createElement('div');
        budgetItem.className = 'budget-item';
        budgetItem.innerHTML = `
            <div class="budget-header">
                <span class="budget-category">${categoryData.name}</span>
                <span class="budget-amounts">$${budget.spent} / $${budget.allocated}</span>
            </div>
            <div class="budget-progress">
                <div class="budget-progress-fill ${statusClass}" style="width: ${Math.min(percentage, 100)}%"></div>
            </div>
        `;
        
        budgetList.appendChild(budgetItem);
    });
}

// Update Hero Stats
function updateHeroStats() {
    const monthlySpent = Object.values(expenseData.budgets).reduce((sum, budget) => sum + budget.spent, 0);
    const totalBudget = Object.values(expenseData.budgets).reduce((sum, budget) => sum + budget.allocated, 0);
    const budgetRemaining = totalBudget - monthlySpent;
    const avgDaily = monthlySpent / 30;
    const savingsRate = ((budgetRemaining / totalBudget) * 100);
    
    const elements = {
        'monthly-spent': `$${monthlySpent.toLocaleString()}`,
        'budget-remaining': `$${budgetRemaining.toLocaleString()}`,
        'avg-daily': `$${avgDaily.toFixed(0)}`,
        'savings-rate': `${savingsRate.toFixed(1)}%`
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Update budget status
    const statusElement = document.getElementById('budget-status');
    if (statusElement) {
        const overallPercentage = (monthlySpent / totalBudget) * 100;
        if (overallPercentage > 90) {
            statusElement.textContent = 'Over Budget';
            statusElement.className = 'budget-status danger';
        } else if (overallPercentage > 70) {
            statusElement.textContent = 'Warning';
            statusElement.className = 'budget-status warning';
        } else {
            statusElement.textContent = 'On Track';
            statusElement.className = 'budget-status';
        }
    }
}

// Modal Handlers
function initModalHandlers() {
    const expenseModal = document.getElementById('add-expense-modal');
    const budgetModal = document.getElementById('set-budget-modal');
    const expenseForm = document.getElementById('add-expense-form');
    const budgetForm = document.getElementById('set-budget-form');
    
    // Add expense modal
    const addExpenseBtn = document.getElementById('add-expense-btn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => openModal('add-expense-modal'));
    }
    
    // Set budget modal
    const setBudgetBtn = document.getElementById('set-budget-btn');
    if (setBudgetBtn) {
        setBudgetBtn.addEventListener('click', () => openModal('set-budget-modal'));
    }
    
    // Close modal handlers
    document.querySelectorAll('.close, #cancel-expense-btn, #cancel-budget-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });
    
    // Close on outside click
    [expenseModal, budgetModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        }
    });
    
    // Form submissions
    if (expenseForm) {
        expenseForm.addEventListener('submit', handleExpenseSubmit);
    }
    
    if (budgetForm) {
        budgetForm.addEventListener('submit', handleBudgetSubmit);
    }
    
    // Set today's date as default
    const dateInput = document.getElementById('expense-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutExpo'
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInExpo',
            complete: function() {
                modal.style.display = 'none';
                const form = modal.querySelector('form');
                if (form) form.reset();
            }
        });
    }
}

function handleExpenseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newExpense = {
        id: expenseData.expenses.length + 1,
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description'),
        date: formData.get('date'),
        paymentMethod: formData.get('payment-method')
    };
    
    // Add to expenses array
    expenseData.expenses.unshift(newExpense);
    
    // Update budget spent amount
    if (expenseData.budgets[newExpense.category]) {
        expenseData.budgets[newExpense.category].spent += newExpense.amount;
    }
    
    // Refresh UI
    renderRecentTransactions();
    renderBudgetProgress();
    renderCategoryLegend();
    updateHeroStats();
    initExpenseCharts();
    
    closeModal('add-expense-modal');
    showNotification('Expense added successfully!', 'success');
}

function handleBudgetSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Update budgets
    Object.keys(expenseData.budgets).forEach(category => {
        const value = formData.get(category);
        if (value && parseFloat(value) > 0) {
            expenseData.budgets[category].allocated = parseFloat(value);
        }
    });
    
    // Refresh UI
    renderBudgetProgress();
    updateHeroStats();
    
    closeModal('set-budget-modal');
    showNotification('Budget updated successfully!', 'success');
}

// Quick Actions
function initQuickActions() {
    const exportBtn = document.getElementById('export-data-btn');
    const aiInsightsBtn = document.getElementById('ai-insights-btn');
    const periodFilter = document.getElementById('period-filter');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportExpenseData);
    }
    
    if (aiInsightsBtn) {
        aiInsightsBtn.addEventListener('click', generateAIInsights);
    }
    
    if (periodFilter) {
        periodFilter.addEventListener('change', function() {
            initSpendingChart();
        });
    }
}

function exportExpenseData() {
    const data = expenseData.expenses.map(expense => ({
        Date: expense.date,
        Category: categoryInfo[expense.category].name,
        Description: expense.description,
        Amount: expense.amount,
        'Payment Method': expense.paymentMethod
    }));
    
    const csv = convertToCSV(data);
    downloadCSV(csv, 'expense-data.csv');
    showNotification('Expense data exported successfully!', 'success');
}

function generateAIInsights() {
    const insights = [
        "Your dining expenses increased by 23% this month. Consider meal planning to reduce costs.",
        "You could save $240/month by reducing subscription services and entertainment expenses.",
        "Based on your spending pattern, you could save an additional 5% by optimizing recurring payments.",
        "Your transportation costs are 15% below average. Great job using public transport!",
        "Consider setting up automatic transfers to savings when your spending is under budget."
    ];
    
    // Update insight text
    const spendingInsight = document.getElementById('spending-insight');
    const budgetInsight = document.getElementById('budget-insight');
    const savingsInsight = document.getElementById('savings-insight');
    
    if (spendingInsight) spendingInsight.textContent = insights[Math.floor(Math.random() * insights.length)];
    if (budgetInsight) budgetInsight.textContent = insights[Math.floor(Math.random() * insights.length)];
    if (savingsInsight) savingsInsight.textContent = insights[Math.floor(Math.random() * insights.length)];
    
    // Animate insight cards
    anime({
        targets: '.insight-card',
        scale: [1, 1.05, 1],
        duration: 600,
        delay: anime.stagger(200),
        easing: 'easeInOutQuad'
    });
    
    showNotification('AI insights updated!', 'info');
}

// Budget Calculator
function initBudgetCalculator() {
    const budgetInputs = document.querySelectorAll('#set-budget-form input[type="number"]');
    const totalBudgetAmount = document.getElementById('total-budget-amount');
    
    budgetInputs.forEach(input => {
        input.addEventListener('input', function() {
            let total = 0;
            budgetInputs.forEach(inp => {
                total += parseFloat(inp.value) || 0;
            });
            if (totalBudgetAmount) {
                totalBudgetAmount.textContent = `$${total.toLocaleString()}`;
            }
        });
    });
}

// Animations
function initExpenseAnimations() {
    // Animate action cards
    const actionCards = document.querySelectorAll('.action-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: index * 100,
                    easing: 'easeOutExpo'
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    actionCards.forEach(card => cardObserver.observe(card));
    
    // Animate dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: index * 150,
                    easing: 'easeOutExpo'
                });
                dashboardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    dashboardCards.forEach(card => dashboardObserver.observe(card));
    
    // Animate hero stats
    const heroStats = document.querySelectorAll('.hero-stat');
    const statsObserver = new IntersectionObserver((entries) => {
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
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    heroStats.forEach(stat => statsObserver.observe(stat));
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
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
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
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