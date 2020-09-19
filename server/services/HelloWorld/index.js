const router = require('express').Router()
const __ = require('../../middlewares')
const _ = require('./handler')

router.get('/', _.sendHello)
router.post('/', _.getHello)

module.exports = router