import express from 'express';
import Joi from 'joi';
import assignmentController from '../controllers/assignment.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const assignmentSchema = Joi.object({
    clientId: Joi.string().required(),
    inventoryItemId: Joi.string().required(),
    returnDate: Joi.date(),
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all assignments (Admin/Inventory Manager/Sales Officer)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER'), assignmentController.getAllAssignments);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get assignment by ID
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, assignmentController.getAssignmentById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create assignment (Admin/Inventory Manager/Sales Officer)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER', 'SALES_OFFICER'), validate(assignmentSchema), assignmentController.createAssignment);

/**
 * @swagger
 * /{id}/return:
 *   post:
 *     summary: Return extinguisher (Admin/Inventory Manager)
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:id/return', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), assignmentController.returnAssignment);

export default router;
