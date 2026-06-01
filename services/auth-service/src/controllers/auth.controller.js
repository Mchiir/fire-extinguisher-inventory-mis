import authService from '../services/auth.service.js';
import logger from '../utils/logger.js';

class AuthController {
    async register(req, res, next) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await authService.refreshToken(refreshToken);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const { userId } = req.body; // In practice, extracted from token
            await authService.logout(userId);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();
