import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    BarChartOutlined,
    EnvironmentOutlined,
    InsertRowBelowOutlined,
    FundOutlined,
    ShoppingCartOutlined
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
    name       : 'Supplier',
    path       : '/supplier',
    description: 'Kelola Supplier',
    icon       : InsertRowBelowOutlined
},
{
    id         : 3,
    name       : 'Produk',
    description: 'Kelola Daftar Produk dan Harga',
    path       : '/product',
    icon       : DesktopOutlined
},
{
    id         : 4,
    name       : 'Penjualan',
    description: 'Kelola Data Penjualan',
    path       : '/sales',
    icon       : BarChartOutlined
},
{
    id         : 5,
    name       : 'User',
    path       : '/user',
    description: 'Kelola Pengguna',
    icon       : TeamOutlined
},
{
    id         : 6,
    name       : 'Wilayah',
    path       : '/region',
    description: 'Kelola Wilayah',
    icon       : EnvironmentOutlined
},
{
    id         : 7,
    name       : 'Reseller',
    path       : '/user',
    description: 'Kelola Reseller',
    icon       : TeamOutlined
},
{
    id         : 8,
    name       : 'Pembelian',
    description: 'Kelola Data Pembelian',
    path       : '/purchase',
    icon       : ShoppingCartOutlined
},
{
    id         : 9,
    name       : 'Laporan Kinerja',
    description: 'Rincian Kinerja dan Keuangan',
    path       : '/laporan',
    icon       : FundOutlined
},

]

const userMenu = {
    [ADMIN]   : [1, 2, 3, 8, 4, 5, 6, 9],
    [AGEN]    : [1, 7, 4],
    [RESELLER]: [1, 4]
}

export const getMenu = (role = ADMIN) => {
    const roleMenu = userMenu[role]
    return roleMenu.map(index => menu.find(m => m.id === index))
}