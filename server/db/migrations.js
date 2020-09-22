const db = require('./index')

module.exports = {
    up: (_, res) => {
        db.transaction(trx => {
            db.schema
                .createTable('regions', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('region_name', 100)
                })
                .createTable('products', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('product_name', 100)
                })
                .createTable('roles', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('role_name', 50)
                })
                .createTable('users', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('role_id', 100).references('id').inTable('roles')
                    table.string('username', 16)
                    table.string('email', 30)
                    table.string('password', 60)
                })
                .createTable('profiles', table => {
                    table.string('user_id', 100).references('id').inTable('users').primary()
                    table.string('nama', 50)
                    table.string('alamat')
                    table.string('pekerjaan', 100)
                })
                .createTable('agen', table => {
                    table.string('region_id', 100).references('id').inTable('regions')
                    table.string('agen_id', 100).references('id').inTable('users')
                    table.primary('region_id', 'user_id')
                })
                .createTable('reseller', table => {
                    table.string('agen_id', 100).references('agen_id').inTable('agen')
                    table.string('region_id', 100).references('region_id').inTable('agen')
                    table.string('reseller_id', 100).references('id').inTable('users')
                    table.boolean('activated')
                    table.primary('agen_id', 'region_id', 'reseller_id')
                })
                .createTable('penjualan', table => {
                    table.string('seller_id', 100).references('id').inTable('users')
                    table.string('product_id', 100).references('id').inTable('products')
                    table.timestamp('waktu')
                    table.integer('jumlah').defaultTo(0)
                })
                .createTable('pembelian', table => {
                    table.string('seller_id', 100).references('id').inTable('users')
                    table.string('product_id', 100).references('id').inTable('products')
                    table.timestamp('waktu')
                    table.integer('jumlah').defaultTo(0)
                })
                .createTable('prices', table => {
                    table.string('product_id', 100).references('id').inTable('products')
                    table.string('role_id', 100).references('id').inTable('roles')
                    table.integer('price').defaultTo(0)
                })
                .then(() => {
                    trx.commit()
                    res.json('Migration Success')
                })
                .catch(err => {
                    trx.rollback()
                    console.error(err)
                })
        })
    },

    down: (_, res) => {
        db.schema
            .dropTableIfExists('prices')
            .dropTableIfExists('pembelian')
            .dropTableIfExists('penjualan')
            .dropTableIfExists('reseller')
            .dropTableIfExists('agen')
            .dropTableIfExists('profiles')
            .dropTableIfExists('users')
            .dropTableIfExists('roles')
            .dropTableIfExists('products')
            .dropTableIfExists('regions')
            .then(() => {
                res.json('Undo Migration Success')
            })
            .catch(err => {
                console.error(err)
            })

    }
}