const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/top10reseller', __.checkToken, _.getTop10Reseller)
// router.put('/', __.checkToken, _.editRegion)
// router.post('/', __.checkToken, _.addRegion)
// router.delete('/', __.checkToken, _.deleteRegion)

module.exports = router