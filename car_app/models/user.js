const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    isCustomer : Boolean,
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    isAdmin: {
        type: Boolean,
        default : false
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {   _id : this.id, 
            name: this.name,
            admin: this.isAdmin
        }, process.env.JWT_PASSWORD_CAR_API)
}

const User = mongoose.model('user', userSchema);

module.exports = User