import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Internal Libraries
import generateId from '../helpers/generateId.js';
import generateHash from '../helpers/generateHash.js';

const listenerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    likedSongs: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: null
    },
    plays: {
        type: Number,
        default: 0
    },
    isArtist: {
        type: Boolean,
        default: false
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

// Hashing passwords before inserting into DB
listenerSchema.pre('save', generateHash);
listenerSchema.methods.checkPassword = async function(passwordUser) {
    return await bcrypt.compare(passwordUser, this.password);
};

const Listener = mongoose.model('Listener', listenerSchema);

export default Listener;