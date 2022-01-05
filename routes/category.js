const router = require('express').Router()
const categoryController = require('../controllers/crudController')
const { authanticateJWT } = require('../middleware/authenticator')

router
    .route('/')
    .post(authanticateJWT, categoryController.create)
    .get(categoryController.loadCategories)


module.exports = router