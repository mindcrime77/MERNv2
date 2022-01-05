const Product = require('../models/Product')
const fs = require('fs')

exports.create = async (req, res) => {


    const { filename } = req.file
    const { foodName, foodDescr, foodPrice, foodCategory, foodQty } = req.body

    try {
        const food = await Product.findOne({ productName: foodName })

        if (food) return res.status(400).json({ customMsgError: `${foodName} already exists...` })
        const product = new Product()
        product.fileName = filename
        product.productName = foodName
        product.productDescription = foodDescr
        product.productPrice = foodPrice
        product.productCategory = foodCategory
        product.productQty = foodQty

        await product.save()

        res.status(200).json({ customMsgSuccess: `${foodName} was created.`, product })
    } catch (error) {
        console.log('product controller - create ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }


}

exports.readAll = async (req, res) => {
    try {
        const products = await Product.find().populate('productCategory', 'category')
        res.status(200).json({ products })
    } catch (error) {
        console.log('product controller - readAll error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}

exports.readByCount = async (req, res) => {
    try {
        const products = await Product.find().populate('productCategory', 'category').limit(4)
        res.status(200).json({ products })
    } catch (error) {
        console.log('product controller - readAll error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}

exports.delProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)

        fs.unlink(`uploads/${deletedProduct.fileName}`, (err) => {
            if (err) throw err
            console.log('Image succesfully deleted from file system', deletedProduct.fileName)
        })
        res.status(200).json({ customMsgSuccess: 'Product deleted...', deletedProduct })
    } catch (error) {
        console.log('product controller - DEL error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)


        res.status(200).json({ product })
    } catch (error) {
        console.log('product get single controller - error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}

exports.updateProduct = async (req, res) => {
    //console.log('BODY:', req.body)
    //console.log('FILE:', req.file)


    if (req.file !== undefined) {

        req.body.fileName = req.body.filename
    }
    const oldProduct = await Product.findByIdAndUpdate(req.params.id, req.body)//{new:true}

    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {

        fs.unlink(`uploads/${oldProduct.fileName}`, (err) => {
            if (err) throw err
            console.log('Image succesfully deleted from file system', oldProduct.fileName)
        })
    }

    res.status(200).json({ customMsgSuccess: 'Product updated...' })
}




