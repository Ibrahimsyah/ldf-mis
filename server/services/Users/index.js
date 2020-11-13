const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', __.checkToken, _.getUsers)
router.put('/', __.checkToken, _.editUser)
router.put('/confirmation', __.checkToken, _.confirmUser)
router.post('/', __.checkToken, _.addUser)
router.delete('/', __.checkToken, _.deleteUser)

module.exports = router