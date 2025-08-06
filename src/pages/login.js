export default class Login {
    constructor() {
        this.loading = false;
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.loading = true;

        const email = e.target.email.value;
        const password = e.target.password.value;

        // Add loading state and validation
        const submitBtn = e.target.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading loading-spinner"></span> Logging in...';

        try {
            const success = await window.auth.login(email, password);
            if (success) {
                window.location.href = '/dashboard';
                window.utils.showToast('Login successful!', 'success');
            }
        } catch (err) {
            window.utils.showToast(err.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Login';
        }
        this.loading = false;
    }

    render() {
        return `
            <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
                <div class="card w-96 bg-white shadow-xl p-8">
                    <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
                    <form id="loginForm" class="space-y-4" onsubmit="return window.handleLoginSubmit(event)">
                        <div class="form-control">
                            <label class="label">Email</label>
                            <input type="email" name="email" required class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">Password</label>
                            <input type="password" name="password" required class="input input-bordered" />
                        </div>
                        <button type="submit" class="btn btn-primary w-full">Login</button>
                    </form>
                    <div class="mt-4 text-center">
                        <a href="/register" class="text-blue-600 hover:underline">Create Account</a>
                    </div>
                </div>
            </div>
        `;
    }
}
