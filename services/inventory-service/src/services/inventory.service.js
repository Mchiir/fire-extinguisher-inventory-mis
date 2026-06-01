import InventoryItem from '../models/inventory.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class InventoryService {
    async getAllInventory() {
        return await InventoryItem.find();
    }

    async getInventoryById(id) {
        const item = await InventoryItem.findById(id);
        if (!item) throw new ApiError(404, 'Inventory item not found');
        return item;
    }

    async addInventoryItem(itemData) {
        const item = new InventoryItem(itemData);
        return await item.save();
    }

    async updateInventoryItem(id, updateData) {
        const item = await InventoryItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!item) throw new ApiError(404, 'Inventory item not found');
        return item;
    }

    async deleteInventoryItem(id) {
        const item = await InventoryItem.findByIdAndDelete(id);
        if (!item) throw new ApiError(404, 'Inventory item not found');
        return { message: 'Inventory item deleted successfully' };
    }
}

export default new InventoryService();
