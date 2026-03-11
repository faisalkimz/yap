import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserMongo';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: { id: user._id, name, email, role: user.role }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt: email=[${email}] (${email?.length}), password=[${password}] (${password?.length})`);
        if (email) {
            console.log('Email chars:', Array.from(email).map((c: any) => c.charCodeAt(0)));
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User [${email}] not found`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for [${email}]`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log(`Login success: [${email}]`);

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
