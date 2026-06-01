import express from 'express';
import Joi from 'joi';
import userController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const updateUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    role: Joi.string().valid('ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER', 'CLIENT'),
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', authenticate, userController.getProfile);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, authorize('ADMIN'), userController.getAllUsers);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, authorize('ADMIN'), userController.getUserById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticate, authorize('ADMIN'), validate(updateUserSchema), userController.updateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, authorize('ADMIN'), userController.deleteUser);

export default router;
