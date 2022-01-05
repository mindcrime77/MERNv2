const { model, Schema } = require('mongoose')

const Category = new Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        lowercase: true

    }
}, { timestamps: true })

module.exports = model('category', Category)