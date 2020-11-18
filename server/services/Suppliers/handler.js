const { v4 } = require('uuid')

const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getSuppliers: async (req, res, next) => {
        const { supplier_id } = req.query
        let data = null;
        try {
            if (supplier_id) {
                data = await db('suppliers')
                    .select('id', 'nama', 'nama_pemilik', 'alamat', 'no_telp', 'email')
                    .where('is_deleted', 0)
                    .andWhere('id', supplier_id)
                    .first()
            } else {
                const { page = 1, limit = 10, keyword = '' } = req.query
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