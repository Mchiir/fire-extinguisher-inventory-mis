import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import notificationRoutes from './routes/notification.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import logger from './utils/logger.js';
import { initCronJobs } from './services/cron.service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notification Service API',
            version: '1.0.0',
            description: 'Notification service for Fire Extinguisher Inventory MIS',
        },
        servers: [
            {
                url: `http://localhost/api/notifications`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', notificationRoutes);

// Error Handling
app.use(errorHandler);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB (Notification Service)');

        // Initialize Cron Jobs
        initCronJobs();

        app.listen(PORT, () => {
            logger.info(`Notification Service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
    });
