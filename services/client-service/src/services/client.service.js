import Client from '../models/client.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class ClientService {
    async getAllClients() {
        return await Client.find();
    }

    async getClientById(id) {
        const client = await Client.findById(id);
        if (!client) throw new ApiError(404, 'Client not found');
        return client;
    }

    async createClient(clientData) {
        const existingClient = await Client.findOne({ email: clientData.email });
        if (existingClient) throw new ApiError(400, 'Client with this email already exists');

        const client = new Client(clientData);
        return await client.save();
    }

    async updateClient(id, updateData) {
        const client = await Client.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!client) throw new ApiError(404, 'Client not found');
        return client;
    }

    async deleteClient(id) {
        const client = await Client.findByIdAndDelete(id);
        if (!client) throw new ApiError(404, 'Client not found');
        return { message: 'Client deleted successfully' };
    }
}

export default new ClientService();
