// Importing models
import Artist from "../models/Artist.js";
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
    
    if(existUser) {
        callback(null, false);
    } else if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    } else {
        const error = new Error('File image not supported. Choose one in jpeg/png');
        callback(error.message, false);
    }
}
const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 1 } // Accepting 1MB for each photo, 
});

const signup = async (req, res) => {

    // Adding path file of profile picture to body obj
    if(req.file) req.body.photo = req.file.path;

    // Reviewing duplicated users
    const { email } = req.body;
    const existUser = await Artist.findOne({ email });

    if(existUser) {
        const error = new Error('This user already exists');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Saving artist into DB
        const artist = new Artist(req.body);
        const savedArtist = await artist.save();

        res.json(savedArtist);

    } catch (error) {
        console.log(error);
    }

};  

const profile = (req, res) => {
    res.json({ msg: 'From API Artists Profiles' });
};


export {
    signup,
    profile,
    upload
}