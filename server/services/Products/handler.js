const { v4 } = require('uuid')

const db = require('../../db')
const { AGEN, RESELLER, ADMIN } = require('../../constants/roles')
const response = require('../../constants/response')

module.exports = {
    getProducts: async (req, res) => {
        const { product_id } = req.query
        let data = null;
        if (product_id) {
            data =
                await db('products as p')
                    .select('product_id', 'product_name', 'admin_price', 'agen_price', 'reseller_price')
                    .where({ id: product_id })
                    .join('prices as p2', 'p2.product_id', '=', 'p.id')
                    .first()
        } else {
            const { page, limit, keyword = '' } = req.query
            const productTotal = (await db('products as p')).length
            const meta = {
                total: productTotal,
                current: Number(page),
                pageSize: Number(limit)
            }
            const products = await db('products as p')
                .select('product_id', 'product_name', 'admin_price', 'agen_price', 'reseller_price')
                .join('prices as p2', 'p2.product_id', '=', 'p.id')
                .offset(limit * (page - 1))
                .whereRaw(`lower(product_name) like '%${keyword.toLowerCase()}%'`)
                .limit(limit)
            data = { meta: meta, data: products }
        }
        res.json(data)
    },

    deleteProduct: async (req, res, next) => {
        const { product_id } = req.query
        try {
            await db('prices').where({ product_id: product_id }).del()
            await db('products').where({ id: product_id }).del()
            res.status(200).json(response.success)
        } catch {
            next()
        }
    },

    editProduct: async (req, res, next) => {
        const { product_id } = req.query
        const { product_name, admin_price, agen_price, reseller_price } = req.body
        try {
            await db('prices').where({ product_id: product_id }).update({ admin_price, agen_price, reseller_price })
            await db('products').where({ id: product_id }).update({ product_name })
            res.status(200).json(response.success)
        } catch {
            next()
        }
    },

    addProduct: async (req, res, next) => {
        const { product_name, admin_price, agen_price, reseller_price } = req.body
        try {
            const product_id = v4()
            const product = {
                id: product_id,
                product_name
            }
            const price = {
                product_id,
                admin_price,
                agen_price,
                reseller_price
            }
            await db('products').insert(product)
            await db('prices').insert(price)
            const response = {
                message: 'success'
            }
            res.status(200).json(response)
        } catch (err) {
            next()
        }
    }
}