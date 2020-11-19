const router     = require('express').Router()
const Auth       = require('./Auth')
const HelloWorld = require('./HelloWorld')
const Products   = require('./Products')
const Purchase   = require('./Purchase')
const Regions    = require('./Regions')
const Reports    = require('./Reports')
const Sales      = require('./Sales')
const Summary    = require('./Summary')
const Suppliers  = require('./Suppliers')
const Users      = require('./Users')
const migrations = require('../db/migrations')
const seeder     = require('../db/seeder')

const notFound = (req, res, next) => {
    res.status(404)
    const err = new Error('Layanan tidak ditemukan')
    next(err)
}
const error = (error, req, res, next) => {
    const message = error.message || "Ada Masalah Pada Server, Hubungi Administrator"
    res.status(res.statusCode || 500).json({
        error: message
    })
}

router.use('/hello-world', HelloWorld)
router.use('/auth', Auth)
router.use('/products', Products)
router.use('/purchase', Purchase)
router.use('/regions', Regions)
router.use('/reports', Reports)
router.use('/sales', Sales)
router.use('/summary', Summary)
router.use('/suppliers', Suppliers)
router.use('/users', Users)

router.use('/migration/up', migrations.up)
router.use('/migration/down', migrations.down)
router.use('/seed', seeder.seed)
router.use('/unseed', seeder.unseed)
router.use(notFound)
router.use(error)


module.exports = router