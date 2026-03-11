import mongoose from 'mongoose';
import User from './src/models/UserMongo';
import dotenv from 'dotenv';
dotenv.config();

const listUsers = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');
    const users = await User.find({});
    console.log('Total users:', users.length);
    users.forEach(u => {
        console.log(`- [${u.email}] role: ${u.role}`);
        console.log(`  email length: ${u.email.length}`);
    });
    process.exit(0);
};

listUsers();
