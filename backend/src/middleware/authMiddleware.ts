import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const vendorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user && ((req as any).user.role === 'vendor' || (req as any).user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Authorized roles only.' });
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user && (req as any).user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};
