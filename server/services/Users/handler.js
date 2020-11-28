require('dotenv').config()
const { v4 } = require('uuid')
const bcrypt = require('bcrypt')
const SALT = process.env.SALT_ROUND
const db = require('../../db')
const { AGEN, RESELLER } = require('../../constants/roles')
const response = require('../../constants/response')
const activation = require('../../constants/activation')

module.exports = {
    getCurrentUser: async (req, res, next) => {
        try {
            const { user_id } = req
            const data = await db('users as u')
                .select('u.id', 'p.nama', 'u.email', 'p.alamat', 'p.pekerjaan')
                .join('profiles as p', 'p.user_id', '=', 'u.id')
                .where('u.id', user_id)
                .first()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    getUsers: async (req, res) => {
        const { user_id, agents } = req.query
        let data = null;
        if (agents) {
            [data] = await db.raw(
                `select a.agen_id, p.nama as agen_name, group_concat(r.region_name SEPARATOR ', ') as agen_region 
                from agen a
                inner join regions r on r.id  = a.region_id  
                inner join profiles p on p.user_id = a.agen_id 
                inner join users u on u.id = a.agen_id
                where u.is_deleted = 0
                group by agen_id
                order by p.nama 
            `)
        }
        else if (user_id) {
            data =
                await db('users as u')
                    .select('u.id', 'u.username', 'u.email', 'p.nama', 'p.alamat', 'p.pekerjaan', 'p2.nama as created_by')
                    .join('profiles as p', 'u.id', '=', 'p.user_id')
                    .join('users as u2', 'u2.id', '=', 'u.created_by')
                    .join('profiles as p2', 'u2.id', '=', 'p2.user_id')
                    .whereRaw(`u.id = '${user_id}' and u.is_deleted = 0`)
                    .first()
        } else {
            const { page = 1, limit = 10, keyword = '', sortby = 'p.nama', mode = 'desc' } = req.query
            const regionTotal = (await db('regions as r')).length
            const meta = {
                total: regionTotal,
                current: Number(page),
                pageSize: Number(limit)
            }
            let result
            if (req.role_name === AGEN.role_name) {
                result = await db('users as u')
                    .select('u.id', 'u.username', 'u.email', 'p.nama', 'p.alamat', 'p.pekerjaan', 'u.created_at', db.raw(`CASE when u.activated = 1 then '${activation.AKTIF.status}' else '${activation.PENDING.status}' END as status`))
                    .join('profiles as p', 'u.id', '=', 'p.user_id')
                    .join('reseller as res', 'res.reseller_id', '=', 'u.id')
                    .offset(limit * (page - 1))
                    .whereRaw(`lower(p.nama) like '%${keyword.toLowerCase()}%' and u.is_deleted = 0 and res.agen_id ='${req.user_id}'`)
                    .orderBy(sortby, mode)
                    .limit(limit)
            } else {
                result = await db('users as u')
                    .select('u.id', 'u.username', 'u.email', 'p.nama', 'p.alamat', 'p.pekerjaan', 'p2.nama as created_by', 'u.created_at', 'r.role_name', db.raw(`CASE when u.activated = 1 then '${activation.AKTIF.status}' else '${activation.PENDING.status}' END as status`))
                    .join('profiles as p', 'u.id', '=', 'p.user_id')
                    .join('users as u2', 'u2.id', '=', 'u.created_by')
                    .join('roles as r', 'r.id', '=', 'u.role_id')
                    .join('profiles as p2', 'u2.id', '=', 'p2.user_id')
                    .offset(limit * (page - 1))
                    .whereRaw(`lower(p.nama) like '%${keyword.toLowerCase()}%' and u.is_deleted = 0`)
                    .orderBy(sortby, mode)
                    .limit(limit)
            }
            data = { meta: meta, data: result }
        }
        res.json(data)
    },
    deleteUser: async (req, res, next) => {
        const { user_id } = req.query
        try {
            await db('users').where({ id: user_id }).update({
                is_deleted: 1
            })
            return response.success(res)
        } catch (err) {
            console.log(err)
            next()
        }
    },
    changePassword: async (req, res, next) => {
        const { user_id } = req
        const { oldPassword, newPassword} = req.body
        const user = await db('users').select('*').where({ id: user_id}).first()
        const equall = await bcrypt.compare(oldPassword, user.password)
        if(equall){
            const hashedPassword = await bcrypt.hash(newPassword, Number(SALT))
            await db('users').where({id: user_id}).update({
                password: hashedPassword
            })
            return response.success(res)
        }else{
            const error = new Error("Password Lama Salah")
            res.status(400)
            next(error)
        }
    },
    editUser: async (req, res, next) => {
        const { user_id } = req.query
        const { nama, email, pekerjaan, alamat } = req.body
        try {
            const user = {
                email,
            }
            const profile = {
                nama,
                pekerjaan,
                alamat
            }
            await db('users').where({ id: user_id }).update(user)
            await db('profiles').where({ user_id: user_id }).update(profile)
            return response.success(res)
        } catch (err) {
            next(err)
        }
    },

    addUser: async (req, res, next) => {
        const { nama, username, role_id = RESELLER.id, email, password, alamat, pekerjaan, agen_id, region_id } = req.body
        try {
            const existingUser = await db('users').where({ username: username })
            if (existingUser.length > 0) {
                return response.error(res, 409, "Username telah digunakan, Coba username lain")
            }
            const user_id = v4()
            const hashedPassword = await bcrypt.hash(password, Number(SALT))
            const user = {
                id: user_id,
                username: username,
                email: email,
                role_id: role_id,
                created_by: req.user_id,
                is_deleted: 0,
                activated: req.role_name === AGEN.role_name ? false : true,
                password: hashedPassword
            }
            const profile = {
                user_id: user_id,
                nama: nama,
                alamat: alamat,
                pekerjaan: pekerjaan
            }
            await db('users').insert(user)
            await db('profiles').insert(profile)
            if (role_id === AGEN.id) {
                const agents = region_id.map(id => {
                    return {
                        agen_id: user_id,
                        region_id: id
                    }
                })
                await db('agen').insert(agents)
            } else if (role_id === RESELLER.id) {
                const { region_id } = await db('agen').select('region_id').where({ agen_id: agen_id }).first()
                const reseller = {
                    agen_id: agen_id,
                    region_id: region_id,
                    reseller_id: user_id,
                }
                await db('reseller').insert(reseller)
            }
            return response.success(res)
        } catch (err) {
            console.log(err)
            next()
        }
    },

    confirmUser: async (req, res) => {
        const { user_id } = req.query
        await db('users').where({ id: user_id }).update({
            activated: 1
        })
        return response.success(res)
    },

    getUserStat: async (req, res) => {
        const agents = await db('users')
            .join('agen', 'agen.agen_id', '=', 'users.id')
            .whereRaw('users.is_deleted = 0 AND users.activated = 1')

        const resellers = await db('users')
            .join('reseller', 'reseller.reseller_id', '=', 'users.id')
            .whereRaw('users.is_deleted = 0 AND users.activated = 1')

        const regions = await db('regions')
        res.json({
            agenCount: agents.length,
            resellerCount: resellers.length,
            regionCount: regions.length
        })
    }
}