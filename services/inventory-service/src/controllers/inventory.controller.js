import inventoryService from '../services/inventory.service.js';

class InventoryController {
    async getAllInventory(req, res, next) {
        try {
            const items = await inventoryService.getAllInventory();
            res.status(200).json(items);
        } catch (err) {
            next(err);
        }
    }

    async getInventoryById(req, res, next) {
        try {
            const item = await inventoryService.getInventoryById(req.params.id);
            res.status(200).json(item);
        } catch (err) {
            next(err);
        }
    }

    async addInventoryItem(req, res, next) {
        try {
            const item = await inventoryService.addInventoryItem(req.body);
            res.status(201).json(item);
        } catch (err) {
            next(err);
        }
    }

    async updateInventoryItem(req, res, next) {
        try {
            const item = await inventoryService.updateInventoryItem(req.params.id, req.body);
            res.status(200).json(item);
        } catch (err) {
            next(err);
        }
    }

    async deleteInventoryItem(req, res, next) {
        try {
            const result = await inventoryService.deleteInventoryItem(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new InventoryController();
