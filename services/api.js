import express from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const api = express.Router();

// Security middleware
api.use(helmet());
api.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// Auth middleware
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token provided');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes
api.post('/auth/login', async (req, res) => {
    try {
        // Authentication logic
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

api.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        // Dashboard data logic
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default api;
