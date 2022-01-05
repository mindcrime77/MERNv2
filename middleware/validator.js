const Joi = require('@hapi/joi')

const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

const schemaSignin = Joi.object({

    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

exports.validatorResult = (req, res, next) => {

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });
    next()
}

exports.validatorSignin = (req, res, next) => {

    const { error } = schemaSignin.validate(req.body);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });
    next()
}


/* const { check, validationResult } = require('express-validator')

exports.signupValidator = [
    check('username')
        .not().isEmpty()
        .trim()
        .withMessage('All fields required(server).'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email(server).'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at list 6 char long(server).')
]

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req)
    const hasErrors = !result.isEmpty()
    if (hasErrors) {

        console.log('has Errors: ', hasErrors)
        console.log('result: ', result)
        //const firstError = result.array()[0].msg
        //return res.status(400).json({ errorMessage: firstError })
    }
    //res.status(200).json('SUCCESS!!!')
    next()
} */