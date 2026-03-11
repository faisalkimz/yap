import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL Configuration (using Sequelize)
export const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
    dialect: 'postgres',
    logging: false,
});

// MongoDB Configuration (using Mongoose)
export const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bantu_db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error Connecting to MongoDB: ${error}`);
    }
};

// Main Database Switch/Initialization
export const initDB = async (type: 'postgres' | 'mongodb' = 'postgres') => {
    if (type === 'postgres') {
        try {
            await sequelize.authenticate();
            console.log('PostgreSQL Connected...');
            // Sync models here
        } catch (error) {
            console.error('PostgreSQL Connection Error:', error);
        }
    } else {
        await connectMongoDB();
    }
};
