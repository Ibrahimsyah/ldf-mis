const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/stat', __.checkToken, _.getUserStat)
router.get('/me', __.checkToken, _.getCurrentUser)
router.get('/', __.checkToken, _.getUsers)
router.put('/confirmation', __.checkToken, _.confirmUser)
router.put('/changepassword', __.checkToken, _.changePassword)
router.put('/', __.checkToken, _.editUser)
router.post('/', __.checkToken, _.addUser)
router.delete('/', __.checkToken, _.deleteUser)

module.exports = router