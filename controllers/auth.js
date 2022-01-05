const User = require('../models/User')

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errorMessage: 'Email already exists!' })
        }
        const newUser = await User.create(req.body)
        return res.status(201).json({ msgSuccess: 'Registration success, please signin!', newUser })
    } catch (error) {
        console.log('signup controller error: ', error)
        res.status(500).json({ errorMessage: 'Server error!' })
    }

}

exports.signinController = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errorMessage: 'Invalid credentials!' })
        }
        const match = await user.comparePasswords(password)
        if (!match) {
            return res.status(400).json({ errorMessage: 'Invalid credentials!(pass)' })
        }

        const token = user.generateWebToken()
        if (user) {
            return res.status(200).json({ msg: 'Login success!', user, token })
        }

    } catch (error) {
        console.log('signin controller error: ', error)
        res.status(500).json({ errorMessage: 'Server error!' })
    }

}