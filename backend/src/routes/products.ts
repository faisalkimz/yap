import express from 'express';
const router = express.Router();

// Mock products data
const products = [
    {
        id: '1',
        name: 'Velvet Evening Blazer',
        price: '£420.00',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1594932224528-a4603e236124?w=800&q=80',
        category: 'Formal'
    },
    {
        id: '2',
        name: 'Obsidian Leather boots',
        price: '£310.00',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?w=800&q=80',
        category: 'Footwear'
    },
    {
        id: '101',
        name: 'Mulberry Silk Shirt',
        price: '£215.00',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        category: 'Heritage'
    },
    {
        id: '102',
        name: 'Technical Trench',
        price: '£890.00',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1539533397341-3927b4c74bb6?w=800&q=80',
        category: 'Winter'
    }
];

// GET /api/products
router.get('/', (req, res) => {
    res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

export default router;
