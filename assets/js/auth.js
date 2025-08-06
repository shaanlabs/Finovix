class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
        
        if (this.token) {
            this.isAuthenticated = true;
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.token) {
                this.isAuthenticated = true;
                this.token = data.token;
                this.user = data.user;
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                return true;
            }
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }
}

window.auth = new Auth();
