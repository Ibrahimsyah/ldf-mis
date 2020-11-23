const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/inoutproducts', __.checkToken, _.getInOut)
router.get('/agentreport', __.checkToken, _.getAgenReport)

module.exports = router