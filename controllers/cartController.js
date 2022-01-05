const Cart = require('../models/Cart')

exports.carts = async (req, res) => {


    try {
        let cart = new Cart()
        cart.user = req.user.id
        cart.cartList = [...req.body]
        await cart.save()
        res.status(200).json({ customMsgSuccess: 'Successfully saved!', cart })
    } catch (error) {
        res.status(500).json({ customMsgError: 'Could not save...' })
    }
}

exports.cartById = async (req, res) => {
    try {
        const user_cart = await Cart.find({ user: req.params.id }).populate('cartList')
        res.status(200).json(user_cart)
    } catch (error) {
        throw error
    }
}