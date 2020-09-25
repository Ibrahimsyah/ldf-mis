const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', _.getProducts)
router.post('/', _.addProduct)

module.exports = router