const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getMostProducts: async (req, res) => {
        const { range = 1 } = req.query
        const products = await db('regions as r')
            .select('*')
            .offset(limit * (page - 1))
            .whereRaw(`lower(region_name) like '%${keyword.toLowerCase()}%'`)
            .limit(limit)
        data = { meta: meta, data: regions }
        res.json(data)
    },
}