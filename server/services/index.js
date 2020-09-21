const router = require('express').Router()
const HelloWorld = require('./HelloWorld')
const Auth = require('./Auth')
const migrations = require('../db/migrations')
const seeder = require('../db/seeder')

router.use('/hello-world', HelloWorld)
router.use('/auth', Auth)
router.use('/migration/up', migrations.up)
router.use('/migration/down', migrations.down)
router.use('/seed', seeder.seed)
router.use('/unseed', seeder.unseed)

module.exports = router