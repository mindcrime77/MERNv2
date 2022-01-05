const router = require('express').Router()
const { getNewArrivals, searchByQueryType } = require('../controllers/filterController')
//const { authanticateJWT } = require('../middleware/authenticator')
//const upload = require('../middleware/multer')

router
    .route('/')
    .get(getNewArrivals)

router
    .route('/search')
    .post(searchByQueryType)


module.exports = router