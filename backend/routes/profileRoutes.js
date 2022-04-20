import express from 'express';
import { 
    signup, 
    profile, 
    confirmAccount, 
    authenticate, 
    forgotPassword, 
    checkToken, 
    setNewPassword
} from '../controllers/profilesController.js'; 

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();
// Public area
router.post('/', signup);
router.get('/confirm/:rol/:token', confirmAccount);
router.post('/login', authenticate);
router.route('/forgotten-password/:rol/:token').get(checkToken).post(setNewPassword);
router.post('/forgotten-password', forgotPassword);

// Private area (for access users only)
router.get('/profile', checkAuth, profile);

export default router;