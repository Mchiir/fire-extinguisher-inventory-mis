import express from 'express';
import Joi from 'joi';
import productController from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const productSchema = Joi.object({
    name: Joi.string().required(),
    extinguisherType: Joi.string().required(),
    capacity: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    manufacturer: Joi.string().required(),
    maintenanceInterval: Joi.number().required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string(),
    extinguisherType: Joi.string(),
    capacity: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    manufacturer: Joi.string(),
    maintenanceInterval: Joi.number(),
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products (Public)
 *     tags: [Products]
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get product by ID (Public)
 *     tags: [Products]
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create product (Admin/Inventory Manager)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), validate(productSchema), productController.createProduct);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update product (Admin/Inventory Manager)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), validate(updateProductSchema), productController.updateProduct);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete product (Admin/Inventory Manager)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, authorize('ADMIN', 'INVENTORY_MANAGER'), productController.deleteProduct);

export default router;
