import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Internal Libraries
import generateId from '../helpers/generateId.js';
import generateHash from '../helpers/generateHash.js';

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
    isArtist: {
        type: Boolean,
        default: true
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

// Hashing passwords before inserting into DB
artistSchema.pre('save', generateHash);
artistSchema.methods.checkPassword = async function(passwordUser) {
    return await bcrypt.compare(passwordUser, this.password);
};

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;