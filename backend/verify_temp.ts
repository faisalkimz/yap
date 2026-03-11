import mongoose from 'mongoose';
import User from './src/models/UserMongo';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const verify = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');

    const email = "admin@bantucreations.com";
    const password = "admin123";

    const user = await User.findOne({ email });
    if (!user) {
        console.log('User not found in DB');
        process.exit(1);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    console.log('User role:', user.role);

    process.exit(0);
};

verify();
