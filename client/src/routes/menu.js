import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    BarChartOutlined
} from "@ant-design/icons";

export default [
    {
        name: 'Dashboard',
        path: '/dashboard',
        ignore: true,
        icon: PieChartOutlined,
    },
    {
        name: 'Produk',
        description: 'Kelola Daftar Produk dan Harga',
        path: '/product',
        icon: DesktopOutlined
    },
    {
        name: 'Penjualan',
        description: 'Kelola Data Penjualan',
        path: '/sales',
        icon: BarChartOutlined 
    },
    {
        name: 'User',
        path: '/user',
        description: 'Kelola Agen dan Reseller',
        icon: TeamOutlined 
    }
]