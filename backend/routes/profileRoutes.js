import express from 'express';
import { 
    signup, 
    profile, 
    confirmAccount, 
    authenticate, 
    forgotPassword, 
    checkToken, 
    setNewPassword
} from '../controllers/profileController.js'; 

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();
// Public area
router.post('/', signup);
router.get('/confirm/:rol/:token', confirmAccount);
router.post('/login', authenticate);
router.post('/forgotten-password', forgotPassword);
router.route('/forgotten-password/:rol/:token').get(checkToken).post(setNewPassword);

// Private area (for access users only)
router.get('/user/:rol', checkAuth, profile);

export default router;