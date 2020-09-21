const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.post('/registration', _.registerNewUser)
router.post('/login', _.loginUser)

module.exports = router