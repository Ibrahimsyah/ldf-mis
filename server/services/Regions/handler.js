const { v4 } = require('uuid')

const db = require('../../db')
const response = require('../../constants/response')

module.exports = {
    getRegions: async (req, res) => {
        const { region_id } = req.query
        let data = null;
        if (region_id) {
            data =
                await db('regions as r')
                    .select('*')
                    .where({ id: region_id })
                    .first()
        } else {
            const { page = 1, limit = 10000, keyword = '' } = req.query
            const regionTotal = (await db('regions as r')).length
            const meta = {
                total: regionTotal,
                current: Number(page),
                pageSize: Number(limit)
            }
            const regions = await db('regions as r')
                .select('*')
                .offset(limit * (page - 1))
                .whereRaw(`lower(region_name) like '%${keyword.toLowerCase()}%'`)
                .limit(limit)
            data = { meta: meta, data: regions }
        }
        res.json(data)
    },

    deleteRegion: async (req, res, next) => {
        const { region_id } = req.query
        try {
            await db('regions').where({ id: region_id }).del()
            return response.success(res)
        } catch {
            next()
        }
    },

    editRegion: async (req, res, next) => {
        const { region_id } = req.query
        const { region_name} = req.body
        try {
            await db('regions').where({ id: region_id }).update({ region_name })
            return response.success(res)
        } catch {
            next()
        }
    },

    addRegion: async (req, res, next) => {
        const { region_name } = req.body
        try {
            const region_id = v4()
            const region = {
                id: region_id,
                region_name
            }
            await db('regions').insert(region)
            res.status(200).json(response.success)
        } catch (err) {
            next()
        }
    }
}