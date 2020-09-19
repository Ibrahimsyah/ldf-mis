const router = require('express').Router()
const HelloWorld = require('./HelloWorld')

router.use('/hello-world', HelloWorld)

module.exports = router