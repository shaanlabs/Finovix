class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();

        document.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes[404];
        const main = document.getElementById('pageContent');
        
        try {
            const page = await route();
            main.innerHTML = page;
        } catch (err) {
            console.error('Error loading page:', err);
        }
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }
}

// Initialize Router
const routes = {
    '/': () => import('./pages/home.js'),
    '/dashboard': () => import('./pages/dashboard.js'),
    '/login': () => import('./pages/login.js'),
    '/register': () => import('./pages/register.js'),
    404: () => import('./pages/404.js')
};

new Router(routes);
