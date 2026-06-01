import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Service API',
            version: '1.0.0',
            description: 'Product catalog service for Fire Extinguisher Inventory MIS',
        },
        servers: [
            {
                url: `http://localhost/api/products`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', productRoutes);

// Error Handling
app.use(errorHandler);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB (Product Service)');
        app.listen(PORT, () => {
            logger.info(`Product Service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
    });
