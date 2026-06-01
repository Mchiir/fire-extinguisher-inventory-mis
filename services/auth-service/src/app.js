import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'Authentication service for Fire Extinguisher Inventory MIS',
    },
    servers: [
      {
        url: `http://localhost/api/auth`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', authRoutes);

// Error Handling
app.use(errorHandler);

console.log('MONGO_URI:', JSON.stringify(process.env.MONGO_URI));
// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB (Auth Service)');
    app.listen(PORT, () => {
      logger.info(`Auth Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
  });
