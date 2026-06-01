import jwt from 'jsonwebtoken';
import { ApiError } from './error.middleware.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'No token provided'));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
        req.user = decoded;
        next();
    } catch (err) {
        return next(new ApiError(401, 'Invalid or expired token'));
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action'));
        }
        next();
    };
};
