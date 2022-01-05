const router = require('express').Router()
const { carts, cartById } = require('../controllers/cartController')
const { authanticateJWT } = require('../middleware/authenticator')

router
    .route('/')
    .post(authanticateJWT, carts)


router
    .route('/:id')
    .get(authanticateJWT, cartById)

module.exports = router