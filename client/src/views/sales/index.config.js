import moment from 'moment'

export const parsePrice = (price) => "Rp." + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export default {
    initState: {
        salesData: [],
        summary: {
            todayIncome: 0,
            last7Income: 0,
            last30Income: 0,
        },
        loading: false,
        range: "1"
    },
    table: () => {
        return {
            rowKey: row => row.product_id + row.waktu,
            columns: [
                {
                    title: 'Nama Produk',
                    dataIndex: 'product_name',
                },
                {
                    title: 'Harga Satuan',
                    dataIndex: 'harga_satuan',
                    align:'right',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Jumlah',
                    align:'right',
                    dataIndex: 'jumlah'
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    align:'right',
                    render: row => parsePrice(row)
                },
                {
                    title: 'Waktu Transaksi',
                    dataIndex: 'waktu',
                    align:'center',
                    render: row => moment(row).format('dddd, DD MMMM YYYY, hh:mm')
                }
            ],
        }
    }
}