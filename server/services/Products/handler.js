const db = require('../../db')
const { AGEN, RESELLER, ADMIN } = require('../../constants/roles')
module.exports = {
    getProducts: async (req, res) => {
        const roles = await db('roles')
        const data =
            await db('products as p')
                .select(['p.id', 'p.product_name', 'p2.price as admin_price', 'p3.price as agen_price', 'p4.price as reseller_price'])
                .join('prices as p2', 'p2.product_id', '=', 'p.id')
                .join('prices as p3', 'p3.product_id', '=', 'p.id')
                .join('prices as p4', 'p4.product_id', '=', 'p.id')
                .where('p2.role_id', roles.find(role => role.role_name === ADMIN).id)
                .andWhere('p3.role_id', roles.find(role => role.role_name === AGEN).id)
                .andWhere('p4.role_id', roles.find(role => role.role_name === RESELLER).id)
        res.json(data)
    }
}