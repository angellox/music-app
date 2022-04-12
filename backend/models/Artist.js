import mongoose from 'mongoose';

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    genre: {
        type: String,
        required: true
    },
    accountConfirm: {
        type: Boolean,
        default: false
    }
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;