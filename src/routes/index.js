import React from 'react'
import Dashboard from '../views/dashboard'
import Product from '../views/products'
export default [
    {
        path: '/dashboard',
        component: () => <Dashboard />
    },
    {
        path: '/product',
        component: () => <Product />
    }
]