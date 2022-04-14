import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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

// Hashing passwords before inserting into DB
artistSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

artistSchema.methods.checkPassword = async function(passwordUser) {
    return await bcrypt.compare(passwordUser, this.password);
};

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;