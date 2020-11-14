const router = require('express').Router()
const HelloWorld = require('./HelloWorld')
const Auth = require('./Auth')
const Products = require('./Products')
const Regions = require('./Regions')
const Sales = require('./Sales')
const Users = require('./Users')
const migrations = require('../db/migrations')
const seeder = require('../db/seeder')

const notFound = (req, res) => {
    return res.status(404).send('Layanan tidak Ditemukan')
}
const error = (err, req, res) => {
    return res.status(500).json({
        error: err
    })
}

router.use('/hello-world', HelloWorld)
router.use('/auth', Auth)
router.use('/products', Products)
router.use('/regions', Regions)
router.use('/sales', Sales)
router.use('/users', Users)
router.use('/migration/up', migrations.up)
router.use('/migration/down', migrations.down)
router.use('/seed', seeder.seed)
router.use('/unseed', seeder.unseed)
router.use(notFound)
router.use(error)


module.exports = router