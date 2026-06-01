import fetch from 'node-fetch';
import Assignment from '../models/assignment.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class AssignmentService {
    async getAllAssignments() {
        return await Assignment.find();
    }

    async getAssignmentById(id) {
        const assignment = await Assignment.findById(id);
        if (!assignment) throw new ApiError(404, 'Assignment not found');
        return assignment;
    }

    async createAssignment(assignmentData, token) {
        // Cross-service validation: Check if client exists
        const clientResponse = await fetch(`${process.env.CLIENT_SERVICE_URL}/${assignmentData.clientId}`, {
            headers: { Authorization: token },
        });
        if (!clientResponse.ok) throw new ApiError(400, 'Invalid client ID');

        // Cross-service validation: Check if inventory item exists and is IN_STOCK
        const inventoryResponse = await fetch(`${process.env.INVENTORY_SERVICE_URL}/${assignmentData.inventoryItemId}`, {
            headers: { Authorization: token },
        });
        if (!inventoryResponse.ok) throw new ApiError(400, 'Invalid inventory item ID');

        const inventoryItem = await inventoryResponse.json();
        if (inventoryItem.status !== 'IN_STOCK') {
            throw new ApiError(400, 'Inventory item is not available for assignment');
        }

        // Create assignment
        const assignment = new Assignment(assignmentData);
        await assignment.save();

        // Update inventory item status to ASSIGNED
        await fetch(`${process.env.INVENTORY_SERVICE_URL}/${assignmentData.inventoryItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ status: 'ASSIGNED' }),
        });

        return assignment;
    }

    async returnAssignment(id, token) {
        const assignment = await Assignment.findById(id);
        if (!assignment || assignment.status !== 'ACTIVE') {
            throw new ApiError(400, 'Invalid assignment or assignment already returned');
        }

        assignment.status = 'RETURNED';
        assignment.returnDate = new Date();
        await assignment.save();

        // Update inventory item status to IN_STOCK
        await fetch(`${process.env.INVENTORY_SERVICE_URL}/${assignment.inventoryItemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ status: 'IN_STOCK' }),
        });

        return assignment;
    }
}

export default new AssignmentService();
