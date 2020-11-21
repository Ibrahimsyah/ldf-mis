const db = require('../../db')
const { RESELLER, AGEN } = require('../../constants/roles')
const { json } = require('express')
const { select } = require('../../db')

module.exports = {
    getInOut: async (req, res, next) => {
        try {
            const income =
                db('penjualan as p')
                    .select(db.raw('DATE(p.waktu) as waktu'), 'p3.product_name', db.raw('sum(p.jumlah) as jumlah'), db.raw('sum(p.jumlah*p2.admin_price) as harga'), db.raw('true as is_income'))
                    .join('prices as p2', 'p.product_id', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .join('users as u', 'u.id', '=', 'p.seller_id')
                    .join('roles as r2', 'u.role_id', '=', 'r2.id')
                    .whereRaw(`MONTH (waktu) = MONTH(CURDATE()) and r2.role_name='Admin'`)
                    .groupByRaw('DATE(p.waktu), p3.product_name')
            const outcome =
                db('pembelian as p')
                    .select(db.raw('DATE(p.waktu) as waktu'), 'p3.product_name', db.raw('sum(p.jumlah) as jumlah'), db.raw('sum(p.jumlah*p2.admin_price) as harga'), db.raw('false as is_income'))
                    .join('prices as p2', 'p.product_id', '=', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .whereRaw('MONTH (waktu) = MONTH(CURDATE())')
                    .groupByRaw('DATE(p.waktu), p3.product_name')
            const builder = db.from(db.union(income, outcome).as('summary')).orderBy('waktu')

            const data = await builder
            const [{totalIncome}] = await db.select(db.raw('sum(harga) as totalIncome')).from(income.clone().as('income'))
            const [{totalOutcome}] = await db.select(db.raw('sum(harga) as totalOutcome')).from(outcome.clone().as('outcome'))
            const margin = totalIncome - totalOutcome

            res.json({
                totalIncome,
                totalOutcome,
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