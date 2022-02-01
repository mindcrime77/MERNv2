const router = require('express').Router()
const { getUsers, updateRole } = require('../controllers/userControllers')
router
    .route('/')
    .get(getUsers)
router
    .route('/:id')
    .patch(updateRole)

module.exports = router