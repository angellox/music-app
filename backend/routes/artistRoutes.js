import express from 'express';
import { signup, profile, confirmAccount, authenticate } from '../controllers/artistController.js'; 
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();
// Public area
router.post('/', signup);
router.get('/confirm/:token', confirmAccount);
router.post('/login', authenticate);

// Private area (for access users only)
router.get('/profile', checkAuth, profile);

export default router;