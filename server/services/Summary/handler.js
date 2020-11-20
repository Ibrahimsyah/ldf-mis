const db = require('../../db')
const { RESELLER, AGEN } = require('../../constants/roles')
const { json } = require('express')
const { select } = require('../../db')

module.exports = {
    getInOut: async (req, res, next) => {
        try {
            const income =
                db('penjualan as p')
                    .select('p.waktu', 'p3.product_name', 'p.jumlah', db.raw('p.jumlah*p2.admin_price as harga'), db.raw('true as is_income'))
                    .join('prices as p2', 'p.product_id', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .join('users as u', 'u.id', '=', 'p.seller_id')
                    .join('roles as r2', 'u.role_id', '=', 'r2.id')
                    .whereRaw(`MONTH (waktu) = MONTH(CURDATE()) and r2.role_name='Admin'`)
            const outcome =
                db('pembelian as p')
                    .select('p.waktu', 'p3.product_name', 'p.jumlah', db.raw('p.jumlah*p2.buy_price*-1 as harga'), db.raw('false as is_income'))
                    .join('prices as p2', 'p.product_id', '=', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .whereRaw('MONTH (waktu) = MONTH(CURDATE())')

            const builder = db.from(db.union(income, outcome).as('summary'))

            const data = await builder
            const [{margin}] = await builder.select(db.raw('sum(harga) as margin'))

            res.json({
                margin,
                data
            })
        } catch (err) {
            next(err)
        }
    },
    getTop10Agen: async (req, res, next) => {
        const { range = 1 } = req.query
        try {
            const data =
                await db('penjualan as p')
                    .select('p.seller_id', 'b.nama', db.raw(`sum(p.jumlah*pr.reseller_price) as total`))
                    .join('prices as pr', 'pr.product_id', '=', 'p.product_id')
                    .join('users as u', 'u.id', '=', 'p.seller_id')
                    .join('profiles as b', 'b.user_id', '=', 'u.id')
                    .where('u.role_id', AGEN.id)
                    .whereRaw(`cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - ${range}`)
                    .orderBy('total', 'desc')
                    .groupBy('p.seller_id')
                    .limit(10)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    getSummarizedSalesData: async (req, res, next) => {

    },
}