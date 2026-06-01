import express from 'express';
import Joi from 'joi';
import inventoryController from '../controllers/inventory.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const inventorySchema = Joi.object({
    serialNumber: Joi.string().required(),
    productId: Joi.string().required(),
    manufacturingDate: Joi.date().required(),
    expiryDate: Joi.date().required(),
    status: Joi.string().valid('IN_STOCK', 'ASSIGNED', 'EXPIRED', 'UNDER_MAINTENANCE'),
    quantity: Joi.number(),
});

const updateInventorySchema = Joi.object({
    serialNumber: Joi.string(),
    productId: Joi.string(),
    manufacturingDate: Joi.date(),
    expiryDate: Joi.date(),
    status: Joi.string().valid('IN_STOCK', 'ASSIGNED', 'EXPIRED', 'UNDER_MAINTENANCE'),
    quantity: Joi.number(),
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, inventoryController.getAllInventory);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get inventory item by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, inventoryController.getInventoryById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add new inventory item (Admin/Inventory Manager)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), validate(inventorySchema), inventoryController.addInventoryItem);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update inventory item (Admin/Inventory Manager)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), validate(updateInventorySchema), inventoryController.updateInventoryItem);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete inventory item (Admin/Inventory Manager)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), inventoryController.deleteInventoryItem);

export default router;
