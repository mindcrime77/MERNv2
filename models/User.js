const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

User.pre('save', async function () {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

User.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

User.methods.generateWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES
    })
}

module.exports = mongoose.model('user', User)