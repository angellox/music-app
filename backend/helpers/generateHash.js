import bcrypt from 'bcrypt';

async function generateHash(next) {
    if(!this.isModified('password')) {
        next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}

export default generateHash;