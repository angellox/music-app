import Song from '../models/Songs.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/songs/');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + '.mp3');
    }
});
const fileFilter = async (req, file, callback) => {
    // Rejecting certain type of files (only supports mp3)
    const sizeLimit = 1024 * 1024 * 20;
    if (file.mimetype === 'audio/mpeg') {
        callback(null, true);
    } else {
        return callback(new Error('File song not supported. Choose one mp3'), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 20 } // Accepting 20MB for each song 
});
const uploadSingleSong = upload.single('song');

const addSongs = (req, res) => {
    
    uploadSingleSong(req, res, async err => {
        // Adding path file of song to body obj
        if (req.file) req.body.song = req.file.path;
        
        const song = new Song(req.body);
        song.artist = req.artist._id;

        // If song is not supported
        if(err) {
            return res.status(406).json({ msg: err.message });
        }

        try {
            const songSaved = await song.save();
            res.json(songSaved);
        } catch (error) {
            console.log(error);
        }

    });
};

const getSongs = (req, res) => {

};

export {
    addSongs,
    getSongs
}