const jwt = require('jsonwebtoken')

exports.authanticateJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ customMsgError: 'No token, authorisation denied.' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)

        req.user = decoded
        console.log(req.user)
        next()
    } catch (error) {
        console.log('jwt error: ', error)
        return res.status(401).json({ customMsgError: 'Invalid token.' })
    }


}