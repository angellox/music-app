import express from 'express';
import { 
    signup, 
    profile, 
    confirmAccount, 
    authenticate, 
    forgotPassword, 
    checkToken, 
    setNewPassword,
    updateProfile
} from '../controllers/profileController.js';

import checkAuth from '../middleware/authMiddleware.js';
import Artist from '../models/Artist.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});
const fileFilter = async (req, file, callback) => {
    // Rejecting certain type of files (only supports jpeg, png)
    const { email } = req.body;
    const existUser = await Artist.findOne({ email });

    if (existUser) {
        callback(null, false);
    } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        return callback(new Error('File image not supported. Choose one jpeg/png'), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 1 } // Accepting 1MB for each photo, 
});

const uploadSimpleImage = upload.single('photo');

const router = express.Router();
// Public area
router.post('/', authenticate);
router.post('/sign-up', signup);
router.post('/forgotten-password', forgotPassword);
router.get('/confirm/:rol/:token', confirmAccount);
router.route('/forgotten-password/:rol/:token').get(checkToken).post(setNewPassword);

// Private area (for access users only)
router.get('/users', checkAuth, profile);
router.put('/users/:id', checkAuth, updateProfile);

export default router;