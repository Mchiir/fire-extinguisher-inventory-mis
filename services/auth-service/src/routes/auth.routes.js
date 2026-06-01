import express from 'express';
import Joi from 'joi';
import authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER', 'CLIENT'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const refreshSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [ADMIN, INVENTORY_MANAGER, SALES_OFFICER, CLIENT] }
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: Token refreshed
 */
router.post('/refresh', validate(refreshSchema), authController.refresh);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string }
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', authController.logout);

export default router;
