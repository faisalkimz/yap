import mongoose from 'mongoose';
import Product from './src/models/ProductMongo';
import User from './src/models/UserMongo';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');

        // Clear existing
        await Product.deleteMany({});
        await User.deleteMany({});

        // Create Admin User
        const adminEmail = "admin@bantucreations.com";
        const adminPassword = "admin123";
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = new User({
            name: 'Bantu Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
        console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);

        // No hardcoded products - manage them through the admin panel
        const products: any[] = [];

        await Product.insertMany(products);
        console.log('Database cleared of dummy products. Admin user is ready.');

        process.exit(0);
    } catch (e) {
        console.error('Seed Error:', e);
        process.exit(1);
    }
};

seedDB();
