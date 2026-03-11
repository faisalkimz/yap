import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware, vendorMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes (Vendors only)
router.post('/', authMiddleware, vendorMiddleware, createProduct);
router.put('/:id', authMiddleware, vendorMiddleware, updateProduct);
router.delete('/:id', authMiddleware, vendorMiddleware, deleteProduct);

export default router;
