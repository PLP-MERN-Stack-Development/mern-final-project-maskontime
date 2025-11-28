// Handle uncaught exceptions early
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { limiter, authLimiter } = require('./Middleware/rateLimiter');
const { errorHandler } = require('./Middleware/errorHandler');
const logger = require('./utils/logger');
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to Database
const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;
if (mongoUri) {
    process.env.MONGODB_URL = mongoUri;
    connectDB();
} else {
    logger.warn('MongoDB URI not found. Starting without database connection.');
}

// Security Middleware
app.use(helmet());
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : [];

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(limiter);
app.use('/api/v1/auth', authLimiter);

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Import routes
const mealRoutes = require('./Routes/mealRoutes');
const herbRoutes = require('./Routes/herbRoutes');
const honeyRoutes = require('./Routes/honeyRoutes');
const workoutRoutes = require('./Routes/workoutRoutes');
const personnelRoutes = require('./Routes/personnelRoutes');
const authRoutes = require('./Routes/authRoutes');
const searchRoutes = require('./Routes/searchRoutes');

app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/herbs', herbRoutes);
app.use('/api/v1/honey', honeyRoutes);
app.use('/api/v1/workouts', workoutRoutes);
app.use('/api/v1/personnel', personnelRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/search', searchRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Handle unhandled routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`
    });
});

// Unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    logger.error('Unhandled Rejection:', err && err.message ? err.message : err);
    if (typeof server !== 'undefined' && server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
