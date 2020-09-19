const router = require('express').Router()
const HelloWorld = require('./HelloWorld')
const migrations = require('../db/migrations')

router.use('/hello-world', HelloWorld)
router.use('/migration/up', migrations.up)
router.use('/migration/down', migrations.down)

module.exports = router