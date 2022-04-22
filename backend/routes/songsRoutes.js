import express from 'express';
import { 
    addSongs, 
    getSongs,
    getSong,
    updateSong,
    deleteSong
} from '../controllers/songsController.js';
import checkAuth from '../middleware/authMiddleware.js';
import Song from '../models/Songs.js';

const router = express.Router();

// Private routes
router.route('/')
      .get(checkAuth, getSongs)
      .post(checkAuth, addSongs);

router.route('/:id')
      .get(checkAuth, getSong)
      .put(checkAuth, updateSong)
      .delete(checkAuth, deleteSong);

export default router;