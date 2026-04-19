import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express()

// CORS - allow all origins (update with your frontend URL in production)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

// Middleware: ensure DB is connected before every request (critical for Vercel serverless)
app.use(async (req, res, next) => {
    try {
        await connDb();
        next();
    } catch (error) {
        console.error('DB Connection failed:', error.message);
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
});

app.get('/', (req, res) => {
    res.json({ success: true, message: "Server is running successfully!" })
})

app.use('/api/admin', adminRoutes)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) })
}

export default app;