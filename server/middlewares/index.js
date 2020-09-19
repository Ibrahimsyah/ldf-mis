const auth = require('./auth')
const roles = require('./roles')

module.exports = {
    ...auth,
    ...roles
}