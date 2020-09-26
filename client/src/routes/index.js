import Dashboard from '../views/dashboard'
import Product from '../views/products'
import User from '../views/users'
import AddUser from '../views/users/addUser'

export default [
    {
        path     : '/dashboard',
        component: Dashboard
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
    }
]