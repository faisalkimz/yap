import { Request, Response } from 'express';
import Product from '../models/ProductMongo';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('vendorId', 'name');
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('vendorId', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image,
            stock,
            vendorId: (req as any).user.userId // Assuming user is attached by auth middleware
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
