import clientService from '../services/client.service.js';

class ClientController {
    async getAllClients(req, res, next) {
        try {
            const clients = await clientService.getAllClients();
            res.status(200).json(clients);
        } catch (err) {
            next(err);
        }
    }

    async getClientById(req, res, next) {
        try {
            const client = await clientService.getClientById(req.params.id);
            res.status(200).json(client);
        } catch (err) {
            next(err);
        }
    }

    async createClient(req, res, next) {
        try {
            const client = await clientService.createClient(req.body);
            res.status(201).json(client);
        } catch (err) {
            next(err);
        }
    }

    async updateClient(req, res, next) {
        try {
            const client = await clientService.updateClient(req.params.id, req.body);
            res.status(200).json(client);
        } catch (err) {
            next(err);
        }
    }

    async deleteClient(req, res, next) {
        try {
            const result = await clientService.deleteClient(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new ClientController();
