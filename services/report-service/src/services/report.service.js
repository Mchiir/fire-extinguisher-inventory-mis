import fetch from 'node-fetch';
import { ApiError } from '../middleware/error.middleware.js';

class ReportService {
    async getInventorySummary(token) {
        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}`, {
            headers: { Authorization: token },
        });
        if (!response.ok) throw new ApiError(500, 'Failed to fetch inventory data');
        const items = await response.json();

        const summary = {
            totalItems: items.length,
            inStock: items.filter(i => i.status === 'IN_STOCK').length,
            assigned: items.filter(i => i.status === 'ASSIGNED').length,
            expired: items.filter(i => i.status === 'EXPIRED').length,
            underMaintenance: items.filter(i => i.status === 'UNDER_MAINTENANCE').length,
        };

        return summary;
    }

    async getAssignmentReport(token) {
        const response = await fetch(`${process.env.ASSIGNMENT_SERVICE_URL}`, {
            headers: { Authorization: token },
        });
        if (!response.ok) throw new ApiError(500, 'Failed to fetch assignment data');
        const assignments = await response.json();

        return assignments;
    }

    async getDetailedInventoryReport(token) {
        // This could combine product details with inventory details
        const [invRes, prodRes] = await Promise.all([
            fetch(`${process.env.INVENTORY_SERVICE_URL}`, { headers: { Authorization: token } }),
            fetch(`${process.env.PRODUCT_SERVICE_URL}`, { headers: { Authorization: token } }),
        ]);

        if (!invRes.ok || !prodRes.ok) throw new ApiError(500, 'Failed to fetch aggregate report data');

        const inventory = await invRes.json();
        const products = await prodRes.json();

        const report = inventory.map(item => ({
            ...item,
            product: products.find(p => p._id === item.productId) || { name: 'Unknown' }
        }));

        return report;
    }
}

export default new ReportService();
