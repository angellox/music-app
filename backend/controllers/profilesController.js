// Importing models
import Artist from "../models/Artist.js";
import Listener from "../models/Listener.js";
// Importing internal libraries
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
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
        const { email, genre } = req.body;
        let user = {};
        let obj;
        obj = await Promise.all([Artist.findOne({ email }), Listener.findOne({ email })]);
        user = obj[0] ? obj[0] : obj[1];

        // If user already exists
        if (user) {
            const error = new Error('This user already exists');
            return res.status(400).json({ msg: error.message });
        }
        // If image is not supported
        if(err) {
            return res.status(406).json({ msg: err.message });
        }

        try {
            // Saving artist/listener into DB
            let obj;
            if(genre) {
                const artist = new Artist(req.body);
                obj = await artist.save();
            } else {
                const listener = new Listener(req.body);
                obj = await listener.save(); 
            }
            res.json(obj);
        } catch (error) {
            console.log(error);
        } 
    });
};

const confirmAccount = async (req, res) => {
    const { rol, token } = req.params;
    let obj;

    obj = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(!obj){
        const error = new Error('Token is invalid');
        return res.status(404).json({ msg: error.message });
    }

    try {

        obj.token = null;
        obj.accountConfirm = true;
        await obj.save();
        res.json({ msg: 'User confirmed successfully!'});
        
    } catch (error) {
        console.log(error);
    }

};

const authenticate = async (req, res) => {

    const { email, password } = req.body;
    let user = {};
    // Verifiying user
    let obj;

    obj = await Promise.all([Artist.findOne({ email }), Listener.findOne({ email })]);
    user = obj[0] ? obj[0] : obj[1];
    // Verifying if user exits in DB.
    if(!user) {
        const error = new Error('This user does not exist.');
        return res.status(403).json({ msg: error.message });
    }

    // Verifying if account is confirmed 
    if(!user.accountConfirm) {
        const error = new Error('Your account has not been confirmed. Try confirming it with your email.');
        return res.status(403).json({ msg: error.message }); 
    }

    // Validating user with its password
    if( await user.checkPassword(password) ) {
        res.json({ token: generateJWT(user._id) });
    } else {
        const error = new Error('Email/Password are incorrect.');
        return res.status(403).json({ msg: error.message });
    }
    
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Verifiying user
    let user = {};
    let obj;

    obj = await Promise.all([Artist.findOne({ email }), Listener.findOne({ email })]);
    user = obj[0] ? obj[0] : obj[1];

    if(!user) {
        const error = new Error('User does not exist');
        return res.status(400).json({ msg: error.message });
    }

    // Verifying if account is confirmed 
    if(!user.accountConfirm) {
        const error = new Error('Your account has not been confirmed. Try confirming it with your email.');
        return res.status(403).json({ msg: error.message }); 
    }

    try {
        user.token = generateId();
        await user.save();
        res.json({ msg: 'We\'ve sent a message to your email. Verify it!' });
    } catch (error) {
        console.log(error);
    }
};
const checkToken = async (req, res) => {
    const { rol, token } = req.params;
    let obj;
    obj = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(obj) {
        res.json({ msg: 'Token valid and user exists' });
    } else {
        const e = new Error('Token is not valid. Verify your account');
        return res.status(404).json({ msg: e.message });
    }
};
const setNewPassword = async (req, res) => {
    const { rol, token } = req.params;
    const { newPassword } = req.body;

    let obj;
    obj = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(!obj) {
        const error = new Error('An error occurred with your request');
        return res.status(400).json({ msg: error.message });
    }

    try {
        obj.password = newPassword;
        obj.token = null;
        await obj.save();

        res.json({ msg: 'Password has been changed correctly. Log in!' });
    } catch (error) {
        console.log(error);
    }
};

// Displaying user's session (Artist or Listener)
const profile = (req, res) => {
    const { artist } = req;
    res.json({ profile: artist });
};

export {
    signup,
    profile,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    setNewPassword
}