const Category = require('../models/Category')

exports.create = async (req, res) => {
    const { category } = req.body
    //const newCategory = await Category.findOne(req.body)


    try {
        const cat = await Category.findOne({ category })

        if (cat) return res.status(400).json({ customMsgError: `${category} already exists...` })
        const newCategory = await Category.create(req.body)
        res.status(200).json({
            category: newCategory,
            customMsgSuccess: `${category} created!`
        })
    } catch (error) {
        console.log('create category error: ', error)
        res.status(500).json({
            customMsgError: 'Plese try again!'
        })
    }
}

exports.loadCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ categories })
    } catch (error) {
        console.log('load category error: ', error)
        res.status(500).json({
            customMsgError: 'Plese try again!'
        })
    }
}

