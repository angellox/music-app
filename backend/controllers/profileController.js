// Importing models
import Artist from '../models/Artist.js';
import Listener from '../models/Listener.js';
// Importing internal libraries
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';
import emailSending from '../helpers/emailSending.js';
import emailPasswords from '../helpers/emailPasswords.js';
// Importing external libraries
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

const signup = async (req, res) => {

    uploadSimpleImage(req, res, async err => {

        // Adding path file of profile picture to body obj
        if (req.file) req.body.photo = (req.file.path).substring(7);

        // Reviewing duplicated users
        const { name, email, genre } = req.body;
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
            if(genre) {
                const artist = new Artist(req.body);
                obj = await artist.save();
            } else {
                const listener = new Listener(req.body);
                obj = await listener.save(); 
            }

            //Sending email
            emailSending({
                email,
                name,
                token: obj.token,
                rol: obj.isArtist
            });

            res.json(obj);
        } catch (error) {
            console.log(error);
        } 
    });
};

const confirmAccount = async (req, res) => {
    const { rol, token } = req.params;
    let user;

    user = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(!user){
        const error = new Error('Error! This request has been done');
        return res.status(404).json({ msg: error.message });
    }

    try {

        user.token = null;
        user.accountConfirm = true;
        await user.save();
        res.json({ msg: 'User confirmed successfully!' });
        
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
        const error = new Error('This user does not exist. Try creating one!');
        return res.status(403).json({ msg: error.message });
    }

    // Verifying if account is confirmed 
    if(!user.accountConfirm) {
        const error = new Error('Your account has not been confirmed. Try confirming it with your email.');
        return res.status(403).json({ msg: error.message }); 
    }

    // Validating user with its password
    if( await user.checkPassword(password) ) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            isArtist: user.isArtist,
            genre: user.genre,
            token: generateJWT(user._id)
        });
    } else {
        const error = new Error('Email or password are incorrect.');
        return res.status(403).json({ msg: error.message });
    }
    
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Verifiying user
    let user = {};
    let obj;

    obj = await Promise.all([Artist.findOne({ email }), Listener.findOne({ email })]);
    // Artist is obj[0] while Listener is obj[1]
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

        // Sending email to client
        emailPasswords({
            email,
            name: user.name,
            token: user.token,
            rol: user.isArtist
        })

        res.json({ msg: 'We\'ve sent a message to your email. Verify it!' });
    } catch (error) {
        console.log(error);
    }
};
const checkToken = async (req, res) => {
    const { rol, token } = req.params;
    let user;
    user = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(user) {
        res.json({ msg: 'Token valid and user exists' });
    } else {
        const e = new Error('Token is not valid. Verify your account');
        return res.status(404).json({ msg: e.message });
    }
};
const setNewPassword = async (req, res) => {
    const { rol, token } = req.params;
    const { newPassword } = req.body;

    let user;
    user = rol === 'artist' ? await Artist.findOne({ token }) : rol === 'listener' ? await Listener.findOne({ token }) : null;

    if(!user) {
        const error = new Error('An error occurred with your request');
        return res.status(400).json({ msg: error.message });
    }

    try {
        user.password = newPassword;
        user.token = null;
        await user.save();

        res.json({ msg: 'Password has been changed correctly. Log in ... ' });
    } catch (error) {
        console.log(error);
    }
};

// Displaying user's session (Artist or Listener)
const profile = (req, res) => {
    const { user }  = req;
    res.json(user);
};

const updateProfile = async (req, res) => {

    const profile = await Artist.findById(req.params.id);

    if(!profile) {
        const error = new Error('Something bad occurs!');
        return res.status(400).json({ msg: error.message });
    }

    if(profile.email !== req.body.email) {
        const isEmailExisted = await Artist.findOne({ email: req.body.email });
        if(isEmailExisted) {
            const error = new Error('That email is used by someone else');
            return res.status(400).json({ msg: error.message });
        } 
    }

    try {
        profile.name = req.body.name || profile.name;
        profile.email = req.body.email || profile.email;
        profile.genre = req.body.genre || profile.genre;

        const userUpdated = await profile.save();
        res.json(userUpdated);

    } catch (error) {
        console.log(error);
    }

};

export {
    signup,
    profile,
    confirmAccount,
    authenticate,
    forgotPassword,
    checkToken,
    setNewPassword,
    updateProfile
}