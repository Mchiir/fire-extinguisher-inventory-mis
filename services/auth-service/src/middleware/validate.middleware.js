import { ApiError } from './error.middleware.js';

export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(400, errorMessage));
    }
    next();
};
