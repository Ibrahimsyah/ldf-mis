const db = require('./index')

module.exports = {
    up: (_, res) => {
        db.transaction(trx => {
            db.schema
                .createTable('regions', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('region_name', 100)
                })
                .createTable('suppliers', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('nama', 50)
                    table.string('nama_pemilik', 50)
                    table.string('alamat', 200)
                    table.string('no_telp',13)
                    table.string('email', 40)
                    table.boolean('is_deleted').defaultTo(0)
                })
                .createTable('products', table => {
                    table.string('id', 100).primary().notNullable()
                    table.string('supplier_id', 100).references('id').inTable('suppliers').defaultTo()
                    table.string('product_name', 100)
                    table.boolean('is_deleted').defaultTo(0)
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
                    table.timestamp('created_at').defaultTo(db.raw('CURRENT_TIMESTAMP'))
                    table.string('created_by', 100)
                    table.boolean('activated')
                    table.boolean('is_deleted').defaultTo(0)
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
                    table.primary(['region_id', 'agen_id'])
                })
                .createTable('reseller', table => {
                    table.string('agen_id', 100).references('agen_id').inTable('agen')
                    table.string('region_id', 100).references('region_id').inTable('agen')
                    table.string('reseller_id', 100).references('id').inTable('users')
                    table.primary(['agen_id', 'region_id', 'reseller_id'])
                })
                .createTable('penjualan', table => {
                    table.string('seller_id', 100).references('id').inTable('users')
                    table.string('product_id', 100).references('id').inTable('products')
                    table.timestamp('waktu')
                    table.integer('jumlah').defaultTo(0)
                    table.primary(['seller_id', 'product_id', 'waktu'])
                })
                .createTable('pembelian', table => {
                    table.string('product_id', 100).references('id').inTable('products')
                    table.timestamp('waktu')
                    table.integer('jumlah').defaultTo(0)
                })
                .createTable('prices', table => {
                    table.string('product_id', 100).references('id').inTable('products')
                    table.integer('buy_price').defaultTo(0)
                    table.integer('admin_price').defaultTo(0)
                    table.integer('agen_price').defaultTo(0)
                    table.integer('reseller_price').defaultTo(0)
                })
                .then(() => {
                    trx.commit()
                    res.json('Migration Success')
                })
                .catch(err => {
                    trx.rollback()
                    res.json({error: err})
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
            .dropTableIfExists('suppliers')
            .dropTableIfExists('regions')
            .then(() => {
                res.json('Undo Migration Success')
            })
            .catch(err => {
                console.error(err)
            })

    }
}