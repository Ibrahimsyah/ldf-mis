import Dashboard from '../views/dashboard'

import Product from '../views/products'
import AddProduct from '../views/products/addProduct'
import EditProduct from '../views/products/editProduct'

import User from '../views/users'
import AddUser from '../views/users/addUser'

import Region from '../views/regions'
import AddRegion from '../views/regions/addRegion'
import EditRegion from '../views/regions/editRegion'

import Sales from '../views/sales'
import AddSales from '../views/sales/addSales'

import Purchase from '../views/purchase'
import AddPurchase from '../views/purchase/addPurchase'

import Supplier from '../views/suppliers'
import DetailSupplier from '../views/suppliers/supplierDetail'
import AddSupplier from '../views/suppliers/addSupplier'
import EditSupplier from '../views/suppliers/editSupplier'

export default [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/product/edit/:product_id',
        component: EditProduct
    },
    {
        path: '/product/add',
        component: AddProduct
    },
    {
        path: '/product',
        component: Product
    },
    {
        path: '/user/add',
        component: AddUser
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/region/edit/:region_id',
        component: EditRegion
    },
    {
        path: '/region/add',
        component: AddRegion
    },
    {
        path: '/region',
        component: Region
    },
    {
        path: '/sales/add',
        component: AddSales
    },
    {
        path: '/sales',
        component: Sales
    },
    {
        path: '/purchase/add',
        component: AddPurchase
    },
    {
        path: '/purchase',
        component: Purchase
    },
    {
        path: '/supplier/edit/:supplier_id',
        component: EditSupplier
    },
    {
        path: '/supplier/add',
        component: AddSupplier
    },
    {
        path: '/supplier/:supplier_id',
        component: DetailSupplier
    },
    {
        path: '/supplier',
        component: Supplier
    },
]