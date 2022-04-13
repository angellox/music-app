import express from 'express';
import { signup, profile, confirmAccount } from '../controllers/artistController.js'; 
const router = express.Router();

router.post('/', signup);
router.get('/profile', profile);
router.get('/confirm/:token', confirmAccount);

export default router;