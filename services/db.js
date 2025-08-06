import mongoose from 'mongoose';

class Database {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database connected');
        } catch (err) {
            console.error('Database connection error:', err);
            process.exit(1);
        }
    }
}

export default new Database();
