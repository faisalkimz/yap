import mongoose from 'mongoose';
import Product from './src/models/ProductMongo';
import User from './src/models/UserMongo';
import dotenv from 'dotenv';
dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');
        const products = await Product.find();
        const users = await User.find().select('-password');
        console.log(`Found ${products.length} products`);
        console.log(`Found ${users.length} users:`);
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkDB();
