const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const db = require('../db')
const response = require('../constants/response')

module.exports = {
    checkToken: async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            return response.unauthorized(res)
        } else {
            const token = authorization.split(' ')[1]
            const payload = await jwt.verify(token, SECRET)
            if (payload) {
                const user = await db('users').where('id', payload.user_id).andWhere('is_deleted', 0).first()
                if (user) {
                    req.role_name = payload.role_name
                    req.user_id = payload.user_id
                    return next()
                } else {
                    return response.accountDisabled(res)
                }
            } else {
                return response.unauthorized(res)
            }
        }
    },
}