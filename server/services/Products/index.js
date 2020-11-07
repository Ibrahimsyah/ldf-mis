const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', __.checkToken, _.getProducts)
router.put('/', __.checkToken, _.editProduct)
router.post('/', __.checkToken, _.addProduct)
router.delete('/', __.checkToken, _.deleteProduct)

module.exports = router