const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', __.checkToken, _.getSuppliers)
router.put('/', __.checkToken, _.editProduct)
router.post('/', __.checkToken, _.addSupplier)
router.delete('/', __.checkToken, _.deleteSuppliers)

module.exports = router