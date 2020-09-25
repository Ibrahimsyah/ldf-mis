import React from 'react'
import Dashboard from '../views/dashboard'
import Product from '../views/products'
import User from '../views/users'
export default [
    {
        path: '/dashboard',
        component: () => <Dashboard />
    },
    {
        path: '/product',
        component: () => <Product />
    },
    {
        path: '/user',
        component: () => <User />
    }
]