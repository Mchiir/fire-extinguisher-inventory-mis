import userService from '../services/user.service.js';

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const result = await userService.deleteUser(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async getProfile(req, res, next) {
        try {
            const user = await userService.getUserById(req.user.id);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
