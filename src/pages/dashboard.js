import Chart from 'chart.js';

export default class Dashboard {
    constructor() {
        this.state = {
            balance: 0,
            transactions: [],
            loading: false
        };
        this.charts = {};
    }

    async initCharts() {
        // Portfolio Chart
        const portfolioCtx = document.getElementById('portfolioChart');
        this.charts.portfolio = new Chart(portfolioCtx, {
            type: 'doughnut',
            data: {
                labels: ['Stocks', 'Bonds', 'Crypto', 'Real Estate'],
                datasets: [{
                    data: [40, 20, 15, 25],
                    backgroundColor: ['#2563eb', '#7c3aed', '#f59e0b', '#10b981']
                }]
            }
        });

        // Performance Chart
        const performanceCtx = document.getElementById('performanceChart');
        this.charts.performance = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Portfolio Value',
                    data: [10000, 12000, 11500, 13000, 14500, 15000],
                    borderColor: '#2563eb'
                }]
            }
        });
    }

    async render() {
        this.loading = true;
        try {
            const data = await window.api.get('/dashboard');
            this.state = { ...this.state, ...data };
        } catch (err) {
            window.utils.showToast('Error loading dashboard', 'error');
        }
        this.loading = false;

        return `
            <div class="dashboard-container min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
                <!-- Stats Overview -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    ${this.renderStatCard('Total Balance', this.state.balance, 'currency')}
                    ${this.renderStatCard('Monthly Growth', '12.5%', 'percentage')}
                    ${this.renderStatCard('Active Investments', '8', 'number')}
                    ${this.renderStatCard('Risk Score', 'Moderate', 'text')}
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div class="chart-container">
                        <h3 class="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                        <canvas id="portfolioChart" height="300"></canvas>
                    </div>
                    <div class="chart-container">
                        <h3 class="text-lg font-semibold mb-4">Performance History</h3>
                        <canvas id="performanceChart" height="300"></canvas>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="dashboard-card">
                    <h3 class="text-lg font-semibold mb-4">Recent Transactions</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <!-- Add transaction table content -->
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderStatCard(title, value, type) {
        return `
            <div class="dashboard-card">
                <h4 class="text-sm text-gray-500 dark:text-gray-400">${title}</h4>
                <p class="text-2xl font-bold mt-2">
                    ${type === 'currency' ? window.utils.formatCurrency(value) : value}
                </p>
            </div>
        `;
    }
}
