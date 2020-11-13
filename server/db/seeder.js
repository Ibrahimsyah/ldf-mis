const db                        = require('./index')
const { ADMIN, AGEN, RESELLER } = require('../constants/roles')

module.exports = {
    seed: async (_, res) => {
        const roles = [ADMIN, AGEN, RESELLER]
        const users = [
            {
                id        : '88630295-d95e-4f71-8096-90a4024521eb',
                role_id   : '470ec00b-d332-43f4-8c9e-71fae43f4819',
                username  : 'ibrahimsyah',
                email     : 'ibra.himsyah10@gmail.com',
                password  : '$2b$11$VteAWLPX2jeBK1Fg65U0ZO9q3Rt14kp8j7zCTWVOLIlCBF.Ot.pqm', //Ibrahimsyah Pass
                activated : true,
                is_deleted: false,
                created_by: '88630295-d95e-4f71-8096-90a4024521eb'
            },
            {
                id        : '9fd70b08-11fd-4153-9cb3-1b378a87747d',
                role_id   : '470ec00b-d332-43f4-8c9e-71fae43f4819',
                username  : 'admin',
                email     : 'rifai234@gmail.com',
                password  : '$2b$11$sebmhBQa1WfGJdr/LMnCLOk2XoZxNhM1OzoWRG5TcIK0i0/sdTIji', //123456
                activated : true,
                is_deleted: false,
                created_by: '9fd70b08-11fd-4153-9cb3-1b378a87747d'
            }
        ]
        const profiles = [
            {
                user_id  : '88630295-d95e-4f71-8096-90a4024521eb',
                nama     : 'Ibrahimsyah Zairussalam',
                alamat   : 'Malang',
                pekerjaan: 'Mahasiswa'
            },
            {
                user_id  : '9fd70b08-11fd-4153-9cb3-1b378a87747d',
                nama     : 'admin',
                alamat   : 'Malang',
                pekerjaan: 'Admin'
            }
        ]
        try {
            await db('roles').insert(roles)
            await db('users').insert(users)
            await db('profiles').insert(profiles)
            res.json('Seeding Success')
        } catch (err) {
            res.json({
                error: err
            })
        }
    },

    unseed: async (_, res) => {
        try {
            await db('profiles').del()
            await db('users').del()
            await db('roles').del()
            res.json('Unseed Success')
        }
        catch (err) {
            res.json({
                error: err
            })
        }
    }
}