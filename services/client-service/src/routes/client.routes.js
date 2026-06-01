import express from 'express';
import Joi from 'joi';
import clientController from '../controllers/client.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

const clientSchema = Joi.object({
    companyName: Joi.string().required(),
    contactPerson: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
});

const updateClientSchema = Joi.object({
    companyName: Joi.string(),
    contactPerson: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all clients (Admin/Sales Officer)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authenticate, authorize('ADMIN', 'SALES_OFFICER'), clientController.getAllClients);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get client by ID (Admin/Sales Officer)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, authorize('ADMIN', 'SALES_OFFICER'), clientController.getClientById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create client (Admin/Sales Officer)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authenticate, authorize('ADMIN', 'SALES_OFFICER'), validate(clientSchema), clientController.createClient);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update client (Admin/Sales Officer)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authenticate, authorize('ADMIN', 'SALES_OFFICER'), validate(updateClientSchema), clientController.updateClient);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete client (Admin/Sales Officer)
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authenticate, authorize('ADMIN', 'SALES_OFFICER'), clientController.deleteClient);

export default router;
