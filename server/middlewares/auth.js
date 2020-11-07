const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const response = require('../constants/response')

module.exports = {
    checkToken: async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            return response.unauthorized(res)
        } else {
            const token = authorization.split(' ')[1]
            const payload = await jwt.verify(token, SECRET)
            return payload ? next() : response.unauthorized(res)
        }
    },

    checkActivation: async (req, res, next) => {

    }
}