const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getSales: async (req, res, next) => {
        const { range = 1 } = req.query
        try {
            let data = await db('pembelian as p')
                .select('p.product_id', 'pr.product_name', 'p.jumlah', `h.buy_price as harga_satuan`, 'p.waktu', db.raw(`p.jumlah * h.buy_price as total`))
                .join('prices as h', 'p.product_id', '=', 'h.product_id')
                .join('products as pr', 'pr.id', '=', 'p.product_id')
                .whereRaw(`(cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - ${range})`)
                .orderBy('p.waktu', "desc")

            res.json(data).status(200)
        } catch (err) {
            next(err)
        }
    },

    getSummarizedSales: async (req, res, next) => {
        try {
            let builder = db('pembelian as p')
                .select(db.raw(`sum(h.buy_price * p.jumlah) as total`))
                .join('prices as h', 'p.product_id', '=', 'h.product_id')
                .join('products as pr', 'pr.id', '=', 'p.product_id')

            const todayOutcome = await builder.clone()
                .whereRaw('cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - 1')

            const last7Outcome = await builder.clone()
                .whereRaw('cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - 7')

            const last30Outcome = await builder.clone()
                .whereRaw('cast(p.waktu as date) <= CURDATE() and cast(p.waktu as date) > CURDATE() - 30')

            const data = {
                todayOutcome: todayOutcome[0].total || 0,
                last7Outcome: last7Outcome[0].total || 0,
                last30Outcome: last30Outcome[0].total || 0
            }
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    addSales: async (req, res, next) => {
        const { products, purchase_date } = req.body
        try {
            const sales = products.map(product => {
                return {
                    product_id: product.product_id,
                    waktu: purchase_date,
                    jumlah: product.quantity
                }
            })
            await db('pembelian').insert(sales)
            res.status(200).json(response.success)
        } catch (err) {
            next(err)
        }
    }
}