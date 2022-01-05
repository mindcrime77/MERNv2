const { Schema, model, SchemaTypes: { ObjectId } } = require('mongoose')

const Cart = new Schema({
    cartList: [],
    user: {
        type: ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

module.exports = model('cart', Cart)