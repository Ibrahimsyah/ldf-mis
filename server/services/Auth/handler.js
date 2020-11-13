require('dotenv').config()

const db       = require('../../db')
const bcrypt   = require('bcrypt')
const { v4 }   = require('uuid')
const jwt      = require('jsonwebtoken')
const response = require('../../constants/response')

const SALT = process.env.SALT_ROUND
const SECRET = process.env.SECRET

module.exports = {
    registerNewUser: async (req, res) => {
        const { email, username, password, role_id, nama, alamat, pekerjaan } = req.body
        const existingUser = await db('users')
            .select('username')
            .where('email', email)
            .orWhere('username', username)
            .first()
        if (existingUser) {
            const model = {
                error: "Username atau Email telah digunakan"
            }
            return res.status(409).json(model)
        }
        const hashedPassword = await bcrypt.hash(password, Number(SALT))
        const id = v4()
        const user = {
            id,
            email,
            username,
            password: hashedPassword,
            role_id
        }
        try {
            await db('users').insert(user)
            const profile = {
                user_id: id,
                nama,
                alamat,
                pekerjaan
            }
            await db('profiles').insert(profile)
            const response = {
                message: 'success'
            }
            res.status(200).json(response)
        } catch (err) {
            const model = {
                error: err
            }
            return res.status(500).json(model)
        }
    },

    loginUser: async (req, res) => {
        const { id, password } = req.body
        const user = await db('users')
            .whereRaw(`(username = '${id}' OR email = '${id}') AND is_deleted = 0`)
            .where('username', id)
            .orWhere('email', id)
            .andWhere('is_deleted', 0)
            .first()
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                const profile = await db('users as u')
                    .select('p.nama', 'u.email', 'u.id', 'r.role_name', 'u.activated')
                    .join('roles as r', 'r.id', '=', 'u.role_id')
                    .join('profiles as p', 'p.user_id', '=', 'u.id')
                    .where('u.username', id)
                    .orWhere('u.email', id)
                    .first()

                if(!profile.activated){
                    return response.accountNotActive(res)
                }
                const tokenPayload = {
                    user_id: user.id,
                    role_name: profile.role_name
                }
                const token = await jwt.sign(tokenPayload, SECRET)

                const auth = {
                    token,
                    profile
                }
                res.status(200).json(auth)
            } else {
                return res.status(401).json({
                    error: 'Password anda salah'
                })
            }
            if (user.activated === 0) {
                return res.status(401).json({
                    error: 'Akun anda masih dalam proses persetujuan admin'
                })
            }
        } else {
            return res.status(401).json({
                error: 'Username/email tidak ditemukan'
            })
        }
    }
}