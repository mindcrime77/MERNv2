const Product = require('../models/Product')

exports.getNewArrivals = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : 'desc'
    const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(3)
    try {
        const arrivals = await Product.find().sort({ createdAt: sortBy }).limit(limit)
        res.status(200).json({ arrivals })
    } catch (error) {
        console.log('Arrivals filter controller - GET error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}

exports.searchByQueryType = async (req, res) => {
    const { type, query } = req.body
    try {
        let products;

        switch (type) {
            case 'text':
                products = await Product.find({ $text: { $search: query } })
                break
            case 'category':
                products = await Product.find({ productCategory: { $in: query } })
                break
        }
        if (!products.length > 0) {
            products = await Product.find({})
        }

        res.json({ products })

    } catch (error) {
        console.log('searchByQueryType - GET error: ', error)
        res.status(500).json({ customMsgError: 'Please try again...', })
    }
}






