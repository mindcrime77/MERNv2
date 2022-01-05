const { Schema, model, SchemaTypes: { ObjectId } } = require('mongoose')

const Product = new Schema({
    fileName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
    },
    productDescription: {
        type: String,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: ObjectId,
        ref: 'category',
        required: true
    },
    productQty: {
        type: Number,
        required: true
    }

}, { timestamps: true })

Product.index({ productName: 'text' })

module.exports = model('product', Product)