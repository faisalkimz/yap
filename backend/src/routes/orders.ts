import express from 'express';
import { createOrder, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware); // All order routes require authentication

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

export default router;
