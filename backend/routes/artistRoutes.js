import express from 'express';
import { signup, profile } from '../controllers/artistController.js'; 
const router = express.Router();

router.post('/', signup);
router.get('/profile', profile);


export default router;