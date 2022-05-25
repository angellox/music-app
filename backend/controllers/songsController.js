// Importing models
import Song from '../models/Songs.js';
// Importing internal libraries
import trunkId from '../helpers/trunkId.js';
// Importing external libraries
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/songs/');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + '.mp3');
    }
});
const fileFilter = async (req, file, callback) => {
    // Rejecting certain type of files (only supports mp3)
    if (file.mimetype === 'audio/mpeg') {
        callback(null, true);
    } else {
        const e = new Error('File song not supported. Choose one mp3')
        return callback(e, false);
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
        song.artist = req.user._id;

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

const getSongs = async (req, res) => {
    const songs = await Song.find().where('artist').equals(req.user);
    res.json(songs);
};

const getSong = async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById(id);

    // confirming an existing song
    if(!song) {
        const error = new Error('Song not found it :(');
        return res.status(404).json({ msg: error.message });
    }

    // confirming that the logged artist has rights to delete his/her songs
    if( song.artist._id.toString() !== req.artist._id.toString() ) {
        const error = new Error('This action is not allowed!');
        return res.status(404).json({ msg: error.message });
    }

    // All ok! Sending song to API
    res.json(song);
    
};

const updateSong = async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById(id);

    if(!song) {
        const error = new Error('Song not found it :(');
        return res.status(404).json({ msg: error.message });
    } 

    if( song.artist._id.toString() !== req.user._id.toString() ) {
        const error = new Error('This action is not allowed!');
        return res.status(403).json({ msg: error.message });
    }

    // Updating data in a song
    song.nameSong = req.body.nameSong || song.nameSong;
    song.description = req.body.description || song.description;

    try {
        const songUpdated = await song.save();
        res.json(songUpdated);
    } catch(error) {
        console.log(error);
    }
    
}; 

const deleteSong = async (req, res) => {
    const { id } = req.params;
    const song = await Song.findById(id);

    if(!song) {
        const error = new Error('Song not found it :(');
        return res.status(404).json({ msg: error.message });
    } 

    if( song.artist._id.toString() !== req.user._id.toString() ) {
        const error = new Error('This action is not allowed by this user!');
        return res.status(403).json({ msg: error.message });
    }

    // Deleting a song
    try {
        const nameSong = song.nameSong;
        const idSong = trunkId(song._id.toString());
        const path = song.song;

        await song.deleteOne();
        fs.unlink(path, err => {
            if (err){
                const e = new Error('Song\'s Path not found');
                return res.status(404).json({ msg: e.message });
            }
            res.json({ msg: `Song: ${idSong} - ${nameSong} deleted successfully` });
        });
        
    } catch (error) {
        console.log(error);
    }
};

export {
    addSongs,
    getSongs,
    getSong,
    updateSong,
    deleteSong
}