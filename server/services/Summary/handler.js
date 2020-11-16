const db = require('../../db')
const { RESELLER, AGEN } = require('../../constants/roles')

module.exports = {
    getTop10Reseller: async (req, res, next) => {
        const { range = 1 } = req.query
        try {
            const data =
                await db('penjualan as p')
                    .select('p.seller_id', 'b.nama', db.raw(`sum(p.jumlah*pr.reseller_price) as total`))
                    .join('prices as pr', 'pr.product_id', '=', 'p.product_id')
                    .join('users as u', 'u.id', '=', 'p.seller_id')
                    .join('profiles as b', 'b.user_id', '=', 'u.id')
                    .where('u.role_id', RESELLER.id)
                    .whereRaw(`cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - ${range}`)
                    .orderBy('total', 'desc')
                    .groupBy('p.seller_id')
                    .limit(10)
            res.status(200).json(data)
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

    getTop10Region: async (req, res, next) => {
        const { range = 1 } = req.query
        try {
            const regions = await db('regions')
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },

    getSummarizedSalesData: async (req, res, next) => {

    },
}