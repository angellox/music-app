// Importing models
import Artist from "../models/Artist.js";
// Importing internal libraries
import generateJWT from "../helpers/generateJWT.js";
// Importing external libraries
import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/images/');
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

const signup = async (req, res) => {

    uploadSimpleImage(req, res, async err => {

        // Adding path file of profile picture to body obj
        if (req.file) req.body.photo = req.file.path;

        // Reviewing duplicated users
        const { email } = req.body;
        const existUser = await Artist.findOne({ email });

        // If user already exists
        if (existUser) {
            const error = new Error('This user already exists');
            return res.status(400).json({ msg: error.message });
        }
        // If image is not supported
        if(err) {
            return res.status(406).json({ msg: err.message });
        }

        try {
            // Saving artist into DB
            const artist = new Artist(req.body);

            const savedArtist = await artist.save();
            res.json(savedArtist);

        } catch (error) {
            console.log(error);
        } 
    });
};

const confirmAccount = async (req, res) => {
    const { token } = req.params;

    const userToConfirm = await Artist.findOne({ token });

    if(!userToConfirm){
        const error = new Error('Token is invalid');
        return res.status(404).json({ msg: error.message });
    }

    try {

        userToConfirm.token = null;
        userToConfirm.accountConfirm = true;

        await userToConfirm.save();

        res.json({ msg: 'User confirmed successfully!'});
        
    } catch (error) {
        console.log(error);
    }

    
};

const profile = (req, res) => {
    res.json({ msg: 'From API Artists Profiles' });
};

const authenticate = async (req, res) => {

    const { email, password } = req.body;

    // Verifiying user
    const user = await Artist.findOne({ email });

    if(!user) {
        const error = new Error('This user does not exist.');
        return res.status(403).json({ msg: error.message });
    }

    if(!user.accountConfirm) {
        const error = new Error('Your account has not been confirmed. Try confirming it with your email.');
        return res.status(403).json({ msg: error.message }); 
    }

    // Authenticating existing user
    if( await user.checkPassword(password) ) {
        res.json({ token: generateJWT(user._id) });
    } else {
        const error = new Error('Password is incorrect.');
        return res.status(403).json({ msg: error.message });
    }
    
};

export {
    signup,
    profile,
    confirmAccount,
    authenticate
}