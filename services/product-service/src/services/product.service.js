import Product from '../models/product.model.js';
import { ApiError } from '../middleware/error.middleware.js';

class ProductService {
    async getAllProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        const product = await Product.findById(id);
        if (!product) throw new ApiError(404, 'Product not found');
        return product;
    }

    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async updateProduct(id, updateData) {
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!product) throw new ApiError(404, 'Product not found');
        return product;
    }

    async deleteProduct(id) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) throw new ApiError(404, 'Product not found');
        return { message: 'Product deleted successfully' };
    }
}

export default new ProductService();
