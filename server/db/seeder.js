const db = require('./index')
const { ADMIN, AGEN, RESELLER } = require('../constants/roles')

module.exports = {
    seed: (_, res) => {
        const roles = [
            {
                id: '470ec00b-d332-43f4-8c9e-71fae43f4819',
                role: ADMIN
            },
            {
                id: '1ba746f6-5df9-4c8b-a078-3c0453d1122b',
                role: AGEN
            },
            {
                id: '1ba746f6-5df9-4c8b-a078-3c0453d1122b',
                role: RESELLER
            }
        ]
        Promise.all([
            db('roles').insert(roles)
        ]).then(() => {
            res.json('Seeding Success')
        }).catch(err => {
            res.json({
                error: err
            })
        })
    },

    unseed: (_, res) => {
        Promise.all([
            db('roles').del(),
        ])
    }
}