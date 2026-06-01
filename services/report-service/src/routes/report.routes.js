import express from 'express';
import reportController from '../controllers/report.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /inventory-summary:
 *   get:
 *     summary: Get high-level inventory summary
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/inventory-summary', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), reportController.getInventorySummary);

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Get assignment report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/assignments', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER'), reportController.getAssignmentReport);

/**
 * @swagger
 * /inventory-detailed:
 *   get:
 *     summary: Get detailed inventory report with product info
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/inventory-detailed', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), reportController.getDetailedInventoryReport);

export default router;
