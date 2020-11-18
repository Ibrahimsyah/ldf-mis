const { v4 } = require('uuid')

const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getProducts: async (req, res) => {
        const { product_id } = req.query
        let data = null;
        if (product_id) {
            data =
                await db('products as p')
                    .select('product_id', 'product_name', 'supplier_id', 'buy_price', 'admin_price', 'agen_price', 'reseller_price')
                    .where({ id: product_id })
                    .andWhere({ is_deleted: false })
                    .join('prices as p2', 'p2.product_id', '=', 'p.id')
                    .first()
        } else {
            const { page = 1, limit = 10, keyword = '' } = req.query
            const productTotal = (await db('products as p')).length
            const meta = {
                total: productTotal,
                current: Number(page),
                pageSize: Number(limit)
            }
            const products = await db('products as p')
                .select('product_id', 'product_name', 'buy_price', 'admin_price', 'agen_price', 'reseller_price')
                .join('prices as p2', 'p2.product_id', '=', 'p.id')
                .whereRaw(`lower(product_name) like '%${keyword.toLowerCase()}%' and is_deleted = 0`)
                .offset(limit * (page - 1))
                .limit(limit)
            data = { meta: meta, data: products }
        }
        res.json(data)
    },

    deleteProduct: async (req, res, next) => {
        const { product_id } = req.query
        try {
            await db('products').where({ id: product_id }).update({
                is_deleted: true
            })
            return response.success(res)
        } catch (err) {
            next(err)
        }
    },

    editProduct: async (req, res, next) => {
        const { product_id } = req.query
        const { product_name, buy_price, supplier_id, admin_price, agen_price, reseller_price } = req.body
        try {
            console.log(req.body)
            await db('prices').where({ product_id: product_id }).update({ buy_price, admin_price, agen_price, reseller_price })
            await db('products').where({ id: product_id }).update({
                supplier_id: supplier_id || knex.raw('DEFAULT'),
                product_name
            })
            return response.success(res)
        } catch (err) {
            next(err)
        }
    },

    addProduct: async (req, res, next) => {
        const { product_name, supplier_id, buy_price = 0, admin_price, agen_price, reseller_price } = req.body
        try {
            const product_id = v4()
            const product = {
                id: product_id,
                supplier_id,
                product_name
            }
            const price = {
                product_id,
                buy_price,
                admin_price,
                agen_price,
                reseller_price
            }
            await db('products').insert(product)
            await db('prices').insert(price)
            return response.success(res)
        } catch (err) {
            next()
        }
    }
}