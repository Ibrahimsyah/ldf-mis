const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', __.checkToken, _.getSales)
router.get('/summary', __.checkToken, _.getSummarizedSales)
router.post('/', __.checkToken, _.addSales)

module.exports = router