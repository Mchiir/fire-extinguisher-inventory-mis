import express from 'express';
import notificationController from '../controllers/notification.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all notifications (Admin only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, authorize('ADMIN'), notificationController.getAllNotifications);

/**
 * @swagger
 * /my:
 *   get:
 *     summary: Get current client notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.get('/my', authenticate, notificationController.getMyNotifications);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, notificationController.deleteNotification);

export default router;
