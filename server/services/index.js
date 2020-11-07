const router = require('express').Router()
const HelloWorld = require('./HelloWorld')
const Auth = require('./Auth')
const Product = require('./Products')
const migrations = require('../db/migrations')
const seeder = require('../db/seeder')

const error = (req, res) => {
    return res.status(500).send('Internal Server Error')
}

router.use('/hello-world', HelloWorld)
router.use('/auth', Auth)
router.use('/products', Product)
router.use('/migration/up', migrations.up)
router.use('/migration/down', migrations.down)
router.use('/seed', seeder.seed)
router.use('/unseed', seeder.unseed)
router.use(error)


module.exports = router