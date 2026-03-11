import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { authMiddleware as auth } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', auth, getProfile);

// PUT /api/users/profile
router.put('/profile', auth, updateProfile);

export default router;
