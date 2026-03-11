import { Request, Response } from 'express';
import Order from '../models/OrderMongo';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
        const userId = (req as any).user.userId;

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const orders = await Order.find({ userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('items.productId', 'name price image');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Allow access if owner or admin
        const currentUser = (req as any).user;
        if (order.userId._id.toString() !== currentUser.userId && currentUser.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        if ((req as any).user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can update order status' });
        }
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
