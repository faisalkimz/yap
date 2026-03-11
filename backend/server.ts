import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth';
import productRoutes from './src/routes/products';
import userRoutes from './src/routes/users';
import { initDB } from './src/config/db';

dotenv.config();

const app = express();
initDB('mongodb'); // Initializing with MongoDB as the "kawa" choice
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Bantu Creations API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
