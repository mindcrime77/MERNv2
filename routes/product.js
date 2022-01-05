const router = require('express').Router()
const { create, readAll, delProduct, getProduct, updateProduct, readByCount } = require('../controllers/productController')
const { authanticateJWT } = require('../middleware/authenticator')
const upload = require('../middleware/multer')

router
    .route('/')
    .post(authanticateJWT, upload.single('foodImage'), create)
    .get(readAll)
router
    .route('/count')
    .get(readByCount)
router
    .route('/:id')
    .get(authanticateJWT, getProduct)
    .delete(authanticateJWT, delProduct)
router
    .route('/:id')
    .put(authanticateJWT, upload.single('fileName'), updateProduct)

module.exports = router