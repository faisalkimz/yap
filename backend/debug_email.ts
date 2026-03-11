import mongoose from 'mongoose';
import User from './src/models/UserMongo';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');
    const user = await User.findOne({ role: 'admin' });
    if (user) {
        console.log('Email:', user.email);
        console.log('Email chars:', Array.from(user.email).map(c => c.charCodeAt(0)));
    } else {
        console.log('No admin user found');
    }
    process.exit(0);
};
test();
