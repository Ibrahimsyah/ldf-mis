const { v4 } = require('uuid')

const db = require('../../db')
const { AGEN, RESELLER, ADMIN } = require('../../constants/roles')

module.exports = {
    getProducts: async (req, res) => {
        const data =
            await db('products as p')
                .select('product_id', 'product_name', 'admin_price', 'agen_price', 'reseller_price')
                .join('prices as p2', 'p2.product_id', '=', 'p.id')
        res.json(data)
    },

    addProduct: async (req, res) => {
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
            res.status(500).json(err)
        }
    }
}