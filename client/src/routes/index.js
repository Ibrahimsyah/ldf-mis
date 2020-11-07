import Dashboard from '../views/dashboard'
import Product from '../views/products'
import AddProduct from '../views/products/addProduct'
import EditProduct from '../views/products/editProduct'
import User from '../views/users'
import AddUser from '../views/users/addUser'
import Region from '../views/regions'
import AddRegion from '../views/regions/addRegion'
import Sales from '../views/sales'
import AddSales from '../views/sales/addSales'

export default [
    {
        path     : '/dashboard',
        component: Dashboard
    },
    {
        path     : '/product/edit/:product_id',
        component: EditProduct
    },
    {
        path     : '/product/add',
        component: AddProduct
    },
    {
        path     : '/product',
        component: Product
    },
    {
        path     : '/user/add',
        component: AddUser
    },
    {
        path     : '/user',
        component: User
    },
    {
        path     : '/region/add',
        component: AddRegion
    },
    {
        path     : '/region',
        component: Region
    },
    {
        path     : '/sales/add',
        component: AddSales
    },
    {
        path     : '/sales',
        component: Sales
    }
]