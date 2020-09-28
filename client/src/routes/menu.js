import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    BarChartOutlined,
    EnvironmentOutlined
} from "@ant-design/icons";
import { ADMIN, RESELLER, AGEN } from '../contants/UserRoles'

const menu = [{
    id    : 1,
    name  : 'Dashboard',
    path  : '/dashboard',
    ignore: true,
    icon  : PieChartOutlined,
},
{
    id         : 2,
    name       : 'Produk',
    description: 'Kelola Daftar Produk dan Harga',
    path       : '/product',
    icon       : DesktopOutlined
},
{
    id         : 3,
    name       : 'Penjualan',
    description: 'Kelola Data Penjualan',
    path       : '/sales',
    icon       : BarChartOutlined
},
{
    id         : 4,
    name       : 'User',
    path       : '/user',
    description: 'Kelola Pengguna',
    icon       : TeamOutlined
},
{
    id         : 5,
    name       : 'Region',
    path       : '/region',
    description: 'Kelola Region',
    icon       : EnvironmentOutlined
}

]

const userMenu = {
    [ADMIN]   : [1, 2, 3, 4, 5],
    [AGEN]    : [1, 3, 4],
    [RESELLER]: [1, 3]
}

export const getMenu = (role = ADMIN) => {
    const roleMenu = userMenu[role]
    return menu.filter(m => roleMenu.includes(m.id))
}