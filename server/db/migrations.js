const db = require('./index')

module.exports = {
    up: (_, res) => {
        db.schema
            .createTableIfNotExists('table1', table => {
                table.string('id', 100).primary().notNullable()
                table.string('name', 100)
                table.integer('age')
            })
            .createTableIfNotExists('table2', table => {
                table.increments('id', 100).primary().notNullable()
                table.string('table1Id', 100).references('id').inTable('table1')
            })
            .then(() => {
                res.json('Migration Success')
            })

            .catch(err => {
                console.error(err)
            })
    },

    down: (_, res) => {
        db.schema
            .dropTableIfExists('table2')
            .dropTableIfExists('table1')
            .then(() => {
                res.json('Undo Migration Success')
            })
            .catch(err => {
                console.error(err)
            })

    }
}