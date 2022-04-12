import express from 'express';
import { signup, profile, upload } from '../controllers/artistController.js'; 
const router = express.Router();

router.post('/', upload.single('photo'), signup);
router.get('/profile', profile);


export default router;