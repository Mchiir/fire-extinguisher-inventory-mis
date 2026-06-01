import productService from '../services/product.service.js';

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    async createProduct(req, res, next) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            next(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const result = await productService.deleteProduct(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new ProductController();
