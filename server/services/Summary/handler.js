const db = require('../../db')
const { RESELLER, AGEN } = require('../../constants/roles')
const { json } = require('express')
const { select } = require('../../db')

module.exports = {
    getInOut: async (req, res, next) => {
        try {
            const income =
                db('penjualan as p')
                    .select(db.raw('p.waktu as waktu'), 'p3.product_name', db.raw('sum(p.jumlah) as jumlah'), db.raw('sum(p.jumlah*p2.admin_price) as harga'), db.raw('true as is_income'))
                    .join('prices as p2', 'p.product_id', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .join('users as u', 'u.id', '=', 'p.seller_id')
                    .join('roles as r2', 'u.role_id', '=', 'r2.id')
                    .whereRaw(`MONTH (waktu) = MONTH(CURDATE()) and r2.role_name='Admin'`)
                    .groupByRaw('p.waktu, p3.product_name')
            const outcome =
                db('pembelian as p')
                    .select(db.raw('p.waktu as waktu'), 'p3.product_name', db.raw('sum(p.jumlah) as jumlah'), db.raw('sum(p.jumlah*p2.admin_price) as harga'), db.raw('false as is_income'))
                    .join('prices as p2', 'p.product_id', '=', 'p2.product_id')
                    .join('products as p3', 'p3.id', '=', 'p.product_id')
                    .whereRaw('MONTH (waktu) = MONTH(CURDATE())')
                    .groupByRaw('p.waktu, p3.product_name')
            const builder = db.from(db.union(income, outcome).as('summary')).orderBy('waktu')

            const data = await builder
            const [{totalIncome}] = await db.select(db.raw('sum(harga) as totalIncome')).from(income.clone().as('income'))
            const [{totalOutcome}] = await db.select(db.raw('sum(harga) as totalOutcome')).from(outcome.clone().as('outcome'))
            const margin = totalIncome - totalOutcome

            res.json({
                totalIncome: totalIncome || 0,
                totalOutcome: totalOutcome || 0,
                margin,
                data
            })
        } catch (err) {
            next(err)
        }
    },
    getAgenReport: async (req, res, next) => {
        try {
            const data =
                await db('agen as a')
                .select(db.raw(`p.user_id, p.nama, COALESCE(sum(p2.jumlah), 0) as barang_terjual, COALESCE (sum(p2.jumlah*p3.agen_price),0) as total_pendapatan`))
                .join('profiles as p', 'p.user_id', '=', 'a.agen_id')
                .leftJoin('penjualan as p2', function(){
                    this.on('p2.seller_id', '=', 'a.agen_id')
                    this.andOn(db.raw('MONTH (p2.waktu) = MONTH (CURDATE())'))
                })
                .leftJoin('prices as p3', 'p3.product_id', '=', 'p2.product_id')
                .groupBy('p.user_id','p.nama')
                .orderBy('total_pendapatan', 'desc')
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
}