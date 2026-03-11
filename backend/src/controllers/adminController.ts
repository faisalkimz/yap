import { Request, Response } from 'express';
import User from '../models/UserMongo';
import Product from '../models/ProductMongo';
import Order from '../models/OrderMongo';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'customer' });
        const totalVendors = await User.countDocuments({ role: 'vendor' });
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const recentOrders = await Order.find()
            .sort({ orderDate: -1 })
            .limit(5)
            .populate('userId', 'name email');

        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);

        res.json({
            stats: {
                totalUsers,
                totalVendors,
                totalProducts,
                totalOrders,
                totalRevenue: revenueData[0]?.totalRevenue || 0
            },
            recentOrders
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
            .sort({ orderDate: -1 })
            .populate('userId', 'name email')
            .populate('items.productId', 'name price image');
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
