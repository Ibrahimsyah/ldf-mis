require('dotenv').config()
const knex = require('knex')

const config = {
    client    : 'mysql2',
    connection: {
        host    : process.env.DB_HOST,
        user    : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}

const db = knex(config)

db.raw('select 1 + 1 as result').then(() => {
    console.log('Connected to DB')
}).catch(err => {
    console.error(err)
})
module.exports = db