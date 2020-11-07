const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', _.getProducts)
router.put('/', _.editProduct)
router.post('/', _.addProduct)
router.delete('/', _.deleteProduct)

module.exports = router