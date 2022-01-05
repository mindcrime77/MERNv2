const router = require('express').Router()
const { validatorResult, validatorSignin } = require('../middleware/validator')
const { signupController, signinController } = require('../controllers/auth')

router
    .route('/signup')
    .post(validatorResult, signupController)
router
    .route('/signin')
    .post(validatorSignin, signinController)

module.exports = router