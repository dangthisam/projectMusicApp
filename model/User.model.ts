
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password:string) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema , 'users');
export default User;