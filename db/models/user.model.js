import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: String},
    phone: {type: String},
    gender: {type: String, enum: ['male', 'female']},
    verified: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    isLoggedIn: {type: Boolean, default: false}
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const hashedPassowrd = bcrypt.hashSync(this.password, 8)
        this.password = hashedPassowrd
        next()
    }
})

export const UserModel = mongoose.model('User', userSchema)

