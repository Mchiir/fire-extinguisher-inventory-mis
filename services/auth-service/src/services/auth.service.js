import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class AuthService {
    async register(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }
        const user = new User(userData);
        await user.save();
        return this.generateTokens(user);
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new ApiError(401, 'Invalid email or password');
        }
        return this.generateTokens(user);
    }

    async refreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(decoded.id);
            if (!user || user.tokenVersion !== decoded.version) {
                throw new ApiError(401, 'Invalid refresh token');
            }
            return this.generateTokens(user);
        } catch (err) {
            throw new ApiError(401, 'Invalid refresh token');
        }
    }

    generateTokens(user) {
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user._id, version: user.tokenVersion },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        return {
            accessToken, refreshToken, user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        };
    }

    async logout(userId) {
        const user = await User.findById(userId);
        if (user) {
            user.tokenVersion += 1;
            await user.save();
        }
    }
}

export default new AuthService();
