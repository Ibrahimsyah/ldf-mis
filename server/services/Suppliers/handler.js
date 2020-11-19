const { v4 } = require('uuid')

const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getSuppliers: async (req, res, next) => {
        const { supplier_id, showProducts } = req.query
        let data = null;
        try {
            if (supplier_id) {
                data = await db('suppliers as s')
                    .select('s.id', 'nama', 'nama_pemilik', 'alamat', 'no_telp', 'email')
                    .where('s.is_deleted', 0)
                    .andWhere('s.id', supplier_id)
                    .first()
                if (showProducts) {
                    const products = await db('products as p')
                        .select('p.id', 'p.product_name', 'h.buy_price')
                        .join('prices as h', 'h.product_id', '=', 'p.id')
                        .where('p.supplier_id', supplier_id)
                    data.products = products
                }
            } else {
                const { page = 1, limit = 1000, keyword = '' } = req.query
                const builder = db('suppliers').where('is_deleted', 0)
                const supplierTotal = (await builder.clone()).length
                const meta = {
                    total: supplierTotal,
                    current: Number(page),
                    pageSize: Number(limit)
                }
                suppliers = await builder
                    .select('id', 'nama', 'nama_pemilik', 'alamat', 'no_telp', 'email')
                    .whereRaw(`(nama like '%${keyword}%' or nama_pemilik like '%${keyword}%')`)
                    .offset(limit * (page - 1))
                    .limit(limit)
                data = { meta: meta, data: suppliers }
            }
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    deleteSuppliers: async (req, res, next) => {
        const { supplier_id } = req.query
        try {
            await db('suppliers').where({ id: supplier_id }).update({
                is_deleted: true
            })
            return response.success(res)
        } catch (err) {
            next(err)
        }
    },

    editProduct: async (req, res, next) => {
        const { supplier_id } = req.query
        const { nama, nama_pemilik, alamat, no_telp, email } = req.body
        try {
            await db('suppliers').where({ id: supplier_id }).update({ nama, nama_pemilik, alamat, no_telp, email })
            return response.success(res)
        } catch {
            next()
        }
    },

    addSupplier: async (req, res, next) => {
        const { nama, nama_pemilik, alamat, no_telp, email } = req.body
        try {
            const id = v4()
            const supplier = {
                id: id,
                nama,
                nama_pemilik,
                alamat,
                no_telp,
                email,
                is_deleted: false
            }
            await db('suppliers').insert(supplier)
            return response.success(res)
        } catch (err) {
            next(err)
        }
    }
}