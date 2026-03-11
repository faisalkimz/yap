import express from 'express';
import { getDashboardStats, getAllUsers, deleteUser, getAllOrders } from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.delete('/users/:id', deleteUser);

export default router;
