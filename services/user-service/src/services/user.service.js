import User from '../models/user.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class UserService {
    async getAllUsers() {
        return await User.find().select('-password');
    }

    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) throw new ApiError(404, 'User not found');
        return user;
    }

    async updateUser(id, updateData) {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
        if (!user) throw new ApiError(404, 'User not found');
        return user;
    }

    async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new ApiError(404, 'User not found');
        return { message: 'User deleted successfully' };
    }
}

export default new UserService();
