import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import assignmentRoutes from './routes/assignment.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Assignment Service API',
            version: '1.0.0',
            description: 'Extinguisher assignment service for Fire Extinguisher Inventory MIS',
        },
        servers: [
            {
                url: `http://localhost/api/assignments`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', assignmentRoutes);

// Error Handling
app.use(errorHandler);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB (Assignment Service)');
        app.listen(PORT, () => {
            logger.info(`Assignment Service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
    });
