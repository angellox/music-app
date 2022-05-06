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
router.post('/', authenticate);
router.post('/sign-up', signup);
router.post('/forgotten-password', forgotPassword);
router.get('/confirm/:rol/:token', confirmAccount);
router.route('/forgotten-password/:rol/:token').get(checkToken).post(setNewPassword);

// Private area (for access users only)
router.get('/users', checkAuth, profile);

export default router;