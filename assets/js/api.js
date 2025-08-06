class ApiService {
    constructor() {
        this.baseUrl = '/api';
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    setAuthHeader() {
        const token = localStorage.getItem('token');
        if (token) {
            this.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    async get(endpoint) {
        this.setAuthHeader();
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: this.headers
        });
        return response.json();
    }

    async post(endpoint, data) {
        this.setAuthHeader();
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

window.api = new ApiService();
