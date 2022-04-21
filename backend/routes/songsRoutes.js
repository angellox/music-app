import express from 'express';
import { 
    addSongs, 
    getSongs 
} from '../controllers/songsController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSongs).post(checkAuth, addSongs);

export default router;