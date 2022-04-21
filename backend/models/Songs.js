import mongoose from 'mongoose';
// Internal Libraries

const songSchema = mongoose.Schema({
    song: {
        type: String,
        required: true
    },
    nameSong: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    plays: {
        type: Number,
        default: 0
    }, 
    likes: {
        type: Number,
        default: 0
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);

export default Song;