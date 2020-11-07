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
            if(payload){
                req.role_name = payload.role_name
                req.user_id = payload.user_id
                return next()
            }else{
                return response.unauthorized(res)
            }
        }
    },

    checkActivation: async (req, res, next) => {

    }
}