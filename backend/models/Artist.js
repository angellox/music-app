import mongoose from 'mongoose';
import generateId from '../helpers/generateId.js';

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
    token: {
        type: String,
        default: generateId
    },
    accountConfirm: {
        type: Boolean,
        default: false
    }
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;