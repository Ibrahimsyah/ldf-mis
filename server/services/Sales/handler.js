const db = require('../../db')
const response = require('../../constants/response')
const { ADMIN, AGEN, RESELLER } = require('../../constants/roles')

module.exports = {
    getSales: async (req, res, next) => {
        const { range = 1 } = req.query
        try {
            let priceID;
            switch (req.role_name) {
                case ADMIN.role_name:
                    priceID = 'admin_price'
                    break;
                case AGEN.role_name:
                    priceID = 'agen_price'
                    break
                case RESELLER.role_name:
                    priceID = 'reseller_price'
            }
            let builder = db('penjualan as p')
                .join('prices as h', 'p.product_id', '=', 'h.product_id')
                .join('products as pr', 'pr.id', '=', 'p.product_id')
                .where('p.seller_id', req.user_id)

            const data = await builder
                .select('p.product_id', 'pr.product_name', 'p.jumlah', `h.${priceID} as harga_satuan`, 'p.waktu', db.raw(`p.jumlah * h.${priceID} as total`))
                .whereRaw(`cast(p.waktu as date) between curdate() - ${range} and curdate()`)

            res.json(data).status(200)
        } catch (err) {
            next(err)
        }
    },

    getSummarizedSales: async (req, res, next) => {
        try {
            let priceID;
            switch (req.role_name) {
                case ADMIN.role_name:
                    priceID = 'admin_price'
                    break;
                case AGEN.role_name:
                    priceID = 'agen_price'
                    break
                case RESELLER.role_name:
                    priceID = 'reseller_price'
            }
            let builder = db('penjualan as p')
                .select(db.raw(`sum(h.${priceID} * p.jumlah) as total`))
                .join('prices as h', 'p.product_id', '=', 'h.product_id')
                .join('products as pr', 'pr.id', '=', 'p.product_id')
                .where('p.seller_id', req.user_id)

            const todayIncome = await builder.clone()
                .whereRaw('cast(p.waktu as date) between curdate() - 1 and curdate()')

            const last7Income = await builder.clone()
                .whereRaw('cast(p.waktu as date) between curdate() - 7 and curdate()')

            const last30Income = await builder.clone()
                .whereRaw('cast(p.waktu as date) between curdate() - 30 and curdate()')

            const data = {
                todayIncome: todayIncome[0].total,
                last7Income: last7Income[0].total,
                last30Income: last30Income[0].total
            }
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    addSales: async (req, res, next) => {
        const { products, sales_date } = req.body
        try {
            const sales = products.map(product => {
                return {
                    seller_id: req.user_id,
                    product_id: product.product_id,
                    waktu: sales_date,
                    jumlah: product.quantity
                }
            })
            await db('penjualan').insert(sales)
            res.status(200).json(response.success)
        } catch (err) {
            next(err)
        }
    }
}