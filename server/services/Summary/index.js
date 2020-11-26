const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/inoutproducts', __.checkToken, _.getInOut)
router.get('/agentreport', __.checkToken, _.getAgenReport)
router.get('/resellerreport', __.checkToken, _.getResellerReport)
router.get('/agendetailreport', __.checkToken, _.getAgenDetailReport)

module.exports = router