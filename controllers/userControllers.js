const User = require('../models/User')
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ customMsgError: 'No users...', })
    }
}

exports.updateRole = async (req, res) => {
    try {
        const { username, email, role } = req.body
        const update = {
            username,
            email,
            role: role ? 1 : 0
        }
        const upadateUser = await User.updateOne({ _id: req.params.id }, update)
        res.status(200).json({ msg: 'User is updated...' })

    } catch (error) {
        console.log(error)
    }
}